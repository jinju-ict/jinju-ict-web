import type { ShareElement } from "@/lib/saju-share";

/**
 * 운명관측소 앱 디자인 시스템의 손그림 요소 — 웹(SVG) 이식판.
 *
 * 앱 원본: saju/mobile/lib/viral_card/widgets/wuxing_planet.dart (행성 선화),
 * design/widgets/wobbly_divider.dart, breathing_star.dart, grain_overlay.dart.
 * 모두 시드 고정 난수로 그려 서버 렌더링 결과가 매번 같다(하이드레이션 불일치 없음).
 * 정적 server component — 클라이언트 JS 없음.
 */

/** 시드 고정 난수 (mulberry32). */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => n.toFixed(2);

/** n각 폴리곤 정점에 노이즈를 주고 2차 베지어로 이어 "펜으로 그린 원" 을 만든다. */
function wobblyCircle(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  segments: number,
  wobble: number,
  rand: () => number,
): string {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const k = (rand() * 2 - 1) * wobble;
    pts.push([cx + Math.cos(t) * (rx + k), cy + Math.sin(t) * (ry + k)]);
  }
  const mid = (a: [number, number], b: [number, number]): [number, number] => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
  ];
  const start = mid(pts[pts.length - 1], pts[0]);
  let d = `M${f(start[0])} ${f(start[1])}`;
  for (let i = 0; i < pts.length; i++) {
    const m = mid(pts[i], pts[(i + 1) % pts.length]);
    d += ` Q${f(pts[i][0])} ${f(pts[i][1])} ${f(m[0])} ${f(m[1])}`;
  }
  return `${d} Z`;
}

/** 살짝 흔들리는 가로선. */
function wobblyLine(
  x0: number,
  x1: number,
  y: number,
  steps: number,
  wobble: number,
  rand: () => number,
): string {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const dy = (rand() * 2 - 1) * wobble;
    d += `${i === 0 ? "M" : " L"}${f(x)} ${f(y + dy)}`;
  }
  return d;
}

const ELEMENT_SEED: Record<ShareElement, number> = {
  wood: 11,
  fire: 88,
  earth: 5,
  metal: 42,
  water: 19,
};

/**
 * 오행 행성 선화 — 목성(가스 띠) · 화성(크레이터) · 토성(고리) · 금성(소용돌이) · 수성(잔 크레이터).
 * 본체는 오행 색 18% 채움 + 같은 색 펜 선.
 */
export function WuxingPlanet({
  element,
  color,
  size = 176,
}: {
  element: ShareElement;
  color: string;
  size?: number;
}) {
  const rand = rng(ELEMENT_SEED[element]);
  const c = 100;
  const r = element === "earth" ? 60 : 76;
  const body = wobblyCircle(c, c, r, r, 22, 1.8, rand);
  const details: string[] = [];
  const softDetails: string[] = [];

  if (element === "wood") {
    for (let band = 0; band < 3; band++) {
      const y = c + r * (-0.45 + band * 0.45) * 0.6;
      const half = Math.sqrt(Math.max(0, r * r - (y - c) * (y - c))) - 4;
      softDetails.push(wobblyLine(c - half, c + half, y, 14, 1.4, rand));
    }
  } else if (element === "fire" || element === "water") {
    const count = element === "fire" ? 5 : 9;
    for (let i = 0; i < count; i++) {
      const ang = rand() * Math.PI * 2;
      const dist = rand() * r * 0.62;
      const cr = element === "fire" ? 6 + rand() * 7 : 3 + rand() * 5;
      softDetails.push(
        wobblyCircle(
          c + Math.cos(ang) * dist,
          c + Math.sin(ang) * dist,
          cr,
          cr,
          9,
          0.8,
          rand,
        ),
      );
    }
  } else if (element === "earth") {
    details.push(wobblyCircle(c, c + 2, r * 1.62, r * 0.34, 26, 1.4, rand));
  } else {
    for (let i = 0; i < 3; i++) {
      const y = c - r * 0.42 + i * r * 0.42;
      const half = Math.sqrt(Math.max(0, r * r - (y - c) * (y - c))) - 10;
      let d = "";
      const steps = 18;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const x = c - half + 2 * half * t;
        const yy = y + Math.sin(t * Math.PI * 2 + i) * 4.5 + (rand() * 2 - 1) * 0.8;
        d += `${s === 0 ? "M" : " L"}${f(x)} ${f(yy)}`;
      }
      softDetails.push(d);
    }
  }

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      className="saju-breathe overflow-visible"
    >
      <path d={body} fill={color} fillOpacity={0.18} />
      <path
        d={body}
        fill="none"
        stroke={color}
        strokeWidth={2.4}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {softDetails.map((d, i) => (
        <path
          key={`s${i}`}
          d={d}
          fill="none"
          stroke={color}
          strokeOpacity={0.7}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {details.map((d, i) => (
        <path
          key={`d${i}`}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/** 손으로 그은 구분선. 폭에 맞춰 늘어나되 선 굵기는 유지. */
export function WobblyDivider({ seed = 23 }: { seed?: number }) {
  const d = wobblyLine(2, 398, 6, 36, 1.6, rng(seed));
  return (
    <svg
      viewBox="0 0 400 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="block h-3 w-full"
    >
      <path
        d={d}
        fill="none"
        stroke="var(--saju-border)"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** 네 갈래 별 — 천천히 숨 쉬듯 깜빡인다. */
export function BreathingStar({
  size = 14,
  className = "",
  delay = 0,
}: {
  size?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={`saju-twinkle ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <path
        d="M12 1.5 C12.6 8 16 11.4 22.5 12 C16 12.6 12.6 16 12 22.5 C11.4 16 8 12.6 1.5 12 C8 11.4 11.4 8 12 1.5 Z"
        fill="var(--saju-metal)"
      />
    </svg>
  );
}

/** 종이 결(그레인) — 화면 전체에 옅게 깔리는 노이즈. */
export function GrainOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07] mix-blend-multiply"
    >
      <filter id="saju-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="17" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#saju-grain)" />
    </svg>
  );
}
