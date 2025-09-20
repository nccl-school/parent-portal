import {
  Accordion,
  AccordionContent,
  AccordionSummary,
  InputSearch,
  Typography,
} from "@nccl/components";
import { css } from "@linaria/core";
import { makeCustom, makeRem, makeReset, makeResponsive } from "@nccl/theme";

import { pluralize } from "../../utils/client";
import { PageContainer } from "../../components/page/PageContainer";
import { PageHeader } from "../../components/page";
import { CLASSES, createRouteHandle } from "../../utils/isomorphic";

export const handle = createRouteHandle({ mobileTitle: "FAQs" });

const styles = css`
  display: grid;
  grid-template-rows: auto auto 1fr;
  max-width: ${makeCustom("container--max-width")};
  width: 100%;
  margin: 0 auto;
  gap: ${makeRem(16)};

  ${makeResponsive({ to: "laptop" })} {
    padding: 0 ${makeCustom("page--gutter-mobile")};
  }

  ${makeResponsive({ from: "laptop" })} {
    padding: 0 ${makeCustom("page--gutter-desktop")};
  }
`;

const toolStyles = css`
  ${makeResponsive({ from: "laptop" })} {
    display: flex;
    gap: ${makeRem(16)};
    align-items: center;
    justify-content: space-between;
  }
`;

const styleList = css`
  overflow: auto;
  ${makeReset("ul")};

  a {
    ${makeReset("anchor")};
  }
`;

export default function FAQRoute() {
  return (
    <PageContainer dxVariant="scrollable" className={styles}>
      <PageHeader
        dxTitle="Frequently Asked Questions"
        dxSubtitle="Explore answers to the questions families ask most often."
      />
      <div className={toolStyles}>
        <Typography
          dxNode="div"
          dxVariant="heading5"
          className={CLASSES.desktopOnly}
        >
          {pluralize("result", 88, { withCount: true })}
        </Typography>
        <InputSearch
          dxSize="md"
          dxVariant="contrasted"
          placeholder="Search FAQs"
        />
      </div>
      <div className={styleList}>
        <Accordion>
          <AccordionSummary>Can we have pizza day?</AccordionSummary>
          <AccordionContent>
            <Typography dxVariant="body1" dxNode="p">
              Curabitur blandit tempus porttitor. Nullam quis risus eget urna
              mollis ornare vel eu leo. Duis mollis, est non commodo luctus,
              nisi erat porttitor ligula,
            </Typography>
          </AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionSummary>Can we have pizza day?</AccordionSummary>
          <AccordionContent>
            <Typography dxVariant="body1" dxNode="p">
              Curabitur blandit tempus porttitor. Nullam quis risus eget urna
              mollis ornare vel eu leo. Duis mollis, est non commodo luctus,
              nisi erat porttitor ligula,
            </Typography>
          </AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionSummary>Can we have pizza day?</AccordionSummary>
          <AccordionContent>
            <Typography dxVariant="body1" dxNode="p">
              Curabitur blandit tempus porttitor. Nullam quis risus eget urna
              mollis ornare vel eu leo. Duis mollis, est non commodo luctus,
              nisi erat porttitor ligula,
            </Typography>
          </AccordionContent>
        </Accordion>
      </div>
    </PageContainer>
  );
}
