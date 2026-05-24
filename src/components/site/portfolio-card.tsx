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
import { cn } from "@/lib/utils";
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
      className="block h-full cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="group/proj relative flex h-full flex-col overflow-hidden border-border/60 bg-card/40 p-0 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-card/70 hover:shadow-xl hover:shadow-primary/5">
      {/* ---------- Thumbnail (gradient + 이니셜 placeholder) ---------- */}
      <div
        aria-hidden="true"
        className={cn(
          "relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br transition-transform duration-500 group-hover/proj:scale-[1.04]",
          project.accent,
        )}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage:
              "radial-gradient(ellipse at center, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black, transparent 75%)",
          }}
        />
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />
        {/* Asset or initials */}
        {thumbnailSrc ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center p-12">
            <Image
              src={thumbnailSrc}
              alt={`${project.title} 썸네일`}
              width={240}
              height={240}
              className="h-full w-auto max-w-full object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
              sizes="(min-width: 1024px) 240px, (min-width: 640px) 40vw, 60vw"
            />
          </div>
        ) : (
          <>
            {/* Floating dots — placeholder 시각 디테일 */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-[18%] left-[14%] h-1.5 w-1.5 rounded-full bg-white/60 blur-[1px]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-[28%] right-[18%] h-2 w-2 rounded-full bg-white/40 blur-[2px]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[22%] left-[22%] h-2.5 w-2.5 rounded-full bg-white/35 blur-[3px]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[18%] right-[14%] h-1 w-1 rounded-full bg-white/70"
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white/95 backdrop-blur-[3px] transition-transform duration-500 group-hover/proj:scale-110 group-hover/proj:rotate-[-4deg]">
                <Icon
                  aria-hidden="true"
                  className="h-7 w-7 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                />
              </div>
              <span className="select-none text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/80 mix-blend-overlay">
                {initials}
              </span>
            </div>
          </>
        )}

        {project.comingSoon && (
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-white backdrop-blur-md"
          >
            Coming Soon
          </Badge>
        )}
      </div>

      {/* ---------- Body ---------- */}
      <CardHeader className="space-y-2 px-6 pt-6">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-primary">
          {project.categoryLabel}
        </p>
        <CardTitle className="text-xl font-semibold tracking-tight">
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
              className="rounded-full border border-border/40 bg-secondary/40 px-2.5 py-0.5 text-[10.5px] font-medium text-muted-foreground"
            >
              {s}
            </Badge>
          ))}
          {overflowStack > 0 && (
            <Badge
              variant="secondary"
              className="rounded-full border border-border/40 bg-secondary/40 px-2.5 py-0.5 text-[10.5px] font-medium text-muted-foreground"
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
