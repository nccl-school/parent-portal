import {
  InputGroup,
  InputPassword,
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
import type { AuthChangePassword } from "@nccl/api/client";
import { useEffect, useState } from "react";

import type { action } from "./AccountSecurity.route";

import { getValidationErrors, isError } from "../../utils/client";
import { useIsSubmitting } from "../../hooks/hook.useIsSubmitting";
import { AuthPasswordMeter } from "../auth/AuthFieldPassword";

export function AccountSecurityChangePasswordContent() {
  const isSubmitting = useIsSubmitting();
  const actionData = useActionData<typeof action>();
  const errors = getValidationErrors<AuthChangePassword>(actionData);
  const { close: closeModal } = useModalContext();
  const [password, setPassword] = useState<string>("");

  // Display a toast if you update it properly
  useEffect(() => {
    if (isError(actionData)) {
      return Toast.error(actionData.message);
    }
    if (actionData?.successMessage) {
      Toast.success("Successfully changed your password");
    }
  }, [actionData, closeModal]);

  return (
    <Form method="PUT">
      <ModalHeader>
        <ModalHeaderTitle>Change your password</ModalHeaderTitle>
      </ModalHeader>
      <ModalBody>
        <InputGroup>
          <InputPassword
            name="currentPassword"
            dxLabel="Current password"
            dxVariant="contrasted"
            dxError={errors.currentPassword?.[0]}
          />
          <InputPassword
            name="newPassword"
            dxLabel="New Password"
            dxVariant="contrasted"
            dxError={errors.password?.[0]}
            onChange={(e) => setPassword(e.currentTarget.value)}
            value={password}
          />
          <InputPassword
            name="repeatNewPassword"
            dxLabel="Confirm new password"
            dxVariant="contrasted"
            dxError={errors.confirmPassword?.[0]}
          />
          <AuthPasswordMeter password={password} />
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <ModalFooterCancel />
        <ModalFooterSubmit isLoading={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </ModalFooterSubmit>
      </ModalFooter>
    </Form>
  );
}
