import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp, Zap, Brain, Shield, Layers, Activity } from "lucide-react";
import "./TradingFeatures.css";

const FEATURES = [
  { id: 1, icon: TrendingUp, title: "Price Action Trading", description: "Learn support resistance, trend structure, breakout setups and candlestick psychology used by professional traders." },
  { id: 2, icon: Zap, title: "Scalping Strategies", description: "Master fast intraday trading setups with proper risk management and disciplined execution techniques." },
  { id: 3, icon: Brain, title: "Trading Psychology", description: "Develop emotional control, confidence and decision making abilities to avoid fear and overtrading." },
  { id: 4, icon: Shield, title: "Risk Management", description: "Protect your trading capital with professional position sizing and advanced risk control systems." },
  { id: 5, icon: Layers, title: "Options Trading", description: "Understand Greeks, expiry trading, option buying, selling and advanced strategies with real examples." },
  { id: 6, icon: Activity, title: "Swing Trading", description: "Identify high probability swing trades using trend continuation and momentum-based setups." },
];

export default function TradingFeatures() {
  const reducedMotion = useReducedMotion();
  const cardVariant = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="af-section" aria-labelledby="af-title">
      <div className="af-container">
        <motion.div
          className="af-heading"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
        >
          <div>
            <p className="af-eyebrow"><span aria-hidden="true" />What You Will Learn</p>
            <h2 id="af-title">Master the core of<br /><span>professional trading.</span></h2>
          </div>
          <p className="af-intro">Learn practical market concepts, disciplined execution and advanced trading techniques through structured mentorship.</p>
        </motion.div>

        <motion.div
          className="af-grid"
          variants={{ hidden: {}, show: { transition: { staggerChildren: reducedMotion ? 0 : 0.07 } } }}
          initial={reducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {FEATURES.map(({ id, icon: Icon, title, description }) => (
            <motion.article className="af-topic" key={id} variants={reducedMotion ? undefined : cardVariant}>
              <div className="af-topic-top"><span className="af-icon" aria-hidden="true"><Icon size={26} strokeWidth={1.5} /></span><span className="af-number" aria-hidden="true">0{id}</span></div>
              <h3>{title}</h3>
              <p className="af-description">{description}</p>
              <div className="af-mentorship"><span aria-hidden="true" />Professional Mentorship</div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
