import { TEAM } from "@/lib/team";
import { Section } from "@/components/site/section";
import { TeamCard } from "@/components/site/team-card";

export function TeamSection() {
  return (
    <Section
      id="team"
      eyebrow="팀"
      title="소수 정예, 모든 레이어를 책임집니다"
      lead="기획부터 AI 모델·백엔드·앱까지. 각 분야의 정예가 직접 다루며, AI 가 일하는 방식이 일상인 사람들입니다."
      align="center"
    >
      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:gap-6">
        {TEAM.map((member) => (
          <TeamCard key={member.slug} member={member} />
        ))}
      </div>
    </Section>
  );
}
