import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TrendingUp, Footprints, Brain, Infinity as InfinityIcon } from "lucide-react";
import "./TrustSection.css";

const CYCLE_MS = 7000;

const PILLARS = [
  {
    key: "strategy",
    icon: TrendingUp,
    title: "Practical strategies",
    desc: "Real market setups built on price action, structure and trend, with the stop and target planned before the entry.",
  },
  {
    key: "path",
    icon: Footprints,
    title: "Beginner friendly",
    desc: "A structured path from your first chart to live-market execution, with step-by-step guidance from your mentor.",
  },
  {
    key: "mind",
    icon: Brain,
    title: "Trading psychology",
    desc: "Emotional discipline, mindset and risk handling, so you can follow your plan on a losing day as well as a winning one.",
  },
  {
    key: "access",
    icon: InfinityIcon,
    title: "Lifetime access",
    desc: "Recorded mentorship you can revisit any time, from anywhere, with new lessons added as the markets change.",
  },
];

/* ---------- Scene 1: a planned trade plays out ---------- */
const CANDLES = (() => {
  // Down into support, base, then a breakout to target. Deterministic.
  const closes = [228, 222, 238, 250, 246, 262, 271, 266, 283, 292, 296, 289, 300, 306, 297, 288, 276, 268, 252, 241, 226, 210, 196, 181, 170, 162];
  let open = 214;
  return closes.map((close, i) => {
    const high = Math.min(open, close) - 6 - ((i * 7) % 9);
    const low = Math.max(open, close) + 6 + ((i * 5) % 8);
    const c = { open, close, high, low };
    open = close;
    return c;
  });
})();

function StrategyScene() {
  const step = 20, x0 = 56, body = 11;
  const entryY = 296, stopY = 330, targetY = 160;
  const entryX = x0 + 12 * step;
  return (
    <svg viewBox="0 0 640 420" className="at-scene at-scene-strategy" aria-hidden="true">
      <rect x="40" y={entryY - 6} width="560" height="26" className="at-zone" />
      <text x="48" y={entryY + 32} className="at-tag at-tag-muted">Support zone</text>
      {CANDLES.map((c, i) => {
        const x = x0 + i * step;
        const up = c.close < c.open; // SVG y grows downward
        return (
          <g key={i} className={`at-candle ${up ? "is-up" : "is-down"}`} style={{ "--i": i, transformOrigin: `${x}px ${(c.open + c.close) / 2}px` }}>
            <line x1={x} x2={x} y1={c.high} y2={c.low} />
            <rect x={x - body / 2} width={body} y={Math.min(c.open, c.close)} height={Math.max(2, Math.abs(c.open - c.close))} />
          </g>
        );
      })}
      <g className="at-levels">
        <line x1={entryX} x2="600" y1={targetY} y2={targetY} className="at-level at-level-target" />
        <line x1={entryX} x2="600" y1={entryY} y2={entryY} className="at-level at-level-entry" />
        <line x1={entryX} x2="600" y1={stopY} y2={stopY} className="at-level at-level-stop" />
        <g className="at-chip at-chip-target"><rect x="510" y={targetY - 24} width="90" height="20" /><text x="555" y={targetY - 10}>Target</text></g>
        <g className="at-chip at-chip-entry"><rect x="510" y={entryY - 24} width="90" height="20" /><text x="555" y={entryY - 10}>Entry</text></g>
        <g className="at-chip at-chip-stop"><rect x="510" y={stopY + 4} width="90" height="20" /><text x="555" y={stopY + 18}>Stop loss</text></g>
      </g>
      <circle cx={entryX} cy={entryY} r="6" className="at-entry-dot" />
      <circle cx={entryX} cy={entryY} r="6" className="at-entry-ring" />
      <g className="at-result">
        <rect x="380" y="56" width="220" height="56" />
        <text x="398" y="80" className="at-result-label">Planned reward : risk</text>
        <text x="398" y="101" className="at-result-value">2.5R · target hit</text>
      </g>
    </svg>
  );
}

/* ---------- Scene 2: a learning path lights up ---------- */
const STEPS = [
  { x: 80, y: 330, label: "Market basics" },
  { x: 210, y: 270, label: "Price structure" },
  { x: 330, y: 220, label: "Risk management" },
  { x: 450, y: 160, label: "Execution" },
  { x: 565, y: 96, label: "Live market" },
];
function PathScene() {
  const d = STEPS.map((s, i) => (i ? `S${s.x - 50} ${s.y + 30} ${s.x} ${s.y}` : `M${s.x} ${s.y}`)).join(" ");
  return (
    <svg viewBox="0 0 640 420" className="at-scene at-scene-path" aria-hidden="true">
      <path d={d} className="at-path-track" />
      <path d={d} className="at-path-line" pathLength="1" />
      {STEPS.map((s, i) => (
        <g key={s.label} className="at-node" style={{ "--i": i }}>
          <circle cx={s.x} cy={s.y} r="18" className="at-node-halo" />
          <circle cx={s.x} cy={s.y} r="9" className="at-node-dot" />
          <text x={s.x} y={s.y + (i % 2 ? -32 : 42)} className="at-node-label">{s.label}</text>
          <text x={s.x} y={s.y + (i % 2 ? -50 : 60)} className="at-node-step">Step {i + 1}</text>
        </g>
      ))}
      <g className="at-progress">
        <rect x="40" y="408" width="560" height="5" className="at-progress-track" />
        <rect x="40" y="408" width="560" height="5" className="at-progress-fill" />
      </g>
    </svg>
  );
}

