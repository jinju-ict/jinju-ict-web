import Link from "next/link";
import { Apple, ArrowRight, Smartphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { SAJU } from "@/lib/saju";

export function SajuSection() {
  return (
    <Section
      id="saju"
      eyebrow="자체 서비스 · 준비중"
      title={SAJU.tagline}
      lead={SAJU.description}
      align="center"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_minmax(280px,360px)] lg:gap-16">
        {/* 좌: features + CTA */}
        <div className="space-y-8">
          <ul className="grid gap-3 sm:grid-cols-2">
            {SAJU.features.map((f, i) => (
              <li
                key={f.title}
                className="rounded-sm border-2 border-border bg-card p-5 shadow-sm transition-colors duration-150 hover:border-foreground"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-sm border-2 border-border bg-muted text-[11px] font-semibold text-foreground"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base font-bold tracking-tight text-foreground">
                    {f.title}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-sm border-2 border-primary bg-primary px-6 text-base text-primary-foreground shadow-sm transition-colors duration-150 hover:border-foreground hover:bg-foreground"
            >
              <Link href="#contact">
                <Sparkles aria-hidden="true" />
                출시 알림 신청
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <Apple className="h-4 w-4" aria-hidden="true" />
                iOS
              </span>
              <span aria-hidden="true" className="text-border">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                Android
              </span>
              <span aria-hidden="true" className="text-border">
                ·
              </span>
              <span className="rounded-sm border-2 border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                {SAJU.status}
              </span>
            </div>
          </div>
        </div>

        {/* 우: 모바일 mockup placeholder — 디자인 동결 전 */}
        <div className="mx-auto flex w-full max-w-[300px] flex-col items-center gap-4">
          <div className="relative aspect-[9/19] w-full rounded-md border-2 border-border bg-card p-2.5 shadow-sm">
            <div
              aria-hidden="true"
              className="absolute top-3 left-1/2 z-20 h-5 w-24 -translate-x-1/2 rounded-sm bg-background"
            />
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-sm bg-muted px-6 text-center">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {SAJU.appName}
              </span>
              <p className="text-sm font-bold text-foreground">
                앱 디자인 준비 중
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                출시 시점에 실제 화면으로 갱신됩니다.
              </p>
            </div>
            <div className="pointer-events-none absolute -right-2 -bottom-2 rounded-sm border-2 border-border bg-card px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-foreground shadow-sm">
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
