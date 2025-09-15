import type { Meta, StoryObj } from "@storybook/react-vite";

import type { AnchorContentProps } from "./AnchorContent.js";
import { AnchorContent } from "./AnchorContent.js";

const meta: Meta = {
  title: "AnchorContent",
  component: AnchorContent,
} satisfies Meta<typeof meta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: "this is a link",
  } as AnchorContentProps,
};
