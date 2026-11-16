import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/legal-doc";
import { SITE_URL } from "@/lib/site";

/**
 * 운명관측소 — 계정 및 데이터 삭제 요청 안내.
 *
 * Google Play Console '데이터 보안 > 계정 삭제' 에 등록할 웹 URL: {SITE_URL}/paljaja/delete-account
 * (경로는 /paljaja/privacy 와 같은 /paljaja 네임스페이스 — 앱 이름이 바뀌어도 URL 유지)
 *
 * 처리 방식: 이메일 요청 → 대표님이 확인 후 수동 삭제 (2026-11-15 대표님 결정).
 * 백엔드 users 행 삭제 시 FK ON DELETE CASCADE 로 연결 데이터 전체가 함께 삭제된다.
 */

const CONTACT_EMAIL = "teobaek830@gmail.com";
const MAIL_SUBJECT = "[운명관측소] 계정 삭제 요청";
const MAIL_BODY = [
  "운명관측소 계정 삭제를 요청합니다.",
  "",
  "- 로그인한 Google 계정 이메일: ",
  "- 요청 내용: 계정 및 전체 데이터 삭제 (일부 데이터만 삭제를 원하시면 적어 주세요)",
].join("\n");
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  MAIL_SUBJECT,
)}&body=${encodeURIComponent(MAIL_BODY)}`;

export const metadata: Metadata = {
  title: "운명관측소 계정 삭제 요청",
  description: "운명관측소 계정 및 데이터 삭제 요청 방법 — 진주 정보통신",
  alternates: { canonical: `${SITE_URL}/paljaja/delete-account` },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-base font-bold text-foreground sm:text-lg">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-foreground/90 sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

export default function PaljajaDeleteAccountPage() {
  return (
    <LegalDoc
      title="운명관측소 계정 삭제 요청"
      intro={
        <p>
          진주 정보통신(jinju-ict)이 제공하는 운명관측소 앱의 계정과 관련 데이터 삭제를
          요청하는 방법을 안내합니다. 앱을 설치하지 않은 상태에서도 아래 방법으로 요청할
          수 있습니다.
        </p>
      }
    >
      <Section title="1. 삭제 요청 방법">
        <ol className="list-decimal space-y-1 pl-5 text-foreground/80">
          <li>
            아래 이메일 주소로 계정 삭제 요청 메일을 보내 주세요.
            <div className="mt-2 rounded-sm border border-border bg-muted/40 px-4 py-3">
              <a
                href={MAILTO}
                className="font-semibold text-foreground underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-1 text-muted-foreground">제목: {MAIL_SUBJECT}</p>
            </div>
          </li>
          <li>
            본문에 운명관측소에 <strong>로그인한 Google 계정 이메일</strong>을 적어 주세요.
            본인 확인을 위해 가급적 해당 Google 계정 이메일로 보내 주시기 바랍니다.
          </li>
          <li>요청을 확인한 뒤 지체 없이 삭제하고, 처리 결과를 이메일로 알려 드립니다.</li>
        </ol>
      </Section>

      <Section title="2. 삭제되는 데이터">
        <p>계정이 삭제되면 해당 계정에 연결된 아래 데이터가 모두 함께 삭제됩니다.</p>
        <ul className="list-disc space-y-1 pl-5 text-foreground/80">
          <li>회원 정보 (Google 계정 식별자, 이메일 주소, 이름)</li>
          <li>사주 정보 (생년월일, 출생시간, 성별, 출생 도시, 직업, 연애·결혼 상태 등)</li>
          <li>궁합을 위해 입력한 상대방 정보</li>
          <li>상담 기록 (질문 및 AI 답변)</li>
          <li>평생 사주·운세·궁합 풀이 결과</li>
          <li>앱 이용 기록</li>
        </ul>
        <p>
          계정은 유지하면서 상담 기록 등 일부 데이터만 삭제하고 싶으신 경우에도 같은
          방법으로 요청하실 수 있습니다.
        </p>
      </Section>

      <Section title="3. 보관될 수 있는 데이터">
        <ul className="list-disc space-y-1 pl-5 text-foreground/80">
          <li>
            서버 접속 기록 등 자동 생성 로그는 수집일로부터 30일이 지나면 자동
            삭제됩니다.
          </li>
          <li>
            클라우드 서비스 제공업체의 시스템 백업 등에 일부 정보가 남아 있는 경우, 해당
            정보는 제공업체의 정책에 따라 삭제됩니다.
          </li>
          <li>관계 법령에 보존 의무가 있는 정보는 해당 기간 동안 보관 후 삭제됩니다.</li>
        </ul>
      </Section>

      <Section title="4. 참고">
        <ul className="list-disc space-y-1 pl-5 text-foreground/80">
          <li>
            앱에서 로그아웃하거나 앱을 삭제하는 것만으로는 서버에 저장된 데이터가 삭제되지
            않습니다.
          </li>
          <li>삭제된 데이터는 복구할 수 없습니다.</li>
          <li>
            개인정보 처리에 관한 자세한 내용은{" "}
            <a
              href="/paljaja/privacy"
              className="underline underline-offset-2 hover:text-foreground"
            >
              운명관측소 개인정보처리방침
            </a>
            을 확인해 주세요.
          </li>
        </ul>
      </Section>
    </LegalDoc>
  );
}
