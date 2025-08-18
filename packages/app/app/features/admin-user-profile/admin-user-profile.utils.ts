import type { UserWithRole } from "@nccl/api/client";
import type { MouseEvent } from "react";

export type AdminUserProfileModalState = {
  user: UserWithRole;
};

export type LaunchAdminUserProfileModal = (
  e: MouseEvent<HTMLButtonElement>,
  state: AdminUserProfileModalState
) => void;
