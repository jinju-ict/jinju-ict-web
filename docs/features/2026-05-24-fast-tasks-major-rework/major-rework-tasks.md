# Major rework — Fast tasks (10개 + integration)

> 진주 정보통신개발 랜딩 페이지의 전면 리워크. 보조 에이전트 wave-parallel dispatch 의 단일 진실 소스.

---

## 컨텍스트 — 대표님 피드백 11개 → 압축

| # | 원본 피드백 | 처리 |
|---|------------|------|
| 1 | 애들 스타일 디자인 | T1 디자인 토큰 갈아엎기 (Stripe-style 묵직 다크) |
| 2 | 포트폴리오 상세페이지 없음 | T6 `/portfolio/[slug]` 풀 페이지 |
| 3 | 포트폴리오 사진 없음 | T4 자산 재수집 (보안 룰 안에서 최대) |
| 4 | 사이드프로젝트 톤 → 고급 개발 용어 | T5 portfolio.ts 카피 고급화 |
| 5 | 내용 빈약 | T5 + T6 + T7~T10 콘텐츠 풍부화 |
| 6 | K-사주 외계인 = 스포일러 | T3 외계인 표현 모두 제거 |
| 7 | 사주 예시사진 잘못됨 | T3 planning_docs/refer*.jpg 선별 cp |
| 8 | 아재느낌 | T1 톤 자동 적용 (절제·묵직·세리프 라벨) |
| 9 | 내용 더 알차게 | T5 + T6 + T7~T10 |
| 10 | 진주ICT → 진주 정보통신개발 | T2 전 사이트 일괄 치환 |
| 11 | 합류하기 + 스크롤 짧음 | T9 Careers + T7 Stats + T8 Process + T10 FAQ (총 +4 섹션) |

### 추가 변경 (작업 도중 대표님 업데이트)
- **수신 이메일**: `dlwlstjq410@gmail.com` → **`teo.baek@outlook.com`** (T2 포함)
- **도메인 확정**: `jinju-ict.com` — `NEXT_PUBLIC_SITE_URL`, metadataBase, sitemap, OG 등 일괄 (T2 포함)

---

## 디자인 토큰 명세 (T1 의 산출물 — 모든 다른 task 가 이 토큰을 따른다)

```css
:root, .dark {
  /* Stripe-style 묵직한 미드나잇 다크 */
  --background: oklch(0.14 0.015 260);          /* #0B0D14 deep midnight */
  --foreground: oklch(0.93 0.005 260);          /* #E7E9EE */
  --card: oklch(0.18 0.018 260);                /* #11141B */
  --card-foreground: oklch(0.93 0.005 260);
  --popover: oklch(0.18 0.018 260);
  --popover-foreground: oklch(0.93 0.005 260);

  --primary: oklch(0.55 0.20 270);              /* #4F5BD5 절제된 인디고 */
  --primary-foreground: oklch(0.98 0 0);
  --accent: oklch(0.55 0.18 285);               /* #6B5BD8 약한 보라 */
  --accent-foreground: oklch(0.98 0 0);

  --muted: oklch(0.22 0.015 260);               /* #1A1D27 */
  --muted-foreground: oklch(0.68 0.01 260);     /* #9CA3AF */

  --border: oklch(0.25 0.012 260);              /* #1F242E */
  --input: oklch(0.22 0.015 260);
  --ring: oklch(0.55 0.20 270);

  /* destructive 유지 */
  --destructive: oklch(0.62 0.22 25);
  --destructive-foreground: oklch(0.98 0 0);

  /* sidebar 토큰 (shadcn 기본) — 메인 톤과 동기화 */
  --sidebar: oklch(0.16 0.015 260);
  --sidebar-foreground: oklch(0.93 0.005 260);
  --sidebar-primary: oklch(0.55 0.20 270);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.22 0.015 260);
  --sidebar-accent-foreground: oklch(0.93 0.005 260);
  --sidebar-border: oklch(0.25 0.012 260);
  --sidebar-ring: oklch(0.55 0.20 270);

  --radius: 0.625rem;
}
```

