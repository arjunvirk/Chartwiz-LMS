import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Check, TrendingUp } from "lucide-react";

const CountUpComponent = CountUp.default ?? CountUp;

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
    <section className="relative overflow-hidden bg-[#050607] py-16 text-white sm:py-20 lg:py-24">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-md sm:rounded-[3rem]"
        >
          <div className="grid items-center gap-12 p-6 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-20">
            {/* LEFT */}
            <div>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Start Your Trading Journey
              </span>

              <h2 className="text-balance mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Become A
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                  {" "}
                  Confident Trader
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
                Learn practical trading strategies, market psychology, risk
                management and professional chart analysis through structured
                mentorship designed for serious traders.
              </p>

              {/* BUTTONS */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/admission"
                  className="rounded-2xl bg-emerald-500 px-8 py-4 text-center text-sm font-bold text-black transition hover:scale-105 hover:bg-emerald-400"
                >
                  Join ChartWiz Today
                </Link>

                <Link
                  to="/courses"
                  className="rounded-2xl border border-white/15 bg-white/[0.02] px-8 py-4 text-center text-sm font-bold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/5"
                >
                  Explore Courses
                </Link>
              </div>

              {/* TRUST */}
              <div className="mt-8 flex flex-col gap-4 text-sm text-gray-400 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                {TRUST_ITEMS.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
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
              className="relative"
            >
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Student Growth</p>
                    <h3 className="mt-2 font-mono text-4xl font-extrabold text-emerald-400 sm:text-5xl">
                      +250%
                    </h3>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/20">
                    <TrendingUp size={28} />
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="mt-10">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Learning Progress
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      85%
                    </span>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                    />
                  </div>
                </div>

                {/* MINI CARDS */}
                <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
                  {MINI_STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-black/30 p-6"
                    >
                      <h4 className="font-mono text-3xl font-extrabold text-emerald-400">
                        <CountUpComponent
                          end={stat.value}
                          duration={2}
                          enableScrollSpy
                          scrollSpyOnce
                        />
                        {stat.suffix}
                      </h4>
                      <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM STRIP */}
          <div className="border-t border-white/10 bg-white/[0.02] px-5 py-8 backdrop-blur-md sm:px-10">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <h3 className="text-balance text-center font-display text-xl font-bold leading-relaxed sm:text-2xl lg:text-left">
                Trusted By Thousands Of Aspiring Traders Across India 🇮🇳
              </h3>

              <div className="flex flex-wrap items-center gap-8">
                {BOTTOM_STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <h4 className="font-mono text-3xl font-extrabold text-emerald-400">
                      <CountUpComponent
                        end={stat.value}
                        decimals={stat.decimals || 0}
                        duration={2}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                      {stat.suffix}
                    </h4>
                    <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
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
