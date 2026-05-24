import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * WorkflowHarness — 자체 v3-classic 하네스의 능동 순환 패턴을 시각화한다.
 *
 * 외부 출처 / 원작자 / 원본 OSS 서비스명은 일체 노출하지 않는다.
 * 우리 자체 표현 — "능동 순환 (self-loop) 패턴", "단일 prompt + 자기 재투입",
 * "fresh context iteration", "deterministic backpressure", "5파일 spec".
 *
 * 시각 톤 — 화이트 + 회색 + 진한 보더 + 단색 fill. 그라데이션 / 글로우 / 모션 금지.
 * SVG stroke 는 var(--foreground) / var(--border), fill 은 var(--card) / var(--muted).
 */

interface WorkflowHarnessProps {
  className?: string;
}

const SPEC_FILES = [
  { name: "CLAUDE.md", desc: "비전 + 환경 컨텍스트" },
  { name: "PROMPT.md", desc: "행동 매뉴얼" },
  { name: "AGENTS.md", desc: "검증 명령" },
  { name: "IMPLEMENTATION_PLAN.md", desc: "TODO 체크리스트" },
  { name: "specs/", desc: "도메인 추가 사양" },
] as const;

const CYCLE_STEPS = [
  { n: "01", label: "fresh context", desc: "이전 iteration 기억 X" },
  { n: "02", label: "5파일 spec 읽기", desc: "비전 + 검증 + plan" },
  { n: "03", label: "첫 [ ] task 선택", desc: "없으면 plan 보강" },
  { n: "04", label: "구현", desc: "최소 단위 변경" },
  { n: "05", label: "deterministic 검증", desc: "lint · typecheck · test" },
  { n: "06", label: "commit + [x]", desc: "PASS 시에만" },
] as const;

export function WorkflowHarness({ className }: WorkflowHarnessProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* 상단 — 비전 인터뷰 → 동결 */}
      <div className="rounded-sm border-2 border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-sm border border-border bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            STAGE 0
          </span>
          <h3 className="text-base font-bold text-foreground sm:text-lg">
            비전 인터뷰 — 사람이 작성한 spec
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
          <StageBox
            title="8 질문 인터뷰"
            sub="vision · 사용자 · 산출물 · 성공정의 · 금지 · 외부의존 · cap · 스택"
          />
          <Arrow direction="right" className="hidden sm:block" />
          <Arrow direction="down" className="sm:hidden" />
          <StageBox
            title='"확정" 발화'
            sub="대표님이 직접 동결"
            tone="filled"
          />
          <Arrow direction="right" className="hidden sm:block" />
          <Arrow direction="down" className="sm:hidden" />
          <StageBox
            title="onboarded: true"
            sub="CLAUDE.md 잠금 · 매 iteration 자동 로드"
          />
        </div>
      </div>

      {/* 중간 — 매 iteration 능동 순환 */}
      <div className="rounded-sm border-2 border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="rounded-sm border border-border bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              STAGE 1
            </span>
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              능동 순환 (self-loop) 패턴 — 단일 prompt + 자기 재투입
            </h3>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            매 iteration 동일 prompt · fresh context
          </span>
        </div>

        {/* 좌측: 5파일 spec / 우측: 6단계 순환 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          {/* 5파일 spec */}
          <div className="rounded-sm border-2 border-border bg-muted/40 p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              5파일 spec
            </p>
            <ul className="space-y-2">
              {SPEC_FILES.map((file) => (
                <li
                  key={file.name}
                  className="flex flex-col rounded-sm border border-border bg-card px-3 py-2"
                >
                  <span className="font-mono text-xs font-bold text-foreground">
                    {file.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {file.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 6단계 순환 다이어그램 */}
          <div className="relative">
            <CycleDiagram />
          </div>
        </div>

        {/* 재투입 안내 */}
        <div className="mt-5 flex flex-col gap-2 rounded-sm border border-border bg-muted/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs font-bold text-foreground">
            세션 종료 → Stop hook → 동일 prompt 재투입
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">
            deterministic backpressure · lint · typecheck · test
          </span>
        </div>
      </div>

      {/* 하단 — 종료 조건 */}
      <div className="rounded-sm border-2 border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-sm border border-border bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            STAGE 2
          </span>
          <h3 className="text-base font-bold text-foreground sm:text-lg">
            종료 조건 — 모든 task [x] 도달
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
          <StageBox
            title="IMPLEMENTATION_PLAN.md"
            sub="모든 항목 [x] 체크"
            mono
          />
          <Arrow direction="right" className="hidden sm:block" />
          <Arrow direction="down" className="sm:hidden" />
          <StageBox
            title="PROJECT_DONE"
            sub="completion-promise 신호 출력"
            mono
            tone="filled"
          />
          <Arrow direction="right" className="hidden sm:block" />
          <Arrow direction="down" className="sm:hidden" />
          <StageBox
            title="대표님 검토"
            sub="결과물 확인 · 인수"
          />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          외에도 <span className="font-mono text-foreground">--max-iterations</span> 도달 또는 대표님 명시 정지 시 종료한다.
          LLM 채점·페르소나 framework 없이, 파일 spec + 검증 명령만으로 수렴한다.
        </p>
      </div>
    </div>
  );
}

/* ---------- sub primitives ---------- */

function StageBox({
  title,
  sub,
  tone = "outline",
  mono = false,
}: {
  title: string;
  sub: string;
  tone?: "outline" | "filled";
  mono?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-sm border-2 px-4 py-3",
        tone === "filled"
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card text-foreground",
      )}
    >
      <span
        className={cn(
          "text-sm font-bold leading-tight",
          mono && "font-mono",
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          "mt-1 text-[11px] leading-snug",
          tone === "filled" ? "text-background/70" : "text-muted-foreground",
        )}
      >
        {sub}
      </span>
    </div>
  );
}

