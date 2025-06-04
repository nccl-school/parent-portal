import { useCallback, useMemo, type ReactNode } from "react";
import { css } from "@linaria/core";
import { makeReset } from "@nccl/theme";

import type { InputComboboxOption } from "./input-combobox.utils.js";

const styles = css`
  button {
    ${makeReset("button")};
    width: 100%;
    cursor: pointer;
  }
`;

export type InputInputComboboxListItemProps<O extends InputComboboxOption> = {
  option: O;
  onSelect: (option: O) => void;
  children: ReactNode;
};

export function InputComboboxListItem<O extends InputComboboxOption>({
  onSelect,
  option,
  children,
}: InputInputComboboxListItemProps<O>) {
  const handleSelect = useCallback(() => onSelect(option), [onSelect, option]);

  return useMemo(
    () => (
      <li className={styles}>
        <button onClick={handleSelect} type="button">
          {children}
        </button>
      </li>
    ),
    [children, handleSelect]
  );
}
