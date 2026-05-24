import { About } from "@/components/site/about";
import { Hero } from "@/components/site/hero";
import { Section } from "@/components/site/section";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

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
