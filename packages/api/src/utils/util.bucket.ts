import { Storage } from "@google-cloud/storage";
import { ENV_RUNTIME } from "@nccl/env";

import { exhaustiveMatchGuard } from "./util.exhaustiveMatchGuard.js";

export function getBucket() {
  const storage = new Storage(); // uses local credentials
  const bucket = storage.bucket(ENV_RUNTIME.getOne("GCP_CLOUD_STORAGE_BUCKET"));
  return bucket;
}

export function createBucketPath(
  input:
    | { owner: "user"; userId: string; segments: string[] }
    | { owner: "org"; orgId: string; segments: string[] }
    | { owner: "school"; segments: string[] }
): string {
  switch (input.owner) {
    case "user":
      return `user_${input.userId}/${input.segments.join("/")}`;
    case "org":
      return `org_${input.orgId}/${input.segments.join("/")}`;
    case "school":
      return `school/${input.segments.join("/")}`;
    default:
      return exhaustiveMatchGuard(input);
  }
}
