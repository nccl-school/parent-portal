import {
  ModalBody,
  ModalController,
  ModalFooter,
  ModalHeader,
} from "@nccl/components";
import { href, useFetcher } from "react-router";
import { makeRem } from "@nccl/theme";

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
  });

AdminUserPermissions.Component = function AdminUserPermissions() {
  const {
    close,
    state: { userId },
  } = useAdminUserPermissionsModalContext();
  const fetcher = useFetcher();

  fetcher.load(href("/api/user/:id", { id: userId }));

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
};
