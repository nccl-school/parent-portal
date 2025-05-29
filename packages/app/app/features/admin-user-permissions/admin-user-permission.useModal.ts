import { useModal, useModalContext } from "@nccl/components";

type AdminUserPermissionsModalState = { userId: string };

export const useAdminUserPermissionsModal = () => {
  return useModal<AdminUserPermissionsModalState>();
};

export const useAdminUserPermissionsModalContext = () => {
  return useModalContext<AdminUserPermissionsModalState>();
};
