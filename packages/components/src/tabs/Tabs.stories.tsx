import type { Meta } from "@storybook/react";
import { randWord } from "@ngneat/falso";
import type { RefCallback } from "react";
import { useCallback } from "react";

import { Tab } from "./Tab.js";
import { Tabs } from "./Tabs.js";

const meta: Meta = {
  title: "Tabs",
} satisfies Meta<typeof meta>;

export default meta;

export const Basic = () => {
  const onMount = useCallback<RefCallback<HTMLDivElement>>((node) => {
    if (!node) return;
    const anchors = node.getElementsByTagName("a");
    function handleClick(e: Event) {
      (e.currentTarget as HTMLAnchorElement).classList.add("active");

      for (const anchor of anchors) {
        if (anchor === e.currentTarget) continue;
        anchor.classList.remove("active");
      }
    }

    for (const anchor of anchors) {
      anchor.addEventListener("click", handleClick);
    }

    return () => {
      for (const anchor of anchors) {
        anchor.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <div ref={onMount}>
      <Tabs>
        <li>
          <a className="active">
            <Tab dxActive>{randWord()}</Tab>
          </a>
        </li>
        <li>
          <a>
            <Tab>{randWord()}</Tab>
          </a>
        </li>
        <li>
          <a>
            <Tab>{randWord()}</Tab>
          </a>
        </li>
      </Tabs>
    </div>
  );
};
