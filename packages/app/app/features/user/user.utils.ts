import type { IconNames } from "@nccl/components";
import type { User } from "@clerk/react-router/ssr.server";

import type { Roles } from "../../global";

export type UserRoleDefinition = {
  icon: IconNames;
  description: string;
  title: string;
};
export const userRoles: {
  [key in Roles]: UserRoleDefinition;
} = {
  admin: {
    icon: "user-lock-01-stroke-standard",
    title: "Administrator",
    description:
      "Full access to manage users, content, and system settings. Ideal for IT or leadership roles.",
  },
  staff: {
    icon: "teacher-stroke-standard",
    title: "Staff",
    description:
      "Access to internal tools, directories, and administrative resources. Designed for teachers and school personnel.",
  },
  parent: {
    icon: "user-stroke-standard",
    title: "Parent",
    description:
      "View student information, resources, and school updates. Limited to family-specific content and actions.",
  },
};

/**
 * Get the user's full name depending upon availability of
 * the name attributes
 */
export function getUserName(user: Omit<User, "_raw">) {
  if (user.lastName) return `${user.firstName} ${user.lastName}`;
  return user.firstName;
}
