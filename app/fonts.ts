import { GeistMono } from "geist/font/mono";
import { Share_Tech_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";

/**
 * GOOGLE FONTS
 */
export const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  display: "swap",
});

/**
 * GEIST MONO (Body Font)
 */
export const geistMono = GeistMono;

/**
 * SPACE GROTESK
 */
export const nType82 = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-ntype",
  display: "swap",
  weight: "700",
});

/**
 * LOCAL NOTHING BRAND FONTS
 * MATCHING FILENAMES EXACTLY: all lowercase as per your screenshot
 */
export const ndot57Caps = localFont({
  src: [
    {
      path: "../public/fonts/ndot57caps-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ndot-caps",
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});

export const ndot57 = localFont({
  src: [
    {
      path: "../public/fonts/ndot57-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ndot",
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});
