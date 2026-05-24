import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  MessageCircleHeart,
  Newspaper,
  Scale,
  ShieldCheck,
  Smartphone,
  Video,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROJECTS, type ProjectIconName } from "@/lib/portfolio";
import { PORTFOLIO_ASSETS } from "@/lib/portfolio-assets";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const ICON_MAP: Record<ProjectIconName, LucideIcon> = {
  MessageCircleHeart,
  Video,
  Scale,
  Smartphone,
  Briefcase,
  Newspaper,
  Workflow,
  ShieldCheck,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "프로젝트를 찾을 수 없습니다",
    };
  }

  const title = `${project.title} — ${project.categoryLabel}`;
  const description = project.description;
  const canonical = `${SITE_URL}/portfolio/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title: `${project.title} | ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${SITE_NAME}`,
      description,
    },
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const Icon = ICON_MAP[project.icon];
  const assets = PORTFOLIO_ASSETS[project.slug];
  const screens = assets?.screens ?? [];
  const thumbnail = project.thumbnail ?? assets?.thumbnail;
  const initials =
    project.title.replace(/\s+/g, "").slice(0, 2).toUpperCase() || "··";

  return (
    <article className="relative w-full">
      {/* ============ 1. 상단 Hero ribbon ============ */}
      <header className="relative w-full overflow-hidden border-b border-white/10">
        {/* Accent gradient ribbon — 절제된 backdrop */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-[0.22]",
            project.accent,
          )}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background"
        />
        {/* Subtle grid mask */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at top, black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at top, black, transparent 70%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
          {/* 우상단 back link */}
          <div className="mb-10 flex items-center justify-between gap-4">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              모든 프로젝트
            </Link>
            {project.comingSoon && (
              <Badge
                variant="secondary"
                className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-foreground/85 backdrop-blur-md"
              >
                Coming Soon
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-3xl space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {project.categoryLabel}
              </p>
              <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>
              <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                {project.oneLiner}
              </p>
            </div>

            {/* Icon medallion */}
            <div className="hidden shrink-0 lg:block">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <Icon
                  aria-hidden="true"
                  className="h-9 w-9 text-foreground/80"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl space-y-20 px-6 py-20 sm:space-y-24 sm:px-8 sm:py-24 lg:space-y-28 lg:py-28">
        {/* ============ 2. Problem / Approach ============ */}
        <section aria-labelledby="problem-approach-title">
          <h2 id="problem-approach-title" className="sr-only">
            문제와 접근
          </h2>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Problem */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10">
              <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary">
                Problem
              </p>
              <h3 className="mb-5 text-2xl font-semibold tracking-tight text-foreground">
                풀어야 했던 것
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.problem}
              </p>
            </div>

            {/* Approach */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10">
              <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary">
                Approach
              </p>
              <h3 className="mb-5 text-2xl font-semibold tracking-tight text-foreground">
                어떻게 풀었나
              </h3>
              <ul className="space-y-3.5">
                {project.approach.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-primary/85"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============ 3. Architecture ============ */}
        <section aria-labelledby="architecture-title">
          <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary">
            Architecture
          </p>
          <h2
            id="architecture-title"
            className="mb-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            아키텍처
          </h2>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.architecture}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="rounded-full border border-primary/25 bg-primary/[0.08] px-3 py-1 text-[11px] font-medium text-foreground/85"
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4. Features ============ */}
        <section aria-labelledby="features-title">
          <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary">
            Features
          </p>
          <h2
            id="features-title"
            className="mb-8 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            핵심 기능
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary/85"
                />
                <span className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ============ 5. Outcomes (있을 때만) ============ */}
        {project.outcomes && project.outcomes.length > 0 && (
          <section aria-labelledby="outcomes-title">
            <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary">
              Outcomes
            </p>
            <h2
              id="outcomes-title"
              className="mb-8 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              산출 · 결과
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.outcomes.map((outcome, idx) => (
                <div
                  key={outcome}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
                >
                  <span className="font-mono text-xs font-semibold tracking-wider text-primary/85">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============ 6. Screens ============ */}
        <section aria-labelledby="screens-title">
          <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary">
            Screens
          </p>
          <h2
            id="screens-title"
            className="mb-8 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            화면 · 자산
          </h2>

          {screens.length > 0 ? (
            <div
              className={cn(
                "grid gap-5",
                screens.length === 1
                  ? "sm:grid-cols-1"
                  : screens.length === 2
                    ? "sm:grid-cols-2"
                    : "sm:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {screens.map((src, idx) => (
                <div
                  key={src}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
                >
                  <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-xl bg-black/20">
                    <Image
                      src={src}
                      alt={`${project.title} 화면 ${idx + 1}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : thumbnail ? (
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
              <div
                className={cn(
                  "relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br",
                  project.accent,
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                <div className="relative flex items-center justify-center p-12">
                  <Image
                    src={thumbnail}
                    alt={`${project.title} 썸네일`}
                    width={420}
                    height={420}
                    className="h-full max-h-[360px] w-auto object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br backdrop-blur-xl",
                project.accent,
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              <div className="relative flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-foreground/90 backdrop-blur-[3px]">
                  <Icon aria-hidden="true" className="h-8 w-8" />
                </div>
                <span className="select-none font-mono text-xs font-semibold uppercase tracking-[0.22em] text-foreground/70">
                  {initials}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* ============ 7. 하단 CTA ============ */}
        <section
          aria-labelledby="cta-title"
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-[0.18]",
              project.accent,
            )}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30"
          />
          <div className="relative flex flex-col items-start gap-8 p-10 sm:p-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl space-y-4">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary">
                같이 만들기
              </p>
              <h2
                id="cta-title"
                className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              >
                이런 프로젝트, 같이 만들어 볼까요?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                자체 서비스 · 클라이언트 의뢰 · 사내 자동화까지 — 가치 있는
                작업이라면 폭넓게 검토합니다. 한 줄 설명만 보내주세요.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="px-5">
                <Link href="/#contact">
                  프로젝트 문의
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-5">
                <Link href="/#portfolio">다른 프로젝트 보기</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
