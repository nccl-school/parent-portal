import {
  Button,
  InputCheckbox,
  InputGroup,
  InputLabel,
  InputPassword,
  InputText,
} from "@nccl/components";
import { makeRem } from "@nccl/theme";

import { PageHeader } from "../../components/page";

export function AuthAcceptInviteValid() {
  return (
    <>
      <PageHeader
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: makeRem(32),
        }}
        dxTitle="Create your account"
        dxSubtitle="Enter your credentials to access your account"
      />
      <InputGroup>
        <InputText name="email" dxLabel="Email address" disabled value="test" />
        <InputGroup dxLayout="inline-stretch">
          <InputText name="first_name" dxLabel="First name" value="test" />
          <InputText name="last_name" dxLabel="Last name" value="test" />
        </InputGroup>
        <InputPassword name="password" dxLabel="Password" />
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
    </>
  );
}
