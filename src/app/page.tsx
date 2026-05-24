import { About } from "@/components/site/about";
import { ContactSection } from "@/components/site/contact-section";
import { Hero } from "@/components/site/hero";
import { PortfolioSection } from "@/components/site/portfolio-section";
import { SajuSection } from "@/components/site/saju-section";
import { TeamSection } from "@/components/site/team-section";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <TeamSection />

      <PortfolioSection />

      <SajuSection />

      <ContactSection />
    </>
  );
}
