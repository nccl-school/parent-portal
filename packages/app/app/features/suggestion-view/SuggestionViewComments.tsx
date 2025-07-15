import { css } from "@linaria/core";
import { ModalBody } from "@nccl/components";
import { makeColor } from "@nccl/theme";
import type { ReactNode } from "react";

const styles = css`
  display: grid;
  grid-template-rows: auto auto 1fr;
  border-top: 1px solid ${makeColor("neutral-light-100")};
`;

export function SuggestionViewComments({ children }: { children: ReactNode }) {
  return <ModalBody className={styles}>{children}</ModalBody>;
}
