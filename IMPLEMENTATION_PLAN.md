# IMPLEMENTATION_PLAN

> ralph 가 매 iteration 갱신하는 체크리스트.
> 사람은 비워둔 채 시작한다 — ralph 가 specs/ + CLAUDE.md 비전 보고 채운다.
> 망가지면 통째 폐기 (disposable).
>
> 출처: `CLAUDE.md` §1~§8 + `specs/portfolio-research.md`.
> 정성 우선 (§4) — 매 task PASS 후에도 Nova 급 정성 자기 점검.

---

## TODO

### Phase 1 — 인프라 (scaffold + 검증 활성화)

- [x] Next.js 16 App Router + TypeScript + Tailwind CSS 프로젝트 scaffold (`pnpm create next-app`, src/ 구조, App Router, ESLint, Tailwind, import alias `@/*`) — *Next.js 16.2.6 / React 19.2.4 / Tailwind 4.3.0 / TypeScript 5.9.3 / ESLint 9 flat. pnpm-workspace.yaml 의 `allowBuilds` 로 sharp/unrs-resolver 빌드 승인. typecheck + lint exit 0 확인.*
- [x] AGENTS.md 채움 — Node 20+ / pnpm 11+ / 검증 명령(lint, typecheck) 활성화 + 1회 exit 0 baseline. *build 는 매 iteration 안 돌림 (1~3분 소요) → 선택 검증으로 분리, PROJECT_DONE 직전 + 큰 변경 직후만.*
- [x] shadcn/ui 초기화 (`pnpm dlx shadcn@latest init --template next --base radix --preset nova`) + 기본 컴포넌트 8종 설치 (Button, Card, Input, Textarea, Label, Sonner, Separator, Badge). *style: radix-nova / baseColor: neutral / iconLibrary: lucide / Geist 폰트. src/lib/utils.ts 수동 생성 (shadcn v4 가 자동 생성 안 함). pnpm-workspace.yaml 의 allowBuilds 에 msw 추가.*
- [x] Tailwind 디자인 토큰 정의 — Nova 톤 참고 (다크 우선, primary 보라/남색 oklch(0.62 0.22 285), accent 퍼플 oklch(0.7 0.2 320)), CSS variables 로 운영, globals.css 풀 셋업. *layout.tsx: lang="ko" + html.dark 강제 + 메타데이터 한국어화 + 토큰 기반 body 배경/색상. Tailwind 4 @theme inline 으로 토큰 브릿지.*
- [x] 폰트 셋업 — next/font/google 로 Geist (라틴) + Geist_Mono (코드) + Noto_Sans_KR (한국어, w400~900, swap), lucide-react 1.16.0 이미 설치 확인. *globals.css font-family chain: var(--font-sans) → var(--font-noto-sans-kr) → system → Pretendard fallback.*
- [x] 기본 레이아웃 — RootLayout (다크 기본 + lang="ko") + SiteHeader (로고 + 섹션 앵커 5개 + 문의하기 버튼 + scroll-aware backdrop blur) + SiteFooter (로고 + 한줄소개 + 이메일 + © year). *page.tsx 는 5개 anchor placeholder section + Hero placeholder 로 교체. fixed header 보정 pt-16.*
- [x] 섹션 컨테이너 컴포넌트 (`<Section>`) + 공통 spacing/타이포 시스템 정립. *eyebrow / title / lead / align="left"|"center" / bare 옵션 / max-w-6xl 컨테이너 / py-20~36 일관 vertical rhythm. HTMLAttributes 의 title 속성 충돌은 Omit 으로 해결.*

### Phase 2 — 콘텐츠: Hero / 회사 소개

