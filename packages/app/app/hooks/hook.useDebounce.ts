import { useCallback, useMemo, useRef } from "react";

export function useDebounce() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const debounce = useCallback<(fn: () => void, timeout: number) => void>(
    (fn, timeout) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fn();
      }, timeout ?? 300);
    },
    []
  );

  return useMemo(() => ({ debounce }), [debounce]);
}
