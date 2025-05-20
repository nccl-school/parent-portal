import type { Meta, StoryObj } from "@storybook/react";
import { makeColor } from "@nccl/theme";

import { Icon, type IconProps } from "./Icon.js";

const meta: Meta = {
  title: "Icons",
  component: Icon,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof meta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    dxIcon: "home-06-solid-standard",
  } as IconProps,
};

export const Sizes = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Icon dxIcon="home-06-solid-standard" dxSize={12} />
      <Icon dxIcon="home-06-solid-standard" dxSize={16} />
      <Icon dxIcon="home-06-solid-standard" dxSize={20} />
      <Icon dxIcon="home-06-solid-standard" dxSize={24} />
      <Icon dxIcon="home-06-solid-standard" dxSize={28} />
      <Icon dxIcon="home-06-solid-standard" dxSize={32} />
      <Icon dxIcon="home-06-solid-standard" dxSize={36} />
      <Icon dxIcon="home-06-solid-standard" dxSize={40} />
    </div>
  );
};

export const Color = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        color: makeColor("alt-900"),
      }}
    >
      <Icon
        dxIcon="home-06-solid-standard"
        dxSize={12}
        dxColor="secondary-1200"
      />
      <Icon dxIcon="home-06-solid-standard" dxSize={16} />
      <Icon dxIcon="home-06-solid-standard" dxSize={20} />
      <Icon dxIcon="home-06-solid-standard" dxSize={24} />
      <Icon dxIcon="home-06-stroke-standard" dxSize={28} />
      <Icon dxIcon="home-06-stroke-standard" dxSize={32} />
      <Icon dxIcon="home-06-stroke-standard" dxSize={36} />
      <Icon dxIcon="home-06-stroke-standard" dxSize={40} />
    </div>
  );
};
