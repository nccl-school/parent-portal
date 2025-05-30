import { useModalContext } from "@nccl/components";

import type { AdminUserProfileModalState } from "./admin-user-profile.utils";

export const useAdminUserProfileModalContext = () => {
  return useModalContext<AdminUserProfileModalState>();
};
