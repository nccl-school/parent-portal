import { css } from "@linaria/core";
import { InputSearch } from "@nccl/components";
import { makeRem, makeColor, makeResponsive, makeCustom } from "@nccl/theme";

const stylesSearch = css`
  grid-area: search;
  position: sticky;
  top: 0;

  ${makeResponsive({ to: "laptop" })} {
    padding: 0 ${makeCustom("page--gutter-mobile")};
    margin-bottom: ${makeCustom("page--gutter-mobile")};
  }

  ${makeResponsive({ from: "laptop" })} {
    padding: ${makeRem(32)};
    background: ${makeColor("white")};
  }
`;

export function ResourceMainSearch() {
  return (
    <form className={stylesSearch}>
      <InputSearch dxSize="lg" dxVariant="contrasted" placeholder="Search" />
    </form>
  );
}
