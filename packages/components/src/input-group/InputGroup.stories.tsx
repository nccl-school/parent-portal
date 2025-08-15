import type { Meta } from "@storybook/react";

import { InputGroup } from "./InputGroup.js";

import { InputCheckbox } from "../input-checkbox/InputCheckbox.js";
import { InputLabel } from "../input-label/InputLabel.js";
import { InputText } from "../input-text/InputText.js";
import { Button } from "../button/Button.js";

const meta: Meta = {
  title: "InputGroup",
} satisfies Meta<typeof meta>;

export default meta;

export const StackedAndInline = () => {
  return (
    <InputGroup>
      <InputText name="email" dxLabel="Email address" disabled value="test" />
      <InputGroup dxLayout="inline-stretch">
        <InputText name="first_name" dxLabel="First name" value="test" />
        <InputText name="last_name" dxLabel="Last name" value="test" />
      </InputGroup>
      <InputCheckbox dxLabelOrientation="after">
        <InputLabel dxNode="div" dxLabel="I agree to the Terms and Privacy" />
      </InputCheckbox>
      <br />
      <Button
        dxSize="md"
        dxVariant="contained"
        dxColor="secondary"
        style={{ justifyContent: "center" }}
      >
        Create Account
      </Button>
    </InputGroup>
  );
};
