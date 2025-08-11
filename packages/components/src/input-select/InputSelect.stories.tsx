import type { Meta, StoryObj } from "@storybook/react";
import { randFullName } from "@ngneat/falso";

import { InputSelect, type InputSelectProps } from "./InputSelect.js";

const meta: Meta = {
  title: "Input Select",
  component: InputSelect,
};

export default meta;
type Story = StoryObj<InputSelectProps>;

const children = [...new Array(10)].map(() => ({
  id: crypto.randomUUID(),
  name: randFullName(),
}));

function Options() {
  return children.map((child) => (
    <option key={child.id} value={child.id}>
      {child.name}
    </option>
  ));
}

export const Small: Story = {
  args: {
    children: <Options />,
    dxSize: "sm",
  },
};
export const SmallWithLabel: Story = {
  args: {
    children: <Options />,
    dxSize: "sm",
    dxLabel: "First name",
  },
};
export const SmallWithLabelHint: Story = {
  args: {
    children: <Options />,
    dxSize: "sm",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
  },
};
export const SmallWithLabelHintError: Story = {
  args: {
    children: <Options />,
    dxSize: "sm",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxError: "This is a required field",
  },
};
export const SmallWithContrast: Story = {
  args: {
    children: <Options />,
    dxSize: "sm",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
  },
};
export const Medium: Story = {
  args: {
    children: <Options />,
    dxSize: "md",
  },
};
export const MediumWithLabel: Story = {
  args: {
    children: <Options />,
    dxSize: "md",
    dxLabel: "First name",
  },
};
export const MediumWithLabelHint: Story = {
  args: {
    children: <Options />,
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
  },
};
export const MediumWithLabelHintError: Story = {
  args: {
    children: <Options />,
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxError: "This is a required field",
  },
};
export const MediumWithContrast: Story = {
  args: {
    children: <Options />,
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
  },
};
