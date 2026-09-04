import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Pins the Hero only after the user actually scrolls to it.
 *
 * Skipped on touch devices and reduced-motion preferences.
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

        // IMPORTANT:
        // Do not start the pin until the Hero reaches
        // the top of the viewport.
        start: "top top",

        end: pinDuration,

        pin: true,

        // Keep your cinematic overlap effect.
        pinSpacing: false,

        invalidateOnRefresh: true,
      });
    }, el);

    return () => ctx.revert();
  }, [pinDuration]);

  return sectionRef;
}
