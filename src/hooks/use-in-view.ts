"use client";

import * as React from "react";

/**
 * 한 번 viewport 에 들어오면 true 로 유지 (re-enter 시 재계산 X).
 * 정성 톤의 fade-in-on-scroll 트리거용.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
): { ref: React.RefObject<T | null>; inView: boolean } {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // SSR / 매우 오래된 환경 fallback — 즉시 노출 (콘텐츠 누락 방지)
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fallback for unsupported environments
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
        ...options,
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}
