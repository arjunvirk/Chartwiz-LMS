import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Zap, Brain, Shield, Layers, Activity, ArrowUpRight } from "lucide-react";
import "./TradingFeatures.css";

/* ---------- Mini visuals (viewBox 280 × 120) ---------- */
function PriceActionArt() {
  const candles = [[70, 84], [84, 92], [92, 78], [78, 90], [90, 82], [82, 92], [92, 80], [80, 70], [70, 56], [56, 44], [44, 30]];
  return (
    <svg viewBox="0 0 280 120" className="af-art" aria-hidden="true">
      <line x1="10" x2="270" y1="94" y2="94" className="af-level" />
      <text x="12" y="110" className="af-art-label">Support</text>
      <line x1="10" x2="270" y1="66" y2="66" className="af-level af-level-res" />
      <text x="12" y="60" className="af-art-label">Resistance → breakout</text>
      {candles.map(([o, c], i) => {
        const x = 30 + i * 22, up = c < o;
        return (
          <g key={i} className={`af-c ${up ? "up" : "dn"}`} style={{ "--i": i, transformOrigin: `${x}px ${(o + c) / 2}px` }}>
            <line x1={x} x2={x} y1={Math.min(o, c) - 5} y2={Math.max(o, c) + 5} />
            <rect x={x - 5} width="10" y={Math.min(o, c)} height={Math.max(2, Math.abs(o - c))} />
          </g>
        );
      })}
      <path d="M228 56 L250 34 M250 34 L242 35 M250 34 L249 42" className="af-arrow" />
    </svg>
  );
}

function ScalpingArt() {
  const ticks = "M10 70 L22 62 L30 74 L40 58 L48 66 L58 50 L66 60 L76 46 L84 56 L94 44 L104 58 L112 48 L122 62 L132 52 L140 64 L150 50 L160 58 L170 42 L178 50 L188 38 L198 48 L208 36 L218 44 L228 30 L238 40 L248 32 L258 38 L270 28";
  return (
    <svg viewBox="0 0 280 120" className="af-art" aria-hidden="true">
      <text x="12" y="18" className="af-art-chip">M1</text>
      <path d={ticks} className="af-line af-line-fast" pathLength="1" />
      <g className="af-trade" style={{ "--i": 0 }}><circle cx="58" cy="50" r="4" className="af-in" /><circle cx="94" cy="44" r="4" className="af-out" /><line x1="58" x2="94" y1="50" y2="44" className="af-trade-link" /></g>
      <g className="af-trade" style={{ "--i": 1 }}><circle cx="150" cy="50" r="4" className="af-in" /><circle cx="188" cy="38" r="4" className="af-out" /><line x1="150" x2="188" y1="50" y2="38" className="af-trade-link" /></g>
      <g className="af-trade" style={{ "--i": 2 }}><circle cx="218" cy="44" r="4" className="af-in" /><circle cx="248" cy="32" r="4" className="af-out" /><line x1="218" x2="248" y1="44" y2="32" className="af-trade-link" /></g>
      <text x="12" y="108" className="af-art-label">Quick in, quick out · stop always set</text>
    </svg>
  );
}

function PsychologyArt() {
  return (
    <svg viewBox="0 0 280 120" className="af-art" aria-hidden="true">
      <path d="M10 60 L24 30 L36 88 L48 22 L60 96 L72 34 L84 82 L96 44 L108 72 L120 52 L132 66 L144 56 L156 62 L168 58 L270 60" className="af-line af-line-calm" pathLength="1" />
      <text x="12" y="112" className="af-art-label af-art-label-warn">Fear &amp; greed</text>
      <text x="196" y="112" className="af-art-label">Calm execution</text>
      <circle cx="270" cy="60" r="4" className="af-pulse-dot" />
      <circle cx="270" cy="60" r="4" className="af-pulse-ring" />
    </svg>
  );
}

function RiskArt() {
  // Semicircle gauge 0–5% risk per trade; needle settles at 1%.
  return (
    <svg viewBox="0 0 280 120" className="af-art" aria-hidden="true">
      <path d="M80 104 A60 60 0 0 1 200 104" className="af-gauge-track" />
      <path d="M80 104 A60 60 0 0 1 121.5 46.9" className="af-gauge-safe" pathLength="1" />
      {[0, 1, 2, 3, 4, 5].map((n) => {
        const a = Math.PI - (n / 5) * Math.PI;
        return <line key={n} x1={140 + Math.cos(a) * 52} y1={104 - Math.sin(a) * 52} x2={140 + Math.cos(a) * 60} y2={104 - Math.sin(a) * 60} className="af-gauge-tick" />;
      })}
      <g className="af-needle"><line x1="140" y1="104" x2="140" y2="54" /><circle cx="140" cy="104" r="6" /></g>
      <text x="140" y="36" className="af-gauge-value">1% risk</text>
      <text x="72" y="118" className="af-art-label">0%</text>
      <text x="196" y="118" className="af-art-label">5%</text>
    </svg>
  );
}

