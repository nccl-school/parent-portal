import type { Meta } from "@storybook/react";

import { Table } from "./Table";
import { TableBody } from "./TableBody.js";
import { TableHeadCol } from "./TableHeadCol.js";
import { TableRow } from "./TableRow.js";
import { TableHead } from "./TableHead2.js";

const meta: Meta = {
  title: "Table",
  component: Table,
} satisfies Meta<typeof meta>;

export default meta;

export function Basic() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCol>Name</TableHeadCol>
          <TableHeadCol>Date Added</TableHeadCol>
          <TableHeadCol>Last Active</TableHeadCol>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow></TableRow>
      </TableBody>
    </Table>
  );
}
