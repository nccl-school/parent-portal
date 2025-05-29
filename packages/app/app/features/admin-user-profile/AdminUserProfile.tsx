import { Modal, ModalHeader, type ModalEngine } from "@nccl/components";

export function AdminUserProfile({ engine }: { engine: ModalEngine }) {
  return (
    <Modal dxEngine={engine} dxVariant="drawer-ltr" style={{ width: 500 }}>
      <ModalHeader>User Profile</ModalHeader>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni culpa
        earum necessitatibus nemo officia quam illo reiciendis. Quia harum
        doloribus officiis. Aliquam voluptate porro hic molestias possimus ea
        voluptatum libero?
      </div>
      <footer>
        <button type="button" onClick={engine.close}>
          close
        </button>
      </footer>
    </Modal>
  );
}
