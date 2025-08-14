import { useRef, useEffect } from "react";

import type { TooltipOptions } from "./TooltipEngine.js";
import { TooltipEngine } from "./TooltipEngine.js";

export function useTooltip(options?: Partial<TooltipOptions>) {
  const ref = useRef<TooltipEngine>(
    new TooltipEngine({
      ...options,
      offset: options?.offset ?? 8,
    })
  );

  useEffect(() => {
    const engine = ref.current;
    return () => {
      engine.destroy();
    };
  });

  return ref.current;
}
