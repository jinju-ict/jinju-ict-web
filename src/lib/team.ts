/**
 * 팀 데이터 — placeholder.
 * 인원수 "N명" 표현 금지. 나이 노출 금지 (CLAUDE.md §3 룰).
 * 실제 이름/사진은 동결 후 대표님이 직접 갱신.
 */

export type TeamMember = {
  slug: string;
  initials: string;
  displayName: string;
  role: string;
  oneLiner: string;
  strengths: readonly string[];
  gradient: string;
};

export const TEAM: readonly TeamMember[] = [
  {
    slug: "founder-pm",
    initials: "기획",
    displayName: "Founder · Product",
    role: "Product / PM",
    oneLiner:
      "다양한 서비스의 0→1 사이클을 여러 차례 경험. 창업 감각과 PM 실력으로 제품의 방향과 우선순위를 잡습니다.",
    strengths: ["서비스 기획", "창업 경험", "프로덕트 PM", "AI 활용"],
    gradient: "from-primary via-primary to-accent",
  },
  {
    slug: "founder-dev",
    initials: "개발",
    displayName: "Founder · Engineering",
    role: "AI / Backend / App",
    oneLiner:
      "AI 에이전트와 AI 모델 개발을 메인으로, 백엔드와 앱까지 직접 다룹니다. AI 가 일하는 방식을 매일 도구처럼 사용합니다.",
    strengths: [
      "AI 에이전트",
      "AI 모델",
      "Backend",
      "App",
      "에이전틱 엔지니어링",
    ],
    gradient: "from-accent via-primary to-primary",
  },
] as const;
