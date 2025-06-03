import {
  Button,
  InputRadio,
  ModalBody,
  ModalController,
  ModalFooter,
  ModalHeader,
  ModalHeaderSubtitle,
  ModalHeaderTitle,
  Typography,
} from "@nccl/components";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import { href, useFetcher } from "react-router";
import { useEffect, useMemo } from "react";

import { useAdminUserPermissionsModalContext } from "./admin-user-permission.useModalContext";
import type { AdminUserPermissionsModalState } from "./admin-user-permission.utils";
import { AdminUserPermissionCard } from "./AdminUserPermissionCard";

import { getUserName, userRoles } from "../user";
import type { Roles } from "../../global";

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

const styles = css`
  margin-bottom: ${makeRem(16)};
`;

function ModalContent() {
  const {
    close: closeModal,
    state: { user },
  } = useAdminUserPermissionsModalContext();

  const fetcher = useFetcher();
  const isSaving = fetcher.state !== "idle";

  useEffect(() => {
    if (!fetcher.data) return;
    if (fetcher.data.status !== "success") return;
    closeModal();
  }, [closeModal, fetcher.data]);

  return (
    <>
      {useMemo(
        () => (
          <ModalHeader>
            <ModalHeaderTitle>Update Permissions</ModalHeaderTitle>
            <ModalHeaderSubtitle>
              Manage the user&apos;s ability to view, edit, and interact with
              content
            </ModalHeaderSubtitle>
          </ModalHeader>
        ),
        []
      )}
      <fetcher.Form
        action={href("/api/user/:id/role", { id: user.id })}
        method="POST"
      >
        {useMemo(
          () => (
            <ModalBody>
              <Typography dxVariant="body1" dxNode="div" className={styles}>
                Use the radio button's below to update{" "}
                <b>{getUserName(user)}'s</b> access
              </Typography>
              {Object.entries(userRoles).map(([userRole, roleDef]) => {
                return (
                  <InputRadio
                    key={userRole}
                    dxVariant="card"
                    dxSize="md"
                    name="role"
                    value={userRole}
                    defaultChecked={userRole === user.publicMetadata.role}
                  >
                    <AdminUserPermissionCard
                      role={userRole as Roles}
                      {...roleDef}
                    />
                  </InputRadio>
                );
              })}
            </ModalBody>
          ),
          [user]
        )}
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
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </ModalFooter>
      </fetcher.Form>
    </>
  );
}
