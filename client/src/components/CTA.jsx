import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowUpRight, ArrowRight, Phone } from "lucide-react";
import "./CTA.css";

const TRUST_ITEMS = ["Lifetime Access", "Premium Lessons", "Structured Mentorship"];
const STEPS = [
  { title: "Apply online", detail: "Share your details and the program you’re interested in." },
  { title: "Speak with our team", detail: "We call you to discuss batches, timings and fees." },
  { title: "Start your batch", detail: "Join classroom sessions with your mentor in Delhi NCR." },
];

export default function CTA() {
  const reducedMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: false,
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="aj-section" aria-labelledby="aj-title">
      <div className="aj-container">
        <div className="aj-layout">
          <motion.div {...reveal()} className="aj-copy">
            <p className="aj-eyebrow"><span aria-hidden="true" />Start Your Trading Journey</p>
            <h2 id="aj-title">Become a<br /><span>confident trader.</span></h2>
            <p className="aj-description">Learn practical trading strategies, market psychology, risk management and professional chart analysis through structured mentorship.</p>
            <div className="aj-actions">
              <Link to="/admission" className="aj-primary">Join Alphira Today <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link to="/courses" className="aj-secondary">Explore Courses <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
            <ul className="aj-trust">
              {TRUST_ITEMS.map((item) => <li key={item}><Check size={14} strokeWidth={2} aria-hidden="true" />{item}</li>)}
            </ul>
          </motion.div>

          <motion.div {...reveal(0.15)} className="aj-card">
            <p className="aj-card-kicker">How admission works</p>
            <ol className="aj-steps">
              {STEPS.map(({ title, detail }, index) => (
                <li key={title}><span className="aj-step-index" aria-hidden="true">{index + 1}</span><div><strong>{title}</strong><small>{detail}</small></div></li>
              ))}
            </ol>
            <a className="aj-call" href="tel:+919217222356"><Phone size={17} aria-hidden="true" /><span><small>Prefer to talk first?</small>+91 92172 22356</span><ArrowUpRight size={16} aria-hidden="true" /></a>
          </motion.div>
        </div>
        <motion.div {...reveal()} className="aj-footer"><span aria-hidden="true" /><p>Classroom batches across <strong>Delhi NCR</strong></p><span aria-hidden="true" /></motion.div>
      </div>
    </section>
  );
}


