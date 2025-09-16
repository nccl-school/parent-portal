import type { PopoverOptions } from "../popover-2.0/PopoverEngine.js";
import { PopoverEngine } from "../popover-2.0/PopoverEngine.js";

export type TooltipType = "label" | "clarification";
export type TooltipOptions = Partial<
  Pick<PopoverOptions, "offset" | "position">
> & {
  type?: TooltipType;
};

export class TooltipEngine {
  #popover: PopoverEngine;
  #id: string;
  #type: TooltipType;

  constructor(options?: TooltipOptions) {
    this.#popover = new PopoverEngine({
      ...(options ?? {}),
      type: "auto",
    });
    this.setTooltip = this.#popover.setPopover.bind(this);
    this.setTarget = this.setTarget.bind(this);
    this.setTarget = this.setTarget.bind(this);
    this.#type = options?.type ?? "clarification";
    this.#id = crypto.randomUUID();
  }

  #addAttributes({
    popover,
    target,
  }: {
    popover?: HTMLElement;
    target?: HTMLButtonElement;
  }) {
    switch (this.#type) {
      case "label":
        if (!target) break;
        target.setAttribute("aria-labelledby", this.#id);
        break;

      case "clarification":
        if (!target) break;
        target.setAttribute("aria-describedby", this.#id);
        break;

      default:
        break;
    }

    if (popover) {
      popover.setAttribute("id", this.#id);
      popover.role = "tooltip";
    }
  }

  setTarget(node: HTMLButtonElement | null) {
    this.#popover.setTarget(node);
    const target = this.#popover.getTarget();
    this.#addAttributes({ target });

    target.addEventListener("mouseenter", this.#popover.show);
    target.addEventListener("mouseleave", this.#popover.hide);
    target.addEventListener("focus", this.#popover.show);
    target.addEventListener("blur", this.#popover.hide);
  }

  setTooltip(node: HTMLElement | null) {
    this.#popover.setPopover(node);
    const popover = this.#popover.getPopover();

    this.#addAttributes({ popover });
  }

  destroy() {
    this.#popover.destroy();
  }

  /**
   * Provided a node, this method will set the style to a
   * hide the node from the user but it will still allow it to be
   * announced by screen readers. Helpful when providing context
   * to a description such as adding a description to a number
   */
  hideAndAnnounce<T extends HTMLElement>(node: T | null) {
    if (!node) return;
    node.style.setProperty("clip-path", "inset(100%)");
    node.style.setProperty("clip", "rect(1px, 1px, 1px, 1px)");
    node.style.setProperty("height", "1px");
    node.style.setProperty("overflow", "hidden");
    node.style.setProperty("position", "absolute");
    node.style.setProperty("white-space", "nowrap");
    node.style.setProperty("width", "1px");
  }
}
