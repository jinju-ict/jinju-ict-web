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
    title: "AI 전문성",
    body: "AI 에이전트, AI 모델, 백엔드, 앱까지. 모든 레이어를 직접 다루는 정예라 AI 시대 변화에 가장 빠르게 반응합니다.",
    glow: "from-primary/30 to-primary/0",
  },
  {
    icon: Workflow,
    title: "자체 개발 인프라",
    body: "사내 자체 하네스와 에이전틱 엔지니어링 워크플로우로 기획·구현·검증을 자동 순환. 정성과 속도가 동시에 나옵니다.",
    glow: "from-accent/30 to-accent/0",
  },
  {
    icon: Layers,
    title: "자체 서비스 + 협업, 균형",
    body: "자체 서비스를 주력으로, 협업·외주도 폭넓게. 특정 영역에 치우치지 않고 가치 있는 무엇이든 만듭니다.",
    glow: "from-primary/25 via-accent/15 to-transparent",
  },
] as const;

export function About() {
  return (
    <Section
      id="about"
      eyebrow="왜 우리인가"
      title="AI 시대, 정예가 만드는 차이"
      lead="단순한 외주 회사가 아닙니다. AI 가 일하는 방식에 익숙한 사람들이, 자체 인프라와 서비스 감각을 함께 가지고 일합니다."
      align="center"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {PILLARS.map(({ icon: Icon, title, body, glow }) => (
          <Card
            key={title}
            className="group/pillar relative overflow-hidden border-border/60 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-card/70 hover:shadow-xl hover:shadow-primary/5"
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover/pillar:opacity-100 ${glow}`}
            />
            <CardHeader className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-primary transition-colors duration-300 group-hover/pillar:border-primary/40 group-hover/pillar:text-accent">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <CardTitle className="text-xl font-semibold tracking-tight">
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
