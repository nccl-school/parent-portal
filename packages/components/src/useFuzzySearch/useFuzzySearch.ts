import type { ChangeEventHandler } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type Fuse from "fuse.js";

type UseFuseLazyMode = "controlled" | "uncontrolled";

type FuseLazyOptions<T> = {
  mode: UseFuseLazyMode;
  data: T[];
  keys?: string[];
  threshold?: number;
  onSearch?: (term: string) => Promise<T[]>;
  debounceMs?: number;
};

export function useFuzzySearch<T extends Record<string, unknown>>({
  mode,
  data,
  keys = [],
  threshold = 0.3,
  onSearch,
  debounceMs = 200,
}: FuseLazyOptions<T>) {
  const fuseRef = useRef<InstanceType<typeof Fuse> | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const latestTermRef = useRef<string>("");
  const [results, setResults] = useState<T[]>(data);

  /**
   * Dynamically load fuse either on a mouse over or
   * when something opens to ensure that that fuse isn't
   * wrapped into the main bundle
   */
  const loadFuse = useCallback(async () => {
    if (mode === "uncontrolled" && !fuseRef.current) {
      const { default: FuseLib } = await import("fuse.js");
      fuseRef.current = new FuseLib(data, { keys, threshold });
    }
  }, [data, keys, threshold, mode]);

  /**
   * Handler for fuzzy searching
   */
  const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ currentTarget: { value: term } }) => {
      latestTermRef.current = term;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(async () => {
        if (!term) {
          setResults(data);
          return;
        }

        if (mode === "controlled" && onSearch) {
          const res = await onSearch(term);
          if (latestTermRef.current === term) setResults(res);
          return;
        }

        if (fuseRef.current) {
          const res = fuseRef.current.search<T>(term).map((r) => r.item);
          if (latestTermRef.current === term) setResults(res);
          return;
        }

        // fallback search
        const lower = term.toLowerCase();
        const res = data.filter((item) =>
          Object.values(item).some((val) =>
            typeof val === "string" || typeof val === "number"
              ? String(val).toLowerCase().includes(lower)
              : false
          )
        );
        if (latestTermRef.current === term) setResults(res);
      }, debounceMs);
    },
    [data, mode, onSearch, debounceMs]
  );

  /**
   * Clean up the dangling timeout if it exists when the
   * hook is done unmounting
   */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    results,
    handleSearch,
    loadFuse,
  };
}
