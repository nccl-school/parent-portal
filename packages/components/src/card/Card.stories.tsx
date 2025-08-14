import type { Meta, StoryObj } from "@storybook/react";

import { Card, type CardProps } from "./Card.js";

const meta: Meta = {
  title: "Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Borderless: Story = {
  args: {
    dxVariant: "borderless",
    children: "Card Content",
  } as CardProps,
};

export const Contained: Story = {
  args: {
    dxVariant: "contained",
    children: "Card Content",
  } as CardProps,
};
