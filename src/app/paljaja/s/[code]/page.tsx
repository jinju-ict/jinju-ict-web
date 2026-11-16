import type { Metadata } from "next";
import { Gaegu, Gowun_Dodum, Roboto_Mono } from "next/font/google";
import { headers } from "next/headers";
import {
  BreathingStar,
  GrainOverlay,
  WobblyDivider,
  WuxingPlanet,
} from "@/components/paljaja/hand-drawn";
import {
  DEFAULT_STORE_URL,
  ELEMENT_META,
  ELEMENT_ORDER,
  SHARE_APP_NAME,
  dayMasterLabel,
  fetchSharedSaju,
  fetchStoreUrl,
  shareHeadline,
  type ShareSummary,
} from "@/lib/saju-share";

/**
 * 운명관측소 — 공유받은 사주 요약 페이지. 주소: {SITE_URL}/paljaja/s/{code}
 *
 * 앱에서 "공유하기" 로 발급된 링크를 받은 사람이 설치·로그인 없이 여는 화면.
 * 사주 요약(행성·일간·대표 한 줄·키워드·오행 분포)과 구글플레이 버튼만 보여준다.
 * 닫혔거나 없는 링크는 구분 없이 같은 안내를 보여준다.
 *
 * 화면은 앱(saju/mobile)의 디자인 시스템을 그대로 따른다 — 아이보리 종이 + 먹빛 손그림
 * 프레임, 개구체(손글씨)·고운돋움(본문)·Roboto Mono(라벨), 오행 색 액센트.
 * 루트의 `.saju-share` 마커가 globals.css 규칙과 맞물려 회사 헤더(로고)·푸터를 숨긴다.
 *
 * 매 요청 렌더링(열람 기록 + 닫힌 링크 즉시 반영) — 캐시하지 않는다.
 */
export const dynamic = "force-dynamic";

// 앱 AppTypography 와 같은 서체 — 이 라우트에서만 로드된다.
const gaegu = Gaegu({
  variable: "--font-gaegu",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});
const gowunDodum = Gowun_Dodum({
  variable: "--font-gowun-dodum",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  // 메타데이터 조회는 열람으로 기록하지 않는다.
  const shared = await fetchSharedSaju(code, { record: false });
  const title = shared
    ? `${SHARE_APP_NAME} — ${shareHeadline(shared.summary)}`
    : `${SHARE_APP_NAME} — 공유된 별 이야기`;
  const description = shared
    ? `${ELEMENT_META[shared.summary.element].planet}에서 온 사람의 별 이야기를 확인해 보세요.`
    : "더 이상 볼 수 없는 공유입니다.";
  return {
    title: { absolute: title },
    description,
    // 개인 사주 요약 — 검색 엔진에 색인하지 않는다.
    robots: { index: false, follow: false },
    openGraph: { type: "website", siteName: SHARE_APP_NAME, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`saju-share ${gaegu.variable} ${gowunDodum.variable} ${robotoMono.variable} relative min-h-dvh overflow-hidden`}
    >
      <GrainOverlay />
      <BreathingStar size={16} className="absolute left-7 top-9" />
      <BreathingStar size={12} className="absolute right-9 top-16" delay={1.1} />
      <BreathingStar size={10} className="absolute right-6 top-[46%]" delay={0.6} />
      <div className="relative mx-auto flex min-h-dvh max-w-md flex-col px-6 pb-10 pt-12">
        <p className="saju-mono text-center text-xs tracking-[0.45em] text-[var(--saju-ink-dim)]">
          {SHARE_APP_NAME}
        </p>
        {children}
        <footer className="mt-auto pt-12 text-center text-xs text-[var(--saju-ink-muted)]">
          <span>진주 정보통신</span>
          <span className="mx-2">·</span>
          <a href="/paljaja/privacy" className="underline underline-offset-2">
            개인정보처리방침
          </a>
        </footer>
      </div>
    </div>
  );
}

function StoreButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="saju-button saju-hand flex min-h-14 w-full items-center justify-center gap-2 px-6 py-3 text-2xl text-[var(--saju-ink)]"
    >
      <span>앱에서 내 별 보러 가기</span>
      <span aria-hidden="true" className="text-[var(--saju-metal)]">
        ›
      </span>
    </a>
  );
}

