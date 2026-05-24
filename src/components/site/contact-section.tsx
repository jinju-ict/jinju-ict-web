import { Section } from "@/components/site/section";
import { ContactForm } from "@/components/site/contact-form";

export function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="협업 · 프로젝트 문의"
      title="시작점을 만들어 봅시다"
      lead="자체 서비스 협업, 외주 의뢰, 일회성 프로젝트 — 어떤 형태든 환영합니다. 가능한 빨리 회신드릴게요."
      align="center"
    >
      <div className="mx-auto max-w-2xl">
        <ContactForm />
      </div>
    </Section>
  );
}
