import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import CountUpImport from "react-countup";
import MarqueeImport from "react-fast-marquee";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useMarketTicker } from "../hooks/useMarketTicker";
import { useSectionPin } from "../hooks/useSectionPin";
import "./HeroSection.css";

const CountUp = CountUpImport.default ?? CountUpImport;
const Marquee = MarqueeImport.default ?? MarqueeImport;
// Deterministic, illustrative OHLC series (seeded walk with an upward drift).
const SERIES = (() => {
  let seed = 7, price = 100;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  return Array.from({ length: 30 }, (_, i) => {
    const open = price;
    const drift = 0.8 + Math.sin(i / 3.6 + 1) * 1.7;
    const close = open + drift + (rand() - 0.5) * 4.2;
    const high = Math.max(open, close) + rand() * 1.8;
    const low = Math.min(open, close) - rand() * 1.8;
    price = close;
    return { open, close, high, low };
  });
})();

function CandleChart({ animate }) {
  const W = 480, H = 170, PAD = 6;
  const max = Math.max(...SERIES.map((c) => c.high)), min = Math.min(...SERIES.map((c) => c.low));
  const y = (v) => PAD + (1 - (v - min) / (max - min)) * (H - PAD * 2);
  const step = W / SERIES.length, body = step * 0.56;
  const ma = SERIES.map((_, i) => { const w = SERIES.slice(Math.max(0, i - 4), i + 1); return w.reduce((a, c) => a + c.close, 0) / w.length; });
  const path = ma.map((v, i) => `${i ? "L" : "M"}${(i * step + step / 2).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const last = SERIES[SERIES.length - 1];
  return (
    <svg className={`ah-svg-chart${animate ? " is-animated" : ""}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} className="ah-grid-line" />)}
      {SERIES.map((c, i) => {
        const up = c.close >= c.open, x = i * step + step / 2;
        return (
          <g key={i} className={`ah-c ${up ? "ah-c-up" : "ah-c-down"}${i === SERIES.length - 1 ? " ah-c-last" : ""}`} style={{ "--i": i, transformOrigin: `${x}px ${y((c.open + c.close) / 2)}px` }}>
            <line x1={x} x2={x} y1={y(c.high)} y2={y(c.low)} />
            <rect x={x - body / 2} width={body} y={y(Math.max(c.open, c.close))} height={Math.max(1.5, Math.abs(y(c.open) - y(c.close)))} />
          </g>
        );
      })}
      <path d={path} className="ah-ma" pathLength="1" />
      <line x1="0" x2={W} y1={y(last.close)} y2={y(last.close)} className="ah-last-line" />
    </svg>
  );
}
const changeClass = (change) => String(change ?? "").startsWith("+") ? "ah-positive" : String(change ?? "").startsWith("-") ? "ah-negative" : "ah-muted";

export default function HeroSection() {
  const tickerData = useMarketTicker();
  const heroRef = useSectionPin();
  const reducedMotion = useReducedMotion();
  const goldTicker = tickerData.find((item) => item.pair?.toUpperCase().includes("XAU"));
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });
  const number = (end) => reducedMotion ? end : <CountUp end={end} duration={2.5} enableScrollSpy scrollSpyOnce />;

  return <>
    <section ref={heroRef} className="ah-hero" aria-labelledby="ah-title">
      <div className="ah-layout">
        <div className="ah-copy">
          <motion.div {...reveal()} className="ah-eyebrow"><span aria-hidden="true" />Delhi NCR · Professional Offline Trading Academy</motion.div>
          <motion.h1 {...reveal(0.08)} id="ah-title" className="ah-title">Trade the Markets<span>Like a<br className="ah-desktop-break" /> Professional.</span></motion.h1>
          <motion.p {...reveal(0.16)} className="ah-description">Structured offline education in technical analysis, risk management and trading psychology — taught by mentors, not YouTube tutorials.</motion.p>
          <motion.div {...reveal(0.24)} className="ah-actions">
            <Link to="/admission" className="ah-primary">Enroll in Next Batch <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link to="/courses" className="ah-secondary">Explore Courses <ArrowRight size={17} aria-hidden="true" /></Link>
          </motion.div>
        </div>
        <motion.div {...reveal(0.2)} className="ah-visual">
          <div className="ah-visual-label"><span>THE MARKET, IN FOCUS</span><span aria-hidden="true">01 / XAU</span></div>
          <div className="ah-market-card">
            <div className="ah-card-top"><div className="ah-instrument"><span className="ah-instrument-mark" aria-hidden="true">Au</span><div><strong>Gold / US Dollar</strong><span>XAU / USD</span></div></div><span className="ah-live"><i aria-hidden="true" />{goldTicker ? "Live" : "Connecting"}</span></div>
            <div className="ah-quote"><span className="ah-small-label">MARKET PRICE</span><div className="ah-price">{goldTicker?.price ?? "—"}</div>{/^[+-]/.test(String(goldTicker?.change ?? "")) ? <span className={`ah-change ${changeClass(goldTicker.change)}`}>{goldTicker.change}<span className="ah-change-period"> / 24h</span></span> : <span className="ah-change ah-muted">{goldTicker ? "Spot price · USD per ounce" : "Fetching live quote…"}</span>}</div>
            <div className="ah-chart" aria-hidden="true"><CandleChart animate={!reducedMotion} /></div>
            <div className="ah-chart-caption"><span><i className="ah-key-ma" aria-hidden="true" />5-period average</span><span>Illustrative chart</span></div>
            <dl className="ah-market-details"><div><dt>Price</dt><dd>{goldTicker?.price ?? "—"}</dd></div><div><dt>24h Change</dt><dd className={changeClass(goldTicker?.change)}>{goldTicker?.change ?? "—"}</dd></div><div><dt>Pair</dt><dd>XAU/USD</dd></div></dl>
          </div>
          <div className="ah-study-note"><span className="ah-note-icon" aria-hidden="true">↗</span><p>Technical analysis. Risk management.<br /><strong>A structured approach to the markets.</strong></p></div>
        </motion.div>
      </div>
    </section>
    {/* Remains outside the pinned section so the next section cannot cover it. */}
    <div className="ah-ticker" role="region" aria-label="Market quotes">
      <Marquee gradient={false} speed={35} pauseOnHover pauseOnClick play={!reducedMotion}>
        {tickerData.map((item, index) => <div key={`${item.pair}-${index}`} className="ah-ticker-item"><span className="ah-ticker-pair">{item.pair}</span><span className="ah-ticker-price">{item.price}</span><span className={changeClass(item.change)}>{item.change}</span><span className="ah-ticker-divider" aria-hidden="true" /></div>)}
      </Marquee>
    </div>
  </>;
}

