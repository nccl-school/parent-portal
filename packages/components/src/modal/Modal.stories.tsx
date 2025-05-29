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
  const engine = useModal();
  return (
    <>
      <button onClick={engine.open}>Open Modal</button>
      <dialog ref={engine.onMount}>
        <header>Header</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </div>
        <footer>
          <button onClick={engine.close}>close</button>
        </footer>
      </dialog>
    </>
  );
};

export const CloseOnBackdropClick = () => {
  const engine = useModal({ closeOnBackdropClick: true });
  return (
    <>
      <button onClick={engine.open}>Open Modal</button>
      <dialog ref={engine.onMount}>
        <header>Header</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </div>
        <footer>
          <button onClick={engine.close}>close</button>
        </footer>
      </dialog>
    </>
  );
};

export const PreventClosingOnEscape = () => {
  const engine = useModal({ disableCloseOnEscapePress: true });
  return (
    <>
      <button onClick={engine.open}>Open Modal</button>
      <dialog ref={engine.onMount}>
        <header>Header</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </div>
        <footer>
          <button onClick={engine.close}>close</button>
        </footer>
      </dialog>
    </>
  );
};

export const WithDefaultStyles = () => {
  const engine = useModal();
  return (
    <>
      <button onClick={engine.open}>Open Modal</button>
      <dialog ref={engine.onMount} className={styles.base}>
        <header>Header</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </div>
        <footer>
          <button onClick={engine.close}>close</button>
        </footer>
      </dialog>
    </>
  );
};

export const WithComponent = () => {
  const engine = useModal();
  return (
    <>
      <button onClick={engine.open}>Open Modal</button>
      <Modal dxEngine={engine} dxVariant="drawer-ltr">
        <header>Header</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </div>
        <footer>
          <button onClick={engine.close}>close</button>
        </footer>
      </Modal>
    </>
  );
};

export const VariantBasic = () => {
  const engine = useModal();
  return (
    <>
      <button onClick={engine.open}>Open Modal</button>
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
          <button onClick={engine.close}>close</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const VariantDrawerLTR = () => {
  const engine = useModal();
  return (
    <>
      <button onClick={engine.open}>Open Modal</button>
      <Modal dxEngine={engine} dxVariant="drawer-ltr" style={{ width: 500 }}>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </ModalBody>
        <ModalFooter>
          <button onClick={engine.close}>close</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const VariantDrawerRTL = () => {
  const engine = useModal();
  return (
    <>
      <button onClick={engine.open}>Open Modal</button>
      <Modal dxEngine={engine} dxVariant="drawer-rtl" style={{ width: 500 }}>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
          earum necessitatibus nemo officia quam illo reiciendis. Quia harum
          doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
          voluptatum libero?
        </ModalBody>
        <ModalFooter>
          <button onClick={engine.close}>close</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const controlledModal = new ModalController({ openOnMount: true });
function ControlledModalContent() {
  const { close } = useModalContext();
  return (
    <>
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
    </>
  );
}
controlledModal.Component = ControlledModalContent;

export const WithContoller = () => {
  return <button onClick={controlledModal.launch}>Open Modal</button>;
};
