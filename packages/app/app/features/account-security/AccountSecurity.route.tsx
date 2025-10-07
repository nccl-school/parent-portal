import { Button } from "@nccl/components";
import { AuthChangePasswordSchema } from "@nccl/api/client";

import type { Route } from "./+types/AccountSecurity.route";
import { AccountSecurityChangePassword } from "./AccountSecurityChangePassword";

import { createRouteHandle, validateFormData } from "../../utils/isomorphic";
import { PageHeader } from "../../components/page";
import { AccountPageSection } from "../account/AccountPageSection";
import { AccountPageSectionHeader } from "../account/AccountPageSectionHeader";

export const handle = createRouteHandle({
  mobileTitle: "Security",
});

export async function action(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");

  try {
    const formData = await args.request.formData();
    const body = await validateFormData(AuthChangePasswordSchema, formData);

    await ncclClient.auth.changePassword(body);
    return {
      successMessage: "Successfully updated your password",
    };
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

export default function AccountSecurity() {
  return (
    <>
      <PageHeader
        dxTitle="Security"
        dxSubtitle="Manage your login, password, and other personal settings."
      />
      <AccountSecurityChangePassword.Component />
      <AccountPageSection>
        <AccountPageSectionHeader
          dxTitle="Password Reset"
          dxSubtitle="Click on the button below to initiate a the password reset flow"
        />
        <div>
          <Button
            dxVariant="contained"
            dxSize="md"
            dxColor="alt"
            type="button"
            onClick={AccountSecurityChangePassword.launch}
          >
            Reset your password
          </Button>
        </div>
      </AccountPageSection>
    </>
  );
}
