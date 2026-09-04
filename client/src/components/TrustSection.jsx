import { motion } from "framer-motion";
import CountUpImport from "react-countup";

const CountUp = CountUpImport.default ?? CountUpImport;

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

const TrustSection = () => {
  return (
    <section className="relative z-10 rounded-t-[2.5rem] bg-vellum py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
            Why Traders Trust Alphira
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-graphite md:text-5xl">
            Learn trading the smart way
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            We focus on practical trading education, risk management and
            psychology instead of fake promises and unrealistic income claims.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-3 md:grid-cols-2 xl:grid-cols-4"
        >
          {TRUST_CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariant}
              className="rounded-3xl bg-bone p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-obsidian text-2xl">
                {card.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-graphite">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
