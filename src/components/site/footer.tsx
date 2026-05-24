import * as React from "react";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t-2 border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block h-7 w-7 rounded-sm border border-border bg-foreground"
            />
            <span className="text-base font-bold tracking-tight text-foreground">진주 정보통신</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            AI 정예 개발사. 자체 서비스를 주력으로, 협업·외주도 폭넓게.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:text-right">
          <a
            href="mailto:teo.baek@outlook.com"
            className="group/email relative inline-block transition-colors duration-150 hover:text-foreground"
          >
            teo.baek@outlook.com
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-[width] duration-150 ease-out group-hover/email:w-full"
            />
          </a>
          <p>© {year} 진주 정보통신. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
