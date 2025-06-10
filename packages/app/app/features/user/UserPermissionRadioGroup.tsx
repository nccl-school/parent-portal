import { InputRadio } from "@nccl/components";

import { userRoles } from "./user.utils";
import { UserPermissionCard } from "./UserPermissionCard";

import type { UserRole } from "../../models/user.model";

export function UserPermissionRadioGroup(props: {
  name?: string;
  defaultCheckedRole?: UserRole;
}) {
  return Object.entries(userRoles).map(([userRole, roleDef]) => {
    return (
      <InputRadio
        key={userRole}
        dxVariant="card"
        dxSize="md"
        name="role"
        value={userRole}
        defaultChecked={userRole === props.defaultCheckedRole}
      >
        <UserPermissionCard role={userRole as UserRole} {...roleDef} />
      </InputRadio>
    );
  });
}
