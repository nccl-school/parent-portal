import { Button, Toast, Tooltip, useTooltip } from "@nccl/components";
import type { GetResourceResponse } from "@nccl/api/client";
import { useLocation } from "react-router";

export function ResourceItemActionCopyLink(
  resource: GetResourceResponse["childResources"][0]
) {
  const location = useLocation();
  const tooltip = useTooltip({ position: "top" });
  async function copy() {
    try {
      console.log(location, window.location);
      let text: string = "";
      switch (resource.type) {
        case "FILE":
        case "EXTERNAL_DOC":
          text = `${window.location.href}?preview=${resource.id}`;
          break;

        case "LINK":
        case "FOLDER":
          text = window.location.href;
          break;

        default:
          break;
      }
      await navigator.clipboard.writeText(text);
      Toast.success(`Successfully copied "${resource.name}" to the clipboard`);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unknown error occurred when attempting to copy the link";
      Toast.error(message);
    }
  }

  return (
    <>
      <Button
        ref={tooltip.setTarget}
        dxVariant="icon"
        dxIcon="link-01-stroke-standard"
        dxSize="md"
        dxStyle="outlined"
        onClick={copy}
      />
      <Tooltip ref={tooltip.setTooltip}>Copy link</Tooltip>
    </>
  );
}
