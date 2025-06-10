import { css } from "@linaria/core";
import {
  Button,
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

import { useAdminUserInviteModalContext } from "./admin-user-invite.useModalContext";

import { UserPermissionRadioGroup } from "../user";
import type {
  action as inviteUserAction,
  InviteUsersApiRequest,
} from "../../api/api.user.inviteUsers";
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
    dxVariant: "drawer-rtl",
  },
  ModalContent,
});

function ModalContent() {
  const { close: closeModal } = useAdminUserInviteModalContext();
  const fetcher = useFetcher<typeof inviteUserAction>();
  const errors = getValidationErrors<keyof InviteUsersApiRequest>(fetcher.data);

  console.log(errors);

  return (
    <fetcher.Form
      action={href("/api/user/invite")}
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
        <FormGroup
          dxTitle="Contacts"
          dxSubtitle="Enter a list of users to invite to the platform. If the user hasn't already been invited, they will receive an invite at this email and then use this to sign in"
        >
          <InputGroup dxLayout="stacked">
            <InputTags
              dxError={errors.email_addresses?.[0]}
              dxLabel="Email Addresses"
              dxHint="Press Enter, tab, or comma to enter a value or copy + paste from a CSV"
              name="email_addresses"
              dxVariant="contrasted"
            />
          </InputGroup>
        </FormGroup>
        <FormGroup
          dxTitle="Permissions"
          dxSubtitle="Indicate the role that the above users will have. It will determine what they can view and do inside of the platform"
        >
          <UserPermissionRadioGroup />
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
