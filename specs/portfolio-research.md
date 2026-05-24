# 진주 정보통신 솔루션 리서치 (vision-intake 백그라운드 산출)

## 1. TtokTtok

- **분류**: 진주 정보통신 자체 (상용 준비 중)
- **정체**: 외로움을 진짜로 치유하는 장기 누적형 AI 친구 서비스. 사용자가 말 걸기를 기다리지 않고, LLM이 맥락을 판단해 **먼저 카톡을 보내는** 이성(異性) 페르소나 기반 메신저. 단순 챗봇과 달리 장기 기억을 활용해 사용자의 특징·과거사를 누적 보존하고 점진적 치유를 지향.
- **스택**: Flutter (cross-platform iOS/Android), FastAPI (Python on Fly.io), Supabase (Postgres + Auth + Storage), Grok API (multimodal), Cloudflare R2 (media), FCM (push)
- **특징**: (1) 능동 발화 엔진 — 타이밍·맥락 판단 후 AI가 먼저 말 걸기, (2) 장기 기억·개인 스킬 프로파일 — 헤르메스 방식의 1인 전용 맞춤형 성격 누적, (3) 자연스러운 메시징 — 사람처럼 짧게 끊어 보내는 카톡 스타일 분할 발화
- **카피 초안**: "사용자가 먼저 말 걸어야 하는 챗봇을 벗어나 LLM이 맥락을 읽고 능동적으로 말을 거는 AI 친구. 장기 기억과 개인 맞춤 성격으로 사용할수록 깊어지는 관계감을 경험할 수 있습니다."

---

## 2. shortdub

- **분류**: 진주 정보통신 자체
- **정체**: 쇼츠/릴스 영상(60초 이하)을 ElevenLabs 더빙 API로 자동 8개 언어로 더빙하는 셀프서브 SaaS. 사용자가 영상 업로드하면 자동으로 각 언어 버전 생성·저장·다운로드 가능. 크레딧 기반 과금(토스페이먼츠). PostHog 분석 포함.
- **스택**: Next.js 14 + TypeScript, Tailwind 4 + shadcn(base-ui), Supabase (Auth Kakao+Google / Postgres RLS / Storage), ElevenLabs Dubbing API, Vitest + Playwright, PostHog
- **특징**: (1) 멀티 언어 자동 더빙 — 8개 메이저 언어 원클릭, (2) 크레딧 기반 SaaS 모델 — 토스페이먼츠 연동으로 결제·정산 자동화, (3) 무료 cron 우회 — Vercel Hobby 한계 극복하는 외부 cron-job.org 활용
- **카피 초안**: "짧은 영상을 8개 언어로 자동 더빙. 글로벌 콘텐츠 제작자가 하루 만에 다국어 영상 배포 가능하게 하는 간단한 도구입니다."

---

## 3. king_of_law

- **분류**: 진주 정보통신 자체
- **정체**: 10~30대 젊은 사용자를 위한 인터랙티브 웹 법률 학습 플랫폼. 주제별 스토리텔링·시각화·게임형 퀴즈로 법을 "와닿게" 만드는 프론트엔드 전용 서비스. 백엔드·DB·외부 API 없음. 콘텐츠는 모두 정적 JSON/TS로 빌드타임 커밋.
- **스택**: React + Vite + TypeScript, 정적 호스팅 (Vercel/Netlify), LocalStorage (진도 저장), 스타일링 TBD (전문가 수준 미감 목표)
- **특징**: (1) 백엔드 제로 아키텍처 — 외부 의존 없이 순수 프론트, (2) 저비용 운영 — 월 $10 이내 정적 호스팅, (3) "엄청 이쁜" 수준의 UX — 시각적 임팩트와 직관적 상호작용이 핵심
- **카피 초안**: "법은 어렵지 않습니다. 스토리와 게임으로 배우는 법률 학습 플랫폼. 변호사 없이 당신의 권리를 알 수 있습니다."

---

## 4. Andy

