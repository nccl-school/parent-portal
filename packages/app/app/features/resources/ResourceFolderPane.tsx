import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeRem, makeColor } from "@nccl/theme";
import type { ReactNode } from "react";

const styles = css`
  padding: 0 ${makeRem(24)};
  overflow: auto;
  border-right: 1px solid ${makeColor("neutral-light-100")};

  header {
    padding: ${makeRem(32)} 0;
  }

  nav {
    padding-bottom: ${makeRem(32)} 0;
  }
`;

export function ResourceFolderPane({ children }: { children: ReactNode }) {
  return (
    <article className={styles}>
      <header>
        <Typography dxNode="div" dxVariant="heading4">
          Folders
        </Typography>
      </header>
      <nav>{children}</nav>
    </article>
  );
}
