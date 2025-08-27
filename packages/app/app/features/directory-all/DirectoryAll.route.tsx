import {
  Table,
  TableBody,
  TableBodyCol,
  TableHead,
  TableHeadCol,
  TableRow,
} from "@nccl/components";

import type { Route } from "./+types/DirectoryAll.route";
import { DirectoryAllCellPerson } from "./DirectoryAllCellName";

import { placeholder } from "../../utils/isomorphic";
import { getNCCLClient } from "../../utils/server";
import { renderLoaderData } from "../../utils/client";
import { RoleBadge } from "../user";

export async function loader(args: Route.LoaderArgs) {
  const ncclClient = getNCCLClient(args);
  const directory = await ncclClient.directory.getEntireDirectory();
  return { directory };
}

export default function DirectoryAll({ loaderData }: Route.ComponentProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCol>Person</TableHeadCol>
          <TableHeadCol>Email</TableHeadCol>
          <TableHeadCol>Phone</TableHeadCol>
          <TableHeadCol>Role</TableHeadCol>
          <TableHeadCol>Students</TableHeadCol>
        </TableRow>
      </TableHead>
      <TableBody>
        {renderLoaderData(loaderData.directory, {
          loading: (
            <TableRow>
              <TableBodyCol colSpan={2}>Loading...</TableBodyCol>
            </TableRow>
          ),
          ok: (d) => {
            return d.map((user) => (
              <TableRow key={user.id}>
                <TableBodyCol>
                  <DirectoryAllCellPerson {...user} />
                </TableBodyCol>
                <TableBodyCol>{user.email}</TableBodyCol>
                <TableBodyCol>{user.phone ?? placeholder}</TableBodyCol>
                <TableBodyCol>
                  <RoleBadge role={user.role} />
                </TableBodyCol>
                <TableBodyCol>{placeholder}</TableBodyCol>
              </TableRow>
            ));
          },
        })}
      </TableBody>
    </Table>
  );
}
