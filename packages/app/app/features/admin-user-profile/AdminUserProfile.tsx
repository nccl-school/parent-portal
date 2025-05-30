import {
  Avatar,
  ModalBody,
  ModalController,
  ModalFooter,
  Typography,
} from "@nccl/components";

import { useAdminUserProfileModalContext } from "./admin-user-profile.useModal";
import type { AdminUserProfileModalState } from "./admin-user-profile.utils";

export const AdminUserProfile = new ModalController<AdminUserProfileModalState>(
  {
    props: {
      dxVariant: "drawer-rtl",
      style: {
        width: "45vh",
      },
    },
    ModalContent,
  }
);

function ModalContent() {
  const {
    close,
    state: { user },
  } = useAdminUserProfileModalContext();
  console.log(user);

  return (
    <>
      <ModalBody>
        <Typography dxVariant="heading3" dxNode="h3">
          {user.firstName ?? "-- --"}
        </Typography>
        <Avatar
          dxFirstName={user.firstName ?? ""}
          dxSize={64}
          dxLastName={user.lastName ?? undefined}
          dxSrc={user.imageUrl}
        />
        <Typography dxVariant="heading4" dxNode="h4">
          Permissions
        </Typography>
        <Typography dxVariant="body1" dxNode="div">
          {user.publicMetadata.role ?? "Unassigned"}
        </Typography>
      </ModalBody>
      <ModalFooter>
        <button type="button" onClick={close}>
          close
        </button>
      </ModalFooter>
    </>
  );
}
