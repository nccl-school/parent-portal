import {
  ModalBody,
  ModalController,
  ModalFooter,
  ModalHeader,
  ModalHeaderSubtitle,
  ModalHeaderTitle,
  Typography,
} from "@nccl/components";
import { css } from "@linaria/core";
import { makeFontWeight, makeRem } from "@nccl/theme";

import { useAdminUserPermissionsModalContext } from "./admin-user-permission.useModal";
import type { AdminUserPermissionsModalState } from "./admin-user-permission.utils";

import { UserRoleBadge } from "../user";

const className = css`
  width: ${makeRem(600)};
`;

export const AdminUserPermissions =
  new ModalController<AdminUserPermissionsModalState>({
    props: {
      dxVariant: "basic",
      className,
    },
    ModalContent,
  });

const currentRoleStyles = css`
  display: grid;
  gap: ${makeRem(4)};
`;

function ModalContent() {
  const {
    close,
    state: { user },
  } = useAdminUserPermissionsModalContext();
  console.log(user);

  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle>Update Permissions</ModalHeaderTitle>
        <ModalHeaderSubtitle>
          Manage the user&apos;s ability to view, edit, and interact with
          content
        </ModalHeaderSubtitle>
      </ModalHeader>
      <ModalBody>
        <div className={currentRoleStyles}>
          <Typography
            dxVariant="heading4"
            dxNode="div"
            style={{
              marginBottom: makeRem(8),
              fontWeight: makeFontWeight("body-semiBold"),
            }}
          >
            Current Role
          </Typography>
          <div>
            <UserRoleBadge publicMetadata={user.publicMetadata} />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button type="button" onClick={close}>
          close
        </button>
      </ModalFooter>
    </>
  );
}