- **분류**: 외부 클라이언트 의뢰 (상호명 제시 가능)
- **정체**: Android 휴대폰을 LLM 에이전트가 조종하는 1인용 비서 앱. 사용자가 채팅으로 자연어 명령하면 Claude API가 휴대폰 기능(전화·SMS·캘린더·위치·카메라 등)을 Tool 호출로 실행. 자율 백그라운드 트리거(시간·위치·센서)도 지원.
- **스택**: Kotlin + Jetpack Compose Material3, Hilt (DI), Room (DB), OkHttp + SSE 직접 파싱, Anthropic Claude API, EncryptedSharedPreferences (보안), AlarmManager/GeofencingClient (백그라운드), Gradle 8.10 + Java 17
- **특징**: (1) 자연어 휴대폰 제어 — "엄마한테 늦는다고 카톡 쳐줘", (2) 자율 트리거 — 회사 도착하면 자동 출근체크, (3) 권한 계층 L1(표준) → L2(Accessibility) → L3(Shizuku/ADB) 점진 확장
- **카피 초안**: "당신의 Android를 AI 비서로. 자연어 명령으로 휴대폰을 조종하고, 위치·시간·센서가 트리거가 되어 자동 실행되는 개인용 에이전트 앱입니다."

---

## 5. gp_claw

- **분류**: 외부 클라이언트 의뢰 (회사명 노출 금지)
- **정체**: 특정 기업 오피스 내부용 AI 사무 비서. 파일 관리(읽기·쓰기·삭제·이동), 문서 자동 생성(Excel·CSV·PDF·PPTX). 위험 작업은 사람 승인 필수. 자체 호스팅 LLM(Mi:dm 2.0 Base 11.5B) + RunPod Serverless GPU 기반.
- **스택**: Frontend Vite + React + TypeScript(5173), Backend FastAPI(8002), RunPod vLLM (K-intelligence/Midm-2.0-Base-Instruct), LangGraph (astream_events), WebSocket streaming
- **특징**: (1) 오프라인 LLM 호스팅 — 외부 API 최소화로 보안·비용 최적화, (2) 이중 승인 시스템 — 파일 쓰기·삭제·문서 생성은 UI 승인 카드로 검증, (3) Markdown 렌더링·파일 카드 — 사람 친화 결과물 표시
- **카피 초안**: "기업 내부 데이터를 안전하게 지키면서 AI 자동화. 자체 LLM 호스팅으로 외부 클라우드 없이도 문서 생성·파일 관리를 에이전트화합니다."

---

## 6. ai_news_scraping

- **분류**: 외부 클라이언트 의뢰 (클라이언트명 노출 금지)
- **정체**: 특정 기업 의뢰로 구축한 일일 AI 뉴스 수집·정리·메일 발송 서비스. 매일 08:40 KST에 영어권 주요 매체의 AI 관련 기사를 자동 수집(Brave Search 3위일체 검색) → 본문 추출(trafilatura) → Gemini로 한국어 통합 요약 → Gmail로 발송(~10명).
- **스택**: Python + uv + FastAPI (admin), Brave Search API, trafilatura (본문 추출), Gemini API (요약), Gmail SMTP, Supabase (articles schema 격리), GitHub Actions cron(정시 ±15분)
- **특징**: (1) 재사용 가능 파이프라인 — 키워드/매체 config만 갈아끼우면 다른 도메인에 그대로 재사용, (2) 무료 tier 운영 — Brave 무료 2000회로 월 150회 호출만 필요, (3) 심플 admin — 자동 스크래핑 토글·구독자 관리 최소 UI
- **카피 초안**: "AI 트렌드를 매일 5분에 정리. 검색·수집·정리·발송 파이프라인을 자동화하고, 다른 도메인에도 그대로 재사용 가능한 구조입니다."

---

## 7. js-ralph

