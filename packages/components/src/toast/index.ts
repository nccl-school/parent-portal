import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import { makeRem } from "@nccl/theme";

import type { ToastProps } from "./Toast.js";
import { Toast } from "./Toast.js";
import { Toaster as ToastController } from "./Toaster.js";

const styles = css`
  position: fixed;
  bottom: ${makeRem(24)};
  right: ${makeRem(24)};
  width: ${makeRem(400)};
  display: flex;
  gap: ${makeRem(16)};
  flex-direction: column;
`;

export const Toaster = new ToastController<ToastProps>({
  ToastComponent: Toast,
  containerClassName: classes("toaster", styles),
});
