import {
  ModalBody,
  ModalFooter,
  ModalFooterCancel,
  ModalFooterSubmit,
  ModalHeader,
  ModalHeaderTitle,
  Toast,
  Typography,
  useModalContext,
} from "@nccl/components";
import { useActionData, useSubmit } from "react-router";
// import type { UpdateMyProfileRequest } from "@nccl/api/client";
import { useEffect } from "react";
import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { useCrop } from "holycrop/client";

import { type action } from "./AccountProfile.route";

import { isError } from "../../utils/client";
import { useIsSubmitting } from "../../hooks/hook.useIsSubmitting";

const styles = css`
  height: ${makeRem(300)};
  width: 100%;
  overflow: hidden;
  border-radius: ${makeRem(8)};
  display: grid;
  place-content: center;
`;

const stylesLabel = css`
  display: flex;
  gap: ${makeRem(16)};
  padding: ${makeRem(16)} 0;
  color: ${makeColor("primary-1000")};

  input {
    display: none;
  }
`;

export function AccountProfileAvatarContent() {
  const isSubmitting = useIsSubmitting();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const { close: closeModal } = useModalContext();
  const {
    handleSelectImage,
    areaProps,
    imgProps,
    maskProps,
    getCropArea,
    getFile,
  } = useCrop({
    maskSize: 200,
  });

  // Display a toast if you update it properly
  useEffect(() => {
    if (isError(actionData)) {
      return Toast.error(actionData.message);
    }
    if (actionData?.success) {
      Toast.success(actionData.success);
    }
  }, [actionData, closeModal]);

  function handleSubmit() {
    try {
      const file = getFile();
      const area = getCropArea();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("x", area.x.toString());
      formData.append("y", area.y.toString());
      formData.append("height", area.height.toString());
      formData.append("width", area.width.toString());

      submit(formData, { method: "POST", encType: "multipart/form-data" });
    } catch (error) {
      let errMessage = "An error occurred when trying to upload the avatar.";
      if (error instanceof Error) {
        errMessage = error.message;
      }

      Toast.error(errMessage);
    }
  }
  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle>Upload a new avatar</ModalHeaderTitle>
      </ModalHeader>
      <ModalBody>
        <label className={stylesLabel}>
          <Typography dxNode="div" dxVariant="label">
            Select an image file
          </Typography>
          <input type="file" onChange={handleSelectImage} />
        </label>
        <form>
          <div className={styles}>
            <div {...areaProps}>
              <div {...maskProps} />
              <img {...imgProps} />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <ModalFooterCancel>Cancel</ModalFooterCancel>
        <ModalFooterSubmit isLoading={isSubmitting} onClick={handleSubmit}>
          Save
        </ModalFooterSubmit>
      </ModalFooter>
    </>
  );
}
