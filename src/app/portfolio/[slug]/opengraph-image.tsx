import { ImageResponse } from "next/og";
import { PROJECTS } from "@/lib/portfolio";
import { SITE_NAME } from "@/lib/site";

// 페이지별 OG 메타
export const alt = `${SITE_NAME} — 포트폴리오 상세`;
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
 * project.accent 의 Tailwind 그라데이션 문자열을 OG 용 raw CSS gradient 로 매핑.
 * accent 는 from-XXX/45 via-YYY/30 to-ZZZ/40 형태라 OG 런타임에서 직접 해석 불가 → 슬러그별 색 페어로 변환.
 *
 * 폴백: 슬러그 매칭 실패 시 사이트 기본 indigo 톤.
 */
function gradientFor(slug: string): { from: string; via: string; to: string } {
  const map: Record<string, { from: string; via: string; to: string }> = {
    ttoktok: { from: "#d946ef", via: "#a855f7", to: "#8b5cf6" },
    shortdub: { from: "#22d3ee", via: "#0ea5e9", to: "#3b82f6" },
    "king-of-law": { from: "#fbbf24", via: "#f97316", to: "#f43f5e" },
    andy: { from: "#34d399", via: "#14b8a6", to: "#06b6d4" },
    "office-agent": { from: "#94a3b8", via: "#6366f1", to: "#2563eb" },
    "ai-news-daily": { from: "#fb7185", via: "#ec4899", to: "#d946ef" },
    "dev-harness": { from: "#8b5cf6", via: "#a855f7", to: "#6366f1" },
    "dev-safety": { from: "#6366f1", via: "#8b5cf6", to: "#d946ef" },
  };
  return map[slug] ?? { from: "#6366f1", via: "#7c3aed", to: "#a855f7" };
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
            background: "#0B0D14",
            color: "#E7E9EE",
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
          background: "#0B0D14",
          color: "#E7E9EE",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent ribbon (project.accent 매핑) */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -220,
            width: 760,
            height: 760,
            borderRadius: "9999px",
            background: `radial-gradient(circle, ${g.from}66 0%, ${g.via}33 45%, transparent 75%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -180,
            width: 640,
            height: 640,
            borderRadius: "9999px",
            background: `radial-gradient(circle, ${g.to}44 0%, transparent 70%)`,
          }}
        />

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
                borderRadius: 12,
                background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)`,
                boxShadow: `0 0 28px ${g.via}66`,
              }}
            />
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 1,
                color: "#E7E9EE",
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
              color: "#9CA3AF",
            }}
          >
            Portfolio
          </div>
        </div>

        {/* Center — eyebrow + title + oneLiner */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          <div
            style={{
              fontSize: 22,
              color: g.from,
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
              color: "#F4F5F8",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#9CA3AF",
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
            color: "#6b7280",
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
          <div style={{ fontWeight: 600, color: "#9CA3AF" }}>
            {project.slug}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
