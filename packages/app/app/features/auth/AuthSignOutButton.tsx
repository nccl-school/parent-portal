import { css } from "@linaria/core";
import { makeReset } from "@nccl/theme";
import type { MouseEvent, ReactNode } from "react";
import { href, useSubmit } from "react-router";

const styles = css`
  ${makeReset("button")}
`;

export function AuthSignOutButton({
  redirectUrl = "/sign-in",
  children,
}: {
  redirectUrl?: string;
  children: ReactNode;
}) {
  const submit = useSubmit();

  async function handleClick(_e: MouseEvent<HTMLButtonElement>) {
    try {
      await submit(
        { redirectUrl },
        {
          method: "POST",
          navigate: false,
          encType: "application/json",
          action: href("/api/auth/sign-out"),
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button className={styles} onClick={handleClick}>
      {children}
    </button>
  );
}
