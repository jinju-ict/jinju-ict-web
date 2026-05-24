# jinju-ict-web — ralph harness (v3-classic)

이 하네스는 js-ralph factory 의 template 에서 eject 되었다.
이 파일은 **자가완결**이다 — 부모 저장소를 참조하지 않는다.
Claude Code 가 매 세션 자동 로드하므로, ralph 의 매 iteration fresh context 에 항상 포함된다.

--- 

## 🔒 비전 인터뷰 상태 (gating)

```yaml
onboarded: true
onboarded_at: 2026-05-24T04:35:39Z
```

> `onboarded: false` 이면 ralph 는 매 iteration 첫 응답을 **비전 인터뷰** (`vision-intake` skill) 로 시작한다.
> 8 질문 답변 + "확정" 발화 후 vision-intake skill 이 위 값을 `true` + ISO 타임스탬프로 갱신하고 아래 "비전 / 사양" 섹션을 채운다.

---

## 비전 / 사양 (대표님 영역 — vision-intake 가 채움)

### 1. 비전

**진주 정보통신개발** — AI 전문가들이 모인 개발사. AI 기술 기반으로 **자체 서비스를 주력으로 만들면서, 협업·외주 의뢰도 폭넓게 수행**한다. 첫 자체 프로덕트로 사주 서비스를 준비 중.

이 사이트(`jinju-ict-web`)는 **회사 소개(주) + 사주 서비스 입구(부)** 를 겸하는 단일 페이지 랜딩이다.

핵심 메시지: "AI 잘하는 정예 개발사. 자체 서비스를 주력으로 만들면서도, 협업·외주 의뢰도 폭넓게 받는다 — **특정 영역에 치우치지 않고 가치 있는 일은 모두 수행**." 카피·섹션 비중에서 "SI 회사" 한쪽으로 쏠리는 인상 금지.

### 2. 대상 사용자

특정 페르소나 타겟팅 X — **"우리를 알린다"** 가 핵심. 잠재 SI 고객 / 사주 앱 관심자 / 흘러들어온 방문자 모두 포용. 누가 들어와도 "진짜 잘하는 회사 같다" 는 인상을 받게 만드는 게 목표.

### 3. 핵심 산출물

단일 페이지 랜딩의 섹션 구성:

1. **Hero / 회사 소개** — 회사명(진주 정보통신개발) + 슬로건(ralph 합성) + AI 전문성 어필 메시지
2. **팀 소개** — Nova 식 팀원 카드 2명
   - 기획자: 다양한 서비스 기획 + 창업 경험 + 뛰어난 PM. AI 전문
   - 개발자: AI 에이전트 / AI 모델 개발 / 백엔드 / 앱 개발. AI 전문
   - 한 줄 소개·사진은 ralph 가 위 톤으로 합성 (placeholder), 동결 후 대표님이 직접 갱신
   - **나이 / 인원수 "2명" 표현 금지** — "소수 정예" 같은 추상 표현으로
3. **사주 서비스 입구** — 첫 자체 프로덕트. 앱 미배포 → "Coming Soon" CTA. 콘텐츠/스크린샷은 `/Users/goldenplanet/jinsup_space/saju` 에서 cp
4. **포트폴리오** — 8개 프로젝트를 카드/그리드로 노출
   - 분류·정체·스택·전문가 느낌 카피·보안 룰은 `specs/portfolio-research.md` 에 정리 완료
   - 진주 정보통신개발 자체 (3): TtokTtok, shortdub, king_of_law
   - 외부 클라이언트 의뢰 (3): Andy, gp_claw, ai_news_scraping
   - 자체 개발 인프라 (2): js-ralph, js-super → "자체 하네스 / 에이전틱 엔지니어링 방식 보유, 개발 속도 빠르고 탄탄" 추상 메시지로
   - 스크린샷·로고는 ralph 가 각 프로젝트 폴더 까서 자동 cp (`public/portfolio/` 권장)
5. **협업·문의 폼** — 이름 / 회사(선택) / 연락처 / 문의 내용. 외주·협업·기타 문의를 통합 수신. 라벨/카피에서 "SI" 단어 단독 노출 지양 — "협업 / 프로젝트 문의" 같은 포괄 용어 사용. 수신은 이메일(`teo.baek@outlook.com`)

### 4. 성공 정의

**정량 지표 없음.** 유일한 기준은 **정성 — Nova(`/Users/goldenplanet/jinsup_ralph/Nova`) 급 정성·완성도**.

