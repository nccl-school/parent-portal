import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { InputTags, type InputTagsProps } from "./InputTags.js";

const meta: Meta<InputTagsProps> = {
  title: "InputTags",
  component: InputTags,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    dxVariant: "contrasted",
    dxHint:
      "Enter a list of comma delimited email addresses. Press tab or enter to enter the value. Backspace will delete the last value.",
    dxLabel: "Email addresses",
    dxInitialTags: ["drewdecarme@gmail.com", "heatherturano@gmail.com"],
  },
};

export const WithError: Story = {
  args: {
    dxVariant: "contrasted",
    dxHint:
      "Enter a list of comma delimited email addresses. Press tab or enter to enter the value. Backspace will delete the last value.",
    dxLabel: "Email addresses",
    dxInitialTags: ["drewdecarme@gmail.com", "heatherturano@gmail.com"],
    dxError: "Email addresses are required",
  },
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
        <InputTags
          name="email_addresses"
          dxVariant="contrasted"
          dxHint="Enter a list of comma delimited email addresses. Press tab or enter to enter the value. Backspace will delete the last value."
          dxLabel="Email addresses"
        />
        <button type="submit">Submit</button>
      </form>
      <div>{value}</div>
    </>
  );
}
