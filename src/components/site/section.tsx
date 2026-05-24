import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  containerClassName?: string;
  bare?: boolean;
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
  children,
  ...props
}: SectionProps) {
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
        {(eyebrow || title || lead) && (
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
        )}
        {children}
      </div>
    </section>
  );
}