ralph 는 매 iteration 끝에서 "Nova 와 동등하거나 그 이상의 시각적 정성·인터랙션 디테일·코드 품질을 달성했는가" 를 자기 점검 기준으로 삼는다. (정량 검증 없음 = LLM 채점 없음 ≠ 검증 없음. AGENTS.md 의 lint/typecheck/build 는 그대로 deterministic backpressure 로 동작.)

### 5. 금지 / 범위 밖

- 가격표 / 견적 자동 산출 (협업·외주는 별도 협의)
- 로그인 / 회원 / 인증 시스템 (단순 랜딩)
- 다국어 (한국어만)
- 블로그 / 뉴스 / CMS (운영 부담)
- 사주 결과 실제 계산 로직 (앱 책임, 웹은 입구만)
- **포트폴리오 보안 룰 위반** — `specs/portfolio-research.md` 의 노출 룰 절대 위반 금지:
  - gp_claw 의 진짜 클라이언트 회사명
  - ai_news_scraping 의 진짜 클라이언트 회사명
  - js-ralph / js-super 의 원본 OSS 서비스명

### 6. 외부 의존

| 항목 | 출처 / 처리 |
|------|------------|
| 협업·문의 수신 이메일 | `teo.baek@outlook.com` (확정) |
| 폼 전송 인프라 | **Resend** 채택 (무료 3000/월, Vercel 1-clic 통합). env: `RESEND_API_KEY` / `CONTACT_INBOX_TO` / `CONTACT_INBOX_FROM`. 도메인 검증 전 발신 fallback `onboarding@resend.dev` |
| 사주 앱 자산 (스크린샷 / 슬로건 / 기능) | `/Users/goldenplanet/jinsup_space/saju` 폴더 자동 탐색 후 `public/saju/` 로 cp |
| 사주 앱 다운로드 링크 | 미배포 → "Coming Soon" CTA, URL 자리만 마련 |
| 포트폴리오 스크린샷 / 로고 / 아이콘 | 각 프로젝트 폴더에서 ralph 자동 수집 후 `public/portfolio/` 로 cp. 없으면 자동 합성 (placeholder + 색감 토큰) |
| 팀 프로필 사진 / 실제 한 줄 소개 | ralph 가 Nova 식 placeholder (이니셜 + 그라데이션 + 직무 라벨) 로 자리잡기. 동결 후 대표님이 직접 갱신 |
| 분석 / 트래킹 | 도입 X (정성 기준만 본다는 §4 결정에 따라) |

### 7. 규모·일정·비용 cap

**ralph 200 iteration cap.** 정성 우선이라 디폴트 150 보다 50 상향. ralph-loop 자동 시작 시 `--max-iterations 200` 으로 설정.

비용 cap 미설정 — Nova 급 정성에 도달할 때까지 200 iteration 풀로 사용 가능.

### 8. 기술 스택

**Next.js 16 App Router + TypeScript + Tailwind CSS + shadcn/ui** 채택.

| 영역 | 채택 | 이유 |
|------|------|------|
| 프레임워크 | Next.js 16 (App Router) | Nova 가 Next.js 16 App Router 라 동일 정성 재현에 가장 가까운 출발점. Vercel 1-clic 배포. |
| 언어 | TypeScript | 단일 페이지지만 컴포넌트 props 안전성 + IDE 보조 |
| 스타일링 | Tailwind CSS | Nova 동일. 정성 디테일 빠른 반복에 유리 |
| UI 컴포넌트 | shadcn/ui | 카드/폼/다이얼로그 등 기본 컴포넌트 빠르게. 디자인 커스터마이즈 자유 |
| 폼 처리 | React Hook Form + Zod | SI 문의 폼 검증 |
| 폰트 / 아이콘 | next/font + lucide-react | 정성·일관성 |
| 배포 | Vercel | 무료 tier + 1-clic. 도메인 추후 |

factory 디폴트 (Vite + React) 는 채택하지 않음 — Nova 노선과 어긋남.

---

## 공통 — 5 파일 (Geoffrey 정석 4 + Claude Code 자동 로드 1)

| 파일 | 무엇 | 누가 만드나 |
|------|------|------------|
| 이 `CLAUDE.md` | **비전 + 환경 컨텍스트 + 호칭 톤** (Claude Code 자동 로드) | vision-intake skill 이 자동 합성 (위 섹션) |
| `PROMPT.md` | ralph 행동 매뉴얼 (도구 중립) | factory 가 박아둠. 사용자는 `<!-- signs -->` 표지판 한 줄만 누적 |
| `AGENTS.md` | 빌드/검증 명령 (60줄 이하) | 대표님 또는 ralph 첫 iteration |
| `IMPLEMENTATION_PLAN.md` | 현재 TODO 체크리스트 | ralph 99% 자동. 사람은 빈 파일만 시작 |
| `specs/*.md` | (선택) 도메인 추가 사양 — api.md / ui.md / data.md 등 | 대표님 또는 ralph 첫 iteration |

