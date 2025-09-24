import { HomeSection } from "./HomeSection";
import { HomeSectionTitle } from "./HomeSectionTitle";
import { HomeSectionContent } from "./HomeSectionContent";

import { ComingSoonState } from "../../components/states/ComingSoonState";

export const SECTION_FEED = "feed";

export function HomeSectionFeed() {
  return (
    <HomeSection dxSectionName={SECTION_FEED}>
      <HomeSectionTitle
        dxTitle="My Feed"
        dxTitleImg="/images/image-icon-social-media-app.png"
        dxTitleImgAlt="my-feed"
      />
      <HomeSectionContent>
        <ComingSoonState allowSuggestions>
          We're working on providing you a customized feed of school, group and
          student activity!
        </ComingSoonState>
      </HomeSectionContent>
    </HomeSection>
  );
}
