import { SignIn } from "@clerk/react-router";
import { css } from "@linaria/core";
import { makeFontFamily, makeRem, makeResponsive } from "@nccl/theme";
import { Typography } from "@nccl/components";

import { assembleTitle } from "../../utils/util.assemble-title";

const styles = css`
  width: 100vw;
  height: 100vh;
  display: grid;

  /* Clerk Overrides */
  .cl-cardBox {
    box-shadow: unset;
    max-width: unset;
    width: auto;
  }

  .cl-header {
    font-family: ${makeFontFamily("heading")};
  }
  .cl-headerTitle {
    font-size: ${makeRem(18)};
  }

  /* Mobile */
  ${makeResponsive({ to: "laptop" })} {
    place-content: center;
    padding: 2rem;
    overflow: hidden;
    background: url("/images/NCCLMosaicWall.jpeg");
    background-size: cover;
    background-blend-mode: color;
    font-family: ${makeFontFamily("body")};

    .pane-display {
      display: none !important;
    }

    .cl-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(4px);
    }
  }

  ${makeResponsive({ from: "laptop" })} {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: minmax(50%, 60%) minmax(500px, 1fr);
    gap: 3rem;
    padding: 3rem;

    & > * {
      border-radius: ${makeRem(16)};
    }

    .pane-display {
      background: url("/images/NCCLMosaicWall.jpeg");
      background-size: cover;
      background-blend-mode: color;
      display: grid;
      place-content: center;
      padding: 4rem;

      .quote {
        width: 100%;
        height: 100%;
        text-align: center;
        padding: 4rem;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(4px);
        border-radius: ${makeRem(16)};

        .heading1 {
          margin: 1rem 0;
        }

        div {
          white-space: nowrap;
        }
      }
    }

    .pane-auth {
      height: 100%;
      width: 100%;
      background: white;
      padding-right: 0;
      display: grid;
      place-content: center;
      font-family: ${makeFontFamily("body")};

      .cl-cardBox {
        box-shadow: unset;
        max-width: unset;
        width: auto;
      }

      .cl-logoBox {
        height: ${makeRem(100)};
      }
      .cl-header {
        font-family: ${makeFontFamily("heading")};
      }
      .cl-headerTitle {
        font-size: ${makeRem(24)};
        white-space: nowrap;
      }
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
    <main className={styles}>
      <article className="pane-display">
        <div className="quote">
          <Typography dxVariant="heading1" dxNode="div">
            <div>Tell me,</div>
            <div>I forget.</div>
          </Typography>
          <br />
          <Typography dxVariant="heading1" dxNode="div">
            <div>Show me,</div>
            <div>I remember.</div>
          </Typography>
          <br />
          <Typography dxVariant="heading1" dxNode="div">
            <div>Involve me,</div>
            <div>I understand.</div>
          </Typography>
        </div>
      </article>
      <article className="pane-auth">
        <SignIn oauthFlow="redirect" />
      </article>
    </main>
  );
}
