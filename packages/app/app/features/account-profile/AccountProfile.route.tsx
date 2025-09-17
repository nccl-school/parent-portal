import {
  Avatar,
  DescriptionList,
  DescriptionListData,
  DescriptionListTag,
  Typography,
} from "@nccl/components";
import { ErrorSet, UpdateMyProfileRequestSchema } from "@nccl/api/client";

import type { Route } from "./+types/AccountProfile.route";
import { AccountProfileBasic } from "./AccountProfileBasic";
import { AccountProfileAvatar } from "./AccountProfileAvatar";
import { AccountProfileBio } from "./AccountProfileBio";

import { getNCCLClient } from "../../utils/server";
import { dates } from "../../utils/client";
import { createRouteHandle, validateFormData } from "../../utils/isomorphic";
import { PageHeader } from "../../components/page";
import { AccountPageSection } from "../account/AccountPageSection";
import { AccountPageSectionHeader } from "../account/AccountPageSectionHeader";

export const handle = createRouteHandle({
  mobileTitle: "Profile",
});

export async function loader(args: Route.LoaderArgs) {
  const ncclClient = getNCCLClient(args);
  const user = await ncclClient.user.getCurrentUser();
  return { user };
}

export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  const formData = await args.request.formData();

  try {
    switch (args.request.method) {
      // Update the profile
      case "PUT": {
        const body = await validateFormData(
          UpdateMyProfileRequestSchema,
          formData
        );
        await ncclClient.user.updateMyProfile(body);
        return {
          success: "Successfully updated your profile",
        };
      }

      // Post a new avatar
      case "POST": {
        await ncclClient.user.updateAvatar(formData);
        return {
          success: "Successfully update the avatar",
        };
      }

      default:
        throw new ErrorSet.methodNotAllowed(args.request.method);
    }
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

export default function AccountProfile({
  loaderData: { user },
}: Route.ComponentProps) {
  return (
    <>
      <AccountProfileAvatar.Component />
      <AccountProfileBasic.Component />
      <AccountProfileBio.Component />
      <PageHeader
        dxTitle="Profile"
        dxSubtitle="Share a little about yourself so other families and staff can get to know you better."
      />
      <AccountPageSection>
        <AccountPageSectionHeader
          dxTitle="Avatar"
          dxSubtitle="Add a friendly face! Upload or adjust your profile picture so others can easily recognize you."
          dxOnClick={AccountProfileAvatar.launch}
        />
        <div>
          <Avatar
            dxSize={128}
            dxFirstName={user.firstName}
            dxLastName={user.lastName}
            dxSrc={user.imageUrl ?? undefined}
          />
          <Typography dxNode="div" dxVariant="body3">
            No image uploaded yet
          </Typography>
        </div>
      </AccountPageSection>
      <AccountPageSection>
        <AccountPageSectionHeader
          dxTitle="Basic information"
          dxSubtitle="Keep your name, contact info, and other details up to date to stay connected."
          dxOnClick={AccountProfileBasic.launch}
        />
        <DescriptionList>
          <DescriptionListTag>First name</DescriptionListTag>
          <DescriptionListData>{user.firstName}</DescriptionListData>
          <DescriptionListTag>Last name</DescriptionListTag>
          <DescriptionListData>{user.lastName}</DescriptionListData>
          <DescriptionListTag>Email</DescriptionListTag>
          <DescriptionListData>{user.email}</DescriptionListData>
          <DescriptionListTag>Phone</DescriptionListTag>
          <DescriptionListData>{user.phone}</DescriptionListData>
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
          dxOnClick={AccountProfileBio.launch}
        />
        <Typography dxVariant="body3" dxNode="div">
          {user.bio ?? "No bio added yet."}
        </Typography>
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
