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
const CANDLES = [38, 55, 42, 68, 50, 78, 60, 88, 70, 95, 82, 100, 90, 72];
const DOWN = new Set([2, 4, 6, 10, 13]);
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
  const candles = (key) => <div className="ah-candle-group" key={key}>
    {CANDLES.map((height, index) => <span key={index} className={`ah-candle${DOWN.has(index) ? " ah-candle-down" : ""}`} style={{ height: `${height}%` }} />)}
  </div>;

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
          <motion.div {...reveal(0.32)} className="ah-stats">
            <div><strong>{number(500)}+</strong><span>Students</span></div>
            <div><strong>4.9<span className="ah-star" aria-label=" stars">★</span></strong><span>Avg Rating</span></div>
            <div><strong>{number(15)}+</strong><span>Strategies Taught</span></div>
          </motion.div>
        </div>
        <motion.div {...reveal(0.2)} className="ah-visual">
          <div className="ah-visual-label"><span>THE MARKET, IN FOCUS</span><span aria-hidden="true">01 / XAU</span></div>
          <div className="ah-market-card">
            <div className="ah-card-top"><div className="ah-instrument"><span className="ah-instrument-mark" aria-hidden="true">Au</span><div><strong>Gold / US Dollar</strong><span>XAU / USD</span></div></div><span className="ah-live"><i aria-hidden="true" />{goldTicker ? "Live" : "Connecting"}</span></div>
            <div className="ah-quote"><span className="ah-small-label">MARKET PRICE</span><div className="ah-price">{goldTicker?.price ?? "—"}</div><span className={`ah-change ${changeClass(goldTicker?.change)}`}>{goldTicker?.change ?? "Awaiting quote"}{goldTicker && <span className="ah-change-period"> / 24h</span>}</span></div>
            <div className="ah-chart" aria-hidden="true"><div className={`ah-candle-track${reducedMotion ? " ah-static" : ""}`}>{candles("first")}{!reducedMotion && candles("second")}</div></div>
            <div className="ah-chart-caption"><span>Illustrative chart</span><span>Live quote above</span></div>
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
