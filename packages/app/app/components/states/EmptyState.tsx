import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { ReactNode } from "react";

const styles = css`
  padding: ${makeRem(32)};
  background: #fff;
  place-content: center;
  gap: ${makeRem(16)};
  max-width: 100ch;
  border-radius: ${makeRem(16)};

  text-align: center;
  margin: 0 auto;

  &:not(.no-border) {
    border: 1px solid ${makeColor("neutral-light-200")};
  }

  img {
    width: var(--img-size);
    aspect-ratio: 1 / 1;
  }

  & > .es-title {
    margin-top: ${makeRem(16)};
    margin-bottom: ${makeRem(4)};
  }
  & > .es-desc {
    max-width: 60ch;
    margin: 0 auto;
  }
`;

export function EmptyState(props: {
  imgSrc: string;
  imgAlt: string;
  title: string;
  children: ReactNode;
  className?: string;
  borderless?: boolean;
  imgSize?: number;
}) {
  return (
    <div
      className={classes(styles, props.className, {
        "no-border": props.borderless,
      })}
      style={{
        // @ts-expect-error Custom CSS Properties are valid
        "--img-size": makeRem(props.imgSize ?? 100),
      }}
    >
      <img src={props.imgSrc} alt={props.imgAlt} />
      <Typography dxVariant="heading4" dxNode="div" className="es-title">
        {props.title}
      </Typography>
      <Typography dxVariant="body2" dxNode="div" className="es-desc">
        {props.children}
      </Typography>
    </div>
  );
}
