import { css } from "@linaria/core";
import { ModalController } from "@nccl/components";
import { makeRem, makeResponsive } from "@nccl/theme";

import { AccountProfileBasicContent } from "./AccountProfileBasicContent";

const styles = css`
  ${makeResponsive({ from: "laptop" })} {
    width: ${makeRem(500)};
  }
`;

export const AccountProfileBasic = new ModalController({
  props: {
    dxVariant: "modal",
    className: styles,
  },
  ModalContent: AccountProfileBasicContent,
});
