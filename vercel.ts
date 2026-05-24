import { type VercelConfig } from "@vercel/config/v1";

/**
 * 진주 정보통신 사이트 — Vercel 배포 설정.
 *
 * env 는 Vercel 대시보드에서 등록 (소스에 secret 박지 않음):
 *   - RESEND_API_KEY (협업 폼 발송, Phase 6)
 *   - CONTACT_INBOX_TO (default teo.baek@outlook.com)
 *   - CONTACT_INBOX_FROM (default onboarding@resend.dev)
 *   - NEXT_PUBLIC_SITE_URL (production canonical URL, metadata/robots/sitemap 가 사용)
 *
 * Hobby plan 의 default region 사용 (multi-region 은 Pro 부터). 한국 사용자 다수면 추후 icn1.
 */
export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "pnpm build",
  installCommand: "pnpm install --frozen-lockfile",
};
