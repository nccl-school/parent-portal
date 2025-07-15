import type { Meta } from "@storybook/react";

import { Widget } from "./Widget.js";
import { WidgetHeader } from "./WidgetHeader.js";
import { WidgetBody } from "./WidgetBody.js";

import { Typography } from "../typography/Typography.js";

const meta: Meta = {
  title: "Widget",
  component: Widget,
};

export default meta;

export const WithTitle = () => {
  return (
    <Widget>
      <WidgetHeader dxTitle="Suggestions" />
    </Widget>
  );
};
export const WithTitleIcon = () => {
  return (
    <Widget>
      <WidgetHeader
        dxTitle="Suggestions"
        dxImageSrc="/images/incandescent-lightbulb.png"
        dxImageAlt="idea"
      />
    </Widget>
  );
};
export const WithTitleIconAndSubtitle = () => {
  return (
    <Widget>
      <WidgetHeader
        dxTitle="Help Shape the Future of the Parent Portal!"
        dxSubtitle="Your voice helps us build the tools that matter most to your family and school experience."
        dxImageSrc="/images/incandescent-lightbulb.png"
        dxImageAlt="idea"
      />
      <WidgetBody>
        <Typography dxNode="p" dxVariant="body1">
          Whether it's a feature you've been wishing for, a small tweak that
          would make life easier, or something you've seen in another app that
          you'd love to see here — we want to hear it.
        </Typography>
        <Typography dxNode="p" dxVariant="body1">
          💡 Share a suggestion 👍 Upvote what matters to you 👎 Help us
          prioritize by downvoting too Let’s make this portal better — together.
        </Typography>
      </WidgetBody>
      <WidgetBody>another one</WidgetBody>
    </Widget>
  );
};
