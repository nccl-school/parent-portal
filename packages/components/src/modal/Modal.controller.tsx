import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import type { ReactNode, MouseEvent } from "react";
import type { ModalOptions, ModalState } from "@stratum-ui/core/modal";
import { castDraft } from "immer";

import { Modal } from "./Modal.js";

import { ModalEngine } from "../_core/modal/ModalEngine.js";

export class ModalController<
  S extends ModalState = ModalState,
> extends ModalEngine<S> {
  private _container: HTMLDivElement | null = null;
  private _root: ReturnType<typeof createRoot> | null = null;

  constructor(args: Partial<ModalOptions>) {
    super({
      ...args,
      openOnMount: true,
    });
    this.launch = this.launch.bind(this);
  }

  Component?: () => ReactNode;

  launch<E extends HTMLElement, InitState extends ModalState = S>(
    e: MouseEvent<E>,
    state?: InitState
  ): void {
    if (!this.Component) {
      throw new Error(
        "ModalController.Component must be set before calling open()"
      );
    }

    if (state) this._queue.setState(() => castDraft(state));

    const target = e.target as HTMLElement;
    if (!target) {
      throw new Error("You must pass a valid MouseEvent to attach the modal");
    }

    this._container = document.createElement("div");
    this._container.id = crypto.randomUUID();
    target.insertAdjacentElement("afterend", this._container);
    this._root = createRoot(this._container);

    const originalClose = this.close.bind(this);
    this.close = async () => {
      await originalClose();
      this.destroy();
      setTimeout(() => {
        this._root?.unmount();
        this._container?.remove();
      }, 500);
    };

    const ModalContentComponent = this.Component;
    this._root.render(
      createPortal(
        // @ts-expect-error The engine is instantiated correctly
        <Modal dxEngine={this} dxVariant="basic">
          <ModalContentComponent />
        </Modal>,
        this._container
      )
    );
  }
}
