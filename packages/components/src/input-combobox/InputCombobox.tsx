import type { RefCallback, RefObject } from "react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import { makePx, makeRem, makeReset } from "@nccl/theme";

import type {
  InputComboboxOption,
  InputComboboxComponent,
} from "./input-combobox.utils.js";
import type { InputInputComboboxListItemProps } from "./InputComboboxListItem.js";
import { InputComboboxListItem } from "./InputComboboxListItem.js";

import {
  getInputStyles,
  type InputTextPropsCustom,
} from "../input-text/InputText.js";
import { InputContainer } from "../InputContainer/InputContainer.js";
import { Icon } from "../icons/Icon.js";
import { usePopover } from "../popover/popover.usePopover.js";
import { Popover } from "../popover/Popover.js";
import { InputSearch } from "../input-search/InputSearch.js";
import { useFuzzySearch } from "../useFuzzySearch/useFuzzySearch.js";
import type { ObjectDotNotation } from "../types/index.js";

export type InputComboboxProps<O extends InputComboboxOption> = Omit<
  InputTextPropsCustom,
  "dxInputId"
> & {
  name: string;
  ref?: RefObject<HTMLInputElement>;
  dxOptions: O[];
  dxPlaceholder: string;
  DXListComponent: InputComboboxComponent<O>;
  dxSearchKeys: ObjectDotNotation<O>[];
  /**
   * Add this if you wish to tie searching directly to an API
   * and don't have all of the search results up front. This is
   * good for lists over 1_000 items.
   *
   * Default functionality is for this component to manage itself
   * with a pre-defined / pre-loaded list of options.
   */
  dxOnSearch?: (searchTerm: string) => Promise<O[]>;
};

function AdornmentEnd() {
  return <Icon dxIcon="arrow-down-01-stroke-standard" dxSize={20} />;
}

const styles = css`
  text-align: left;
`;

const listStyles = css`
  ${makeReset("ul")};
  width: 100%;
  margin-top: ${makeRem(8)};
  max-height: ${makeRem(200)};
  overflow-y: auto;
`;

const popoverStyles = css`
  margin-top: ${makeRem(4)} !important;
`;

export function InputCombobox<O extends InputComboboxOption>({
  children,
  DXListComponent,
  dxPlaceholder,
  dxOptions,
  dxSearchKeys,
  dxOnSearch,
  name,
  ref,
  ...restProps
}: InputComboboxProps<O>) {
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputSearchRef = useRef<HTMLInputElement | null>(null);
  const { loadFuse, handleSearch, results } = useFuzzySearch({
    mode: typeof dxOnSearch !== "undefined" ? "controlled" : "uncontrolled",
    data: dxOptions,
    onSearch: dxOnSearch,
    keys: dxSearchKeys,
  });
  const {
    setPopover,
    setPopoverTarget,
    show: showPopover,
    hide: hidePopover,
  } = usePopover({ position: "bottom-span-right" });
  const [selectedOption, setSelectedOption] = useState<O | undefined>(
    undefined
  );
  /**
   * Opens the popover and also sets the focus to the search
   * input right away
   */
  const handleOpenPopover = useCallback(() => {
    loadFuse();
    showPopover();
    inputSearchRef.current?.focus();
  }, [loadFuse, showPopover]);

  /**
   * A onSelect handler that is passed to the list item
   * to handle what happens when a list item is selected
   */
  const onSelect = useCallback<InputInputComboboxListItemProps<O>["onSelect"]>(
    (option) => {
      setSelectedOption(option);
      hidePopover();
    },
    [hidePopover]
  );

  /**
   * Initialize the popover and an internal reference of the target
   * when the button mounts on the screen
   */
  const onButtonMount = useCallback<RefCallback<HTMLButtonElement>>(
    (node) => {
      if (!node) return;
      setPopoverTarget(node);
      buttonRef.current = node;
    },
    [setPopoverTarget]
  );

  /**
   * Set the content of the popover to the width
   * of the button launcher
   */
  useEffect(() => {
    if (!containerRef.current || !ulRef.current) return;
    console.log(containerRef.current.clientWidth);
    ulRef.current.style.width = makePx(containerRef.current.clientWidth - 16);
  }, []);

  return (
    <>
      <input
        ref={ref}
        type="hidden"
        name={name}
        value={selectedOption?.value}
      />
      {useMemo(
        () => (
          <>
            <InputContainer
              DXAdornmentEnd={AdornmentEnd}
              {...restProps}
              dxInputId={id}
              ref={containerRef}
            >
              <button
                ref={onButtonMount}
                onClick={handleOpenPopover}
                className={classes(getInputStyles(restProps), styles)}
                type="button"
              >
                {selectedOption ? selectedOption.label : dxPlaceholder}
              </button>
            </InputContainer>
          </>
        ),
        [
          dxPlaceholder,
          id,
          onButtonMount,
          restProps,
          selectedOption,
          handleOpenPopover,
        ]
      )}
      <Popover ref={setPopover} className={popoverStyles}>
        <div>
          {useMemo(
            () => (
              <InputSearch
                dxSize="md"
                ref={inputSearchRef}
                onChange={handleSearch}
              />
            ),
            [handleSearch]
          )}
          <ul className={listStyles} ref={ulRef}>
            {results.map((option) => (
              <InputComboboxListItem
                key={option.id}
                option={option}
                onSelect={onSelect}
              >
                <DXListComponent {...option} />
              </InputComboboxListItem>
            ))}
          </ul>
        </div>
      </Popover>
    </>
  );
}
