import type { Meta } from "@storybook/react";
import { randUser, randUuid } from "@ngneat/falso";
import { memo, useState } from "react";

import { InputCombobox } from "./InputCombobox.js";
import type { InputComboboxComponent } from "./input-combobox.utils.js";

import { Avatar } from "../avatar/Avatar.js";
import { Typography } from "../typography/Typography.js";

const meta: Meta = {
  title: "InputCombobox",
  component: InputCombobox,
  parameters: {
    layout: "centered",
  },
};

export default meta;

const users = [...randUser({ length: 100 })].map((user) => ({
  ...user,
  id: randUuid(),
  label: user.firstName,
  value: user.id,
}));

const ListComponent: InputComboboxComponent<(typeof users)[0]> = memo(
  function InputComboboxComponent(user) {
    return (
      <div
        style={{
          display: "Grid",
          gridAutoColumns: "auto 1fr",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Avatar
          dxFirstName={user.firstName}
          dxSize={"md"}
          dxSrc={user.img}
          dxLastName={user.lastName}
        />
        <Typography
          dxVariant="label"
          dxNode="div"
        >{`${user.firstName} ${user.lastName}`}</Typography>
      </div>
    );
  }
);

export const ListOfUsers = () => {
  return (
    <div style={{ width: "60ch" }}>
      <InputCombobox<(typeof users)[0]>
        name="user"
        dxLabel="Select a user"
        dxPlaceholder="Click to search"
        dxOptions={users}
        dxSearchKeys={["firstName", "lastName"]}
        DXListComponent={ListComponent}
      />
    </div>
  );
};

export function WithForm() {
  const [value, setValue] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          setValue(
            JSON.stringify(Object.fromEntries(formData.entries()), null, 2)
          );
        }}
      >
        <ListOfUsers />
        <button type="submit">Submit</button>
      </form>
      <div>{value}</div>
    </>
  );
}
