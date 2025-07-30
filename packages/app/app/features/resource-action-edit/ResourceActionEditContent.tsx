import type {
  GetResourceResponse,
  UpdateResourceMetaRequest,
} from "@nccl/api/client";
import {
  InputGroup,
  InputText,
  InputTextarea,
  ModalBody,
  ModalFooter,
  ModalFooterCancel,
  ModalFooterSubmit,
  ModalHeader,
  ModalHeaderSubtitle,
  ModalHeaderTitle,
  useModalContext,
} from "@nccl/components";
import { useEffect, useState } from "react";
import { href, useFetcher } from "react-router";

import { getValidationErrors, isError, slugify } from "../../utils/client";

export function ResourceActionEditContent() {
  const { state: resource, close: closeModal } =
    useModalContext<GetResourceResponse["childResources"][0]>();
  const [autoSlug, setAutoSlug] = useState(resource.slug);
  const { Form, data, state } = useFetcher();

  const errors = getValidationErrors<keyof UpdateResourceMetaRequest>(data);
  const isLoading = state !== "idle";

  useEffect(() => {
    if (!data || isError(data)) return;
    closeModal();
  }, [closeModal, data]);

  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle>Edit resource</ModalHeaderTitle>
        <ModalHeaderSubtitle>
          Fill in the details below to help others understand what this resource
          is about.
        </ModalHeaderSubtitle>
      </ModalHeader>
      <Form
        method="PUT"
        action={href("/api/resource/:id/meta", { id: resource.id })}
      >
        <ModalBody>
          <InputGroup>
            <InputText
              dxLabel="Name"
              name="name"
              dxError={errors.name?.[0]}
              defaultValue={resource.name}
              onChange={({ currentTarget: { value } }) =>
                setAutoSlug(slugify(value))
              }
            />
            <InputText
              dxLabel="URL Slug"
              name="slug"
              dxHint="This becomes part of the URL path (e.g. /resources/your-slug)"
              value={autoSlug}
              dxError={errors.slug?.[0]}
              onChange={({ currentTarget: { value } }) =>
                setAutoSlug(slugify(value))
              }
            />
            <InputTextarea
              dxLabel="Description"
              dxError={errors.description?.[0]}
              name="description"
              rows={5}
              defaultValue={resource.description ?? undefined}
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <ModalFooterCancel />
          <ModalFooterSubmit isLoading={isLoading} type="submit">
            Save and close
          </ModalFooterSubmit>
        </ModalFooter>
      </Form>
    </>
  );
}
