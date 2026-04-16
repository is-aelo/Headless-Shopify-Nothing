import { Share_Tech_Mono, Space_Mono } from "next/font/google";
import localFont from "next/font/local";

/**
 * GOOGLE FONTS
 * Optimized via next/font to remove external network requests.
 */
export const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
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
 * Using explicit descriptors to prevent production resolution errors.
 */

// Used for Logo (All Caps)
export const ndot57Caps = localFont({
  src: "../public/fonts/Ndot57Caps-Regular.woff2",
  variable: "--font-ndot-caps",
  display: "swap",
  weight: "400",
  style: "normal",
});

// Used for Nav Links (Header/Footer)
export const ndot57 = localFont({
  src: "../public/fonts/Ndot57-Regular.woff2",
  variable: "--font-ndot",
  display: "swap",
  weight: "400",
  style: "normal",
});

// Used for Product Titles (NType82)
export const nType82 = localFont({
  src: "../public/fonts/NType82-Headline.woff2",
  variable: "--font-ntype",
  display: "swap",
  weight: "700", // Headline font typically uses a bolder weight
  style: "normal",
});
