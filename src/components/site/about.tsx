import { BrainCircuit, Layers, Workflow } from "lucide-react";
import { Section } from "@/components/site/section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PILLARS = [
  {
    icon: BrainCircuit,
    title: "AI 전 레이어",
    body: "AI 에이전트, 모델, 백엔드, 앱을 한 팀에서 다룹니다. 새 모델·도구가 나오면 빠르게 production 에 적용합니다.",
  },
  {
    icon: Workflow,
    title: "자체 개발 워크플로우",
    body: "자체 개발 워크플로우로 기획·구현·검증을 자동 순환합니다. 같은 품질로 빠르게 반복합니다.",
  },
  {
    icon: Layers,
    title: "자체 서비스 + 협업",
    body: "자체 서비스와 외주 협업을 함께 운영합니다. 특정 영역에 한정하지 않습니다.",
  },
] as const;

export function About() {
  return (
    <Section
      id="about"
      eyebrow="진주 정보통신 소개"
      title="어떤 회사인가요"
      lead="AI 에이전트를 production 으로 다루는 개발사입니다. 자체 서비스와 외주 협업을 함께 운영합니다."
      align="center"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {PILLARS.map(({ icon: Icon, title, body }) => (
          <Card
            key={title}
            className="rounded-sm border-2 border-border bg-card shadow-sm transition-colors duration-150 hover:border-foreground"
          >
            <CardHeader className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-sm border-2 border-border bg-muted text-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              {body}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
