import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeCustom, makeRem, makeResponsive } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { ReactNode } from "react";

const styles = css`
  place-content: center;
  gap: ${makeRem(16)};
  max-width: 100ch;
  height: 100%;
  width: 100%;
  display: grid;
  place-content: center;

  text-align: center;
  margin: 0 auto;

  ${makeResponsive({ to: "laptop" })} {
    padding: ${makeRem(32)} ${makeCustom("page--gutter-mobile")};
  }

  img {
    width: ${makeRem(100)};
    aspect-ratio: 1 / 1;
  }

  .es-title {
    margin-top: ${makeRem(16)};
    margin-bottom: ${makeRem(4)};
  }
  .es-desc {
    max-width: 60ch;
    margin: 0 auto;
  }
`;

export function ErrorState(props: {
  title: string;
  children: ReactNode;
  className?: string;
  imgSize?: number;
}) {
  return (
    <div className={classes(styles, props.className)}>
      <div>
        <img src="/images/image-icon-error.png" alt="error" />
        <Typography dxVariant="heading4" dxNode="div" className="es-title">
          {props.title}
        </Typography>
        <Typography dxVariant="body2" dxNode="div" className="es-desc">
          {props.children}
        </Typography>
      </div>
    </div>
  );
}