function OptionsArt() {
  return (
    <svg viewBox="0 0 280 120" className="af-art" aria-hidden="true">
      <line x1="10" x2="270" y1="78" y2="78" className="af-axis" />
      <line x1="130" x2="130" y1="16" y2="104" className="af-strike" />
      <text x="134" y="114" className="af-art-label">Strike</text>
      <path d="M10 92 L130 92 L250 22" className="af-line af-line-payoff" pathLength="1" />
      <text x="12" y="70" className="af-art-label">Long call payoff</text>
      {["Δ", "Γ", "θ", "ν"].map((g, i) => (
        <g key={g} className="af-greek" style={{ "--i": i }}><rect x={176 + i * 24} y="82" width="20" height="20" /><text x={186 + i * 24} y="96">{g}</text></g>
      ))}
    </svg>
  );
}

function SwingArt() {
  return (
    <svg viewBox="0 0 280 120" className="af-art" aria-hidden="true">
      <text x="12" y="18" className="af-art-chip">D1</text>
      <path d="M10 100 C40 96 50 70 70 74 S96 90 112 78 S140 44 160 52 S186 66 202 50 S236 20 270 18" className="af-line af-line-swing" pathLength="1" />
      <path d="M10 106 L270 34" className="af-trend" />
      {[[70, 74], [112, 78], [160, 52], [202, 50]].map(([x, y], i) => (
        <g key={i} className="af-entry" style={{ "--i": i }}><circle cx={x} cy={y} r="5" /><path d={`M${x} ${y + 9} l-4 6 h8 z`} /></g>
      ))}
      <text x="12" y="116" className="af-art-label">Buy the pullback, ride the trend</text>
    </svg>
  );
}

const FEATURES = [
  { icon: TrendingUp, tag: "Core skill", title: "Price action trading", Art: PriceActionArt, description: "Support and resistance, trend structure, breakout setups and the candlestick psychology professional traders rely on." },
  { icon: Zap, tag: "Intraday", title: "Scalping strategies", Art: ScalpingArt, description: "Fast intraday setups with tight risk management and disciplined, rules-based execution." },
  { icon: Brain, tag: "Mindset", title: "Trading psychology", Art: PsychologyArt, description: "Emotional control, confidence and decision-making that keep fear and overtrading out of your process." },
  { icon: Shield, tag: "Capital protection", title: "Risk management", Art: RiskArt, description: "Professional position sizing and risk control, so one trade can never take out your account." },
  { icon: Layers, tag: "Derivatives", title: "Options trading", Art: OptionsArt, description: "The Greeks, expiry trading, option buying and selling, and advanced strategies with real examples." },
  { icon: Activity, tag: "Multi-day", title: "Swing trading", Art: SwingArt, description: "High-probability swing trades using trend continuation and momentum-based setups." },
];

export default function TradingFeatures() {
  const gridRef = useRef(null);

  // Cursor spotlight: each card gets its own pointer position (cheap CSS variables).
  const onPointerMove = (event) => {
    const grid = gridRef.current;
    if (!grid || event.pointerType !== "mouse") return;
    grid.querySelectorAll(".af-card").forEach((card) => {
      // Rects and pointer coords are in screen pixels; CSS zoom (large screens) needs local pixels.
      const r = card.getBoundingClientRect();
      const z = card.currentCSSZoom || 1;
      card.style.setProperty("--mx", `${(event.clientX - r.left) / z}px`);
      card.style.setProperty("--my", `${(event.clientY - r.top) / z}px`);
    });
  };

  // Each visual draws once when its card is on screen.
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".af-card");
    if (!cards?.length) return undefined;
    if (!("IntersectionObserver" in window)) { cards.forEach((c) => c.classList.add("is-in")); return undefined; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.35 });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="af-section" aria-labelledby="af-title">
      <div className="af-container">
        <div className="af-heading">
          <div>
            <p className="af-eyebrow"><span aria-hidden="true" />What you will learn</p>
            <h2 id="af-title">Master the core of<br /><span>professional trading.</span></h2>
          </div>
          <p className="af-intro">Practical market concepts, disciplined execution and advanced techniques, taught through structured classroom mentorship.</p>
        </div>

        <div ref={gridRef} className="af-grid" onPointerMove={onPointerMove}>
          {FEATURES.map(({ icon: Icon, tag, title, description, Art }) => (
            <article className="af-card" key={title}>
              <div className="af-card-art"><Art /></div>
              <div className="af-card-body">
                <div className="af-card-meta">
                  <span className="af-icon" aria-hidden="true"><Icon size={16} strokeWidth={1.9} /></span>
                  <span className="af-tag">{tag}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="af-footer">
          <p>Taught in person by mentors, with live market practice in every program.</p>
          <Link to="/courses" className="af-link">Explore the programs <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
