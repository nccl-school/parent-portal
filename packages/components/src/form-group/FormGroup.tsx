import { css } from "@linaria/core";
import { makeColor, makeFontWeight, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

import { Typography } from "../typography/Typography.js";

export type FormGroupPropsNative = JSX.IntrinsicElements["fieldset"];
export type FormGroupPropsCustom = {
  /**
   * A title of the group
   */
  dxTitle?: string;
  /**
   * A description of what the group can do
   */
  dxSubtitle?: string;
};
export type FormGroupProps = FormGroupPropsNative & FormGroupPropsCustom;

const styles = css`
  padding: 0;
  margin: 0;
  border: 0;
  padding-bottom: ${makeRem(44)};

  &:not(:last-child) {
    border-bottom: 1px solid ${makeColor("neutral-light-100")};
    margin-bottom: ${makeRem(32)};
  }

  & > legend {
    display: block;
    margin-bottom: ${makeRem(12)};

    & > .title {
      font-weight: ${makeFontWeight("body-semiBold")};
      font-size: ${makeRem(20)};
    }
    & > .subtitle {
      margin-top: ${makeRem(4)};
      color: ${makeColor("neutral-light-1100")};
      font-size: ${makeRem(16)};
      line-height: 1.3;
    }
  }

  & > div {
    margin-top: ${makeRem(8)};
  }
`;

export const FormGroup = forwardRef<HTMLFieldSetElement, FormGroupProps>(
  function FormGroup(
    { children, className, dxTitle, dxSubtitle, ...restProps },
    ref
  ) {
    return (
      <fieldset {...restProps} className={classes(className, styles)} ref={ref}>
        {dxTitle || dxSubtitle ? (
          <legend>
            {dxTitle && (
              <Typography dxNode="div" dxVariant="body1" className="title">
                {dxTitle}
              </Typography>
            )}
            {dxSubtitle && (
              <Typography dxNode="div" dxVariant="body3" className="subtitle">
                {dxSubtitle}
              </Typography>
            )}
          </legend>
        ) : null}
        <div>{children}</div>
      </fieldset>
    );
  }
);
