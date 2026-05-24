import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  MessageCircleHeart,
  Newspaper,
  Scale,
  ShieldCheck,
  Smartphone,
  Video,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project, ProjectIconName } from "@/lib/portfolio";
import { PORTFOLIO_ASSETS } from "@/lib/portfolio-assets";

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

interface PortfolioCardProps {
  project: Project;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const initials =
    project.title.replace(/\s+/g, "").slice(0, 2).toUpperCase() || "··";
  const visibleStack = project.stack.slice(0, 5);
  const overflowStack = project.stack.length - visibleStack.length;
  const thumbnailSrc = project.thumbnail ?? PORTFOLIO_ASSETS[project.slug]?.thumbnail;
  const Icon = ICON_MAP[project.icon];

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      aria-label={`${project.title} 상세 보기`}
      className="block h-full cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="group/proj relative flex h-full flex-col overflow-hidden rounded-sm border-2 border-border bg-card p-0 shadow-sm transition-colors duration-150 hover:border-foreground">
      {/* ---------- Thumbnail (회색 BG + 이니셜 placeholder) ---------- */}
      <div
        aria-hidden="true"
        className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-muted"
      >
        {/* Grid pattern — 매우 미세하게 */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(to right, var(--border) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Asset or initials */}
        {thumbnailSrc ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center p-12">
            <Image
              src={thumbnailSrc}
              alt={`${project.title} 썸네일`}
              width={240}
              height={240}
              className="h-full w-auto max-w-full object-contain"
              sizes="(min-width: 1024px) 240px, (min-width: 640px) 40vw, 60vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-sm border-2 border-border bg-card text-foreground">
              <Icon aria-hidden="true" className="h-7 w-7" />
            </div>
            <span className="select-none text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {initials}
            </span>
          </div>
        )}

        {project.comingSoon && (
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 rounded-sm border border-border bg-card px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-foreground"
          >
            Coming Soon
          </Badge>
        )}
      </div>

      {/* ---------- Body ---------- */}
      <CardHeader className="space-y-2 px-6 pt-6">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {project.categoryLabel}
        </p>
        <CardTitle className="text-xl font-bold tracking-tight text-foreground">
          {project.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-5 px-6 pb-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.oneLiner}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {visibleStack.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="rounded-sm border border-border bg-muted px-2.5 py-0.5 text-[10.5px] font-medium text-foreground"
            >
              {s}
            </Badge>
          ))}
          {overflowStack > 0 && (
            <Badge
              variant="secondary"
              className="rounded-sm border border-border bg-muted px-2.5 py-0.5 text-[10.5px] font-medium text-foreground"
            >
              +{overflowStack}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
