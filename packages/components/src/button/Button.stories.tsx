import type { Meta } from "@storybook/react";
import type { ReactNode } from "react";

import { Button } from "./Button.js";

const meta: Meta = {
  title: "Button",
  component: Button,
} satisfies Meta<typeof meta>;

export default meta;

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".5rem",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      {children}
    </div>
  );
}

export const IconSizes = () => {
  return (
    <>
      <Container>
        <Button
          dxVariant="icon"
          dxIcon="folder-02-stroke-standard"
          dxSize="sm"
        />
        <Button
          dxVariant="icon"
          dxIcon="folder-02-stroke-standard"
          dxSize="md"
        />
        <Button
          dxVariant="icon"
          dxIcon="folder-02-stroke-standard"
          dxSize="lg"
        />
      </Container>
      <Container>
        <Button
          dxVariant="icon"
          dxStyle="outlined"
          dxIcon="folder-02-stroke-standard"
          dxSize="sm"
        />
        <Button
          dxVariant="icon"
          dxStyle="outlined"
          dxIcon="folder-02-stroke-standard"
          dxSize="md"
        />
        <Button
          dxVariant="icon"
          dxStyle="outlined"
          dxIcon="folder-02-stroke-standard"
          dxSize="lg"
        />
      </Container>
    </>
  );
};

export function Contained() {
  return (
    <>
      <Container>
        <Button dxVariant="contained" dxSize="sm">
          Primary
        </Button>
        <Button dxVariant="contained" dxSize="md">
          Primary
        </Button>
        <Button dxVariant="contained" dxSize="lg">
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="home-06-stroke-standard"
          dxSize="sm"
        >
          Primary w. start icon
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="home-06-stroke-standard"
          dxSize="md"
        >
          Primary w. start icon
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="home-06-stroke-standard"
          dxSize="lg"
        >
          Primary w. start icon
        </Button>
      </Container>
      <Container>
        <Button dxVariant="contained" dxColor="secondary" dxSize="sm">
          Secondary
        </Button>
        <Button dxVariant="contained" dxColor="secondary" dxSize="md">
          Secondary
        </Button>
        <Button dxVariant="contained" dxColor="secondary" dxSize="lg">
          Secondary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="calendar-03-solid-standard"
          dxColor="secondary"
          dxSize="sm"
        >
          Secondary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="calendar-03-solid-standard"
          dxColor="secondary"
          dxSize="md"
        >
          Secondary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="calendar-03-solid-standard"
          dxColor="secondary"
          dxSize="lg"
        >
          Secondary
        </Button>
      </Container>
      <Container>
        <Button dxVariant="contained" dxColor="tertiary" dxSize="sm">
          Primary
        </Button>
        <Button dxVariant="contained" dxColor="tertiary" dxSize="md">
          Primary
        </Button>
        <Button dxVariant="contained" dxColor="tertiary" dxSize="lg">
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="square-lock-02-stroke-standard"
          dxColor="tertiary"
          dxSize="sm"
        >
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="square-lock-02-stroke-standard"
          dxColor="tertiary"
          dxSize="md"
        >
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="square-lock-02-stroke-standard"
          dxColor="tertiary"
          dxSize="lg"
        >
          Primary
        </Button>
      </Container>
      <Container>
        <Button dxVariant="contained" dxColor="alt" dxSize="sm">
          Primary
        </Button>
        <Button dxVariant="contained" dxColor="alt" dxSize="md">
          Primary
        </Button>
        <Button dxVariant="contained" dxColor="alt" dxSize="lg">
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="search-01-stroke-standard"
          dxColor="alt"
          dxSize="sm"
        >
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="search-01-stroke-standard"
          dxColor="alt"
          dxSize="md"
        >
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="search-01-stroke-standard"
          dxColor="alt"
          dxSize="lg"
        >
          Primary
        </Button>
      </Container>
      <Container>
        <Button dxVariant="contained" dxColor="danger" dxSize="sm">
          Primary
        </Button>
        <Button dxVariant="contained" dxColor="danger" dxSize="md">
          Primary
        </Button>
        <Button dxVariant="contained" dxColor="danger" dxSize="lg">
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="delete-02-stroke-standard"
          dxColor="danger"
          dxSize="sm"
        >
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="delete-02-stroke-standard"
          dxColor="danger"
          dxSize="md"
        >
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="delete-02-stroke-standard"
          dxColor="danger"
          dxSize="lg"
        >
          Primary
        </Button>
      </Container>
      <Container>
        <Button dxVariant="contained" dxColor="success" dxSize="sm">
          Primary
        </Button>
        <Button dxVariant="contained" dxColor="success" dxSize="md">
          Primary
        </Button>
        <Button dxVariant="contained" dxColor="success" dxSize="lg">
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="smile-stroke-standard"
          dxColor="success"
          dxSize="sm"
        >
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="smile-stroke-standard"
          dxColor="success"
          dxSize="md"
        >
          Primary
        </Button>
        <Button
          dxVariant="contained"
          dxStartIcon="smile-stroke-standard"
          dxColor="success"
          dxSize="lg"
        >
          Primary
        </Button>
      </Container>
    </>
  );
}

