"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

interface InViewFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** translateY in px before reveal */
  distance?: number;
  /** ms */
  duration?: number;
}

export function InViewFade({
  children,
  delay = 0,
  className,
  distance = 20,
  duration = 700,
}: InViewFadeProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("motion-safe:will-change-transform", className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : `translate3d(0,${distance}px,0)`,
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
