import { InputRadio } from "@nccl/components";

import { userRoles } from "./user.utils";
import { UserPermissionCard } from "./UserPermissionCard";

import type { Roles } from "../../global";

export function UserPermissionRadioGroup(props: {
  name?: string;
  defaultCheckedRole?: Roles;
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
        <UserPermissionCard role={userRole as Roles} {...roleDef} />
      </InputRadio>
    );
  });
}
