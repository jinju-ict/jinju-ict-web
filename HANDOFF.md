# 인수인계서 — 진주 정보통신 사이트 (`jinju-ict-web`)

> 다음 운영자가 **이 문서 하나로 사이트를 켜고 / 콘텐츠 갱신 / 배포까지 자력 수행** 가능하도록 정리.
> 갱신일: 2026-05-25.
> 자세한 배포 체크리스트는 `SETUP.html` (브라우저로 열기) 참조 — 이 문서는 그 위의 운영 가이드.

---

## 1. 한눈에

| 항목 | 값 |
|------|-----|
| 회사명 표기 | **진주 정보통신** (영문·국문 모두 통일) |
| 도메인 | `jinju-ict.com` (Resend 도메인 검증 후 발신 가능) |
| 협업·문의 수신 | `teo.baek@outlook.com` |
| GitHub 레포 | `jinju-ict/jinju-ict-web` |
| 호스팅 | Vercel (preview = PR / production = main 자동) |
| 기술 스택 | Next.js 16 App Router · React 19 · TypeScript 5 · Tailwind 4 · shadcn/ui · Resend |

---

## 2. 로컬 셋업 (5분)

```bash
# 1) 클론
git clone git@github.com:jinju-ict/jinju-ict-web.git
cd jinju-ict-web

# 2) 의존성 설치 (Node 20+ / pnpm 11+ 필요)
pnpm install

# 3) 환경변수
cp .env.example .env.local
# 그 후 .env.local 에 RESEND_API_KEY 박기 (아래 §6 참조)

# 4) 개발 서버
pnpm dev
# http://localhost:3000
```

**Note**: dev server 는 `.env.local` 변경 시 자동 재시작 안 됨 — `Ctrl+C` → `pnpm dev` 다시.

---

## 3. 검증 명령 (commit 전 반드시 exit 0)

```bash
pnpm lint            # ESLint 9 flat
pnpm typecheck       # tsc --noEmit
pnpm check:security  # CLAUDE.md §5 보안 룰 — 금지 단어 0건 확인 (필수!)
```

선택 (큰 변경 후 / 배포 전):
```bash
pnpm build           # Next.js production build (1~3분, CSS·라우트 빌드 정합성)
pnpm collect:assets  # public/portfolio/<slug>/ 자동 수집 (소스 폴더 자산 변경 시)
```

---

## 4. 배포 — Vercel (GitHub 연동)

### 첫 배포 (1회)

1. **GitHub 레포 public 전환** (private + org 는 Vercel Pro 필요)
   - https://github.com/jinju-ict/jinju-ict-web/settings → Danger Zone → **Change visibility to public**
   - 보안 룰 (`pnpm check:security`) 가 코드 공개 안전성을 보장하므로 무방
2. https://vercel.com/new → GitHub 로그인 → `jinju-ict-web` Import
3. Framework 자동 감지 (Next.js) 그대로
4. **Environment Variables** 입력 (§6):
   - `RESEND_API_KEY`
   - `CONTACT_INBOX_TO` (옵션 — 기본 `teo.baek@outlook.com`)
   - `CONTACT_INBOX_FROM` (옵션 — 기본 `onboarding@resend.dev`)
   - `NEXT_PUBLIC_SITE_URL` (옵션 — 기본 `https://jinju-ict.com`)
5. **Deploy** → 2~3분 후 `xxx.vercel.app` URL 생성

### 그 다음부터

- **`git push origin main`** → production 자동 재배포
- 다른 branch / PR push → **preview URL 자동 생성** (PR 코멘트로 박힘)

### 도메인 연결

Vercel 프로젝트 → **Settings → Domains** → `jinju-ict.com` 추가 → DNS 안내대로 A/CNAME 레코드 등록.

---

## 5. 외부 서비스

