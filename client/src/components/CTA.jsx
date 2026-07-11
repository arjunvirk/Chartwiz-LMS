import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUpImport from "react-countup";
import { Check, TrendingUp } from "lucide-react";

const CountUp = CountUpImport.default ?? CountUpImport;

const TRUST_ITEMS = [
  "Lifetime Access",
  "Premium Lessons",
  "Structured Mentorship",
];
const MINI_STATS = [
  { value: 500, suffix: "+", label: "Active Students" },
  { value: 120, suffix: "+", label: "Premium Lessons" },
];
const BOTTOM_STATS = [
  { value: 4.9, suffix: "★", label: "Student Rating", decimals: 1 },
  { value: 24, suffix: "/7", label: "Lifetime Access" },
  { value: 21, suffix: "+", label: "Trading Strategies" },
];

const CTA = () => {
  return (
    <section className="bg-vellum py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl bg-obsidian"
        >
          <div className="grid items-center gap-12 p-6 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-16">
            {/* LEFT */}
            <div>
              <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
                Start Your Trading Journey
              </span>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-vellum sm:text-5xl">
                Become a confident trader
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist">
                Learn practical trading strategies, market psychology, risk
                management and professional chart analysis through structured
                mentorship.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/admission"
                  className="rounded-[600px] bg-ember-orange px-8 py-3.5 text-center font-mono text-sm font-medium text-black transition hover:brightness-95"
                >
                  Join ChartWiz Today
                </Link>
                <Link
                  to="/courses"
                  className="rounded-[600px] border border-white/15 px-8 py-3.5 text-center font-mono text-sm font-medium text-vellum transition hover:border-white/30"
                >
                  Explore Courses
                </Link>
              </div>

              <div className="mt-8 flex flex-col gap-3 text-sm text-mist sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                {TRUST_ITEMS.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ember-orange/15 text-ember-orange">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl border border-white/10 p-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-mist">Student Growth</p>
                  <h3 className="mt-2 font-mono text-4xl font-medium text-vellum">
                    +250%
                  </h3>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-ember-orange text-black">
                  <TrendingUp size={24} />
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-mist">Learning Progress</span>
                  <span className="font-mono text-xs font-medium text-vellum">
                    85%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                    className="h-full rounded-full bg-ember-orange"
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {MINI_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 p-5"
                  >
                    <h4 className="font-mono text-2xl font-medium text-vellum">
                      <CountUp
                        end={stat.value}
                        duration={2}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                      {stat.suffix}
                    </h4>
                    <p className="mt-1 text-xs text-mist">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* BOTTOM STRIP */}
          <div className="border-t border-white/10 px-5 py-8 sm:px-10">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <h3 className="text-center font-serif text-xl leading-relaxed text-vellum lg:text-left">
                Trusted by thousands of aspiring traders across India
              </h3>
              <div className="flex flex-wrap items-center gap-8">
                {BOTTOM_STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <h4 className="font-mono text-2xl font-medium text-vellum">
                      <CountUp
                        end={stat.value}
                        decimals={stat.decimals || 0}
                        duration={2}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                      {stat.suffix}
                    </h4>
                    <p className="mt-1 text-xs text-mist">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
