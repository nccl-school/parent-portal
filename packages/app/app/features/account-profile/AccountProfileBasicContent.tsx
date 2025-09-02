import {
  ModalBody,
  ModalFooter,
  ModalFooterSubmit,
  ModalHeader,
  ModalHeaderTitle,
} from "@nccl/components";
import { Form } from "react-router";

import { useIsSubmitting } from "../../hooks/hook.useIsSubmitting";

export function AccountProfileBasicContent() {
  const isSubmitting = useIsSubmitting();
  return (
    <Form>
      <ModalHeader>
        <ModalHeaderTitle>Basic Information</ModalHeaderTitle>
      </ModalHeader>
      <ModalBody>body</ModalBody>
      <ModalFooter>
        <ModalFooterSubmit isLoading={isSubmitting}>Submit</ModalFooterSubmit>
      </ModalFooter>
    </Form>
  );
}
