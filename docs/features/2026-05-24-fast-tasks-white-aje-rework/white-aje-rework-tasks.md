# White-Aje rework — Fast tasks (10개 + integration)

> 진주 정보통신 랜딩의 **2차 전면 리워크**. 직전 major-rework 의 Stripe-style 다크가 "너무 세련됨" 으로 판정 → 화이트 + 회색 + 40~50대 아저씨가 만든 듯한 투박한 톤으로 재정렬. ref/ 의 자산 18장 + js-ralph/js-super 워크플로우 시각화도 함께.

---

## 컨텍스트 — 대표님 피드백 요약

| 항목 | 처리 |
|------|------|
| **너무 세련됨** → 화이트 + 회색 + 아재 투박 | T1 토큰 재정의 + T8a/T8b/T8c 컴포넌트 톤 다운 |
| 다크 → **강제 화이트** | layout.tsx 의 `dark` 클래스 제거, globals.css 의 강제 다크 토큰 → 화이트 토큰 |
| 화려한 효과 (그라데이션 / 글래스 / 블러) 제거 | T1 + T8 — 단순 박스 + 진한 보더 + 단순 그림자만 |
| "Jinju ICT" / "진주 정보통신개발" → **"진주 정보통신"** | T2 일괄 치환 |
| "포트폴리오" → **"솔루션"** (텍스트만, URL 유지) | T3 일괄 치환 |
| 사주 사진 직접 보내주심 (ref/saju/ 3장) | T4 — 외계인 표현 제거 + 이미지 cp + 카피 |
| 5개 프로젝트 사진 직접 보내주심 (ref/ 15장) | T5 — 자산 cp + manifest |
| js-ralph 워크플로우 HTML 시각화 | T6 — 인라인 SVG/JSX 다이어그램 컴포넌트 |
| js-super 워크플로우 HTML 시각화 | T7 — 인라인 SVG/JSX 다이어그램 컴포넌트 |
| 헤더 nav 한국어 + 로고 텍스트 변경 | T8c 에 통합 |

---

## 디자인 토큰 명세 (T1 산출물 — 모든 task 가 이 토큰을 따른다)

**의도**: 40~50대 아저씨가 사무용 툴 (MS Word / 한컴오피스 / Confluence) 톤으로 만든 듯한 투박함. 화려한 색·그라데이션·블러·라운드·모션 모두 제거. 시각 위계는 진한 보더 + 회색 농도 차이 + bold 굵기로만.

```css
/* 강제 화이트 — :root 단일 (dark 클래스 자체를 layout 에서 제거) */
:root {
  --background: oklch(0.985 0 0);              /* 거의 화이트, 미세 따뜻함 (#FAFAFA 톤) */
  --foreground: oklch(0.18 0.005 260);         /* 거의 검정 — #1F2530 */
  --card: oklch(1 0 0);                        /* 순수 화이트 — 보더로 구분 */
  --card-foreground: oklch(0.18 0.005 260);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.18 0.005 260);

  --primary: oklch(0.28 0.008 260);            /* 다크 그레이 — #2A2F3A 류, 채도 거의 0 */
  --primary-foreground: oklch(1 0 0);
  --accent: oklch(0.45 0.01 260);              /* 미디엄 그레이 */
  --accent-foreground: oklch(1 0 0);

  --muted: oklch(0.94 0.003 260);              /* 옅은 회색 BG */
  --muted-foreground: oklch(0.45 0.005 260);   /* 보조 텍스트 회색 */

  --border: oklch(0.78 0.005 260);             /* 진한 보더 회색 — #B8BCC4 류 */
  --input: oklch(0.85 0.003 260);
  --ring: oklch(0.40 0.008 260);

  --destructive: oklch(0.55 0.18 25);          /* 살짝 죽은 빨강 (강한 빨강 X) */
  --destructive-foreground: oklch(1 0 0);

  /* sidebar — 메인과 동기화 */
  --sidebar: oklch(0.97 0 0);
  --sidebar-foreground: oklch(0.18 0.005 260);
  --sidebar-primary: oklch(0.28 0.008 260);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.94 0.003 260);
  --sidebar-accent-foreground: oklch(0.18 0.005 260);
  --sidebar-border: oklch(0.78 0.005 260);
  --sidebar-ring: oklch(0.40 0.008 260);

  --radius: 0.25rem;  /* 거의 직각, 살짝만 둥글게 */
}
```

