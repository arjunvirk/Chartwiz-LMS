import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowUpRight, ArrowRight, Phone, MapPin, Mail } from "lucide-react";
import "./CTA.css";

const CYCLE_MS = 5600;
const TRUST_ITEMS = ["Lifetime access", "Premium lessons", "Structured mentorship"];
const PROGRAMS = ["Forex", "Indian markets", "Crypto", "Order flow"];
const STEPS = [
  { id: "apply", title: "Apply online", detail: "Share your details and the program you’re interested in." },
  { id: "call", title: "Speak with our team", detail: "We call you to discuss batches, timings and fees." },
  { id: "start", title: "Start your batch", detail: "Join classroom sessions with your mentor in Delhi NCR." },
];

/* ---------- Stage scenes (decorative mock UI) ---------- */
function ApplyScene() {
  return (
    <div className="aj-scene aj-scene-apply">
      <p className="aj-mock-title">Admission form</p>
      <div className="aj-field-row">
        <div className="aj-field">
          <span>Full name</span>
          <strong><span className="aj-typed">Aarav Sharma</span><i className="aj-caret" /></strong>
        </div>
        <div className="aj-field">
          <span>Phone</span>
          <strong className="aj-muted">+91 ••••• •••••</strong>
        </div>
      </div>
      <div className="aj-field aj-field-chips">
        <span>Program</span>
        <div className="aj-chips">
          {PROGRAMS.map((p, i) => <em key={p} className={i === 0 ? "is-picked" : ""}>{p}</em>)}
        </div>
      </div>
      <div className="aj-submit"><span>Submit application</span><ArrowRight size={15} /></div>
    </div>
  );
}

function CallScene() {
  return (
    <div className="aj-scene aj-scene-call">
      <div className="aj-caller">
        <span className="aj-ring" /><span className="aj-ring aj-ring-2" />
        <span className="aj-caller-icon"><Phone size={20} /></span>
      </div>
      <p className="aj-caller-name">Alphira admissions</p>
      <p className="aj-caller-sub">+91 92172 22356 · calling you</p>
      <ul className="aj-topics">
        {["Program fit", "Batch timings", "Fees"].map((t, i) => (
          <li key={t} style={{ "--i": i }}><Check size={13} strokeWidth={2.4} />{t}</li>
        ))}
      </ul>
    </div>
  );
}

function StartScene() {
  return (
    <div className="aj-scene aj-scene-start">
      <div className="aj-ticket">
        <div className="aj-ticket-top">
          <svg viewBox="0 0 40 40" className="aj-seal"><circle cx="20" cy="20" r="18" /><path d="M12 20.5 L18 26 L28 14" pathLength="1" /></svg>
          <div>
            <p className="aj-ticket-kicker">Admission confirmed</p>
            <p className="aj-ticket-title">Forex trading program</p>
          </div>
        </div>
        <dl className="aj-ticket-rows">
          <div><dt>Format</dt><dd>Classroom batch</dd></div>
          <div><dt>Location</dt><dd>Delhi NCR</dd></div>
          <div><dt>Mentorship</dt><dd>Mentor-led</dd></div>
          <div><dt>Lessons</dt><dd>Lifetime access</dd></div>
        </dl>
      </div>
    </div>
  );
}

const SCENES = { apply: ApplyScene, call: CallScene, start: StartScene };

export default function CTA() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return undefined;
    const on = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) { setVisible(true); setSeen(true); return undefined; }
    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setSeen(true);
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = visible && !reducedMotion && !paused;
  useEffect(() => {
    if (!autoplay) return undefined;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % STEPS.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [active, autoplay]);

  return (
    <section ref={sectionRef} className={`aj-section${seen ? " is-in" : ""}${visible ? " is-visible" : ""}`} aria-labelledby="aj-title">
      <div className="aj-container">
        <div className="aj-layout">
          <div className="aj-copy">
            <p className="aj-eyebrow"><span aria-hidden="true" />Start your trading journey</p>
            <h2 id="aj-title"><span className="aj-line">Become a</span><span className="aj-line aj-line-accent">confident trader.</span></h2>
            <p className="aj-description">Learn practical trading strategies, market psychology, risk management and professional chart analysis through structured mentorship.</p>
            <div className="aj-actions">
              <Link to="/admission" className="aj-primary"><span>Join Alphira today</span><ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link to="/courses" className="aj-secondary"><span>Explore courses</span><ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
            <ul className="aj-trust">
              {TRUST_ITEMS.map((item) => <li key={item}><span aria-hidden="true"><Check size={12} strokeWidth={2.6} /></span>{item}</li>)}
            </ul>
            <div className="aj-programs">
              <p>Programs</p>
              <ul>{PROGRAMS.map((p) => <li key={p}><Link to="/courses">{p}</Link></li>)}</ul>
            </div>
          </div>

          <div
            className="aj-device"
            onFocus={(e) => { if (e.target.matches?.(":focus-visible")) setPaused(true); }}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
          >
            <div className="aj-device-bar">
              <p>How admission works</p>
              <span aria-hidden="true">{String(active + 1).padStart(2, "0")} <i>/</i> 03</span>
            </div>

            <div className="aj-stage" aria-hidden="true">
              {STEPS.map(({ id }, i) => {
                const Scene = SCENES[id];
                return (
                  <div key={id} className={`aj-stage-item${i === active ? " is-active" : ""}`}>
                    {/* Re-keying on activation remounts the scene so its animation replays. */}
                    <Scene key={i === active ? `on-${active}` : "off"} />
                  </div>
                );
              })}
            </div>

            <ol className="aj-steps">
              {STEPS.map(({ id, title, detail }, i) => (
                <li key={id}>
                  <button type="button" className={`aj-step${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`} aria-pressed={i === active} onClick={() => setActive(i)}>
                    <span className="aj-step-index" aria-hidden="true">{i < active ? <Check size={13} strokeWidth={2.6} /> : i + 1}</span>
                    <span className="aj-step-text"><strong>{title}</strong><small>{detail}</small></span>
                    <span className="aj-step-bar" aria-hidden="true">
                      {i === active && <i key={`${active}-${autoplay}`} className={autoplay ? "is-running" : ""} style={{ animationDuration: `${CYCLE_MS}ms` }} />}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <a className="aj-call" href="tel:+919217222356">
              <span className="aj-call-icon" aria-hidden="true"><Phone size={16} /></span>
              <span className="aj-call-text"><small>Prefer to talk first?</small>+91 92172 22356</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="aj-footer">
          <p><MapPin size={15} aria-hidden="true" /><span>Classroom batches across <strong>Delhi NCR</strong> · Rohini, Delhi 110085</span></p>
          <a href="mailto:contact.alphiracapital@gmail.com"><Mail size={15} aria-hidden="true" />contact.alphiracapital@gmail.com</a>
        </div>
      </div>
    </section>
  );
}
