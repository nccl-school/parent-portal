import {
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

import { getValidationErrors, isError } from "../../utils/client";
import { useIsSubmitting } from "../../hooks/hook.useIsSubmitting";
import { useUser } from "../../hooks/hook.useUser";

export function AccountProfileAvatarContent() {
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
    <Form method="POST">
      <ModalHeader>
        <ModalHeaderTitle>Add / Edit avatar</ModalHeaderTitle>
      </ModalHeader>
      <ModalBody>
        <div></div>
      </ModalBody>
      <ModalFooter>
        <ModalFooterCancel />
        <ModalFooterSubmit isLoading={isSubmitting}>
          Save changes
        </ModalFooterSubmit>
      </ModalFooter>
    </Form>
  );
}
