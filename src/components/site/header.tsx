"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "#about", label: "소개" },
  { href: "#team", label: "팀" },
  { href: "#portfolio", label: "포트폴리오" },
  { href: "#saju", label: "사주" },
  { href: "#contact", label: "문의" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          href="#top"
          aria-label="진주 정보통신개발 홈"
          className="group flex items-center gap-2.5"
        >
          <span
            aria-hidden="true"
            className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-primary to-accent ring-1 ring-inset ring-white/10 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-base font-bold tracking-tight">Jinju ICT</span>
        </Link>

        <nav aria-label="섹션 네비게이션">
          <ul className="hidden items-center gap-7 sm:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group/nav relative text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-[width] duration-300 ease-out group-hover/nav:w-full"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          className="hidden rounded-lg border border-border/60 bg-card/40 px-3.5 py-1.5 text-sm font-medium text-foreground/90 transition-colors hover:border-primary hover:text-foreground sm:inline-flex"
        >
          문의하기
        </a>
      </div>
    </header>
  );
}
