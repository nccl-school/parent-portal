import { useRef } from "react";

import type { PopoverOptions } from "../_core/popover/index.js";
import { PopoverEngine } from "../_core/popover/index.js";

export function usePopover(options?: Partial<PopoverOptions>) {
  const ref = useRef<PopoverEngine>(new PopoverEngine(options));
  return ref.current;
}
