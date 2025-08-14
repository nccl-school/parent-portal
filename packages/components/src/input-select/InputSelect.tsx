import { useId, useMemo, type JSX } from "react";
import { classes } from "@stratum-ui/core/utils";

import {
  getInputStyles,
  type InputTextPropsCustom,
} from "../input-text/InputText.js";
import { InputContainer } from "../InputContainer/InputContainer.js";
import { Icon } from "../icons/Icon.js";

export type InputSelectProps = JSX.IntrinsicElements["select"] &
  Omit<InputTextPropsCustom, "DXAdornmentEnd" | "DXAdornmentStart">;

function InputSelectAdornment() {
  return (
    <Icon
      dxIcon="arrow-down-01-stroke-standard"
      dxSize={16}
      dxColor="primary"
    />
  );
}

export function InputSelect({
  children,
  className,
  dxError,
  dxHint,
  dxLabel,
  dxSize,
  dxVariant,
  id,
  ...restProps
}: InputSelectProps) {
  const autoId = useId();
  const inputId = useMemo(() => id ?? autoId, [autoId, id]);

  return (
    <InputContainer
      dxLabel={dxLabel}
      dxHint={dxHint}
      dxSize={dxSize}
      dxError={dxError}
      dxInputId={inputId}
      DXAdornmentEnd={InputSelectAdornment}
    >
      <select
        {...restProps}
        id={inputId}
        className={classes(getInputStyles({ className, dxError, dxVariant }))}
      >
        {children}
      </select>
    </InputContainer>
  );
}
