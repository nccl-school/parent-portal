import { css } from "@linaria/core";
import {
  Button,
  Callout,
  FormGroup,
  InputGroup,
  InputTags,
  ModalBody,
  ModalController,
  ModalFooter,
  ModalHeader,
  ModalHeaderSubtitle,
  ModalHeaderTitle,
} from "@nccl/components";
import { makeRem } from "@nccl/theme";
import { useMemo } from "react";
import { href, useFetcher } from "react-router";
import type { InviteUsersRequest } from "@nccl/api/client";

import { useAdminUserInviteModalContext } from "./admin-user-invite.useModalContext";

import { RoleRadioGroup } from "../user";
import type { action as inviteUserAction } from "../../api/api.account.inviteUsers";
import { getValidationErrors } from "../../utils/client";

const className = css`
  width: ${makeRem(500)};
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const styles = css`
  height: 100%;
  overflow: auto;
`;

export const AdminUserInvite = new ModalController({
  props: {
    dxVariant: "drawer-right",
  },
  ModalContent,
});

function ModalContent() {
  const { close: closeModal } = useAdminUserInviteModalContext();
  const fetcher = useFetcher<typeof inviteUserAction>();
  const errors = getValidationErrors<InviteUsersRequest>(fetcher.data);

  return (
    <fetcher.Form
      action={href("/api/account/invite")}
      method="POST"
      className={className}
    >
      {useMemo(
        () => (
          <ModalHeader>
            <ModalHeaderTitle>Invite users</ModalHeaderTitle>
            <ModalHeaderSubtitle>
              Invite parents, staff, teachers and admins to the platform
            </ModalHeaderSubtitle>
          </ModalHeader>
        ),
        []
      )}
      <ModalBody className={styles}>
        <FormGroup dxSubtitle="Enter in a 1 or many comma delimited email addresses. If the user hasn't already been invited, they will receive an invite at this email and then use this to sign in">
          <InputGroup dxLayout="stacked">
            <InputTags
              dxError={errors.email_addresses?.[0]}
              name="email_addresses"
              dxVariant="contrasted"
            />
          </InputGroup>
        </FormGroup>
        <FormGroup dxSubtitle="Select the role that the above users will have. It will determine what they can view and do inside of the platform">
          {errors.role?.[0] && (
            <Callout
              variant="danger"
              description={errors.role?.[0]}
              style={{ marginBottom: makeRem(12) }}
            />
          )}
          <RoleRadioGroup />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          dxVariant="outlined"
          dxColor="secondary"
          dxSize="md"
          type="button"
          onClick={closeModal}
        >
          close
        </Button>
        <Button
          dxVariant="contained"
          dxColor="secondary"
          dxSize="md"
          type="submit"
          dxStartIcon="sent-stroke-standard"
        >
          Invite
        </Button>
        <Button
          dxVariant="contained"
          dxColor="primary"
          dxSize="md"
          type="submit"
          dxStartIcon="sent-stroke-standard"
        >
          Invite & Close
        </Button>
      </ModalFooter>
    </fetcher.Form>
  );
}
