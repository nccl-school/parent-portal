import type { Meta } from "@storybook/react";
import { css } from "@linaria/core";
import { useState } from "react";
import { makeResponsive } from "@nccl/theme";

import type { ActionCardProps } from "./ActionCard.js";
import { ActionCard } from "./ActionCard.js";

import { InputText } from "../input-text/InputText.js";

const meta: Meta = {
  title: "ActionCard",
  component: ActionCard,
};

export default meta;

const options: Pick<
  ActionCardProps,
  "dxImgSrc" | "dxTitle" | "dxDescription"
>[] = [
  {
    dxTitle: "Log your hours",
    dxDescription: "Add time entires to fulfill your family commitment",
    dxImgSrc: "/images/image-icon-time-card.png",
  },
  {
    dxTitle: "FAQs",
    dxDescription: "Get some common answers to some common questions",
    dxImgSrc: "/images/image-icon-question-mark.png",
  },
  {
    dxTitle: "Planned Features",
    dxDescription: "View the planned features for the app",
    dxImgSrc: "/images/image-icon-todo-list.png",
  },
  {
    dxTitle: "Suggestion Box",
    dxDescription: "Suggest a feature you would like to see in the app",
    dxImgSrc: "/images/image-icon-lightbulb.png",
  },
];

export function SizeSmall({
  dxCardSize = "sm",
}: Pick<ActionCardProps, "dxCardSize">) {
  return (
    <ActionCard
      dxCardSize={dxCardSize}
      dxTitle="Enter your time"
      dxDescription="Log hours for your family commitment"
      dxImgSrc="/images/image-icon-smile-poop.png"
      dxImgAlt="smile-poo"
    />
  );
}

const containerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const gridStyles = css`
  width: 100%;
  display: grid;

  ${makeResponsive({ to: "tablet" })} {
    grid-template-columns: repeat(1, 1fr);
  }
  ${makeResponsive({ from: "tablet" })} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  ${makeResponsive({ from: "laptop" })} {
    grid-template-columns: repeat(var(--col-num), 1fr);
  }
`;

export function WithinGridSmall() {
  const [colNum, setColNum] = useState(4);
  const [size, setSize] = useState<ActionCardProps["dxCardSize"]>("md");

  return (
    <div className={containerStyles}>
      <div>
        <InputText
          type="number"
          dxLabel="Number of cards per row"
          value={colNum}
          onChange={({ currentTarget: { value } }) => setColNum(Number(value))}
        />
        <select
          onChange={({ currentTarget: { value } }) =>
            setSize(value as ActionCardProps["dxCardSize"])
          }
        >
          <option value="sm">sm</option>
          <option value="md">md</option>
          <option value="lg">lg</option>
        </select>
      </div>
      <div
        className={gridStyles}
        style={{
          // @ts-expect-error CSS custom properties are valid style strings
          ["--col-num"]: colNum,
        }}
      >
        {[...new Array(20)].map(() => {
          const index = Math.floor(Math.random() * options.length);
          const props = options[index];
          return (
            <ActionCard dxCardSize={size} {...props} dxImgAlt="smile-poo" />
          );
        })}
      </div>
    </div>
  );
}
