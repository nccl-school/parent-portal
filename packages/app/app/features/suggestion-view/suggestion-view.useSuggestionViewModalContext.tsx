import { useModalContext } from "@nccl/components";

export function useSuggestionViewModalContext() {
  return useModalContext<{ suggestion_id: string }>();
}