### 디자인 원칙 (T1 + 전 컴포넌트)
- **글래스 카드 utility**: `bg-white/[0.03] backdrop-blur-xl border border-white/10`
- **미세 그라데이션** 표면: `bg-gradient-to-br from-[oklch(0.18_0.018_260)] via-[oklch(0.16_0.015_260)] to-[oklch(0.14_0.015_260)]`
- **strong gradient text 제거** — 헤드라인은 `text-foreground` 또는 미세 indigo tint 만
- **모션 절제** — `pulse-soft` / `float-slow` / `float-reverse` 진폭 절반 또는 제거, `fade-in-up` 만 유지, `prefers-reduced-motion` 존중
- **chip 톤 다듬기** — `bg-primary/12 border-primary/30` 같이 채도 낮춤
- **타이포** — h1 `font-semibold tracking-tight`, 세리프 헤드라인 금지 (Geist 그대로). uppercase eyebrow 의 letter-spacing 0.18em
- **배경 ambient** — radial 그라데이션 1개 + 미세 grid mask 만, 보라 blob 2개 → 1개로 축소

---

## Tasks

### T1 — 디자인 토큰 갈아엎기 [Wave 1, 단독, 다른 task 들 시작 전 확정 필요 X — 같은 wave 병렬]

- **영향 파일**: `src/app/globals.css` (만), 필요시 `src/app/layout.tsx`
- **명세**:
  - `:root` + `.dark` 의 CSS variables 를 위 토큰 명세로 교체
  - Tailwind 4 `@theme inline` 의 색상 매핑 동기화
  - `@utility animate-pulse-soft / float-slow / float-reverse` 진폭 50% 축소 (또는 제거 후 Hero 등에서 사용 라인 정리)
  - `@utility animate-fade-in-up` 유지
  - `prefers-reduced-motion: reduce` 가드 유지
  - 다른 컴포넌트의 토큰 클래스명 (`bg-primary`, `text-foreground`, `border-border` 등) 은 **건드리지 말 것** — 토큰값 교체만으로 전 사이트 톤이 자동 적용됨
- **commit**: `style: T1 — 디자인 토큰 Stripe 묵직 다크로 갈아엎기 (major-rework)`

### T2 — 회사명 / 이메일 / 도메인 전 사이트 일괄 치환 [병렬, conflict 위험 매우 낮음]

- **영향 파일**: 전 사이트의 매칭 라인. 검색 우선:
  ```bash
  rg -l "진주 ICT|진주ICT|dlwlstjq410|jinju-ict-web\.vercel\.app|jinjuict\.com" \
     src/ public/ specs/ scripts/ *.md *.html .env.example next.config.ts vercel.ts
  ```
- **치환 규칙**:
  - `진주 ICT` / `진주ICT` → **`진주 정보통신개발`** (단, header/footer 로고 일부는 "JID" / "Jinju ICT" 영문 약어 유지 가능 — 본 약어 결정은 보조 에이전트 판단, 일관성만 확보)
  - `dlwlstjq410@gmail.com` → **`teo.baek@outlook.com`**
  - 도메인 placeholder → **`jinju-ict.com`** (예: `NEXT_PUBLIC_SITE_URL`, `src/lib/site.ts` 의 `url`, `app/robots.ts`, `app/sitemap.ts`, OG metadata)
  - `.env.example` 의 `CONTACT_INBOX_TO` 도 갱신
  - `CLAUDE.md` §6 표의 수신 이메일 / 폼 인프라 라인의 이메일 갱신 (단, `onboarding@resend.dev` fallback 은 유지)
  - `SETUP.html` 의 ⚠️ "도메인 미정" 마커 → "jinju-ict.com 결정" 으로 갱신
- **commit**: `chore: T2 — 회사명·이메일·도메인 일괄 치환 (major-rework)`

### T3 — 사주 외계인 표현 제거 + 이미지 교체 + 카피 보강 [병렬]