export function Outlined() {
  return (
    <>
      <Container>
        <Button dxVariant="outlined" dxSize="sm">
          Primary
        </Button>
        <Button dxVariant="outlined" dxSize="md">
          Primary
        </Button>
        <Button dxVariant="outlined" dxSize="lg">
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="home-06-stroke-standard"
          dxSize="sm"
        >
          Primary w. start icon
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="home-06-stroke-standard"
          dxSize="md"
        >
          Primary w. start icon
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="home-06-stroke-standard"
          dxSize="lg"
        >
          Primary w. start icon
        </Button>
      </Container>
      <Container>
        <Button dxVariant="outlined" dxColor="secondary" dxSize="sm">
          Secondary
        </Button>
        <Button dxVariant="outlined" dxColor="secondary" dxSize="md">
          Secondary
        </Button>
        <Button dxVariant="outlined" dxColor="secondary" dxSize="lg">
          Secondary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="calendar-03-solid-standard"
          dxColor="secondary"
          dxSize="sm"
        >
          Secondary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="calendar-03-solid-standard"
          dxColor="secondary"
          dxSize="md"
        >
          Secondary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="calendar-03-solid-standard"
          dxColor="secondary"
          dxSize="lg"
        >
          Secondary
        </Button>
      </Container>
      <Container>
        <Button dxVariant="outlined" dxColor="tertiary" dxSize="sm">
          Primary
        </Button>
        <Button dxVariant="outlined" dxColor="tertiary" dxSize="md">
          Primary
        </Button>
        <Button dxVariant="outlined" dxColor="tertiary" dxSize="lg">
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="square-lock-02-stroke-standard"
          dxColor="tertiary"
          dxSize="sm"
        >
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="square-lock-02-stroke-standard"
          dxColor="tertiary"
          dxSize="md"
        >
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="square-lock-02-stroke-standard"
          dxColor="tertiary"
          dxSize="lg"
        >
          Primary
        </Button>
      </Container>
      <Container>
        <Button dxVariant="outlined" dxColor="alt" dxSize="sm">
          Primary
        </Button>
        <Button dxVariant="outlined" dxColor="alt" dxSize="md">
          Primary
        </Button>
        <Button dxVariant="outlined" dxColor="alt" dxSize="lg">
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="search-01-stroke-standard"
          dxColor="alt"
          dxSize="sm"
        >
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="search-01-stroke-standard"
          dxColor="alt"
          dxSize="md"
        >
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="search-01-stroke-standard"
          dxColor="alt"
          dxSize="lg"
        >
          Primary
        </Button>
      </Container>
      <Container>
        <Button dxVariant="outlined" dxColor="danger" dxSize="sm">
          Primary
        </Button>
        <Button dxVariant="outlined" dxColor="danger" dxSize="md">
          Primary
        </Button>
        <Button dxVariant="outlined" dxColor="danger" dxSize="lg">
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="delete-02-stroke-standard"
          dxColor="danger"
          dxSize="sm"
        >
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="delete-02-stroke-standard"
          dxColor="danger"
          dxSize="md"
        >
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="delete-02-stroke-standard"
          dxColor="danger"
          dxSize="lg"
        >
          Primary
        </Button>
      </Container>
      <Container>
        <Button dxVariant="outlined" dxColor="success" dxSize="sm">
          Primary
        </Button>
        <Button dxVariant="outlined" dxColor="success" dxSize="md">
          Primary
        </Button>
        <Button dxVariant="outlined" dxColor="success" dxSize="lg">
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="smile-stroke-standard"
          dxColor="success"
          dxSize="sm"
        >
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="smile-stroke-standard"
          dxColor="success"
          dxSize="md"
        >
          Primary
        </Button>
        <Button
          dxVariant="outlined"
          dxStartIcon="smile-stroke-standard"
          dxColor="success"
          dxSize="lg"
        >
          Primary
        </Button>
      </Container>
    </>
  );
}
