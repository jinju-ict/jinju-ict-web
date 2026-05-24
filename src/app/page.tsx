import { About } from "@/components/site/about";
import { CareersSection } from "@/components/site/careers-section";
import { ContactSection } from "@/components/site/contact-section";
import { FaqSection } from "@/components/site/faq-section";
import { Hero } from "@/components/site/hero";
import { PortfolioSection } from "@/components/site/portfolio-section";
import { ProcessSection } from "@/components/site/process-section";
import { SajuSection } from "@/components/site/saju-section";
import { TeamSection } from "@/components/site/team-section";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <ProcessSection />

      <TeamSection />

      <PortfolioSection />

      <SajuSection />

      <CareersSection />

      <FaqSection />

      <ContactSection />
    </>
  );
}
