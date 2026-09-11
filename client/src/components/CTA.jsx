import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import CountUpImport from "react-countup";
import { Check, TrendingUp, ArrowUpRight, ArrowRight } from "lucide-react";
import "./CTA.css";

const CountUp = CountUpImport.default ?? CountUpImport;
const TRUST_ITEMS = ["Lifetime Access", "Premium Lessons", "Structured Mentorship"];
const MINI_STATS = [
  { value: 500, suffix: "+", label: "Active Students" },
  { value: 120, suffix: "+", label: "Premium Lessons" },
];

export default function CTA() {
  const reducedMotion = useReducedMotion();
  const progressRef = useRef(null);
  const [progressVisible, setProgressVisible] = useState(false);

  useEffect(() => {
    const target = progressRef.current;
    if (!target) return;
    if (!("IntersectionObserver" in window)) {
      setProgressVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setProgressVisible(entry.isIntersecting);
    }, { threshold: 0 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 20 },
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
            <div className="aj-card-heading">
              <div><p>Student Growth</p><strong>+95%</strong></div>
              <span className="aj-growth-icon" aria-hidden="true"><TrendingUp size={26} strokeWidth={1.5} /></span>
            </div>
            <div className="aj-progress-label"><span id="aj-progress-label">Learning Progress</span><span>85%</span></div>
            <div ref={progressRef} className={`aj-progress${progressVisible ? " aj-progress-visible" : ""}`} role="progressbar" aria-labelledby="aj-progress-label" aria-valuemin={0} aria-valuemax={100} aria-valuenow={85}>
              <div className="aj-progress-fill" />
            </div>
            <div className="aj-stats">
              {MINI_STATS.map((stat) => <div key={stat.label}>
                <strong>{reducedMotion ? stat.value : <CountUp end={stat.value} duration={2} enableScrollSpy scrollSpyOnce />}{stat.suffix}</strong>
                <span>{stat.label}</span>
              </div>)}
            </div>
          </motion.div>
        </div>
        <motion.div {...reveal()} className="aj-footer"><span aria-hidden="true" /><p>Trusted by several students across <strong>DELHI NCR</strong></p><span aria-hidden="true" /></motion.div>
      </div>
    </section>
  );
}

