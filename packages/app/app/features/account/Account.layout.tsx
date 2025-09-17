import { css } from "@linaria/core";
import { makeCustom, makeRem, makeResponsive } from "@nccl/theme";
import { Outlet } from "react-router";

import { PageContainer } from "../../components/page/PageContainer";

const styles = css`
  ${makeResponsive({ to: "laptop" })} {
    padding: 0 ${makeCustom("page--gutter-mobile")};
  }
  ${makeResponsive({ from: "laptop" })} {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "nav main";
    height: 100%;
    width: 100%;
    column-gap: ${makeRem(32)};
  }
`;

export default function AccountLayout() {
  return (
    <PageContainer dxVariant="static" className={styles}>
      <Outlet />
    </PageContainer>
  );
}
