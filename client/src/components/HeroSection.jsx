import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import MarqueeImport from "react-fast-marquee";
import { ArrowUpRight, ArrowRight, Pause, Play } from "lucide-react";
import { useMarketTicker } from "../hooks/useMarketTicker";
import { photoProps } from "../config/photos";
import "./HeroSection.css";

const Marquee = MarqueeImport.default ?? MarqueeImport;
const SLIDE_MS = 6500;
const SLIDES = [
  { key: "forex", market: "Forex", program: "The Forex Program", detail: "2 months · classroom" },
  { key: "indian", market: "Indian markets", program: "Forex with Indian Market", detail: "3 months · classroom" },
  { key: "orderflow", market: "Order flow", program: "Advanced Order Flow Program", detail: "Advanced course" },
  { key: "crypto", market: "Crypto", program: "Crypto Futures & Spot", detail: "3 months · spot + futures" },
];
const HEADLINE = ["Trade the markets", "like a professional."];

const changeClass = (change) => String(change ?? "").startsWith("+") ? "ah-positive" : String(change ?? "").startsWith("-") ? "ah-negative" : "ah-muted";

export default function HeroSection() {
  const tickerData = useMarketTicker();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [docHidden, setDocHidden] = useState(false);
  const timer = useRef(0);
  const autoplay = !reducedMotion && !paused && !docHidden;

  const [leaving, setLeaving] = useState(-1);
  const imgRefs = useRef([]);
  const activeRef = useRef(0);
  const leaveTimer = useRef(0);
  // Switch only once the next image is fully decoded, and keep the outgoing
  // image drifting while it fades so neither layer ever jumps.
  const go = useCallback(async (index) => {
    const next = (index + SLIDES.length) % SLIDES.length;
    const current = activeRef.current;
    if (next === current) return;
    const img = imgRefs.current[next];
    try { if (img && !img.complete) await new Promise((resolve) => { img.addEventListener("load", resolve, { once: true }); img.addEventListener("error", resolve, { once: true }); }); await img?.decode?.(); } catch { /* show it anyway */ }
    activeRef.current = next;
    window.clearTimeout(leaveTimer.current);
    setLeaving(current);
    setActive(next);
    leaveTimer.current = window.setTimeout(() => setLeaving(-1), 1800);
  }, []);
  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);
  useEffect(() => {
    if (!autoplay) return undefined;
    timer.current = window.setTimeout(() => go(active + 1), SLIDE_MS);
    return () => window.clearTimeout(timer.current);
  }, [active, autoplay, go]);
  useEffect(() => {
    const onVisibility = () => setDocHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  // Warm the cache for the other slides once the first image is on screen.
  // Decode every slide in the background right after the first paint.
  useEffect(() => { const id = window.setTimeout(() => imgRefs.current.forEach((img) => img?.decode?.().catch(() => {})), 1200); return () => window.clearTimeout(id); }, []);

  const slide = SLIDES[active];
  const rise = (delay) => reducedMotion ? {} : { initial: { y: "105%" }, animate: { y: "0%" }, transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] } };
  const fade = (delay) => reducedMotion ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } };

  return <>
    <section className={`ah-stage${reducedMotion ? " is-static" : ""}`} aria-labelledby="ah-title">
      <div className="ah-media" aria-hidden="true">
        {SLIDES.map((item, index) => (
          <img
            key={item.key}
            ref={(node) => { imgRefs.current[index] = node; }}
            className={`ah-media-img${index === active ? " is-active" : index === leaving ? " is-leaving" : ""}`}
            {...photoProps(item.key, "hero")}
            alt=""
            loading="eager"
            fetchPriority={index === 0 ? "high" : "low"}
            decoding="async"
          />
        ))}
        <div className="ah-scrim" />
        <div className="ah-grain" />
      </div>

      <div className="ah-stage-inner">
        <div className="ah-copy">
          <motion.p {...fade(0.35)} className="ah-eyebrow"><span aria-hidden="true" />Offline trading academy · Delhi NCR</motion.p>
          <h1 id="ah-title" className="ah-title">
            {HEADLINE.map((line, i) => <span key={line} className="ah-line"><motion.span {...rise(0.45 + i * 0.12)}>{line}</motion.span></span>)}
          </h1>
          <motion.p {...fade(0.75)} className="ah-description">Structured classroom education in technical analysis, risk management and trading psychology, taught in person by mentors who trade.</motion.p>
          <motion.div {...fade(0.85)} className="ah-actions">
            <Link to="/admission" className="ah-primary">Enroll in the next batch <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link to="/courses" className="ah-secondary">Explore courses <ArrowRight size={17} aria-hidden="true" /></Link>
          </motion.div>
        </div>
      </div>

      <motion.div {...fade(1.1)} className="ah-switcher">
        <div className="ah-switcher-head">
          <p>Programs</p>
          {!reducedMotion && <button type="button" className="ah-switcher-pause" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play slideshow" : "Pause slideshow"}>{paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}</button>}
        </div>
        <div className="ah-switcher-list" role="group" aria-label="Choose a market">
          {SLIDES.map((item, index) => (
            <button key={item.key} type="button" className={`ah-switch${index === active ? " is-active" : ""}`} aria-pressed={index === active} onClick={() => go(index)}>
              <span className="ah-switch-market">{item.market}</span>
              <span className="ah-switch-program">{item.program}</span>
              <span className="ah-switch-bar" aria-hidden="true">{index === active && <i key={`${active}-${autoplay}`} className={autoplay ? "is-running" : ""} style={{ animationDuration: `${SLIDE_MS}ms` }} />}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={slide.key} className="ah-switch-caption" aria-live="polite" initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
            <strong>{slide.program}</strong> · {slide.detail}<Link to="/courses">View curriculum <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </section>

    <div className="ah-ticker" role="region" aria-label="Market quotes">
      <Marquee gradient={false} speed={35} pauseOnHover pauseOnClick play={!reducedMotion}>
        {tickerData.map((item, index) => <div key={`${item.pair}-${index}`} className="ah-ticker-item"><span className="ah-ticker-pair">{item.pair}</span><span className="ah-ticker-price">{item.price}</span><span className={changeClass(item.change)}>{item.change}</span><span className="ah-ticker-divider" aria-hidden="true" /></div>)}
      </Marquee>
    </div>
  </>;
}

