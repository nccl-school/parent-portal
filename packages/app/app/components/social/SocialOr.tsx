import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeRem, makeResponsive, makeColor } from "@nccl/theme";

const styles = css`
  height: ${makeRem(48)};
  display: grid;
  place-content: center;
  position: relative;
  line-height: ${makeRem(48)};

  ${makeResponsive({ from: "laptop" })} {
    margin-bottom: ${makeRem(16)};
  }

  & > div {
    padding: 0 ${makeRem(16)};
    background: ${makeColor("white")};
    z-index: 10;
    color: ${makeColor("neutral-dark-200")};
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    height: 1px;
    background-color: ${makeColor("light-500")};
    width: 100%;
  }
`;

export function SocialOr() {
  return (
    <Typography dxVariant="body3" dxNode="div" className={styles}>
      <div>or continue with</div>
    </Typography>
  );
}
