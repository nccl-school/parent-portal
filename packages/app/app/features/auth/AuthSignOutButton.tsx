import type { MouseEvent, ReactNode } from "react";
import { useSubmit } from "react-router";

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
        { method: "POST", encType: "application/json" }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return <button onClick={handleClick}>{children}</button>;
}
