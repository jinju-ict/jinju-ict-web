import type { Metadata } from "next";
import {
  LegalArticle,
  LegalDoc,
  LegalTd,
  LegalTh,
} from "@/components/legal/legal-doc";
import { SITE_URL } from "@/lib/site";

/**
 * 팔자상담소 — 개인정보처리방침.
 * 구글 플레이 콘솔 등록 URL: {SITE_URL}/paljaja/privacy
 */
export const metadata: Metadata = {
  title: "팔자상담소 개인정보처리방침",
  description: "팔자상담소 서비스 개인정보처리방침 — 진주 정보통신",
  alternates: { canonical: `${SITE_URL}/paljaja/privacy` },
};

export default function PaljajaPrivacyPage() {
  return (
    <LegalDoc
      title="팔자상담소 개인정보처리방침"
      announcedDate="2026년 6월 26일"
      effectiveDate="2026년 6월 26일"
      intro={
        <>
          <p>
            진주 정보통신(jinju-ict)(이하 “개발자”)는 「개인정보 보호법」 등 관련
            법령을 준수하며, 이용자의 개인정보를 보호하고 권익을 보호하기 위하여
            다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>
          <p>본 개인정보처리방침은 팔자상담소 서비스(이하 “서비스”)에 적용됩니다.</p>
        </>
      }
    >
      <LegalArticle no={1} title="개인정보의 처리 목적">
        <p>개발자는 다음의 목적을 위하여 필요한 최소한의 개인정보를 처리합니다.</p>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-foreground">1. 회원가입 및 이용자 관리</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>Google 계정을 통한 회원 인증</li>
              <li>이용자 식별</li>
              <li>부정 이용 방지</li>
              <li>회원 자격 유지 및 관리</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">2. 서비스 제공</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>맞춤형 사주 분석</li>
              <li>AI 기반 팔자 상담 서비스 제공</li>
              <li>상담 기록 관리</li>
              <li>서비스 품질 향상</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">3. 인앱 결제</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>유료 재화(별가루) 충전</li>
              <li>구매 내역 확인</li>
              <li>결제 검증</li>
              <li>잔액 관리 및 복구</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">4. 서비스 운영 및 광고 제공</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>서비스 이용 통계 분석</li>
              <li>오류 분석 및 개선</li>
              <li>광고 제공</li>
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
              <LegalTd>Google UID(Firebase UID 포함), 이메일 주소, 프로필 이름</LegalTd>
              <LegalTd>회원 식별 및 로그인</LegalTd>
            </tr>
            <tr>
              <LegalTd>사주 정보</LegalTd>
              <LegalTd>성별, 생년월일, 출생시간, 음력/양력 구분</LegalTd>
              <LegalTd>맞춤형 사주 분석 및 상담 서비스를 제공하기 위함</LegalTd>
            </tr>
            <tr>
              <LegalTd>상담 정보</LegalTd>
              <LegalTd>상담 질문 내용, AI 응답 내용</LegalTd>
              <LegalTd>상담 서비스 제공 및 상담 기록 관리</LegalTd>
            </tr>
            <tr>
              <LegalTd>결제 정보</LegalTd>
              <LegalTd>Google Play 구매 토큰, 구매 내역</LegalTd>
              <LegalTd>인앱 결제 검증 및 별가루 충전</LegalTd>
            </tr>
            <tr>
              <LegalTd>자동 수집 정보</LegalTd>
              <LegalTd>
                Android 광고 식별자(ADID), 서비스 이용 기록, 앱 오류 로그, Firebase
                Analytics 이벤트
              </LegalTd>
              <LegalTd>서비스 운영, 오류 분석 및 광고 제공</LegalTd>
            </tr>
          </tbody>
        </table>
        <p className="text-muted-foreground">
          ※ 개발자는 신용카드 번호, 계좌번호 등 금융정보를 직접 수집하거나 저장하지
          않습니다.
        </p>
      </LegalArticle>

      <LegalArticle no={3} title="개인정보의 보유 및 이용기간">
        <p>개발자는 개인정보를 처리 목적이 달성될 때까지 보유합니다.</p>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-foreground">1. 회원정보</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>회원 탈퇴 시까지</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">2. 상담 정보</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>회원 탈퇴 시 또는 이용자의 삭제 요청 시까지</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">3. 결제 정보</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>관계 법령에 따른 보존기간까지</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">4. 서비스 이용 기록</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-foreground/80">
              <li>서비스 운영 및 법령상 보존 의무가 있는 기간</li>
            </ul>
          </div>
        </div>
        <p>
          이용자는 언제든지 회원 탈퇴를 통해 개인정보 삭제를 요청할 수 있으며, 법령상
          보관 의무가 있는 정보를 제외하고 지체 없이 삭제합니다.
        </p>
      </LegalArticle>

      <LegalArticle no={4} title="개인정보의 제3자 제공 및 처리위탁">
        <p>개발자는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.</p>
        <p>다만 서비스 제공을 위하여 다음과 같은 외부 서비스를 이용합니다.</p>
        <table className="w-full border-collapse text-xs leading-6 sm:text-sm">
          <thead>
            <tr>
              <LegalTh>제공받는 자</LegalTh>
              <LegalTh>제공 항목</LegalTh>
              <LegalTh>제공 목적</LegalTh>
            </tr>
          </thead>
          <tbody>
            <tr>
              <LegalTd>Google LLC</LegalTd>
              <LegalTd>Google 계정 정보, 구매 토큰, 광고 식별자, 서비스 이용 정보</LegalTd>
              <LegalTd>로그인, 인앱결제, 광고 제공, Analytics</LegalTd>
            </tr>
            <tr>
              <LegalTd>OpenAI, LLC</LegalTd>
              <LegalTd>생년월일, 출생시간, 성별, 상담 내용</LegalTd>
              <LegalTd>AI 상담 답변 생성</LegalTd>
            </tr>
            <tr>
              <LegalTd>Google Cloud Platform (GCP)</LegalTd>
              <LegalTd>서비스 운영 과정에서 저장되는 개인정보</LegalTd>
              <LegalTd>클라우드 서버 운영 및 데이터 저장</LegalTd>
            </tr>
          </tbody>
        </table>
        <p>
          AI 상담 서비스 이용 시 사용자가 입력한 사주 정보와 상담 내용은 AI 상담 답변
          생성을 위하여 OpenAI API로 전송됩니다. 이메일 등 이용자를 직접 식별할 수
          있는 정보는 함께 전송하지 않으며, AI 서비스 제공업체의 개인정보 처리 정책에
          따라 일시적으로 처리될 수 있습니다.
        </p>
        <p>
          개발자는 Firebase Authentication을 통한 회원 인증, Firebase Analytics를 통한
          서비스 이용 분석 등 Firebase 서비스를 이용하며, 서비스 운영을 위하여 필요한
          범위 내에서 Firebase의 추가 기능을 사용할 수 있습니다.
        </p>
      </LegalArticle>

      <LegalArticle no={5} title="개인정보의 국외 이전">
        <p>
          서비스는 원활한 운영을 위하여 국외의 클라우드 서비스 및 AI 서비스를 이용할
          수 있습니다.
        </p>
        <table className="w-full border-collapse text-xs leading-6 sm:text-sm">
          <thead>
            <tr>
              <LegalTh>이전받는 자</LegalTh>
              <LegalTh>이전 국가</LegalTh>
              <LegalTh>이전 항목</LegalTh>
              <LegalTh>이전 목적</LegalTh>
            </tr>
          </thead>
          <tbody>
            <tr>
              <LegalTd>Google LLC</LegalTd>
              <LegalTd>미국</LegalTd>
              <LegalTd>로그인 정보, 광고 식별자, 결제 정보, 서비스 이용 정보</LegalTd>
              <LegalTd>로그인, 광고 제공, Analytics, 인앱결제</LegalTd>
            </tr>
            <tr>
              <LegalTd>OpenAI, LLC</LegalTd>
              <LegalTd>미국</LegalTd>
              <LegalTd>생년월일, 출생시간, 성별, 상담 내용</LegalTd>
              <LegalTd>AI 상담 서비스 제공</LegalTd>
            </tr>
            <tr>
              <LegalTd>Google Cloud Platform (GCP)</LegalTd>
              <LegalTd>미국 등 글로벌 리전</LegalTd>
              <LegalTd>서비스 운영 과정에서 저장되는 개인정보</LegalTd>
              <LegalTd>클라우드 서버 운영 및 데이터 저장</LegalTd>
            </tr>
          </tbody>
        </table>
        <p>
          이용자의 개인정보는 서비스 제공을 위하여 해외 클라우드 서비스 및 AI 서비스
          제공업체를 통하여 처리될 수 있으며, 해당 사업자의 개인정보 처리 정책에 따라
          안전하게 관리됩니다.
        </p>
      </LegalArticle>

      <LegalArticle no={6} title="개인정보의 파기">
        <p>
          개발자는 개인정보의 보유기간이 경과하거나 처리 목적이 달성된 경우 지체 없이
          개인정보를 파기합니다. 전자적 파일 형태의 개인정보는 복구 또는 재생되지
          않도록 안전한 기술적 방법을 이용하여 삭제합니다.
        </p>
      </LegalArticle>

      <LegalArticle no={7} title="이용자의 권리">
        <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
        <ul className="list-disc space-y-1 pl-5 text-foreground/80">
          <li>개인정보 열람</li>
          <li>개인정보 정정</li>
          <li>개인정보 삭제</li>
          <li>개인정보 처리정지 요청</li>
          <li>회원 탈퇴</li>
        </ul>
        <p>
          권리 행사는 아래 문의처를 통해 요청할 수 있으며, 개발자는 관련 법령에 따라
          지체 없이 처리합니다.
        </p>
      </LegalArticle>

      <LegalArticle no={8} title="개인정보의 안전성 확보조치">
        <p>개발자는 개인정보 보호를 위하여 다음과 같은 조치를 시행합니다.</p>
        <ul className="list-disc space-y-1 pl-5 text-foreground/80">
          <li>HTTPS 기반 암호화 통신</li>
          <li>Firebase Authentication을 통한 안전한 인증</li>
          <li>Google Cloud Platform 기반 보안 인프라 운영</li>
          <li>접근 권한 최소화</li>
          <li>개인정보 접근 통제 및 관리</li>
          <li>서비스 오류 및 보안 모니터링</li>
        </ul>
      </LegalArticle>

      <LegalArticle no={9} title="아동의 개인정보">
        <p>
          본 서비스는 만 14세 미만 아동을 대상으로 하지 않습니다. 만 14세 미만 아동의
          개인정보가 수집된 사실이 확인되는 경우 해당 정보는 지체 없이 삭제합니다.
        </p>
      </LegalArticle>

      <LegalArticle no={10} title="개인정보 보호책임자">
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
          개인정보와 관련한 문의, 불만 및 피해구제는 위 이메일을 통해 접수하실 수
          있습니다.
        </p>
      </LegalArticle>

      <LegalArticle no={11} title="개인정보처리방침의 변경">
        <p>
          본 개인정보처리방침은 관련 법령 또는 서비스의 변경사항을 반영하기 위하여
          수정될 수 있습니다. 중요한 변경사항이 있는 경우 서비스 내 공지사항 또는
          개인정보처리방침 페이지를 통하여 사전에 안내합니다.
        </p>
      </LegalArticle>
    </LegalDoc>
  );
}
