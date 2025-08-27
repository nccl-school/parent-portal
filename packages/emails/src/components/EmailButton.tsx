import { Button } from "@react-email/components";
import { colorAndVariants } from "@nccl/theme";

import { font } from "../utils/util.font.js";

export function EmailButton({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <Button
      href={href}
      style={{
        ...font.body,
        background: colorAndVariants["secondary-1000"],
        color: "#fff",
        padding: "1rem 1.25rem",
        borderRadius: ".5rem",
      }}
    >
      {children}
    </Button>
  );
}
