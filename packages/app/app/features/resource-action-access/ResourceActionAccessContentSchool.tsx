import { css } from "@linaria/core";
import { Card, Typography } from "@nccl/components";
import { makeRem } from "@nccl/theme";

const cardStyles = css`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${makeRem(16)};
  align-items: center;
`;

export function ResourceActionAccessContentSchool() {
  return (
    <Card dxVariant="contained" className={cardStyles}>
      <div>
        <Typography dxNode="div" dxVariant="heading5">
          Anyone in the school...
        </Typography>
        <Typography dxNode="p" dxVariant="body3">
          Includes any user that has access to the parent portal
        </Typography>
      </div>
      <form action="">
        <select>
          <option value="">Cannot access</option>
          <option value="">Can view</option>
          <option value="">Can edit</option>
          <option value="">Can manage</option>
        </select>
      </form>
    </Card>
  );
}