> v2 의 11 phase / 15 페르소나 / 14 skill / gate-verify framework 는 **의도적으로 제거**됨.

---

## 공통 — 4 원칙 (Geoffrey 정석)

| # | 원칙 | 이 하네스에서 구현 |
|---|------|--------------------|
| 1 | 단일 prompt + 자기 재투입 루프 | ralph-loop 플러그인의 Stop hook 이 매 iteration 동일 prompt 를 fresh context 로 재투입 |
| 2 | 사람이 작성한 파일 spec | 이 CLAUDE.md 의 "비전 / 사양" 섹션 (vision-intake 합성 후 동결) + (선택) `specs/*` |
| 3 | fresh context 매 iteration | ralph 는 앞 iteration 을 기억 X. 상태는 git + 4 파일에만 |
| 4 | deterministic backpressure | `AGENTS.md` 의 검증 명령 (lint/typecheck/tests). LLM 채점 없음 |

---

## 공통 — 매 iteration 흐름

`/ralph-loop:ralph-loop` 시작 후 매 iteration ralph 가 자동 진행:

```
이 CLAUDE.md (자동 로드) + PROMPT.md (Read) → §1 절차 따라:
  specs/ 읽기 → AGENTS.md 읽기 → IMPLEMENTATION_PLAN.md 읽기
  → 첫 [ ] task 선택 (없으면 비전 기반 plan 보강)
  → 구현
  → AGENTS.md 검증 명령 (모두 exit 0)
  → PASS 면 commit + [ ]→[x]
  → 종료 → Stop hook 재투입
```

종료 조건:
- 모든 비전 항목이 plan 에 반영되고 전부 `[x]` → `PROJECT_DONE` 출력
- `--max-iterations` 도달
- 대표님 명시 정지

---

## 공통 — 사용자 호칭 / 톤

`PROMPT.md` 는 도구 중립이라 "사용자" 라고만 표기한다.
**이 CLAUDE.md 에서 "사용자 = 대표님" 으로 자동 치환**한다.

### 호칭
- 사용자 = **대표님 (방향 결정자)**
- 모든 응답·보고·커밋 메시지에 호칭은 "대표님" 으로 통일

### 톤
- 어투: 경어, 일관된 격식체. 반말 혼용 금지
- 길이: 응답·보고 3~5줄. 불필요한 수식어 제거
- 구조: 한 일 / 결과 / 다음 방향 분리
- 에러 메시지 그대로 노출 금지. "이런 결정이 필요합니다" 로 프레이밍
- 보고 첫 줄에 `대표님께:` prefix 권장 (필수 아님)

### 대표님 개입 시점 (2회)
1. **시작**: vision-intake 8 질문 답변 → 위 "비전 / 사양" 자동 합성 → "확정" 발화로 동결
2. **끝**: ralph 가 `PROJECT_DONE` 출력 후 결과물 검토

---

## 공통 — 기본 기술 스택 (factory 디폴트)

위 "8. 기술 스택" 에 override 명시 안 했으면 이 조합으로 진행한다.

| 영역 | 기본 |
|------|------|
| Backend | Python + uv + FastAPI + SQLAlchemy |
| Web Frontend | React (Vite + TypeScript) |
| Mobile App | Android (Kotlin, Android Studio). iOS / Flutter 의도적 포기 |
| Database | Postgres |
| 그 외 (인프라/CI/캐시) | 합리적 기본값 |

---

## 공통 — 신규 시작 체크리스트

- [ ] (1회) Claude Code 에 **ralph-loop 플러그인** 설치 — `/plugin install ralph-loop`
- [ ] `claude` 세션 열기 — ralph 가 vision-intake skill 자동 호출 (위 `onboarded: false` 트리거)
- [ ] 8 질문 답변 후 "확정" 발화 → 이 CLAUDE.md 의 "비전 / 사양" 자동 합성 + `onboarded: true`
- [ ] `AGENTS.md` 의 검증 명령 채우고 로컬에서 1회 exit 0 확인
- [ ] ralph-loop 시작:
  ```
  /ralph-loop:ralph-loop "Read PROMPT.md and follow it." --completion-promise "PROJECT_DONE" --max-iterations 150
  ```
- [ ] 첫 iteration 끝나고 `IMPLEMENTATION_PLAN.md` 에 `[ ]` 가 누적되는지 확인

---

## 공통 — 표지판

ralph 가 같은 실수를 반복하면 `PROMPT.md` 의 `<!-- signs -->` 섹션 아래에 한 줄 추가.
