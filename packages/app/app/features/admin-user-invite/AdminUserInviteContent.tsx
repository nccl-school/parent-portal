import {
  FormGroup,
  Icon,
  InputGroup,
  InputText,
  ModalBody,
} from "@nccl/components";

function AdornmentStart() {
  return <Icon dxIcon="at-stroke-standard" dxSize={20} />;
}

export function AdminUserInviteContent() {
  return (
    <ModalBody>
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
        hi there
      </FormGroup>
    </ModalBody>
  );
}
