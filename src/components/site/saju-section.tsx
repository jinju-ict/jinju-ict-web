import Image from "next/image";
import Link from "next/link";
import { Apple, ArrowRight, Smartphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { SAJU } from "@/lib/saju";

export function SajuSection() {
  const subScreens: readonly string[] = (SAJU as { screens?: readonly string[] })
    .screens ?? [];

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

        {/* 우: 모바일 mockup + sub-thumbnails */}
        <div className="mx-auto flex w-full max-w-[300px] flex-col items-center gap-4">
          {/* Device frame (회색 보더, glow 제거) */}
          <div className="relative aspect-[9/19] w-full rounded-md border-2 border-border bg-card p-2.5 shadow-sm">
            {/* Notch / dynamic island */}
            <div
              aria-hidden="true"
              className="absolute top-3 left-1/2 z-20 h-5 w-24 -translate-x-1/2 rounded-sm bg-background"
            />
            {/* Inner screen */}
            <div className="relative h-full w-full overflow-hidden rounded-sm bg-background">
              <Image
                src={SAJU.hero}
                alt={`${SAJU.appName} 앱 화면 (가제)`}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 300px, 80vw"
                priority={false}
              />
            </div>
            {/* Coming Soon chip */}
            <div className="pointer-events-none absolute -right-2 -bottom-2 rounded-sm border-2 border-border bg-card px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-foreground shadow-sm">
              Coming Soon
            </div>
          </div>

          {/* Sub thumbnails — SAJU.screens 가 있으면 1~2장 */}
          {subScreens.length > 0 && (
            <ul
              role="list"
              className="grid w-full grid-cols-2 gap-3"
            >
              {subScreens.slice(0, 2).map((src, idx) => (
                <li
                  key={src}
                  className="relative aspect-[9/16] w-full overflow-hidden rounded-sm border-2 border-border bg-card shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`${SAJU.appName} 보조 화면 ${idx + 1}`}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 144px, 40vw"
                    priority={false}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
