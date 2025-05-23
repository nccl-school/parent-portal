import type { Meta } from "@storybook/react";

import { Avatar } from "./Avatar.js";

const meta: Meta = {
  title: "Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof meta>;

export default meta;

export function WithImage() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar dxFirstName="Guy" dxSize="sm" dxSrc="https://i.pravatar.cc/300" />
      <Avatar dxFirstName="Guy" dxSize="md" dxSrc="https://i.pravatar.cc/300" />
      <Avatar dxFirstName="Guy" dxSize="lg" dxSrc="https://i.pravatar.cc/300" />
      <Avatar dxFirstName="Guy" dxSize="xl" dxSrc="https://i.pravatar.cc/300" />
    </div>
  );
}
export function WithoutImage() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar dxFirstName="Guy" dxSize="sm" />
      <Avatar dxFirstName="Guy" dxSize="md" />
      <Avatar dxFirstName="Guy" dxSize="lg" />
      <Avatar dxFirstName="Guy" dxSize="xl" />
    </div>
  );
}
export function With2Initials() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar dxFirstName="Drew" dxLastName="Carey" dxSize="sm" />
      <Avatar dxFirstName="Drew" dxLastName="Carey" dxSize="md" />
      <Avatar dxFirstName="Drew" dxLastName="Carey" dxSize="lg" />
      <Avatar dxFirstName="Drew" dxLastName="Carey" dxSize="xl" />
    </div>
  );
}
export function WithCustomSize() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar dxFirstName="Drew" dxLastName="Carey" dxSize={10} />
      <Avatar dxFirstName="Drew" dxLastName="Carey" dxSize={80} />
      <Avatar dxFirstName="Drew" dxLastName="Carey" dxSize={31} />
      <Avatar dxFirstName="Drew" dxLastName="Carey" dxSize={100} />
    </div>
  );
}
export function WithCustomBgs() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar
        dxFirstName="Drew"
        dxLastName="Carey"
        dxSize="sm"
        dxBgColor="alt-400"
      />
      <Avatar
        dxFirstName="Drew"
        dxLastName="Carey"
        dxSize="md"
        dxBgColor="warning-600"
      />
      <Avatar
        dxFirstName="Drew"
        dxLastName="Carey"
        dxSize="lg"
        dxBgColor="hover-700"
      />
      <Avatar
        dxFirstName="Drew"
        dxLastName="Carey"
        dxSize="xl"
        dxBgColor="primary-700"
      />
    </div>
  );
}
