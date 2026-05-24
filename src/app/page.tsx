import { About } from "@/components/site/about";
import { Hero } from "@/components/site/hero";
import { PortfolioSection } from "@/components/site/portfolio-section";
import { Section } from "@/components/site/section";
import { TeamSection } from "@/components/site/team-section";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <TeamSection />

      <PortfolioSection />

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
