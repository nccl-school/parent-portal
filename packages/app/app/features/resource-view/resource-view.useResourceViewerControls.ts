import type { GetResourceResponse } from "@nccl/api/client";
import { useSearchParams } from "react-router";

export function useResourceViewerControls() {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  function closeViewer() {
    return setUrlSearchParams((prevSearchParams) => {
      prevSearchParams.delete("preview");
      return prevSearchParams;
    });
  }

  function openViewer(resource: GetResourceResponse["childResources"][0]) {
    if (resource.type === "FOLDER" || resource.type === "LINK") return;
    setUrlSearchParams({ preview: resource.id });
  }

  return {
    closeViewer,
    openViewer,
    resourcePreviewId: urlSearchParams.get("preview"),
  };
}
