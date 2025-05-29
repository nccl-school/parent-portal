import type { Meta } from "@storybook/react";

import { useModal } from "./modal.useModal.js";
import { Modal } from "./Modal.js";
import { ModalHeader } from "./ModalHeader.js";
import { ModalBody } from "./ModalBody.js";
import { ModalFooter } from "./ModalFooter.js";
import { ModalController } from "./Modal.controller.js";
import { useModalContext } from "./modal.useModalContext.js";

import styles from "../_core/modal/modal.module.scss";
import { ModalEngine } from "../_core/modal/index.js";
import { Typography } from "../typography/Typography.js";

const meta: Meta = {
  title: "Overlay / Modal",
} satisfies Meta<typeof meta>;

export default meta;

const ModalEngineBasic = new ModalEngine();

export const WithEngine = () => {
  return (
    <>
      <button onClick={ModalEngineBasic.open}>Open Modal</button>
      <dialog ref={ModalEngineBasic.onMount}>
        <header>Header</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </div>
        <footer>
          <button onClick={ModalEngineBasic.close}>close</button>
        </footer>
      </dialog>
    </>
  );
};

export const WithHook = () => {
  const { engine, open, close } = useModal();
  return (
    <>
      <button onClick={open}>Open Modal</button>
      <dialog ref={engine.onMount}>
        <header>Header</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </div>
        <footer>
          <button onClick={close}>close</button>
        </footer>
      </dialog>
    </>
  );
};

export const CloseOnBackdropClick = () => {
  const { engine, open, close } = useModal({ closeOnBackdropClick: true });
  return (
    <>
      <button onClick={open}>Open Modal</button>
      <dialog ref={engine.onMount}>
        <header>Header</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </div>
        <footer>
          <button onClick={close}>close</button>
        </footer>
      </dialog>
    </>
  );
};

export const PreventClosingOnEscape = () => {
  const { engine, open, close } = useModal({ disableCloseOnEscapePress: true });
  return (
    <>
      <button onClick={open}>Open Modal</button>
      <dialog ref={engine.onMount}>
        <header>Header</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </div>
        <footer>
          <button onClick={close}>close</button>
        </footer>
      </dialog>
    </>
  );
};

export const WithDefaultStyles = () => {
  const { engine, open, close } = useModal();
  return (
    <>
      <button onClick={open}>Open Modal</button>
      <dialog ref={engine.onMount} className={styles.base}>
        <header>Header</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </div>
        <footer>
          <button onClick={close}>close</button>
        </footer>
      </dialog>
    </>
  );
};

export const WithComponent = () => {
  const { engine, open, close } = useModal();
  return (
    <>
      <button onClick={open}>Open Modal</button>
      <Modal dxEngine={engine} dxVariant="drawer-ltr">
        <header>Header</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </div>
        <footer>
          <button onClick={close}>close</button>
        </footer>
      </Modal>
    </>
  );
};

export const VariantBasic = () => {
  const { engine, open, close } = useModal();
  return (
    <>
      <button onClick={open}>Open Modal</button>
      <Modal dxEngine={engine} dxVariant="basic">
        <ModalHeader>Header</ModalHeader>
        <ModalBody>
          <Typography dxVariant="body1" dxNode="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
            earum necessitatibus nemo officia quam illo reiciendis. Quia harum
            doloribus officiis. Aliquam voluptate porro hic molestias possimus
            ea voluptatum libero?
          </Typography>
          <br />
          <Typography dxVariant="body1" dxNode="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
            earum necessitatibus nemo officia quam illo reiciendis. Quia harum
            doloribus officiis. Aliquam voluptate porro hic molestias possimus
            ea voluptatum libero?
          </Typography>
        </ModalBody>
        <ModalFooter>
          <button onClick={close}>close</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const VariantDrawerLTR = () => {
  const { engine, open, close } = useModal();
  return (
    <>
      <button onClick={open}>Open Modal</button>
      <Modal dxEngine={engine} dxVariant="drawer-ltr" style={{ width: 500 }}>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </ModalBody>
        <ModalFooter>
          <button onClick={close}>close</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const VariantDrawerRTL = () => {
  const { engine, open, close } = useModal();
  return (
    <>
      <button onClick={open}>Open Modal</button>
      <Modal dxEngine={engine} dxVariant="drawer-rtl" style={{ width: 500 }}>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </ModalBody>
        <ModalFooter>
          <button onClick={close}>close</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

type TestState = { userId: string };
function ModalContent() {
  const { close, state } = useModalContext<TestState>();
  return (
    <>
      <ModalHeader>Header</ModalHeader>
      <ModalBody>
        <div>initState: {state.userId}</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
        earum necessitatibus nemo officia quam illo reiciendis. Quia harum
        doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
        voluptatum libero?
      </ModalBody>
      <ModalFooter>
        <button onClick={close}>close</button>
      </ModalFooter>
    </>
  );
}
const ImperativeModal = new ModalController<TestState>({
  props: { dxVariant: "basic" },
  ModalContent,
});

export const WithContoller = () => {
  return (
    <>
      <ImperativeModal.Component />
      <button
        onClick={(e) =>
          ImperativeModal.launch(e, {
            userId: "493f8c0d-684e-5308-8c39-4e6ade3e1c73",
          })
        }
      >
        Open Modal
      </button>
    </>
  );
};
