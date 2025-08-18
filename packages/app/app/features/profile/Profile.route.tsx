import { css } from "@linaria/core";
import { makeFontFamily } from "@nccl/theme";

import { PageSection } from "../../components/page";

const clerkCSSOverrides = css`
  .cl-cardBox {
    box-shadow: unset;
    border-radius: 0;
    font-family: ${makeFontFamily("body")};
  }
`;

export default function ProfileRoute() {
  return (
    <PageSection className={clerkCSSOverrides}>Work in progress</PageSection>
  );
}
