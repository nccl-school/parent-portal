import type { Roles, User } from "@nccl/api/client";
import type { IconNames } from "@nccl/components";

export const roleIcon: {
  [key in Roles]: IconNames;
} = {
  ADMIN: "user-lock-01-stroke-standard",
  STAFF: "teacher-stroke-standard",
  USER: "user-stroke-standard",
};

/**
 * Get the user's full name depending upon availability of
 * the name attributes
 */
export function getUserName(user: User) {
  if (user.lastName) return `${user.firstName} ${user.lastName}`;
  return String(user.firstName);
}
