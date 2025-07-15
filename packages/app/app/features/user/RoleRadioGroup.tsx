import { InputRadio } from "@nccl/components";
import type { Roles } from "@nccl/api/client";

import { RoleCard } from "./RoleCard";
import { useGetRoles } from "./user.useGetRoles";

export function RoleRadioGroup(props: {
  name?: string;
  defaultCheckedRole?: Roles;
}) {
  const roles = useGetRoles();

  return roles.map((role) => {
    return (
      <InputRadio
        key={role.id}
        dxVariant="card"
        dxSize="md"
        name="role"
        value={role.id}
        defaultChecked={role.id === props.defaultCheckedRole}
      >
        <RoleCard userRole={role} />
      </InputRadio>
    );
  });
}
