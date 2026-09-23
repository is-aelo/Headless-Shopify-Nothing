import { readFile } from "fs/promises";
import { join } from "path";

type OgWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: OgWeight;
  style: "normal";
};

/**
 * Bundled Google Font files (latin subset) for `next/og` (ImageResponse).
 * Self-hosted so OG image generation never depends on network at build/request time.
 */
const GOOGLE_FONT_FILES: Record<string, string> = {
  "Space Grotesk": "lib/fonts/SpaceGrotesk-Bold.ttf",
};

export async function getGoogleFont(
  family: string,
  weight: OgWeight,
): Promise<OgFont> {
  const file = GOOGLE_FONT_FILES[family];

  if (!file) {
    throw new Error(`No bundled Google Font file for family: ${family}`);
  }

  const buffer = await readFile(join(process.cwd(), file));
  const data = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;

  return { name: family, data, weight, style: "normal" };
}
