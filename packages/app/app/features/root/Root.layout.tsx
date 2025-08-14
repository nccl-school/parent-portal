import { Outlet } from "react-router";
import { css } from "@linaria/core";
import { makeColor, makeCustom, makeResponsive } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import { useUser } from "@clerk/react-router";
import { H } from "@highlight-run/remix/client";
import { useEffect } from "react";

import type { Route } from "./+types/Root.layout";
import { RootNavbar } from "./RootNavbar";
import { RootHeader } from "./RootHeader";

import { backgroundGradient } from "../../utils/isomorphic";
import { ensureUser } from "../../utils/server";

export async function loader(loaderArgs: Route.LoaderArgs) {
  await ensureUser(loaderArgs);
}

const styles = css`
  width: 100vw;
  display: grid;

  ${makeResponsive({ to: "laptop" })} {
    grid-template-rows: 1fr auto;
    grid-template-areas:
      "head"
      "main"
      "nav";
  }

  ${makeResponsive({ from: "laptop" })} {
    grid-template-rows: auto 1fr;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "nav head"
      "nav main";
    height: 100vh;
  }

  .layout-head {
    grid-area: head;
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);

    header {
      justify-content: flex-end;
    }
  }

  .layout-main {
    grid-area: main;
    height: 100%;
    overflow: hidden;

    ${makeResponsive({ to: "laptop" })} {
      padding-bottom: ${makeCustom("navbar--height-mobile")};
    }
  }

  .layout-nav {
    grid-area: nav;
    position: sticky;
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);

    ${makeResponsive({ to: "laptop" })} {
      position: sticky;
      bottom: 0;
    }

    ${makeResponsive({ from: "laptop" })} {
      top: 0;
      height: 100vh;
      box-shadow:
        6px 0px 5px ${makeColor("neutral-light-50", { opacity: 0.7 })},
        7px 0px 19px 8px ${makeColor("neutral-light-50", { opacity: 0.3 })};
    }
  }
`;

export default function RootLayout() {
  const { user } = useUser();

  const email = user?.emailAddresses[0].emailAddress;
  const fullName = user?.fullName;

  // Track the user's session
  useEffect(() => {
    if (!email) return;
    H.identify(email, {
      name: fullName,
    });
  }, [email, fullName]);

  return (
    <div className={classes(styles, backgroundGradient)}>
      <div className="layout-head">
        <RootHeader />
      </div>
      <div className="layout-main">
        <Outlet />
      </div>
      <div className="layout-nav">
        <RootNavbar />
      </div>
    </div>
  );
}