### 디자인 원칙 (T1 + 전 컴포넌트)

- **글래스 카드 제거** — `bg-white/[0.03] backdrop-blur-xl` 류 일체 금지. 카드는 **`bg-card border-2 border-border shadow-sm`** 평범한 박스.
- **그라데이션 제거** — `bg-gradient-to-*` 일체 금지. 단색 fill 만.
- **strong gradient text 제거** — `bg-clip-text text-transparent` 금지. headline 은 `text-foreground font-bold` 만.
- **모션 거의 제거** — animate-* utility 전부 제거 또는 무의미한 no-op. transition 은 `transition-colors duration-150` 정도만. lift/scale/rotate 호버 금지.
- **그림자 단순화** — `shadow-sm` (기본) / `hover:shadow-md` (호버) 만. drop-shadow / 큰 box-shadow 제거.
- **라운드 최소화** — `rounded-md` (0.375rem) 이하. **`rounded-sm`** (0.125rem) 또는 `rounded` 권장. 카드는 직각 가까운 `rounded-sm` 또는 `rounded-md`.
- **보더 강조** — `border` (1px) 보다는 **`border-2`** (2px) 적극 사용. hover 시 `border-foreground` 정도로만 더 진하게.
- **타이포** — h1 `font-bold tracking-tight` (semibold X — 더 묵직), uppercase eyebrow 의 letter-spacing 0.12em (0.18em 보다 좁게).
- **배경 ambient 일체 제거** — radial 그라데이션 / grid mask / blob 전부 X. 그냥 화이트 BG 만.
- **chip 톤** — `bg-muted border border-border text-foreground` (회색 칩). 컬러 칩 금지.
- **버튼** — primary 는 `bg-primary text-primary-foreground border-2 border-primary hover:bg-foreground hover:border-foreground`. outline 은 `border-2 border-foreground text-foreground hover:bg-foreground hover:text-background`. 둘 다 직각 가까운 `rounded-sm`.
- **레이아웃 spacing** — 더 짧게 (py-12 ~ py-20). 너무 광활한 white space 는 모던 느낌 → 아재 톤에 안 맞음.

---

## Tasks

### T1 — 디자인 토큰 화이트 + 회색 + 아재 투박 [Wave 1, 단독]

- **영향 파일**: `src/app/globals.css`, `src/app/layout.tsx`
- **명세**:
  - globals.css 의 `:root` + `.dark` 둘 다 위 화이트 토큰으로 통일 (한쪽으로 cascade 되도록). `@custom-variant dark` 는 제거 또는 no-op.
  - `color-scheme: dark` → **`color-scheme: light`**
  - `@theme inline` 의 색상 매핑은 토큰명 그대로 (var(--primary) 등). 변경 없음 (토큰값만 갈아엎기).
  - `@utility animate-fade-in-up / float-slow / float-reverse / pulse-soft` 전부 **no-op 또는 제거** (모션 거의 X 정책)
  - `@utility glass-card / surface-gradient` 가 있다면 **단순 박스로 재정의**:
    ```css
    @utility glass-card {
      background-color: var(--card);
      border: 2px solid var(--border);
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.04);
    }
    @utility surface-gradient {
      background-color: var(--card);  /* 그라데이션 X, 단색 */
    }
    ```
  - body::before / body::after 의 radial / grid mask **삭제** (배경 ambient 일체 제거)
  - **layout.tsx**: `<html className="dark ...">` → **`<html className="...">`** (dark 클래스 제거). `colorScheme: "dark"` → `colorScheme: "light"`.
  - `prefers-reduced-motion: reduce` 가드 유지 (이미 모션 없으니 무해)

### T2 — 회사명 일괄 치환 (모든 표기 → "진주 정보통신") [병렬]

- **영향 파일**: `rg -l "Jinju ICT|진주 정보통신개발"` 전체
- **치환 규칙**:
  - `Jinju ICT` → **`진주 정보통신`**
  - `진주 정보통신개발` → **`진주 정보통신`**
  - 그 외 (`JID`, `진주ICT`, `진주 ICT` 라도 미처 못 잡힌 잔존) → **`진주 정보통신`**
  - 영문 표기가 필요한 경우 (예: og:site_name 의 단순 라틴 alt 같이 비요구) 만 예외 — 그러나 가급적 한국어로 통일
