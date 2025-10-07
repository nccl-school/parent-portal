import type { Context } from "hono";
import type z from "zod";

import type { CreateResourceOwnershipLevel } from "./resource.schema.js";

import type { Resource as DBResource } from "../../_generated/prisma/client.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { exhaustiveMatchGuard } from "../../utils/util.exhaustiveMatchGuard.js";
import { slugify } from "../../utils/util.general.js";
import { createBucketPath } from "../../utils/util.bucket.js";
import { LOG } from "../../utils/util.logger.js";

export const LOG_RESOURCE = LOG.feature("resource");

export async function getResourceById<C extends Context>(
  id: string,
  c: C,
  options?: { includeAccessRules: boolean }
) {
  const includeAccessRules = options?.includeAccessRules ?? false;
  LOG_RESOURCE.info("Fetching resource by ID", {
    resourceId: id,
    includeAccessRules,
  });

  const db = c.get("db");
  const record = await db.resource.findUnique({
    where: { id },
    include: { childResources: true, accessRules: includeAccessRules },
  });
  LOG_RESOURCE.info("Successfully found resource record", {
    resource: record,
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
  const currentUser = c.get("user");
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
    case "currentUser":
    case "user": {
      const currentUser = c.get("currentUser");
      return createBucketPath({
        owner: "user",
        userId: data.owner === "currentUser" ? currentUser.id : data.userId,
        segments: [resource.id, file.name],
      });
    }

    case "org": {
      return createBucketPath({
        owner: "org",
        orgId: data.orgId,
        segments: [resource.id, file.name],
      });
    }

    case "school": {
      return createBucketPath({
        owner: "school",
        segments: [resource.id, file.name],
      });
    }

    default:
      return exhaustiveMatchGuard(data);
  }
}

export function parseGoogleDocsURL(rawUrl: string) {
  const url = new URL(rawUrl);

  // Step 1: Enforce correct host
  if (url.hostname !== "docs.google.com") {
    throw new ErrorSet.badRequest("Only 'docs.google.com' links are allowed");
  }

  // Step 2: Validate path and extract file ID
  const match = url.pathname.match(/^\/document\/d\/([a-zA-Z0-9_-]{10,})/);
  if (!match) {
    throw new ErrorSet.badRequest("Invalid Google Docs file ID format");
  }

  const externalId = match[1];

  // Step 3: Build sanitized URLs
  const baseDocUrl = `https://docs.google.com/document/d/${externalId}`;
  return {
    externalId,
    baseDocUrl,
    mimeType: "application/vnd.google-apps.document",
  };
}

export async function fetchGoogleDocMetadataFromGoogleDrive(
  fileId: string,
  API_KEY: string
): Promise<{ name: string; slug: string }> {
  const name = `Google Doc - ${fileId}`;
  const slug = slugify(name);
  try {
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?key=${API_KEY}`
    );
    if (!res.ok) return { name, slug };
    const json = await res.json();
    const driveName = typeof json.name === "string" ? json.name : name;
    return {
      name: driveName,
      slug: slugify(driveName),
    };
  } catch {
    return { name, slug };
  }
}
