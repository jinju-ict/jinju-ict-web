import type { Metadata } from "next";
import {
  LegalArticle,
  LegalDoc,
  LegalTd,
  LegalTh,
} from "@/components/legal/legal-doc";
import { SITE_URL } from "@/lib/site";

/**
 * 운명관측소 — 개인정보처리방침.
 *
 * 구글 플레이 콘솔 등록 URL: {SITE_URL}/paljaja/privacy
 * ⚠️ 경로(/paljaja/privacy)는 Play Console 에 등록되어 있으므로 변경 금지.
 *    (앱 이름이 팔자상담소 → 운명관측소 로 바뀌었어도 URL 은 그대로 유지)
 *
 * 본문 근거: saju 저장소(dev, mobile v1.0.1+7) 실제 구현 기준 — 2026-11-15 확인.
 *   - 인증: Google 로그인(google_sign_in) → 백엔드가 Google ID 토큰 검증 후 자체 토큰 발급. Firebase 미사용.
 *   - 서버: Google Cloud Run(서울 리전) / DB: Supabase Postgres(AWS 서울 리전).
 *   - AI: OpenAI Responses API(store=false). 생년월일·출생시간·성별 원문과 이메일·이름은 전송하지 않음.
 *   - 인앱결제·광고·광고 식별자·Firebase Analytics·외부 오류 수집 SDK: 현재 코드에 없음.
 *   - 앱 내 회원탈퇴 기능 없음 → 이메일 요청 + /paljaja/delete-account 안내 페이지.
 * 서비스 구현이 바뀌면(결제·광고·분석 SDK 도입, 서버/DB 이전 등) 이 문서를 함께 개정할 것.
 */

// 공고일·시행일: 2026-11-15 (대표님 확정 — 실제 처리 방식과 즉시 일치시키기 위해 당일 시행).
const ANNOUNCED_DATE = "2026년 11월 15일";
const EFFECTIVE_DATE = "2026년 11월 15일";

export const metadata: Metadata = {
  title: "운명관측소 개인정보처리방침",
  description: "운명관측소 서비스 개인정보처리방침 — 진주 정보통신",
  alternates: { canonical: `${SITE_URL}/paljaja/privacy` },
};

