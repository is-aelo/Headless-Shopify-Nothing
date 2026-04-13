"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function MainWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Only the homepage (/) gets zero padding for the Hero effect.
  // All other pages get the standard top padding.
  const isHomePage = pathname === "/";
  const mainPadding = isHomePage ? "" : "pt-12 md:pt-24";

  return <main className={mainPadding}>{children}</main>;
}
