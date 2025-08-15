import { Text } from "@react-email/components";
import type { ReactNode } from "react";

import { font } from "../utils/util.font.js";

export function EmailText({ children }: { children: ReactNode }) {
  return <Text style={font.body}>{children}</Text>;
}