- **영향 파일**: `src/lib/saju.ts`, `src/components/site/saju-section.tsx`, `public/saju/`
- **명세**:
  1. **외계인 표현 모두 제거** — `tagline` 의 "외계인 관찰자가 들려주는", `description` 의 "B612 외계인 관찰자의 시선으로", `features[0].description` 의 "외계인 관찰자의 시선으로" 등. 대체 톤은 **"전통 사주를 가볍고 친근하게 — 풀이부터 상담까지 한 곳에서"** 같은 절제된 K-사주 카피.
  2. **이미지 교체** — `/Users/goldenplanet/jinsup_space/saju/planning_docs/refer*.jpg` 7장을 Read 로 직접 확인. 모바일 세로 비율 (refer01 720x1067, refer03 1036x1514) 중 **실제 앱 UI 캡처에 가장 가까운 것 1~2장** 선별. 후보 가로 (refer05/06/00) 도 보고 더 정성 높은 게 있으면 채택. 선택 파일을 `public/saju/hero.png` (또는 `screen-1.png` / `screen-2.png`) 으로 cp. 기존 `public/saju/hero.png` 는 덮어쓰기. `saju.ts` 의 `hero` 경로 갱신, 2장 채택 시 `screens: string[]` 배열로 확장.
  3. **카피 보강** — `description` 풍부화 (2~3문장으로 K-사주 + AI 결합 가치 어필). `features` 의 각 description 도 한 단계 고급화.
- **commit**: `feat: T3 — 사주 외계인 제거 + 이미지 교체 + 카피 보강 (major-rework)`

### T4 — 포트폴리오 자산 재수집 (보안 룰 안에서 최대) [병렬]

- **영향 파일**: `scripts/collect-portfolio-assets.sh`, `public/portfolio/`, `src/lib/portfolio-assets.ts`
- **명세**:
  - 각 프로젝트 폴더 위치 (모두 존재 확인됨):
    - TtokTtok: `/Users/goldenplanet/jinsup_ralph/TtokTtok/` (또는 `jinsup_space/TtokTtok/` — git log 최신 비교 후 선택)
    - shortdub: `/Users/goldenplanet/jinsup_ralph/shortdub/`
    - king_of_law: `/Users/goldenplanet/jinsup_ralph/king_of_law/`
    - Andy: `/Users/goldenplanet/jinsup_space/Andy/` (이미 cp 완료, 유지)
    - gp_claw: `/Users/goldenplanet/jinsup_space/gp_claw/`
    - ai_news_scraping: `/Users/goldenplanet/jinsup_ralph/ai_news_scraping/`
    - js-ralph: `/Users/goldenplanet/jinsup_space/js-ralph/`
    - js-super: `/Users/goldenplanet/jinsup_space/js-super/`
  - **기존 SKIP_SECURITY 마커 완화** — 무조건 SKIP 이 아니라 **자산 파일명 + 자산 내부의 명백한 텍스트 (이미지면 OCR 불가하므로 파일명만 판단)** 에 금지 단어 없으면 cp 허용:
    - gp_claw / ai_news_scraping (client): 회사명 안 박힌 generic UI 스크린샷 OK (예: `screenshot_chat.png`, `agent_workflow.png`)
    - js-ralph / js-super (internal): 원본 OSS 이름 ("Ralph Wiggum", "superpowers") 안 박힌 자체 산출물 (로고, README 다이어그램, 우리 plugin 의 UI) OK
  - 후보 디렉토리 확장: `assets/`, `images/`, `screenshots/`, `docs/`, `static/`, `public/`, `app/src/main/res/`, README 옆 PNG/JPG/SVG/WEBP
  - cp 시 `public/portfolio/<slug>/{thumbnail,screen-1,screen-2,...}.{ext}` 표준명. 1개 프로젝트당 1~3장.
  - `src/lib/portfolio-assets.ts` 재생성 — `PORTFOLIO_ASSETS: Record<slug, { thumbnail?: string, screens?: string[] }>`
  - 보안 검증: 수집 직후 `pnpm check:security` 로 자가 검증 (현재 baseline 0건 유지)
- **commit**: `feat: T4 — 포트폴리오 자산 재수집 (보안 룰 안에서 최대) (major-rework)`

### T5 — 포트폴리오 카피 고급화 [병렬]