| 서비스 | 용도 | 비용 |
|--------|------|------|
| **Resend** | 협업·문의 폼 이메일 발송 | 무료 — 월 3,000 통 / 일 100 통 |
| **Vercel** | 호스팅 + CI/CD + preview URL | 무료 (public 레포 / Hobby plan) |
| **GitHub** | 소스 저장 + Vercel 트리거 | 무료 (public 레포) |

도메인은 별도 (가비아·고대디 등 등록 기관에서 구입). 등록 후 Vercel 에 추가.

---

## 6. 환경변수 (`.env.local` / Vercel)

| 키 | 필수 | 기본값 | 비고 |
|----|------|-------|------|
| `RESEND_API_KEY` | ✅ | — | https://resend.com/api-keys 에서 발급. 미설정 시 폼이 503 + 로그만. |
| `CONTACT_INBOX_TO` | ⚪ | `teo.baek@outlook.com` | 수신 이메일 변경 시 갱신 |
| `CONTACT_INBOX_FROM` | ⚪ | `onboarding@resend.dev` | 도메인 검증 후 `noreply@jinju-ict.com` 으로 교체 가능 |
| `NEXT_PUBLIC_SITE_URL` | ⚪ | `https://jinju-ict.com` | metadata / OG / sitemap 의 canonical |

`.env.local` 은 `.gitignore` 차단 — git 에 절대 커밋 X.

---

## 7. 콘텐츠 갱신 가이드 (운영 빈번)

| 무엇 | 어디서 | 방법 |
|------|--------|------|
| **사주 앱 화면 / 카피** | `src/lib/saju.ts` + `public/saju/` | `hero.png` / `screen-1.png` 등 두고 saju.ts 에 경로 추가. **현재 자산 대기 中** (외계인 잔재 제거) |
| **솔루션 (포트폴리오) 카피** | `src/lib/portfolio.ts` 의 `PROJECTS` 배열 | summary / whoFor / useCases / features 등 수정. **솔루션 설명 톤** 유지 (회고형 X) |
| **솔루션 자산** | `public/portfolio/<slug>/` + `src/lib/portfolio-assets.ts` | png/jpg 두고 manifest 갱신. ttoktok 자산 대기 中. gp_claw 자료 추가 예정 |
| **팀 카드** | `src/lib/team.ts` + (사진은 `public/team/`) | placeholder 상태 — 실명/사진/한 줄 소개 갱신 필요 |
| **채용 포지션** | `src/components/site/careers-section.tsx` 의 `POSITIONS` | 직군 추가/수정 |
| **FAQ** | `src/components/site/faq-section.tsx` 의 `FAQ_ITEMS` | 6개 기본, 추가 가능 |
| **About 3 pillar** | `src/components/site/about.tsx` 의 `PILLARS` | title / body 수정 |
| **사이트 회사명·도메인·이메일** | `src/lib/site.ts` + `.env.local` | 한 곳만 수정하면 metadata / footer / OG 전파 |

### 콘텐츠 변경 후 체크리스트

1. `pnpm typecheck && pnpm lint && pnpm check:security` exit 0
2. `pnpm dev` 로 시각 확인
3. `git add . && git commit -m "..."` → `git push`
4. Vercel 이 자동 재배포 → 1~2분 후 URL 확인

---

## 8. 디자인 톤 정책 (변경 시 반드시 지킬 것)

대표님 피드백으로 정립된 **현재 톤**:

| 원칙 | OK | NG |
|------|----|-----|
| 색감 | 화이트 + 회색 + 검정 (그레이스케일) | 보라/인디고/네온 / 그라데이션 |
| 카드 | `bg-card border-2 border-border shadow-sm rounded-sm` 박스 | 글래스 (`backdrop-blur-*` / `bg-white/[0.03]`) |
| 헤드라인 | `text-foreground font-bold` 단색 | strong gradient text (`bg-clip-text`) |
| 모션 | `transition-colors duration-150` 정도, 호버 시 `border-foreground` 만 | scale / rotate / float / pulse 류 |
| 라운드 | `rounded-sm` / `rounded-md` (거의 직각) | `rounded-2xl` / `rounded-3xl` |
| 그림자 | `shadow-sm` (기본) / `hover:shadow-md` | drop-shadow / 큰 box-shadow |
| 톤 | 객관 정보, 제품/서비스 설명 | "정예 / production-grade / 정성도 빠르게" 자기 자랑 |
| 모델 이름 | "AI 에이전트 / 멀티 모델" 추상 | Claude / Gemini / Grok / Anthropic / ElevenLabs 노출 |

