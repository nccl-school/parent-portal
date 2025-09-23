import { HomeSection } from "./HomeSection.js";
import { HomeSectionTitle } from "./HomeSectionTitle.js";

import { MessageState } from "../../components/states/MessageState.js";

export const SECTION_ACTIONS = "actions";

export function HomeSectionActions() {
  return (
    <HomeSection dxSectionName={SECTION_ACTIONS}>
      <HomeSectionTitle
        dxTitle="Todo's"
        dxTitleImg="/images/image-icon-todo-list.png"
        dxTitleImgAlt="todo-list"
      />
      <MessageState>No actions right now. Horary!</MessageState>
    </HomeSection>
  );
}
