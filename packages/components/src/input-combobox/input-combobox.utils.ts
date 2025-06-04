import type { ReactNode } from "react";

export type InputComboboxOption = {
  value: string;
  id: string | number;
  label: string;
};

export type InputComboboxComponent<O extends InputComboboxOption> = (
  props: O
) => ReactNode;
