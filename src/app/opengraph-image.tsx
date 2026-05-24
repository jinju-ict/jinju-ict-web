import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

// OG 이미지 메타 (Next.js 자동 노출)
export const alt = `${SITE_NAME} — AI Engineering Studio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og 는 Node.js 또는 Edge runtime 모두 지원. Vercel Fluid Compute 우선.
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 96px",
          background:
            "linear-gradient(135deg, #0a0915 0%, #1a1235 45%, #2d1854 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Top: brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
              boxShadow: "0 0 30px rgba(168,85,247,0.5)",
            }}
          />
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            JINJU ICT
          </div>
        </div>

        {/* Center: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 26,
              color: "#c4b5fd",
              textTransform: "uppercase",
              letterSpacing: 6,
              fontWeight: 600,
            }}
          >
            AI Engineering Studio
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            We build with AI.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#9ca3af",
              fontWeight: 400,
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Own products. Client work. Internal tools.
          </div>
        </div>

        {/* Bottom: meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6b7280",
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "9999px",
                background: "#a855f7",
              }}
            />
            Elite team · Fast · Reliable
          </div>
          <div>jinju-ict</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
