import {
  ErrorSet,
  CreateResourceAccessRuleRequestSchema,
  UpdateResourceAccessRuleRequestSchema,
} from "@nccl/api/client";

import type { Route } from "./+types/api.resource.access.school";

import { getNCCLClient } from "../utils/server";

/**
 * Get the school access rule for the particular resource
 */
export async function loader(args: Route.LoaderArgs) {
  const ncclClient = getNCCLClient(args);
  const { id } = args.params;

  try {
    const schoolAccess = await ncclClient.resource.getAccessRuleSchool(id);
    return schoolAccess;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

/**
 * Creates a new access rule for a particular resource
 */
export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  const formData = await args.request.formData();
  const { id } = args.params;

  try {
    // throw if the method isn't a post
    if (args.request.method !== "POST") {
      throw new ErrorSet.methodNotAllowed(args.request.method);
    }

    const accessRuleId = String(formData.get("access-rule-id"));
    const permission = formData.get("permission");

    // Rule already exists but permission is removed
    // Delete the rule
    if (accessRuleId && permission === "") {
      return await ncclClient.resource.deleteAccessRule(accessRuleId);
    }

    // Update the rule
    if (accessRuleId) {
      const body = await UpdateResourceAccessRuleRequestSchema.parseAsync({
        permission,
      });
      return await ncclClient.resource.updateAccessRule(accessRuleId, body);
    }

    // Create the rule
    const body = await CreateResourceAccessRuleRequestSchema.parseAsync({
      level: "SCHOOL",
      permission,
    });
    const resource = await ncclClient.resource.createAccessRule(id, body);
    return resource;
  } catch (error) {
    console.log(error);
    return ncclClient.serializeError(error);
  }
}
