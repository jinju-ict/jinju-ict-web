import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[80vh] items-center bg-background"
    >
      <div className="relative mx-auto w-full max-w-5xl px-6 py-20 text-center sm:px-8 sm:py-28">
        <div className="inline-flex items-center gap-2 rounded-sm border-2 border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground">
          <Sparkles
            className="h-3.5 w-3.5 text-foreground"
            aria-hidden="true"
          />
          AI 정예 개발사 · 진주 정보통신
        </div>

        <h1 className="mt-7 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          AI 가 일하는 방식이 곧
          <br className="hidden sm:block" />{" "}
          <span className="text-foreground font-bold">우리의 일하는 방식</span>입니다.
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          Claude · Gemini · Grok 등 멀티 모델을 production 으로 운영해 온 정예 팀이,
          <br className="hidden sm:block" />
          자체 에이전틱 워크플로우로 비전부터 배포·운영까지 단일 흐름에 묶습니다.
          <br className="hidden sm:block" />
          자체 서비스 라인업과 협업·외주 의뢰 모두 정성·속도·안정성을 동시에 충족합니다.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-sm border-2 border-primary bg-primary px-7 text-base text-primary-foreground shadow-sm transition-colors duration-150 hover:border-foreground hover:bg-foreground"
          >
            <Link href="#saju">
              사주 서비스 보기
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-sm border-2 border-foreground bg-transparent px-7 text-base text-foreground transition-colors duration-150 hover:bg-foreground hover:text-background"
          >
            <Link href="#portfolio">솔루션 보기</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="h-12 rounded-sm px-7 text-base text-foreground transition-colors duration-150 hover:bg-muted"
          >
            <Link href="#contact">프로젝트 문의</Link>
          </Button>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-2 text-xs text-foreground sm:text-sm">
          <span className="inline-flex items-center gap-2 rounded-sm border border-border bg-muted px-3 py-1.5 text-foreground">
            Claude · Gemini production 경험
          </span>
          <span className="inline-flex items-center gap-2 rounded-sm border border-border bg-muted px-3 py-1.5 text-foreground">
            자체 에이전틱 워크플로우
          </span>
          <span className="inline-flex items-center gap-2 rounded-sm border border-border bg-muted px-3 py-1.5 text-foreground">
            보안 · 운영 경험
          </span>
        </div>
      </div>
    </section>
  );
}
