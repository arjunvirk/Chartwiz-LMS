import { motion } from "motion/react";
import CountUp from "react-countup";

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

const CountUpComponent = CountUp.default ?? CountUp;

const BOTTOM_STATS = [
  { value: 21, suffix: "+", label: "Advanced Trading Strategies" },
  { value: 120, suffix: "+", label: "Structured Video Lessons" },
  { value: 24, suffix: "/7", label: "Lifetime Learning Access" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const TradingFeatures = () => {
  return (
    <section className="relative overflow-hidden bg-[#050607] py-24 text-white">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/6 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border border-white/10 bg-white/3 px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            What You Will Learn
          </span>

          <h2 className="text-balance mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Master The Core Of
            <span className="bg-linear-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Professional Trading
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-400">
            Learn practical market concepts, disciplined execution and advanced
            trading techniques through structured mentorship and premium
            education.
          </p>
        </motion.div>

        {/* FEATURES GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariant}
              className="group rounded-[2.5rem] border border-white/10 bg-white/3 p-8 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-emerald-500/25 hover:bg-white/5"
            >
              {/* ICON */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/6 text-3xl transition duration-300 group-hover:bg-emerald-500 group-hover:text-black">
                {feature.icon}
              </div>

              {/* TITLE */}
              <h3 className="mt-7 font-display text-2xl font-bold leading-tight">
                {feature.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-4 leading-relaxed text-gray-400">
                {feature.description}
              </p>

              {/* BOTTOM */}
              <div className="mt-7 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs font-medium tracking-wide text-emerald-400">
                  PROFESSIONAL MENTORSHIP
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* BOTTOM STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-[2.5rem] border border-white/10 bg-white/3 p-10 backdrop-blur-md"
        >
          <div className="grid gap-10 text-center md:grid-cols-3">
            {BOTTOM_STATS.map((stat) => (
              <div key={stat.label}>
                <h3 className="font-mono text-4xl font-bold text-emerald-400 md:text-5xl">
                  <CountUpComponent
                    end={stat.value}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  {stat.suffix}
                </h3>
                <p className="mt-3 text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TradingFeatures;
