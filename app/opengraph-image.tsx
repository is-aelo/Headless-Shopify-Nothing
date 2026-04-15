import { ImageResponse } from "next/og";

export default async function OpengraphImage(props?: {
  title?: string;
}): Promise<ImageResponse> {
  const { title } = props || {};

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          {/* Logo or Icon can go here */}
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            fontWeight: 700,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 64,
              color: "white",
              lineHeight: 1,
              fontFamily: "sans-serif", // Fallback to system font
            }}
          >
            {title || process.env.SITE_NAME}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // Inalis na natin ang 'fonts' array dito dahil wala na ang .ttf file
    },
  );
}
