import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeReset, makeRem, makeColor } from "@nccl/theme";
import { Form, href } from "react-router";

import { AccountNav } from "./AccountNav";

import { CLASSES, createRouteHandle } from "../../utils/isomorphic";

export const handle = createRouteHandle({
  mobileTitle: "Account",
});

const stylesButton = css`
  ${makeReset("button")};
  height: ${makeRem(60)};
  display: grid;
  place-content: center;
  width: 100%;
  margin-top: ${makeRem(36)};
  background: ${makeColor("white", { opacity: 0.8 })};
  border-radius: ${makeRem(16)};
  color: ${makeColor("secondary-1200")};
  text-decoration: underline;
`;

export default function AccountIndex() {
  return (
    <>
      <AccountNav />
      <Form
        action={href("/api/auth/sign-out")}
        method="POST"
        className={CLASSES.mobileOnly}
      >
        <button className={stylesButton}>
          <Typography dxNode="div" dxVariant="heading5">
            Sign out
          </Typography>
        </button>
      </Form>
    </>
  );
}
