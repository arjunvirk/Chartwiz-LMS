import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Users, LineChart, Infinity as InfinityIcon, Quote } from "lucide-react";
import founderImg from "../assets/founder.jpeg";
import useUltrawideCanvas from "../hooks/useUltrawideCanvas";
import "./About.css";

const PRINCIPLES = [
  { n: "01", icon: BookOpen, title: "Structured Learning", desc: "Step-by-step lessons designed for every level of trader." },
  { n: "02", icon: Users, title: "Expert Mentorship", desc: "Learn directly from experienced market professionals." },
  { n: "03", icon: LineChart, title: "Practical Strategies", desc: "Real-world trading concepts you can apply immediately." },
  { n: "04", icon: InfinityIcon, title: "Lifetime Growth", desc: "Continuous learning and improvement through market cycles." },
];
const NUMBERS = [
  { value: 500, suffix: "+", label: "Students guided" },
  { value: 5, suffix: "+", label: "Years of market experience" },
  { value: 4, suffix: "", label: "Classroom programs" },
];
const TOPICS = ["Price action", "Market structure", "Risk management", "Trading psychology", "Options", "Order flow", "Swing trading", "Scalping", "Discipline"];

/* Sets .is-in once an element reaches the screen (never tied to scroll position). */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setInView(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, inView] = useInView(0.15);
  return <Tag ref={ref} className={`aab-reveal${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`} {...rest}>{children}</Tag>;
}

/* Counts from 0 to `end` once started. */
function Counter({ end, start }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setValue(end); return undefined; }
    let frame; const t0 = performance.now(); const dur = 1600;
    const tick = (t) => { const p = Math.min(1, (t - t0) / dur); setValue(Math.round(end * (1 - (1 - p) ** 3))); if (p < 1) frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, start]);
  return <>{value}</>;
}

export default function About() {
  useUltrawideCanvas();
  const [numbersRef, numbersIn] = useInView(0.4);
  const [founderRef, founderIn] = useInView(0.25);
  const [pathRef, pathIn] = useInView(0.3);

  return (
    <main className="aab">
      {/* ---------- Hero ---------- */}
      <header className="aab-hero">
        <div className="aab-hero-glow" aria-hidden="true" />
        <div className="aab-shell aab-hero-inner">
          <p className="aab-kicker"><span aria-hidden="true" />About Alphira Capital</p>
          <h1 className="aab-title">
            <span className="aab-line"><span>Empowering traders</span></span>
            <span className="aab-line"><span>with <em>professional</em></span></span>
            <span className="aab-line"><span><em>education.</em></span></span>
          </h1>
          <div className="aab-hero-foot">
            <p className="aab-lede">Alphira Capital is a modern trading education platform designed to help beginners and experienced traders build confidence, develop profitable trading habits, and understand the financial markets through structured mentorship and practical learning.</p>
            <ul className="aab-tags" aria-label="What we stand for">
              <li>Education</li><li>Discipline</li><li>Growth</li>
            </ul>
          </div>
        </div>
        <div className="aab-marquee" aria-hidden="true">
          <div className="aab-marquee-track">
            {[0, 1].map((k) => (
              <div key={k} className="aab-marquee-set">
                {TOPICS.map((t) => <span key={t}>{t}<i /></span>)}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ---------- Numbers ---------- */}
      <section ref={numbersRef} className={`aab-numbers${numbersIn ? " is-in" : ""}`} aria-label="Alphira Capital in numbers">
        <div className="aab-shell aab-numbers-grid">
          {NUMBERS.map((n, i) => (
            <div key={n.label} className="aab-number" style={{ "--i": i }}>
              <strong><Counter end={n.value} start={numbersIn} />{n.suffix}</strong>
              <span>{n.label}</span>
            </div>
          ))}
          <div className="aab-number aab-number-place" style={{ "--i": 3 }}>
            <strong>Delhi NCR</strong>
            <span>In-person classroom batches</span>
          </div>
        </div>
      </section>

      {/* ---------- Founder ---------- */}
      <section ref={founderRef} className={`aab-section aab-founder${founderIn ? " is-in" : ""}`} aria-labelledby="founder-heading">
        <div className="aab-shell aab-founder-grid">
          <figure className="aab-portrait">
            <div className="aab-portrait-frame">
              <img src={founderImg} alt="Rohit Kumar, founder and mentor at Alphira Capital" width="1590" height="989" />
            </div>
            <figcaption>
              <span className="aab-portrait-name">Rohit Kumar</span>
              <span className="aab-portrait-role">Founder &amp; Mentor</span>
            </figcaption>
          </figure>
          <div className="aab-founder-copy">
            <p className="aab-kicker aab-kicker-dark"><span aria-hidden="true" />The person behind Alphira</p>
            <h2 id="founder-heading">Meet your<br /><span>trading mentor.</span></h2>
            <p>With years of market experience and a passion for teaching, our mission is to help traders understand the market with confidence, discipline, and proper risk management.</p>
            <blockquote className="aab-quote">
              <Quote size={22} aria-hidden="true" />
              <p>We focus on practical learning, real-world trading concepts, and developing a professional trader mindset rather than chasing shortcuts.</p>
            </blockquote>
            <div className="aab-founder-stats">
              <div><strong><Counter end={500} start={founderIn} />+</strong><span>Students guided</span></div>
              <div><strong><Counter end={5} start={founderIn} />+</strong><span>Years experience</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Mission & vision ---------- */}
      <section className="aab-section aab-beliefs" aria-label="Mission and vision">
        <div className="aab-shell aab-beliefs-grid">
          <Reveal as="article" className="aab-belief aab-belief-dark">
            <span className="aab-belief-n" aria-hidden="true">01</span>
            <p className="aab-kicker"><span aria-hidden="true" />Mission</p>
            <h2>Our Mission</h2>
            <p>Our mission is to simplify trading education and provide high-quality mentorship that helps students avoid common mistakes, manage risk effectively, and build a sustainable approach to trading.</p>
          </Reveal>
          <Reveal as="article" className="aab-belief">
            <span className="aab-belief-n" aria-hidden="true">02</span>
            <p className="aab-kicker aab-kicker-dark"><span aria-hidden="true" />Vision</p>
            <h2>Our Vision</h2>
            <p>We envision a community of disciplined traders who understand market psychology, risk management, and strategy execution rather than relying on speculation or shortcuts.</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Why Alphira ---------- */}
      <section ref={pathRef} className={`aab-section aab-path${pathIn ? " is-in" : ""}`} aria-labelledby="method-heading">
        <div className="aab-shell">
          <div className="aab-head">
            <div>
              <p className="aab-kicker aab-kicker-dark"><span aria-hidden="true" />Our approach</p>
              <h2 id="method-heading">Why choose<br /><span>Alphira Capital?</span></h2>
            </div>
            <Link to="/courses" className="aab-link">Explore the programs <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="aab-steps-wrap">
          <span className="aab-steps-line" aria-hidden="true"><i /></span>
          <ol className="aab-steps">
            {PRINCIPLES.map(({ n, icon: Icon, title, desc }, i) => (
              <li key={n} className="aab-step" style={{ "--i": i }}>
                <span className="aab-step-dot" aria-hidden="true"><Icon size={20} strokeWidth={1.8} /></span>
                <span className="aab-step-n">{n}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
