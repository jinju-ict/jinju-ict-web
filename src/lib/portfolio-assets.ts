// Manually curated portfolio asset manifest — synced with public/portfolio/<slug>/.
// Source: ref/ 에서 대표님이 직접 보내주신 실제 캡처 (T5 white-aje-rework).
//
// 보안 룰 (CLAUDE.md §5): src/ + public/ 에 금지 단어 절대 노출 X.
// 파일명·경로 모두 추상 슬러그만 사용. scripts/check-security.sh 로 자가 검증됨.

export type PortfolioAsset = {
  thumbnail?: string;
  screens?: string[];
};

export const PORTFOLIO_ASSETS: Record<string, PortfolioAsset> = {
  // ttoktok — 자산 대기 중 (대표님 새 캡처 보내실 예정)
  "shortdub": {
    thumbnail: "/portfolio/shortdub/thumbnail.png",
    screens: [
      "/portfolio/shortdub/screen-1.png",
      "/portfolio/shortdub/screen-2.png",
    ],
  },
  "king-of-law": {
    thumbnail: "/portfolio/king-of-law/thumbnail.png",
    screens: [
      "/portfolio/king-of-law/screen-1.png",
      "/portfolio/king-of-law/screen-2.png",
    ],
  },
  "andy": {
    thumbnail: "/portfolio/andy/thumbnail.png",
    screens: [
      "/portfolio/andy/screen-1.png",
      "/portfolio/andy/screen-2.png",
      "/portfolio/andy/screen-3.png",
    ],
  },
  "ai-news-daily": {
    thumbnail: "/portfolio/ai-news-daily/thumbnail.png",
    screens: [
      "/portfolio/ai-news-daily/screen-1.png",
      "/portfolio/ai-news-daily/screen-2.png",
    ],
  },
  // dev-harness, dev-safety, office-agent — 자산 없음 (인프라 / 추상 프로젝트)
};
