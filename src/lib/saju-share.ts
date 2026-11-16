/**
 * 운명관측소 공유 링크 — saju 백엔드 공개 API(`GET /share/{code}`) 호출 + 표시용 메타.
 *
 * 서버 컴포넌트에서만 호출한다(브라우저가 API 를 직접 부르지 않음 → CORS 불필요).
 * 응답에는 사주 요약(행성·일간·오행 분포·대표 한 줄·키워드)과 스토어 주소만 온다 —
 * 생년월일시·사주 8글자·풀이 전문·이름은 백엔드가 내려주지 않는다.
 */

/** 운영 API 주소. 로컬/스테이징은 서버 전용 환경변수 SAJU_API_BASE_URL 로 덮어쓴다. */
const DEFAULT_API_BASE_URL =
  "https://saju-backend.orangestone-227f3b66.koreacentral.azurecontainerapps.io";

/** 백엔드 store_url 을 못 받았을 때의 폴백 — 안드로이드 스토어 리스팅. */
export const DEFAULT_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.jinjuict.saju";

export const SHARE_APP_NAME = "운명관측소";

const API_TIMEOUT_MS = 6000;
const CODE_PATTERN = /^[A-Za-z0-9]{10}$/;

export type ShareElement = "wood" | "fire" | "earth" | "metal" | "water";

export interface ShareSummary {
  element: ShareElement;
  day_master: string;
  wuxing: Record<string, number>;
  headline: string | null;
  keywords: string[];
}

export interface SharedSaju {
  summary: ShareSummary;
  storeUrl: string;
}

export interface ElementMeta {
  /** 한글 오행 글자 */
  ko: string;
  /** 백엔드 분포 키 (한자) */
  key: string;
  planet: string;
  keyword: string;
  color: string;
}

/** 앱(mobile WuXingMeta · 라이트 팔레트)과 같은 행성 이름·문구·색. */
export const ELEMENT_META: Record<ShareElement, ElementMeta> = {
  wood: { ko: "목", key: "木", planet: "목성", keyword: "뻗어나가는 성장", color: "#4FA678" },
  fire: { ko: "화", key: "火", planet: "화성", keyword: "환하게 타오르는 열정", color: "#D4565A" },
  earth: { ko: "토", key: "土", planet: "토성", keyword: "든든히 품는 안정", color: "#B8863E" },
  metal: { ko: "금", key: "金", planet: "금성", keyword: "또렷하게 벼려진 결단", color: "#D4912F" },
  water: { ko: "수", key: "水", planet: "수성", keyword: "깊고 유연한 지혜", color: "#5470A8" },
};

export const ELEMENT_ORDER: ShareElement[] = ["wood", "fire", "earth", "metal", "water"];

const STEM_KO: Record<string, string> = {
  甲: "갑", 乙: "을", 丙: "병", 丁: "정", 戊: "무",
  己: "기", 庚: "경", 辛: "신", 壬: "임", 癸: "계",
};

/** 일간 표기 — "경(庚)". 모르는 글자면 원문 그대로. */
export function dayMasterLabel(dayMaster: string): string {
  const stem = dayMaster.trim();
  const ko = STEM_KO[stem];
  return ko ? `${ko}(${stem})` : stem;
}

/** 대표 한 줄 — 없으면(이전 버전 풀이) 오행 키워드 문구로 대체. */
export function shareHeadline(summary: ShareSummary): string {
  const headline = summary.headline?.trim();
  return headline ? headline : ELEMENT_META[summary.element].keyword;
}

function apiBaseUrl(): string {
  const explicit = process.env.SAJU_API_BASE_URL?.trim();
  return (explicit || DEFAULT_API_BASE_URL).replace(/\/$/, "");
}

function isElement(value: unknown): value is ShareElement {
  return typeof value === "string" && value in ELEMENT_META;
}

function parseSummary(raw: unknown): ShareSummary | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  if (!isElement(r.element) || typeof r.day_master !== "string") return null;
  const wuxing: Record<string, number> = {};
  if (typeof r.wuxing === "object" && r.wuxing !== null) {
    for (const [k, v] of Object.entries(r.wuxing as Record<string, unknown>)) {
      if (typeof v === "number" && Number.isFinite(v)) wuxing[k] = v;
    }
  }
  return {
    element: r.element,
    day_master: r.day_master,
    wuxing,
    headline: typeof r.headline === "string" ? r.headline : null,
    keywords: Array.isArray(r.keywords)
      ? r.keywords.filter((k): k is string => typeof k === "string").slice(0, 3)
      : [],
  };
}

function httpUrlOr(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? value : fallback;
  } catch {
    return fallback;
  }
}

/**
 * 공유 링크 조회. 없거나 닫힌 링크·API 장애·형식 오류는 모두 null
 * (화면은 "더 이상 볼 수 없는 공유입니다" 안내 하나로 처리).
 *
 * @param record true 면 백엔드가 열람 1건을 기록한다 — 페이지 본문 렌더링에서만 true.
 *               메타데이터·미리보기 이미지 조회는 false 로 불러 중복 기록을 막는다.
 * @param userAgent 방문자의 User-Agent — 열람 기록에서 미리보기 봇과 사람을 구분하는 용도.
 */
export async function fetchSharedSaju(
  code: string,
  { record, userAgent }: { record: boolean; userAgent?: string | null },
): Promise<SharedSaju | null> {
  if (!CODE_PATTERN.test(code)) return null;
  try {
    const res = await fetch(
      `${apiBaseUrl()}/share/${code}?record=${record ? "true" : "false"}`,
      {
        cache: "no-store",
        headers: userAgent ? { "User-Agent": userAgent.slice(0, 512) } : undefined,
        signal: AbortSignal.timeout(API_TIMEOUT_MS),
      },
    );
    if (!res.ok) return null;
    const body: unknown = await res.json();
    if (typeof body !== "object" || body === null) return null;
    const summary = parseSummary((body as Record<string, unknown>).summary);
    if (!summary) return null;
    return {
      summary,
      storeUrl: httpUrlOr((body as Record<string, unknown>).store_url, DEFAULT_STORE_URL),
    };
  } catch {
    return null;
  }
}

/** 닫힌 공유 화면의 구글플레이 버튼 주소 — 백엔드 공개 설정(GET /config)의 store_url. */
export async function fetchStoreUrl(): Promise<string> {
  try {
    const res = await fetch(`${apiBaseUrl()}/config`, {
      cache: "no-store",
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
    if (!res.ok) return DEFAULT_STORE_URL;
    const body: unknown = await res.json();
    if (typeof body !== "object" || body === null) return DEFAULT_STORE_URL;
    return httpUrlOr((body as Record<string, unknown>).store_url, DEFAULT_STORE_URL);
  } catch {
    return DEFAULT_STORE_URL;
  }
}
