import type { Meta } from "@storybook/react";
import { randRecentDate, randRole, randUser } from "@ngneat/falso";
import type { ReactNode } from "react";

import { Table } from "./Table.js";
import { TableBody } from "./TableBody.js";
import { TableHeadCol } from "./TableHeadCol.js";
import { TableRow } from "./TableRow.js";
import { TableHead } from "./TableHead.js";
import { TableBodyCol } from "./TableBodyCol.js";

import { Avatar } from "../avatar/Avatar.js";
import { InputCheckbox } from "../input-checkbox/InputCheckbox.js";

const meta: Meta = {
  title: "Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof meta>;

export default meta;

// const users = [...new Array(10)].map(() => randUser({ length: 10 }));
const users = randUser({ length: 50 });

function Container(props: { children: ReactNode }) {
  return <div style={{ height: "90vh", width: "90vw" }}>{props.children}</div>;
}

export function Basic() {
  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCol style={{ width: 24 }}>
              <InputCheckbox />
            </TableHeadCol>
            <TableHeadCol>Name</TableHeadCol>
            <TableHeadCol>Access</TableHeadCol>
            <TableHeadCol>Date Added</TableHeadCol>
            <TableHeadCol>Last Active</TableHeadCol>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow>
              <TableBodyCol>
                <InputCheckbox />
              </TableBodyCol>
              <TableBodyCol>
                <Avatar
                  dxFirstName={user.firstName}
                  dxSize={"xl"}
                  dxLastName={user.lastName}
                  dxSrc={user.img}
                />
              </TableBodyCol>
              <TableBodyCol>{randRole()}</TableBodyCol>
              <TableBodyCol>{randRecentDate().toLocaleString()}</TableBodyCol>
              <TableBodyCol>{randRecentDate().toLocaleString()}</TableBodyCol>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
