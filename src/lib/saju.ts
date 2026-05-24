/**
 * 사주 서비스 메타 — 진주 정보통신 의 첫 자체 프로덕트 (현재 준비중).
 *
 * 출처: `/Users/goldenplanet/jinsup_space/saju` 의 README + planning_docs.
 * 정식 앱명은 가제 — 동결 후 대표님이 직접 갱신할 수 있는 자리.
 */

export const SAJU = {
  appName: "사주",
  appNameNote: "가제 — 동결 후 갱신",
  tagline: "전통 사주를 가볍게 — 풀이부터 상담까지 한 앱에서",
  description:
    "어렵게 느껴지던 사주를 일상의 언어로 옮겼다. 전통 명리 해석에 AI 가이드를 더해, 오늘의 흐름과 사주 풀이, 그리고 1:1 상담까지 한 곳에서 가볍게 만날 수 있다.",
  status: "준비중" as const,
  releaseEta: "출시 알림 신청",
  platforms: ["iOS", "Android"] as const,
  hero: "/saju/hero.png",
  screens: ["/saju/screen-1.png", "/saju/screen-2.png"] as const,
  features: [
    {
      title: "사주",
      description:
        "전통 사주 8자 풀이를 일상의 언어로. 어려운 한자 없이 핵심 흐름만 또렷하게.",
    },
    {
      title: "운세",
      description:
        "오늘·이번 주·이달·올해 운세를 한눈에. 바쁜 일상 사이에서 가볍게 확인.",
    },
    {
      title: "상담",
      description:
        "사주 자료를 근거로 답하는 AI 1:1 상담. 답변의 출처를 곧바로 되짚을 수 있다.",
    },
    {
      title: "궁합",
      description:
        "두 사람의 사주를 함께 풀어 관계의 결을 살펴본다. 어울림과 보완 지점까지.",
    },
  ],
} as const;
