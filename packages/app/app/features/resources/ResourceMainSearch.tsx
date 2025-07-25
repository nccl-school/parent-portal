import { css } from "@linaria/core";
import { InputSearch } from "@nccl/components";
import { makeRem, makeColor } from "@nccl/theme";

const stylesSearch = css`
  grid-area: search;
  padding: ${makeRem(32)};
  background: ${makeColor("white")};
  position: sticky;
  top: 0;
`;

export function ResourceMainSearch() {
  return (
    <form className={stylesSearch}>
      <InputSearch dxSize="lg" dxVariant="contrasted" placeholder="Search" />
    </form>
  );
}
