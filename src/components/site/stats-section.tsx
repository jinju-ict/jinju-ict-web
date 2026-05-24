import { InViewFade } from "@/components/site/in-view-fade";

type Stat = {
  value: string;
  label: string;
  sub: string;
};

const STATS: Stat[] = [
  {
    value: "8+",
    label: "Production Projects",
    sub: "AI · 웹 · 모바일 전 레이어",
  },
  {
    value: "3",
    label: "Owned Service Lineup",
    sub: "사주 외 2종 준비 중",
  },
  {
    value: "2",
    label: "In-house Harnesses",
    sub: "Ralph 기반 · shipping-quality",
  },
  {
    value: "Claude · Gemini · Grok",
    label: "Multi-model Production",
    sub: "프로덕션 채택 모델",
  },
];

export function StatsSection() {
  return (
    <section
      aria-label="진주 정보통신 — production 지표"
      className="relative w-full bg-background py-12 sm:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <InViewFade>
          <ul
            role="list"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {STATS.map((stat) => (
              <li
                key={stat.label}
                className="flex flex-col gap-2 rounded-sm border-2 border-border bg-card px-5 py-5 shadow-sm transition-colors duration-150 hover:border-foreground sm:px-6 sm:py-6"
              >
                <p className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">
                  {stat.label}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {stat.sub}
                </p>
              </li>
            ))}
          </ul>
        </InViewFade>
      </div>
    </section>
  );
}
