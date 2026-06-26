import * as React from "react";

/**
 * 법적 문서(개인정보처리방침 / 이용약관 등) 공통 셸 + 타이포 헬퍼.
 *
 * 여러 앱의 법적 문서가 `/<앱>/privacy`, `/<앱>/terms` 형태로 누적되므로
 * 문서 골격을 한 곳에서 관리한다. 정적 server component — 사이트의 정성 효과
 * (scroll-fade / 마이크로 인터랙션 / ambient gradient)는 일절 적용하지 않는다.
 *
 * 최상위 `.legal-doc` 마커는 globals.css 의 `html:has(.legal-doc)` 규칙과 맞물려
 * 우측 스크롤바를 숨기고 smooth-scroll 을 끈다(다른 페이지 영향 없음).
 */
export function LegalDoc({
  title,
  intro,
  announcedDate,
  effectiveDate,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  announcedDate: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <div className="legal-doc">
      <article className="mx-auto max-w-3xl px-6 py-14 sm:px-8 sm:py-20">
        <header className="border-b-2 border-border pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {intro ? (
            <div className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
              {intro}
            </div>
          ) : null}
        </header>

        <div className="mt-10">{children}</div>

        <footer className="mt-12 border-t-2 border-border pt-6 text-sm leading-7 text-muted-foreground">
          <p>공고일자: {announcedDate}</p>
          <p>시행일자: {effectiveDate}</p>
        </footer>
      </article>
    </div>
  );
}

export function LegalArticle({
  no,
  title,
  children,
}: {
  no: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-base font-bold text-foreground sm:text-lg">
        제{no}조 ({title})
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-foreground/90 sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

export function LegalTh({ children }: { children: React.ReactNode }) {
  return (
    <th className="border border-border bg-muted px-3 py-2 text-left align-top font-semibold text-foreground">
      {children}
    </th>
  );
}

export function LegalTd({ children }: { children: React.ReactNode }) {
  return (
    <td className="border border-border px-3 py-2 align-top">{children}</td>
  );
}
