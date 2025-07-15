import type { User } from "@nccl/api/client";
import type { MouseEvent } from "react";

export type AdminUserProfileModalState = {
  user: User;
};

export type LaunchAdminUserProfileModal = (
  e: MouseEvent<HTMLButtonElement>,
  state: AdminUserProfileModalState
) => void;
