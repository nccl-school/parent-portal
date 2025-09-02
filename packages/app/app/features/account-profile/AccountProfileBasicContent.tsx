import {
  InputGroup,
  InputText,
  ModalBody,
  ModalFooter,
  ModalFooterCancel,
  ModalFooterSubmit,
  ModalHeader,
  ModalHeaderTitle,
} from "@nccl/components";
import { Form } from "react-router";

import { useIsSubmitting } from "../../hooks/hook.useIsSubmitting";
import { useUser } from "../../hooks/hook.useUser";

export function AccountProfileBasicContent() {
  const isSubmitting = useIsSubmitting();
  const user = useUser();

  return (
    <Form>
      <ModalHeader>
        <ModalHeaderTitle>Basic information</ModalHeaderTitle>
      </ModalHeader>
      <ModalBody>
        <InputGroup>
          <InputText
            dxLabel="Email address"
            dxHint="This is your unique account email and can’t be changed."
            dxVariant="contrasted"
            value={user?.email}
            disabled
          />
          <InputText
            name="firstName"
            dxLabel="First name"
            dxVariant="contrasted"
            defaultValue={user?.firstName}
          />
          <InputText
            name="lastName"
            dxLabel="Last name"
            dxVariant="contrasted"
            defaultValue={user?.lastName}
          />
          <InputText
            type="tel"
            dxLabel="Phone #"
            dxVariant="contrasted"
            defaultValue={user?.phone ?? undefined}
          />
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <ModalFooterCancel />
        <ModalFooterSubmit isLoading={isSubmitting}>Submit</ModalFooterSubmit>
      </ModalFooter>
    </Form>
  );
}
