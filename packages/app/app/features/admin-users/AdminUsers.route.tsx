import {
  Table,
  TableHead,
  TableRow,
  TableHeadCol,
  InputCheckbox,
  TableBody,
  TableBodyCol,
  Icon,
} from "@nccl/components";

import type { Route } from "./+types/AdminUsers.route";
import { AdminUsersTableCellName } from "./AdminUsersTableCellName";
import { AdminUsersTableCellRole } from "./AdminUsersTableCellRole";
import { AdminUsersTableCellMenu } from "./AdminUsersTableCellMenu";

import { InnerPageHeader, PageSection } from "../../components/page";
import { getClerkClient } from "../../utils/server";
import { assembleTitle } from "../../utils/util.assemble-title";

export function meta() {
  return [{ title: assembleTitle("Users | Admin") }];
}

export async function loader(args: Route.LoaderArgs) {
  const clerkClient = await getClerkClient(args);
  const users = await clerkClient.users.getUserList();
  return { users: users.data };
}

export default function AdminUsersRoute(args: Route.ComponentProps) {
  return (
    <>
      <InnerPageHeader
        dxTitle="Users"
        dxSubtitle="Manage the parents, staff, admins & their account permissions here."
      />
      <PageSection>
        <Table>
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
          <TableBody>
            {args.loaderData.users.map((user) => (
              <TableRow>
                <TableBodyCol>
                  <InputCheckbox />
                </TableBodyCol>
                <TableBodyCol className="">
                  <AdminUsersTableCellName {...user} />
                </TableBodyCol>
                <TableBodyCol>
                  <AdminUsersTableCellRole {...user} />
                </TableBodyCol>
                <TableBodyCol>{user.lastActiveAt}</TableBodyCol>
                <TableBodyCol>
                  <AdminUsersTableCellMenu {...user} />
                </TableBodyCol>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageSection>
    </>
  );
}
