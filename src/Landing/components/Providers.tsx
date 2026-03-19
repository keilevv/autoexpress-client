"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}
