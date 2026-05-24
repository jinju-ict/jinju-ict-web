# AGENTS.md — 빌드/검증 명령

> ralph 가 매 iteration 검증에 사용하는 단일 출처.
> 60줄 이하 유지. 명령만. 도메인 설명은 specs/, 환경 컨텍스트는 CLAUDE.md.

---

## 환경 사전조건

- 운영체제: macOS (Darwin) / Linux 호환
- 런타임: Node.js 20 LTS+ (테스트 환경 22.x)
- 패키지 매니저: pnpm 11+ (없으면 `npm i -g pnpm`)

---

## 셋업 (1회)

```bash
pnpm install
```

> `pnpm-workspace.yaml` 의 `allowBuilds` 가 sharp / unrs-resolver 의 native 빌드를 허용한다.

---

## 필수 검증 명령 (ralph 가 매 iteration commit 직전 실행)

모든 명령이 exit 0 이어야 commit 한다.

```bash
# 1) lint (ESLint 9 flat + eslint-config-next)
pnpm lint

# 2) typecheck (tsc --noEmit)
pnpm typecheck
```

> build (`pnpm build`) 는 매 iteration 돌리지 않는다 — 1~3분 소요. 큰 변경 직후 + PROJECT_DONE 직전에만 돌린다 (아래 "선택 검증").

---

## 선택 검증

```bash
# Production build (Next.js, 페이지·라우트 빌드 시간 적정성 확인)
pnpm build
```

---

## 실행 (로컬 확인용)

```bash
# 개발 서버 (http://localhost:3000)
pnpm dev
```
