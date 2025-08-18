import z from "zod";
import { makeRem } from "@nccl/theme";
import { InputGroup, InputText, InputPassword, Button } from "@nccl/components";
import { Form, useNavigation, useSearchParams } from "react-router";

import type { Route } from "./+types/AuthAcceptInvite.route";

import { getValidationErrors } from "../../utils/client";
import { PageHeader } from "../../components/page";
import { getAuthClient } from "../../utils/server";
import { validateFormData } from "../../utils/isomorphic";

const signInEmailSchema = z.object({
  email: z.string({ error: "Please enter an email address" }),
  password: z.string({ error: "Please enter a password" }),
  rememberMe: z.boolean().optional(),
  redirectURL: z.string().optional(),
});

export async function action(args: Route.ActionArgs) {
  const authClient = getAuthClient();
  const formData = await args.request.formData();

  const url = new URL(args.request.url);
  const redirectURL = url.searchParams.get("redirectURL");

  const body = await validateFormData(signInEmailSchema, formData);

  const callbackURL = redirectURL
    ? `${args.context.env.NCCL_APP_URL}/${redirectURL}`
    : args.context.env.NCCL_APP_URL;

  // BA usually clears via its own sign-out endpoint; you can proxy or call it directly:
  const res = await authClient.signInEmail({
    headers: args.request.headers,
    body: {
      ...body,
      callbackURL,
    },
    asResponse: true,
  });
  console.log(res);
  return res;
}

export default function AuthAcceptInviteRoute(args: Route.ComponentProps) {
  const navigation = useNavigation();
  const [urlSearchParams] = useSearchParams();
  const errors = getValidationErrors<z.infer<typeof signInEmailSchema>>(
    args.actionData
  );

  return (
    <Form method="post">
      <PageHeader
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: makeRem(32),
        }}
        dxTitle="Welcome back!"
        dxSubtitle="Enter your credentials to sign into the parent portal"
      />
      <InputGroup>
        <input
          type="hidden"
          name="redirectURL"
          value={urlSearchParams.get("redirectURL") ?? undefined}
        />
        <InputText
          name="email"
          dxLabel="Email address"
          autoComplete="username"
          dxError={errors.email?.[0]}
        />
        <InputPassword
          name="password"
          dxLabel="Password"
          autoComplete="current-password"
          dxError={errors.password?.[0]}
        />

        {/* <InputCheckbox dxLabelOrientation="after">
          <InputLabel dxNode="div" dxLabel="I agree to the Terms and Privacy" />
        </InputCheckbox> */}
        <br />
        <Button
          dxSize="md"
          dxVariant="contained"
          dxColor="secondary"
          style={{ justifyContent: "center" }}
          type="submit"
          disabled={navigation.state !== "idle"}
        >
          {navigation.state !== "idle" ? "Loading..." : "Sign in"}
        </Button>
      </InputGroup>
    </Form>
  );
}
