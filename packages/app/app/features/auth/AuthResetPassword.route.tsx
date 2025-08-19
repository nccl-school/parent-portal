import { InputGroup, InputText, Typography, Button } from "@nccl/components";
import { makeRem } from "@nccl/theme";
import { Form } from "react-router";

import { PageHeader } from "../../components/page";

export default function AuthResetPassword() {
  return (
    <Form method="post">
      <PageHeader
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: makeRem(32),
        }}
        dxTitle="Reset your password"
        dxSubtitle="Type your email address below. If it matches an account, we’ll send a reset link."
      />
      <InputGroup>
        {/* <InputText
          name="email"
          dxLabel="Email address"
          autoComplete="username"
          //   dxError={validationErrors.email?.[0]}
        /> */}
        {/* <Button
          dxSize="md"
          dxVariant="contained"
          dxColor="secondary"
          style={{ justifyContent: "center" }}
          type="submit"
          disabled={navigation.state !== "idle"}
        >
          {navigation.state !== "idle"
            ? "Loading..."
            : "Request password reset"}
        </Button> */}
      </InputGroup>
    </Form>
  );
}
