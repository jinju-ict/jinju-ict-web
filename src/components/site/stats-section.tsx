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
      aria-label="진주 정보통신개발 — production 지표"
      className="relative w-full py-12 sm:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <InViewFade>
          <ul
            role="list"
            className="grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 lg:gap-2"
          >
            {STATS.map((stat) => (
              <li
                key={stat.label}
                className="group/stat relative flex flex-col gap-1.5 rounded-xl border border-white/[0.06] bg-gradient-to-br from-[oklch(0.18_0.018_260)] via-[oklch(0.16_0.015_260)] to-[oklch(0.14_0.015_260)] px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-[oklch(0.19_0.02_265)] sm:px-6 sm:py-6"
              >
                <p
                  className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, var(--foreground) 0%, color-mix(in oklch, var(--primary) 65%, var(--foreground)) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary/90 sm:text-xs">
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