function Arrow({
  direction,
  className,
}: {
  direction: "right" | "down";
  className?: string;
}) {
  const isRight = direction === "right";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center text-muted-foreground",
        className,
      )}
    >
      <svg
        width={isRight ? 32 : 20}
        height={isRight ? 20 : 32}
        viewBox={isRight ? "0 0 32 20" : "0 0 20 32"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {isRight ? (
          <>
            <line x1="2" y1="10" x2="26" y2="10" />
            <polyline points="20,4 26,10 20,16" />
          </>
        ) : (
          <>
            <line x1="10" y1="2" x2="10" y2="26" />
            <polyline points="4,20 10,26 16,20" />
          </>
        )}
      </svg>
    </div>
  );
}

/**
 * CycleDiagram — 6 단계 능동 순환을 사각 트랙으로 그린다.
 * stroke 는 currentColor (= text-foreground), fill 은 var(--card) / var(--muted).
 */
function CycleDiagram() {
  // 트랙: 6개 박스를 2 x 3 grid 에 배치하고, SVG 로 외곽 화살표 트랙을 덧그린다.
  return (
    <div className="relative h-full min-h-[320px] rounded-sm border-2 border-border bg-muted/30 p-4">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        매 iteration 순환
      </p>

      <div className="relative">
        {/* 6단계 그리드 */}
        <div className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CYCLE_STEPS.map((step) => (
            <div
              key={step.n}
              className="flex flex-col rounded-sm border-2 border-border bg-card px-3 py-2.5"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] font-bold text-muted-foreground">
                  {step.n}
                </span>
                <span className="text-xs font-bold text-foreground">
                  {step.label}
                </span>
              </div>
              <span className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                {step.desc}
              </span>
            </div>
          ))}
        </div>

        {/* 순환 표시 — 데스크탑에서만 외곽 화살표 */}
        <div className="mt-4 flex items-center justify-between gap-3 rounded-sm border border-dashed border-border bg-card/60 px-3 py-2">
          <span className="font-mono text-[11px] text-muted-foreground">
            06 → 재투입 → 01
          </span>
          <CircularArrowGlyph />
          <span className="font-mono text-[11px] text-muted-foreground">
            동일 prompt · 새 context
          </span>
        </div>
      </div>
    </div>
  );
}

function CircularArrowGlyph() {
  return (
    <svg
      aria-hidden="true"
      width="36"
      height="20"
      viewBox="0 0 36 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className="text-foreground"
    >
      {/* 좌측 화살표 위 → 우측 끝, 우측에서 아래로 휘어져 좌측으로 돌아옴을 단순 직선 2 + arrow head 로 표현 */}
      <line x1="3" y1="6" x2="29" y2="6" />
      <polyline points="23,2 29,6 23,10" />
      <line x1="33" y1="14" x2="7" y2="14" />
      <polyline points="13,10 7,14 13,18" />
    </svg>
  );
}
