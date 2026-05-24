import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

// Vercel Fluid Compute / Node.js runtime
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------- Rate limit (in-memory, per-instance) ----------
 * Fluid Compute 가 instance 를 재사용해서 burst 차단에 충분.
 * cold start 후엔 reset 되지만 그 자체로도 봇 비용 부담 효과.
 * 분당 5건 / IP. 외부 상태 의존 X.
 */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const RATE_BUCKETS = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimit(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  // 가벼운 prune — bucket 100개 초과 시에만 cleanup (메모리 leak 방지)
  if (RATE_BUCKETS.size > 100) {
    for (const [k, v] of RATE_BUCKETS) {
      if (v.resetAt < now) RATE_BUCKETS.delete(k);
    }
  }
  const bucket = RATE_BUCKETS.get(ip);
  if (!bucket || now > bucket.resetAt) {
    RATE_BUCKETS.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true };
  }
  if (bucket.count >= RATE_MAX) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { ok: true };
}

export async function POST(req: Request) {
  // Rate limit (분당 5건/IP)
  const ip = getClientIp(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      {
        error: `요청이 너무 잦습니다. ${rl.retryAfter}초 후 다시 시도해 주세요.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfter) },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "요청 본문이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    // 봇이 honeypot 채우면 200 으로 위장 (감지 어렵게)
    if (firstError?.message === "BOT_DETECTED") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: firstError?.message ?? "입력 값이 올바르지 않습니다." },
      { status: 422 },
    );
  }

  const { name, company, contact, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_INBOX_TO ?? "teo.baek@outlook.com";
  const from = process.env.CONTACT_INBOX_FROM ?? "onboarding@resend.dev";

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY missing — message logged but NOT sent",
      { name, company, contact, message: message.slice(0, 80) + "..." },
    );
    return NextResponse.json(
      {
        error: "메일 서비스가 아직 설정되지 않았습니다. 잠시 후 다시 시도해 주세요.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const isEmail = EMAIL_RE.test(contact);

  const textBody = [
    `이름: ${name}`,
    company ? `회사: ${company}` : null,
    `연락처: ${contact}${isEmail ? "" : " (전화 또는 기타)"}`,
    "",
    "─ 문의 내용 ─",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const result = await resend.emails.send({
      from: `진주 정보통신 협업 문의 <${from}>`,
      to: [to],
      ...(isEmail ? { replyTo: contact } : {}),
      subject: `[진주 정보통신 문의] ${name}${company ? ` · ${company}` : ""}`,
      text: textBody,
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error);
      return NextResponse.json(
        { error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unhandled:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
