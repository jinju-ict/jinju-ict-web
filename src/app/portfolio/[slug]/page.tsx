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
import { WorkflowHarness } from "@/components/site/workflow-harness";
import { WorkflowSafety } from "@/components/site/workflow-safety";

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
      title: "솔루션을 찾을 수 없습니다",
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
      <header className="relative w-full border-b-2 border-border bg-muted">
        <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
          {/* 우상단 back link */}
          <div className="mb-10 flex items-center justify-between gap-4">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              모든 솔루션
            </Link>
            {project.comingSoon && (
              <Badge
                variant="secondary"
                className="rounded-sm border border-border bg-card px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-foreground"
              >
                Coming Soon
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-3xl space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {project.categoryLabel}
              </p>
              <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>
              <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                {project.oneLiner}
              </p>
            </div>

            {/* Icon medallion */}
            <div className="hidden shrink-0 lg:block">
              <div className="flex h-20 w-20 items-center justify-center rounded-sm border-2 border-border bg-card shadow-sm">
                <Icon
                  aria-hidden="true"
                  className="h-9 w-9 text-foreground"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl space-y-16 px-6 py-16 sm:space-y-20 sm:px-8 sm:py-20 lg:space-y-24 lg:py-24">
        {/* ============ 2. Problem / Approach ============ */}
        <section aria-labelledby="problem-approach-title">
          <h2 id="problem-approach-title" className="sr-only">
            문제와 접근
          </h2>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Problem */}
            <div className="rounded-sm border-2 border-border bg-card p-8 shadow-sm sm:p-10">
              <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Problem
              </p>
              <h3 className="mb-5 text-2xl font-bold tracking-tight text-foreground">
                풀어야 했던 것
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.problem}
              </p>
            </div>

            {/* Approach */}
            <div className="rounded-sm border-2 border-border bg-card p-8 shadow-sm sm:p-10">
              <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Approach
              </p>
              <h3 className="mb-5 text-2xl font-bold tracking-tight text-foreground">
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
                      className="mt-1 h-4 w-4 shrink-0 text-foreground"
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
          <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Architecture
          </p>
          <h2
            id="architecture-title"
            className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            아키텍처
          </h2>
          <div className="rounded-sm border-2 border-border bg-card p-8 shadow-sm sm:p-10">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.architecture}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="rounded-sm border border-border bg-muted px-3 py-1 text-[11px] font-medium text-foreground"
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          {/* 자체 인프라 — 워크플로우 시각화 embed */}
          {project.slug === "dev-harness" && <WorkflowHarness className="mt-8" />}
          {project.slug === "dev-safety" && <WorkflowSafety className="mt-8" />}
        </section>

        {/* ============ 4. Features ============ */}
        <section aria-labelledby="features-title">
          <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Features
          </p>
          <h2
            id="features-title"
            className="mb-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            핵심 기능
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex gap-3 rounded-sm border-2 border-border bg-card p-5 shadow-sm"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-foreground"
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
            <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Outcomes
            </p>
            <h2
              id="outcomes-title"
              className="mb-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              산출 · 결과
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.outcomes.map((outcome, idx) => (
                <div
                  key={outcome}
                  className="flex h-full flex-col gap-3 rounded-sm border-2 border-border bg-card p-6 shadow-sm"
                >
                  <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============ 6. Screens ============ */}
        <section aria-labelledby="screens-title">
          <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Screens
          </p>
          <h2
            id="screens-title"
            className="mb-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
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
                  className="relative overflow-hidden rounded-sm border-2 border-border bg-card p-4 shadow-sm"
                >
                  <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-sm bg-muted">
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
            <div className="relative overflow-hidden rounded-sm border-2 border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-sm border border-border bg-muted">
                <div className="relative flex items-center justify-center p-12">
                  <Image
                    src={thumbnail}
                    alt={`${project.title} 썸네일`}
                    width={420}
                    height={420}
                    className="h-full max-h-[360px] w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-sm border-2 border-border bg-muted shadow-sm">
              <div className="relative flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-sm border-2 border-border bg-card text-foreground">
                  <Icon aria-hidden="true" className="h-8 w-8" />
                </div>
                <span className="select-none font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {initials}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* ============ 7. 하단 CTA ============ */}
        <section
          aria-labelledby="cta-title"
          className="relative overflow-hidden rounded-sm border-2 border-border bg-card shadow-sm"
        >
          <div className="relative flex flex-col items-start gap-8 p-10 sm:p-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl space-y-4">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                같이 만들기
              </p>
              <h2
                id="cta-title"
                className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                이 솔루션 같이 만들기
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
                <Link href="/#portfolio">다른 솔루션 보기</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
