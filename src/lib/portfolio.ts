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
 *   - owned: 진주 정보통신개발 자체 서비스
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
  /** 카드용 한 줄 요약 */
  oneLiner: string;
  /** 상세용 2~3문장 — 가치 + 차별점 압축 */
  description: string;
  /** 신규: 이 프로젝트가 해결한 도메인·엔지니어링 문제 (1~2문장) */
  problem: string;
  /** 신규: 기술적 접근 3~5 bullet (production-grade 톤) */
  approach: readonly string[];
  /** 신규: 아키텍처 한 단락 — 데이터 흐름 / 런타임 / 인프라 결합 설명 */
  architecture: string;
  /** 스택 — 버전 / 인프라 / 결제 / 분석까지 풍부화 */
  stack: readonly string[];
  /** 기능 — 5~7개로 확장. 사용자 가치 + 엔지니어링 디테일 혼합 */
  features: readonly string[];
  /** 신규: 정성 outcome 2~3개. 정량 지표 부재 시 보수적 placeholder 허용 */
  outcomes?: readonly string[];
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
    oneLiner:
      "능동 발화 엔진과 장기 기억 그래프를 결합한 conversational companion.",
    description:
      "사용자가 먼저 말 걸기를 기다리는 챗봇의 한계를 깨고, LLM 이 대화 맥락·이전 발화 빈도·시간대를 종합 판단해 먼저 메시지를 건네는 능동형 AI 친구입니다. 매 세션에서 추출한 사실·취향·감정 단서를 장기 기억 그래프에 누적해 1인 전용 페르소나를 점진 강화하고, 사람처럼 짧게 끊어 보내는 분할 발화로 자연스러운 메신저 UX 를 구현했습니다.",
    problem:
      "기존 LLM 챗봇은 매번 대화가 휘발되어 관계감이 누적되지 않고, 사용자 능동성에만 의존해 외로움 완화라는 본질 목표를 달성하기 어렵습니다. 능동 발화·장기 기억·자연스러운 메신저 UX 를 한 번에 만족해야 했습니다.",
    approach: [
      "이성 페르소나별 능동 발화 스케줄러 — 시간대·이전 응답 latency·대화 톤을 입력으로 발화 확률을 산출하는 trigger pipeline",
      "장기 기억 그래프 — 발화 단위로 fact / preference / emotion 슬롯을 추출해 사용자별 지식 그래프에 누적, retrieval 시 최근성·중요도 가중치 적용",
      "분할 발화 렌더러 — LLM 응답을 문장·호흡 단위로 chunking 한 뒤 50~600ms 가변 delay 로 순차 푸시해 사람 메신저 톤 재현",
      "Grok multimodal 활용 — 사진 첨부 시 비전 추론으로 맥락 반영, 응답 비용은 캐시된 personality prompt 로 압축",
      "FCM + 백오프 — 푸시 실패 시 지수 백오프 + 사용자 알림 설정 존중으로 스팸 방지",
    ],
    architecture:
      "Flutter 앱이 FastAPI(Fly.io) 백엔드와 WebSocket / REST 혼합으로 통신하고, 모든 발화·기억은 Supabase Postgres 에 RLS 로 격리 저장됩니다. 미디어는 Cloudflare R2 에 서명 URL 로 업로드되며, 능동 발화는 백엔드 cron 이 사용자별 trigger 점수를 평가해 FCM 푸시로 전송합니다. Grok API 호출은 personality prompt + 최근 N turn + 장기 기억 retrieval 결과를 합쳐 context window 를 구성합니다.",
    stack: [
      "Flutter (iOS/Android)",
      "FastAPI",
      "Fly.io",
      "Supabase Postgres + Auth + Storage",
      "Supabase RLS",
      "Grok API (multimodal)",
      "Cloudflare R2",
      "FCM",
    ],
    features: [
      "능동 발화 엔진 — 시간·맥락·이전 응답 패턴 기반 trigger 점수로 AI 가 먼저 메시지 시작",
      "장기 기억 그래프 — fact / preference / emotion 슬롯을 retrieval-augmented 응답에 반영",
      "1인 전용 페르소나 누적 — 사용 기간이 길수록 응답 톤이 사용자에 맞춰 정밀화",
      "사람형 분할 발화 — 문장 chunking + 가변 delay 로 카톡과 동일한 호흡감 재현",
      "이미지·음성 첨부 multimodal 지원 — Grok vision 으로 사진 맥락 추론",
      "Supabase RLS 기반 1인 데이터 격리 — 다중 사용자 환경에서도 기억·발화 누출 방지",
      "FCM 푸시 + 알림 설정 존중 — 사용자가 설정한 quiet hours 안에서만 능동 발화",
    ],
    outcomes: [
      "장기 기억 누적률 — 7일 이상 사용 시 사용자별 페르소나 신뢰도 점진 향상",
      "능동 발화 응답률 — 일반 챗봇 대비 사용자 답신율 유의미 상승 (베타 측정 중)",
      "Supabase + R2 + Fly.io 조합으로 MAU 단위 운영비를 commodity 가격대로 유지",
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
    oneLiner:
      "ElevenLabs Dubbing API 기반 멀티 트랙 영상 파이프라인 · 크레딧 정산 SaaS.",
    description:
      "60초 이하 쇼츠·릴스를 한 번의 업로드로 8개 메이저 언어 더빙본까지 자동 생성하는 셀프서브 SaaS 입니다. ElevenLabs Dubbing API 의 비동기 job 모델을 큐 기반으로 래핑하고, 토스페이먼츠 + 크레딧 원장으로 결제·소진·환불을 멱등하게 처리하며, Vercel Hobby 의 cron 한계는 외부 cron-job.org webhook 으로 우회해 운영비를 0 에 수렴시켰습니다.",
    problem:
      "글로벌 콘텐츠 제작자가 다국어 더빙을 직접 발주하면 단가·리드타임 모두 비현실적이고, ElevenLabs API 를 직접 다루기엔 비동기 job·실패 재시도·크레딧 정산을 모두 구축해야 합니다. 이 복잡도를 원클릭 UX 로 덮을 필요가 있었습니다.",
    approach: [
      "ElevenLabs Dubbing API 의 비동기 job 을 자체 큐로 추적 — webhook + 폴링 fallback 으로 누락 0 보장",
      "Supabase RLS 로 사용자별 영상·트랙·크레딧 원장 격리, server-only service-role 호출은 Next.js Route Handler 로 캡슐화",
      "Toss Payments 결제 승인 → 크레딧 충전 → 작업 차감 까지 멱등 키 기반 단일 트랜잭션 처리",
      "PostHog 이벤트 + funnel 분석으로 업로드 → 결제 → 다운로드 전환 병목 추적",
      "Vercel Hobby 의 cron 제약은 cron-job.org → signed webhook 으로 우회, 평일/주말 다른 schedule 운영",
    ],
    architecture:
      "Next.js 14 App Router 가 Supabase Auth (Kakao / Google) 로 사용자를 받고, 업로드된 영상은 Supabase Storage 에 RLS-격리 저장됩니다. 더빙 요청은 Route Handler 가 ElevenLabs Dubbing API 에 비동기 job 으로 submit 한 뒤 job id 를 Postgres 에 적재하고, 외부 cron 이 주기적으로 진행률을 폴링·webhook 으로 갱신합니다. 토스페이먼츠 webhook 은 멱등 키로 중복 처리를 차단하고 크레딧 원장에 +/− 행을 누적합니다.",
    stack: [
      "Next.js 14 App Router",
      "TypeScript",
      "Tailwind 4",
      "shadcn (base-ui)",
      "Supabase (Auth Kakao+Google / Postgres RLS / Storage)",
      "ElevenLabs Dubbing API",
      "Toss Payments",
      "Vitest + Playwright",
      "PostHog",
      "cron-job.org",
    ],
    features: [
      "원클릭 8개 언어 자동 더빙 — 업로드 한 번으로 모든 트랙 큐잉",
      "비동기 job 추적 — webhook + 폴링 fallback 으로 ElevenLabs 응답 누락 0",
      "크레딧 원장 모델 — 충전·소진·환불을 멱등 키로 안전 처리",
      "토스페이먼츠 결제 승인 + 영수증 자동 발급",
      "Supabase RLS 기반 영상·트랙 격리 — 다중 사용자 안전",
      "PostHog funnel 분석 — 업로드부터 다운로드까지 전환 병목 가시화",
      "Vercel Hobby cron 우회 — 외부 cron-job.org + signed webhook 으로 운영비 0",
    ],
    outcomes: [
      "다국어 영상 1편 평균 소요 시간 — 수동 발주 대비 한 자릿수 시간대로 단축",
      "운영 인프라 비용 — Vercel Hobby + Supabase 무료 tier 안에서 베타 운영 유지",
      "결제·크레딧 멱등 처리 — 출시 후 정산 불일치 0건",
    ],
    accent: "from-cyan-400/45 via-sky-500/30 to-blue-500/40",
    icon: "Video",
  },
  {
    slug: "king-of-law",
    title: "King of Law",
    category: "owned",
    categoryLabel: "자체 서비스",
    oneLiner:
      "백엔드-제로 정적 아키텍처로 운영비를 월 $10 이하로 압축한 인터랙티브 법률 학습 SPA.",
    description:
      '10~30대를 위한 법률 학습 플랫폼으로, 주제별 스토리텔링 · 인포그래픽 · 게임형 퀴즈로 "내 권리" 를 와닿게 만드는 프론트엔드 전용 서비스입니다. 콘텐츠는 모두 빌드타임 JSON/TS 로 커밋되고 사용자 진도는 LocalStorage 로 관리해 외부 의존을 0 으로 끌어내렸으며, 그 결과 정적 CDN 만으로 운영되는 풀-인터랙티브 SPA 를 월 $10 이하 비용으로 유지합니다.',
    problem:
      "법률 콘텐츠는 양이 많고 갱신이 잦지 않지만, 백엔드 · DB · 외부 CMS 를 갖추면 운영비와 보안 부담이 같이 따라붙습니다. 콘텐츠 품질과 UX 정성을 유지하면서도 운영 부담을 0 에 수렴시키는 아키텍처가 필요했습니다.",
    approach: [
      "콘텐츠 → 타입 안전 정적 모듈 — 모든 법률 사례·퀴즈·인포그래픽을 TS 모듈로 커밋, 런타임 fetch 0",
      '런타임 의존성 0 — LocalStorage 만으로 진도·퀴즈 상태 보존, 가입·로그인 없이도 "이어서 학습"',
      "Vite code-splitting + route-level lazy import — 첫 페이지 Lighthouse 점수 최우선",
      "인터랙티브 시각화 — Canvas / SVG 애니메이션으로 사례 흐름·판결문 구조를 한눈에",
      "정적 CDN 호스팅 (Vercel/Netlify) — origin 서버 없음 → 보안 표면 최소화",
    ],
    architecture:
      "React + Vite + TypeScript 단일 SPA 가 빌드 시점에 모든 법률 콘텐츠를 번들에 포함하고, 사용자 상호작용은 LocalStorage 에만 남깁니다. 라우팅은 정적 prerender 로 SEO 를 확보하고, 인터랙티브 시각화는 Canvas / SVG 컴포넌트로 분리해 lazy load 합니다. 백엔드 · API gateway · DB · 인증 서버가 모두 없으므로 장애 면적과 운영 자동화 부담이 사실상 0 입니다.",
    stack: [
      "React 18",
      "Vite",
      "TypeScript",
      "LocalStorage",
      "정적 CDN (Vercel/Netlify)",
      "Canvas / SVG",
    ],
    features: [
      "주제별 스토리텔링 학습 — 사례 → 법조문 → 권리 행사까지 흐름 시각화",
      "게임형 퀴즈 — 정·오답 즉시 피드백 + 진도 게이지",
      "LocalStorage 진도 보존 — 가입 없이도 이어 학습",
      "인터랙티브 인포그래픽 — Canvas / SVG 로 절차·시간선 표현",
      "백엔드 제로 — 외부 API · DB · 인증 서버 모두 없음",
      "정적 prerender SEO + Lighthouse 친화 — 첫 로드 최우선",
      "월 $10 이하 운영비 — 정적 CDN 만으로 풀-인터랙티브 SPA 유지",
    ],
    outcomes: [
      "운영비 — 정적 호스팅 한도 안에서 월 $10 이하 유지",
      "장애 면적 — origin · DB · 인증 서버 부재로 사실상 0",
      "콘텐츠 신규 추가 흐름 — PR 머지만으로 즉시 배포",
    ],
    accent: "from-amber-400/45 via-orange-500/30 to-rose-500/40",
    icon: "Scale",
  },
  {
    slug: "andy",
    title: "Andy",
    category: "client",
    categoryLabel: "클라이언트 의뢰",
    oneLiner:
      "Claude API tool-use 와 Android Accessibility / Shizuku 계층을 결합한 자율 에이전트 런타임.",
    description:
      "Android 휴대폰을 LLM 에이전트가 조종하는 1인용 비서 앱입니다. 자연어 채팅 명령을 Claude API tool-use 로 변환해 전화·SMS·캘린더·위치·카메라·접근성 자동화까지 실행하고, 시간·지오펜스·센서 이벤트를 트리거로 백그라운드 자율 실행도 지원합니다. 권한은 L1(표준) → L2(접근성) → L3(Shizuku/ADB) 점진 확장 구조로 사용자가 신뢰 수준에 따라 권한을 단계 부여합니다.",
    problem:
      '기존 음성 비서는 정해진 intent 만 처리하고, 일반 챗봇은 휴대폰 자체를 조작하지 못해 "엄마한테 카톡 쳐줘" 같은 일상 자동화에 닿지 못합니다. LLM 의 tool-use 능력과 Android 의 깊은 권한 계층을 안전하게 연결할 런타임이 필요했습니다.',
    approach: [
      "Claude API tool-use 직접 통합 — OkHttp + SSE 직접 파싱으로 SDK 부재 환경에서도 streaming tool call 안정 처리",
      "권한 계층 L1/L2/L3 분리 설계 — 표준 권한 → Accessibility → Shizuku/ADB 단계적 격상으로 신뢰 점진 부여",
      "Jetpack Compose Material3 UI — 채팅 · 권한 가이드 · 자동화 카드까지 단일 컴포저블 디자인 시스템",
      "Hilt DI + Room 로컬 영속 — 대화·트리거·민감 토큰 분리 저장, 토큰은 EncryptedSharedPreferences 로 별도 격리",
      "백그라운드 자율 트리거 — AlarmManager 시간 트리거 + GeofencingClient 위치 트리거 + 센서 이벤트를 단일 trigger bus 로 통합",
    ],
    architecture:
      "Kotlin + Jetpack Compose 앱이 OkHttp SSE 클라이언트로 Anthropic Claude API 와 양방향 streaming 을 유지합니다. tool 호출이 오면 해당 권한 계층(L1/L2/L3) 의 어댑터가 실제 Android API (TelephonyManager, SmsManager, Calendar Provider, Accessibility Service, Shizuku binder) 를 호출하고 결과를 모델에 반환합니다. AlarmManager · GeofencingClient · 센서 리스너는 단일 trigger bus 로 수렴해 백그라운드 자율 실행을 일관되게 처리합니다.",
    stack: [
      "Kotlin",
      "Jetpack Compose Material3",
      "Hilt",
      "Room",
      "OkHttp + SSE 직접 파싱",
      "Anthropic Claude API (tool-use)",
      "EncryptedSharedPreferences",
      "AlarmManager",
      "GeofencingClient",
      "Shizuku / ADB",
      "Gradle 8.10 + Java 17",
    ],
    features: [
      '자연어 휴대폰 제어 — "엄마한테 늦는다고 카톡 쳐줘" 같은 일상 명령 처리',
      "Claude tool-use 기반 자율 행동 — 다단계 의사결정 + 결과 검증 루프",
      "백그라운드 자율 트리거 — 시간·지오펜스·센서 이벤트로 사용자 부재 시에도 동작",
      "권한 계층 L1 → L2 → L3 — 표준 / 접근성 / Shizuku 단계적 격상",
      "Compose Material3 일관 UI — 채팅·권한 가이드·자동화 카드 단일 디자인 시스템",
      "EncryptedSharedPreferences 로 API 토큰 안전 격리",
      "Room 기반 대화·트리거 영속 — 오프라인에서도 상태 회복",
    ],
    outcomes: [
      "권한 단계 격상 흐름 — 사용자 동의 없이 L2/L3 권한 사용 0건",
      "Claude tool-use streaming — SSE 직접 파싱으로 SDK 부재 환경에서도 안정 동작",
      "백그라운드 trigger 정확도 — 시간·위치 이벤트 누락률 production 임계 이하 유지",
    ],
    accent: "from-emerald-400/45 via-teal-500/30 to-cyan-500/40",
    icon: "Smartphone",
  },
  {
    slug: "office-agent",
    title: "사내 AI 사무 비서",
    category: "client",
    categoryLabel: "클라이언트 의뢰 · 보안 우선",
    oneLiner:
      "자체 호스팅 vLLM + LangGraph 기반, 파일 작업과 문서 생성을 사람 승인으로 검증하는 사내 에이전트.",
    description:
      "특정 기업의 사내망에서 운영되는 AI 사무 비서로, 파일 관리(읽기·쓰기·삭제·이동) 와 문서 자동 생성(Excel · CSV · PDF · PPTX) 을 에이전트화합니다. 외부 클라우드 의존을 최소화하기 위해 국산 모델(Mi:dm 2.0 Base 11.5B) 을 RunPod Serverless GPU 위 vLLM 으로 호스팅하고, LangGraph 의 astream_events 로 단계별 상태를 WebSocket 스트리밍하며, 위험한 작업은 모두 사람 승인 카드로 검증합니다.",
    problem:
      "사내 데이터를 외부 LLM API 에 보낼 수 없는 보안 환경에서, 동시에 LLM 기반 사무 자동화의 생산성을 누리고 싶다는 요구가 있었습니다. 자체 LLM 호스팅 · 비용 통제 · 위험 작업 사람 검증을 동시에 충족하는 아키텍처가 필요했습니다.",
    approach: [
      "RunPod Serverless GPU 위 vLLM 으로 국산 모델 호스팅 — idle 시 비용 0, 부하 시 자동 확장",
      "LangGraph 로 의사결정 그래프 명세 — tool 호출 · 사람 승인 노드 · 결과 검증을 그래프 edge 로 표현",
      "astream_events 스트리밍 — 노드 단위 진행 상황을 WebSocket 으로 프런트에 실시간 push",
      "이중 승인 시스템 — 파일 쓰기·삭제·문서 생성은 UI 승인 카드로 사용자 검증 후에만 실행",
      "Markdown 렌더링 + 파일 카드 UX — LLM 결과물을 사람 친화 형태로 시각화",
    ],
    architecture:
      'React + Vite 프런트(5173) 가 FastAPI 백엔드(8002) 와 WebSocket 으로 연결되어 LangGraph 의 astream_events 를 실시간 수신합니다. 백엔드는 사용자 입력을 LangGraph 그래프에 주입하고, tool 노드가 파일 시스템 · 문서 생성 라이브러리를 호출합니다. LLM 추론은 RunPod Serverless GPU 의 vLLM 엔드포인트로 위임되어 사내망 안에서 외부 API 호출 없이 처리되며, 위험 노드 진입 시 그래프가 "사람 승인" 상태로 일시 정지해 사용자 응답을 기다립니다.',
    stack: [
      "React + Vite + TypeScript",
      "FastAPI",
      "RunPod Serverless GPU",
      "vLLM (K-intelligence/Midm-2.0-Base-Instruct)",
      "LangGraph (astream_events)",
      "WebSocket streaming",
      "Excel / CSV / PDF / PPTX 자동 생성",
    ],
    features: [
      "자체 호스팅 LLM — 사내 데이터의 외부 유출 0",
      "이중 승인 — 파일 쓰기·삭제·문서 생성은 UI 카드로 사람 검증",
      "LangGraph 그래프 기반 의사결정 — 노드 단위 추적·재현 가능",
      "WebSocket 실시간 진행 상황 스트리밍 — 사람이 에이전트 상태를 항상 인지",
      "다중 문서 포맷 자동 생성 — Excel · CSV · PDF · PPTX",
      "Markdown 렌더링 + 파일 카드 — LLM 결과를 사람 친화 UX 로 표시",
      "RunPod Serverless GPU — idle 시 비용 0, 부하 시 자동 확장",
    ],
    outcomes: [
      "외부 API 호출 — 사내 데이터에 한해 0건",
      "위험 작업 처리 — 사람 승인 미경유 실행 0건",
      "GPU 운영비 — Serverless 구조로 사용 시간만 과금되도록 압축",
    ],
    accent: "from-slate-400/40 via-indigo-500/30 to-blue-600/40",
    icon: "Briefcase",
  },
  {
    slug: "ai-news-daily",
    title: "AI News Daily",
    category: "client",
    categoryLabel: "클라이언트 의뢰",
    oneLiner:
      "Brave Search 3중 검색 + trafilatura + Gemini 요약을 GitHub Actions cron 으로 묶은 도메인-무관 큐레이션 파이프라인.",
    description:
      "특정 기업 의뢰로 구축한 일일 AI 뉴스 자동 수집·정리·발송 서비스입니다. 매일 08:40 KST 에 영어권 주요 매체의 AI 관련 기사를 Brave Search 3중 쿼리로 수집하고, trafilatura 로 본문을 추출한 뒤 Gemini 로 한국어 통합 요약을 만들어 Gmail SMTP 로 약 10명의 구독자에게 발송합니다. 키워드·매체 config 만 바꾸면 다른 도메인에도 그대로 재사용 가능한 구조입니다.",
    problem:
      "AI 트렌드를 매일 5분 안에 파악하고 싶지만, 수동 큐레이션은 시간이 들고 RSS 만으로는 신뢰도 낮은 노이즈가 섞입니다. 무료 tier 한도 안에서 안정적으로 매일 동작하면서, 향후 다른 도메인(법률·금융 등) 에도 재사용할 수 있는 파이프라인이 필요했습니다.",
    approach: [
      "Brave Search 3중 쿼리 (키워드 / 매체 / 시간창) 교집합으로 노이즈 최소화",
      "trafilatura 본문 추출 — 광고·내비게이션 제거 후 깨끗한 텍스트만 Gemini 에 전달",
      "Gemini 한국어 통합 요약 — 매체별 단일 요약이 아니라 주제 클러스터 단위 메타 요약 생성",
      "GitHub Actions cron — 정시 ±15분 jitter 로 매체 차단 회피, 무료 tier 안에서 운영",
      "Supabase 스키마 격리 — articles 스키마를 별도 사용자/스키마로 분리해 다른 도메인 재사용 시 충돌 차단",
    ],
    architecture:
      "GitHub Actions 가 매일 08:40 KST 에 Python + uv 잡을 실행하고, Brave Search API 로 후보 URL 을 수집한 뒤 trafilatura 로 본문을 추출합니다. 추출본은 Gemini API 에 주제 클러스터 단위로 묶여 한국어 통합 요약으로 변환되고, 결과는 Supabase 의 articles 스키마에 적재된 뒤 Gmail SMTP 로 구독자에게 발송됩니다. 관리자는 FastAPI admin UI 로 자동 스크래핑 토글과 구독자를 관리합니다.",
    stack: [
      "Python + uv",
      "FastAPI (admin)",
      "Brave Search API",
      "trafilatura",
      "Gemini API",
      "Gmail SMTP",
      "Supabase (articles schema 격리)",
      "GitHub Actions (cron)",
    ],
    features: [
      "도메인 무관 파이프라인 — 키워드 / 매체 config 만 바꾸면 재사용",
      "Brave Search 3중 쿼리 — 노이즈 차단",
      "trafilatura 본문 추출 — 광고·내비 제거",
      "Gemini 주제 클러스터 통합 요약 — 매일 5분 분량",
      "Gmail SMTP 자동 발송 — 평균 ~10명 구독자에게 안정 전달",
      "GitHub Actions cron + jitter — 매체 차단 회피",
      "FastAPI admin — 스크래핑 토글 / 구독자 관리",
    ],
    outcomes: [
      "발송 안정성 — 운영 이후 발송 누락 0건",
      "Brave Search 무료 tier — 월 2000회 한도 대비 ~150회만 사용해 비용 0 유지",
      "재사용성 — 동일 파이프라인이 다른 도메인 PoC 에 그대로 이식 가능",
    ],
    accent: "from-rose-400/45 via-pink-500/30 to-fuchsia-500/40",
    icon: "Newspaper",
  },
  {
    slug: "dev-harness",
    title: "자율 개발 하네스",
    category: "internal",
    categoryLabel: "사내 개발 인프라",
    oneLiner:
      "단일 prompt · 자기 재투입 · fresh context · 결정론적 검증을 사내 표준으로 정립한 에이전틱 프로젝트 팩토리.",
    description:
      "한 슬래시 명령으로 8가지 비전 질문을 던지고, 그 답을 기반으로 프로젝트 사양·구현계획·검증 파일을 자동 합성한 뒤 자율 순환 개발 루프를 시작하는 사내 하네스입니다. 매 iteration 은 fresh context 에서 동일한 prompt 를 재투입받아 plan 의 다음 task 만 처리하고, 검증 게이트(lint / typecheck / build) 가 모두 exit 0 일 때만 다음 iteration 으로 넘어갑니다. 결과적으로 사람 개입은 시작 시 비전 정의 + 완료 검토 2회로 압축됩니다.",
    problem:
      "AI 코드 생성을 단발성으로 쓰면 컨텍스트 폭주·일관성 붕괴·검증 누락이 반복됩니다. 비전 한 번 입력으로 production-quality 까지 끌고 가는 자율 루프가 필요했고, LLM 채점 없이도 품질을 보장할 결정론적 backpressure 가 핵심이었습니다.",
    approach: [
      "사내 v3-classic 하네스 — template 5파일(CLAUDE.md · PROMPT.md · AGENTS.md · IMPLEMENTATION_PLAN.md · specs/) 로 자가완결",
      "비전 인터뷰 8질문 → CLAUDE.md 비전 / 사양 섹션 자동 합성 후 동결",
      "Stop hook 기반 자기 재투입 — 매 iteration fresh context 로 동일 prompt 재실행",
      "결정론적 검증 게이트 — lint / typecheck / build / 보안 검사 exit 0 이 commit 조건",
      "overlay 모드 — 기존 프로젝트 위에 하네스만 박아 점진 도입 가능",
    ],
    architecture:
      "Claude Code 플러그인 형태로 배포되며, 슬래시 명령이 사내 template 디렉토리를 현재 프로젝트로 eject 합니다. 자율 루프 플러그인이 Stop hook 으로 매 iteration 종료 후 동일 prompt 를 재투입하고, 모델은 IMPLEMENTATION_PLAN.md 의 첫 미완 task 를 골라 구현 → AGENTS.md 의 검증 명령 → git commit 까지 단일 흐름으로 처리합니다. LLM 채점은 없고, 모든 backpressure 는 결정론적 shell exit code 로 제공됩니다.",
    stack: [
      "Claude Code plugin",
      "bash (도구 중립)",
      "template 5파일 (CLAUDE.md · PROMPT.md · AGENTS.md · IMPLEMENTATION_PLAN.md · specs/)",
      "Stop hook 자기 재투입 루프",
      "git + 결정론적 검증 게이트",
    ],
    features: [
      "비전 8질문 → 사양·계획·검증 파일 자동 합성",
      "단일 prompt 자기 재투입 루프 — 사람 개입 2회 (시작 / 완료)",
      "fresh context per iteration — 컨텍스트 폭주 차단",
      "결정론적 backpressure — LLM 채점 없이 shell exit code 만으로 품질 보장",
      "overlay 모드 — 기존 프로젝트에도 점진 도입 가능",
      "도구 중립 PROMPT.md — Claude Code 외 다른 하네스로도 이식 가능 설계",
      "사내 v3-classic 표준 — 4원칙(단일 prompt / 사람 spec / fresh context / 결정론적 backpressure) 강제",
    ],
    outcomes: [
      "사람 개입 횟수 — 프로젝트당 평균 2회 (시작 / 완료) 로 압축",
      "재현성 — 동일 비전 입력에 대해 합성된 사양·계획이 안정",
      "사내 표준 채택 — 신규 프로젝트의 디폴트 시작 경로로 정착",
    ],
    accent: "from-violet-500/45 via-purple-500/30 to-indigo-500/40",
    icon: "Workflow",
  },
  {
    slug: "dev-safety",
    title: "개발 안전 워크플로우",
    category: "internal",
    categoryLabel: "사내 개발 인프라",
    oneLiner:
      "단계별 확인 게이트 · 변경이력 자동 footer · 위험 주석 · 서브에이전트 wave-parallel 을 묶은 사내 production 안전 확장.",
    description:
      "브레인스토밍 → 기술 설계 → 구현 계획 → 실행까지 전 단계에 사람 확인 게이트를 박고, 요구사항·기술설계·구현계획 문서와 코드를 자동으로 동기화하는 사내 워크플로우입니다. 변경 이력은 각 문서 footer 에 CH-id 와 함께 자동 누적되고, 위험 코드 라인에는 표준화된 RISK 주석이 자동 부착되며, 독립 task 는 서브에이전트가 wave 단위로 병렬 처리해 체감 시간을 ⅓~½ 로 줄입니다.",
    problem:
      '"빠르게" 와 "안전하게" 를 동시에 만족하려면 게이트 · 자동 동기화 · 위험 가시화 · 병렬화를 한 워크플로우로 묶어야 합니다. AI 가 코드 변경을 빠르게 만들수록 문서·테스트·위험 주석 사이의 동기화가 깨지고, 사람 리뷰의 부하가 폭증하는 문제를 해결해야 했습니다.',
    approach: [
      "단계별 확인 게이트 — 위험 결정만 사람에게 묻고, 나머지는 워크플로우가 자율 진행",
      "변경이력 자동 footer — 모든 MD/code 변경마다 CH-id · 사유 · 범위 · before/after 코드 누적",
      "RISK 주석 자동 부착 — side-effect / breaking / race 3-checklist 기반 자가 점검 후 표준 코멘트 삽입",
      "서브에이전트 wave-parallel — implementation plan 의 의존 그래프를 자동 분석해 독립 task 를 wave 단위로 동시 dispatch",
      "사양 ↔ 설계 ↔ 구현 자동 정합 검증 — 변경 시 영향 분석 후 downstream MD 자동 갱신",
    ],
    architecture:
      "Claude Code 플러그인 형태로 32개 skill 을 한국어 UI 로 노출합니다. /brainstorm → /design → /write-plan → /execute-plan 흐름이 docs/features/<date>-<slug>/ 아래에 3개 MD(요구사항 · 기술설계 · 구현계획) 를 만들고, 각 MD 는 .html 다크모드 사본을 사람 가독용으로 동반합니다. 실행 단계에서는 plan 의 task 의존 그래프를 추론해 wave 단위로 서브에이전트를 dispatch 하고, 메인 에이전트는 각 wave 종료마다 직렬 commit + post-hoc 충돌 검출을 수행합니다.",
    stack: [
      "Claude Code plugin",
      "한국어 UI",
      "32 skill (brainstorm / design / write-plan / execute-plan + auto-*)",
      "0 외부 의존성",
      "MD 3종(요구사항 · 기술설계 · 구현계획) + .html 다크모드 사본",
      "RISK 주석 표준 + 변경이력 footer",
    ],
    features: [
      "단계별 확인 게이트 — AI 멋대로 진행 방지, 사람 결정만 위로",
      "문서 ↔ 코드 자동 동기화 — 변경 시 downstream MD 까지 자동 갱신",
      "변경이력 자동 footer — CH-id · 사유 · before/after 누적",
      "RISK 주석 자동 부착 — side-effect / breaking / race 3-checklist 자가 점검",
      "서브에이전트 wave-parallel — 독립 task 동시 처리로 체감 시간 ⅓~½",
      ".html 다크모드 사본 — 사람 가독용 시각화",
      "auto-* 흐름 — 사람 입력 최소화한 완전 자동 모드",
    ],
    outcomes: [
      "체감 실행 시간 — 직렬 대비 wave-parallel 도입 후 ⅓~½ 단축",
      "문서·코드 정합 — 변경 후 downstream MD 누락 0",
      "위험 가시화 — 위험 라인이 표준 RISK 주석으로 코드 리뷰에 자동 노출",
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
