import { useRef, useEffect } from "react";

/**
 * Kinetic Grid
 *
 * A reactive dot grid that is pulled toward the cursor within a chosen
 * radius, with a trail line that follows the mouse as it moves.
 */
export default function KineticGrid({
  background = "#050505",
  dotColor = "#8a3a12",
  lineColor = "#5c2a0e",
  trailColor = "#b8460f",
  spacing = 30,
  radius = 400,
  strength = 4,
  trail = true,
  glow = true,
  glowStrength = 14,
  style = {},
}) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const trailRef = useRef([]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = Math.max(8, spacing);
    const R = Math.max(1, radius);
    const PULL = (Math.max(1, Math.min(10, strength)) / 10) * 4;

    let W = 1;
    let H = 1;
    let cols = [];
    let dots = [];

    const build = (mw, mh) => {
      const r = host.getBoundingClientRect();
      W = Math.max(1, Math.floor(mw ?? r.width));
      H = Math.max(1, Math.floor(mh ?? r.height));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = [];
      dots = [];
      const nCols = Math.floor(W / GAP) + 2;
      const nRows = Math.floor(H / GAP) + 2;
      for (let c = 0; c < nCols; c++) {
        const col = [];
        for (let rIdx = 0; rIdx < nRows; rIdx++) {
          const hx = c * GAP;
          const hy = rIdx * GAP;
          const d = { hx, hy, x: hx, y: hy, vx: 0, vy: 0 };
          col.push(d);
          dots.push(d);
        }
        cols.push(col);
      }
    };

    build();

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver((entries) => {
            // contentRect is the reliable size — getBoundingClientRect
            // can be stale (pre-layout) when the effect first runs.
            const cr = entries[0]?.contentRect;
            build(cr?.width, cr?.height);
          })
        : null;
    ro?.observe(host);

    const setMouse = (clientX, clientY) => {
      const r = canvas.getBoundingClientRect();
      const mx = clientX - r.left;
      const my = clientY - r.top;
      mouseRef.current.x = mx;
      mouseRef.current.y = my;
      // Only "active" (pulling dots) while actually over the canvas area —
      // otherwise the grid would keep reacting to a cursor that's over
      // some other section of the page.
      mouseRef.current.active = mx >= 0 && mx <= W && my >= 0 && my <= H;
      const now = performance.now();
      const tr = trailRef.current;
      tr.push({ x: mx, y: my, t: now });
      if (tr.length > 80) tr.shift();
    };

    const onMove = (e) => setMouse(e.clientX, e.clientY);
    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    const onTouch = (e) => {
      const t = e.touches[0];
      if (t) setMouse(t.clientX, t.clientY);
    };

    // Listen on window rather than the host div. The host is
    // pointer-events:none (so it never blocks clicks on real UI sitting
    // above it), and sibling overlay divs with higher z-index would
    // otherwise swallow the mousemove before it ever reached the host.
    // window always receives the bubbled event regardless of which
    // element visually intercepted it.
    const onMouseOut = (e) => {
      if (!e.relatedTarget) onLeave();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);

    let raf = 0;
    const frame = () => {
      const m = mouseRef.current;
      ctx.clearRect(0, 0, W, H);

      // Update dot physics: spring home + attraction toward cursor.
      for (const d of dots) {
        let ax = (d.hx - d.x) * 0.08;
        let ay = (d.hy - d.y) * 0.08;
        if (m.active) {
          const dx = m.x - d.x;
          const dy = m.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < R && dist > 0.001) {
            const f = (1 - dist / R) * PULL;
            ax += (dx / dist) * f;
            ay += (dy / dist) * f;
          }
        }
        d.vx = (d.vx + ax) * 0.82;
        d.vy = (d.vy + ay) * 0.82;
        d.x += d.vx;
        d.y += d.vy;
      }

      // Grid mesh lines (brighten near the cursor).
      for (let c = 0; c < cols.length; c++) {
        for (let rIdx = 0; rIdx < cols[c].length; rIdx++) {
          const d = cols[c][rIdx];
          const right = cols[c + 1]?.[rIdx];
          const down = cols[c]?.[rIdx + 1];
          const prox = m.active
            ? Math.max(
                0,
                1 - Math.sqrt((m.x - d.x) ** 2 + (m.y - d.y) ** 2) / R,
              )
            : 0;
          if (right) {
            ctx.globalAlpha = 0.14 + prox * 0.86;
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.7 + prox * 1.8;
            if (glow) {
              ctx.shadowColor = lineColor;
              ctx.shadowBlur = glowStrength * (0.25 + prox);
            }
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();
          }
          if (down) {
            ctx.globalAlpha = 0.14 + prox * 0.86;
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.7 + prox * 1.8;
            if (glow) {
              ctx.shadowColor = lineColor;
              ctx.shadowBlur = glowStrength * (0.25 + prox);
            }
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(down.x, down.y);
            ctx.stroke();
          }
        }
      }
      if (glow) ctx.shadowBlur = 0;

      // Dots.
      for (const d of dots) {
        const prox = m.active
          ? Math.max(0, 1 - Math.sqrt((m.x - d.x) ** 2 + (m.y - d.y) ** 2) / R)
          : 0;
        ctx.globalAlpha = 0.38 + prox * 0.62;
        ctx.fillStyle = dotColor;
        if (glow) {
          ctx.shadowColor = dotColor;
          ctx.shadowBlur = glowStrength * (0.4 + prox * 1.2);
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1 + prox * 2.4, 0, 2 * Math.PI);
        ctx.fill();
      }
      if (glow) ctx.shadowBlur = 0;

      // Cursor trail line — visible on plain mouse move, fades out.
      if (trail) {
        const now = performance.now();
        const tr = trailRef.current;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < tr.length; i++) {
          const a = tr[i - 1];
          const b = tr[i];
          const age = now - b.t;
          if (age > 260) continue;
          ctx.globalAlpha = Math.max(0, 1 - age / 260) * 0.85;
          ctx.strokeStyle = trailColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
    };
  }, [
    background,
    dotColor,
    lineColor,
    trailColor,
    spacing,
    radius,
    strength,
    trail,
    glow,
    glowStrength,
  ]);

  return (
    <div
      ref={hostRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background,
        pointerEvents: "none",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
