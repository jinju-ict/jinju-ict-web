import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
          borderRadius: 7,
          color: "white",
          fontWeight: 800,
          fontSize: 19,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: -1,
        }}
      >
        J
      </div>
    ),
    { ...size },
  );
}
