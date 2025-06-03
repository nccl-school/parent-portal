import type { Meta, StoryObj } from "@storybook/react";

import { FormGroup, type FormGroupProps } from "./FormGroup.js";

import { InputGroup } from "../input-group/InputGroup.js";
import { InputText } from "../input-text/InputText.js";
import { InputSearch } from "../input-search/InputSearch.js";

const meta: Meta = {
  title: "FormGroup",
  component: FormGroup,
} satisfies Meta<typeof meta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  args: {
    dxTitle: "User attributes",
  } as FormGroupProps,
};

export const WithTitleDescription: Story = {
  args: {
    dxTitle: "User attributes",
    dxSubtitle: "Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
  } as FormGroupProps,
};

export const WithMany = () => {
  return (
    <>
      <FormGroup
        dxTitle="User attributes"
        dxSubtitle="Cras justo odio, dapibus ac facilisis in, egestas eget quam."
      >
        <InputGroup dxLayout="inline-stretch">
          <InputText dxLabel="First name" />
          <InputText dxLabel="Last name" />
        </InputGroup>
        <InputGroup>
          <InputSearch dxLabel="Search" />
        </InputGroup>
      </FormGroup>
      <FormGroup
        dxTitle="User attributes"
        dxSubtitle="Cras justo odio, dapibus ac facilisis in, egestas eget quam."
      >
        <InputGroup dxLayout="inline-stretch">
          <InputText dxLabel="First name" />
          <InputText dxLabel="Last name" />
        </InputGroup>
        <InputGroup>
          <InputSearch dxLabel="Search" />
        </InputGroup>
      </FormGroup>
    </>
  );
};
