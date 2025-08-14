import type { Meta, StoryObj } from "@storybook/react";
import { randFullName } from "@ngneat/falso";

import { InputRadio, type InputRadioProps } from "./InputRadio.js";

import { Typography } from "../typography/Typography.js";

const meta: Meta = {
  title: "InputRadio",
  component: InputRadio,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {} as InputRadioProps,
};

export const BasicWithLabel: Story = {
  args: {
    children: (
      <>
        <Typography dxNode="div" dxVariant="body3">
          There can be anything in here
        </Typography>
        <Typography dxNode="div" dxVariant="caption">
          There can be anything in herehere can be anything in herehere can be
          anything in herehere can be anything in herehere can be anything in
          herehere can be anything in herehere can be anything in herehere can
          be anything in herehere can be anything in here
        </Typography>
      </>
    ),
  } as InputRadioProps,
};

export const CardSmall: Story = {
  args: {
    dxVariant: "card",
    dxSize: "sm",
    children: (
      <Typography dxNode="div" dxVariant="body1">
        There can be anything in here
      </Typography>
    ),
  } as InputRadioProps,
};
export const CardMedium: Story = {
  args: {
    dxVariant: "card",
    dxSize: "md",
    children: (
      <Typography dxNode="div" dxVariant="body1">
        There can be anything in here
      </Typography>
    ),
  } as InputRadioProps,
};

export const CardLarge: Story = {
  args: {
    dxVariant: "card",
    dxSize: "lg",
    children: (
      <Typography dxNode="div" dxVariant="body1">
        There can be anything in here
      </Typography>
    ),
  } as InputRadioProps,
};

export const CardCollection = () => {
  return (
    <div style={{ width: "30vw" }}>
      {[...new Array(10)].map(randFullName).map((fullName) => {
        return (
          <InputRadio
            dxVariant="card"
            dxSize="md"
            name="random"
            key={fullName.toLocaleString()}
          >
            <Typography dxVariant="body1" dxNode="div">
              {fullName}
            </Typography>
          </InputRadio>
        );
      })}
    </div>
  );
};
