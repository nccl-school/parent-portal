import {
  InputGroup,
  InputText,
  ModalBody,
  ModalFooter,
  ModalFooterCancel,
  ModalFooterSubmit,
  ModalHeader,
  ModalHeaderTitle,
  Toast,
  useModalContext,
} from "@nccl/components";
import { Form, useActionData } from "react-router";
import type { UpdateMyProfileRequest } from "@nccl/api/client";
import { useEffect } from "react";

import type { action } from "./AccountProfile.route";

import { getValidationErrors } from "../../utils/client";
import { useIsSubmitting } from "../../hooks/hook.useIsSubmitting";
import { useUser } from "../../hooks/hook.useUser";

export function AccountProfileBasicContent() {
  const isSubmitting = useIsSubmitting();
  const user = useUser();
  const actionData = useActionData<typeof action>();
  const errors = getValidationErrors<UpdateMyProfileRequest>(actionData);
  const { close: closeModal } = useModalContext();

  // Display a toast if you update it properly
  useEffect(() => {
    if (actionData?.message) {
      Toast.success(actionData.message);
    }
  }, [actionData?.message, closeModal]);

  return (
    <Form method="PUT">
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
            dxError={errors.firstName?.[0]}
          />
          <InputText
            name="lastName"
            dxLabel="Last name"
            dxVariant="contrasted"
            defaultValue={user?.lastName}
            dxError={errors.lastName?.[0]}
          />
          <InputText
            name="phone"
            type="tel"
            dxLabel="Phone #"
            dxVariant="contrasted"
            defaultValue={user?.phone ?? undefined}
            dxError={errors.phone?.[0]}
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
