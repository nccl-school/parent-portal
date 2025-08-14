import type { Resource } from "@nccl/api/client";
import type { IconNames } from "@nccl/components";
import type { ColorAndVariants } from "@nccl/theme";
import { exhaustiveMatchGuard } from "@stratum-ui/core/utils";

export function getResourceIcon<T extends Pick<Resource, "type" | "mimeType">>(
  resource: T
): IconNames {
  switch (resource.type) {
    case "FOLDER":
      return "folder-01-solid-standard";

    case "FILE":
      if (resource.mimeType?.includes("pdf")) {
        return "pdf-02-stroke-standard";
      }
      if (resource.mimeType?.includes("png")) {
        return "image-01-stroke-standard";
      }
      return "file-01-stroke-standard";

    case "LINK":
      return "file-link-stroke-standard";

    case "EXTERNAL_DOC":
      return "google-doc-stroke-standard";

    default:
      return exhaustiveMatchGuard(resource.type);
  }
}

export function getResourceIconColor<
  T extends Pick<Resource, "type" | "mimeType">,
>(resource: T): ColorAndVariants {
  switch (resource.type) {
    case "FOLDER":
      return "tertiary-500";

    case "FILE":
      if (resource.mimeType?.includes("pdf")) {
        return "danger-400";
      }
      return "neutral-dark-1000";

    case "LINK":
      return "tertiary-1100";

    case "EXTERNAL_DOC":
      return "primary-700";

    default:
      return exhaustiveMatchGuard(resource.type);
  }
}
