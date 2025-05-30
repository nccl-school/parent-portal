import type { User } from "@clerk/react-router/ssr.server";
import type { MouseEvent } from "react";

export type AdminUserProfileModalState = {
  user: Omit<User, "_raw">;
};

export type LaunchAdminUserProfileModal = (
  e: MouseEvent<HTMLButtonElement>,
  state: AdminUserProfileModalState
) => void;
