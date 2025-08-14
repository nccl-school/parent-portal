import { css } from "@linaria/core";

import { ResourcesTitle } from "./ResourcesTitle";

const styles = css``;

export function ResourceMainRecentlyViewed() {
  return (
    <div className={styles}>
      <ResourcesTitle title="Recently viewed" />
      <div style={{ height: 100 }} />
    </div>
  );
}
