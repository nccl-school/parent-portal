import type { Meta } from "@storybook/react";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";

import { useTooltip } from "./tooltip.useTooltip.js";
import { Tooltip } from "./Tooltip.js";

const meta: Meta = {
  title: "Tooltip",
  parameters: {
    layout: "centered",
  },
};

export default meta;

const styles = css`
  display: flex;
  gap: ${makeRem(16)};
`;

export const WithHook = () => {
  const tooltip1 = useTooltip({ position: "bottom", type: "clarification" });
  const tooltip2 = useTooltip({ position: "bottom" });

  return (
    <div className={styles}>
      <div>
        <button ref={tooltip1.setTarget}>Hover for tooltip1</button>
        <Tooltip ref={tooltip1.setTooltip}>
          Hello there this is a super amazing tooltip1
        </Tooltip>
      </div>
      <div>
        <button ref={tooltip2.setTarget}>Hover for tooltip2</button>
        <Tooltip ref={tooltip2.setTooltip}>
          Hello there this is a super amazing tooltip2
        </Tooltip>
      </div>
    </div>
  );
};
