import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Play, Layers, ShieldCheck, NotebookPen, Video } from "lucide-react";
import "./ChooseUs.css";

const CYCLE_MS = 5200;

const LAYERS = [
  { key: "structure", icon: Layers, title: "Step-by-step learning", desc: "A structured roadmap from beginner to advanced, starting with how to read market structure." },
  { key: "risk", icon: ShieldCheck, title: "Risk management focus", desc: "Protect your capital: every trade is sized and planned before you take it." },
  { key: "mind", icon: NotebookPen, title: "Psychology & discipline", desc: "Build emotional control and consistent decision-making, one journaled trade at a time." },
];

const LESSONS = ["Market structure", "Support & resistance", "Risk & position sizing", "Trading psychology"];

// Uptrend with clear swings (SVG y grows downward). Deterministic.
const PRICE = [[20, 236], [62, 212], [96, 226], [140, 182], [176, 200], [224, 148], [262, 170], [312, 118], [348, 138], [398, 90], [436, 108], [480, 70], [520, 84], [540, 76]];
const SWINGS = [
  { i: 2, t: "HL" }, { i: 3, t: "HH" }, { i: 4, t: "HL" }, { i: 5, t: "HH" }, { i: 6, t: "HL" }, { i: 7, t: "HH" }, { i: 8, t: "HL" }, { i: 9, t: "HH" },
];
const pricePath = PRICE.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");

function AnalysisChart({ layer }) {
  return (
    <svg viewBox="0 0 560 280" className={`au-chart is-${layer}`} aria-hidden="true" focusable="false">
      {[60, 120, 180, 240].map((y) => <line key={y} x1="0" x2="560" y1={y} y2={y} className="au-chart-grid" />)}
      <path d={`${pricePath} L540 280 L20 280 Z`} className="au-chart-area" />
      <path d={pricePath} className="au-chart-line" />

      {/* Layer 1: market structure */}
      <g className="au-layer au-layer-structure">
        <path d="M96 226 L176 200 L262 170 L348 138 L436 108" className="au-trendline" />
        {SWINGS.map(({ i, t }, n) => {
          const [x, y] = PRICE[i];
          const high = t === "HH";
          return (
            <g key={n} style={{ "--n": n }} className="au-swing">
              <circle cx={x} cy={y} r="4" />
              <rect x={x - 15} y={high ? y - 30 : y + 10} width="30" height="18" />
              <text x={x} y={high ? y - 17 : y + 23}>{t}</text>
            </g>
          );
        })}
      </g>

      {/* Layer 2: a long-position risk / reward box */}
      <g className="au-layer au-layer-risk">
        <rect x="348" y="62" width="170" height="76" className="au-box-reward" />
        <rect x="348" y="138" width="170" height="30" className="au-box-risk" />
        <line x1="348" x2="518" y1="138" y2="138" className="au-box-entry" />
        <text x="358" y="82" className="au-box-label">Target · +2.5R</text>
        <text x="358" y="160" className="au-box-label au-box-label-risk">Stop · −1R</text>
        <g className="au-box-badge"><rect x="392" y="96" width="86" height="26" /><text x="435" y="114">Risk 1%</text></g>
      </g>

      {/* Layer 3: a trade journal note */}
      <g className="au-layer au-layer-mind">
        <circle cx="348" cy="138" r="7" className="au-note-dot" />
        <line x1="348" y1="138" x2="300" y2="184" className="au-note-leader" />
        <g className="au-note">
          <rect x="96" y="176" width="252" height="90" />
          <text x="112" y="198" className="au-note-title">Trade journal</text>
          <g className="au-note-row" style={{ "--r": 0 }}><path d="M112 214 l4 4 l7 -8" /><text x="132" y="219">Waited for the retest</text></g>
          <g className="au-note-row" style={{ "--r": 1 }}><path d="M112 232 l4 4 l7 -8" /><text x="132" y="237">Risk fixed before entry</text></g>
          <g className="au-note-row" style={{ "--r": 2 }}><path d="M112 250 l4 4 l7 -8" /><text x="132" y="255">No revenge trade</text></g>
        </g>
      </g>
    </svg>
  );
}

