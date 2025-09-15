import { css } from "@linaria/core";
import { ModalController } from "@nccl/components";
import { makeRem, makeResponsive } from "@nccl/theme";

import { AccountProfileBioContent } from "./AccountProfileBioContent";

const styles = css`
  ${makeResponsive({ from: "laptop" })} {
    width: ${makeRem(500)};
  }
`;

export const AccountProfileBio = new ModalController({
  props: {
    dxVariant: "modal",
    className: styles,
  },
  ModalContent: AccountProfileBioContent,
});
