import { Geist_Mono, Share_Tech_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";

/**
 * GEIST MONO — imported via next/font/google (official Vercel pattern)
 * This guarantees .variable is a proper Next.js CSS variable object.
 */
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/**
 * SHARE TECH MONO
 */
export const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  display: "swap",
});

/**
 * SPACE GROTESK (headings / product font)
 * Load full weight range — not just 700.
 */
export const nType82 = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-ntype",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * LOCAL FONTS
 * src path is relative to THIS file (app/fonts.ts).
 * ../public/fonts/ resolves correctly from app/.
 */
export const ndot57Caps = localFont({
  src: "../public/fonts/Ndot57Caps-Regular.woff2",
  variable: "--font-ndot-caps",
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});

export const ndot57 = localFont({
  src: "../public/fonts/Ndot57-Regular.woff2",
  variable: "--font-ndot",
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});
