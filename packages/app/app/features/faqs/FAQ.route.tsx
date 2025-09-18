import { InputSearch, Label, Typography } from "@nccl/components";
import { css } from "@linaria/core";
import { makeCustom, makeRem, makeReset, makeResponsive } from "@nccl/theme";
import { NavItem } from "app/components/nav/NavItem";

import { PageContainer } from "../../components/page/PageContainer";
import { PageHeader } from "../../components/page";
import { createRouteHandle } from "../../utils/isomorphic";

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

const styleList = css`
  overflow: auto;
  ${makeReset("ul")};

  a {
    ${makeReset("anchor")};
  }
`;

const styleItem = css`
  padding: ${makeRem(16)};
  border-radius: ${makeRem(8)};
  background: white;

  & > div {
    margin-bottom: ${makeRem(8)};
  }
`;

export default function FAQRoute() {
  return (
    <PageContainer dxVariant="scrollable" className={styles}>
      <PageHeader
        dxTitle="Frequently Asked Questions"
        dxSubtitle="Explore answers to the questions families ask most often."
      />
      <InputSearch
        dxSize="md"
        dxVariant="contrasted"
        placeholder="Search FAQs"
      />
      <ul className={styleList}>
        <li>
          <details className={styleItem} name="faq">
            <summary>
              <Label dxVariant="info">random</Label>
              <Typography dxVariant="heading5" dxNode="div">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et.
              </Typography>
            </summary>
            <Typography dxVariant="body3" dxNode="p">
              Curabitur blandit tempus porttitor. Nullam quis risus eget urna
              mollis ornare vel eu leo. Duis mollis, est non commodo luctus,
              nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean
              eu leo quam. Pellentesque ornare sem lacinia quam venenatis
              vestibulum. Cras mattis consectetur purus sit amet fermentum.
              Nullam quis risus eget urna mollis ornare vel eu leo.
            </Typography>
          </details>
        </li>
      </ul>
    </PageContainer>
  );
}
