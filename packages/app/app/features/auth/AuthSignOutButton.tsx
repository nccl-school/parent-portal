import { css } from "@linaria/core";
import { makeReset } from "@nccl/theme";
import type { ReactNode } from "react";
import { Form, href } from "react-router";

const styles = css`
  ${makeReset("button")}
`;

export function AuthSignOutButton({ children }: { children: ReactNode }) {
  return (
    <Form action={href("/api/auth/sign-out")} method="POST">
      <button className={styles} type="submit">
        {children}
      </button>
    </Form>
  );
}
