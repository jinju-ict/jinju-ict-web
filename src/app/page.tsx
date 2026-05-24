import { Section } from "@/components/site/section";

export default function Home() {
  return (
    <>
      <Section id="hero" bare className="flex min-h-[60vh] items-center">
        <div className="mx-auto max-w-3xl py-32 text-center sm:py-40">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            AI 정예 개발사
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            진주 ICT
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            (Hero 섹션은 다음 iteration 에서 본격 작성됩니다.)
          </p>
        </div>
      </Section>

      <Section
        id="about"
        eyebrow="회사 소개"
        title="회사 소개 섹션"
        lead="다음 iteration 에서 채워집니다."
      />

      <Section
        id="team"
        eyebrow="팀"
        title="팀 소개 섹션"
        lead="다음 iteration 에서 채워집니다."
      />

      <Section
        id="portfolio"
        eyebrow="포트폴리오"
        title="프로젝트 8선"
        lead="다음 iteration 에서 채워집니다."
      />

      <Section
        id="saju"
        eyebrow="자체 서비스"
        title="사주 서비스"
        lead="다음 iteration 에서 채워집니다. (Coming Soon)"
      />

      <Section
        id="contact"
        eyebrow="협업·문의"
        title="프로젝트 문의"
        lead="다음 iteration 에서 채워집니다."
      />
    </>
  );
}
