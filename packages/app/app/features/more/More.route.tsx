import { css } from "@linaria/core";
import { makeReset, makeResponsive } from "@nccl/theme";
import type { ActionCardProps } from "@nccl/components";
import { ActionCard } from "@nccl/components";
import { Link } from "react-router";

import { createRouteHandle } from "../../utils/isomorphic";
import { PageSection } from "../../components/page";

const styles = css`
  a {
    ${makeReset("anchor")};
  }
  width: 100%;
  display: grid;
  gap: 1rem;

  ${makeResponsive({ to: "tablet" })} {
    grid-template-columns: repeat(1, 1fr);
  }
  ${makeResponsive({ from: "tablet" })} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${makeResponsive({ from: "laptop" })} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${makeResponsive({ from: "desktop" })} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const options: (Omit<ActionCardProps, "dxCardSize"> & { href: string })[] = [
  {
    dxTitle: "Log your hours",
    dxDescription: "Add time entires to fulfill your family commitment",
    dxImgSrc: "/images/image-icon-time-card.png",
    dxImgAlt: "time-card",
    href: "/family-commitment/log",
  },
  {
    dxTitle: "FAQs",
    dxDescription: "Get some common answers to some common questions",
    dxImgSrc: "/images/image-icon-question-mark.png",
    dxImgAlt: "question-mark",
    href: "/faqs",
  },
  {
    dxTitle: "Planned Features",
    dxDescription: "View the planned features for the app",
    dxImgSrc: "/images/image-icon-todo-list.png",
    dxImgAlt: "todo-list",
    href: "/feature-pipeline",
  },
  {
    dxTitle: "Suggestion Box",
    dxDescription: "Suggest a feature you would like to see in the app",
    dxImgSrc: "/images/image-icon-lightbulb.png",
    dxImgAlt: "light-bulb",
    href: "/suggestion-box",
  },
];

export const handle = createRouteHandle({ mobileTitle: "More" });

export default function MoreRoute() {
  return (
    <PageSection>
      <div className={styles}>
        {options.map(({ href, ...props }) => {
          return (
            <Link to={href}>
              <ActionCard dxCardSize="sm" {...props} dxImgAlt="smile-poo" />
            </Link>
          );
        })}
      </div>
    </PageSection>
  );
}