/* ---------- Scene 3: emotion vs. discipline ---------- */
const NOISE = "M40 150 L66 120 L88 175 L110 100 L128 190 L150 115 L168 205 L190 95 L210 210 L232 130 L252 230 L270 150 L294 240 L316 170 L336 250 L360 190 L380 268 L404 210 L425 280";
const PLAN = "M40 300 C110 292 150 280 195 270 S275 246 312 236 S385 210 425 196";
function MindScene() {
  return (
    <svg viewBox="0 0 640 420" className="at-scene at-scene-mind" aria-hidden="true">
      {[110, 190, 270, 350].map((y) => <line key={y} x1="40" x2="425" y1={y} y2={y} className="at-grid-line" />)}
      <path d={NOISE} className="at-noise" pathLength="1" />
      <path d={PLAN} className="at-plan" pathLength="1" />
      <text x="40" y="84" className="at-tag at-tag-noise">Trading on impulse</text>
      <text x="40" y="334" className="at-tag at-tag-plan">Trading the plan</text>
      <g className="at-checklist">
        {["Risk fixed per trade", "Followed the plan", "No revenge trades"].map((item, i) => (
          <g key={item} transform={`translate(455 ${130 + i * 72})`}>
            <g className="at-check" style={{ "--i": i }}>
              <rect width="26" height="26" className="at-check-box" />
              <path d="M7 13.5 L11.5 18 L19.5 9" className="at-check-mark" pathLength="1" />
              <text x="0" y="46" className="at-check-label">{item}</text>
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ---------- Scene 4: access that never runs out ---------- */
const LOOP = "M320 210 C370 140 470 140 470 210 C470 280 370 280 320 210 C270 140 170 140 170 210 C170 280 270 280 320 210 Z";
function AccessScene({ animate }) {
  return (
    <svg viewBox="0 0 640 420" className="at-scene at-scene-access" aria-hidden="true">
      <path d={LOOP} className="at-loop-track" />
      <path d={LOOP} className="at-loop-line" pathLength="1" />
      {animate && (
        <circle r="8" className="at-loop-dot">
          <animateMotion dur="5s" repeatCount="indefinite" path={LOOP} rotate="auto" />
        </circle>
      )}
      {[
        { x: 100, y: 92, t: "Recorded mentorship" },
        { x: 350, y: 92, t: "New lessons added" },
        { x: 100, y: 340, t: "Learn from anywhere" },
        { x: 350, y: 340, t: "Revisit any session" },
      ].map((c, i) => (
        <g key={c.t} className="at-pill" style={{ "--i": i }}>
          <rect x={c.x} y={c.y - 22} width="190" height="34" />
          <text x={c.x + 95} y={c.y}>{c.t}</text>
        </g>
      ))}
    </svg>
  );
}

const SCENES = { strategy: StrategyScene, path: PathScene, mind: MindScene, access: AccessScene };

export default function TrustSection() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  const tabRefs = useRef([]);

  // Only run while the section is on screen (no scroll-driven effects).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) { setVisible(true); return undefined; }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = visible && !reducedMotion && !paused;
  useEffect(() => {
    if (!autoplay) return undefined;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % PILLARS.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [active, autoplay]);

  const select = useCallback((i) => setActive((i + PILLARS.length) % PILLARS.length), []);
  const onKeyDown = (event, i) => {
    const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (event.key in map) {
      event.preventDefault();
      const next = (i + map[event.key] + PILLARS.length) % PILLARS.length;
      select(next);
      tabRefs.current[next]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : PILLARS.length - 1;
      select(next);
      tabRefs.current[next]?.focus();
    }
  };

  const pillar = PILLARS[active];
  const Scene = SCENES[pillar.key];

  return (
    <section ref={sectionRef} className={`at-section${visible ? " is-visible" : ""}`} aria-labelledby="at-title">
      <div className="at-container">
        <div className="at-heading">
          <div>
            <p className="at-eyebrow"><span aria-hidden="true" />Why traders trust Alphira</p>
            <h2 id="at-title">Learn trading<br /><span>the smart way.</span></h2>
          </div>
          <p className="at-intro">Practical education in strategy, risk and psychology. No fake promises, no unrealistic income claims.</p>
        </div>

        <div className="at-explorer" onFocus={(e) => { if (e.target.matches?.(":focus-visible")) setPaused(true); }} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}>
          <div className="at-tabs" role="tablist" aria-label="What makes Alphira different" aria-orientation="vertical">
            {PILLARS.map(({ key, icon: Icon, title, desc }, i) => {
              const selected = i === active;
              return (
                <button
                  key={key}
                  ref={(node) => { tabRefs.current[i] = node; }}
                  id={`at-tab-${key}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="at-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`at-tab${selected ? " is-active" : ""}`}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  <span className="at-tab-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.75} /></span>
                  <span className="at-tab-text">
                    <span className="at-tab-title">{title}</span>
                    <span className="at-tab-desc">{desc}</span>
                  </span>
                  <span className="at-tab-bar" aria-hidden="true">
                    {selected && <i key={`${active}-${autoplay}`} className={autoplay ? "is-running" : ""} style={{ animationDuration: `${CYCLE_MS}ms` }} />}
                  </span>
                </button>
              );
            })}
          </div>

          <div id="at-panel" role="tabpanel" aria-labelledby={`at-tab-${pillar.key}`} className="at-stage">
            <div className="at-stage-head">
              <span className="at-stage-icon" aria-hidden="true"><pillar.icon size={16} strokeWidth={2} /></span>
              <span>{pillar.title}</span>
              <span className="at-stage-count" aria-hidden="true">{active + 1} / {PILLARS.length}</span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pillar.key}
                className={`at-stage-art${reducedMotion ? " is-static" : ""}`}
                initial={reducedMotion ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Scene animate={visible && !reducedMotion} />
              </motion.div>
            </AnimatePresence>
            <p className="at-stage-desc">{pillar.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

