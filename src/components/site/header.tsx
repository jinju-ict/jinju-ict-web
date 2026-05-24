"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/#about", label: "소개" },
  { href: "/#process", label: "방식" },
  { href: "/#team", label: "팀" },
  { href: "/#portfolio", label: "솔루션" },
  { href: "/#saju", label: "사주" },
  { href: "/#careers", label: "채용" },
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
        "fixed inset-x-0 top-0 z-50 transition-colors duration-150",
        scrolled
          ? "border-b-2 border-border bg-background"
          : "border-b-2 border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          aria-label="진주 정보통신 홈"
          className="group flex items-center gap-2.5"
        >
          <span
            aria-hidden="true"
            className="inline-block h-8 w-8 rounded-sm border border-border bg-foreground"
          />
          <span className="text-base font-bold tracking-tight text-foreground">진주 정보통신</span>
        </Link>

        <nav aria-label="섹션 네비게이션">
          <ul className="hidden items-center gap-7 sm:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group/nav relative text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 h-px w-0 bg-foreground transition-[width] duration-150 ease-out group-hover/nav:w-full"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/#contact"
          className="hidden rounded-sm border-2 border-foreground bg-background px-3.5 py-1.5 text-sm font-semibold text-foreground transition-colors duration-150 hover:bg-foreground hover:text-background sm:inline-flex"
        >
          문의하기
        </Link>
      </div>
    </header>
  );
}
