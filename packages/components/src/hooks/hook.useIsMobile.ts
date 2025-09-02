import { breakpoints } from "@nccl/theme";
import { useEffect, useState } from "react";

export function useIsMobile(
  initial?: boolean,
  breakpoint = breakpoints.laptop
) {
  const [isMobile, setIsMobile] = useState(initial ?? false);

  useEffect(() => {
    function update() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);

  return isMobile;
}
