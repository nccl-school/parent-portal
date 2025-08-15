import { css } from "@linaria/core";
import { makeColor, makeRem, makeResponsive } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import { Outlet } from "react-router";

import { assembleTitle } from "../../utils/util.assemble-title";
import { backgroundGradient } from "../../utils/isomorphic";

const styles = css`
  width: 100vw;
  display: grid;
  place-content: center;

  ${makeResponsive({ to: "laptop" })} {
    min-height: 100vh;
    padding: 0;
  }
  ${makeResponsive({ from: "laptop" })} {
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

    ${makeResponsive({ to: "laptop" })} {
      padding: ${makeRem(16)} ${makeRem(32)};
      min-height: 100vh;
    }
    ${makeResponsive({ from: "laptop" })} {
      border-radius: ${makeRem(16)};
      padding: ${makeRem(32)} ${makeRem(32)} ${makeRem(44)} ${makeRem(32)};
      width: ${makeRem(500)};
    }

    & > img {
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

export default function AuthLayout() {
  return (
    <main className={classes(styles, backgroundGradient)}>
      <title>{assembleTitle("Accept Invite")}</title>
      <article>
        <img
          src="/images/ncc-logo-shell-only-500x500-transparent.png"
          alt="nccl-logo"
        />
        <div>
          <Outlet />
        </div>
      </article>
    </main>
  );
}
