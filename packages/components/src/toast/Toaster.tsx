/* eslint-disable react-hooks/rules-of-hooks */
import { useSyncExternalStore, type JSX } from "react";
import { createPortal } from "react-dom";

import { ExternalStore } from "../external-store/ExternalStore.js";

export type DefaultToastProps = {
  onClose: () => Promise<void>;
  id: string;
};
type ToasterState<T> = {
  toasts: Map<string, T>;
  container: HTMLElement | null;
};

type ToasterParams<T extends DefaultToastProps> = {
  ToastComponent: (props: T) => JSX.Element;
  containerClassName?: string;
};

export class Toaster<T extends DefaultToastProps> extends ExternalStore<
  ToasterState<T>
> {
  ToastComponent: (props: T) => JSX.Element;
  containerClassName?: string;

  constructor({ ToastComponent, containerClassName }: ToasterParams<T>) {
    super({ toasts: new Map(), container: null });
    this.containerClassName = containerClassName;
    this.Render = this.Render.bind(this);
    this.ToastComponent = ToastComponent.bind(this);
    this.launch = this.launch.bind(this);
    this.close = this.close.bind(this);
  }

  #getToastNode(toastId: string) {
    const toastNode = document.getElementById(toastId);
    if (!toastNode) {
      throw new Error(
        `Unable to locate the toast node for the ${toastId}. Please ensure you're adding the "id" prop in the toast component to the node.`
      );
    }
    return toastNode;
  }

  async close(toastId: string) {
    const toastNode = this.#getToastNode(toastId);
    toastNode.classList.add("close");

    await Promise.all(
      toastNode
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished)
    );

    this.setState((draft) => {
      draft.toasts.delete(toastId);
    });
  }

  launch(props: Omit<T, "onClose" | "id">) {
    const toastId = crypto.randomUUID();
    const onClose = async () => {
      this.close(toastId);
    };
    const openDialogs = document.querySelectorAll("dialog[open]");
    const container = openDialogs.item(openDialogs.length - 1) ?? document.body;

    this.setState((draft) => {
      draft.container = container as HTMLElement;
      draft.toasts.set(toastId, {
        ...props,
        onClose,
      } as T);
    });
  }

  Render() {
    const Component = this.ToastComponent;
    const className = this.containerClassName;
    const state = useSyncExternalStore(
      this.subscribe,
      this.getSnapshot,
      this.getSnapshot
    );

    const toasts = [...state.toasts.entries()];
    if (toasts.length === 0 || !state.container) return null;

    return createPortal(
      <div
        className={className}
        popover="manual"
        ref={(node) => {
          if (!node) return;

          node.showPopover();

          return () => {
            node.hidePopover();
          };
        }}
      >
        {toasts.map(([toastId, toastProps]) => {
          return <Component key={toastId} {...toastProps} id={toastId} />;
        })}
      </div>,
      state.container
    );
  }
}
