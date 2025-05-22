import { getAuth } from "@clerk/react-router/ssr.server";
import { Outlet, redirect } from "react-router";
import { css } from "@linaria/core";
import { makeCustom, makeResponsive } from "@nccl/theme";

import type { Route } from "./+types/Root.layout";
import { RootNavbar } from "./RootNavbar";

export async function loader(loaderArgs: Route.LoaderArgs) {
  // Use `getAuth()` to get the user's ID
  const { userId } = await getAuth(loaderArgs);
  // const product = await fakeDb.getProduct(params.pid);
  // return product;
  // Protect the route by checking if the user is signed in
  if (!userId) {
    return redirect("/sign-in?redirect_url=" + loaderArgs.request.url);
  }
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
  }

  .layout-head {
    grid-area: head;
    position: sticky;
    top: 0;
  }

  .layout-main {
    grid-area: main;
    padding-bottom: ${makeCustom("navbar--height-mobile")};
  }

  .layout-nav {
    grid-area: nav;
    position: sticky;

    ${makeResponsive({ to: "laptop" })} {
      position: sticky;
      bottom: 0;
    }

    ${makeResponsive({ from: "laptop" })} {
      top: 0;
      height: 100vh;
    }
  }
`;

export default function RootLayout() {
  return (
    <div className={styles}>
      <div className="layout-head">
        <header>this be the head</header>
      </div>
      <div className="layout-main">
        <Outlet />
        <div style={{ height: 10000 }} />
      </div>
      <div className="layout-nav">
        <RootNavbar />
      </div>
    </div>
  );
}
