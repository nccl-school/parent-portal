import { InputSearch } from "@nccl/components";
import { css } from "@linaria/core";
import { makeCustom } from "@nccl/theme";

import { ComingSoonState } from "../../components/states/ComingSoonState";
import { useUser } from "../../hooks/hook.useUser";
import { PageHeader } from "../../components/page";
import { CLASSES, createRouteHandle } from "../../utils/isomorphic";

const searchStyles = css`
  padding: ${makeCustom("page--gutter-mobile")};
`;

export const handle = createRouteHandle({ mobileTitle: "Students" });

export default function StudentsRoute() {
  const user = useUser();
  return (
    <>
      <PageHeader
        dxTitle="Students"
        className={CLASSES.desktopOnly}
        dxSubtitle={
          user?.role.id !== "USER"
            ? "Select your student to see their progress and the latest updates."
            : "Select and view students, their progress, and etc..."
        }
      />
      {user?.role.id === "STAFF" && (
        <InputSearch
          dxVariant="contrasted"
          dxSize="md"
          placeholder="Search"
          className={searchStyles}
        />
      )}
      <ComingSoonState allowSuggestions>
        We're working on a place to follow your students(s) journey, see their
        progress, and read updates from teachers
      </ComingSoonState>
    </>
  );
}
