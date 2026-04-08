import { Share_Tech_Mono, Space_Mono } from "next/font/google";
import localFont from "next/font/local";

/**
 * GOOGLE FONTS
 * Optimized via next/font to remove external network requests.
 */
export const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
  display: "swap",
});

export const spaceMono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

/**
 * LOCAL NOTHING BRAND FONTS
 * Paths are relative to this file (app/fonts.ts) to the public folder.
 */

// Used for Logo (All Caps)
export const ndot57Caps = localFont({
  src: "../public/fonts/Ndot57Caps-Regular.woff2",
  variable: "--font-ndot-caps",
  display: "swap",
});

// Used for Nav Links (Header/Footer)
export const ndot57 = localFont({
  src: "../public/fonts/Ndot57-Regular.woff2",
  variable: "--font-ndot",
  display: "swap",
});

// Used for Product Titles
export const nType82 = localFont({
  src: "../public/fonts/NType82-Headline.woff2",
  variable: "--font-ntype",
  display: "swap",
});
