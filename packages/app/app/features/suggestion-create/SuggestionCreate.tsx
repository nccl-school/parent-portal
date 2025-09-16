import { css } from "@linaria/core";
import { ModalController } from "@nccl/components";
import { makeRem } from "@nccl/theme";

import { SuggestionCreateContent } from "./SuggestionCreateContent";

const styles = css`
  max-width: ${makeRem(600)};
`;

export const SuggestionCreateDrawer = new ModalController({
  props: {
    dxVariant: "modal",
    className: styles,
  },
  ModalContent: SuggestionCreateContent,
});
