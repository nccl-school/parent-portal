import { css } from "@linaria/core";
import { Icon, Typography } from "@nccl/components";
import { makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import { forwardRef, type JSX } from "react";

export type UnauthorizedPropsNative = Omit<
  JSX.IntrinsicElements["div"],
  "children"
>;
export type UnauthorizedPropsCustom = {
  dxMessage?: string;
};
export type UnauthorizedProps = UnauthorizedPropsNative &
  UnauthorizedPropsCustom;

const styles = css`
  height: ${makeRem(600)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 60ch;
  margin: 0 auto;

  .heading1 {
    margin: ${makeRem(8)};
  }
`;

export const Unauthorized = forwardRef<HTMLDivElement, UnauthorizedProps>(
  function Unauthorized({ className, ...restProps }, ref) {
    return (
      <div {...restProps} className={classes(className, styles)} ref={ref}>
        <Icon
          dxIcon="square-lock-02-stroke-standard"
          dxSize={80}
          dxColor="danger-900"
        />
        <Typography dxVariant="heading1" dxNode="h3">
          Unauthorized
        </Typography>
        <Typography dxVariant="body1" dxNode="div">
          It appears you don't have access to this page. If this is an error,
          please contact the office.
        </Typography>
      </div>
    );
  }
);
