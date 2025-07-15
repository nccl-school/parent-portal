import type { Meta, StoryObj } from "@storybook/react";

import { InputTextarea, type InputTextareaProps } from "./InputTextarea.js";

const meta: Meta<InputTextareaProps> = {
  title: "InputTextarea",
  component: InputTextarea,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    dxSize: "sm",
  } as InputTextareaProps,
};
export const SmallWithLabel: Story = {
  args: {
    dxSize: "sm",
    dxLabel: "First name",
  } as InputTextareaProps,
};
export const SmallWithLabelHint: Story = {
  args: {
    dxSize: "sm",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
  } as InputTextareaProps,
};
export const SmallWithLabelHintError: Story = {
  args: {
    dxSize: "sm",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxError: "This is a required field",
  } as InputTextareaProps,
};
export const SmallWithContrast: Story = {
  args: {
    dxSize: "sm",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
  } as InputTextareaProps,
};

// MD
export const Medium: Story = {
  args: {
    dxSize: "md",
  } as InputTextareaProps,
};
export const MediumWithLabel: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
  } as InputTextareaProps,
};
export const MediumWithLabelHint: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
  } as InputTextareaProps,
};
export const MediumWithLabelHintError: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxError: "This is a required field",
  } as InputTextareaProps,
};
export const MediumWithContrast: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
  } as InputTextareaProps,
};
export const MediumWithContrastError: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
    dxError: "This is a required field",
  } as InputTextareaProps,
};

// LG
export const Large: Story = {
  args: {
    dxSize: "lg",
  } as InputTextareaProps,
};
export const LargeWithLabel: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
  } as InputTextareaProps,
};
export const LargeWithLabelHint: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
  } as InputTextareaProps,
};
export const LargeWithLabelHintError: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxError: "This is a required field",
  } as InputTextareaProps,
};
export const LargeWithContrast: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
  } as InputTextareaProps,
};
export const LargeWithContrastError: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
    dxError: "This is a required field",
  } as InputTextareaProps,
};