export default function PaljajaPrivacyPage() {
  return (
    <LegalDoc
      title="운명관측소 개인정보처리방침"
      announcedDate={ANNOUNCED_DATE}
      effectiveDate={EFFECTIVE_DATE}
      intro={
        <>
          <p>
            진주 정보통신(jinju-ict)(이하 “개발자”)는 「개인정보 보호법」 등 관련
            법령을 준수하며, 이용자의 개인정보를 보호하고 권익을 보호하기 위하여
            다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>
          <p>
            본 개인정보처리방침은 운명관측소 서비스(이하 “서비스”)에 적용됩니다.
            서비스의 이전 명칭은 ‘팔자상담소’입니다.
          </p>
        </>
      }
    >
      <LegalArticle no={1} title="개인정보의 처리 목적">
        <p>개발자는 다음의 목적을 위하여 필요한 최소한의 개인정보를 처리합니다.</p>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-foreground">1. 회원 식별 및 관리</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>Google 계정을 통한 로그인 및 이용자 식별</li>
              <li>로그인 전 이용 내역을 로그인한 계정으로 이어 주기</li>
              <li>부정 이용 방지 및 기능별 이용 횟수 제한 관리</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">2. 서비스 제공</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>사주 원국 계산 및 평생 사주 풀이</li>
              <li>연·월·일 운세 풀이</li>
              <li>두 사람의 궁합 풀이</li>
              <li>AI 기반 상담 제공 및 상담 기록 관리</li>
              <li>생성된 풀이 결과의 저장 및 다시 보기</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">3. 서비스 운영 및 개선</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>기능 이용 현황 통계 분석</li>
              <li>오류 확인 및 서비스 안정성 개선</li>
              <li>풀이 품질 개선</li>
            </ul>
          </div>
        </div>
      </LegalArticle>

      <LegalArticle no={2} title="처리하는 개인정보의 항목">
        <p>개발자는 다음과 같은 개인정보를 처리합니다.</p>
        <table className="w-full border-collapse text-xs leading-6 sm:text-sm">
          <thead>
            <tr>
              <LegalTh>구분</LegalTh>
              <LegalTh>처리 항목</LegalTh>
              <LegalTh>처리 목적</LegalTh>
            </tr>
          </thead>
          <tbody>
            <tr>
              <LegalTd>회원 정보</LegalTd>
              <LegalTd>
                Google 계정 고유 식별자, 이메일 주소, Google 프로필 이름, 서비스 내부 회원
                식별자
              </LegalTd>
              <LegalTd>로그인 및 회원 식별</LegalTd>
            </tr>
            <tr>
              <LegalTd>임시 이용 정보</LegalTd>
              <LegalTd>로그인 전 앱 이용 시 발급되는 임시 이용자 식별값</LegalTd>
              <LegalTd>로그인 전 이용 내역 보관 및 로그인 계정으로의 연결</LegalTd>
            </tr>
            <tr>
              <LegalTd>사주 정보</LegalTd>
              <LegalTd>
                (필수) 생년월일, 성별, 양력/음력 및 윤달 구분
                <br />
                (선택) 출생시간, 출생 도시, 직업, 연애·결혼 상태
                <br />
                (생성) 위 정보로 계산한 사주 원국(8글자·오행·십신 등)
              </LegalTd>
              <LegalTd>사주 계산 및 맞춤형 풀이·상담 제공</LegalTd>
            </tr>
            <tr>
              <LegalTd>궁합 상대방 정보</LegalTd>
              <LegalTd>
                이용자가 입력한 상대방의 생년월일, 성별, 양력/음력 구분, (선택) 출생시간·
                출생 도시·직업, 두 사람의 관계 유형
              </LegalTd>
              <LegalTd>궁합 풀이 제공</LegalTd>
            </tr>
            <tr>
              <LegalTd>상담 정보</LegalTd>
              <LegalTd>상담 분야, 이용자가 입력한 질문 내용, AI 답변 내용, 상담 일시</LegalTd>
              <LegalTd>상담 제공 및 상담 기록 관리</LegalTd>
            </tr>
            <tr>
              <LegalTd>풀이 결과</LegalTd>
              <LegalTd>
                AI가 생성한 평생 사주·운세·궁합 풀이 결과, 풀이에 대한 이용자 평가(제공 시)
              </LegalTd>
              <LegalTd>풀이 결과 다시 보기 및 풀이 품질 개선</LegalTd>
            </tr>
            <tr>
              <LegalTd>서비스 이용 기록</LegalTd>
              <LegalTd>
                화면 진입, 기능 이용, 오류 발생 등 앱 내 이용 이벤트와 그 발생 일시
              </LegalTd>
              <LegalTd>이용 통계 분석 및 서비스 개선</LegalTd>
            </tr>
            <tr>
              <LegalTd>자동 생성 정보</LegalTd>
              <LegalTd>
                서버 접속 과정에서 생성되는 IP 주소, 접속 일시, 요청 경로, 기기·앱 정보,
                서버 오류 로그
              </LegalTd>
              <LegalTd>서비스 운영, 보안 및 오류 분석</LegalTd>
            </tr>
          </tbody>
        </table>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>
            서비스 이용 기록에는 생년월일·출생 도시 등 사주 정보의 원문을 포함하지
            않습니다.
          </li>
          <li>
            궁합 기능을 이용하는 경우, 이용자는 상대방의 정보를 상대방이 동의한 범위에서
            입력해 주시기 바랍니다.
          </li>
          <li>
            상담 질문란에는 이름, 연락처 등 다른 사람을 식별할 수 있는 정보나 민감한
            정보를 입력하지 않도록 유의해 주시기 바랍니다.
          </li>
          <li>
            현재 서비스는 인앱 결제, 광고, 광고 식별자(ADID) 수집, 외부 분석 도구(Firebase
            Analytics 등)를 이용하지 않습니다. 이를 도입하는 경우 본 방침을 개정하여
            사전에 안내합니다.
          </li>
          <li>
            개발자는 신용카드 번호, 계좌번호 등 금융정보를 수집하거나 저장하지 않습니다.
          </li>
        </ul>
      </LegalArticle>

      <LegalArticle no={3} title="개인정보의 보유 및 이용기간">
        <p>
          개발자는 개인정보를 처리 목적이 달성될 때까지 보유하며, 항목별 보유기간은
          다음과 같습니다.
        </p>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-foreground">
              1. 회원 정보, 사주 정보, 궁합 상대방 정보, 상담 정보, 풀이 결과, 서비스 이용
              기록
            </p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>회원 탈퇴(계정 삭제) 시까지</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">2. 자동 생성 정보(서버 로그)</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>클라우드 서비스의 로그 보관 설정 기간이 지나면 자동 삭제</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">3. 법령상 보존 의무가 있는 정보</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>관계 법령에서 정한 기간 동안 보관</li>
            </ul>
          </div>
        </div>
      </LegalArticle>

      <LegalArticle no={4} title="회원 탈퇴 및 개인정보 삭제 요청">
        <p>
          이용자는 언제든지 회원 탈퇴(계정 및 관련 데이터 삭제)를 요청할 수 있습니다.
          제11조의 문의 이메일로 요청하실 수 있으며, 자세한 방법은{" "}
          <a
            href="/paljaja/delete-account"
            className="underline underline-offset-2 hover:text-foreground"
          >
            계정 삭제 요청 안내
          </a>{" "}
          페이지에서 확인하실 수 있습니다.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-foreground/80">
          <li>
            요청 시 서비스에 로그인한 Google 계정 이메일을 기재해 주시면, 본인 확인 후
            지체 없이 처리합니다.
          </li>
          <li>
            계정이 삭제되면 해당 계정에 연결된 사주 정보, 궁합 상대방 정보, 상담 기록,
            풀이 결과, 서비스 이용 기록이 함께 삭제됩니다.
          </li>
          <li>
            회원 탈퇴 없이 특정 상담 기록 등 일부 정보의 삭제를 원하는 경우에도 같은
            방법으로 요청하실 수 있습니다.
          </li>
          <li>
            데이터베이스 백업본에 남아 있는 정보는 백업 보관 기간이 지나면 순차적으로
            삭제됩니다.
          </li>
          <li>
            앱에서 로그아웃하면 기기에 저장된 로그인 정보가 삭제됩니다. 다만 로그아웃만으로
            서버에 저장된 정보가 삭제되지는 않습니다.
          </li>
        </ul>
      </LegalArticle>

      <LegalArticle no={5} title="개인정보의 제3자 제공 및 처리위탁">
        <p>
          개발자는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 서비스 제공을
          위하여 다음과 같이 개인정보 처리 업무를 외부 업체에 위탁하고 있습니다.
        </p>
        <table className="w-full border-collapse text-xs leading-6 sm:text-sm">
          <thead>
            <tr>
              <LegalTh>수탁자</LegalTh>
              <LegalTh>위탁 업무</LegalTh>
              <LegalTh>처리 항목</LegalTh>
            </tr>
          </thead>
          <tbody>
            <tr>
              <LegalTd>Google LLC</LegalTd>
              <LegalTd>
                Google 계정 로그인 인증, 서버 운영(Google Cloud Run) 및 서버 로그 처리
              </LegalTd>
              <LegalTd>
                Google 계정 인증 정보, 서버 처리 과정의 개인정보, 자동 생성 정보
              </LegalTd>
            </tr>
            <tr>
              <LegalTd>Supabase, Inc.</LegalTd>
              <LegalTd>데이터베이스 운영 및 데이터 저장</LegalTd>
              <LegalTd>서비스 데이터베이스에 저장되는 개인정보(제2조의 항목)</LegalTd>
            </tr>
            <tr>
              <LegalTd>OpenAI, LLC</LegalTd>
              <LegalTd>AI 풀이 및 상담 답변 생성</LegalTd>
              <LegalTd>제6조에 기재된 항목</LegalTd>
            </tr>
          </tbody>
        </table>
      </LegalArticle>

      <LegalArticle no={6} title="개인정보의 국외 이전">
        <p>
          서비스의 서버는 Google Cloud 서울 리전에서, 데이터베이스는 Supabase(AWS 서울
          리전)에서 운영됩니다. 다만 AI 풀이·상담 기능 제공을 위하여 다음 정보가 국외로
          전송되며, 클라우드 서비스의 인증·운영 과정에서 정보가 국외에서 처리될 수
          있습니다.
        </p>
        <table className="w-full border-collapse text-xs leading-6 sm:text-sm">
          <thead>
            <tr>
              <LegalTh>이전받는 자</LegalTh>
              <LegalTh>이전 국가</LegalTh>
              <LegalTh>이전 항목</LegalTh>
              <LegalTh>이전 목적 · 시기 · 방법</LegalTh>
            </tr>
          </thead>
          <tbody>
            <tr>
              <LegalTd>OpenAI, LLC</LegalTd>
              <LegalTd>미국</LegalTd>
              <LegalTd>
                사주 원국 계산값(8글자·일간·오행·십신·납음 등), 운세 계산값, (입력 시)
                직업·연애·결혼 상태, 궁합 관계 유형 및 궁합 계산값, 상담 분야, 상담 질문
                내용 및 최근 대화 내용
              </LegalTd>
              <LegalTd>
                AI 풀이·상담 답변 생성 / 해당 기능 이용 시마다 / 암호화된 네트워크(HTTPS)를
                통한 API 전송
              </LegalTd>
            </tr>
            <tr>
              <LegalTd>Google LLC</LegalTd>
              <LegalTd>미국 등 Google 데이터센터 소재 국가</LegalTd>
              <LegalTd>Google 계정 인증 정보, 자동 생성 정보(서버 로그)</LegalTd>
              <LegalTd>
                로그인 인증 및 서버 운영 / 서비스 이용 시마다 / 암호화된 네트워크(HTTPS)를
                통한 전송
              </LegalTd>
            </tr>
          </tbody>
        </table>
        <ul className="list-disc space-y-1 pl-5 text-foreground/80">
          <li>
            OpenAI로는 생년월일·출생시간·성별의 원문, 이메일 주소, 이름 등 이용자를 직접
            식별할 수 있는 정보를 전송하지 않습니다. 다만 상담 질문에 이용자가 직접 입력한
            내용은 그대로 전송됩니다.
          </li>
          <li>
            개발자는 OpenAI API 호출 시 응답 저장 기능을 사용하지 않도록 설정하고 있으며,
            전송된 정보는 OpenAI의 API 데이터 처리 정책에 따라 처리·보관될 수 있습니다.
          </li>
          <li>
            국외 이전을 원하지 않는 경우 AI 풀이·상담 기능 이용을 중단하거나 회원 탈퇴를
            요청할 수 있습니다. 이 경우 AI 기반 풀이·상담 기능을 이용할 수 없습니다.
          </li>
        </ul>
      </LegalArticle>

      <LegalArticle no={7} title="개인정보의 파기 절차 및 방법">
        <p>
          개발자는 개인정보의 보유기간이 경과하거나 처리 목적이 달성된 경우 지체 없이
          개인정보를 파기합니다. 전자적 파일 형태의 개인정보는 복구 또는 재생되지
          않도록 안전한 기술적 방법을 이용하여 삭제합니다.
        </p>
      </LegalArticle>

      <LegalArticle no={8} title="이용자의 권리와 행사 방법">
        <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
        <ul className="list-disc space-y-1 pl-5 text-foreground/80">
          <li>개인정보 열람</li>
          <li>개인정보 정정</li>
          <li>개인정보 삭제</li>
          <li>개인정보 처리정지 요청</li>
          <li>회원 탈퇴</li>
        </ul>
        <p>
          권리 행사는 제11조의 문의처를 통해 요청할 수 있으며, 개발자는 관련 법령에
          따라 지체 없이 처리합니다.
        </p>
      </LegalArticle>

      <LegalArticle no={9} title="개인정보의 안전성 확보조치">
        <p>개발자는 개인정보 보호를 위하여 다음과 같은 조치를 시행합니다.</p>
        <ul className="list-disc space-y-1 pl-5 text-foreground/80">
          <li>앱과 서버 간 HTTPS 기반 암호화 통신</li>
          <li>Google 로그인 토큰의 서버 측 검증 및 자체 인증 토큰 발급</li>
          <li>기기 내 로그인 정보의 보안 저장소 보관</li>
          <li>데이터베이스 및 서버 접근 권한 최소화</li>
          <li>API 키 등 인증 정보의 서버 측 분리 보관</li>
        </ul>
      </LegalArticle>

      <LegalArticle no={10} title="아동의 개인정보">
        <p>
          본 서비스는 만 14세 미만 아동을 대상으로 하지 않습니다. 만 14세 미만 아동의
          개인정보가 수집된 사실이 확인되는 경우 해당 정보는 지체 없이 삭제합니다.
        </p>
      </LegalArticle>

      <LegalArticle no={11} title="개인정보 보호책임자">
        <p>
          개발자는 개인정보 처리에 관한 업무를 총괄하기 위하여 아래와 같이 개인정보
          보호책임자를 지정합니다.
        </p>
        <div className="rounded-sm border border-border bg-muted/40 px-4 py-3">
          <p className="font-semibold text-foreground">개발자</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
            <li>상호 : 진주 정보통신 (jinju-ict)</li>
            <li>
              이메일 :{" "}
              <a
                href="mailto:teobaek830@gmail.com"
                className="underline underline-offset-2 hover:text-foreground"
              >
                teobaek830@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <p>
          개인정보와 관련한 문의, 회원 탈퇴·삭제 요청, 불만 및 피해구제는 위 이메일을
          통해 접수하실 수 있습니다.
        </p>
      </LegalArticle>

      <LegalArticle no={12} title="개인정보처리방침의 변경">
        <p>
          본 개인정보처리방침은 관련 법령 또는 서비스의 변경사항을 반영하기 위하여
          수정될 수 있습니다. 중요한 변경사항이 있는 경우 서비스 내 공지사항 또는
          개인정보처리방침 페이지를 통하여 사전에 안내합니다.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-foreground/80">
          <li>
            이전 개인정보처리방침: 2026년 6월 26일 공고·시행 (서비스명 ‘팔자상담소’)
          </li>
        </ul>
      </LegalArticle>
    </LegalDoc>
  );
}