- **commit**: `chore: T2 — 회사명 표기 "진주 정보통신" 단일 통일 (white-aje)`
- 다른 task 영역 (T1 globals, T4/T5 자산, T6/T7 워크플로우 등) 은 회사명 외 절대 손대지 마라.

### T3 — "포트폴리오" → "솔루션" 일괄 치환 [병렬]

- **영향 파일**: 한국어 "포트폴리오" 단어가 나오는 모든 곳
  - `rg -l "포트폴리오"` 로 전수 파악
  - 예: header NAV 라벨 (T8c 가 따로 손볼 예정이므로 nav 만 SKIP), portfolio-section 의 eyebrow/title, 상세 페이지 카피, FAQ 답변, careers/process 본문, SETUP.html, CLAUDE.md 등
- **치환 규칙**:
  - `포트폴리오` → **`솔루션`**
  - 단, **URL `/portfolio/[slug]` 는 유지** (SEO + redirect 복잡도 회피)
  - 컴포넌트 파일명 (`portfolio-card.tsx`, `portfolio-section.tsx`) / 변수명 / type 명도 그대로 유지 (refactor 비용)
  - 단순 텍스트 / 마크다운 본문 / metadata description 의 사용자 노출 단어만
- **commit**: `chore: T3 — 사용자 노출 "포트폴리오" → "솔루션" 치환 (white-aje)`

### T4 — 사주 자산 cp + 외계인 제거 + 카피 재작성 [병렬]

- **영향 파일**:
  - `ref/saju/*.png` (3장) → `public/saju/{hero,screen-1,screen-2}.png` cp (선별)
  - `src/lib/saju.ts` — 외계인 표현 모두 제거 + 카피 재작성
- **명세**:
  1. `ref/saju/` 의 png 3장 (모두 모바일 캡처 가정) 을 모두 검토 → 가장 hero 후보로 어울리는 1장을 `public/saju/hero.png` 로 cp, 나머지 2장을 `screen-1.png` / `screen-2.png` 로 cp
  2. `saju.ts` 의 외계인 / B612 / 외계인 관찰자 표현 모두 제거. 대체 카피:
     - tagline: `"전통 사주를 가볍게 — 풀이부터 상담까지 한 앱에서"` 같은 절제된 K-사주 톤
     - description: 2~3문장으로 K-사주 + AI 결합 가치 (가벼움 / 친근함 / 일상 동반) — 외계인 모티프 없이
     - features 각 description 도 외계인 표현 제거 + 한 단계 다듬기
  3. `SAJU.hero` 는 `/saju/hero.png` 유지. `SAJU.screens?: string[]` 추가 (있으면 saju-section 이 모바일 mockup 옆에 sub-thumbnail 로 노출).

### T5 — 5개 프로젝트 자산 cp + manifest 갱신 [병렬]

- **영향 파일**:
  - `ref/king_of_raw/* → public/portfolio/king-of-law/`
  - `ref/앤디/* → public/portfolio/andy/` (기존 자산은 유지하되 새 자산이 더 좋으면 교체)
  - `ref/short_dub/* → public/portfolio/shortdub/`
  - `ref/ai_new_scrap/* → public/portfolio/ai-news-daily/`
  - `ref/똑똑/* → public/portfolio/ttoktok/`
  - `src/lib/portfolio-assets.ts` 재생성
