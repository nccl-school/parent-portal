import type { User } from "@clerk/react-router/ssr.server";
import {
  Table,
  TableHead,
  TableRow,
  TableHeadCol,
  InputCheckbox,
  TableBody,
  TableBodyCol,
} from "@nccl/components";
import { makeRem } from "@nccl/theme";
import { useMemo } from "react";

import { AdminUsersTableCellMenu } from "./AdminUsersTableCellMenu";
import { AdminUsersTableCellName } from "./AdminUsersTableCellName";
import { AdminUsersTableCellRole } from "./AdminUsersTableCellRole";

import { AdminUserPermissions } from "../admin-user-permissions";

export function AdminUsersTable({ data }: { data: Omit<User, "_raw">[] }) {
  return (
    <>
      <AdminUserPermissions.Component />
      <Table>
        {useMemo(
          () => (
            <TableHead>
              <TableRow>
                <TableHeadCol style={{ width: 24 }}>
                  <InputCheckbox />
                </TableHeadCol>
                <TableHeadCol>Name</TableHeadCol>
                <TableHeadCol>Role</TableHeadCol>
                <TableHeadCol>Last Active</TableHeadCol>
                <TableHeadCol></TableHeadCol>
              </TableRow>
            </TableHead>
          ),
          []
        )}
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableBodyCol>
                <InputCheckbox />
              </TableBodyCol>
              <TableBodyCol>
                <AdminUsersTableCellName {...user} />
              </TableBodyCol>
              <TableBodyCol>
                <AdminUsersTableCellRole {...user} />
              </TableBodyCol>
              <TableBodyCol>{user.lastActiveAt}</TableBodyCol>
              <TableBodyCol style={{ width: makeRem(24) }}>
                <AdminUsersTableCellMenu {...user} />
              </TableBodyCol>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
