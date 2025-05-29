import { useModalContext } from "@nccl/components";

import type { AdminUserPermissionsModalState } from "./admin-user-permission.utils";

export const useAdminUserPermissionsModalContext = () => {
  return useModalContext<AdminUserPermissionsModalState>();
};
