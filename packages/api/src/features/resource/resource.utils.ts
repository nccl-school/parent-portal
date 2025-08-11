import type { Context } from "hono";
import { Storage } from "@google-cloud/storage";
import type z from "zod/v4";

import type { CreateResourceOwnershipLevel } from "./resource.schema.js";

import type { Resource as DBResource } from "../../_generated/prisma/client.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { getEnvVar } from "../../utils/util.envVar.js";
import { exhaustiveMatchGuard } from "../../utils/util.exhaustiveMatchGuard.js";

export function getBucket<C extends Context>(c: C) {
  const { GCP_CLOUD_STORAGE_BUCKET } = getEnvVar(c);
  const storage = new Storage(); // uses local credentials
  const bucket = storage.bucket(GCP_CLOUD_STORAGE_BUCKET);
  return bucket;
}

export async function getResourceById<C extends Context>(
  id: string,
  c: C,
  options?: { includeAccessRules: boolean }
) {
  const includeAccessRules = options?.includeAccessRules ?? false;
  const db = c.get("db");
  const record = await db.resource.findUnique({
    where: { id },
    include: { childResources: true, accessRules: includeAccessRules },
  });
  if (!record) {
    throw new ErrorSet.notFound("Unable to find the requested resource");
  }

  return record;
}

type ResourceAccessRules = {
  read: true;
  create: boolean;
  update: boolean;
  delete: boolean;
};

export async function getUserResourceAccess<C extends Context>(
  id: string,
  c: C
): Promise<[DBResource, ResourceAccessRules]> {
  const currentUser = c.get("currentUser");
  const db = c.get("db");

  const [resource, orgMemberships] = await Promise.all([
    getResourceById(id, c, { includeAccessRules: true }),
    db.organizationMembership.findMany({
      where: {
        userId: currentUser.id,
      },
    }),
  ]);

  const base = {
    read: true,
    create: false,
    update: false,
    delete: false,
  } as const;

  function createResponse(
    data: ResourceAccessRules
  ): [DBResource, ResourceAccessRules] {
    return [resource, data];
  }

  // ✅ 1. System-level admin always has full access
  if (currentUser.roleId === "ADMIN") {
    return createResponse({
      read: true,
      create: true,
      update: true,
      delete: true,
    });
  }

  // ✅ 2. Direct user ownership
  if (currentUser.id === resource.ownerUserId) {
    return createResponse({
      read: true,
      create: true,
      update: true,
      delete: true,
    });
  }

  // ✅ 3. Match effective access rules
  for (const rule of resource.accessRules) {
    const isDirectUser = rule.userId === currentUser.id;
    const isSchoolWide = rule.allSchool === true;

    const isOrgUser = orgMemberships.find((membership) => {
      const isOrgUser =
        rule.orgId && membership.organizationId === resource.ownerOrgId;
      return isOrgUser;
    });

    if (isDirectUser || isSchoolWide || isOrgUser) {
      switch (rule.permission) {
        case "MANAGER":
          return createResponse({
            read: true,
            create: true,
            update: true,
            delete: true,
          });
        case "EDITOR":
          return createResponse({
            read: true,
            create: false,
            update: true,
            delete: false,
          });
        case "VIEWER":
          return createResponse({
            read: true,
            create: false,
            update: false,
            delete: false,
          });
      }
    }
  }

  // ❌ 4. No matching rule = read-only
  return createResponse(base);
}

/**
 * Utility function to parse the owner key in any POST
 * resource object to determine what entity should own
 * the resource.
 */
export function createResourceOwnership<
  C extends Context,
  T extends z.infer<typeof CreateResourceOwnershipLevel>,
>(c: C, data: T): Partial<DBResource> {
  const currentUser = c.get("currentUser");

  switch (data.owner) {
    case "currentUser":
      return { ownerUserId: currentUser.id, ownerOrgId: null };

    case "user":
      return { ownerUserId: data.userId, ownerOrgId: null };

    case "org":
      return { ownerOrgId: data.orgId, ownerUserId: null };

    case "school":
      return { ownerOrgId: null, ownerUserId: null };

    default:
      return exhaustiveMatchGuard(data);
  }
}

/**
 * Creates a storage URL for the file that is created inside of GCS
 * based upon the owner level
 */
export function createFileStoragePath<
  C extends Context,
  T extends z.infer<typeof CreateResourceOwnershipLevel>,
>(
  c: C,
  { file, data, resource }: { resource: DBResource; data: T; file: File }
): string {
  if (resource.type !== "FILE") {
    throw new ErrorSet.badRequest(
      `Unable to blob artifact for a "${resource.type}" type`
    );
  }
  switch (data.owner) {
    case "currentUser": {
      const currentUser = c.get("currentUser");
      return `user_${currentUser.id}/${resource.id}/${file.name}`;
    }

    case "user":
      return `user_${data.userId}/${resource.id}/${file.name}`;

    case "org":
      return `org_${data.orgId}/${resource.id}/${file.name}`;

    case "school":
      return `school/${resource.id}/${file.name}`;

    default:
      return exhaustiveMatchGuard(data);
  }
}
