import { Outlet } from "react-router";
import { css } from "@linaria/core";
import { makeResponsive, makeCustom } from "@nccl/theme";

import { PageHeader } from "../../components/page";
import { PageContainer } from "../../components/page/PageContainer";

const styles = css`
  ${makeResponsive({ to: "laptop" })} {
    padding: 0 ${makeCustom("page--gutter-mobile")};
  }
`;

export default function MoreLayout() {
  return (
    <PageContainer dxVariant="scrollable" className={styles}>
      <PageHeader
        dxTitle="More Resources"
        dxSubtitle="Explore more actions you can take as parents"
      />
      <Outlet />
    </PageContainer>
  );
}
