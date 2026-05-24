import { ImageResponse } from "next/og";
import { PROJECTS } from "@/lib/portfolio";
import { SITE_NAME } from "@/lib/site";

// 페이지별 OG 메타
export const alt = `${SITE_NAME} — 솔루션 상세`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export function generateImageMetadata() {
  return PROJECTS.map((project) => ({
    id: project.slug,
    alt: `${project.title} — ${SITE_NAME}`,
    size,
    contentType,
  }));
}

/**
 * 슬러그별 그레이톤 페어. 사이트의 화이트 + 회색 + 아재 투박 톤과 일관성 유지.
 * from = darkest, via = mid, to = light-mid (모두 채도 거의 0).
 *
 * 폴백: 슬러그 매칭 실패 시 기본 미디엄 그레이.
 */
function gradientFor(slug: string): { from: string; via: string; to: string } {
  const map: Record<string, { from: string; via: string; to: string }> = {
    ttoktok: { from: "#2A2F3A", via: "#45494F", to: "#6B6F7A" },
    shortdub: { from: "#2F3440", via: "#4A4E56", to: "#727680" },
    "king-of-law": { from: "#262A33", via: "#43464C", to: "#686C75" },
    andy: { from: "#2D323D", via: "#484C53", to: "#6D7178" },
    "office-agent": { from: "#2A2E38", via: "#46494F", to: "#6A6E76" },
    "ai-news-daily": { from: "#282C36", via: "#44474D", to: "#696D75" },
    "dev-harness": { from: "#2B2F3A", via: "#454950", to: "#6B6F77" },
    "dev-safety": { from: "#2C303B", via: "#474B52", to: "#6C7079" },
  };
  return map[slug] ?? { from: "#2A2F3A", via: "#45494F", to: "#6B6F7A" };
}

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function ProjectOpenGraphImage({ params }: Params) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FAFAFA",
            color: "#1F2530",
            fontSize: 48,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {SITE_NAME}
        </div>
      ),
      { ...size },
    );
  }

  const g = gradientFor(project.slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: "#FAFAFA",
          color: "#1F2530",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
          border: "8px solid #B8BCC4",
        }}
      >
        {/* Top — brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 4,
                background: g.from,
                border: "2px solid #1F2530",
              }}
            />
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 1,
                color: "#1F2530",
              }}
            >
              {SITE_NAME}
            </div>
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 4,
              color: "#6B6F7A",
            }}
          >
            솔루션
          </div>
        </div>

        {/* Center — eyebrow + title + oneLiner */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          <div
            style={{
              fontSize: 22,
              color: g.via,
              textTransform: "uppercase",
              letterSpacing: 5,
              fontWeight: 600,
            }}
          >
            {project.categoryLabel}
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
              color: "#1F2530",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#45494F",
              fontWeight: 400,
              maxWidth: 1000,
              lineHeight: 1.4,
            }}
          >
            {project.oneLiner}
          </div>
        </div>

        {/* Bottom — meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#6B6F7A",
            fontSize: 20,
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
                background: g.from,
              }}
            />
            jinju-ict.com / portfolio
          </div>
          <div style={{ fontWeight: 600, color: "#45494F" }}>
            {project.slug}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
