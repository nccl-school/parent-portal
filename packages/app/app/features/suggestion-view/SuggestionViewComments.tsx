import { InputTextarea } from "@nccl/components";

export function SuggestionViewComments() {
  return (
    <div>
      <InputTextarea
        rows={3}
        dxVariant="transparent"
        style={{ background: "#fff" }}
      />
    </div>
  );
}
