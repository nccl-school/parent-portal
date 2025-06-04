import {
  FormGroup,
  Icon,
  InputGroup,
  InputText,
  ModalBody,
} from "@nccl/components";
import { css } from "@linaria/core";

import { UserPermissionRadioGroup } from "../user";

function AdornmentStart() {
  return <Icon dxIcon="at-stroke-standard" dxSize={20} />;
}

const styles = css`
  height: 100%;
  overflow: auto;
`;

export function AdminUserInviteContent() {
  return (
    <ModalBody className={styles}>
      <FormGroup dxTitle="General information">
        <InputGroup dxLayout="inline-stretch">
          <InputText dxLabel="First name" dxVariant="contrasted" />
          <InputText dxLabel="Last name" dxVariant="contrasted" />
        </InputGroup>
        <InputGroup>
          <InputText
            dxLabel="Email address"
            type="email"
            dxVariant="contrasted"
            DXAdornmentStart={AdornmentStart}
            dxHint="They will receive an invite at this email and then use this to sign in"
          />
        </InputGroup>
      </FormGroup>
      <FormGroup
        dxTitle="Permissions"
        dxSubtitle="Indicate the role that the user will have. It will determine what they can view and do inside of the platform"
      >
        <UserPermissionRadioGroup />
      </FormGroup>
      <FormGroup
        dxTitle="Enrolled Students"
        dxSubtitle="Select an existing or create a new student to associate to the parent"
      >
        <InputText dxVariant="contrasted" />
      </FormGroup>
    </ModalBody>
  );
}
