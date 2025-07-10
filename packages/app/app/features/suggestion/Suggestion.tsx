import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeFontWeight, makeRem, makeReset } from "@nccl/theme";
import type { ReactNode } from "react";

const styles = css`
  max-width: ${makeRem(900)};
  margin: 0 auto;

  header {
    width: 80%;
    margin: 0 auto;
    margin-bottom: ${makeRem(24)};
    text-align: center;

    h3 {
      margin-bottom: ${makeRem(4)};
      font-weight: ${makeFontWeight("heading-semiBold")};
    }
  }

  ul {
    ${makeReset("ul")};
    margin-top: ${makeRem(32)};
  }
`;

export function Suggestion({ children }: { children: ReactNode }) {
  return (
    <article className={styles}>
      <header>
        <Typography dxNode="h3" dxVariant="heading4">
          Help Shape the Future of the Parent Portal!
        </Typography>
        <Typography dxNode="div" dxVariant="body1">
          Your voice helps us build the tools that matter most to your family
          and school experience.
        </Typography>
      </header>

      {/* <Typography dxNode="p" dxVariant="body1">
        Whether it's a feature you've been wishing for, a small tweak that would
        make life easier, or something you've seen in another app that you'd
        love to see here — we want to hear it.
      </Typography>
      <Typography dxNode="p" dxVariant="body1">
        <ul>
          <li>💡 Share a suggestion</li>
          <li>👍 Upvote what matters to you</li>
          <li>👎 Help us prioritize by downvoting too</li>
        </ul>
        Let’s make this portal better — together.
      </Typography> */}
      <div>{children}</div>
    </article>
  );
}
