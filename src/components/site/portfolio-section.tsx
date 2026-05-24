import {
  PROJECTS,
  CATEGORY_ORDER,
  type PortfolioCategory,
} from "@/lib/portfolio";
import { Section } from "@/components/site/section";
import { PortfolioCard } from "@/components/site/portfolio-card";

const CATEGORY_HEADERS: Record<
  PortfolioCategory,
  { label: string; sub: string }
> = {
  owned: {
    label: "자체 서비스",
    sub: "우리가 직접 기획·개발·운영하는 프로덕트입니다.",
  },
  client: {
    label: "클라이언트 의뢰",
    sub: "외부 기업의 의뢰를 받아 처음부터 끝까지 만든 작업입니다.",
  },
  internal: {
    label: "사내 개발 인프라",
    sub: "빠르고 탄탄하게 일하기 위해 직접 만든 도구입니다.",
  },
};

export function PortfolioSection() {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: PROJECTS.filter((p) => p.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <Section
      id="portfolio"
      eyebrow="솔루션"
      title="우리가 만든 것들"
      lead="자체 서비스부터 외부 의뢰, 그리고 사내 개발 인프라까지 — 우리가 실제로 무엇을 만드는지 보여드립니다."
      align="center"
    >
      <div className="space-y-16 sm:space-y-20">
        {grouped.map(({ category, items }) => (
          <div key={category}>
            <header className="mb-8 flex flex-col gap-1 border-b-2 border-border pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {CATEGORY_HEADERS[category].label}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {CATEGORY_HEADERS[category].sub}
                </p>
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {items.length} project{items.length > 1 ? "s" : ""}
              </span>
            </header>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {items.map((project) => (
                <PortfolioCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
