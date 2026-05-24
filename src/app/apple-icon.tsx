import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default function AppleIcon() {
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
          // iOS 가 자체 둥근 모서리 적용 — radius 명시는 squircle 깨질 위험. 직각 둠.
          color: "white",
          fontWeight: 800,
          fontSize: 110,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: -3,
          position: "relative",
        }}
      >
        {/* Subtle glow ring */}
        <div
          style={{
            position: "absolute",
            inset: 12,
            borderRadius: 36,
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18) 0%, transparent 60%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>J</div>
      </div>
    ),
    { ...size },
  );
}
