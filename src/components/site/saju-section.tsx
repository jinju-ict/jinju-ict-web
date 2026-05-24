import Image from "next/image";
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
                className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-card/70"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-background/70 text-[11px] font-semibold text-primary"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base font-semibold tracking-tight">
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
              className="group/cta h-12 rounded-full px-6 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              <Link href="#contact">
                <Sparkles aria-hidden="true" />
                출시 알림 신청
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover/cta:translate-x-0.5"
                />
              </Link>
            </Button>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Apple className="h-4 w-4" aria-hidden="true" />
                iOS
              </span>
              <span aria-hidden="true" className="text-border">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                Android
              </span>
              <span aria-hidden="true" className="text-border">
                ·
              </span>
              <span className="rounded-full border border-border/60 bg-card/50 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
                {SAJU.status}
              </span>
            </div>
          </div>
        </div>

        {/* 우: 모바일 mockup */}
        <div className="relative mx-auto w-full max-w-[300px]">
          {/* Backdrop glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-16 bg-gradient-to-br from-primary/30 via-accent/20 to-fuchsia-500/20 blur-3xl"
          />
          {/* Device frame */}
          <div className="relative aspect-[9/19] rounded-[2.5rem] border border-border/80 bg-card p-2.5 shadow-2xl shadow-primary/20 transition-transform duration-500 hover:-rotate-1 hover:scale-[1.02]">
            {/* Notch / dynamic island */}
            <div
              aria-hidden="true"
              className="absolute top-3 left-1/2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-background"
            />
            {/* Inner screen */}
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-background">
              <Image
                src={SAJU.hero}
                alt={`${SAJU.appName} 앱 화면 (가제)`}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 300px, 80vw"
                priority={false}
              />
            </div>
          </div>
          {/* Floating chip */}
          <div className="pointer-events-none absolute -right-2 -bottom-2 rotate-3 rounded-full border border-border/60 bg-background/90 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur-md sm:right-0 sm:-bottom-4 sm:rotate-6">
            Coming Soon
          </div>
        </div>
      </div>
    </Section>
  );
}
