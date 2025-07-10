import type { Meta, StoryObj } from "@storybook/react";

import { InputCheckbox, type InputCheckboxProps } from "./InputCheckbox.js";

import { InputLabel } from "../input-label/InputLabel.js";

const meta: Meta<InputCheckboxProps> = {
  title: "InputCheckbox",
  component: InputCheckbox,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {} as InputCheckboxProps,
};

export const LabelBefore: Story = {
  args: {
    dxLabelOrientation: "before",
    children: <InputLabel dxLabel="this is a before label" dxNode="div" />,
  },
};

export const LabelAfter: Story = {
  args: {
    dxLabelOrientation: "after",
    children: <InputLabel dxLabel="this is an after label" dxNode="div" />,
  },
};
