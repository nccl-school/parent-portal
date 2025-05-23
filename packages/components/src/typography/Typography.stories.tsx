import type { Meta } from "@storybook/react";

import { Typography } from "./Typography.js";

const meta: Meta = {
  title: "Typography",
  component: Typography,
} satisfies Meta<typeof meta>;

export default meta;

export function Basic() {
  return (
    <>
      <Typography dxVariant="heading1" dxNode="h1">
        heading1
      </Typography>
      <Typography dxVariant="heading2" dxNode="h2">
        heading2
      </Typography>
      <Typography dxVariant="heading3" dxNode="h3">
        heading3
      </Typography>
      <Typography dxVariant="heading4" dxNode="h4">
        heading4
      </Typography>
      <Typography dxVariant="body1" dxNode="div">
        body1
      </Typography>
      <Typography dxVariant="body2" dxNode="div">
        body2
      </Typography>
      <Typography dxVariant="label" dxNode="div">
        label
      </Typography>
      <Typography dxVariant="caption" dxNode="div">
        caption
      </Typography>
    </>
  );
}
