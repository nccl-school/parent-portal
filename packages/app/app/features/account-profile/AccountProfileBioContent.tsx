import {
  InputGroup,
  InputTextarea,
  ModalBody,
  ModalFooter,
  ModalFooterCancel,
  ModalFooterSubmit,
  ModalHeader,
  ModalHeaderSubtitle,
  ModalHeaderTitle,
  Toast,
  useModalContext,
} from "@nccl/components";
import { Form, useActionData } from "react-router";
import type { UpdateMyProfileRequest } from "@nccl/api/client";
import { useEffect } from "react";

import type { action } from "./AccountProfile.route";

import { getValidationErrors, isError } from "../../utils/client";
import { useIsSubmitting } from "../../hooks/hook.useIsSubmitting";
import { useUser } from "../../hooks/hook.useUser";

export function AccountProfileBioContent() {
  const isSubmitting = useIsSubmitting();
  const user = useUser();
  const actionData = useActionData<typeof action>();
  const errors = getValidationErrors<UpdateMyProfileRequest>(actionData);
  const { close: closeModal } = useModalContext();

  // Display a toast if you update it properly
  useEffect(() => {
    if (isError(actionData)) {
      return Toast.error(actionData.message);
    }
    if (actionData?.success) {
      Toast.success(actionData.success);
    }
  }, [actionData, closeModal]);

  return (
    <Form method="PUT">
      <ModalHeader>
        <ModalHeaderTitle>Bio</ModalHeaderTitle>
        <ModalHeaderSubtitle>
          Write a short introduction to share your interests, background, or
          anything you'd like others to see.
        </ModalHeaderSubtitle>
      </ModalHeader>
      <ModalBody>
        <InputGroup>
          <input type="hidden" name="firstName" value={user?.firstName} />
          <input type="hidden" name="lastName" value={user?.lastName} />
          <InputTextarea
            dxVariant="contrasted"
            name="bio"
            defaultValue={user?.bio ?? ""}
            dxError={errors.bio?.[0]}
            rows={10}
          />
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <ModalFooterCancel />
        <ModalFooterSubmit isLoading={isSubmitting}>Save</ModalFooterSubmit>
      </ModalFooter>
    </Form>
  );
}
