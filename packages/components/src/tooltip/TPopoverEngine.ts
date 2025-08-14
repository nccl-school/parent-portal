import { exhaustiveMatchGuard } from "../_core/utils/index.js";

export type PopoverTargetAction = "show" | "hide" | "toggle";
export type PopoverType = "auto" | "manual" | "hint";
export type PopoverPosition =
  | "top"
  | "top-left"
  | "top-right"
  | "top-span-right"
  | "top-span-left"
  | "right"
  | "right-span-top"
  | "right-span-bottom"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "bottom-span-right"
  | "bottom-span-left"
  | "left"
  | "left-span-top"
  | "left-span-bottom";
export type PopoverOffset = number;

export type PopoverOptions = {
  /**
   * ### `auto`
   * - Auto type is useful when you only want to show a single popover at once.
   * - The popover can be "light dismissed" — this means that you can hide the popover by clicking outside it.
   * - The popover can also be closed, using browser-specific mechanisms such as pressing the Esc key.
   * - Usually, only one auto popover can be shown at a time — showing a second popover when one is already shown will hide the first one. The exception to this rule is when you have nested auto popovers
   *
   * ### `manual`
   * - The popover cannot be "light dismissed", although declarative show/hide/toggle buttons (as seen earlier) will still work.
   * - Multiple independent popovers can be shown simultaneously.
   *
   * ## Docs
   * https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#auto_type_and_light_dismiss
   *
   * @default auto
   */
  type?: PopoverType;
  /**
   * Positions the popover relative to place on target
   *
   * This API abstracts some of the nuance associated with position the element and attempts to
   * bridge the knowledge gap with human readable semantics without having to do a lot of CSS / JS
   * gymnastics
   *
   * Regardless of the browser support, this API follows the `position-area` semantics set fourth
   * in the following MDN Document: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using#setting_a_position-area
   * Another follow up document: https://css-tricks.com/almanac/properties/p/position-anchor/#aa-method-2-position-area-property
   * @default `bottom`
   */
  position?: PopoverPosition;
  /**
   * The amount of space between the popover and it's associated target
   * @default 0
   */
  offset?: number;
};

type PopoverPositionProps = {
  top: number;
  left: number;
  translateX: string | 0;
  translateY: string | 0;
  positionArea: string;
  margin: string;
  popoverHeight: number;
  popoverWidth: number;
  flipped: PopoverPosition;
  currentPosition: PopoverPosition;
};

export class TPopoverEngine {
  #popover: HTMLElement | null = null;
  #target: HTMLButtonElement | null = null;
  #popoverTargetAction: PopoverTargetAction;

  #position: PopoverPosition;
  #offset: PopoverOffset;
  #type: PopoverType;

  // prettier-ignore
  #FALLBACKS: Record<PopoverPosition, PopoverPosition[]> = {
    top:    ["top", "bottom", "right", "left"],
    bottom: ["bottom", "top", "right", "left"],
    left:   ["left", "right", "left-span-top", "left-span-bottom", "top-left", "bottom-left"],
    right:  ["right", "left", "right-span-top", "right-span-bottom", "top-right", "bottom-right"],

    // corners
    "top-left":     ["top-left", "bottom-left", "top-right", "bottom-right", "left", "right", "top", "bottom"],
    "top-right":    ["top-right", "bottom-right", "top-left", "bottom-left", "right", "left", "top", "bottom"],
    "bottom-left":  ["bottom-left", "top-left", "bottom-right", "top-right", "left", "right", "bottom", "top"],
    "bottom-right": ["bottom-right","top-right","bottom-left","top-left","right","left","bottom","top"],

    // span variants follow the same idea as their corner siblings
    "top-span-left":     ["top-span-left", "bottom-span-left", "top-span-right", "bottom-span-right", "top-left", "bottom-left"],
    "top-span-right":    ["top-span-right","bottom-span-right","top-span-left","bottom-span-left","top-right","bottom-right"],
    "bottom-span-left":  ["bottom-span-left","top-span-left","bottom-span-right","top-span-right","bottom-left","top-left"],
    "bottom-span-right": ["bottom-span-right","top-span-right","bottom-span-left","top-span-left","bottom-right","top-right"],

