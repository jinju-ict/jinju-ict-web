/**
 * 사주 서비스 메타 — 진주 정보통신개발 의 첫 자체 프로덕트 (현재 준비중).
 *
 * 출처: `/Users/goldenplanet/jinsup_space/saju` 의 README + planning_docs.
 * 정식 앱명은 가제 — 동결 후 대표님이 직접 갱신할 수 있는 자리.
 */

export const SAJU = {
  appName: "사주",
  appNameNote: "가제 — 동결 후 갱신",
  tagline: "외계인 관찰자가 들려주는, 친근한 K-사주.",
  description:
    "어렵고 무거웠던 사주를 가볍고 친근하게. B612 외계인 관찰자의 시선으로 풀어보는 사주·운세·상담·궁합.",
  status: "준비중" as const,
  releaseEta: "출시 알림 신청",
  platforms: ["iOS", "Android"] as const,
  hero: "/saju/hero.png",
  features: [
    {
      title: "사주",
      description:
        "전통 사주 8자 풀이를 외계인 관찰자의 시선으로 친근하게 재해석.",
    },
    {
      title: "운세",
      description: "일·주·월·년 단위 운세를 가볍게 확인.",
    },
    {
      title: "상담",
      description:
        "사주 자료 기반의 AI 1:1 상담. 어디서 답을 가져왔는지 추적 가능.",
    },
    {
      title: "궁합",
      description: "두 사람의 사주를 합쳐 풀어보는 궁합 분석.",
    },
  ],
} as const;
