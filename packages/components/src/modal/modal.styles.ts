import { css } from "@linaria/core";
import { makeColor, makeCustom, makeRem, makeResponsive } from "@nccl/theme";

export type ModalVariants = "modal" | "drawer-right" | "drawer-bottom";

const duration = ".3s";

export const modalStyles: { [key in ModalVariants]: string } = {
  "drawer-right": css`
    @keyframes animate-open {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes animate-close {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }

    // Base
    position: fixed !important;
    top: 0;
    right: 0;
    left: unset;
    height: 100dvh;
    width: max-content;
    margin: 0;
    max-height: unset;
    max-width: unset;
    border-top-left-radius: ${makeRem(8)};
    border-bottom-left-radius: ${makeRem(8)};

    // Open
    &[open] {
      animation: animate-open ${duration} ease-in-out;
    }

    // Close
    &.close {
      animation: animate-close ${duration} ease-in-out;
    }
  `,
  "drawer-bottom": css`
    @keyframes animate-open {
      from {
        opacity: 0;
        transform: translateY(100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes animate-close {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(100%);
      }
    }

    // Base
    position: fixed !important;
    top: unset;
    right: 0;
    left: 0;
    width: 100vw;
    height: auto;
    margin: 0;
    max-height: calc(100vh - 40px);
    max-width: unset;
    border-top-left-radius: ${makeRem(8)};
    border-top-right-radius: ${makeRem(8)};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    // Open
    &[open] {
      animation: animate-open ${duration} ease-in-out;
    }

    // Close
    &.close {
      animation: animate-close ${duration} ease-in-out;
    }
  `,
  modal: css`
    @keyframes animate-open {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes animate-close {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.9);
      }
    }

    // Base
    margin: auto !important;
    box-shadow: 0px 4px 4px 0px #00000040;
    border-radius: ${makeRem(4)};

    // Open
    &[open] {
      animation: animate-open ${duration} ease-in-out;
    }

    // Close
    &.close {
      animation: animate-close ${duration} ease-in-out;
    }
  `,
};

export const modalStylesBackdrop = css`
  ${makeResponsive({ to: "laptop" })} {
    --modal-gutters: ${makeCustom("modal--gutters-mobile")};
  }

  ${makeResponsive({ from: "laptop" })} {
    --modal-gutters: ${makeCustom("modal--gutters-desktop")};
  }

  --shadow-color: 0deg 0% 37%;
  --drawer-shadow:
    0.2px 0px 0.2px hsl(var(--shadow-color) / 0.36),
    0.7px 0px 0.8px -0.8px hsl(var(--shadow-color) / 0.36),
    1.7px 0px 1.9px -1.7px hsl(var(--shadow-color) / 0.36),
    4.1px 0px 4.6px -2.5px hsl(var(--shadow-color) / 0.36);
  padding: 0;
  border: 0;
  margin: 0;
  box-shadow: var(--drawer-shadow);
  backdrop-filter: blur(2px);

  @keyframes animate-open {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes animate-close {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  // Base
  &::backdrop {
    background: ${makeColor("neutral-dark", { opacity: 0.3 })};
  }

  // Open
  &[open]::backdrop {
    animation: animate-open ${duration} ease-in-out;
  }

  // Close
  &.close::backdrop {
    animation: animate-close ${duration} ease-in-out;
  }
`;
