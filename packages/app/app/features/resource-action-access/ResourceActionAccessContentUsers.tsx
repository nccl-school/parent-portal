// import { Typography } from "@nccl/components";
// import { css } from "@linaria/core";
// import { makeColor, makeRem } from "@nccl/theme";
// import { useState } from "react";
// import { match } from "ts-pattern";

import { ComingSoonState } from "../../components/states/ComingSoonState";

// import { EmptyState } from "../../components/states/EmptyState";
// import { UserCombobox } from "../user";

// const selectionStyles = css`
//   margin-top: ${makeRem(24)};
//   padding: ${makeRem(8)};
//   background: ${makeColor("light-200")};
//   min-height: ${makeRem(280)};
//   border-radius: ${makeRem(8)};
//   overflow: auto;
// `;

// export function ResourceActionAccessContentUsers() {
//   const [selectedUsers, setSelectedUsers] = useState<[]>([]);
//   return (
//     <>
//       <Typography dxNode="p" dxVariant="body1">
//         Users in the list below will (at a minimum) be able to view this
//         resource. Use the dropdown next to their entry to further refine their
//         capabilities.
//       </Typography>
//       <br />
//       <UserCombobox />
//       {match(selectedUsers)
//         .with([], () => (
//           <EmptyState
//             borderless
//             imgSize={100}
//             imgAlt="nebula"
//             title="No one has been selected yet"
//             imgSrc="/images/image-icon-friend-hearts.png"
//           >
//             No specific users are able to interact with this resource... yet.
//           </EmptyState>
//         ))
//         .otherwise((users) => (
//           <div className={selectionStyles}></div>
//         ))}
//     </>
//   );
// }

export function ResourceActionAccessContentUsers() {
  return (
    <ComingSoonState>
      Soon you'll be able to allow specific users access to resources
    </ComingSoonState>
  );
}
