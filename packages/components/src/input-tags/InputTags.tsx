import {
  type ClipboardEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { css } from "@linaria/core";
import { makeRem, makeReset } from "@nccl/theme";

import { InputTagPill } from "./InputTagPill.js";

import { InputContainer } from "../InputContainer/InputContainer.js";
import type { PickNativeProps } from "../types/index.js";
import type { InputTextPropsCustom } from "../input-text/InputText.js";
import { getInputStyles } from "../input-text/InputText.js";

export type InputTagsPropsNative = PickNativeProps<"input", "ref">;
export type InputTagsPropsCustom = Pick<
  InputTextPropsCustom,
  "dxLabel" | "dxHint" | "dxError" | "dxSize" | "dxVariant"
> & {
  name: string;
  dxInitialTags?: string[];
};
export type InputTagsProps = InputTagsPropsNative & InputTagsPropsCustom;

const styles = css`
  max-width: 80ch;
  width: 100%;

  .tags {
    display: flex;
    padding-top: ${makeRem(16)};
    padding-bottom: ${makeRem(16)};
    gap: ${makeRem(8)};
    flex-wrap: wrap;
  }
`;
const inputStyles = css`
  ${makeReset("input")}
  width: 100%;
`;

export function InputTags({
  ref,
  dxError,
  dxHint,
  dxLabel,
  dxSize,
  dxVariant,
  dxInitialTags = [],
  name,
}: InputTagsProps) {
  const id = useId();
  const entryInputRef = useRef<HTMLInputElement | null>(null);
  const [tags, setTags] = useState<Set<string>>(new Set(dxInitialTags));

  const removeTag = useCallback<(tagId: string) => void>((id) => {
    setTags((prevTagSet) => {
      const nextSet = new Set(Array.from(prevTagSet));
      nextSet.delete(id);
      return nextSet;
    });
  }, []);

  const handleRemoveTag = useCallback<MouseEventHandler<HTMLButtonElement>>(
    ({ currentTarget: { id } }) => {
      removeTag(id);
    },
    [removeTag]
  );

  const addTags = useCallback<(value: string | string[]) => void>(
    (tagOrTags) => {
      const tags = Array.isArray(tagOrTags) ? tagOrTags : [tagOrTags];
      setTags((prevTagsSet) => {
        return new Set([...Array.from(prevTagsSet), ...tags]);
      });
    },
    []
  );

  const clearEntryInput = useCallback(() => {
    if (!entryInputRef.current) return;
    entryInputRef.current.value = "";
  }, []);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      const { value } = e.currentTarget;
      switch (e.key) {
        case "":
        case "Enter":
        case "Tab": {
          if (value === "") return;
          addTags(value);
          e.preventDefault();
          clearEntryInput();
          break;
        }

        case "Backspace":
          if (value !== "") return;
          setTags((prevTagSet) => {
            const prevTags = [...prevTagSet.values()];
            prevTags.pop();
            return new Set(prevTags);
          });
          break;

        default:
          break;
      }
    },
    [addTags, clearEntryInput]
  );

  const handlePaste = useCallback<ClipboardEventHandler<HTMLInputElement>>(
    (e) => {
      const pasted = e.clipboardData.getData("text");
      if (!pasted.includes(",")) return;

      e.preventDefault();
      addTags(pasted.split(","));
      clearEntryInput();
    },
    [addTags, clearEntryInput]
  );

  return (
    <div className={styles}>
      <input
        type="hidden"
        name={name}
        ref={ref}
        value={Array.from(tags).join(",")}
      />
      <InputContainer
        dxInputId={id}
        className={styles}
        dxError={dxError}
        dxHint={dxHint}
        dxLabel={dxLabel}
        dxSize={dxSize}
      >
        <div
          className={getInputStyles({ dxError, dxVariant, className: "tags" })}
        >
          {Array.from(tags).map((tag) => (
            <InputTagPill onClick={handleRemoveTag}>{tag}</InputTagPill>
          ))}
          <input
            ref={entryInputRef}
            id={id}
            type="text"
            className={inputStyles}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
          />
        </div>
      </InputContainer>
    </div>
  );
}
