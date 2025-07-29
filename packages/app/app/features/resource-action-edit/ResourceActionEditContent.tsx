import type { GetResourceResponse } from "@nccl/api/client";
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
import { useFetcher } from "react-router";

import { slugify } from "../../utils/client";

export function ResourceActionEditContent() {
  const { state: resource } =
    useModalContext<GetResourceResponse["childResources"][0]>();
  const [autoSlug, setAutoSlug] = useState(resource.slug);

  const { Form, data, state } = useFetcher();
  const isLoading = state !== "idle";

  useEffect(() => {
    if (!data) return;
  }, [data]);

  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle>Edit resource</ModalHeaderTitle>
        <ModalHeaderSubtitle>
          Fill in the details below to help others understand what this resource
          is about.
        </ModalHeaderSubtitle>
      </ModalHeader>
      <Form>
        <ModalBody>
          <InputGroup>
            <InputText
              dxLabel="Name"
              name="name"
              defaultValue={resource.name}
              onChange={({ currentTarget: { value } }) =>
                setAutoSlug(slugify(value))
              }
            />
            <InputText
              dxLabel="URL Slug"
              dxHint="This becomes part of the URL path (e.g. /resources/your-slug)"
              value={autoSlug}
              onChange={({ currentTarget: { value } }) =>
                setAutoSlug(slugify(value))
              }
            />
            <InputTextarea
              dxLabel="Description"
              name="description"
              rows={5}
              defaultValue={resource.description ?? undefined}
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <ModalFooterCancel />
          <ModalFooterSubmit isLoading={isLoading}>
            Save and close
          </ModalFooterSubmit>
        </ModalFooter>
      </Form>
    </>
  );
}
