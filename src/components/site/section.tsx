import * as React from "react";
import { cn } from "@/lib/utils";
import { InViewFade } from "@/components/site/in-view-fade";

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  containerClassName?: string;
  bare?: boolean;
  /** Header / children 을 viewport 진입 시 페이드인 (default true). Hero 등 자체 mount 애니메이션 있는 곳은 false. */
  fadeOnScroll?: boolean;
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  containerClassName,
  bare = false,
  fadeOnScroll = true,
  children,
  ...props
}: SectionProps) {
  const header = (eyebrow || title || lead) && (
    <header
      className={cn(
        "mb-12 sm:mb-16",
        align === "center" && "mx-auto max-w-3xl text-center",
      )}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      )}
      {lead && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {lead}
        </p>
      )}
    </header>
  );

  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        !bare && "py-20 sm:py-28 lg:py-36",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-6 sm:px-8",
          containerClassName,
        )}
      >
        {fadeOnScroll ? (
          <>
            {header && <InViewFade>{header}</InViewFade>}
            <InViewFade delay={header ? 120 : 0}>{children}</InViewFade>
          </>
        ) : (
          <>
            {header}
            {children}
          </>
        )}
      </div>
    </section>
  );
}
