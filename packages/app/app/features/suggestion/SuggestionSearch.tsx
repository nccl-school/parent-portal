import { css } from "@linaria/core";
import { InputSearch, type InputSearchPropsNative } from "@nccl/components";
import { makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import { forwardRef } from "react";

export type SuggestionSearchPropsNative = InputSearchPropsNative;
export type SuggestionSearchProps = SuggestionSearchPropsNative;

const styles = css`
  width: 60ch;
  margin: 0 auto;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  gap: ${makeRem(16)};

  & > *:first-child {
    flex: 1;
  }

  input {
    background: rgba(255, 255, 255, 0.5) !important;
  }
`;

export const SuggestionSearch = forwardRef<
  HTMLInputElement,
  SuggestionSearchProps
>(function SuggestionSearch({ children, className, ...restProps }, ref) {
  return (
    <div className={styles}>
      <InputSearch
        {...restProps}
        className={classes(className)}
        ref={ref}
        placeholder="Search ideas"
      >
        {children}
      </InputSearch>
    </div>
  );
});
