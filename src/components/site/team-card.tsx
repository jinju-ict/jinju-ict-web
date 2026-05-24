import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TeamMember } from "@/lib/team";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const { initials, displayName, role, oneLiner, strengths, gradient } =
    member;

  return (
    <Card className="group/team relative overflow-hidden border-border/60 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-card/70 hover:shadow-xl hover:shadow-primary/5">
      {/* Subtle aurora on hover */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover/team:opacity-100",
          gradient,
        )}
      />

      <CardHeader className="flex flex-row items-center gap-5 space-y-0">
        <div
          aria-hidden="true"
          className={cn(
            "relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-bold text-primary-foreground shadow-lg ring-1 ring-inset ring-white/10 transition-transform duration-500 group-hover/team:rotate-3 group-hover/team:scale-105",
            gradient,
          )}
        >
          <span className="text-sm tracking-wide">{initials}</span>
        </div>
        <div className="min-w-0 space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight">
            {displayName}
          </CardTitle>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {role}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {oneLiner}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {strengths.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="rounded-full border border-border/40 bg-secondary/40 text-xs font-medium text-muted-foreground"
            >
              {s}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
