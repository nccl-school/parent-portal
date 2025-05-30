import type { User } from "@clerk/react-router/ssr.server";
import {
  Table,
  TableHead,
  TableRow,
  TableHeadCol,
  InputCheckbox,
  TableBody,
  TableBodyCol,
  Typography,
} from "@nccl/components";
import { makeFontWeight, makeRem } from "@nccl/theme";
import { useMemo } from "react";
import { css } from "@linaria/core";

import { AdminUsersTableCellMenu } from "./AdminUsersTableCellMenu";
import { AdminUsersTableCellName } from "./AdminUsersTableCellName";
import { AdminUsersTableCellRole } from "./AdminUsersTableCellRole";

import { AdminUserPermissions } from "../admin-user-permissions";
import { AdminUserProfile } from "../admin-user-profile";

const styles = css`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  height: ${makeRem(44)};

  & > div {
    &.left {
      .label {
        font-weight: ${makeFontWeight("body-bold")} !important;
      }
    }
    &.right {
      justify-self: end;
      display: flex;
      gap: 1rem;
    }
  }
`;

export function AdminUsersTable({ data }: { data: Omit<User, "_raw">[] }) {
  return (
    <>
      <AdminUserPermissions.Component />
      <AdminUserProfile.Component />
      <div className={styles}>
        <Typography dxVariant="body1" dxNode="div">
          Viewing {data.length} Users
        </Typography>
        <div className="right">
          <div>
            <input type="search" placeholder="Search" />
          </div>
          <div>
            <button type="button">filters</button>
          </div>
          <div>
            <button type="button">invite users</button>
          </div>
        </div>
      </div>
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
