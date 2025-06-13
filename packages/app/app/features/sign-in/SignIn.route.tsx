import { SignIn } from "@clerk/react-router";
import { css } from "@linaria/core";
import {
  makeColor,
  makeFontFamily,
  makeRem,
  makeResponsive,
} from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";

import { backgroundGradient } from "../../utils/isomorphic";
import { assembleTitle } from "../../utils/util.assemble-title";

const styles = css`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;

  ${makeResponsive({ to: "laptop" })} {
    padding: 1rem;
  }
  ${makeResponsive({ from: "laptop" })} {
    display: grid;
    place-content: center;
  }

  /* Clerk Overrides */
  .cl-cardBox {
    box-shadow: unset;
    max-width: unset;
    width: auto;

    ${makeResponsive({ from: "laptop" })} {
      width: ${makeRem(460)} !important;
      border: 1px solid ${makeColor("neutral-dark-50", { opacity: 0.2 })};
    }
  }

  .cl-header {
    font-family: ${makeFontFamily("heading")};
  }
  .cl-headerTitle {
    font-size: ${makeRem(18)};
  }

  article {
    font-family: ${makeFontFamily("body")};
    max-width: 100%;
    max-height: 100%;

    .cl-card {
      backdrop-filter: blur(25px);
      background: rgba(255, 255, 255, 0.8);

      ${makeResponsive({ from: "laptop" })} {
        padding: ${makeRem(32)};
      }
    }

    .cl-cardBox {
      box-shadow: unset;
      max-width: unset;
      width: auto;
    }

    .cl-logoBox {
      ${makeResponsive({ to: "laptop" })} {
        height: ${makeRem(60)};
      }
      ${makeResponsive({ from: "laptop" })} {
        height: ${makeRem(120)};
      }
    }
    .cl-header {
      font-family: ${makeFontFamily("heading")};
    }
    .cl-headerTitle {
      ${makeResponsive({ to: "laptop" })} {
        font-size: ${makeRem(18)};
      }
      ${makeResponsive({ from: "laptop" })} {
        font-size: ${makeRem(24)};
      }
    }
    .cl-footer {
      display: none;
    }
  }
`;

export function meta() {
  return [
    { title: assembleTitle("Sign in") },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LandingRoute() {
  return (
    <main className={classes(styles, backgroundGradient)}>
      <article>
        <SignIn oauthFlow="redirect" />
      </article>
    </main>
  );
}
