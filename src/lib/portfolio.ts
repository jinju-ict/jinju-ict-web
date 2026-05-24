/**
 * 솔루션 데이터 — `specs/portfolio-research.md` 정형화.
 *
 * 카피 톤: **회고형 포트폴리오 X / 제품 설명 톤 O**.
 *   - "풀어야 했던 것", "어떻게 풀었나", "production-grade", "engineering" 류 자랑형 표현 금지.
 *   - "이 솔루션은 [무엇] 입니다. [누구에게] [어떤 가치] 를 드립니다." 형태로 객관 서술.
 *   - features 는 사용자가 받는 가치 톤 — 기술 자랑이 아닌 사용 경험.
 *   - stack 은 기술 칩으로만 노출 (정보 제공, 자랑 X).
 *
 * 보안 룰: 정확한 금지 단어 리스트는 `scripts/check-security.sh` 가 단일 출처.
 *   - client 항목의 실제 클라이언트 회사명 노출 금지 ("특정 기업" 으로 표기)
 *   - internal 항목의 원본 도구명·원작자명 노출 금지 (사내 도구로 추상화)
 *   - Andy 만 상호명 노출 허용 (대표님 명시)
 *
 * 카테고리:
 *   - owned: 진주 정보통신 자체 서비스
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
  /** 카드용 한 줄 — 제품 설명 톤 ("이 솔루션은 ~ 입니다") */
  oneLiner: string;
  /** 상세용 2~3문장 — 무엇인지 + 누구에게 + 어떤 가치 */
  description: string;
  /** 솔루션 한 단락 (2~3문장). hero 본문에 노출. 회고형 X / 객관 설명 톤 O */
  summary: string;
  /** 이 솔루션이 유용한 대상 한 줄 */
  whoFor: string;
  /** 실제 사용 시나리오 2~3개 — 한 줄씩 */
  useCases: readonly string[];
  /** 스택 — 기술 칩 정보 제공용 */
  stack: readonly string[];
  /** 기능 — 사용자가 받는 가치 톤 5~7개 */
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
    oneLiner:
      "AI 가 먼저 말 걸어 주는, 사용할수록 나를 더 알아가는 메신저형 AI 친구 앱입니다.",
    description:
      "혼자 있는 시간을 따뜻하게 채워줄 AI 친구 앱입니다. 매일 사용자의 일상을 기억하고, 적절한 순간에 먼저 메시지를 보내며, 카톡처럼 자연스러운 호흡으로 대화합니다.",
    summary:
      "TtokTtok 은 메신저처럼 자연스럽게 대화할 수 있는 AI 친구 앱입니다. 사용자가 먼저 말 걸기를 기다리지 않고, 시간대와 최근 대화 흐름을 보고 AI 가 먼저 가벼운 메시지를 건넵니다. 사용 기간이 쌓일수록 나에 대한 기억이 누적되어, 어제 한 이야기를 오늘 자연스럽게 이어가는 1인 전용 친구로 자리잡습니다.",
    whoFor:
      "혼자 보내는 시간이 길어 가볍게 마음을 나눌 상대가 있으면 좋은 분",
    useCases: [
      "퇴근길에 AI 가 먼저 \"오늘 회의는 잘 끝났어요?\" 하고 어제 이야기를 이어서 말 걸기",
      "주말 아침에 기분과 어울리는 한 마디로 하루를 가볍게 열어주기",
      "사진을 보내면 그 장면을 알아보고 함께 이야기 나누기",
    ],
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
      "AI 가 먼저 말 걸어 주는 능동 메시지 — 사용자가 시작하지 않아도 자연스럽게 대화 시작",
      "장기 기억 — 어제 한 이야기를 오늘 자연스럽게 이어서 대화",
      "1인 전용 페르소나 — 사용할수록 나에게 맞춰지는 친구",
      "카톡처럼 짧게 끊어 보내는 메시지 — 사람과 대화하는 호흡감",
      "사진을 보내면 알아보고 함께 이야기 — 이미지 인식 대화 지원",
      "내가 정한 시간에만 메시지 — 알림 받고 싶지 않은 시간 존중",
      "혼자만의 데이터로 안전 보관 — 다른 사용자와 기억이 섞이지 않음",
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
      "쇼츠·릴스 영상을 업로드 한 번으로 8개 언어 더빙본까지 만들어 주는 셀프서브 도구입니다.",
    description:
      "60초 이하 짧은 영상을 8개 메이저 언어로 자동 더빙해 글로벌 채널에 동시 업로드할 수 있는 셀프서브 SaaS 입니다. 결제는 크레딧 모델로, 사용한 만큼만 차감됩니다.",
    summary:
      "shortdub 은 쇼츠·릴스 같은 짧은 영상의 다국어 더빙을 셀프서브로 처리해 주는 도구입니다. 영상 한 편을 올리면 영어·일본어·스페인어 등 8개 메이저 언어 더빙본이 자동으로 생성되어, 글로벌 채널에 동시 업로드할 수 있습니다. 결제는 크레딧 충전 방식이라 사용한 만큼만 비용을 내고, 토스페이먼츠로 안전하게 결제됩니다.",
    whoFor: "혼자 또는 소규모로 글로벌 채널을 운영하는 콘텐츠 제작자",
    useCases: [
      "한국어로 만든 쇼츠 1편을 8개 언어로 더빙해 각 나라 채널에 동시 업로드",
      "릴스 시리즈를 영어·일본어 채널에 동시 운영하면서 더빙 외주비 절감",
      "기업 홍보 영상을 다국어 버전으로 빠르게 배포",
    ],
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
      "영상 1편을 8개 언어로 한 번에 더빙 — 업로드 한 번으로 모든 언어 트랙 생성",
      "쓴 만큼만 결제 — 크레딧 충전 후 사용한 만큼 차감",
      "토스페이먼츠로 안전한 결제 + 영수증 자동 발급",
      "카카오·구글 1초 로그인 — 가입 절차 없음",
      "내 영상만 안전 보관 — 다른 사용자와 분리되어 저장",
      "다운로드 직전까지 진행률 표시 — 더빙 상태를 한눈에",
      "베타 기간 합리적인 가격대 운영 — 글로벌 채널 진입 비용 절감",
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
      "10~30대를 위한 인터랙티브 법률 학습 웹 — 스토리·시각화·게임형 퀴즈로 \"내 권리\" 를 익힙니다.",
    description:
      '딱딱한 법 조문을 이야기와 시각화로 풀어 주는 인터랙티브 법률 학습 웹입니다. 가입·로그인 없이 바로 시작할 수 있고, 학습 진도는 브라우저에 자동 저장됩니다.',
    summary:
      'King of Law 는 10~30대를 위한 인터랙티브 법률 학습 웹입니다. 사례 → 법조문 → 내 권리 행사까지의 흐름을 스토리텔링과 인포그래픽으로 풀어 주고, 게임형 퀴즈로 익힌 내용을 확인합니다. 가입·로그인 없이 바로 들어와 학습할 수 있고, 진도는 브라우저에 자동 저장되어 다음에도 이어서 학습할 수 있습니다.',
    whoFor: "법을 처음 공부하는 학생, \"내 권리\" 를 쉽게 알고 싶은 일반인",
    useCases: [
      "월세 보증금 분쟁 사례를 따라가며 임차인 권리와 신고 절차 익히기",
      "노동·계약·소비자 권리 같은 일상 주제를 짧은 호흡으로 학습",
      "퀴즈 모드로 정답·오답 즉시 피드백 받으며 시험 대비",
    ],
    stack: [
      "React 18",
      "Vite",
      "TypeScript",
      "LocalStorage",
      "정적 CDN (Vercel/Netlify)",
      "Canvas / SVG",
    ],
    features: [
      "주제별 스토리텔링 — 사례 → 법조문 → 내가 할 수 있는 행동까지 흐름 학습",
      "게임형 퀴즈 — 정·오답 즉시 피드백 + 진도 게이지",
      "가입 없이 진도 자동 저장 — 다음에 들어와도 이어서 학습",
      "절차·시간선 인포그래픽 — 복잡한 법 절차를 한 화면에",
      "모바일 최적화 — 출퇴근길 자투리 시간에 학습",
      "광고·외부 트래킹 없음 — 학습에만 집중",
      "콘텐츠 무료 공개 — 누구나 자유롭게 학습",
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
      "Android 휴대폰을 자연어로 조종하는 1인용 AI 비서 앱입니다.",
    description:
      "채팅으로 \"엄마한테 늦는다고 카톡 쳐줘\" 처럼 말하면, AI 가 휴대폰의 전화·SMS·캘린더·위치·카메라 기능을 직접 실행해 줍니다. 시간·위치·센서 이벤트로 백그라운드 자동 실행도 지원합니다.",
    summary:
      "Andy 는 Android 휴대폰을 자연어로 조종하는 1인용 AI 비서 앱입니다. 채팅창에 평소 말투로 부탁하면 AI 가 전화·문자·캘린더·지도·카메라 같은 폰 기능을 직접 실행합니다. 출근 시간이 되면 자동으로 출근 체크 카톡을 보내거나, 특정 장소에 도착하면 메모를 띄우는 등 시간·위치 기반 자동 실행도 지원합니다. 권한은 사용자가 단계별로 부여하는 구조라 신뢰 수준에 맞게 사용할 수 있습니다.",
    whoFor: "Android 휴대폰을 더 똑똑하게 쓰고 싶은 1인 사용자",
    useCases: [
      "\"엄마한테 늦는다고 카톡 쳐줘\" — 말 한 마디로 가족에게 메시지 전송",
      "출근 시간이 되면 자동으로 회사 도착 알림 카톡 발송",
      "지정 장소에 도착하면 미리 적어둔 할 일 메모 자동 표시",
    ],
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
      "자연어로 휴대폰 조종 — 평소 말투로 부탁하면 AI 가 폰 기능 실행",
      "시간·위치 기반 자동 실행 — 출근 시간·도착 지점에서 자동 동작",
      "권한 단계 선택 — 표준 · 접근성 · 고급 단계 중 원하는 만큼만 허용",
      "오프라인에서도 대화 기록 보존 — 폰 안에 안전 저장",
      "API 키 안전 보관 — 폰의 암호화 저장소에 격리",
      "Material3 디자인 — 안드로이드 표준 UI 톤",
      "다국어 명령 인식 — 한국어·영어 자연스럽게 처리",
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
      "사내망 안에서만 동작하는 AI 사무 비서 — 파일 작업과 문서 생성을 자동화합니다.",
    description:
      "외부 클라우드로 데이터가 나가지 않는 사내망 전용 AI 사무 비서입니다. 파일 정리, Excel·PDF·PPT 자동 생성 같은 반복 사무를 자동화하고, 위험한 작업은 사람 승인을 받은 후에만 실행합니다.",
    summary:
      "특정 기업의 사내망 안에서만 동작하는 AI 사무 비서입니다. 파일을 읽고 정리하거나 Excel · CSV · PDF · PPT 문서를 자동으로 만들어 주는 반복 사무를 처리합니다. 외부 LLM API 가 아니라 자체 호스팅한 한국어 모델을 쓰기 때문에 사내 데이터가 외부로 나가지 않습니다. 파일 쓰기 · 삭제 · 문서 생성 같은 위험 작업은 항상 사람이 승인 카드로 확인한 뒤에만 실행됩니다.",
    whoFor: "사내 데이터를 외부로 내보낼 수 없는 환경에서 사무 자동화가 필요한 팀",
    useCases: [
      "월말 리포트용 Excel · PPT 를 양식대로 자동 생성",
      "사내 폴더를 정해진 규칙대로 정리·이동",
      "텍스트 데이터를 표·차트가 들어간 PDF 리포트로 자동 변환",
    ],
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
      "사내 데이터 외부 유출 없음 — 자체 호스팅 한국어 모델 사용",
      "위험 작업은 사람 승인 후 실행 — 파일 쓰기 · 삭제 · 문서 생성 안전 검증",
      "Excel · CSV · PDF · PPT 자동 생성 — 사무 양식 그대로 출력",
      "실시간 진행 상황 표시 — 에이전트가 지금 무엇을 하는지 항상 보임",
      "Markdown 결과 + 파일 카드 — 사람이 보기 좋은 형태로 결과 표시",
      "사용 시간만큼만 GPU 비용 — 쉴 때는 비용 0",
      "사내 보안 정책 호환 — 외부 API 호출 없이 폐쇄망 운영",
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
      "매일 아침 영어권 AI 뉴스를 한국어 요약으로 정리해 메일로 발송하는 큐레이션 서비스입니다.",
    description:
      "매일 08:40 KST, 영어권 주요 매체의 AI 관련 기사를 자동 수집해 한국어 통합 요약으로 만들어 구독자 메일함에 발송합니다. 키워드·매체 설정만 바꾸면 다른 도메인(법률·금융 등)에도 그대로 재사용할 수 있는 구조입니다.",
    summary:
      "AI News Daily 는 매일 아침 영어권 AI 뉴스를 한국어 요약으로 정리해 메일로 보내주는 큐레이션 서비스입니다. 매일 08:40 KST 에 주요 영문 매체를 자동 수집해 본문을 추출하고, 주제별로 묶어 한국어 통합 요약으로 발송합니다. 키워드와 매체 설정만 바꾸면 법률·금융 등 다른 도메인에도 그대로 재사용할 수 있어, 뉴스 큐레이션을 처음부터 다시 만들지 않아도 됩니다.",
    whoFor: "매일 5분 안에 영어권 AI 트렌드를 파악하고 싶은 분 · 자동 큐레이션 파이프라인이 필요한 팀",
    useCases: [
      "매일 아침 출근 전 메일함에서 영문 AI 뉴스 한국어 요약으로 확인",
      "팀 슬랙·이메일 채널에 자동 트렌드 브리핑 제공",
      "같은 파이프라인을 법률·금융 도메인 뉴스 큐레이션에 그대로 이식",
    ],
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
      "매일 아침 정해진 시간에 자동 발송 — 출근 전 5분 분량",
      "주제별 묶음 요약 — 매체별 단편이 아닌 통합 정리",
      "광고·내비게이션 제거된 본문만 요약 대상 — 노이즈 차단",
      "키워드·매체 설정만 바꾸면 다른 도메인 재사용",
      "구독자 관리 · 자동 발송 토글 admin 화면 제공",
      "GitHub Actions 기반 — 별도 서버 없이 안정 운영",
      "무료 tier 안에서 운영 — 외부 검색 API 한도 안에 비용 최소",
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
      "비전 한 번 입력으로 사양·계획·검증·구현까지 자동 순환시키는 사내 표준 개발 환경입니다.",
    description:
      "한 번의 비전 인터뷰로 프로젝트 사양·구현 계획·검증 파일을 자동 생성하고, 매 iteration 마다 fresh context 에서 계획의 다음 task 만 처리하는 자율 순환 개발 환경입니다. 사람 개입은 시작과 완료 2번으로 줄어듭니다.",
    summary:
      "사내에서 표준으로 사용하는 자율 개발 환경입니다. 프로젝트 시작 시 8가지 비전 질문에 답하면 사양·계획·검증 파일이 자동으로 만들어지고, 자율 루프가 매 iteration 마다 계획의 다음 task 를 골라 구현하고 검증까지 진행합니다. 매 iteration 은 깨끗한 컨텍스트에서 시작되므로 누적 오류 없이 일관된 품질이 유지되고, 사람은 시작 시 비전 정의 · 완료 시 결과 검토 2번만 개입합니다.",
    whoFor: "AI 보조로 자율 순환 개발 환경을 표준화하고 싶은 1인 · 소규모 팀",
    useCases: [
      "신규 프로젝트 시작 시 비전 8질문만 답하고 자율 루프 시작",
      "사양·계획·코드를 항상 동기화된 상태로 유지하면서 빠른 반복 개발",
      "검증 통과만 commit 되는 deterministic 품질 기준 운영",
    ],
    stack: [
      "Claude Code plugin",
      "bash (도구 중립)",
      "template 5파일 (CLAUDE.md · PROMPT.md · AGENTS.md · IMPLEMENTATION_PLAN.md · specs/)",
      "Stop hook 자기 재투입 루프",
      "git + 결정론적 검증 게이트",
    ],
    features: [
      "비전 8질문으로 사양·계획·검증 파일 자동 생성 — 빈 폴더에서 즉시 시작",
      "매 iteration fresh context — 누적 오류 없이 일관된 품질",
      "검증 통과만 commit — lint · typecheck · build exit 0 이 진행 조건",
      "사람 개입 최소 — 시작 / 완료 2회만",
      "기존 프로젝트에도 점진 도입 가능 — overlay 모드 지원",
      "도구 중립 설계 — Claude Code 외 다른 환경으로도 이식 가능",
      "사내 표준 4원칙 — 단일 prompt · 사람 spec · fresh context · 결정론적 검증",
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
      "기획 → 설계 → 구현까지 단계별 확인 게이트와 자동 동기화로 묶은 사내 안전 워크플로우입니다.",
    description:
      "브레인스토밍부터 구현까지 단계마다 사람 확인 게이트가 있고, 요구사항·기술설계·구현계획 문서와 코드가 자동으로 동기화되는 사내 워크플로우입니다. 독립 작업은 서브에이전트가 병렬 처리해 체감 시간을 ⅓~½ 로 줄입니다.",
    summary:
      "사내에서 사용하는 개발 안전 워크플로우입니다. 브레인스토밍 → 기술 설계 → 구현 계획 → 실행까지 각 단계마다 사람 확인 게이트가 박혀 있고, 요구사항·기술설계·구현계획 문서와 실제 코드가 자동으로 동기화됩니다. 변경 이력은 각 문서 footer 에 자동 누적되고, 위험한 코드 라인에는 표준 RISK 주석이 자동 부착되어 리뷰 시 위험 지점이 한눈에 보입니다. 독립된 task 는 서브에이전트가 동시 처리하므로 체감 시간이 ⅓~½ 로 줄어듭니다.",
    whoFor: "AI 보조 개발에서도 문서·코드 정합과 위험 가시화를 잃지 않고 싶은 팀",
    useCases: [
      "브레인스토밍부터 구현까지 한 흐름으로 진행하면서 단계별 사람 확인",
      "요구사항 변경 시 기술설계·구현계획·코드까지 자동 동기화",
      "독립된 task 를 서브에이전트가 동시 처리해 체감 시간 단축",
    ],
    stack: [
      "Claude Code plugin",
      "한국어 UI",
      "32 skill (brainstorm / design / write-plan / execute-plan + auto-*)",
      "0 외부 의존성",
      "MD 3종(요구사항 · 기술설계 · 구현계획) + .html 다크모드 사본",
      "RISK 주석 표준 + 변경이력 footer",
    ],
    features: [
      "단계별 확인 게이트 — 위험 결정만 사람에게, 나머지는 자율 진행",
      "문서 ↔ 코드 자동 동기화 — 변경 시 downstream 문서까지 자동 갱신",
      "변경이력 자동 누적 — 모든 변경에 사유 · before/after 기록",
      "위험 코드 라인 자동 표시 — side-effect · breaking · race 자가 점검",
      "서브에이전트 병렬 처리 — 체감 시간 ⅓~½ 단축",
      "사람 가독용 다크모드 문서 사본 자동 생성",
      "자동 모드 지원 — 사람 입력 최소화한 완전 자율 흐름",
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