- **명세**:
  1. 각 ref/ 폴더의 png 들을 본 후 어느 게 thumbnail (가장 대표 이미지) / screen-1, screen-2 등인지 선별. 모바일 세로 / 데스크 가로 가리지 않고 정보가 가장 많이 담긴 캡처를 thumbnail 우선.
  2. ref 의 한글 파일명 `스크린샷 2026-05-24...png` 는 표준명 (`thumbnail.png`, `screen-1.png`, `screen-2.png`, `screen-3.png`) 으로 cp 하며 변환.
  3. `public/portfolio/<slug>/` 폴더에 기존 파일 있으면 새 자산이 더 적합하면 덮어쓰기 (T4 의 이전 자동 수집 결과 — 작은 아이콘만 있는 경우엔 실제 화면 캡처로 우선 교체).
  4. `src/lib/portfolio-assets.ts` 재생성:
     ```ts
     export const PORTFOLIO_ASSETS: Record<string, { thumbnail?: string; screens?: string[] }> = {
       "ttoktok": { thumbnail: "/portfolio/ttoktok/thumbnail.png", screens: ["...", "..."] },
       "shortdub": { ... },
       "king-of-law": { ... },
       "andy": { ... },
       "ai-news-daily": { ... },
       // dev-harness, dev-safety, office-agent 는 자산 없음 → omit 또는 빈 객체
     };
     ```
  5. cp 직후 `bash scripts/check-security.sh` 로 자가 검증 (exit 0)
- **commit**: `feat: T5 — 5개 프로젝트 자산 cp (ref/ → public/portfolio/) + manifest (white-aje)`

### T6 — js-ralph 워크플로우 컴포넌트 (인라인 다이어그램) [병렬]

- **영향 파일**: `src/components/site/workflow-harness.tsx` (신규, "harness" = 추상 표현, 원본 OSS명 X)
- **명세**:
  1. `/Users/goldenplanet/jinsup_space/js-ralph/README.md` + `CLAUDE.md` 까서 워크플로우 / 4원칙 / 5파일 구조 파악
  2. **추상 컴포넌트로 시각화** — "Ralph Wiggum" / "Geoffrey Huntley" / "ralph-loop" 등 원본 출처 단어 절대 금지. 우리 자체 v3-classic 표현으로:
     - "능동 순환 (self-loop) 패턴"
     - "단일 prompt + 자기 재투입"
     - "fresh context iteration"
     - "deterministic backpressure (lint/typecheck/test)"
     - "5파일 spec: CLAUDE.md / PROMPT.md / AGENTS.md / IMPLEMENTATION_PLAN.md / specs/"
  3. **다이어그램 형태** (SVG 또는 div + CSS): 
     - 상단: 비전 인터뷰 (8 질문) → 동결 → onboarded: true
     - 중간: 매 iteration fresh context → 4파일 읽기 → task 선택 → 구현 → 검증 → commit → Stop hook 재투입 (순환 화살표)
     - 하단: 종료 조건 — 모든 task `[x]` → `PROJECT_DONE`
  4. **톤 일관** — T1 화이트 + 회색 + 아재 투박. SVG 도 회색 stroke + 단색 fill. 화려한 색 금지.
  5. Section 래퍼는 호출자 (T8c portfolio 상세 페이지) 가 감싸므로, 본 컴포넌트는 `<div>` 루트로 시작.
  6. props: `{ className?: string }` (className override 가능).

### T7 — js-super 워크플로우 컴포넌트 (인라인 다이어그램) [병렬]

- **영향 파일**: `src/components/site/workflow-safety.tsx` (신규, "safety" = 추상 표현)
- **명세**:
  1. `/Users/goldenplanet/jinsup_space/js-super/README.md` 까서 4단계 흐름 + 게이트 + 서브에이전트 wave 패턴 파악
  2. **추상 컴포넌트로 시각화** — "superpowers" / "Jesse Vincent" / upstream 출처 절대 금지. 우리 자체 표현으로:
     - "단계별 확인 게이트 (Discovery → Design → Plan → Build)"
     - "사람 친화 .html 사본 자동 생성"
     - "위험 주석 (RISK 3-checklist) 자동 부착"
     - "변경이력 footer 자동 누적"
     - "서브에이전트 wave-parallel — DAG 자동 분석 후 단계 dispatch"
  3. **다이어그램 형태** (SVG 또는 div + CSS):
     - 상단 flow: `/brainstorm → 요구사항.md → 게이트 → /design → 기술설계.md → 게이트 → /write-plan → 구현계획.md → 게이트 → /execute-plan → 코드`
     - 중간: 각 .md 옆에 .html (사람 검토용) 사본
     - 하단: wave-parallel — task 들이 의존그래프로 묶여 wave 단위로 동시 처리
  4. **톤 일관** — T1 화이트 + 회색 + 아재 투박.
  5. Section 래퍼는 호출자가, 본 컴포넌트는 `<div>` 루트.

