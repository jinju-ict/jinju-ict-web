import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/portfolio";

interface PortfolioCardProps {
  project: Project;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const initials =
    project.title.replace(/\s+/g, "").slice(0, 2).toUpperCase() || "··";
  const visibleStack = project.stack.slice(0, 5);
  const overflowStack = project.stack.length - visibleStack.length;

  return (
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
        {/* Initials */}
        <div className="absolute inset-0 flex items-center justify-center">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={`${project.title} 썸네일`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <span className="select-none text-5xl font-bold tracking-tight text-white/95 mix-blend-overlay drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
              {initials}
            </span>
          )}
        </div>

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
  );
}
