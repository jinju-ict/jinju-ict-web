/**
 * 포트폴리오 데이터 — `specs/portfolio-research.md` 정형화.
 *
 * 보안 룰: 정확한 금지 단어 리스트는 `scripts/check-security.sh` 가 단일 출처.
 * 카피·메타데이터에 추상화 룰 적용:
 *   - client 항목의 실제 클라이언트 회사명 노출 금지 ("특정 기업" 으로 표기)
 *   - internal 항목의 원본 도구명·원작자명 노출 금지 (사내 도구로 추상화)
 *   - Andy 만 상호명 노출 허용 (대표님 명시)
 *
 * 카테고리:
 *   - owned: 진주 ICT 자체 서비스
 *   - client: 외부 클라이언트 의뢰 (회사명 룰 적용)
 *   - internal: 사내 개발 인프라 (도구명 추상화)
 */

export type PortfolioCategory = "owned" | "client" | "internal";

export type ProjectIconName =
  | "MessageCircleHeart"
  | "Video"
  | "Scale"
  | "Smartphone"
  | "Briefcase"
  | "Newspaper"
  | "Workflow"
  | "ShieldCheck";

export type Project = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  oneLiner: string;
  description: string;
  stack: readonly string[];
  features: readonly string[];
  /** 카드 썸네일 그라데이션 — 자산 미수집 상태에서도 정성 유지 */
  accent: string;
  /** lucide-react 아이콘 이름 — placeholder 렌더링에 사용 (PortfolioCard 의 ICON_MAP 참조) */
  icon: ProjectIconName;
  comingSoon?: boolean;
  /** 자산 자동 수집 스크립트가 채울 자리 */
  thumbnail?: string;
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "ttoktok",
    title: "TtokTtok",
    category: "owned",
    categoryLabel: "자체 서비스 · 상용 준비",
    oneLiner: "LLM이 맥락을 읽고 먼저 말을 거는, 능동형 AI 친구.",
    description:
      "사용자가 먼저 말을 걸어야 하는 챗봇의 한계를 벗어나, AI가 타이밍과 맥락을 판단해 먼저 카톡을 건넵니다. 장기 기억으로 사용자 한 명을 위한 성격이 누적되며, 사용할수록 관계감이 깊어집니다.",
    stack: ["Flutter", "FastAPI", "Supabase", "Grok", "Cloudflare R2", "FCM"],
    features: [
      "능동 발화 엔진 — AI가 타이밍·맥락 판단 후 먼저 말 걸기",
      "장기 기억 기반 1인 전용 맞춤 성격 누적",
      "사람처럼 짧게 끊어 보내는 카톡 스타일 분할 발화",
    ],
    accent: "from-fuchsia-500/45 via-purple-500/30 to-violet-500/40",
    icon: "MessageCircleHeart",
    comingSoon: true,
  },
  {
    slug: "shortdub",
    title: "shortdub",
    category: "owned",
    categoryLabel: "자체 서비스",
    oneLiner: "짧은 영상을 8개 언어로 자동 더빙하는 셀프서브 SaaS.",
    description:
      "60초 이하 쇼츠·릴스를 ElevenLabs 더빙 API로 8개 메이저 언어 버전으로 자동 생성. 크레딧 기반 결제(토스페이먼츠) 와 무료 cron 우회 구조로 운영 비용을 최적화했습니다.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "ElevenLabs",
      "토스페이먼츠",
      "PostHog",
    ],
    features: [
      "원클릭 8개 언어 자동 더빙",
      "크레딧 SaaS 모델 — 결제·정산 자동화",
      "무료 tier cron 우회로 운영비 절감",
    ],
    accent: "from-cyan-400/45 via-sky-500/30 to-blue-500/40",
    icon: "Video",
  },
  {
    slug: "king-of-law",
    title: "King of Law",
    category: "owned",
    categoryLabel: "자체 서비스",
    oneLiner: "스토리와 게임으로 배우는 인터랙티브 법률 학습 플랫폼.",
    description:
      "10~30대 젊은 사용자를 위해 주제별 스토리텔링·시각화·게임형 퀴즈로 법을 \"와닿게\" 만든 프론트엔드 전용 서비스. 백엔드·DB·외부 API 없이 정적 호스팅으로 운영 비용을 극소화했습니다.",
    stack: ["React", "Vite", "TypeScript", "LocalStorage"],
    features: [
      "백엔드 제로 아키텍처 — 외부 의존 없음",
      "월 $10 이내 저비용 정적 호스팅",
      "정성 수준의 시각적 임팩트와 직관적 상호작용",
    ],
    accent: "from-amber-400/45 via-orange-500/30 to-rose-500/40",
    icon: "Scale",
  },
  {
    slug: "andy",
    title: "Andy",
    category: "client",
    categoryLabel: "클라이언트 의뢰",
    oneLiner: "Android 휴대폰을 LLM 에이전트가 조종하는 1인용 AI 비서 앱.",
    description:
      "자연어 채팅 명령으로 Claude API가 휴대폰 기능(전화·SMS·캘린더·위치·카메라 등)을 Tool 호출로 실행. 시간·위치·센서 기반 자율 백그라운드 트리거까지 지원하는 본격 모바일 에이전트.",
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Hilt",
      "Room",
      "Claude API",
      "AlarmManager",
      "GeofencingClient",
    ],
    features: [
      "자연어 휴대폰 제어 — \"엄마한테 늦는다고 카톡 쳐줘\"",
      "위치·시간·센서 기반 자율 백그라운드 트리거",
      "권한 계층 L1(표준) → L2(접근성) → L3(ADB) 점진 확장",
    ],
    accent: "from-emerald-400/45 via-teal-500/30 to-cyan-500/40",
    icon: "Smartphone",
  },
  {
    slug: "office-agent",
    title: "사내 AI 사무 비서",
    category: "client",
    categoryLabel: "클라이언트 의뢰 · 보안 우선",
    oneLiner: "특정 기업 오피스 내부용, 자체 LLM 호스팅 기반 AI 사무 비서.",
    description:
      "파일 관리(읽기·쓰기·삭제·이동)와 문서 자동 생성(Excel·CSV·PDF·PPTX)을 에이전트화. 외부 클라우드 의존을 최소화하기 위해 자체 호스팅 LLM(국산 모델)을 RunPod GPU 위에 올리고, 위험한 작업은 모두 사람 승인 카드로 검증합니다.",
    stack: [
      "React",
      "Vite",
      "FastAPI",
      "RunPod vLLM",
      "LangGraph",
      "WebSocket",
    ],
    features: [
      "외부 API 최소화 — 자체 호스팅 LLM 로 보안·비용 최적화",
      "이중 승인 — 파일 쓰기·삭제·문서 생성 UI 카드 검증",
      "스트리밍 Markdown 렌더링과 파일 카드 UX",
    ],
    accent: "from-slate-400/40 via-indigo-500/30 to-blue-600/40",
    icon: "Briefcase",
  },
  {
    slug: "ai-news-daily",
    title: "AI News Daily",
    category: "client",
    categoryLabel: "클라이언트 의뢰",
    oneLiner: "매일 5분에 정리되는 AI 뉴스 자동 큐레이션 파이프라인.",
    description:
      "특정 기업 의뢰로 구축한 일일 AI 뉴스 수집·정리·발송 서비스. 매일 08:40 KST 영어권 매체 기사 자동 수집(Brave Search 3중) → 본문 추출(trafilatura) → Gemini 한국어 통합 요약 → Gmail 발송. 키워드만 갈아끼우면 다른 도메인에도 재사용 가능합니다.",
    stack: [
      "Python",
      "FastAPI",
      "Brave Search",
      "trafilatura",
      "Gemini",
      "Supabase",
      "GitHub Actions",
    ],
    features: [
      "재사용 가능한 도메인 무관 파이프라인 구조",
      "무료 tier 활용 — Brave 2000회 / 월 150회 호출만 사용",
      "심플 admin — 자동 스크래핑 토글 / 구독자 관리",
    ],
    accent: "from-rose-400/45 via-pink-500/30 to-fuchsia-500/40",
    icon: "Newspaper",
  },
  {
    slug: "dev-harness",
    title: "자율 개발 하네스",
    category: "internal",
    categoryLabel: "사내 개발 인프라",
    oneLiner: "비전만 정의하면 AI가 자율 순환 개발하는 사내 프로젝트 팩토리.",
    description:
      "한 슬래시 명령으로 8가지 비전 질문을 던지고, 그 답으로 프로젝트 사양·구현계획·검증 파일을 자동 생성한 뒤 자율 순환 개발 루프를 시작합니다. 단일 prompt · 자기 재투입 · fresh context · 결정론적 검증의 4원칙을 사내 표준으로 정립했습니다.",
    stack: ["Claude Code plugin", "bash", "template 5파일"],
    features: [
      "비전 8질문 → 사양·계획·검증 파일 자동 합성",
      "자율 순환 개발 — 사람 개입 2회 (시작 / 완료)",
      "기존 프로젝트 위에 overlay 설치 모드 지원",
    ],
    accent: "from-violet-500/45 via-purple-500/30 to-indigo-500/40",
    icon: "Workflow",
  },
  {
    slug: "dev-safety",
    title: "개발 안전 워크플로우",
    category: "internal",
    categoryLabel: "사내 개발 인프라",
    oneLiner: "AI 개발의 품질·안전을 자동으로 끌어올리는 사내 워크플로우.",
    description:
      "브레인스토밍부터 배포까지 단계마다 사람 확인 게이트를 박고, 요구사항·기술설계·구현계획 문서와 코드를 자동으로 동기화합니다. 변경 이력은 자동 footer 로 누적되고, 위험 코드 라인에는 RISK 주석이 자동 부착되며, 독립 task 는 서브에이전트가 병렬 처리해 체감 시간을 ⅓~½ 로 줄입니다.",
    stack: [
      "Claude Code plugin",
      "한국어 UI",
      "32 skill",
      "MD 3종 + HTML 사본",
    ],
    features: [
      "단계별 확인 게이트 — AI 멋대로 진행 방지",
      "문서·코드 자동 동기화 + 변경이력 footer 누적",
      "서브에이전트 wave-parallel — 독립 task 동시 처리",
    ],
    accent: "from-primary/45 via-accent/30 to-fuchsia-500/40",
    icon: "ShieldCheck",
  },
] as const;

export const CATEGORY_ORDER: readonly PortfolioCategory[] = [
  "owned",
  "client",
  "internal",
] as const;
