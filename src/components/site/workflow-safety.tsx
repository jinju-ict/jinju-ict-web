import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * WorkflowSafety
 *
 * 자체 운영 중인 "단계별 확인 게이트" 워크플로우를 추상 다이어그램으로 시각화.
 * - 4단계 flow (Discovery → Design → Plan → Build)
 * - 각 .md 문서 옆에 사람 친화 .html 사본 자동 생성
 * - 위험 주석 (RISK 3-checklist) 자동 부착
 * - 변경이력 footer 자동 누적
 * - 서브에이전트 wave-parallel (DAG 자동 분석 후 단계 dispatch)
 *
 * 디자인 토큰: T1 화이트 + 회색 + 아재 투박.
 * 컬러 X — bg-card / border-border / text-foreground / text-muted-foreground / bg-muted 만.
 */

interface WorkflowSafetyProps {
  className?: string;
}

interface Stage {
  cmd: string;
  doc: string;
  phase: string;
}

const STAGES: Stage[] = [
  { cmd: "/brainstorm", doc: "요구사항.md", phase: "Discovery" },
  { cmd: "/design", doc: "기술설계.md", phase: "Design" },
  { cmd: "/write-plan", doc: "구현계획.md", phase: "Plan" },
  { cmd: "/execute-plan", doc: "코드", phase: "Build" },
];

const AUTO_FEATURES: Array<{ label: string; detail: string }> = [
  {
    label: "사람 친화 .html 사본",
    detail: "각 .md 옆에 검토용 시각화 사본을 자동 생성",
  },
  {
    label: "위험 주석 (RISK 3-checklist)",
    detail: "side-effect / breaking / race 3 항목 자가 점검 후 코드 라인에 부착",
  },
  {
    label: "변경이력 footer 자동 누적",
    detail: "이유 / 범위 / 영향을 CH-id 단위로 문서 footer 에 기록",
  },
];

interface Wave {
  name: string;
  tasks: string[];
  note?: string;
}

const WAVES: Wave[] = [
  { name: "Wave 1", tasks: ["T1", "T2"], note: "의존 없음 — 동시" },
  { name: "Wave 2", tasks: ["T3"], note: "Wave 1 완료 후" },
  { name: "Wave 3", tasks: ["T4", "T5"], note: "Wave 2 완료 후 동시" },
];

export function WorkflowSafety({ className }: WorkflowSafetyProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* ─── 상단: 4단계 flow + 게이트 ─── */}
      <div className="rounded-sm border-2 border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-foreground">
            단계별 확인 게이트
          </h3>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Discovery → Design → Plan → Build
          </span>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          머릿속 아이디어가 실제 코드가 되기까지, 단계 사이마다 확인 게이트에서 한 번 멈춥니다.
          AI 가 자동으로 다음 단계로 넘어가지 않습니다.
        </p>

        {/* flow — 좌→우 (lg) / 위→아래 (sm) */}
        <ol className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
          {STAGES.map((stage, i) => {
            const isLast = i === STAGES.length - 1;
            return (
              <React.Fragment key={stage.cmd}>
                <li className="flex flex-1 flex-col gap-2 rounded-sm border-2 border-border bg-muted p-3 lg:rounded-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {`STEP ${i + 1} · ${stage.phase}`}
                  </span>
                  <code className="block font-mono text-sm font-bold text-foreground">
                    {stage.cmd}
                  </code>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center rounded-sm border border-border bg-card px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                      {stage.doc}
                    </span>
                    {stage.doc.endsWith(".md") && (
                      <>
                        <span className="text-[10px] text-muted-foreground">＋</span>
                        <span className="inline-flex items-center rounded-sm border border-dashed border-border bg-card px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                          {stage.doc.replace(".md", ".html")}
                        </span>
                      </>
                    )}
                  </div>
                </li>
                {!isLast && (
                  <li
                    aria-hidden="true"
                    className="flex items-center justify-center self-center px-2 py-1 lg:px-1 lg:py-0"
                  >
                    <div className="flex flex-col items-center gap-0.5 lg:flex-row lg:gap-1">
                      <span className="hidden text-xl leading-none text-muted-foreground lg:inline">
                        →
                      </span>
                      <span className="inline-flex items-center rounded-sm border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-foreground">
                        게이트
                      </span>
                      <span className="hidden text-xl leading-none text-muted-foreground lg:inline">
                        →
                      </span>
                      <span className="inline text-xl leading-none text-muted-foreground lg:hidden">
                        ↓
                      </span>
                    </div>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>

        {/* 범례 — .md / .html 의미 */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t-2 border-border pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2 w-4 border border-border bg-card" />
            <span className="font-mono">.md</span>
            <span>— AI 가 읽는 원본 문서</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2 w-4 border border-dashed border-border bg-card" />
            <span className="font-mono">.html</span>
            <span>— 사람 검토용 사본 (자동 생성)</span>
          </span>
        </div>
      </div>

      {/* ─── 중간: 자동 부착되는 3가지 ─── */}
      <div className="rounded-sm border-2 border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-foreground">
            매 단계 자동 부착
          </h3>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            사람 손이 안 가는 흔적 3종
          </span>
        </div>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {AUTO_FEATURES.map((feat, i) => (
            <li
              key={feat.label}
              className="flex flex-col gap-2 rounded-sm border-2 border-border bg-muted p-3"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {`AUTO-${String(i + 1).padStart(2, "0")}`}
              </span>
              <span className="text-sm font-bold leading-snug text-foreground">
                {feat.label}
              </span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                {feat.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ─── 하단: 서브에이전트 wave-parallel ─── */}
      <div className="rounded-sm border-2 border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-foreground">
            서브에이전트 wave-parallel
          </h3>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            DAG 자동 분석 → 단계 dispatch
          </span>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          구현계획의 task 들을 무작정 한 번에 돌리지 않습니다. task 사이 의존그래프를
          먼저 분석한 뒤, 의존이 없는 묶음끼리만 동시에 처리합니다. 충돌 없는 범위에서
          최대 병렬.
        </p>

        <ol className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-start">
          {WAVES.map((wave, i) => {
            const isLast = i === WAVES.length - 1;
            return (
              <React.Fragment key={wave.name}>
                <li className="flex flex-1 flex-col gap-2 rounded-sm border-2 border-border bg-muted p-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                      {wave.name}
                    </span>
                    {wave.note && (
                      <span className="text-[10px] text-muted-foreground">
                        {wave.note}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {wave.tasks.map((task) => (
                      <span
                        key={task}
                        className="inline-flex items-center rounded-sm border-2 border-border bg-card px-2 py-1 font-mono text-xs font-bold text-foreground"
                      >
                        {task}
                      </span>
                    ))}
                  </div>
                </li>
                {!isLast && (
                  <li
                    aria-hidden="true"
                    className="flex items-center justify-center self-center px-1 text-xl leading-none text-muted-foreground"
                  >
                    <span className="hidden lg:inline">→</span>
                    <span className="inline lg:hidden">↓</span>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>

        <p className="mt-4 border-t-2 border-border pt-3 text-xs leading-relaxed text-muted-foreground">
          일꾼 에이전트는 계획서 변경을 한 글자도 안 틀리게 복붙합니다. 자기 머리로 새
          코드를 짓지 않고, 의심스러우면 즉시 멈춥니다. 막히면 조정자 에이전트가 먼저
          복구를 시도하고, 그래도 안 되면 사람에게 올립니다.
        </p>
      </div>
    </div>
  );
}
