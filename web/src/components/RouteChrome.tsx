"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Marks home vs inner pages so fixed Webflow chrome can adapt without IX2. */
export function RouteChrome() {
  const pathname = usePathname();

  useEffect(() => {
    const home = pathname === "/";
    document.documentElement.classList.toggle("is-home", home);
    document.documentElement.classList.toggle("is-inner", !home);
  }, [pathname]);

  return null;
}