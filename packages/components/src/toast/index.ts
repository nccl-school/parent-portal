import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import { makeRem } from "@nccl/theme";

import type { ToastProps } from "./Toast.js";
import { Toast } from "./Toast.js";
import { Toaster as ToastController } from "./Toaster.js";

const styles = css`
  position: fixed;
  width: ${makeRem(400)};
  display: flex;
  gap: ${makeRem(16)};
  flex-direction: column;
  margin: 0;
  border: 0;
  padding: 0;
  inset: auto ${makeRem(24)} ${makeRem(24)} auto !important;
  overflow: unset;
  background: none;
  z-index: 2147483648;
`;

export const Toaster = new ToastController<ToastProps>({
  ToastComponent: Toast,
  containerClassName: classes("toaster", styles),
});
