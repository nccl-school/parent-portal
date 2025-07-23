import type { Resource } from "@nccl/api/client";
import type { IconNames } from "@nccl/components";
import { exhaustiveMatchGuard } from "@stratum-ui/core/utils";

export function getResourceIcon<T extends Resource>(resource: T): IconNames {
  switch (resource.type) {
    case "FOLDER":
      return "folder-01-solid-standard";

    case "FILE":
      if (resource.mimeType?.includes("pdf")) {
        return "pdf-02-stroke-standard";
      }
      return "file-01-stroke-standard";

    case "LINK":
      return "file-link-stroke-standard";

    case "EXTERNAL_DOC":
      return "file-sync-stroke-standard";

    default:
      return exhaustiveMatchGuard(resource.type);
  }
}
