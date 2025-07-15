import type { Meta, StoryObj } from "@storybook/react";

import { Callout, type CalloutProps } from "./Callout.js";

const meta: Meta = {
  title: "Callout",
  component: Callout,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {
  args: {
    variant: "danger",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
  } as CalloutProps,
};

export const DangerWithTitle: Story = {
  args: {
    variant: "danger",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "You need to make sure you do something",
  },
};

export const DangerOmitIcon: Story = {
  args: {
    variant: "danger",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "You need to make sure you do something",
    omitIcon: true,
  },
};

export const WarningNoIcon: Story = {
  args: {
    variant: "warning",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "You need to make sure you do something",
    omitIcon: true,
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "",
    omitIcon: true,
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "",
    omitIcon: true,
  },
};

export const SuccessWithTitle: Story = {
  args: {
    variant: "success",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "Something really great will happen next",
    omitIcon: true,
  },
};

export const SuccessWithIcon: Story = {
  args: {
    variant: "success",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "Something really great will happen next",
    omitIcon: false,
  },
};

export const InfoWithTitle: Story = {
  args: {
    variant: "info",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "Something really great will happen next",
    omitIcon: false,
  },
};

export const InfoNoTitle: Story = {
  args: {
    variant: "info",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "",
    omitIcon: false,
  },
};

export const Note: Story = {
  args: {
    variant: "note",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "",
    omitIcon: false,
  },
};

export const NoteOmitIcon: Story = {
  args: {
    variant: "note",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "",
    omitIcon: true,
  },
};

export const NoteWithTitle: Story = {
  args: {
    variant: "note",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "This is just a note",
    omitIcon: false,
  },
};

export const WarningWithIcon: Story = {
  args: {
    variant: "warning",
    description:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    title: "",
    omitIcon: false,
  },
};
