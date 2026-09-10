import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp, Target, Brain, Infinity as InfinityIcon } from "lucide-react";
import "./TrustSection.css";

const TRUST_CARDS = [
  {
    icon: TrendingUp,
    title: "Practical Strategies",
    desc: "Learn real market strategies based on price action, structure, trend analysis and professional risk management.",
  },
  {
    icon: Target,
    title: "Beginner Friendly",
    desc: "Structured lessons designed for complete beginners to advanced traders with step-by-step guidance.",
  },
  {
    icon: Brain,
    title: "Trading Psychology",
    desc: "Master emotional discipline, mindset control and risk handling to trade consistently.",
  },
  {
    icon: InfinityIcon,
    title: "Lifetime Access",
    desc: "Access premium recorded mentorship anytime from anywhere with continuous updates and future lessons.",
  },
];

export default function TrustSection() {
  const reducedMotion = useReducedMotion();
  const cardVariant = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="at-section" aria-labelledby="at-title">
      <div className="at-container">
        <motion.div
          className="at-heading"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
        >
          <div className="at-heading-main">
            <p className="at-eyebrow"><span aria-hidden="true" />Why Traders Trust Alphira</p>
            <h2 id="at-title">Learn trading<br /><span>the smart way.</span></h2>
          </div>
          <p className="at-intro">We focus on practical trading education, risk management and psychology instead of fake promises and unrealistic income claims.</p>
        </motion.div>

        <motion.div
          className="at-grid"
          variants={{ hidden: {}, show: { transition: { staggerChildren: reducedMotion ? 0 : 0.08 } } }}
          initial={reducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {TRUST_CARDS.map(({ icon: Icon, title, desc }, index) => (
            <motion.article key={title} className="at-card" variants={reducedMotion ? undefined : cardVariant}>
              <div className="at-card-top">
                <span className="at-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.5} /></span>
                <span className="at-number" aria-hidden="true">0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="at-card-rule" aria-hidden="true"><span /></div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
