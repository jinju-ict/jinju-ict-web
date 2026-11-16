import { ImageResponse } from "next/og";
import {
  ELEMENT_META,
  SHARE_APP_NAME,
  fetchSharedSaju,
  shareHeadline,
} from "@/lib/saju-share";

// 링크 미리보기 이미지 — 서비스 이름 + 대표 한 줄. 열람으로 기록하지 않는다.
export const alt = `${SHARE_APP_NAME} — 공유된 별 이야기`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ code: string }>;
}

export default async function SharedSajuOpenGraphImage({ params }: Params) {
  const { code } = await params;
  const shared = await fetchSharedSaju(code, { record: false });
  const color = shared ? ELEMENT_META[shared.summary.element].color : "#6B6F7A";
  const headline = shared ? shareHeadline(shared.summary) : "더 이상 볼 수 없는 공유입니다";
  const sub = shared
    ? `${ELEMENT_META[shared.summary.element].planet}에서 온 사람`
    : "앱에서 나의 별 이야기를 확인해 보세요";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBF8F1",
          color: "#1F2530",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 150,
            height: 150,
            borderRadius: 9999,
            border: `6px solid ${color}`,
            background: `${color}55`,
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 10,
            color: "#6B6F7A",
          }}
        >
          {SHARE_APP_NAME}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 62,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.25,
          }}
        >
          {headline}
        </div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 32, color }}>{sub}</div>
      </div>
    ),
    size,
  );
}
