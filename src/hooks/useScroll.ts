/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export function useScroll(options: ScrollToOptions) {
  return useEffect(() => window.scrollTo(options), []);
}
