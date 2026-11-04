import { useEffect } from "react";

/*
 * Large / ultrawide canvas for the homepage.
 *
 * The homepage is designed on a ~1440 × 900 canvas. On big screens (QHD,
 * 4K, 21:9 and 32:9 ultrawides such as the Samsung Odyssey G9) that canvas
 * would sit as a thin strip in the middle with small type. Instead we:
 *
 *  1. Scale the whole page with CSS `zoom`. The factor is limited by the
 *     screen HEIGHT, so a 32:9 monitor gets the same vertical rhythm as a
 *     laptop instead of type that is too large to fit a section on screen.
 *  2. Widen the content column (`--ac-shell`) on wide aspect ratios, so
 *     21:9 / 32:9 screens use more of their width instead of showing huge
 *     empty side margins.
 *
 * Below 2200px CSS width nothing changes. CSS `zoom` also multiplies
 * viewport units, so full-height rules divide by `--ac-zoom`.
 */
const MIN_WIDTH = 2200;
const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 900;
const MAX_ZOOM = 2.25;
const BASE_SHELL = 1248;
const MAX_SHELL = 1680;
const SHELL_SHARE = 0.62; // share of the (scaled) viewport the column may use

export function getUltrawideCanvas(width, height) {
  if (width < MIN_WIDTH) return null;
  const zoom = Math.min(MAX_ZOOM, Math.max(1, Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT)));
  const scaledWidth = width / zoom;
  const shell = Math.round(Math.min(MAX_SHELL, Math.max(BASE_SHELL, scaledWidth * SHELL_SHARE)));
  if (zoom < 1.02 && shell === BASE_SHELL) return null;
  return { zoom: Math.round(zoom * 1000) / 1000, shell };
}

export default function useUltrawideCanvas() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.CSS?.supports?.("zoom", "1.5")) return undefined;
    const root = document.documentElement;
    let frame = 0;

    const clear = () => {
      root.classList.remove("ac-uw");
      root.style.removeProperty("--ac-zoom");
      root.style.removeProperty("--ac-shell");
    };
    const apply = () => {
      frame = 0;
      const canvas = getUltrawideCanvas(window.innerWidth, window.innerHeight);
      if (!canvas) { clear(); return; }
      root.style.setProperty("--ac-zoom", String(canvas.zoom));
      root.style.setProperty("--ac-shell", `${canvas.shell}px`);
      root.classList.add("ac-uw");
    };
    const onResize = () => { if (!frame) frame = window.requestAnimationFrame(apply); };

    apply();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
      clear();
    };
  }, []);
}
