import { css } from "@linaria/core";
import { Outlet } from "react-router";
import { makeCustom, makeRem, makeResponsive } from "@nccl/theme";

import { AccountNav } from "./AccountNav";

import { CLASSES } from "../../utils/isomorphic";

const mainStyles = css`
  grid-area: main;
  overflow: hidden;

  ${makeResponsive({ from: "laptop" })} {
    margin-right: ${makeRem(32)};

    & > * {
      max-width: ${makeCustom("container--max-width")};
    }
  }
`;

export default function AccountPagesLayout() {
  return (
    <>
      <AccountNav className={CLASSES.desktopOnly} />
      <div className={mainStyles}>
        <Outlet />
      </div>
    </>
  );
}