- **영향 파일**: `src/lib/portfolio.ts` (Project type 확장 + 8개 프로젝트 description 풍부화)
- **명세**:
  - **Type 확장**:
    ```ts
    type Project = {
      slug: string;
      title: string;
      category: 'owned' | 'client' | 'internal';
      categoryLabel: string;
      oneLiner: string;             // 카드용 한 줄 (기존 유지 + 다듬기)
      description: string;          // 상세용 2~3문장 (기존 보강)
      problem: string;              // 신규 — "이 프로젝트가 해결한 문제"
      approach: string[];           // 신규 — "기술적 접근" 3~5 bullet
      architecture: string;         // 신규 — "아키텍처 한 단락" (자유 기술)
      stack: string[];              // 기존, 풍부화 (버전 / 인프라 / 결제 / 분석 포함)
      features: string[];           // 기존, 5~7개로 확장
      outcomes?: string[];          // 신규 — 정성 outcome 2~3개 ("월 N건 자동화", "응답 시간 X" — 추정치 / placeholder)
      accent: string;               // 기존
      icon: ProjectIconName;        // 기존
      comingSoon?: boolean;
    };
    ```
  - **카피 톤**:
    - "AI 친구 서비스" → "능동 발화 엔진과 장기 기억 그래프를 결합한 conversational companion"
    - "더빙 SaaS" → "ElevenLabs Dubbing API 기반 멀티 트랙 영상 파이프라인 / 크레딧 정산 SaaS"
    - "법률 학습" → "백엔드-제로 정적 아키텍처로 운영비를 월 $10 이하로 압축한 인터랙티브 법률 학습 SPA"
    - "Android 비서" → "Claude API 의 tool-use 와 Android Accessibility / Shizuku 계층을 결합한 자율 에이전트 런타임"
    - 등 — `specs/portfolio-research.md` 의 본문을 풍부하게 채워 넣고, 사이드프로젝트가 아니라 **production-grade engineering** 톤으로 작성
    - **보안 룰 절대 위반 X** — gp_claw / ai_news_scraping 의 진짜 클라이언트명, js-ralph / js-super 의 원본 OSS 명 절대 노출 금지. 작성 직후 `pnpm check:security` 로 자가 검증.
- **commit**: `feat: T5 — 포트폴리오 카피 production-grade 톤 + 신규 필드 (major-rework)`

### T6 — 포트폴리오 상세 페이지 `/portfolio/[slug]` [Wave 2 — T4 + T5 산출물 의존]

- **영향 파일**: `src/app/portfolio/[slug]/page.tsx`, `src/app/portfolio/[slug]/opengraph-image.tsx`, `src/components/site/portfolio-card.tsx` (Link 추가)
- **명세**:
  - `generateStaticParams` 로 8개 slug 정적 생성
  - `generateMetadata` 로 페이지별 title / description / OG
  - 페이지 구조:
    1. **상단** — categoryLabel eyebrow + title + oneLiner + accent gradient hero ribbon + 우상단 "← 모든 프로젝트" Link
    2. **Problem / Approach** — 2-col grid (lg). Problem 좌, Approach bullet 우.
    3. **Architecture** — 본문 한 단락 + 토큰 chip 으로 stack 강조
    4. **Features** — 2-col grid bullet (5~7개)
    5. **Outcomes** (있으면) — 3 col grid card
    6. **Screens** — `PORTFOLIO_ASSETS[slug].screens` 있으면 2~3 col masonry / 없으면 placeholder
    7. **하단 CTA** — "프로젝트 같이 만들기" → `/#contact` 앵커
  - `portfolio-card.tsx` 에 `<Link href={`/portfolio/${slug}`}>` 추가 (전체 카드 클릭 가능). 외부 링크가 없는 카드는 상세 페이지로.
  - **반응형**: lg (3-col 이상) / md (2-col) / sm (stack)
  - **글래스 카드** 토큰 사용. **strong gradient 금지** — 절제된 보더 + 미세 backdrop blur.
- **commit**: `feat: T6 — 포트폴리오 상세 페이지 + Card 링크 (major-rework)`

### T7 — Hero 강화 + Stats 띠 [병렬, page.tsx 통합은 메인]

