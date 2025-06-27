import { css } from "@linaria/core";
import { Icon, Typography } from "@nccl/components";
import { makeColor, makeFontWeight, makeRem, makeReset } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";

export type SuggestionItemProps = {
  title: string;
  description: string;
  voteCount: number;
  // comments: number;
};

const styles = css`
  display: grid;
  grid-template-columns: 1fr auto auto;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-radius: ${makeRem(8)};
  margin-bottom: ${makeRem(4)};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: ${makeRem(16)} ${makeRem(8)};

  & .sg-copy {
    overflow: hidden;
    padding-left: ${makeRem(8)};
    padding-right: ${makeRem(16)};
  }

  & .sg-title {
    font-weight: ${makeFontWeight("body-semiBold")};
    margin-bottom: ${makeRem(4)};
    line-height: 1;
  }
  & .sg-description {
    color: ${makeColor("neutral-light-800")};
    font-size: ${makeRem(14)};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  button {
    ${makeReset("button")};
  }

  & .sg-item {
    height: 100%;
    border-left: 1px solid ${makeColor("neutral-light-100")};

    &.cm {
      display: flex;
      align-items: center;
      gap: ${makeRem(8)};
      color: ${makeColor("neutral-dark-200")} !important;
      padding: 0 ${makeRem(16)};
    }
  }
`;

const voterStyles = css`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  padding: 0 ${makeRem(16)};
  gap: ${makeRem(8)};

  button {
    ${makeReset("button")};
    height: 100%;
    display: grid;
    place-content: center;
  }
`;

export function SuggestionItem({
  title,
  description,
  voteCount,
}: SuggestionItemProps) {
  return (
    <div className={styles}>
      <div className="sg-copy">
        <Typography dxNode="div" dxVariant="body1" className="sg-title">
          {title}
        </Typography>
        <Typography dxNode="div" dxVariant="body2" className="sg-description">
          {description}
        </Typography>
      </div>
      <div className={classes(voterStyles, "sg-item")}>
        <button>
          <Icon
            dxIcon="arrow-up-01-solid-standard"
            dxSize={24}
            dxColor="neutral-light-500"
          />
        </button>
        <Typography dxVariant="body2" dxNode="div">
          {voteCount}
        </Typography>
        <button>
          <Icon
            dxIcon="arrow-down-01-solid-standard"
            dxSize={24}
            dxColor="neutral-light-500"
          />
        </button>
      </div>
      <button className={classes("sg-item", "cm")}>
        <Icon dxIcon="comment-01-stroke-standard" dxSize={18} />
        <Typography dxNode="div" dxVariant="label">
          1
        </Typography>
      </button>
    </div>
  );
}
