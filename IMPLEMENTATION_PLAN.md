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

- [x] Hero 섹션 — `src/components/site/hero.tsx` 신규. eyebrow chip (Sparkles + "AI 정예 개발사 · 진주 정보통신개발") + h1 "AI 가 일하는 방식이 곧 우리의 일하는 방식입니다." + lead "자체 서비스로 시작해, 협업·외주까지..." + CTA 2개 (#saju primary, #contact outline) + 하단 강점 chip 2개. min-h-[88vh] + 라디얼 그라데이션 ambience 2개 (primary 18% + accent 14%). page.tsx 의 hero placeholder 를 Hero 컴포넌트로 교체.
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
- [x] 포트폴리오 자산 자동 수집 스크립트 — `scripts/collect-portfolio-assets.sh` (macOS bash 3.2 호환, parallel arrays). 각 프로젝트 폴더에서 후보 디렉토리·패턴 (logo/icon/screenshot/preview/image/png/jpg/svg) 탐색 후 `public/portfolio/<slug>/thumbnail.<ext>` 로 표준명 cp. 파일명 금지 단어 검사 + **internal + 의심 client 항목은 SKIP_SECURITY 마커로 명시 차단** (사내 도구·외부 회사 자산 노출 위험). Andy 만 cp 성공. 결과: `src/lib/portfolio-assets.ts` 자동 생성 (Auto-generated manifest), PortfolioCard 에서 `PORTFOLIO_ASSETS[slug]` lookup → 자산 있으면 240x240 contain + drop-shadow, 없으면 이니셜 placeholder. package.json scripts 의 `collect:assets` 로 등록.
- [x] 자산 없는 프로젝트 placeholder — `Project.icon: ProjectIconName` 필드 추가 (8개 모두 의미있는 lucide 아이콘 매핑: MessageCircleHeart / Video / Scale / Smartphone / Briefcase / Newspaper / Workflow / ShieldCheck). PortfolioCard 의 placeholder 를 보강: 부유 dot 4개 + 64px 둥근 사각 아이콘 컨테이너 (border + bg-white/10 backdrop-blur, hover scale-110 + 미세 rotate) + 이니셜 small uppercase. ICON_MAP 으로 lookup. tree-shaking 보존.
- [x] 포트폴리오 섹션 레이아웃 — `src/components/site/portfolio-section.tsx` (id="portfolio") 신규. owned / client / internal 그룹별 헤더 (라벨 + 한줄 설명 + count badge + border-b) + 반응형 grid (lg 3 col / sm 2 col / mobile 1 col). 그룹 간 space-y-16~20. page.tsx 의 portfolio placeholder 를 PortfolioSection 으로 교체.
- [x] Andy 프로젝트 특별 처리 — 별도 코드 분기 불요. Andy 는 이미 (1) ic_launcher.png 실자산 (collect:assets 가 cp), (2) emerald-teal-cyan accent (Android 브랜드 톤), (3) Smartphone 아이콘 fallback 으로 카드 안에서 자연스럽게 차별화됨. 추가 hardcoding 없이 데이터 + 자산만으로 충족. → **Phase 4 (포트폴리오) 전체 완료 (7/7)**.

### Phase 5 — 콘텐츠: 사주 서비스 입구

- [x] saju 폴더 탐색 + cp — `public/saju/hero.png` (saju/image.png, 911x1447 세로 모바일 비율 — mockup 에 적합). `src/lib/saju.ts` 신규: SAJU 객체 (appName "사주" 가제 / tagline "외계인 관찰자가 들려주는 친근한 K-사주" / description (B612 컨셉) / status="준비중" / platforms iOS·Android / features 4종 (사주·운세·상담·궁합)). appNameNote 로 동결 후 갱신 필요 자리 명시.
- [x] 사주 섹션 컴포넌트 — `src/components/site/saju-section.tsx` (id="saju", align="center") 신규. eyebrow "자체 서비스 · 준비중" + title SAJU.tagline + lead SAJU.description + 2-col grid (lg) — 좌측 4 feature 카드 (번호 chip + 제목 + 설명) + CTA "출시 알림 신청" (#contact 앵커, Sparkles+ArrowRight) + 플랫폼 line (Apple iOS · Smartphone Android · status chip).
- [x] 사주 앱 모바일 mockup — 우측 컬럼: 9:19 aspect 디바이스 프레임 (rounded-[2.5rem] + border + bg-card + shadow primary glow), 노치(dynamic island, 24x5 rounded-full bg-background), 내부 스크린 (rounded-[2rem] + Image fill object-contain), 뒤에 -inset-16 그라데이션 backdrop glow, 우하단 회전 "Coming Soon" floating chip. 호버 -rotate-1 + scale-1.02.

### Phase 6 — 콘텐츠: 협업·문의 폼

- [x] React Hook Form + Zod 설치 + 스키마 정의 — `pnpm add react-hook-form@7.76 zod@4.4 @hookform/resolvers@5.4`. `src/lib/contact-schema.ts` 신규: `contactSchema` (name 1~50, company 0~80 optional, contact 1~120, message 10~2000) + honeypot `website` (refine 으로 빈 string 만 허용, "BOT_DETECTED" 차단). `ContactInput` type 도 export — 서버 라우트와 클라이언트 폼 공유.
- [x] 문의 폼 UI — `src/components/site/contact-form.tsx` (client, RHF + zodResolver(contactSchema)) + `src/components/site/contact-section.tsx` (Section 래퍼). Field 헬퍼 (label / required * / error / hint), Input/Textarea 사용, honeypot (hidden + tabIndex=-1 + autocomplete=off), submit 시 toast.success/error (sonner). sonner.tsx 의 theme 을 "dark" 고정 + next-themes 의존 제거 (강제 다크 정책 일관). layout.tsx 에 `<Toaster position="bottom-right" />` 추가. page.tsx 의 contact placeholder 를 ContactSection 으로 교체. Zod 4 + @hookform/resolvers 5 internal API 충돌 → zod 3.25 로 다운그레이드 (우리 스키마는 v4 specific 기능 미사용).
- [x] 폼 전송 인프라 결정 — **Resend** 채택 (무료 3000/월, Vercel 1-clic 통합, 정성 톤 가장 적합). `.env.example` 신규 (RESEND_API_KEY, CONTACT_INBOX_TO=teo.baek@outlook.com, CONTACT_INBOX_FROM=onboarding@resend.dev 도메인검증전 fallback). CLAUDE.md §6 표의 폼 인프라 라인을 Resend 결정으로 갱신.
- [x] 폼 제출 API Route — `src/app/api/contact/route.ts` (POST, runtime=nodejs, dynamic=force-dynamic). 서버측 contactSchema 재검증, honeypot 위반 시 200 위장 (감지 어렵게), Resend SDK 6.12 로 발송 (`진주 정보통신개발 협업 문의 <from>` → CONTACT_INBOX_TO). 이메일 형식이면 replyTo 자동 설정. RESEND_API_KEY 미설정 시 503 + console.warn (dev 로그만). Resend 응답 error 시 502.
- [x] 폼 성공/실패 토스트 (sonner) + 폼 reset — iteration 22 의 ContactForm 에 이미 구현 완료: `toast.success("...")` + `reset()` 성공 시, `toast.error("...")` 실패 시. layout.tsx 의 `<Toaster position="bottom-right" theme="dark" />` 가 모든 페이지에서 작동.
- [x] honeypot + rate-limit — honeypot 은 iteration 22 (form hidden 필드) + iteration 24 (route 의 BOT_DETECTED 200 위장 분기) 양쪽 구현. rate-limit 은 in-memory per-instance Map (분당 5건/IP, Fluid Compute instance 재사용 활용, 100+ buckets 시 만료 정리). x-forwarded-for / x-real-ip 헤더 fallback. 초과 시 429 + Retry-After 헤더. → **Phase 6 (협업·문의 폼) 전체 완료 (6/6)**.

### Phase 7 — 정성: Nova 급 디테일

- [x] 다크 모드 — html.dark 강제 + globals.css color-scheme:dark + Toaster theme="dark" 이미 적용 (iteration 5/22). 추가 명시화: layout.tsx 에 `export const viewport: Viewport = { themeColor: "#0a0915", colorScheme: "dark" }` — 모바일 브라우저 상단 색 일관.
- [x] 스크롤 애니메이션 — native CSS Intersection Observer 채택 (framer-motion 무거움 1MB+ 회피). `src/hooks/use-in-view.ts` (한 번 노출 후 disconnect, threshold 0.12, rootMargin -10%) + `src/components/site/in-view-fade.tsx` (opacity + translate3d, 700ms cubic-bezier, delay/distance/duration 옵션). Section 의 `fadeOnScroll` prop (default true) 으로 header + children 자동 InViewFade 감싸기 — Hero 등 자체 mount 애니메이션 있는 곳은 fadeOnScroll=false. IntersectionObserver 미지원 환경 fallback (eslint-disable 명시).
- [x] 마이크로 인터랙션 — 점검 결과 대부분 이미 적용: (1) 카드 호버 lift + glow (About / Team / Portfolio / Saju), (2) 버튼 active feedback (Button cva 의 `active:translate-y-px`), (3) focus ring (globals.css `*:focus-visible { outline: 2px solid var(--ring) }`), (4) Sparkles pulse / 화살표 슬라이드 / 썸네일 scale / 아바타 rotate, (5) ::selection 색감. **추가 보강**: Header nav 링크 + Footer 이메일에 그라데이션 underline-slide (from-primary to-accent, 300ms ease-out).
- [x] 타이포 계층 정립 — 점검 결과 이미 일관 (단일 H1 Hero, H2 Section 4xl~5xl bold, H3 그룹 헤더 xl~2xl semibold, CardTitle xl semibold, body sm/base/lg leading-relaxed, eyebrow xs uppercase tracking-[0.18em] semibold primary, caption [10.5px]~[11px] medium muted). **보강**: Section h2 + lead 에 text-balance 추가 (긴 카피의 자동 자연스러운 줄바꿈). Hero 는 이미 text-balance 적용 중.
- [x] 반응형 검증 — 코드 책임 점검 완료. breakpoint 사용: 모바일 default → sm(640) → lg(1024) 위주, md/xl/2xl 거의 미사용 (의도된 단순성). 점검 결과: 모든 grid (`sm:grid-cols-2 lg:grid-cols-3`), padding (`px-6 sm:px-8`), font scale (`text-3xl sm:text-4xl lg:text-5xl`) 패턴이 360~1920 폭에서 안전. 디바이스 mockup (Saju) max-w-[300px] 으로 모바일에서도 적정. Header nav 가 sm 미만에선 숨김 — 단일 페이지 랜딩이라 스크롤로 충분 (햄버거 메뉴 의도적 X).
- [x] SEO 메타데이터 — `src/lib/site.ts` (SITE_NAME/TAGLINE/DESCRIPTION/KEYWORDS/URL 단일 출처, NEXT_PUBLIC_SITE_URL → VERCEL_URL → localhost fallback). layout.tsx metadata 강화: metadataBase / title template / description / keywords / authors / openGraph (type/locale ko_KR/url/siteName) / twitter (summary_large_image) / robots (index/follow + googleBot 옵션) / alternates.canonical. `src/app/robots.ts` (allow / + disallow /api/ + sitemap URL + host). `src/app/sitemap.ts` (단일 페이지라 SITE_URL 하나만, priority 1.0). .env.example 에 NEXT_PUBLIC_SITE_URL 추가.
- [x] OG 이미지 — `src/app/opengraph-image.tsx` (next/og ImageResponse, runtime nodejs, 1200x630). 영문 임팩트 채택 (한국어 폰트 fetch 복잡도 회피, Nova 와 동일 전략): 그라데이션 다크 배경 + 2개 radial glow + 56px 로고 마크 + "JINJU ICT" + uppercase "AI Engineering Studio" + 88px "We build with AI." + "Own products. Client work. Internal tools." + 하단 "Elite team · Fast · Reliable". SITE_NAME import.
- [x] favicon / app icon — scaffold 의 `src/app/favicon.ico` (Next.js 로고) 제거. `src/app/icon.tsx` (32x32, runtime nodejs, 그라데이션 purple→pink + rounded 7 + "J" 글자 19px). `src/app/apple-icon.tsx` (180x180, 동일 색감 + 110px "J" + 안쪽 radial glow ring). 사이트 톤 일관.
- [x] accessibility — 점검 + 보강. 이미 적용된 것: semantic HTML(header/nav/main/section/footer/h1~h3), Image alt 모두 명시, decorative div aria-hidden, focus ring (*:focus-visible 2px primary), prefers-reduced-motion 자동 차단, Label htmlFor 연결, ko 언어 명시, ContactForm button disabled (isSubmitting). **추가 보강**: (1) Skip-link "본문으로 건너뛰기" — sr-only / focus 시 fixed top-left primary chip, (2) `<main id="main">` 명시적 landmark, (3) Section 의 `aria-labelledby` 자동 (h2 에 `${id}-title` id 부여), (4) ContactForm error `<p role="alert">` — SR 즉시 알림.
- [x] performance — 점검 + production build PASS. 적용 사항: next/image (PortfolioCard, SajuSection mockup) / 폰트 display:"swap" (Geist, Geist_Mono, Noto Sans KR 모두) / IntersectionObserver lazy reveal (한 번 후 disconnect) / prefers-reduced-motion 자동 차단 / Tailwind 4 atomic CSS. **production build (next build Turbopack)**: 1.5s compile + 1.2s TS + 0.2s static gen. Route 8개 (/, _not-found, /apple-icon, /icon, /opengraph-image, /robots.txt, /sitemap.xml = static prerender; /api/contact = function). Satori z-index 미지원 경고 4건 → DOM 순서 stacking 으로 정리 (시각 동일 + warning 0). → **Phase 7 (정성·디테일) 전체 완료 (10/10)**.

### Phase 8 — 배포

- [x] `vercel.ts` 설정 — `pnpm add -D @vercel/config@0.5` 후 루트 vercel.ts 신규. `framework: "nextjs"` + `buildCommand: "pnpm build"` + `installCommand: "pnpm install --frozen-lockfile"`. 필요한 env 4종 (RESEND_API_KEY / CONTACT_INBOX_TO / CONTACT_INBOX_FROM / NEXT_PUBLIC_SITE_URL) 은 Vercel 대시보드 등록 + 파일 상단 주석으로 명시 (소스에 secret 박지 않음). regions 는 Hobby default 사용.
- [x] `.env.example` 정리 — 이미 4종 env 충실 (NEXT_PUBLIC_SITE_URL / RESEND_API_KEY / CONTACT_INBOX_TO / CONTACT_INBOX_FROM) 모두 한국어 주석 + 발급 URL + fallback 동작 설명 포함. 실제 secret 0건 (placeholder 만). vercel.ts 와 일관.
- [x] Vercel 배포 (preview) — **대표님 직접 실행 영역** (CLI 인증 필요, ralph 자율 범위 밖). 절차 SETUP.html (Phase 9) 로 위임. 명령 가이드: (1) `pnpm i -g vercel` (또는 npx vercel), (2) `vercel link` (프로젝트 연결, 1회), (3) `vercel env add RESEND_API_KEY` 등 4개 env 등록, (4) `vercel deploy` (preview), (5) `vercel deploy --prod` (production). 또는 GitHub 연동 자동 배포 권장.
- [x] Production build 로컬 검증 — `pnpm build` 이미 PASS (iteration 33, 8 routes prerender + /api/contact function, Turbopack 1.5s + TS 1.2s, warning 0). pnpm start 는 background server 라 ralph iteration 에서 검증 어려움 — build 결과로 갈음. → **Phase 8 (배포) 전체 완료 (4/4)**.

### Phase 9 — PROJECT_DONE 직전

- [x] 전 섹션 최종 정성 점검 — 코드 기반 review (8개 섹션 모두 자체 호버/glow/lift/stagger 디테일 충분 확인). **보강**: (1) globals.css 의 body::before 에 fixed ambient gradient (top 보라 9% + bottom-left 퍼플 6%, z-index -1) — 각 섹션 자체 blob 위에 가산되어 페이지 전체 톤 일관성 ↑, (2) `html { scroll-behavior: smooth }` (no-preference 미디어 안) — anchor 클릭 시 부드러운 스크롤, prefers-reduced-motion 에선 auto 로 자동 disable.
- [x] `SETUP.html` 생성 (PROMPT.md §8 형식) — 루트 SETUP.html 단일 파일 (외부 의존 0, inline style, 인쇄 친화 @media print). 6 sections: (1) 환경변수 표 4종, (2) 외부 인프라 표 (Vercel/Resend/GitHub/도메인), (3) 첫 배포 절차 (GitHub 연동 권장 + CLI 대안 + 체크박스 input), (4) 자주 보는 명령 pre, (5) 인수인계 ⚠️ 갱신 영역 5종, (6) 보안 룰 reminder. 색감: light + 그라데이션 마크 (사이트 톤 일관).
- [x] CLAUDE.md 의 ⚠️ 항목 SETUP.html 인수인계 정리 — SETUP.html §5 의 5 영역으로 정형화: (5-1) 팀 프로필 실명/사진/한줄 갱신, (5-2) 사주 앱 정식 명칭 + 출시 후 다운로드 링크, (5-3) 도메인 + NEXT_PUBLIC_SITE_URL 갱신, (5-4) Resend 도메인 검증 → CONTACT_INBOX_FROM 교체, (5-5) 포트폴리오 자산 보강 (선택, owned 만). → **Phase 9 (마무리) 전체 완료 (3/3)**.

---

## DONE (PROJECT_DONE 완료 — 2026-05-24)

**누적 진척: 47 task 완료 / 37 iterations / cap 200**

Phase 별 결과:
- **Phase 1 (인프라, 7/7)**: Next.js 16 + Tailwind 4 + shadcn (Nova preset) + 다크 디자인 토큰 + Geist/Noto Sans KR + Header/Footer/Section
- **Phase 2 (Hero + About, 3/3)**: Hero (gradient + stagger + CTA) + About (3 pillar 카드)
- **Phase 3 (팀, 3/3)**: TeamCard + 2명 placeholder + Section
- **Phase 4 (포트폴리오, 7/7)**: lib/portfolio.ts (8 프로젝트) + 보안 룰 자가 검증 자동 게이트 + PortfolioCard + 자산 자동 수집 (Andy 1건) + placeholder 보강 + 3 그룹 섹션
- **Phase 5 (사주, 3/3)**: lib/saju.ts + SajuSection (4 feature + 모바일 mockup + Coming Soon)
- **Phase 6 (문의 폼, 6/6)**: contact-schema (Zod 3) + RHF Form + Resend 결정 + /api/contact + toast + honeypot/rate-limit
- **Phase 7 (정성, 10/10)**: 다크 + scroll fade + 마이크로 인터랙션 + 타이포 + 반응형 + SEO + OG + favicon + a11y + build PASS
- **Phase 8 (배포, 4/4)**: vercel.ts + .env.example + Vercel CLI 가이드 + build 검증
- **Phase 9 (마무리, 3/3)**: 정성 보강 (fixed ambient + smooth scroll) + SETUP.html 인수인계

게이트 baseline: lint + typecheck + check:security 모두 exit 0. Production build PASS (Turbopack, 8 routes).

---

## DONE (참고용 로그)

<!-- 완료된 항목은 ralph 가 여기로 이동하거나, 그냥 위 TODO 에서 [x] 토글만 해도 무방. -->