- **영향 파일**: `src/components/site/hero.tsx` (강화), `src/components/site/stats-section.tsx` (신규)
- **명세 — Hero**:
  - h1 의 강한 gradient text 톤 다운 (`text-foreground` + 부분 indigo tint 만)
  - lead 문장 2줄 → 3줄로 확장, 더 묵직한 카피
  - CTA 옆에 secondary outline "포트폴리오 보기" 추가 → `#portfolio`
  - 하단 strength chip 2개 → 3개 (예: "Claude/Gemini production 경험" / "자체 에이전틱 워크플로우" / "보안·운영 leveled experience")
- **명세 — Stats**:
  - `src/components/site/stats-section.tsx` 신규. 4 columns. 각 column: 큰 숫자 (`font-semibold text-4xl` indigo tint) + 라벨 (uppercase muted).
  - 항목 (정량 지표 없음 = placeholder 보수 표현):
    1. **8+ 프로덕션 프로젝트** — "AI/웹/모바일 전 레이어"
    2. **3 자체 서비스 라인업** — "사주 외 2종 준비"
    3. **2 자체 개발 하네스** — "Ralph 기반 / shipping-quality"
    4. **Claude · Gemini · Grok** — "멀티 모델 production 채택"
  - 글래스 카드 row, hover 시 미세 lift. Hero 직후 배치 (page.tsx 메인이 조립).
- **commit**: `feat: T7 — Hero 강화 + Stats 띠 (major-rework)`

### T8 — Process 섹션 [병렬]

- **영향 파일**: `src/components/site/process-section.tsx` (신규)
- **명세**:
  - id="process". eyebrow "우리가 일하는 방식" + title "정성도 빠르게 — 자체 하네스가 받쳐주는 4단계" + lead.
  - 4-col grid (lg) / 2-col (md) / 1-col (sm). 각 column:
    - 번호 chip (00 / 01 / 02 / 03 monospace) + 단계명 + 1줄 요약 + 3 bullet 디테일
  - 4 단계:
    1. **00 Discover** — 비전·요구사항·기술 트레이드오프 정리 (vision-intake / brainstorm)
    2. **01 Design** — 아키텍처·데이터·인터페이스 설계 + 위험 식별 (designing-direction)
    3. **02 Build** — TDD task 분해 + 병렬 wave + 자동 검증 게이트 (executing-plans)
    4. **03 Ship** — 보안·정성·성능 자가 점검 + 배포 + 운영 인수인계 (verification + SETUP)
  - 각 단계에 lucide 아이콘 (Compass / DraftingCompass / Hammer / Rocket) — accent indigo
  - 글래스 카드 + 절제 호버.
- **commit**: `feat: T8 — Process 섹션 (major-rework)`

### T9 — Careers / 합류하기 섹션 [병렬]

- **영향 파일**: `src/components/site/careers-section.tsx` (신규), 폼 재사용은 ContactForm 그대로
- **명세**:
  - id="careers". eyebrow "Careers · 합류하기" + title "AI 시대의 정예 팀을 함께 만듭니다" + lead (2~3줄).
  - **포지션 카드 3장** (lg 3-col):
    1. **AI / Product Engineer** — Claude/Gemini production 경험, agentic workflow 설계, 풀스택
    2. **Mobile / App Engineer** — Kotlin (Compose) / Flutter, 자체 앱 라인업 동참
    3. **Designer / Product Strategist** — 정성 미감 + 제품 기획, AI 친화 워크플로우 OK
  - 각 카드: 직군 + 한 줄 무엇 + 3 bullet "찾는 분 / 함께하는 일 / 환경" + 하단 "지원하기 → #contact" Link
  - **CTA 하단 큰 박스** — "정해진 포지션 외에도 의미 있는 합류는 모두 검토합니다. 한 줄 자기소개를 보내주세요." → `#contact` 앵커
  - 글래스 카드 + 절제 호버. 보수적 묵직 톤.
- **commit**: `feat: T9 — Careers 섹션 (major-rework)`

### T10 — FAQ 섹션 [병렬]