export default function ChooseUs() {
  const reducedMotion = useReducedMotion();
  const [layer, setLayer] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) { setVisible(true); return undefined; }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = visible && !reducedMotion;
  useEffect(() => {
    if (!autoplay) return undefined;
    const t = window.setTimeout(() => setLayer((i) => (i + 1) % LAYERS.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [layer, autoplay]);

  const current = LAYERS[layer];

  return (
    <section ref={sectionRef} className={`au-section${visible ? " is-visible" : ""}${reducedMotion ? " is-static" : ""}`} aria-labelledby="au-title">
      <div className="au-container">
        <div className="au-heading">
          <div>
            <p className="au-eyebrow"><span aria-hidden="true" />Why choose Alphira</p>
            <h2 id="au-title">Built for<br /><span>serious traders.</span></h2>
          </div>
          <p className="au-intro">Mentorship designed to help you understand the market deeply, build discipline and develop professional trading skills step by step.</p>
        </div>

        <div className="au-bento">
          {/* ---- Real market education ---- */}
          <article className="au-card au-education" aria-labelledby="au-edu-title">
            <header className="au-card-head">
              <div>
                <p className="au-kicker">The foundation</p>
                <h3 id="au-edu-title">Real market education</h3>
                <p className="au-card-copy">Learn how professional traders read charts, manage risk and find high-probability setups, instead of relying on random signals.</p>
              </div>
            </header>

            <div className="au-workspace">
              <div className="au-window">
                <div className="au-window-bar" aria-hidden="true">
                  <span className="au-window-dots"><i /><i /><i /></span>
                  <span className="au-window-title">XAU/USD · 4H</span>
                  <span className="au-window-layer">{current.title}</span>
                </div>
                <div className="au-window-body">
                  <AnalysisChart layer={current.key} />
                </div>
              </div>

              <ul className="au-layers" aria-label="What you learn">
                {LAYERS.map(({ key, icon: Icon, title, desc }, i) => {
                  const on = i === layer;
                  return (
                    <li key={key}>
                      <button type="button" className={`au-layer-btn${on ? " is-active" : ""}`} aria-pressed={on} onClick={() => setLayer(i)}>
                        <span className="au-layer-icon" aria-hidden="true">{on ? <Check size={15} strokeWidth={2.4} /> : <Icon size={15} strokeWidth={1.9} />}</span>
                        <span className="au-layer-text"><strong>{title}</strong><small>{desc}</small></span>
                        <span className="au-layer-bar" aria-hidden="true">{on && <i key={`${layer}-${autoplay}`} className={autoplay ? "is-running" : ""} style={{ animationDuration: `${CYCLE_MS}ms` }} />}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>

          {/* ---- Recorded lessons ---- */}
          <article className="au-card au-lessons" aria-labelledby="au-lessons-title">
            <div className="au-player" aria-hidden="true">
              <div className="au-player-screen">
                <svg viewBox="0 0 320 150" className="au-player-chart"><path d="M0 120 L40 104 L70 112 L110 80 L150 92 L190 58 L230 70 L270 36 L320 44" /></svg>
                <span className="au-player-chip"><Video size={13} /> Recorded mentorship</span>
                <span className="au-player-play"><Play size={20} fill="currentColor" /></span>
              </div>
              <div className="au-player-controls">
                <span className="au-player-track"><i /></span>
              </div>
            </div>
            <div className="au-lessons-body">
              <p className="au-kicker">Your pace</p>
              <h3 id="au-lessons-title">Premium recorded lessons</h3>
              <p className="au-card-copy">High-quality recorded mentorship you can watch any time, with lifetime learning flexibility.</p>
              <ol className="au-playlist" aria-label="Topics covered">
                {LESSONS.map((lesson, i) => (
                  <li key={lesson} className={i === 0 ? "is-now" : ""}><span aria-hidden="true">{i === 0 ? <Play size={10} fill="currentColor" /> : i + 1}</span>{lesson}</li>
                ))}
              </ol>
            </div>
          </article>

          {/* ---- Learn, practice, grow ---- */}
          <article className="au-card au-journey" aria-labelledby="au-journey-title">
            <ol className="au-steps" aria-label="How students progress">
              {["Learn", "Practice", "Grow"].map((step, i) => (
                <li key={step} style={{ "--s": i }}><span className="au-step-dot" aria-hidden="true" />{step}</li>
              ))}
            </ol>
            <h3 id="au-journey-title">From confusion to clarity.</h3>
            <p className="au-card-copy">Alphira helps aspiring traders build real skill through professional, in-person mentorship.</p>
            <Link to="/admission" className="au-join">Join Alphira today <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </article>
        </div>
      </div>
    </section>
  );
}

