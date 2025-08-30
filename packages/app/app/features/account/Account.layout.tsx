import { css } from "@linaria/core";
import { makeResponsive } from "@nccl/theme";
import { Outlet } from "react-router";
import { classes } from "@stratum-ui/core/utils";

import { PageHeader } from "../../components/page";
import { PageContainer } from "../../components/page/PageContainer";
import { CLASSES } from "../../utils/isomorphic";

const styles = css`
  ${makeResponsive({ from: "laptop" })} {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "title title"
      "nav main";
    height: 100%;
    width: 100%;
  }
`;

const headStyles = css`
  grid-area: title;
`;

export default function AccountLayout() {
  return (
    <PageContainer dxVariant="static" className={styles}>
      <PageHeader
        dxTitle="Account Settings"
        className={classes(headStyles, CLASSES.desktopOnly)}
      />
      <Outlet />
    </PageContainer>
  );
}
