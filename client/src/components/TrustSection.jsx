import { motion } from "framer-motion";
import CountUp from "react-countup";

const CountUpComponent = CountUp.default ?? CountUp;

const TRUST_CARDS = [
  {
    icon: "📈",
    title: "Practical Strategies",
    desc: "Learn real market strategies based on price action, structure, trend analysis and professional risk management.",
  },
  {
    icon: "🎯",
    title: "Beginner Friendly",
    desc: "Structured lessons designed for complete beginners to advanced traders with step-by-step guidance.",
  },
  {
    icon: "🧠",
    title: "Trading Psychology",
    desc: "Master emotional discipline, mindset control and risk handling to trade consistently.",
  },
  {
    icon: "🚀",
    title: "Lifetime Access",
    desc: "Access premium recorded mentorship anytime from anywhere with continuous updates and future lessons.",
  },
];

const STATS = [
  { value: 500, suffix: "+", label: "Active Students Across India" },
  { value: 120, suffix: "+", label: "Structured Trading Lessons" },
  { value: 24, suffix: "/7", label: "Unlimited Learning Access" },
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

const TrustSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#050607] py-24 text-white">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/[0.06] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Why Traders Trust ChartWiz
          </span>

          <h2 className="text-balance mt-6 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Learn Trading The
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Smart Way
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-400">
            We focus on practical trading education, risk management and
            psychology instead of fake promises and unrealistic income claims.
          </p>
        </motion.div>

        {/* TRUST CARDS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {TRUST_CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariant}
              className="group rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-emerald-500/25 hover:bg-white/[0.05]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.06] text-3xl transition duration-300 group-hover:bg-emerald-500 group-hover:text-black">
                {card.icon}
              </div>

              <h3 className="mt-8 font-display text-xl font-bold text-white">
                {card.title}
              </h3>

              <p className="mt-4 leading-relaxed text-gray-400">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* BOTTOM STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-8 py-10 backdrop-blur-md"
        >
          <div className="grid gap-10 text-center md:grid-cols-3">
            {STATS.map((stat) => (
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

export default TrustSection;
