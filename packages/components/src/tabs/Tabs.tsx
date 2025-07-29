import { makeColor, makePx, makeRem, makeReset } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef, useCallback, useMemo, useRef } from "react";
import { css } from "@linaria/core";

import type { UseTrackingNodeCallback } from "../hooks/index.js";
import { useTrackingNode } from "../hooks/index.js";

export type TabsPropsNative = JSX.IntrinsicElements["ul"];
export type TabsPropsCustom = {
  /**
   * The color of the tabs
   * @default secondary
   */
  dxColor?: "primary" | "secondary";
};
export type TabsProps = TabsPropsNative & TabsPropsCustom;

const styles = css`
  ${makeReset("ul")};
  display: flex;
  position: relative;

  a {
    text-decoration: none !important;
    cursor: pointer !important;
  }
`;

const divStyles = css`
  position: absolute;
  height: ${makeRem(2)};
  bottom: 0;
  transition: all 0.2s ease-in-out;

  &.primary {
    background: ${makeColor("primary-500")};
  }
  &.secondary {
    background: ${makeColor("secondary-800")};
  }
`;

export const Tabs = forwardRef<HTMLUListElement, TabsProps>(function Tabs(
  { children, className, dxColor = "secondary", ...restProps },
  ref
) {
  const navRef = useRef<HTMLElement | null>(null);

  const moveNode = useCallback<
    UseTrackingNodeCallback<
      HTMLDivElement,
      HTMLAnchorElement | HTMLButtonElement
    >
  >(
    (anchor, div) => {
      if (!navRef.current) return;

      // calculate the left position relative to the container and not the viewport
      // since this can be in a sticky container which would skew the anchorRect
      // calculations
      const containerRect = navRef.current.getBoundingClientRect();
      const anchorRect = anchor.getBoundingClientRect();
      const left = anchorRect.left - containerRect.left;

      div.style.left = makePx(left);
      div.style.width = makePx(anchorRect.width);
    },
    [navRef]
  );

  const divRef = useTrackingNode<
    HTMLDivElement,
    HTMLAnchorElement | HTMLButtonElement
  >(navRef, ".active", moveNode, { attributeFilter: ["class"] });

  return (
    <nav ref={navRef}>
      <ul {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
        {useMemo(
          () => (
            <div ref={divRef} className={classes(divStyles, dxColor)} />
          ),
          [divRef, dxColor]
        )}
      </ul>
    </nav>
  );
});
