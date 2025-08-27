import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
} from "@react-email/components";
import type { ReactNode } from "react";
import { colorAndVariants } from "@nccl/theme";

import { createStaticAssetHref } from "../utils/util.createStaticAssetHref.js";

export type EmailLayoutProps = {
  children: ReactNode;
  previewText: string;
};

export function EmailLayout({ children, previewText }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Body>
        <Preview>{previewText}</Preview>
        <Container
          style={{
            background: colorAndVariants["light-300"],
            padding: "1rem",
          }}
        >
          <Section
            style={{
              background: "#fff",
            }}
          >
            <Section
              style={{
                height: 100,
                padding: "0 2rem",
                background:
                  "linear-gradient(75deg, #fff6, #f0ffff66 26%, #e5ffff66 39%, #e0feff66 50% 61%, #e0f4ff66 74%, #ffe0ff66)",
              }}
            >
              <Img
                src={createStaticAssetHref(
                  "images/ncc-logo-shell-only-500x500-transparent.png"
                )}
                style={{
                  objectFit: "contain",
                  height: 50,
                  width: "auto",
                }}
                alt="NCCL Logo"
              />
            </Section>
            <Section style={{ padding: "1rem 2rem" }}>{children}</Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
