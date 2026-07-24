import { motion } from "framer-motion";
import CountUpImport from "react-countup";

const CountUp = CountUpImport.default ?? CountUpImport;

const FEATURES = [
  {
    id: 1,
    icon: "📈",
    title: "Price Action Trading",
    description:
      "Learn support resistance, trend structure, breakout setups and candlestick psychology used by professional traders.",
  },
  {
    id: 2,
    icon: "⚡",
    title: "Scalping Strategies",
    description:
      "Master fast intraday trading setups with proper risk management and disciplined execution techniques.",
  },
  {
    id: 3,
    icon: "🧠",
    title: "Trading Psychology",
    description:
      "Develop emotional control, confidence and decision making abilities to avoid fear and overtrading.",
  },
  {
    id: 4,
    icon: "🛡️",
    title: "Risk Management",
    description:
      "Protect your trading capital with professional position sizing and advanced risk control systems.",
  },
  {
    id: 5,
    icon: "📊",
    title: "Options Trading",
    description:
      "Understand Greeks, expiry trading, option buying, selling and advanced strategies with real examples.",
  },
  {
    id: 6,
    icon: "🚀",
    title: "Swing Trading",
    description:
      "Identify high probability swing trades using trend continuation and momentum-based setups.",
  },
];

const BOTTOM_STATS = [
  { value: 21, suffix: "+", label: "Advanced Trading Strategies" },
  { value: 120, suffix: "+", label: "Structured Video Lessons" },
  { value: 24, suffix: "/7", label: "Lifetime Learning Access" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const TradingFeatures = () => {
  return (
    <section className="bg-vellum py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
            What You Will Learn
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-graphite md:text-5xl">
            Master the core of professional trading
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Learn practical market concepts, disciplined execution and advanced
            trading techniques through structured mentorship.
          </p>
        </motion.div>

        {/* 3-COL GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-3 md:grid-cols-2 xl:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariant}
              className="rounded-3xl bg-bone p-8 transition duration-300 hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-obsidian text-2xl">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-graphite">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {feature.description}
              </p>
              <div className="mt-6 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-ember-orange" />
                <span className="font-mono text-[11px] uppercase tracking-[-0.02em] text-ember-orange">
                  Professional Mentorship
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        
      </div>
    </section>
  );
};

export default TradingFeatures;
