import { Section } from "@/components/site/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "estimate",
    question: "외주 / 협업 견적은 어떻게 산정하나요?",
    answer: (
      <>
        <p>
          정해진 단가표 없이, 프로젝트의 <strong className="text-foreground">범위·일정·복잡도</strong> 를
          먼저 함께 정리한 뒤 견적을 드립니다. 동일한 결과물이라도 운영 리스크와 유지보수 비용이 크게
          달라지기 때문에, 합의된 컨텍스트 위에서 산정해야 정확합니다.
        </p>
        <p>
          첫 미팅과 사전 디스커버리 세션은 <strong className="text-foreground">무료</strong> 로 진행하며,
          이 단계에서 기술 트레이드오프와 단계별 일정안을 함께 검토합니다.
        </p>
      </>
    ),
  },
  {
    id: "models",
    question: "AI 모델은 어떤 것들을 production 으로 운영하나요?",
    answer: (
      <>
        <p>
          현재 <strong className="text-foreground">여러 AI 에이전트</strong> 와{" "}
          <strong className="text-foreground">외부 SaaS API</strong> 를 production 에서 함께 운영하고
          있습니다.
        </p>
        <p>
          모델 간 마이그레이션 경험이 누적되어 있어, 비용·성능·정책 변화에 따라 다중 공급자 라우팅이나
          교체를 빠르게 적용할 수 있습니다. 새로운 모델 도입 시에도 회귀 평가와 비용 추정을 함께
          제공합니다.
        </p>
      </>
    ),
  },
  {
    id: "harness",
    question: "자체 개발 하네스 / 에이전틱 워크플로우란 무엇인가요?",
    answer: (
      <>
        <p>
          비전 정의에서부터 설계 · 구현 · 검증 · 배포까지를{" "}
          <strong className="text-foreground">단일 워크플로우 한 묶음</strong> 으로 운영하는 자체
          개발 도구입니다. 매 단계가 산출물과 검증 게이트를 강제하기 때문에, 빠른 속도에서도 일관된
          품질이 유지됩니다.
        </p>
        <p>
          동일한 워크플로우 위에서 여러 작업이 병렬로 진행되더라도 결과물이 한 사람이 만든 듯한
          밀도를 유지하도록 설계되어 있습니다. 진주 정보통신의 모든 프로젝트가 이 하네스 위에서
          돌아갑니다.
        </p>
      </>
    ),
  },
  {
    id: "security",
    question: "보안 · NDA 환경에서도 협업이 가능한가요?",
    answer: (
      <>
        <p>
          가능합니다. <strong className="text-foreground">자체 LLM 호스팅</strong> 으로 외부 API
          호출을 차단한 상태에서 production 을 운영한 경험이 있습니다. 모델 가중치 · 추론 인프라 ·
          관측 파이프라인까지 격리된 환경에서 구축한 사례를 보유하고 있습니다.
        </p>
        <p>
          <strong className="text-foreground">온프레미스</strong>, 격리된 사내망, 별도 VPC 등 어떤
          환경이라도 사전에 보안 요구사항을 정리하고 그에 맞춰 아키텍처를 잡습니다. NDA 가 필요하면
          첫 미팅 전에 체결합니다.
        </p>
      </>
    ),
  },
  {
    id: "saju",
    question: "사주 서비스 출시는 언제인가요?",
    answer: (
      <>
        <p>
          현재 <strong className="text-foreground">준비 중</strong> 입니다. 자체 서비스인 만큼 정성과
          완성도가 충족될 때 출시할 예정이라 정확한 일정은 아직 공개하지 않고 있습니다.
        </p>
        <p>
          출시 알림을 원하시면 아래{" "}
          <a href="#contact" className="text-foreground">
            Contact 폼
          </a>{" "}
          으로 신청해 주시면 됩니다. 출시 시점에 가장 먼저 안내드립니다.
        </p>
      </>
    ),
  },
  {
    id: "remote",
    question: "원격 / 부분 협업도 가능한가요?",
    answer: (
      <>
        <p>
          가능합니다. 자체 워크플로우가 처음부터{" "}
          <strong className="text-foreground">비동기 · 분산 친화</strong> 로 설계되어 있어, 원격
          전제로 협업해도 의사결정 속도와 산출물 품질이 떨어지지 않습니다.
        </p>
        <p>
          다만 프로젝트의 결을 맞추기 위한 정기 동기화 미팅과 단계별 데모 세션은 그대로 운영합니다.
          필요하시다면 부분 참여 · 기술 자문 · 코드 리뷰만 받는 형태의 협업도 환영합니다.
        </p>
      </>
    ),
  },
] as const;

export function FaqSection() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="자주 묻는 질문"
      lead="외주 · 협업 · 자체 서비스 · 채용까지, 진주 정보통신에 자주 들어오는 질문을 모았습니다. 더 궁금한 내용은 Contact 폼으로 편하게 보내주세요."
      align="center"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="relative overflow-hidden rounded-sm border-2 border-border bg-card shadow-sm">
          <Accordion
            type="single"
            collapsible
            defaultValue={FAQ_ITEMS[0]?.id}
            className="divide-y-2 divide-border"
          >
            {FAQ_ITEMS.map(({ id, question, answer }) => (
              <AccordionItem
                key={id}
                value={id}
                className="border-b-0 px-5 sm:px-7 transition-colors duration-150 hover:bg-muted data-[state=open]:bg-muted"
              >
                <AccordionTrigger className="py-5 text-base font-bold tracking-tight text-foreground hover:no-underline sm:text-lg [&>svg]:text-foreground">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
