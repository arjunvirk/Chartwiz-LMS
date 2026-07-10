import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const CHECKLIST = [
  {
    title: "Step-by-Step Learning",
    desc: "Structured roadmap from beginner to advanced trader.",
  },
  {
    title: "Risk Management Focus",
    desc: "Protect your capital with professional risk strategies.",
  },
  {
    title: "Psychology & Discipline",
    desc: "Build emotional control and decision-making consistency.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-[#050607] py-24 text-white">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/6 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* TOP */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border border-white/10 bg-white/3 px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Why Choose ChartWiz
          </span>

          <h2 className="text-balance mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Built For Serious
            <span className="bg-linear-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Traders
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-400">
            Our mentorship is designed to help you understand the market deeply,
            build discipline and develop professional trading skills step by
            step.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {/* LEFT BIG CARD */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="rounded-[2.5rem] border border-white/10 bg-white/3 p-10 backdrop-blur-md transition duration-300 hover:border-emerald-500/25 hover:bg-white/5"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-3xl shadow-lg shadow-emerald-500/20">
              📊
            </div>

            <h3 className="mt-8 font-display text-3xl font-bold md:text-4xl">
              Real Market Education
            </h3>

            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              Learn how professional traders analyze charts, manage risks,
              identify high probability setups and build consistent trading
              systems instead of relying on random signals.
            </p>

            <div className="mt-10 space-y-5">
              {CHECKLIST.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT GRID */}
          <div className="grid gap-8">
            {/* CARD */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={2}
              className="rounded-[2.5rem] border border-white/10 bg-white/3 p-8 backdrop-blur-md transition duration-300 hover:border-emerald-500/25 hover:bg-white/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/6 text-2xl">
                🎥
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">
                Premium Recorded Lessons
              </h3>
              <p className="mt-3 leading-relaxed text-gray-400">
                Access high-quality recorded mentorship anytime with lifetime
                learning flexibility.
              </p>
            </motion.div>

            {/* CARD */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={3}
              className="rounded-[2.5rem] border border-white/10 bg-white/3 p-8 backdrop-blur-md transition duration-300 hover:border-emerald-500/25 hover:bg-white/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/6 text-2xl">
                📚
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">
                Structured Learning Path
              </h3>
              <p className="mt-3 leading-relaxed text-gray-400">
                Follow a clear roadmap covering basics, strategies, psychology
                and advanced market concepts.
              </p>
            </motion.div>

            {/* CTA CARD */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={4}
              className="rounded-[2.5rem] border border-emerald-400/20 bg-linear-to-br from-emerald-500 to-emerald-600 p-8 text-black shadow-2xl shadow-emerald-500/20"
            >
              <h3 className="font-display text-2xl font-extrabold">
                Learn. Practice. Grow.
              </h3>
              <p className="mt-3 leading-relaxed text-black/75">
                ChartWiz helps aspiring traders transform confusion into clarity
                through professional mentorship and market understanding.
              </p>
              <Link
                to="/admission"
                className="mt-8 inline-flex items-center justify-center rounded-2xl bg-black px-8 py-4 text-sm font-bold text-white transition hover:scale-[1.03] hover:bg-black/85"
              >
                Join ChartWiz Today
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
