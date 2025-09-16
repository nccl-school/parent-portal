import { css } from "@linaria/core";
import { ModalController } from "@nccl/components";
import { makeRem, makeResponsive } from "@nccl/theme";

import { AccountSecurityChangePasswordContent } from "./AccountSecurityChangePasswordContent";

const styles = css`
  ${makeResponsive({ from: "laptop" })} {
    width: ${makeRem(500)};
  }
`;

export const AccountSecurityChangePassword = new ModalController({
  props: {
    dxVariant: "modal",
    className: styles,
  },
  ModalContent: AccountSecurityChangePasswordContent,
});
