import { type ReactNode, type MouseEvent, useMemo } from "react";
import { castDraft } from "immer";

import { Modal, type ModalProps } from "./Modal.js";

import type { ModalOptions, ModalState } from "../_core/modal/ModalEngine.js";
import { ModalEngine } from "../_core/modal/ModalEngine.js";

type ModalContentProps = Partial<Omit<ModalProps, "dxEngine">>;
type ModalControllerOptions = Partial<Omit<ModalOptions, "openOnMount">>;

export class ModalController<
  S extends ModalState = ModalState,
> extends ModalEngine<S> {
  private _props: ModalContentProps | undefined = undefined;
  ModalContent: () => ReactNode;

  constructor({
    props,
    options,
    ModalContent,
  }: {
    props?: ModalContentProps;
    options?: ModalControllerOptions;
    ModalContent: () => ReactNode;
  }) {
    super({
      ...(options ?? {}),
      openOnMount: true,
    });
    this._props = { ...props, dxVariant: props?.dxVariant ?? "basic" };
    this.launch = this.launch.bind(this);
    this.ModalContent = ModalContent;
    this.Component = this.Component.bind(this);
  }

  launch<E extends HTMLElement>(event?: MouseEvent<E>): void;
  launch<E extends HTMLElement, T extends S = S>(
    event: MouseEvent<E>,
    state: T
  ): void;
  launch<E extends HTMLElement, T extends S = S>(
    _event?: MouseEvent<E>,
    state?: T
  ): void {
    this.setState(() =>
      castDraft({
        ...(state ?? {}),
        isOpen: true,
      })
    );
  }

  Component(props?: ModalContentProps) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const engine = this;
    const thisProps = this._props;
    const Component = this.ModalContent;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMemo(
      () => (
        // @ts-expect-error it's an error for now
        <Modal dxEngine={engine} {...thisProps} {...props}>
          <Component />
        </Modal>
      ),
      [Component, engine, props, thisProps]
    );
  }
}
