import type { GetUserResponse } from "@nccl/api/client";
import { css } from "@linaria/core";
import {
  makeColor,
  makeCustom,
  makeFontWeight,
  makeRem,
  makeResponsive,
} from "@nccl/theme";
import {
  Avatar,
  DescriptionList,
  DescriptionListData,
  DescriptionListTag,
  Icon,
  Typography,
} from "@nccl/components";
import type { ReactNode } from "react";

import { placeholder } from "../../utils/isomorphic";
import { PageContainer } from "../../components/page/PageContainer";
import { getUserName, RoleBadge } from "../user";

const styles = css`
  display: grid;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  background: ${makeColor("white")};
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "meta"
    "body";

  ${makeResponsive({ to: "laptop" })} {
    padding-bottom: ${makeRem(24)};
  }

  ${makeResponsive({ from: "laptop" })} {
    padding-bottom: ${makeRem(32)};
  }
`;

const headerStyles = css`
  grid-area: header;
  height: ${makeRem(120)};
  position: relative;

  ${makeResponsive({ to: "laptop" })} {
    height: ${makeRem(120)};
  }

  ${makeResponsive({ from: "laptop" })} {
    height: ${makeRem(200)};
  }

  & > div {
    margin: 0 auto;
    position: relative;

    ${makeResponsive({ from: "laptop" })} {
      max-width: 75ch;
      margin: 0 auto;
    }
  }

  & > img {
    width: 100%;
    object-fit: cover;
    position: relative;
    display: inline-block;

    ${makeResponsive({ to: "laptop" })} {
      height: ${makeRem(120)};
    }

    ${makeResponsive({ from: "laptop" })} {
      height: ${makeRem(200)};
    }
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: ${makeColor("primary", { opacity: 0.7 })};
    z-index: 10;
  }
`;

const avatarStyles = css`
  left: ${makeRem(32)};
  top: calc(100% - 60px);
  position: absolute;
  border: ${makeRem(4)} solid ${makeColor("white")};
  z-index: 15;
  background: ${makeColor("white", { opacity: 0.8 })};
`;

const metaStyles = css`
  grid-area: meta;

  ${makeResponsive({ to: "laptop" })} {
    padding: 0 ${makeCustom("page--gutter-mobile")};
    padding-top: ${makeRem(60 + 16)};
  }

  ${makeResponsive({ from: "laptop" })} {
    padding: 0 ${makeCustom("page--gutter-desktop")};
    padding-top: ${makeRem(60 + 16)};
    max-width: 75ch;
    margin: 0 auto;
  }

  h1 {
    font-weight: ${makeFontWeight("body-bold")} !important;
    display: flex;
    align-items: center;
    gap: ${makeRem(16)};
  }
`;
const bodyStyles = css`
  grid-area: body;
  margin: 0 auto;

  ${makeResponsive({ to: "laptop" })} {
    width: 100%;
    padding: 0 ${makeCustom("page--gutter-mobile")};
  }

  ${makeResponsive({ from: "laptop" })} {
    padding: 0 ${makeCustom("page--gutter-desktop")};
    width: 75ch;
  }
`;

export function DirectoryDetailUser(user: GetUserResponse) {
  return (
    <PageContainer dxVariant="scrollable" className={styles}>
      <div className={headerStyles}>
        <img src="/images/NCCLMosaicWall.jpeg" alt="mosaic-wall" />
        <div>
          <Avatar
            className={avatarStyles}
            dxFirstName={user.firstName}
            dxLastName={user.lastName}
            dxSrc={user.imageUrl ?? undefined}
            dxSize={120}
          />
        </div>
      </div>
      <div className={metaStyles}>
        <Typography dxVariant="heading3" dxNode="h1">
          {getUserName(user)}
          <RoleBadge role={user.role} />
        </Typography>
        <Typography
          dxNode="div"
          dxVariant="body1"
          style={{ marginTop: makeRem(8) }}
        >
          {user.bio}
        </Typography>
      </div>
      <div className={bodyStyles}>
        <DetailSection title="Information">
          <DescriptionList>
            <DescriptionListTag>
              <Icon
                dxIcon="mail-02-solid-standard"
                dxSize={24}
                dxColor="primary-1200"
              />
            </DescriptionListTag>
            <DescriptionListData>{user.email}</DescriptionListData>
            <DescriptionListTag>
              <Icon
                dxIcon="call-solid-standard"
                dxSize={24}
                dxColor="primary-1200"
              />
            </DescriptionListTag>
            <DescriptionListData>
              {user.phone ?? placeholder}
            </DescriptionListData>
          </DescriptionList>
        </DetailSection>
        <DetailSection title="Parents of">
          <Typography dxVariant="body3" dxNode="div">
            Student information coming soon!
          </Typography>
        </DetailSection>
        <DetailSection title="Committees">
          <Typography dxVariant="body3" dxNode="div">
            Committee information coming soon!
          </Typography>
        </DetailSection>
      </div>
    </PageContainer>
  );
}

const sectionStyles = css`
  margin-top: ${makeRem(48)};

  h2 {
    margin-bottom: ${makeRem(16)};
  }

  & > div {
    padding: 0 ${makeRem(8)};
  }
`;

function DetailSection({
  children,
  title,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={sectionStyles}>
      <Typography dxVariant="heading5" dxNode="h2">
        {title}
      </Typography>
      <div>{children}</div>
    </div>
  );
}
