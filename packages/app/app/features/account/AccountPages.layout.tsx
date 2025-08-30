import { css } from "@linaria/core";
import { Outlet } from "react-router";

import { AccountNav } from "./AccountNav";

import { CLASSES } from "../../utils/isomorphic";

const mainStyles = css`
  grid-area: main;
  background: white;
  overflow: hidden;
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
