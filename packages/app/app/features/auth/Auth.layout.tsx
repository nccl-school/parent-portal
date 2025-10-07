import { css } from "@linaria/core";
import { makeColor, makeRem, makeResponsive } from "@nccl/theme";
import { Outlet, redirect } from "react-router";

import type { Route } from "./+types/Auth.layout";

const styles = css`
  width: 100vw;
  display: grid;
  place-content: center;

  ${makeResponsive({ to: "mobile" })} {
    min-height: 100vh;
    padding: 0;
  }
  ${makeResponsive({ from: "mobile" })} {
    display: grid;
    place-content: center;
    height: 100vh;
  }

  article {
    background: ${makeColor("white")};
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.08),
      0 8px 24px rgba(0, 0, 0, 0.05),
      0 0 50px rgba(173, 216, 230, 0.35),
      0 0 70px rgba(255, 182, 193, 0.25);

    ${makeResponsive({ to: "mobile" })} {
      padding: ${makeRem(16)} ${makeRem(32)};
      min-height: 100vh;
      width: 100vw;
    }
    ${makeResponsive({ from: "mobile" })} {
      border-radius: ${makeRem(16)};
      padding: ${makeRem(32)} ${makeRem(32)} ${makeRem(44)} ${makeRem(32)};
      width: ${makeRem(500)};
    }

    header > img {
      height: ${makeRem(50)};
      width: auto;
      object-fit: contain;

      ${makeResponsive({ to: "laptop" })} {
        margin: ${makeRem(16)} auto;
        text-align: center;
      }

      ${makeResponsive({ from: "laptop" })} {
        margin: ${makeRem(32)} 0;
        height: ${makeRem(80)};
      }
    }
  }
`;

export async function loader(args: Route.LoaderArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  const res = await ncclClient.auth.getSession();
  if (res?.session) {
    console.log("User is already signed in. Redirecting to home");
    throw redirect("/");
  }
}

export default function AuthLayout() {
  return (
    <main className={styles}>
      <article>
        <header>
          <img
            src="/images/ncc-logo-shell-only-500x500-transparent.png"
            alt="nccl-logo"
          />
        </header>
        <Outlet />
      </article>
    </main>
  );
}