### T8a — hero / stats / about / saju-section 화이트 톤 [병렬]

- **영향 파일**: 
  - `src/components/site/hero.tsx`
  - `src/components/site/stats-section.tsx`
  - `src/components/site/about.tsx`
  - `src/components/site/saju-section.tsx`
- **명세**:
  - 각 컴포넌트에서 다음 패턴을 모두 정리:
    - `bg-gradient-*`, `bg-clip-text text-transparent`, `from-* via-* to-*` → 단색
    - `backdrop-blur-*`, `bg-white/[0.03]` 류 글래스 → `bg-card border-2 border-border shadow-sm` 박스
    - `animate-float-*`, `animate-pulse-*`, `hover:scale-*`, `hover:-translate-y-*`, `hover:rotate-*` → 제거 또는 `hover:bg-muted` 정도로
    - `drop-shadow-*` 큰 그림자 → `shadow-sm` 또는 제거
    - `rounded-2xl`, `rounded-3xl` 큰 라운드 → `rounded-md` 또는 `rounded-sm`
  - hero: h1 의 "AI 가 일하는 방식" 부분 gradient/tint 제거 → 그냥 `text-foreground font-bold`. radial blob 1개도 제거. 아래 chip 들은 회색 chip (`bg-muted border border-border text-foreground`).
  - stats: 4 column 박스. 큰 숫자 `text-4xl font-bold text-foreground`. 라벨 uppercase muted. 카드 단순.
  - about: 3 pillar 카드. 글래스 → 박스. 호버 lift 제거 → 보더 진하게만.
  - saju-section: 우측 모바일 mockup 의 그라데이션 backdrop / shadow primary glow 제거 → 단순 회색 보더. 디바이스 프레임은 유지 가능 (한 가지 시각 정성).
- **commit**: 메인이 일괄.

### T8b — process / careers / faq / contact-section 화이트 톤 [병렬]

- **영향 파일**:
  - `src/components/site/process-section.tsx`
  - `src/components/site/careers-section.tsx`
  - `src/components/site/faq-section.tsx`
  - `src/components/site/contact-section.tsx` (있다면, 폼 본체는 ContactForm)
  - `src/components/site/contact-form.tsx`
- **명세**: T8a 와 동일 패턴 (글래스 → 박스 / 그라데이션 → 단색 / 모션 → 제거 / 라운드 축소 / 보더 강조).
- 추가:
  - faq 의 Accordion item 도 박스 톤. open 시 미세 그라데이션 같은 거 제거 → 단순 `bg-muted` 정도.
  - careers 의 포지션 카드 호버 aurora glow 제거 → 보더 진하게만.
  - contact-form 의 input/textarea 보더 강조 (border-2 border-border focus:border-foreground).
- **commit**: 메인이 일괄.

### T8c — portfolio-card / portfolio-section / 상세 페이지 / opengraph + nav 한국어 + workflow embed [병렬]

- **영향 파일**:
  - `src/components/site/portfolio-card.tsx`
  - `src/components/site/portfolio-section.tsx`
  - `src/app/portfolio/[slug]/page.tsx`
  - `src/app/portfolio/[slug]/opengraph-image.tsx`
  - `src/components/site/header.tsx`
  - `src/components/site/footer.tsx` (저작권 표기 등)
