import type { Meta, StoryObj } from "@storybook/react";

import { Input, type InputProps } from "./Input.js";

import { Icon } from "../icons/Icon.js";

const meta: Meta<InputProps> = {
  title: "Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    dxSize: "sm",
  } as InputProps,
};
export const SmallWithLabel: Story = {
  args: {
    dxSize: "sm",
    dxLabel: "First name",
  } as InputProps,
};
export const SmallWithLabelHint: Story = {
  args: {
    dxSize: "sm",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
  } as InputProps,
};
export const SmallWithLabelHintError: Story = {
  args: {
    dxSize: "sm",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxError: "This is a required field",
  } as InputProps,
};
export const SmallWithContrast: Story = {
  args: {
    dxSize: "sm",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
  } as InputProps,
};
export const SmallWithAdornmentStart: Story = {
  args: {
    dxSize: "sm",
    DXAdornmentStart: () => <Icon dxIcon="search-01-stroke-standard" />,
  } as InputProps,
};
export const SmallWithAdornmentEnd: Story = {
  args: {
    dxSize: "sm",
    DXAdornmentEnd: () => <Icon dxIcon="cancel-01-stroke-standard" />,
  } as InputProps,
};
export const SmallWithAdornments: Story = {
  args: {
    dxSize: "sm",
    DXAdornmentStart: () => <Icon dxIcon="search-01-stroke-standard" />,
    DXAdornmentEnd: () => <Icon dxIcon="cancel-01-stroke-standard" />,
  } as InputProps,
};

// MD
export const Medium: Story = {
  args: {
    dxSize: "md",
  } as InputProps,
};
export const MediumWithLabel: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
  } as InputProps,
};
export const MediumWithLabelHint: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
  } as InputProps,
};
export const MediumWithLabelHintError: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxError: "This is a required field",
  } as InputProps,
};
export const MediumWithContrast: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
  } as InputProps,
};
export const MediumWithContrastError: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
    dxError: "This is a required field",
  } as InputProps,
};
export const MediumWithAdornmentStart: Story = {
  args: {
    dxSize: "md",
    DXAdornmentStart: () => <Icon dxIcon="search-01-stroke-standard" />,
  } as InputProps,
};
export const MediumWithAdornmentEnd: Story = {
  args: {
    dxSize: "md",
    DXAdornmentEnd: () => <Icon dxIcon="cancel-01-stroke-standard" />,
  } as InputProps,
};
export const MediumWithAdornments: Story = {
  args: {
    dxSize: "md",
    DXAdornmentStart: () => <Icon dxIcon="search-01-stroke-standard" />,
    DXAdornmentEnd: () => (
      <Icon dxIcon="cancel-01-stroke-standard" dxColor="primary" />
    ),
  } as InputProps,
};

// LG
export const Large: Story = {
  args: {
    dxSize: "lg",
  } as InputProps,
};
export const LargeWithLabel: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
  } as InputProps,
};
export const LargeWithLabelHint: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
  } as InputProps,
};
export const LargeWithLabelHintError: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxError: "This is a required field",
  } as InputProps,
};
export const LargeWithContrast: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
  } as InputProps,
};
export const LargeWithContrastError: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
    dxError: "This is a required field",
  } as InputProps,
};
export const LargeWithAdornmentStart: Story = {
  args: {
    dxSize: "lg",
    DXAdornmentStart: () => <Icon dxIcon="search-01-stroke-standard" />,
  } as InputProps,
};
export const LargeWithAdornmentEnd: Story = {
  args: {
    dxSize: "lg",
    DXAdornmentEnd: () => <Icon dxIcon="cancel-01-stroke-standard" />,
  } as InputProps,
};
export const LargeWithAdornments: Story = {
  args: {
    dxSize: "lg",
    DXAdornmentStart: () => <Icon dxIcon="search-01-stroke-standard" />,
    DXAdornmentEnd: () => (
      <Icon dxIcon="cancel-01-stroke-standard" dxColor="primary" />
    ),
  } as InputProps,
};
