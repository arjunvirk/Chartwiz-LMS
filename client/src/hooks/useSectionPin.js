import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Pins a section in place while the next section in the DOM
 * scrolls up and visually "rises" over it.
 *
 * Usage:
 *   const ref = useSectionPin();
 *   <section ref={ref}>...</section>
 *
 * The section immediately after this one in the DOM should have
 * a higher z-index (e.g. `relative z-10`) so it renders on top
 * as it scrolls over the pinned section.
 *
 * Skipped on touch devices and prefers-reduced-motion — pinning
 * reads as "stuck scrolling" on mobile rather than cinematic, and
 * fights native touch scroll physics.
 */
export function useSectionPin({ pinDuration = "+=100%" } = {}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouch) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: pinDuration,
        pin: true,
        pinSpacing: false,
      });
    }, el);

    return () => ctx.revert();
  }, [pinDuration]);

  return sectionRef;
}