- **명세**:
  - **portfolio-card.tsx**: 카드 글래스 → 박스. 썸네일 영역의 `bg-gradient-to-br ${project.accent}` (보라/인디고 그라데이션) → **단순 회색 BG (`bg-muted`)** + 보더. grid pattern overlay 제거 또는 매우 미세하게. hover scale 제거.
  - **portfolio-section.tsx**: eyebrow / title / lead 의 "포트폴리오" 단어 → "솔루션" (T3 가 본문에서 처리하지만 nav/section title 일관성). 그룹 헤더 카피 톤 다듬기.
  - **상세 페이지 page.tsx**: 
    - "← 모든 프로젝트" → "← 모든 솔루션"
    - hero ribbon 의 accent gradient → 단색 회색 BG
    - Problem / Approach / Features / Outcomes 카드 글래스 → 박스
    - **Architecture 섹션 확장**: `project.slug === "dev-harness"` 면 `<WorkflowHarness />` import + 렌더, `=== "dev-safety"` 면 `<WorkflowSafety />`. 둘 다 Architecture 본문 단락 뒤에 추가 (단락 → 다이어그램 순).
    - 하단 CTA "프로젝트 같이 만들기" → "이 솔루션 같이 만들기"
  - **opengraph-image.tsx**: accent map (slug → raw hex) 을 모두 그레이톤으로 통일 (#2A2F3A / #45495 / #6B6F7A 정도). 사이트 화이트 톤과 일관성.
  - **header.tsx**: 
    - 로고 텍스트 `Jinju ICT` → **`진주 정보통신`** (T2 가 자동 치환할 수도 있지만 명시)
    - NAV_ITEMS 한국어화 + 신규 섹션 통합:
      ```ts
      const NAV_ITEMS = [
        { href: "#about", label: "소개" },
        { href: "#process", label: "방식" },
        { href: "#team", label: "팀" },
        { href: "#portfolio", label: "솔루션" },
        { href: "#saju", label: "사주" },
        { href: "#careers", label: "채용" },
      ] as const;
      ```
    - 로고 옆 그라데이션 박스 (`bg-gradient-to-br from-primary via-primary to-accent`) → **단색 회색 박스 (`bg-foreground`)** + 보더
    - 호버 underline 그라데이션 → 단색 foreground
    - 우측 "문의하기" 버튼 톤 다듬기
  - **footer.tsx**: 카피라이트 / 로고 텍스트 일관성.
- **commit**: 메인이 일괄.

---

## INTEG (메인 직접)

Wave 1 모두 PASS 후:

1. page.tsx 변경 없음 (섹션 순서는 이미 INTEG 끝났음). 단, 만약 saju 가 screens 가지는데 saju-section 이 그걸 안 받으면 그건 T4/T8a 가 처리. 메인 추가 작업 없을 가능성 큼.
2. `pnpm lint && pnpm typecheck && pnpm check:security` exit 0
3. 최종 commit: `feat: INTEG — white-aje 통합 검증 + 일관성 확인 (white-aje 완료)`

---

## 병렬화 계획 (DAG)

```
Wave 1 (한 메시지에 10개 보조 에이전트 동시 dispatch):

  T1  globals + layout        ─┐
  T2  회사명 치환             ─┤
  T3  포트폴리오 → 솔루션     ─┤
  T4  사주 자산 + 카피        ─┤  →  서로 다른 파일만 만짐
  T5  5 프로젝트 자산 cp      ─┤
  T6  workflow-harness        ─┤
  T7  workflow-safety         ─┤
  T8a hero/stats/about/saju   ─┤
  T8b process/careers/faq/contact ─┤
  T8c portfolio + header/footer + workflow embed ─┘

  (T8c 가 T6/T7 컴포넌트를 import 하지만, import 라인은 컴파일 시점 의존 — 
   T8c 가 작업 끝나기 전에 T6/T7 이 컴포넌트 파일을 생성해두면 OK.
   메인의 일괄 typecheck 시점에는 둘 다 존재하면 됨.)

INTEG (메인 직접):
  검증 + 최종 commit
```

---

## 공통 — 각 보조 에이전트가 반드시 지킬 사항

1. **CLAUDE.md 의 비전 + AGENTS.md 의 검증 명령 + specs/portfolio-research.md 의 보안 룰 절대 위반 금지.**
2. **자기 task 의 영향 파일 외에는 손대지 마라.**
3. **commit 금지** — 메인이 일괄.
4. **lint / typecheck / security 검증도 메인이 일괄** — 단 자기 task 범위에서 TypeScript 타입 안정성 + import 정합성은 직접 확보. T2/T3/T5 는 직접 `bash scripts/check-security.sh` 한 번 돌려서 exit 0 확인 (보안은 안전장치).
5. **디자인 토큰명** (`bg-card`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground` 등) 만 사용. hex hardcode 금지. 단 opengraph-image.tsx 는 next/og 런타임 특성상 raw hex 불가피 — 모두 그레이톤으로.
6. **응답 보고** (한국어 / "대표님"):
   - 변경 / 신규 파일 목록 (절대 경로)
   - 핵심 결정 / 카피 1~3줄
   - 보안 검증 결과 (해당 task 면)
