import {
  Button,
  DescriptionList,
  DescriptionListData,
  DescriptionListTag,
  Icon,
  InputGroup,
  InputPassword,
  InputText,
} from "@nccl/components";
import { makeColor, makeRem } from "@nccl/theme";
import { Fragment, useState } from "react";
import type { AcceptInviteRequest } from "@nccl/api/client";
import { passwordRules } from "@nccl/api/client";
import { css } from "@linaria/core";
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router";

import { getValidationErrors } from "../../utils/client";
import { PageHeader } from "../../components/page";

const styles = css`
  padding: ${makeRem(16)};
  border-radius: ${makeRem(8)};
  gap: ${makeRem(4)};
  border: 1px solid ${makeColor("light-500")};

  dt {
    & > div {
      display: grid;
      place-content: center;
      height: 100%;
      width: 100%;
    }
  }

  dd {
    margin-left: ${makeRem(16)};
  }
`;

export function AuthAcceptInviteValid({ email }: { email: string }) {
  const [password, setPassword] = useState("");
  const [urlSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const data = useActionData();
  const errors = getValidationErrors<AcceptInviteRequest>(data);

  return (
    <Form method="post">
      <PageHeader
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: makeRem(32),
        }}
        dxTitle="Create your account"
        dxSubtitle="Enter your credentials to access your account"
      />
      <InputGroup>
        <input
          type="hidden"
          name="token"
          value={String(urlSearchParams.get("token"))}
        />
        <input type="hidden" name="email" value={email} />
        <InputText
          name="email"
          dxLabel="Email address"
          disabled
          value={email}
        />
        <InputGroup dxLayout="inline-stretch">
          <InputText
            name="firstName"
            dxLabel="First name"
            dxError={errors?.firstName?.[0]}
          />
          <InputText
            name="lastName"
            dxLabel="Last name"
            dxError={errors?.lastName?.[0]}
          />
        </InputGroup>
        <InputPassword
          name="password"
          dxLabel="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          dxError={
            errors?.password?.[0]
              ? "Please ensure all of the requirements are checked."
              : undefined
          }
          autoComplete="current-password"
        />
        <DescriptionList className={styles}>
          {passwordRules.map((rule) => {
            const passed = rule.test(password);
            return (
              <Fragment key={rule.label}>
                <DescriptionListTag key="label">
                  <div>
                    <Icon
                      dxIcon={
                        passed
                          ? "checkmark-circle-02-solid-standard"
                          : "cancel-01-stroke-standard"
                      }
                      dxColor={passed ? "success" : "danger"}
                    />
                  </div>
                </DescriptionListTag>
                <DescriptionListData>{rule.label}</DescriptionListData>
              </Fragment>
            );
          })}
        </DescriptionList>
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
          {navigation.state !== "idle" ? "Loading..." : "Create Account"}
        </Button>
      </InputGroup>
    </Form>
  );
}
