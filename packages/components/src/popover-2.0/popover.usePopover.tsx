import { useRef, useEffect } from "react";

import type { PopoverOptions } from "./PopoverEngine.js";
import { PopoverEngine } from "./PopoverEngine.js";

export function usePopover(options?: Partial<PopoverOptions>) {
  const ref = useRef<PopoverEngine>(
    new PopoverEngine({
      ...options,
      offset: options?.offset ?? 8,
      type: "manual",
    })
  );

  useEffect(() => {
    const engine = ref.current;
    return () => {
      engine.destroy();
    };
  }, []);

  return ref.current;
}
