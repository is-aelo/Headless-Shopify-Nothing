import {
  JetBrains_Mono,
  Press_Start_2P,
  Space_Grotesk,
} from "next/font/google";

/**
 * GOOGLE FONTS ONLY
 */

/**
 * SPACE GROTESK (Squared/technical Sans for logos + headlines)
 */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/**
 * JETBRAINS MONO (Tech/UI/mono body copy)
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/**
 * PRESS START 2P (Retro pixel accents — sparse usage only)
 */
export const pressStart2p = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});
