import { randProductDescription, randQuote } from "@ngneat/falso";
import type { Meta } from "@storybook/react-vite";
import { css } from "@linaria/core";

import { Accordion } from "./Accordion.js";
import { AccordionSummary } from "./AccordionSummary.js";
import { AccordionContent } from "./AccordionContent.js";

const meta: Meta = {
  title: "Accordion",
} satisfies Meta<typeof meta>;

export default meta;

const faqs = [...new Array(10)].map(() => ({
  title: randQuote(),
  description: randProductDescription(),
}));

const containerStyles = css`
  width: 50%;
  background: #ccc;
  padding: 1rem;
`;

export function Basic() {
  return (
    <div className={containerStyles}>
      {faqs.map((faq) => (
        <Accordion key={faq.title}>
          <AccordionSummary>{faq.title}</AccordionSummary>
          <AccordionContent>{faq.description}</AccordionContent>
        </Accordion>
      ))}
    </div>
  );
}

export function Exclusive() {
  return (
    <div className={containerStyles}>
      {faqs.map((faq) => (
        <Accordion key={faq.title} name="faqs">
          <AccordionSummary>{faq.title}</AccordionSummary>
          <AccordionContent>{faq.description}</AccordionContent>
        </Accordion>
      ))}
    </div>
  );
}
