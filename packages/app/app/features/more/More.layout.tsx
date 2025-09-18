import { Outlet } from "react-router";
import { css } from "@linaria/core";
import { makeResponsive, makeColor, makeRem, makeCustom } from "@nccl/theme";

import { PageHeader } from "../../components/page";
import { PageContainer } from "../../components/page/PageContainer";
import { CLASSES } from "../../utils/isomorphic";

const styles = css`
  ${makeResponsive({ to: "laptop" })} {
    background: ${makeColor("white")};
  }

  ${makeResponsive({ from: "tablet", to: "laptop" })} {
    padding: ${makeRem(32)} ${makeRem(16)};
  }

  ${makeResponsive({ from: "laptop" })} {
    max-width: ${makeCustom("container--max-width")};
    margin: 0 auto;
  }
`;

export default function MoreLayout() {
  return (
    <PageContainer dxVariant="scrollable" className={styles}>
      <PageHeader
        dxTitle="More Resources"
        dxSubtitle="Explore more actions you can take as parents"
        className={CLASSES.desktopOnly}
      />
      <Outlet />
    </PageContainer>
  );
}
