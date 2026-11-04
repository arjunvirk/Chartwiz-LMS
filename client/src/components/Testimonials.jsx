import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import anandMalhotra from "../assets/anand_malhotra.jpeg";
import varunMalhotra from "../assets/varun_malhotra.jpeg";
import lalitKumar from "../assets/lalit_kumar.jpeg";
import "./Testimonials.css";

const CYCLE_MS = 8000;

const TESTIMONIALS = [
  { id: "anand", name: "Anand Malhotra", role: "Options trader", image: anandMalhotra, focus: "45% 28%", highlight: "Far more disciplined", review: "Alphira completely changed the way I understand the market. The structured mentorship and psychology lessons helped me become far more disciplined in trading." },
  { id: "varun", name: "Varun Malhotra", role: "Swing trader", image: varunMalhotra, focus: "50% 30%", highlight: "Practical and beginner friendly", review: "The price action course is extremely practical and beginner friendly. I finally understand market structure and risk management properly." },
  { id: "lalit", name: "Lalit Kumar", role: "Swing trader", image: lalitKumar, focus: "64% 30%", highlight: "Learn from scratch", review: "Alphira Capital is one of the best institutes for anyone looking to learn stock market trading and investing from scratch." },
];

const Stars = () => (
  <span className="ar-stars" role="img" aria-label="Rated 5 out of 5">
    {Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} strokeWidth={0} fill="currentColor" aria-hidden="true" />)}
  </span>
);

export default function Testimonials() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) { setVisible(true); return undefined; }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = visible && !reducedMotion && !paused;
  useEffect(() => {
    if (!autoplay) return undefined;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % count), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [active, autoplay, count]);

  const go = useCallback((i) => setActive(((i % count) + count) % count), [count]);
  const t = TESTIMONIALS[active];
  const fade = reducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section
      ref={sectionRef}
      className="ar-section"
      aria-labelledby="ar-title"
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(active + 1); if (e.key === "ArrowLeft") go(active - 1); }}
      onFocus={(e) => { if (e.target.matches?.(":focus-visible")) setPaused(true); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
    >
      <div className="ar-container">
        <div className="ar-heading">
          <div>
            <p className="ar-eyebrow"><span aria-hidden="true" />Student stories</p>
            <h2 id="ar-title">Trusted by<br /><span>aspiring traders.</span></h2>
          </div>
          <p className="ar-intro">Students from our classroom batches in Delhi NCR on what changed in the way they trade.</p>
        </div>

        <div className="ar-feature" aria-roledescription="carousel" aria-label="Student testimonials">
          <div className="ar-portrait">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={t.id}
                src={t.image}
                alt={`${t.name}, Alphira Capital student`}
                style={{ objectPosition: t.focus }}
                initial={reducedMotion ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                decoding="async"
              />
            </AnimatePresence>
            <span className="ar-portrait-tag"><Stars /> 5.0</span>
          </div>

          <div className="ar-story" aria-live="polite">
            <span className="ar-mark" aria-hidden="true">“</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure key={t.id} className="ar-figure" {...fade}>
                <p className="ar-highlight">{t.highlight}</p>
                <blockquote><p>{t.review}</p></blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role} · Alphira Capital student</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="ar-controls">
              <div className="ar-progress" aria-hidden="true">
                {TESTIMONIALS.map((item, i) => (
                  <span key={item.id} className={i === active ? "is-active" : i < active ? "is-done" : ""}>
                    {i === active && <i key={`${active}-${autoplay}`} className={autoplay ? "is-running" : ""} style={{ animationDuration: `${CYCLE_MS}ms` }} />}
                  </span>
                ))}
              </div>
              <span className="ar-count" aria-hidden="true">{String(active + 1).padStart(2, "0")} <i>/</i> {String(count).padStart(2, "0")}</span>
              <div className="ar-arrows">
                <button type="button" onClick={() => go(active - 1)} aria-label="Previous testimonial"><ArrowLeft size={18} /></button>
                <button type="button" onClick={() => go(active + 1)} aria-label="Next testimonial"><ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>

        <ul className="ar-roster" aria-label="Choose a testimonial">
          {TESTIMONIALS.map((item, i) => (
            <li key={item.id}>
              <button type="button" className={`ar-pick${i === active ? " is-active" : ""}`} aria-pressed={i === active} onClick={() => go(i)}>
                <img src={item.image} alt="" style={{ objectPosition: item.focus }} loading="lazy" decoding="async" />
                <span className="ar-pick-text">
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </span>
                <span className="ar-pick-quote">“{item.highlight}”</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