- **영향 파일**: `src/components/site/faq-section.tsx` (신규). shadcn `Accordion` 컴포넌트 사용 — 미설치면 `pnpm dlx shadcn@latest add accordion` 후 사용.
- **명세**:
  - id="faq". eyebrow "FAQ" + title "자주 묻는 질문" + lead.
  - 6개 질문:
    1. **외주 / 협업 견적은 어떻게 산정하나요?** — 범위·일정·복잡도 합의 후 견적. 사전 무료 디스커버리.
    2. **AI 모델은 어떤 것들을 production 으로 운영하나요?** — Claude (Anthropic), Gemini, Grok, ElevenLabs Dubbing. 마이그레이션·비용 최적화 경험.
    3. **자체 개발 하네스 / 에이전틱 워크플로우란?** — 추상 표현 OK (원본 OSS 명 금지). "비전 → 설계 → 구현 → 검증 → 배포까지 단일 워크플로우로 묶어 빠르고 일관된 품질을 보장"
    4. **보안·NDA 환경에서도 가능한가요?** — 가능. 자체 LLM 호스팅 (예: gp_claw — 회사명 익명) 경험 있음. 온프레미스 / 격리 환경 모두 가능.
    5. **사주 서비스 출시는 언제인가요?** — 준비중. 출시 알림 신청 받음 (Contact 폼).
    6. **원격 / 부분 협업이 가능한가요?** — 가능. 워크플로우 자체가 비동기·분산 친화. 정기 동기화 + 데모는 유지.
  - 글래스 카드 누적, Accordion 항목별 미세 hover.
- **commit**: `feat: T10 — FAQ 섹션 (major-rework)`

---

## INTEG (메인 직접) — page.tsx 통합 조립

Wave 1 보조 에이전트 모두 PASS 한 후 메인이 직접:

1. `src/app/page.tsx` 의 섹션 순서 갱신:
   ```
   <Hero />
   <StatsSection />        ← 신규
   <About />
   <ProcessSection />      ← 신규
   <TeamSection />
   <PortfolioSection />
   <SajuSection />
   <CareersSection />      ← 신규
   <FaqSection />          ← 신규
   <ContactSection />
   ```
2. `src/components/site/site-header.tsx` 의 anchor 메뉴 갱신 (5개 → 7개 또는 그룹화):
   - About / Process / Team / Portfolio / Saju / Careers / FAQ / Contact
   - 8개라 헤더 좁아짐 — secondary 묶음 또는 드롭다운으로 정리 (정성 판단)
3. `pnpm lint && pnpm typecheck && pnpm check:security` exit 0 확인
4. 최종 commit: `feat: INTEG — page.tsx + header 조립 (major-rework 완료)`

---

## 병렬화 계획 (DAG)

```
Wave 1 (한 메시지에 9개 보조 에이전트 동시 dispatch):
  T1  globals.css       ─┐
  T2  치환              ─┤
  T3  사주              ─┤
  T4  자산 재수집       ─┤  →  서로 다른 파일만 만짐, conflict 없음
  T5  portfolio.ts      ─┤      (T5 와 T4 가 portfolio-assets.ts 와 portfolio.ts 분리되어 있음)
  T7  Hero + Stats      ─┤
  T8  Process           ─┤
  T9  Careers           ─┤
  T10 FAQ               ─┘

Wave 2 (Wave 1 끝난 후 1개 보조 에이전트):
  T6  /portfolio/[slug]  ←  T4 (PORTFOLIO_ASSETS) + T5 (Project type 확장) 의존

INTEG (메인 직접):
  page.tsx + site-header anchor + 검증 + 최종 commit
```

---

## 공통 — 각 보조 에이전트가 반드시 지킬 사항

1. **CLAUDE.md 의 비전 / 사양 + AGENTS.md 의 검증 명령 + specs/portfolio-research.md 의 보안 룰 절대 위반 금지.**
2. **자기 task 의 영향 파일 외에는 손대지 말 것.** page.tsx 통합은 메인 책임.
3. **작업 직후 자체 검증**: 자기 task 범위에서 `pnpm lint && pnpm typecheck` exit 0. T2 / T4 / T5 는 추가로 `pnpm check:security` exit 0.
4. **commit 1회만** — 위 명세의 commit 메시지 사용. **--no-verify 금지**. hook 실패 시 fix 후 새 commit.
5. **응답에서 반드시 보고**: 무엇을 했는가 / 무엇을 건드렸는가 / 검증 결과 / commit hash.
