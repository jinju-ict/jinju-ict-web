/**
 * 사이트 전역 메타 상수 — metadata / robots / sitemap / OG 가 공유.
 */

export const SITE_NAME = "진주 정보통신";

export const SITE_TAGLINE = "AI 정예 개발사";

export const SITE_DESCRIPTION =
  "AI 전문가들이 모인 정예 개발사. 자체 서비스를 주력으로 만들면서 협업·외주 의뢰도 폭넓게 수행합니다.";

export const SITE_KEYWORDS = [
  "진주 정보통신",
  "AI 개발사",
  "AI 에이전트",
  "AI 모델 개발",
  "백엔드 외주",
  "앱 개발 외주",
  "Flutter",
  "Next.js",
  "사주 앱",
  "에이전틱 엔지니어링",
];

/**
 * 사이트의 canonical URL.
 *   1. NEXT_PUBLIC_SITE_URL (production 배포 시 직접 지정)
 *   2. VERCEL_URL (Vercel 자동 주입, preview deploy 등)
 *   3. http://localhost:3000 (dev fallback)
 */
export const SITE_URL: string = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
})();
