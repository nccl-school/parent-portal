import {
  DescriptionList,
  DescriptionListData,
  DescriptionListTag,
} from "@nccl/components";

import type { Route } from "./+types/AccountProfile.route";

import { getNCCLClient } from "../../utils/server";
import { dates } from "../../utils/client";
import { createRouteHandle, placeholder } from "../../utils/isomorphic";
import { PageHeader } from "../../components/page";
import { AccountPageSection } from "../account/AccountPageSection";
import { AccountPageSectionHeader } from "../account/AccountPageSectionHeader";

export const handle = createRouteHandle({
  mobileTitle: "General",
});

export async function loader(args: Route.LoaderArgs) {
  const ncclClient = getNCCLClient(args);
  const user = await ncclClient.user.getCurrentUser();
  return { user };
}

export default function AccountProfile({
  loaderData: { user },
}: Route.ComponentProps) {
  return (
    <>
      <PageHeader
        dxTitle="Profile"
        dxSubtitle="Share a little about yourself so other families and staff can get to know you better."
      />
      <AccountPageSection>
        <AccountPageSectionHeader
          dxTitle="Avatar"
          dxSubtitle="Add a friendly face! Upload or adjust your profile picture so others can easily recognize you."
        />
      </AccountPageSection>
      <AccountPageSection>
        <AccountPageSectionHeader
          dxTitle="Basic information"
          dxSubtitle="Keep your name, contact info, and other details up to date to stay connected."
        />
        <DescriptionList>
          <DescriptionListTag>First name</DescriptionListTag>
          <DescriptionListData>{user.firstName}</DescriptionListData>
          <DescriptionListTag>Last name</DescriptionListTag>
          <DescriptionListData>{user.lastName}</DescriptionListData>
          <DescriptionListTag>Email</DescriptionListTag>
          <DescriptionListData>{user.email}</DescriptionListData>
          <DescriptionListTag>Phone</DescriptionListTag>
          <DescriptionListData>{user.phone ?? placeholder}</DescriptionListData>
          <DescriptionListTag>Last updated</DescriptionListTag>
          <DescriptionListData>
            {dates.format(user.updatedAt, "Relative")}
          </DescriptionListData>
        </DescriptionList>
      </AccountPageSection>
      <AccountPageSection>
        <AccountPageSectionHeader
          dxTitle="Bio"
          dxSubtitle="Write a short introduction to share your interests, background, or anything you'd like others to see."
        />
      </AccountPageSection>
      <AccountPageSection>
        <AccountPageSectionHeader
          dxTitle="Notifications"
          dxSubtitle="Stay in the loop! Pick how you’d like to receive updates from the school and the community."
        />
      </AccountPageSection>
    </>
  );
}
