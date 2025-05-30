import type { JSX } from "react";
import { forwardRef } from "react";
import { clsx } from "clsx";

import { Input, Input } from "../../input/Input.js";

export type InputSearchPropsNative = Omit<
  JSX.IntrinsicElements["input"],
  "type"
>;
export type InputSearchPropsCustom = {};
export type InputSearchProps = InputSearchPropsNative & InputSearchPropsCustom;

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  function InputSearch({ children, className, ...restProps }, ref) {
    return (
      <Input {...restProps} className={clsx(className)} ref={ref}>
        {children}
      </Input>
    );
  }
);
