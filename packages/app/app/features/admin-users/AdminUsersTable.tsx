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
import { useMemo, useState } from "react";

import { AdminUsersTableCellMenu } from "./AdminUsersTableCellMenu";
import { AdminUsersTableCellName } from "./AdminUsersTableCellName";
import { AdminUsersTableCellRole } from "./AdminUsersTableCellRole";

import {
  AdminUserPermissions,
  useAdminUserPermissionsModal,
} from "../admin-user-permissions";
import {
  AdminUserProfile,
  useAdminUserProfileModal,
} from "../admin-user-profile";

export function AdminUsersTable({ data }: { data: Omit<User, "_raw">[] }) {
  const userPermissionsModal = useAdminUserPermissionsModal();
  const userProfileModal = useAdminUserProfileModal();

  return (
    <>
      {useMemo(
        () => (
          <>
            <AdminUserPermissions engine={userPermissionsModal} />
            <AdminUserProfile engine={userProfileModal} />
          </>
        ),
        [userPermissionsModal, userProfileModal]
      )}
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
            <TableRow>
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
                <AdminUsersTableCellMenu
                  {...user}
                  launchUserPermissions={(userId) => {
                    userPermissionsModal.open(undefined, { userId });
                  }}
                  launchUserProfile={() => userProfileModal.open()}
                />
              </TableBodyCol>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
