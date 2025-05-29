import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";
import { css } from "@linaria/core";
import { makeColor, makeRem, makeReset, makeResponsive } from "@nccl/theme";

import { useModal } from "../modal/modal.useModal.js";
import { Modal } from "../modal/Modal.js";
import { Icon } from "../icons/Icon.js";

export type NavbarSecondaryPropsNative = JSX.IntrinsicElements["nav"];
// export type NavbarSecondaryPropsCustom = {};
export type NavbarSecondaryProps = NavbarSecondaryPropsNative;

const styles = css`
  ${makeResponsive({ to: "laptop" })} {
    dialog {
      width: 80vw;
    }
    .desktop {
      display: none;
    }

    .close {
      ${makeReset("button")};
      position: absolute;
      display: grid;
      place-content: center;
      height: ${makeRem(44)};
      aspect-ratio: 1 / 1;
      top: ${makeRem(12)};
      right: ${makeRem(12)};
    }
  }

  ${makeResponsive({ from: "laptop" })} {
    height: 100%;

    & > button {
      display: none;
    }
    .desktop {
      height: 100%;
      min-width: ${makeRem(280)};
      border-right: 1px solid ${makeColor("neutral-dark-50", { opacity: 0.2 })};
    }
  }
`;

export const NavbarSecondary = forwardRef<HTMLElement, NavbarSecondaryProps>(
  function NavbarSecondary({ children, className, ...restProps }, ref) {
    const engine = useModal({ closeOnBackdropClick: true });

    return (
      <div className={styles}>
        <button onClick={engine.open}>Open</button>
        <Modal dxEngine={engine} dxVariant="drawer-ltr">
          <button className="close" onClick={engine.close}>
            <Icon dxIcon="cancel-01-stroke-standard" dxSize={24} />
          </button>
          <nav {...restProps} className={classes(className)} ref={ref}>
            {children}
          </nav>
        </Modal>
        <nav {...restProps} className={classes(className, "desktop")} ref={ref}>
          {children}
        </nav>
      </div>
    );
  }
);
