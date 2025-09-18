import { randProductDescription, randQuote } from "@ngneat/falso";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Accordion, type AccordionProps } from "./Accordion.js";
import { AccordionSummary } from "./AccordionSummary.js";
import { AccordionTitle } from "./AccordionTitle.js";
import { AccordionContent } from "./AccordionContent.js";

const meta: Meta = {
  title: "Accordion",
} satisfies Meta<typeof meta>;

export default meta;
type Story = StoryObj<typeof meta>;

const faqs = [...new Array(10)].map(() => ({
  title: randQuote(),
  description: randProductDescription(),
}));

export function Basic() {
  return faqs.map((faq) => (
    <>
      <Accordion>
        <AccordionSummary>
          <AccordionTitle>{faq.title}</AccordionTitle>
        </AccordionSummary>
        <AccordionContent>{faq.description}</AccordionContent>
      </Accordion>
    </>
  ));
}

export const Exclusive: Story = {
  args: {} as AccordionProps,
};
