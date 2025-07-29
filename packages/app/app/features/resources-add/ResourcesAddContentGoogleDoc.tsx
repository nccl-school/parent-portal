import { css } from "@linaria/core";
import { makeRem, makeReset } from "@nccl/theme";
import { useState } from "react";
import { Button, InputText } from "@nccl/components";

const styles = css`
  ${makeReset("ul")};

  li > div {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    gap: ${makeRem(16)};
  }
`;

type ExternalDoc = { name: string; href: string };

export function ResourcesAddContentGoogleDoc() {
  const [docs, setDocs] = useState<ExternalDoc[]>([]);

  return (
    <ul className={styles}>
      <li>
        <div>
          <InputText
            name="link"
            dxLabel="Google Doc Share URL"
            dxSize="md"
            type="url"
          />
          <Button
            dxColor="primary"
            dxSize="md"
            dxVariant="outlined"
            dxStartIcon="tick-01-solid-standard"
          >
            Create
          </Button>
        </div>
      </li>
    </ul>
  );
}
