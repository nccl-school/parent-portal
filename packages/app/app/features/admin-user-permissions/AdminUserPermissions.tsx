import {
  ModalBody,
  ModalController,
  ModalFooter,
  ModalHeader,
} from "@nccl/components";
import { href, useFetcher } from "react-router";
import { makeRem } from "@nccl/theme";
import { useEffect } from "react";

import { useAdminUserPermissionsModalContext } from "./admin-user-permission.useModal";
import type { AdminUserPermissionsModalState } from "./admin-user-permission.utils";

export const AdminUserPermissions =
  new ModalController<AdminUserPermissionsModalState>({
    props: {
      dxVariant: "drawer-rtl",
      style: {
        width: makeRem(500),
      },
    },
    options: {
      closeOnBackdropClick: true,
    },
    ModalContent,
  });

function ModalContent() {
  const {
    close,
    state: { userId },
  } = useAdminUserPermissionsModalContext();
  console.log(userId);
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.load(href("/api/user/:id", { id: userId }));
  }, [userId]);

  console.log(userId, fetcher.data);

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
