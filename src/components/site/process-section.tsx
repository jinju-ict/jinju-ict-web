import { Compass, DraftingCompass, Hammer, Rocket } from "lucide-react";
import { Section } from "@/components/site/section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProcessStep = {
  step: string;
  name: string;
  summary: string;
  icon: typeof Compass;
  details: readonly string[];
};

const STEPS: readonly ProcessStep[] = [
  {
    step: "00",
    name: "Discover",
    summary: "비전·요구사항·기술 트레이드오프를 한 번에 정리합니다.",
    icon: Compass,
    details: [
      "vision-intake 인터뷰로 의도와 성공 기준 동결",
      "brainstorm 으로 도메인 가설·제약 조건 발굴",
      "기술 옵션별 운영 비용·리스크 사전 비교",
    ],
  },
  {
    step: "01",
    name: "Design",
    summary: "아키텍처·데이터·인터페이스 설계와 위험을 함께 식별합니다.",
    icon: DraftingCompass,
    details: [
      "designing-direction 으로 컴포넌트 경계 확정",
      "데이터 모델·외부 인터페이스 계약 문서화",
      "보안·성능·실패 시나리오 사전 등록",
    ],
  },
  {
    step: "02",
    name: "Build",
    summary: "TDD task 분해와 병렬 wave 로 빠르고 안전하게 구현합니다.",
    icon: Hammer,
    details: [
      "executing-plans 로 plan → bite-sized task 분해",
      "의존성 없는 task 는 wave 단위 병렬 dispatch",
      "lint · typecheck · security 자동 검증 게이트",
    ],
  },
  {
    step: "03",
    name: "Ship",
    summary: "보안·정성·성능 자가 점검 후 배포와 인수인계까지 마무리합니다.",
    icon: Rocket,
    details: [
      "verification 으로 end-to-end 실동작 확인",
      "SETUP 문서·런북·환경 변수 인수인계",
      "운영 모니터링 포인트와 회귀 게이트 합의",
    ],
  },
] as const;

export function ProcessSection() {
  return (
    <Section
      id="process"
      eyebrow="일하는 방식"
      title="발견 → 설계 → 구현 → 배포, 4단계 워크플로우"
      lead="모든 프로젝트가 동일한 워크플로우로 묶여 있어, 같은 수준의 품질과 속도로 마무리됩니다."
      align="center"
    >
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {STEPS.map(({ step, name, summary, icon: Icon, details }) => (
          <Card
            key={step}
            className="relative flex h-full flex-col rounded-sm border-2 border-border border-t-4 border-t-foreground bg-card shadow-sm transition-colors duration-150 hover:border-foreground"
          >
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.12em] text-muted-foreground">
                  {step}
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm border-2 border-border bg-muted text-foreground">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-lg font-bold tracking-tight text-foreground">
                  {name}
                </CardTitle>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {summary}
                </p>
              </div>
            </CardHeader>
            <CardContent className="mt-auto">
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 flex-none rounded-full bg-foreground"
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
