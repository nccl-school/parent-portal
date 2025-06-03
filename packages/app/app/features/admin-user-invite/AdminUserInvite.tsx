import { css } from "@linaria/core";
import {
  Button,
  ModalController,
  ModalFooter,
  ModalHeader,
  ModalHeaderSubtitle,
  ModalHeaderTitle,
} from "@nccl/components";
import { makeRem } from "@nccl/theme";
import { useMemo } from "react";

import { useAdminUserInviteModalContext } from "./admin-user-invite.useModalContext";
import { AdminUserInviteContent } from "./AdminUserInviteContent";

const className = css`
  width: ${makeRem(500)};
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export const AdminUserInvite = new ModalController({
  props: {
    dxVariant: "drawer-rtl",
    className,
  },
  ModalContent,
});

function ModalContent() {
  const { close: closeModal } = useAdminUserInviteModalContext();
  return (
    <>
      {useMemo(
        () => (
          <ModalHeader>
            <ModalHeaderTitle>Invite a user</ModalHeaderTitle>
            <ModalHeaderSubtitle>
              Invite parents, staff, teachers and admins to the platform
            </ModalHeaderSubtitle>
          </ModalHeader>
        ),
        []
      )}
      <AdminUserInviteContent />
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
    </>
  );
}
