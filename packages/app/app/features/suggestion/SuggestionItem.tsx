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
  grid-template-columns: auto 1fr repeat(3, auto);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-radius: ${makeRem(8)};
  margin-bottom: ${makeRem(4)};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: ${makeRem(24)} ${makeRem(8)};

  & .sg-copy {
    overflow: hidden;
    padding-right: ${makeRem(24)};
  }

  & .sg-count {
    height: 100%;
    aspect-ratio: 1.5 / 1;
    display: grid;
    place-content: center;
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

  & .sg-item {
    ${makeReset("button")};
    height: 100%;
    aspect-ratio: 1 / 1;
    border-left: 1px solid ${makeColor("neutral-light-100")};
    display: grid;
    place-content: center;

    &.cm {
      aspect-ratio: 2 / 1;
      display: flex;
      align-items: center;
      gap: ${makeRem(8)};
      color: ${makeColor("neutral-dark-200")} !important;
    }
  }
`;

export function SuggestionItem({
  title,
  description,
  voteCount,
}: SuggestionItemProps) {
  return (
    <div className={styles}>
      <div className="sg-count">
        <Typography dxVariant="heading3" dxNode="div">
          {voteCount}
        </Typography>
      </div>
      <div className="sg-copy">
        <Typography dxNode="div" dxVariant="body1" className="sg-title">
          {title}
        </Typography>
        <Typography dxNode="div" dxVariant="body2" className="sg-description">
          {description}
        </Typography>
      </div>
      <button className="sg-item">
        <Icon
          dxIcon="arrow-up-01-solid-standard"
          dxSize={24}
          dxColor="neutral-light-500"
        />
      </button>
      <button className="sg-item">
        <Icon
          dxIcon="arrow-down-01-solid-standard"
          dxSize={24}
          dxColor="neutral-light-500"
        />
      </button>
      <button className={classes("sg-item", "cm")}>
        <Icon dxIcon="comment-01-stroke-standard" dxSize={18} />
        <Typography dxNode="div" dxVariant="label">
          1
        </Typography>
      </button>
    </div>
  );
}