**솔루션 카피 톤** (대표님 강조):
- "이 솔루션은 [무엇] 입니다 / [누가] 에게 / [어떻게] 사용 / [어떤 기능] 제공"
- 회고형 (Problem / Approach / Outcomes / "이렇게 풀었습니다") 금지

---

## 9. 보안 룰 (절대 위반 금지 — 자동 게이트 작동)

`scripts/check-security.sh` 가 `src/` + `public/` 전체에서 다음 단어 0건 검사:

| 금지 카테고리 | 예시 | 대체 표현 |
|--------------|------|----------|
| 외부 클라이언트 실명 (gp_claw / ai_news_scraping) | (각각의 진짜 회사명) | "사내 AI 사무 비서" / "AI News Daily" |
| 자체 하네스의 원본 OSS 명 (js-ralph / js-super) | "Ralph Wiggum" / "superpowers" / 원저자 이름 | "자율 개발 하네스" / "개발 안전 워크플로우" |

신규 카피 / 자산 추가 시 매 commit 전 `pnpm check:security` exit 0 필수.
자세한 룰은 `specs/portfolio-research.md` + `CLAUDE.md` §5.

---

## 10. 파일 / 디렉토리 맵

```
jinju-ict-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← 전역 layout (html lang ko, 폰트, Toaster)
│   │   ├── page.tsx                ← 메인 페이지 (9 섹션 조립)
│   │   ├── globals.css             ← 디자인 토큰 (T1 화이트 + 회색)
│   │   ├── api/contact/route.ts    ← Resend 폼 endpoint
│   │   ├── portfolio/[slug]/
│   │   │   ├── page.tsx            ← 솔루션 상세 페이지
│   │   │   └── opengraph-image.tsx ← 페이지별 OG
│   │   ├── icon.tsx / apple-icon.tsx / opengraph-image.tsx
│   │   ├── robots.ts / sitemap.ts
│   ├── components/
│   │   ├── site/                   ← 모든 섹션 (hero / about / process / team / portfolio / saju / careers / faq / contact / header / footer)
│   │   ├── ui/                     ← shadcn 기본 (button / card / input / accordion / sonner ...)
│   ├── lib/
│   │   ├── site.ts                 ← SITE_NAME / SITE_URL / SITE_DESCRIPTION
│   │   ├── portfolio.ts            ← 솔루션 8개 데이터
│   │   ├── portfolio-assets.ts     ← public/portfolio/ manifest
│   │   ├── saju.ts                 ← 사주 앱 메타
│   │   ├── team.ts                 ← 팀 카드 데이터
│   │   ├── contact-schema.ts       ← Zod 폼 검증
│   │   ├── utils.ts                ← cn() helper
├── public/
│   ├── portfolio/<slug>/           ← 솔루션 자산
│   ├── saju/                       ← 사주 앱 자산
│   ├── favicon.ico                 ← scaffold 기본 (필요시 교체)
├── scripts/
│   ├── check-security.sh           ← 보안 룰 게이트
│   ├── collect-portfolio-assets.sh ← 자산 자동 수집
├── specs/
│   ├── portfolio-research.md       ← 8개 솔루션 원본 자료 + 보안 룰
├── docs/features/                  ← fast-tasks batch tasks 보관 (참고용)
├── .env.example / .env.local       ← 환경변수
├── CLAUDE.md                       ← 비전 / 톤 / 보안 룰 (Claude Code 자동 로드)
├── PROMPT.md / AGENTS.md / IMPLEMENTATION_PLAN.md  ← ralph 하네스 운영 파일
├── SETUP.html                      ← 배포 체크리스트 (브라우저로 열기)
├── HANDOFF.md                      ← (이 문서)
```