    "left-span-top":     ["left-span-top", "right-span-top", "left-span-bottom", "right-span-bottom", "left", "right"],
    "left-span-bottom":  ["left-span-bottom","right-span-bottom","left-span-top","right-span-top","left","right"],
    "right-span-top":    ["right-span-top","left-span-top","right-span-bottom","left-span-bottom","right","left"],
    "right-span-bottom": ["right-span-bottom","left-span-bottom","right-span-top","left-span-top","right","left"],
  };

  constructor(options: PopoverOptions) {
    this.#popoverTargetAction = "toggle";
    this.#position = options.position ?? "bottom";
    this.#offset = options.offset ?? 0;
    this.#type = options.type ?? "auto";

    this.setPopover = this.setPopover.bind(this);
    this.setTarget = this.setTarget.bind(this);
    this.toggle = this.toggle.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  getPopover() {
    if (!this.#popover) {
      throw "Cannot get the popover. Popover has not been set.";
    }
    return this.#popover;
  }

  getTarget() {
    if (!this.#target) {
      throw "Cannot get the popover target. Popover target has not been set.";
    }
    return this.#target;
  }

  #onToggle = (e: Event) => {
    const event = e as ToggleEvent;
    const popover = this.getPopover();
    const target = this.getTarget();

    if (event.newState === "open") {
      popover.ariaExpanded = "true";
    }

    if (event.newState === "closed") {
      popover.ariaExpanded = "false";
      target.style.removeProperty("anchorName");
      target.style.removeProperty("fixed");
      target.style.removeProperty("positionAnchor");
    }
  };

  isOpen() {
    const popover = this.getPopover();
    return popover.matches(":popover-open");
  }

  #getPositionProperties(position: PopoverPosition): PopoverPositionProps {
    const target = this.getTarget();
    const rect = target.getBoundingClientRect();
    const popover = this.getPopover();

    // 1. Calculate popover dimensions
    const initialStyles = {
      visibility: popover.style.visibility,
      opacity: popover.style.opacity,
      display: popover.style.display,
      position: popover.style.position,
      left: popover.style.left,
      top: popover.style.top,
      transform: popover.style.transform,
    };

    // Measure the popover without it flashing
    popover.style.visibility = "hidden";
    popover.style.display = "block";
    popover.style.opacity = "0";
    popover.style.position = "fixed";
    popover.style.left = "0px";
    popover.style.top = "0px";
    popover.style.transform = "none";

    const popoverWidth = popover.offsetWidth;
    const popoverHeight = popover.offsetHeight;

    // Restore the popover back to it's original non-visible state
    popover.style.visibility = initialStyles.visibility;
    popover.style.opacity = initialStyles.opacity;
    popover.style.display = initialStyles.display;
    popover.style.position = initialStyles.position;
    popover.style.left = initialStyles.left;
    popover.style.top = initialStyles.top;
    popover.style.transform = initialStyles.transform;

    let top = rect.top;
    let left = rect.left;
    let translateX: string | 0 = 0;
    let translateY: string | 0 = 0;
    let positionArea: string = position;
    let margin: string = "0px";
    let flipped: PopoverPosition = "top"; // setting it here shouldn't matter since it's exhaustively checked
    const offset = this.#offset;

    function calcMargin({
      left = 0,
      top = 0,
      right = 0,
      bottom = 0,
    }: Partial<{ top: number; right: number; bottom: number; left: number }>) {
      return `${top}px ${right}px ${bottom}px ${left}px `;
    }

    // 2. Determine some more attributes based upon the selected posotion
    switch (position) {
      case "bottom":
        positionArea = "bottom";
        top = rect.bottom + offset;
        left = rect.left + rect.width / 2;
        translateX = "-50%";
        translateY = 0;
        margin = calcMargin({ top: offset });
        flipped = "top";
        break;

      case "bottom-left":
        positionArea = "bottom right";
        top = rect.bottom + offset;
        left = rect.left;
        translateX = "-100%";
        margin = calcMargin({ top: offset });
        flipped = "top-left";
        break;

      case "bottom-right":
        positionArea = "bottom left";
        top = rect.bottom + offset;
        left = rect.right;
        margin = calcMargin({ top: offset });
        flipped = "top-right";
        break;

      case "bottom-span-left":
        positionArea = "bottom span-left";
        top = rect.bottom + offset;
        left = rect.right;
        translateX = "-100%";
        margin = calcMargin({ top: offset });
        flipped = "top-span-left";
        break;

      case "bottom-span-right":
        positionArea = "bottom span-right";
        top = rect.bottom + offset;
        left = rect.left;
        margin = calcMargin({ top: offset });
        flipped = "top-span-right";
        break;

      case "top":
        positionArea = "top";
        left = rect.left + rect.width / 2;
        top = rect.top - offset;
        translateX = "-50%";
        translateY = "-100%";
        margin = calcMargin({ bottom: offset });
        flipped = "bottom";
        break;

      case "top-left":
        positionArea = "top left";
        top = rect.top - offset;
        translateY = "-100%";
        translateX = "-100%";
        margin = calcMargin({ bottom: offset });
        flipped = "bottom-left";
        break;

      case "top-right":
        positionArea = "top right";
        top = rect.top - offset;
        left = rect.right;
        translateY = "-100%";
        margin = calcMargin({ bottom: offset });
        flipped = "bottom-right";
        break;

      case "top-span-left":
        positionArea = "top span-left";
        top = rect.top - offset;
        left = rect.right;
        translateY = "-100%";
        translateX = "-100%";
        margin = calcMargin({ bottom: offset });
        flipped = "bottom-span-left";
        break;

      case "top-span-right":
        positionArea = "top span-right";
        top = rect.top - offset;
        translateY = "-100%";
        margin = calcMargin({ bottom: offset });
        flipped = "bottom-span-right";
        break;

      case "left":
        positionArea = "left";
        top = rect.top + rect.height / 2;
        left = rect.left - popoverWidth - offset;
        translateX = "-100%";
        translateY = "-50%";
        margin = calcMargin({ left: offset });
        flipped = "right";
        break;

      case "left-span-bottom":
        positionArea = "left span-bottom";
        left = rect.left - popoverWidth - offset;
        translateX = "-100%";
        margin = calcMargin({ left: offset });
        flipped = "right-span-bottom";
        break;

      case "left-span-top":
        positionArea = "left span-top";
        top = rect.bottom + offset;
        left = rect.left - popoverWidth - offset;
        translateX = "-100%";
        translateY = "-100%";
        margin = calcMargin({ left: offset });
        flipped = "right-span-top";
        break;

      case "right":
        positionArea = "right";
        top = rect.top + rect.height / 2;
        left = rect.right + offset;
        translateX = 0;
        translateY = "-50%";
        margin = calcMargin({ right: offset });
        flipped = "left";
        break;

      case "right-span-bottom":
        positionArea = "right span-bottom";
        left = rect.right + offset;
        margin = calcMargin({ right: offset });
        flipped = "left-span-bottom";
        break;

      case "right-span-top":
        positionArea = "right span-top";
        top = rect.bottom;
        left = rect.right + offset;
        translateY = "-100%";
        margin = calcMargin({ right: offset });
        flipped = "left-span-top";
        break;

      default:
        exhaustiveMatchGuard(position);
    }
    return {
      top,
      left,
      translateX,
      translateY,
      positionArea,
      margin,
      popoverHeight,
      popoverWidth,
      flipped,
      currentPosition: position,
    };
  }

  #detectOverflow(props: PopoverPositionProps, gutter = 8) {
    const txToPx = (tx: string | 0, w: number) =>
      tx === 0 ? 0 : tx === "-50%" ? -w / 2 : tx === "-100%" ? -w : 0;
    const tyToPx = (ty: string | 0, h: number) =>
      ty === 0 ? 0 : ty === "-50%" ? -h / 2 : ty === "-100%" ? -h : 0;

    const { popoverHeight: height, popoverWidth: width } = props;
    const x = props.left + txToPx(props.translateX, width);
    const y = props.top + tyToPx(props.translateY, height);

    const vw = window.innerWidth,
      vh = window.innerHeight;

    const overLeft = Math.max(0, gutter - x);
    const overTop = Math.max(0, gutter - y);
    const overRight = Math.max(0, x + width + gutter - vw);
    const overBottom = Math.max(0, y + height + gutter - vh);

    const total = overLeft + overRight + overTop + overBottom;
    const isColliding = total > 0;

    // exact nudge needed to fit
    const dx = overLeft ? overLeft : overRight ? -overRight : 0;
    const dy = overTop ? overTop : overBottom ? -overBottom : 0;

    return {
      isColliding,
      overLeft,
      overRight,
      overTop,
      overBottom,
      total,
      dx,
      dy,
      x,
      y,
      width,
      height,
    };
  }

  #calculatePopoverPosition() {
    const gutter = 8;
    const tried = new Set<PopoverPosition>();
    const order = (this.#FALLBACKS[this.#position] ?? [this.#position]).filter(
      (p) => !tried.has(p) && (tried.add(p), true)
    ); // dedupe, preserve order

    let bestProps: PopoverPositionProps | null = null;
    let bestOverflow = Infinity;

    for (const p of order) {
      const props = this.#getPositionProperties(p);
      const overflow = this.#detectOverflow(props, gutter);

      if (!overflow.isColliding) {
        return this.#setPopoverPosition({
          top: props.top,
          left: props.left,
          translateX: props.translateX,
          translateY: props.translateY,
        });
      }

      if (overflow.total < bestOverflow) {
        bestOverflow = overflow.total;
        bestProps = props;
      }
    }

    // Nothing fits: clamp the least-overflowing candidate
    if (bestProps) {
      const overflow = this.#detectOverflow(bestProps, gutter);
      return this.#setPopoverPosition({
        top: bestProps.top + overflow.dy,
        left: bestProps.left + overflow.dx,
        translateX: bestProps.translateX,
        translateY: bestProps.translateY,
      });
    }
  }

  #setPopoverPosition({
    top,
    left,
    translateX,
    translateY,
  }: {
    top: number;
    left: number;
    translateX: string | 0;
    translateY: string | 0;
  }) {
    const popover = this.getPopover();
    popover.style.margin = "0px";
    popover.style.position = "fixed";
    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
    popover.style.transform = `translate(${translateX}, ${translateY})`;
  }

  setPopover(node: HTMLElement | null) {
    if (!node) return;
    this.#popover = node;
    this.#popover.popover = this.#type;

    this.#popover.addEventListener("toggle", this.#onToggle);

    return () => {
      if (!this.#popover) return;
      this.#popover.removeEventListener("toggle", this.#onToggle);
    };
  }

  setTarget(node: HTMLButtonElement | null) {
    if (!node) return;
    this.#target = node;
    this.#target.popoverTargetAction = this.#popoverTargetAction;
  }

  show() {
    if (this.isOpen()) return;
    const popover = this.getPopover();
    this.#calculatePopoverPosition();
    popover.classList.remove("close");
    popover.classList.add("open");
    popover.showPopover();
  }

  toggle() {
    if (this.isOpen()) {
      return this.hide();
    }
    return this.show();
  }

  async hide() {
    if (!this.isOpen()) return;

    const popover = this.getPopover();
    popover.classList.remove("open");
    popover.classList.add("close");
    const animations = popover
      .getAnimations()
      .filter((animation) => animation instanceof CSSAnimation)
      .map((animation) => animation.finished);
    await Promise.all(animations);

    popover.hidePopover();
  }
}

// 1. Try to position with CSS first
// NOTE: Support for this is Sparse so electing for JS solution

// const canPositionUsingCSS = "positionArea" in popover.style;
// if (canPositionUsingCSS) {
//   const anchorName = `--${crypto.randomUUID()}`;
//   // @ts-expect-error experimental
//   target.style.anchorName = anchorName;
//   popover.style.position = "fixed";
//   // @ts-expect-error experimental
//   popover.style.positionAnchor = anchorName;
//   // @ts-expect-error experimental
//   popover.style.positionArea = props.positionArea;
//   popover.style.margin = props.margin;
//   // If you find anchor positioning still overflows in your target browsers,
//   // remove the early return and let the JS collision logic run instead.
// }
