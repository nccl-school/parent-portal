import type { Meta, StoryObj } from "@storybook/react";

import { InputCheckbox, type InputCheckboxProps } from "./InputCheckbox.js";

const meta: Meta = {
  title: "InputCheckbox",
  component: InputCheckbox,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof meta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {} as InputCheckboxProps,
};
