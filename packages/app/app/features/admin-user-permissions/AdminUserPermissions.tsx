import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  type ModalEngine,
} from "@nccl/components";
import { href, useFetcher } from "react-router";

import { useAdminUserPermissionsModalContext } from "./admin-user-permission.useModal";

function ModalContent() {
  const {
    close,
    state: { userId },
  } = useAdminUserPermissionsModalContext();

  const fetcher = useFetcher();
  fetcher.load(href("/api/user/:id", { id: userId }));

  return (
    <>
      <ModalHeader></ModalHeader>
      <ModalBody></ModalBody>
      <ModalFooter>
        <button type="button" onClick={close}>
          close
        </button>
      </ModalFooter>
    </>
  );
}

export function AdminUserPermissions({ engine }: { engine: ModalEngine }) {
  return (
    <Modal dxEngine={engine} dxVariant="drawer-rtl" style={{ width: 500 }}>
      <ModalContent />
    </Modal>
  );
}