- [x] Hero 섹션 — `src/components/site/hero.tsx` 신규. eyebrow chip (Sparkles + "AI 정예 개발사 · 진주 ICT") + h1 "AI 가 일하는 방식이 곧 우리의 일하는 방식입니다." + lead "자체 서비스로 시작해, 협업·외주까지..." + CTA 2개 (#saju primary, #contact outline) + 하단 강점 chip 2개. min-h-[88vh] + 라디얼 그라데이션 ambience 2개 (primary 18% + accent 14%). page.tsx 의 hero placeholder 를 Hero 컴포넌트로 교체.
- [x] Hero 시각 — native CSS keyframes 채택 (framer-motion 도입은 Phase 7 스크롤 task 로 연기). globals.css 에 `@utility animate-fade-in-up / float-slow / float-reverse / pulse-soft` 정의 + `prefers-reduced-motion` 자동 차단. Hero 에 그라데이션 blob 2개 (primary 22% blur 부유 + accent 18% reverse), 미세 그리드 오버레이 (radial mask), 텍스트 5단 stagger (0/120/240/360/480ms), CTA 호버 shadow + 화살표 슬라이드, h1 핵심 "AI 가 일하는 방식" 부분 gradient-text (foreground → primary), Sparkles pulse-soft.
- [x] 회사 소개 보조 섹션 — `src/components/site/about.tsx` (id="about") 신규. 3 pillar 카드 (BrainCircuit "AI 전문성" / Workflow "자체 개발 인프라" / Layers "자체 서비스 + 협업, 균형"). lg 3 col grid, sm 2 col, mobile 1 col. 호버 시 lift + glow gradient 컬러 등장 + 아이콘 배경/색 전환. 카드별 glow 색 (primary / accent / mixed) 차별. page.tsx 의 about Section placeholder 를 About 컴포넌트로 교체. → **Phase 2 (Hero / 회사 소개) 전체 완료 (3/3)**.

### Phase 3 — 콘텐츠: 팀 소개

- [x] 팀 카드 컴포넌트 — `src/components/site/team-card.tsx` 신규. props: `{ member: TeamMember }`. 64px 그라데이션 아바타 (initials + ring + 호버 시 rotate-3 + scale-105) / displayName + role uppercase / oneLiner / strengths Badge chip 그룹. 카드 호버 시 lift + aurora glow 컬러 등장.
- [x] 팀 데이터 작성 — `src/lib/team.ts` 의 `TEAM: readonly TeamMember[]`. 2명 항목 (Founder · Product, Founder · Engineering) — 실명/사진은 placeholder, 인원수 "N명" 표현/나이 모두 미노출. 동결 후 대표님이 직접 갱신할 자리임을 파일 상단 주석으로 명시.
- [x] 팀 섹션 레이아웃 — `src/components/site/team-section.tsx` (id="team", align="center") 신규. eyebrow "팀" + title "소수 정예, 모든 레이어를 책임집니다" + lead. TEAM 데이터를 sm 2 col grid (max-w-4xl) 로 TeamCard 렌더. page.tsx 의 team placeholder 를 TeamSection 으로 교체. → **Phase 3 (팀 소개) 전체 완료 (3/3)**.

### Phase 4 — 콘텐츠: 포트폴리오 (8개 프로젝트)

- [x] 포트폴리오 데이터 모듈 — `src/lib/portfolio.ts` 의 `PROJECTS: readonly Project[]` (8개) + `CATEGORY_ORDER`. Type: slug / title / category (owned|client|internal) / categoryLabel / oneLiner / description / stack[] / features[] / accent (tailwind gradient) / comingSoon / thumbnail (다음 task 채움). 파일 상단 주석에 보안 룰 4종 명시 (gp_claw·ai_news_scraping 클라이언트명 X / js-ralph·js-super 원본 OSS명 X / Andy 상호명 OK). title 추상화: gp_claw→"사내 AI 사무 비서", ai_news_scraping→"AI News Daily", js-ralph→"자율 개발 하네스", js-super→"개발 안전 워크플로우".
- [x] **포트폴리오 보안 룰 자가 검증** — `scripts/check-security.sh` (단일 출처: 금지 단어 패턴 + 검사 대상 src/+public/) + `pnpm check:security` script + AGENTS.md 필수 검증 명령 3번째로 편입. 첫 실행에서 portfolio.ts 주석에 박혀있던 금지 단어 발견 → 주석 추상화 정정. 이제 매 iteration 자동 게이트 작동. baseline 0건 확정.
- [x] 포트폴리오 카드 컴포넌트 — `src/components/site/portfolio-card.tsx` 신규. props: `{ project: Project }`. 16:10 aspect 썸네일 영역 (gradient + grid pattern radial mask + inner glow + 이니셜 합성 placeholder, project.thumbnail 있으면 next/image 로 교체 — 다음 task) + "Coming Soon" Badge (project.comingSoon=true 일 때) + categoryLabel uppercase eyebrow + title + oneLiner + stack chip (5개 + overflow "+N"). 카드 호버: lift + 썸네일 scale-1.04. p-0 으로 Header 분리.
- [ ] 포트폴리오 자산 자동 수집 스크립트 — 각 프로젝트 폴더에서 스크린샷/로고/아이콘 후보 파일 (`*.png`, `*.jpg`, `*.svg`, `image.png`, README 내 이미지 등) 탐색 후 `public/portfolio/<slug>/` 로 cp. 보안 룰 위반 파일명은 rename
- [ ] 자산 없는 프로젝트 placeholder — 그라데이션 + 이니셜 + 스택 색상 토큰 기반 자동 생성
- [ ] 포트폴리오 섹션 레이아웃 — 카테고리 필터 또는 그룹 헤더 + 그리드 (반응형 3/2/1 컬럼) + 카드 호버 디테일
- [ ] Andy 프로젝트 특별 처리 — 아이콘/팔레트가 명시돼 있으면 그대로 적시 (브랜드 색감 카드)

### Phase 5 — 콘텐츠: 사주 서비스 입구

- [ ] `/Users/goldenplanet/jinsup_space/saju` 폴더 탐색 후 사주 앱 콘텐츠 (슬로건/기능 소개/스크린샷/image.png 등) 를 `public/saju/` + `lib/saju.ts` 로 cp·정리
- [ ] 사주 섹션 컴포넌트 — 앱 소개 카피 + 핵심 기능 3개 + "Coming Soon" CTA (다운로드 링크는 placeholder, 출시 알림 받기 mailto: 또는 폼 연동)
- [ ] 사주 앱 모바일 mockup 스타일 시각화 (프레임 + 스크린샷 또는 그라데이션 placeholder)

### Phase 6 — 콘텐츠: 협업·문의 폼

- [ ] React Hook Form + Zod 설치 + 스키마 정의 (이름 / 회사선택 / 연락처 / 문의내용, 최소 10자 이상 등)
- [ ] 문의 폼 UI — shadcn Form + Input + Textarea + Label + 검증 에러 메시지 (한국어)
- [ ] 폼 전송 인프라 결정 — Vercel + Resend 우선 검토 (무료 tier 3000건/월), 안 되면 Formspree 무료 50건/월, 안 되면 mailto: fallback. 결정 후 환경변수 자리 마련
- [ ] 폼 제출 API Route (`app/api/contact/route.ts`) — 선택된 인프라로 `dlwlstjq410@gmail.com` 수신
- [ ] 폼 성공/실패 토스트 (sonner) + 폼 reset
- [ ] honeypot + 간단 rate-limit (스팸 방지, 로그인 없으니까)

### Phase 7 — 정성: Nova 급 디테일

- [ ] 다크 모드 — 기본 다크 (Nova 톤), light mode 토글은 도입 X (정성 우선이면 일관된 다크가 더 강함, 단 필요시 추후)
- [ ] 스크롤 애니메이션 — framer-motion 또는 native CSS Intersection Observer 로 섹션 진입 시 부드러운 페이드/슬라이드
- [ ] 마이크로 인터랙션 — 카드 호버 (lift + 그림자 변화), 버튼 active feedback, focus ring (a11y 준수)
- [ ] 타이포 계층 정립 — H1~H6 + body + caption 일관 적용
- [ ] 반응형 검증 — 360 / 768 / 1024 / 1440 / 1920 폭에서 깨지지 않음
- [ ] SEO 메타데이터 — `app/layout.tsx` metadata (title / description / openGraph / twitter), `robots.txt`, `sitemap.ts`
- [ ] OG 이미지 — `app/opengraph-image.tsx` (next/og + Satori) 로 동적 생성, 진주 ICT 슬로건 + 그라데이션
- [ ] favicon / app icon — `app/icon.tsx` 또는 정적 ico/png, 다크 친화 디자인
- [ ] accessibility — semantic HTML, aria-label, alt 텍스트, 키보드 네비 (Tab 순서), 색상 대비 4.5:1 이상
- [ ] performance — 이미지 next/image, 폰트 display: swap, Lighthouse 90+ 목표

### Phase 8 — 배포

- [ ] `vercel.ts` 설정 (`@vercel/config`) — buildCommand / framework / 환경변수 자리
- [ ] `.env.example` 정리 — Resend API key 등 필요 환경변수 명시 (실제 secret X)
- [ ] Vercel 배포 (preview) — `vercel deploy` 1회 성공 확인, 도메인은 임시 vercel.app 서브도메인
- [ ] Production build 로컬 검증 — `pnpm build && pnpm start` 로 정상 동작 확인

### Phase 9 — PROJECT_DONE 직전

- [ ] 전 섹션 최종 정성 점검 — Nova 와 side-by-side 비교, 정성 부족 섹션 보강
- [ ] `SETUP.html` 생성 (PROMPT.md §8 형식) — 환경변수 / Vercel 셋업 / Resend / 도메인 / 운영 메모
- [ ] CLAUDE.md 의 ⚠️ 항목 (팀 프로필 실제 데이터 / 사주 앱 다운로드 링크 / 도메인) 을 SETUP.html 에 인수인계 메모로 정리

---

## DONE (참고용 로그)

<!-- 완료된 항목은 ralph 가 여기로 이동하거나, 그냥 위 TODO 에서 [x] 토글만 해도 무방. -->
