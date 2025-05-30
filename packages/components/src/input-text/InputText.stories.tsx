import type { Meta, StoryObj } from "@storybook/react";

import { InputText, type InputTextProps } from "./InputText.js";

import { Icon } from "../icons/Icon.js";

const meta: Meta<InputTextProps> = {
  title: "InputText",
  component: InputText,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    dxSize: "sm",
  } as InputTextProps,
};
export const SmallWithLabel: Story = {
  args: {
    dxSize: "sm",
    dxLabel: "First name",
  } as InputTextProps,
};
export const SmallWithLabelHint: Story = {
  args: {
    dxSize: "sm",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
  } as InputTextProps,
};
export const SmallWithLabelHintError: Story = {
  args: {
    dxSize: "sm",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxError: "This is a required field",
  } as InputTextProps,
};
export const SmallWithContrast: Story = {
  args: {
    dxSize: "sm",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
  } as InputTextProps,
};
export const SmallWithAdornmentStart: Story = {
  args: {
    dxSize: "sm",
    DXAdornmentStart: () => <Icon dxIcon="search-01-stroke-standard" />,
  } as InputTextProps,
};
export const SmallWithAdornmentEnd: Story = {
  args: {
    dxSize: "sm",
    DXAdornmentEnd: () => <Icon dxIcon="cancel-01-stroke-standard" />,
  } as InputTextProps,
};
export const SmallWithAdornments: Story = {
  args: {
    dxSize: "sm",
    DXAdornmentStart: () => <Icon dxIcon="search-01-stroke-standard" />,
    DXAdornmentEnd: () => <Icon dxIcon="cancel-01-stroke-standard" />,
  } as InputTextProps,
};

// MD
export const Medium: Story = {
  args: {
    dxSize: "md",
  } as InputTextProps,
};
export const MediumWithLabel: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
  } as InputTextProps,
};
export const MediumWithLabelHint: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
  } as InputTextProps,
};
export const MediumWithLabelHintError: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxError: "This is a required field",
  } as InputTextProps,
};
export const MediumWithContrast: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
  } as InputTextProps,
};
export const MediumWithContrastError: Story = {
  args: {
    dxSize: "md",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
    dxError: "This is a required field",
  } as InputTextProps,
};
export const MediumWithAdornmentStart: Story = {
  args: {
    dxSize: "md",
    DXAdornmentStart: () => <Icon dxIcon="search-01-stroke-standard" />,
  } as InputTextProps,
};
export const MediumWithAdornmentEnd: Story = {
  args: {
    dxSize: "md",
    DXAdornmentEnd: () => <Icon dxIcon="cancel-01-stroke-standard" />,
  } as InputTextProps,
};
export const MediumWithAdornments: Story = {
  args: {
    dxSize: "md",
    DXAdornmentStart: () => <Icon dxIcon="search-01-stroke-standard" />,
    DXAdornmentEnd: () => (
      <Icon dxIcon="cancel-01-stroke-standard" dxColor="primary" />
    ),
  } as InputTextProps,
};

// LG
export const Large: Story = {
  args: {
    dxSize: "lg",
  } as InputTextProps,
};
export const LargeWithLabel: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
  } as InputTextProps,
};
export const LargeWithLabelHint: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
  } as InputTextProps,
};
export const LargeWithLabelHintError: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxError: "This is a required field",
  } as InputTextProps,
};
export const LargeWithContrast: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
  } as InputTextProps,
};
export const LargeWithContrastError: Story = {
  args: {
    dxSize: "lg",
    dxLabel: "First name",
    dxHint: "Etiam Tortor Purus Condimentum Bibendum",
    dxVariant: "contrasted",
    dxError: "This is a required field",
  } as InputTextProps,
};
export const LargeWithAdornmentStart: Story = {
  args: {
    dxSize: "lg",
    DXAdornmentStart: () => <Icon dxIcon="search-01-stroke-standard" />,
  } as InputTextProps,
};
export const LargeWithAdornmentEnd: Story = {
  args: {
    dxSize: "lg",
    DXAdornmentEnd: () => <Icon dxIcon="cancel-01-stroke-standard" />,
  } as InputTextProps,
};
export const LargeWithAdornments: Story = {
  args: {
    dxSize: "lg",
    DXAdornmentStart: () => <Icon dxIcon="search-01-stroke-standard" />,
    DXAdornmentEnd: () => (
      <Icon dxIcon="cancel-01-stroke-standard" dxColor="primary" />
    ),
  } as InputTextProps,
};