---

## 11. 대기 항목 (다음 운영자가 처리)

| 항목 | 상태 | 해결 방법 |
|------|------|----------|
| **사주 앱 실제 화면** | placeholder 中 | 외계인 캐릭터 없는 실제 앱 캡처 모바일 세로 비율로 `public/saju/hero.png` 두기 + `src/lib/saju.ts` 의 `SAJU` 에 `hero: "/saju/hero.png"` 추가 |
| **TtokTtok 실제 화면** | 빠짐 | 플러터 기본 아이콘 아닌 실제 UI 캡처 `public/portfolio/ttoktok/thumbnail.png` 두기 + `portfolio-assets.ts` 에 ttoktok 항목 부활 |
| **gp_claw 추가 자료** | 대표님 paste 예정 | 받은 텍스트를 보안 룰 안에서 (회사명·도메인 가린 추상) `portfolio.ts` 의 `office-agent` description / summary / whoFor / useCases 풍부화 |
| **팀 카드 실제 정보** | placeholder 中 | `src/lib/team.ts` 의 `TEAM` 배열 갱신 (실명·사진·한 줄 소개). 사진은 `public/team/` 에. |
| **Resend 도메인 검증** | onboarding@resend.dev fallback 中 | `jinju-ict.com` DNS TXT/CNAME 등록 → Resend Domains 검증 → `CONTACT_INBOX_FROM` 을 `noreply@jinju-ict.com` 으로 교체 |
| **도메인 Vercel 연결** | 미연결 | Vercel Project → Settings → Domains → `jinju-ict.com` 추가 |
| **favicon / app icon** | scaffold 기본 | `src/app/icon.tsx` 동적 또는 정적 ico/png 교체 |
| **운영 모니터링** | 없음 | (선택) Vercel Analytics / Plausible / GA 도입 |

---

## 12. 트러블슈팅

| 증상 | 원인 / 해결 |
|------|------------|
| `pnpm dev` 가 `@utility ... is empty` 에러 | Tailwind 4 는 빈 `@utility` 거부. body 에 최소 1 property 박기 (예: `animation: none;`) |
| 폼 제출 시 503 + "logged but NOT sent" 로그 | `RESEND_API_KEY` 미설정. `.env.local` 박고 dev server 재시작 |
| 상세 페이지 (`/portfolio/[slug]`) 에서 header NAV 안 움직임 | NAV href 가 `#xxx` (상대) 가 아닌 `/#xxx` (절대 경로) 여야 함 — 현재 정상 |
| Vercel import 시 "Pro plan required" | private + org 레포는 Pro 필요. **public 전환** 으로 해결 |
| typecheck 만 PASS 인데 런타임 에러 | CSS/postcss 에러는 `tsc` 가 못 잡음 → `pnpm build` 로 한 번 더 검증 |
| 사진 cp 후 안 보임 | Next.js `<Image>` 의 src 경로 (`/portfolio/<slug>/...`) 와 실제 파일명 일치 확인. dev server 새로고침. |

---

## 13. 운영 흐름 요약

```
[새 카피 / 새 자산]
  └─→ 로컬 수정 (src/lib/ 또는 public/)
  └─→ pnpm typecheck / lint / check:security (exit 0)
  └─→ pnpm dev 로 시각 확인
  └─→ git commit + git push
  └─→ Vercel 자동 재배포 (1~2분)
  └─→ jinju-ict.com 또는 vercel.app URL 확인
```

---

**의문점은 `CLAUDE.md` (비전 / 톤 / 보안 룰) 와 `specs/portfolio-research.md` (8개 솔루션 원본) 가 단일 출처.**