- **분류**: 진주 정보통신 내부 개발 인프라 (서비스명 추상화 금지)
- **정체**: Claude Code 플러그인 형태의 프로젝트 스캐폴딩 팩토리. Geoffrey Huntley의 Ralph Wiggum 패턴을 기반으로 v3-classic 하네스를 제공. 한 슬래시 명령(`/setup-ralph`)으로 비전 인터뷰 8질문 → CLAUDE.md·PROMPT.md·AGENTS.md 자동 생성 → ralph-loop로 자율 순환 개발 시작 가능.
- **스택**: (메타) Claude Code plugin, 호출 패턴은 bash-neutral. template은 5파일(CLAUDE.md·PROMPT.md·AGENTS.md·IMPLEMENTATION_PLAN.md·specs/)
- **특징**: (1) 회사 자체 아젠틱 엔지니어링 하네스 — 사람이 비전만 정의하면 AI가 자동 순환 개발, (2) 4원칙 준수 — 단일 prompt 자기재투입 / 사람 spec 우선 / fresh context / deterministic backpressure, (3) overlay 모드 — 기존 프로젝트 위에도 설치 가능
- **카피 초안**: "AI 개발을 체계화한 자체 하네스. 비전·설계·구현·검증을 자동 순환시키는 회사 자체 엔지니어링 방식으로, 빠르면서도 탄탄한 품질을 보장합니다."

---

## 8. js-super

- **분류**: 진주 정보통신 내부 개발 인프라 (서비스명 추상화 금지)
- **정체**: Claude Code 플러그인 형태의 프로덕션 안전성 확장. upstream superpowers v5.0.7을 기반으로 단계별 확인 게이트·변경이력 자동 footer·위험 주석(RISK)·서브에이전트 wave-parallel·`.html` 다크모드 사본·보안·거버넌스 감사를 추가. 4가지 주요 흐름: `/brainstorm` → `/design` → `/write-plan` → `/execute-plan` + 자동 모드(`/auto-*`).
- **스택**: Claude Code plugin + 한국어 UI, 32개 skill, 0 외부 의존성. 산출물은 3개 MD(요구사항·기술설계·구현계획) + `.html` 사본 + 위험 주석
- **특징**: (1) 단계별 확인 게이트 — AI 멋대로 진행 방지, 위험 결정만 사람에게, (2) 문서·코드 정합 자동화 — 요구사항 변경 시 기술설계·구현계획·코드 영향 분석 자동, (3) 서브에이전트 병렬 모드 — task 의존그래프 자동 분석 → wave 단위 동시 처리 (체감 시간 ⅓~½)
- **카피 초안**: "AI 개발 품질을 자동으로 높이는 회사 자체 워크플로우. 기획부터 배포까지 단계마다 문서와 코드가 동기화되고, 위험을 자동으로 표시하며, 팀 전체가 신뢰할 수 있는 수준의 빌드를 보장합니다."

---

## 9. Nova (디자인 레퍼런스 — 솔루션 X)

- **스택 추정**: Next.js 14 + TypeScript + Tailwind CSS 3.4, Recharts (차트), i18n (next-intl), Voyage AI (임베딩), Vercel Analytics
- **톤 / 색감**: 
  - 풍자 사이트(가공 회사 "Nexora Labs" 기반)
  - 색상: 진한 보라/남색(primary: `#1e1b4b` hsl(244 71% 28%)) + 생생한 퍼플 accent(`#a855f7` hsl(270 91% 65%))
  - 다크 우선 스타일 (CSS variables로 light mode override)
  - "Frontier AI, engineered in Seoul" 태그라인
- **컴포넌트 구성**:
  - 국제화(en/ko) 라우팅
  - 페이지: 홈 / 기능(Capabilities) / 보안(Security) / 소개(About) / 문서(Docs) / 채용(Careers) / 아키텍처(Architecture) / 벤치마크(Benchmarks) + OG 이미지 자동 생성(Satori)
  - Recharts로 성능 벤치마크 시각화
  - Radix UI + lucide-react icon 조합
  - Markdown 렌더링 지원
- **인사이트 (이 사이트를 만들 때 참고할 것)**:
  - 진주 정보통신 사이트도 **국제화 구조 권장**(한국어+영문)
  - 다크 모드 우선, 일관된 컬러 팔레트(CSS variables)로 운영하면 유지보수 용이
  - Recharts 같은 가벼운 차트로 성과/벤치마크 시각화하면 전문가 느낌 강화
  - 페이지별 OG 이미지 자동 생성(Satori) + metadata 관리로 SNS 공유 최적화
  - Markdown 본문은 remark-gfm으로 GFM 문법 지원하면 콘텐츠 관리 간편