function ClosedShare({ storeUrl }: { storeUrl: string }) {
  return (
    <Shell>
      <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
        <WuxingPlanet element="metal" color="var(--saju-border)" size={132} />
        <h1 className="saju-hand mt-8 break-keep text-4xl text-[var(--saju-ink)]">
          더 이상 볼 수 없는 공유입니다
        </h1>
        <p className="mt-4 break-keep text-balance text-[15px] leading-7 text-[var(--saju-ink-dim)]">
          링크가 닫혔거나 주소가 올바르지 않아요. 앱에서 나의 별 이야기를 직접
          확인해 보세요.
        </p>
        <div className="mt-10 w-full">
          <StoreButton href={storeUrl} />
        </div>
      </div>
    </Shell>
  );
}

function WuxingBars({ summary }: { summary: ShareSummary }) {
  const counts = ELEMENT_ORDER.map((el) => summary.wuxing[ELEMENT_META[el].key] ?? 0);
  const max = Math.max(1, ...counts);
  return (
    <ul className="space-y-3" aria-label="오행 분포">
      {ELEMENT_ORDER.map((el, i) => {
        const meta = ELEMENT_META[el];
        return (
          <li key={el} className="flex items-center gap-3">
            <span className="saju-hand w-6 text-2xl text-[var(--saju-ink)]">{meta.ko}</span>
            <span className="saju-bar block h-4 flex-1 overflow-hidden">
              <span
                className="block h-full"
                style={{
                  width: `${(counts[i] / max) * 100}%`,
                  backgroundColor: meta.color,
                }}
              />
            </span>
            <span className="saju-mono w-5 text-right text-sm tabular-nums text-[var(--saju-ink-dim)]">
              {counts[i]}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default async function SharedSajuPage({ params }: PageProps) {
  const { code } = await params;
  const userAgent = (await headers()).get("user-agent");
  const shared = await fetchSharedSaju(code, { record: true, userAgent });

  if (!shared) {
    // API 장애 시에도 fetchStoreUrl 이 기본 스토어 주소로 폴백한다.
    const storeUrl = await fetchStoreUrl().catch(() => DEFAULT_STORE_URL);
    return <ClosedShare storeUrl={storeUrl} />;
  }

  const { summary, storeUrl } = shared;
  const meta = ELEMENT_META[summary.element];

  return (
    <Shell>
      <h1 className="saju-hand mt-5 text-center text-[2.6rem] text-[var(--saju-ink)]">
        {meta.planet}에서 온 사람
      </h1>

      <div className="mt-6 flex justify-center">
        <WuxingPlanet element={summary.element} color={meta.color} />
      </div>
      <p
        className="saju-mono mt-4 text-center text-[13px] font-medium tracking-wide"
        style={{ color: meta.color }}
      >
        일간 {dayMasterLabel(summary.day_master)} · {meta.keyword}
      </p>

      <section
        className="saju-frame mt-7 px-6 py-7 text-center"
        style={{ borderColor: "var(--saju-cyan)" }}
      >
        <p className="saju-hand break-keep text-balance text-[1.9rem] text-[var(--saju-ink)]">
          “{shareHeadline(summary)}”
        </p>
        {summary.keywords.length > 0 ? (
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {summary.keywords.map((keyword) => (
              <li
                key={keyword}
                className="saju-chip px-3.5 py-1 text-sm text-[var(--saju-ink)]"
                style={
                  {
                    "--saju-chip-color": meta.color,
                    backgroundColor: `${meta.color}29`,
                  } as React.CSSProperties
                }
              >
                #{keyword}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="saju-frame saju-frame-alt mt-6 px-6 py-6">
        <h2 className="saju-mono mb-4 text-xs tracking-[0.3em] text-[var(--saju-ink-dim)]">
          오행 분포
        </h2>
        <WuxingBars summary={summary} />
      </section>

      <div className="mt-9">
        <WobblyDivider />
      </div>

      <section className="mt-7 text-center">
        <p className="saju-hand text-4xl text-[var(--saju-ink)]">당신은, 어떤 별인가요?</p>
        <p className="mt-3 break-keep text-balance text-[15px] leading-7 text-[var(--saju-ink-dim)]">
          생년월일만 넣으면 나의 행성과 평생 사주 풀이를 볼 수 있어요.
        </p>
        <div className="mt-6">
          <StoreButton href={storeUrl} />
        </div>
      </section>
    </Shell>
  );
}
