import {
  Table,
  TableHead,
  TableRow,
  TableHeadCol,
  InputCheckbox,
  TableBody,
  TableBodyCol,
  Typography,
  InputSearch,
  Button,
} from "@nccl/components";
import type { GetUserListResponse } from "@nccl/api/client";
import { makeCustom, makeFontWeight, makeRem } from "@nccl/theme";
import { useMemo } from "react";
import { css } from "@linaria/core";

import { AdminUsersTableCellMenu } from "./AdminUsersTableCellMenu";
import { AdminUsersTableCellName } from "./AdminUsersTableCellName";
import { AdminUsersTableCellRole } from "./AdminUsersTableCellRole";

import { AdminUserPermissions } from "../admin-user-permissions";
import { AdminUserProfile } from "../admin-user-profile";
import { dates } from "../../utils/client";
import { placeholder } from "../../utils/isomorphic";
import { AdminUserInvite } from "../admin-user-invite";

const styles = css`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  width: 100%;
  height: ${makeRem(72)};
  padding: 0 ${makeCustom("page--gutter-desktop")};

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
      align-items: center;
    }
  }
`;

const tableStyles = css`
  height: 100%;
  overflow: hidden;
`;

export function AdminUsersTable({ data }: { data: GetUserListResponse }) {
  return (
    <div className={tableStyles}>
      {useMemo(
        () => (
          <>
            <AdminUserPermissions.Component />
            <AdminUserProfile.Component />
            <AdminUserInvite.Component />
          </>
        ),
        []
      )}
      <div className={styles}>
        <Typography dxVariant="body1" dxNode="div">
          Viewing {data.length} Users
        </Typography>
        <div className="right">
          <InputSearch placeholder="Search" />
          <Button
            dxVariant="outlined"
            dxStartIcon="filter-stroke-standard"
            dxSize="md"
            dxColor="secondary"
          >
            Filters
          </Button>
          <Button
            dxVariant="contained"
            dxStartIcon="user-add-01-stroke-standard"
            dxSize="md"
            dxColor="secondary"
            onClick={AdminUserInvite.launch}
          >
            Invite user
          </Button>
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
                <TableHeadCol>Phone</TableHeadCol>
                <TableHeadCol>Created On</TableHeadCol>
                <TableHeadCol>Last Active</TableHeadCol>
                <TableHeadCol>Status</TableHeadCol>
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
              <TableBodyCol>{placeholder}</TableBodyCol>
              <TableBodyCol>
                {dates.format(user.createdAt, "MM/DD/YYYY")}
              </TableBodyCol>
              <TableBodyCol>
                {/* {dates.format(user.lastActiveAt, "Relative")} */}
              </TableBodyCol>
              <TableBodyCol>{user.banned ? "BANNED" : "ACTIVE"}</TableBodyCol>
              <TableBodyCol style={{ width: makeRem(24) }}>
                <AdminUsersTableCellMenu {...user} />
              </TableBodyCol>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
