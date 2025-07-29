import type { Meta, StoryObj } from "@storybook/react";

import { Progress, type ProgressProps } from "./Progress.js";

const meta: Meta = {
  title: "Progress",
  component: Progress,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    min: 0,
    max: 100,
    value: 40,
  } as ProgressProps,
};
