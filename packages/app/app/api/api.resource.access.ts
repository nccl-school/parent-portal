import {
  CreateResourceAccessRuleRequestSchema,
  ErrorSet,
} from "@nccl/api/client";

import type { Route } from "./+types/api.resource.access.school";

import { getNCCLClient } from "../utils/server";

/**
 * Creates a new access rule for a particular resource
 */
export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  const formData = await args.request.formData();
  const { id } = args.params;

  try {
    if (args.request.method !== "POST") {
      throw new ErrorSet.methodNotAllowed(args.request.method);
    }

    // Create the permission
    const body = await CreateResourceAccessRuleRequestSchema.parseAsync({
      level: "SCHOOL",
      permission: formData.get("permission") ?? "VIEWER",
    });
    const resource = await ncclClient.resource.createAccessRule(id, body);
    return resource;

    // Delete the permission
    // const permission = formData.get("permission");
    // if (!permission && id) {
    //   await ncclClient.resource.deleteAccessRule(id);
    // }

    // // Update the permission
    // const body = await UpdateResourceAccessRuleRequestSchema.parseAsync({
    //   permission: formData.get("permission") ?? "VIEWER",
    // });
    // const resource = await ncclClient.resource.updateAccessRule(id, body);
  } catch (error) {
    console.log(error);
    return ncclClient.serializeError(error);
  }
}
