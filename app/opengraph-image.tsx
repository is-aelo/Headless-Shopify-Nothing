import { ImageResponse } from "next/og";
import { getGoogleFont } from "lib/og-font";

export default async function OpengraphImage(props?: {
  title?: string;
}): Promise<ImageResponse> {
  const { title } = props || {};

  const font = await getGoogleFont("Space Grotesk", 700);

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "black",
          backgroundSize: "150px 150px",
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
        <p
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            lineHeight: 1,
            fontFamily: "Space Grotesk",
          }}
        >
          {title || process.env.SITE_NAME}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [font],
    },
  );
}
