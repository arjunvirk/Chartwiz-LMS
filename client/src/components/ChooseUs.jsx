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
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ChooseUs = () => {
  return (
    <section className="bg-vellum py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* SECTION HEADING GROUP */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
            Why Choose ChartWiz
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-graphite md:text-5xl">
            Built for serious traders
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Our mentorship is designed to help you understand the market deeply,
            build discipline and develop professional trading skills step by
            step.
          </p>
        </motion.div>

        {/* ASYMMETRIC GRID: bigger left, smaller right */}
        <div className="mt-16 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          {/* LEFT BIG CARD */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="rounded-3xl bg-bone p-10"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-obsidian text-3xl">
              📊
            </div>
            <h3 className="mt-8 font-serif text-3xl leading-tight text-graphite">
              Real Market Education
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate">
              Learn how professional traders analyze charts, manage risks,
              identify high probability setups and build consistent trading
              systems instead of relying on random signals.
            </p>

            <div className="mt-8 space-y-4">
              {CHECKLIST.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ember-orange/15 text-ember-orange">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-graphite">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-sm text-slate">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className="grid gap-3">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={2}
              className="rounded-3xl bg-bone p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-obsidian text-2xl">
                🎥
              </div>
              <h3 className="mt-6 text-xl font-semibold text-graphite">
                Premium Recorded Lessons
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Access high-quality recorded mentorship anytime with lifetime
                learning flexibility.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={3}
              className="rounded-3xl bg-obsidian p-8 text-vellum"
            >
              <h3 className="font-serif text-2xl leading-tight">
                Learn. Practice. Grow.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                ChartWiz helps aspiring traders transform confusion into clarity
                through professional mentorship.
              </p>
              <Link
                to="/admission"
                className="mt-6 inline-flex items-center justify-center rounded-[600px] bg-ember-orange px-6 py-3 font-mono text-xs font-medium text-black transition hover:brightness-95"
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
