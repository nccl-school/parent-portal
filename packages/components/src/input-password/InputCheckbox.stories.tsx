import type { Meta, StoryObj } from "@storybook/react";

import { InputPassword, type InputPasswordProps } from "./InputPassword.js";

const meta: Meta<InputPasswordProps> = {
  title: "InputPassword",
  component: InputPassword,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {} as InputPasswordProps,
};
