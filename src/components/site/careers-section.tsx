import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Smartphone,
  Sparkles,
  Compass,
} from "lucide-react";
import { Section } from "@/components/site/section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Position = {
  slug: string;
  icon: typeof Bot;
  role: string;
  oneLiner: string;
  looking: string;
  doing: string;
  environment: string;
};

const POSITIONS: Position[] = [
  {
    slug: "ai-product-engineer",
    icon: Bot,
    role: "AI / Product Engineer",
    oneLiner:
      "AI 에이전트를 production 에서 다루며, 아이디어를 실제 제품으로 만드는 풀스택 엔지니어.",
    looking:
      "AI 에이전트 production 운영 경험, agentic workflow 설계 감각, 프론트·백·인프라를 가로지르는 풀스택 기반",
    doing:
      "자체 서비스 라인업과 협업 프로젝트의 AI 코어 설계·구현, tool-use·장기 기억·RAG 등 응용 아키텍처 주도",
    environment:
      "자체 하네스 기반 빠른 사이클, 모델·프롬프트·평가까지 한 사람이 끝까지 책임지는 환경",
  },
  {
    slug: "mobile-app-engineer",
    icon: Smartphone,
    role: "Mobile / App Engineer",
    oneLiner:
      "Kotlin (Compose) 또는 Flutter 로 앱을 출시한 경험이 있는 모바일 엔지니어.",
    looking:
      "Kotlin (Jetpack Compose) 또는 Flutter production 출시 경험, 디자인 시스템·접근성·성능 감각",
    doing:
      "사주 앱을 비롯한 자체 앱 라인업의 신규 개발과 운영, AI 기능의 모바일 통합 (on-device / 서버 연동)",
    environment:
      "디자인·기획과 같은 테이블에서 의사결정, 정성 우선 — 작은 디테일에 시간을 쓰는 것이 허용되는 호흡",
  },
  {
    slug: "designer-product-strategist",
    icon: Sparkles,
    role: "Designer / Product Strategist",
    oneLiner:
      "디자인과 제품 기획을 함께 다루는 분. AI 도구를 자유롭게 활용.",
    looking:
      "사용자 흐름·정보 구조 설계 경험, Figma·AI 기반 워크플로우 OK",
    doing:
      "자체 서비스·클라이언트 프로젝트의 비주얼·UX·랜딩 카피 책임, 디자인 시스템과 모션 가이드 정립",
    environment:
      "엔지니어와 같은 언어로 협업, 디자인이 코드까지 끝까지 살아남도록 검수·합의가 자연스러운 팀",
  },
];

export function CareersSection() {
  return (
    <Section
      id="careers"
      eyebrow="Careers · 합류하기"
      title="함께 일할 분을 찾습니다"
      lead="직군이 정확히 맞지 않아도 괜찮습니다. AI 가 일하는 방식에 익숙하고, 자체 서비스와 협업 프로젝트를 함께 만들 분께 열려 있습니다."
      align="center"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {POSITIONS.map(({ slug, icon: Icon, role, oneLiner, looking, doing, environment }) => (
          <Card
            key={slug}
            className="relative flex h-full flex-col rounded-sm border-2 border-border bg-card shadow-sm transition-colors duration-150 hover:border-foreground"
          >
            <CardHeader className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-sm border-2 border-border bg-muted text-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                  {role}
                </CardTitle>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {oneLiner}
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <ul className="space-y-3 text-sm leading-relaxed">
                <li className="flex flex-col gap-1">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground">
                    찾는 분
                  </span>
                  <span className="text-muted-foreground">{looking}</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground">
                    함께하는 일
                  </span>
                  <span className="text-muted-foreground">{doing}</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground">
                    환경
                  </span>
                  <span className="text-muted-foreground">{environment}</span>
                </li>
              </ul>
              <div className="mt-auto pt-2">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="-ml-2 rounded-sm text-foreground hover:bg-muted hover:text-foreground"
                >
                  <Link href="#contact" aria-label={`${role} 지원하기`}>
                    지원하기
                    <ArrowRight
                      className="ml-1 h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 sm:mt-16">
        <Card className="relative rounded-sm border-2 border-border bg-card shadow-sm transition-colors duration-150 hover:border-foreground">
          <CardContent className="flex flex-col gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="flex items-start gap-4 lg:flex-1">
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-sm border-2 border-border bg-muted text-foreground sm:inline-flex">
                <Compass className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                  Open Application
                </p>
                <h3 className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  정해진 포지션 외에도 의미 있는 합류는 모두 검토합니다
                </h3>
                <p className="text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
                  직군이 정확히 맞지 않아도 괜찮습니다. 한 줄 자기소개와 함께 어떤 일을 하고 싶은지 보내주세요. 진지하게 읽고, 진지하게 답장 드립니다.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-sm border-2 border-primary bg-primary px-5 text-sm text-primary-foreground hover:border-foreground hover:bg-foreground"
              >
                <Link href="#contact">
                  한 줄 자기소개 보내기
                  <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
