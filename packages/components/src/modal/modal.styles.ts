import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";

export type ModalVariants = "basic" | "drawer-ltr" | "drawer-rtl";
export const backdropStyles = css`
  --modal-animation-duration: 0.3s;
  --shadow-color: 0deg 0% 37%;
  --drawer-shadow:
    0.2px 0px 0.2px hsl(var(--shadow-color) / 0.36),
    0.7px 0px 0.8px -0.8px hsl(var(--shadow-color) / 0.36),
    1.7px 0px 1.9px -1.7px hsl(var(--shadow-color) / 0.36),
    4.1px 0px 4.6px -2.5px hsl(var(--shadow-color) / 0.36);

  // Open state
  &[open] {
    &::backdrop {
      background-color: rgb(0 0 0 / 25%);
      backdrop-filter: blur(10px);
    }
  }

  // Closed state
  padding: 0;
  border: 0;
  transition:
    opacity var(--modal-animation-duration) ease-out,
    transform var(--modal-animation-duration) ease-out,
    overlay var(--modal-animation-duration) ease-out allow-discrete,
    display var(--modal-animation-duration) ease-out allow-discrete;

  &::backdrop {
    background-color: rgb(0 0 0 / 0%);
    transition:
      display var(--modal-animation-duration) allow-discrete,
      overlay var(--modal-animation-duration) allow-discrete,
      background-color var(--modal-animation-duration);
  }

  // Starting style
  @starting-style {
    &[open] {
      &::backdrop {
        background-color: rgb(0 0 0 / 0%);
      }
    }
  }
`;
export const modalStyles: { [key in ModalVariants]: ReturnType<typeof css> } = {
  basic: css`
    --modal-size-open: 1;
    --modal-size-close: 0.92;

    // Open state
    &[open] {
      opacity: 1;
      transform: scale(var(--modal-size-open));
    }

    // Closed state
    opacity: 0;
    transform: scale(var(--modal-size-close));

    // Starting style
    @starting-style {
      &[open] {
        opacity: 0;
        transform: scale(var(--modal-size-close));
      }
    }
  `,
  "drawer-ltr": css`
    // Open state
    &[open] {
      transform: translateX(0);
    }

    // Closed state
    position: fixed;
    top: 0;
    left: 0;
    height: 100dvh;
    width: max-content;
    margin: 0;
    max-height: unset;
    max-width: unset;
    transform: translateX(-100%);
    border-top-right-radius: ${makeRem(8)};
    border-bottom-right-radius: ${makeRem(8)};
    box-shadow: var(--drawer-shadow);

    // Starting style
    @starting-style {
      &[open] {
        transform: translateX(-100%);
      }
    }
  `,
  "drawer-rtl": css`
    // Open state
    &[open] {
      transform: translateX(0);
    }

    // Closed state
    position: fixed !important;
    top: 0;
    right: 0;
    left: unset;
    height: 100vh;
    width: max-content;
    margin: 0;
    max-height: unset;
    max-width: unset;
    transform: translateX(100%);
    border-top-left-radius: ${makeRem(8)};
    border-bottom-left-radius: ${makeRem(8)};
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    box-shadow: var(--drawer-shadow);

    // Starting style
    @starting-style {
      &[open] {
        transform: translateX(100%);
      }
    }
  `,
};
