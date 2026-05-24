import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[88vh] items-center overflow-hidden"
    >
      {/* Background ambience — 절제된 radial 그라데이션 1개 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2"
        style={{
          width: "min(1100px, 130vw)",
          height: "min(1100px, 130vw)",
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--primary) 18%, transparent) 0%, transparent 58%)",
          filter: "blur(48px)",
        }}
      />

      {/* Grid pattern subtle overlay (정성 디테일) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(to right, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-32 text-center sm:px-8 sm:py-40">
        <div
          className="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md"
          style={{ animationDelay: "0ms" }}
        >
          <Sparkles
            className="h-3.5 w-3.5 text-primary"
            aria-hidden="true"
          />
          AI 정예 개발사 · 진주 정보통신개발
        </div>

        <h1
          className="mt-7 animate-fade-in-up text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "120ms" }}
        >
          AI 가 일하는 방식이 곧
          <br className="hidden sm:block" />{" "}
          <span className="text-primary/90">우리의 일하는 방식</span>입니다.
        </h1>

        <p
          className="mx-auto mt-7 max-w-2xl animate-fade-in-up text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "240ms" }}
        >
          Claude · Gemini · Grok 등 멀티 모델을 production 으로 운영해 온 정예 팀이,
          <br className="hidden sm:block" />
          자체 에이전틱 워크플로우로 비전부터 배포·운영까지 단일 흐름에 묶습니다.
          <br className="hidden sm:block" />
          자체 서비스 라인업과 협업·외주 의뢰 모두 정성·속도·안정성을 동시에 충족합니다.
        </p>

        <div
          className="mt-10 flex animate-fade-in-up flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: "360ms" }}
        >
          <Button
            asChild
            size="lg"
            className="group/cta h-12 rounded-full px-7 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            <Link href="#saju">
              사주 서비스 보기
              <ArrowRight
                aria-hidden="true"
                className="transition-transform group-hover/cta:translate-x-0.5"
              />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-7 text-base"
          >
            <Link href="#portfolio">포트폴리오 보기</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="h-12 rounded-full px-7 text-base"
          >
            <Link href="#contact">프로젝트 문의</Link>
          </Button>
        </div>

        <div
          className="mt-14 flex animate-fade-in-up flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs text-muted-foreground sm:text-sm"
          style={{ animationDelay: "480ms" }}
        >
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-primary"
            />
            Claude · Gemini production 경험
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-primary/70"
            />
            자체 에이전틱 워크플로우
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            보안 · 운영 leveled experience
          </span>
        </div>
      </div>
    </section>
  );
}
