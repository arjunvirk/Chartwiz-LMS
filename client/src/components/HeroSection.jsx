import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Marquee from "react-fast-marquee";
import CountUp from "react-countup";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

const MarqueeComponent = Marquee.default ?? Marquee;
const CountUpComponent = CountUp.default ?? CountUp;

console.log({
  motionDiv: motion.div,
  motionPath: motion.path,
  Marquee,
  CountUp,
});

const TICKER_DATA = [
  { pair: "EUR/USD", price: "1.0842", change: "+0.24%", up: true },
  { pair: "BTC/USDT", price: "64,215", change: "+2.10%", up: true },
  { pair: "GBP/JPY", price: "198.34", change: "-0.11%", up: false },
  { pair: "XAU/USD", price: "2,381.6", change: "+0.87%", up: true },
  { pair: "USD/INR", price: "83.42", change: "-0.05%", up: false },
  { pair: "ETH/USDT", price: "3,412", change: "+1.63%", up: true },
];

const STATS = [
  { value: 500, suffix: "+", label: "Students Enrolled" },
  { value: 120, suffix: "+", label: "Premium Lessons" },
  { value: 15, suffix: "+", label: "Trading Strategies" },
  { value: 24, suffix: "/7", label: "Learning Access" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#050607] text-white">
      {/* BACKGROUND GRADIENT + GLOW */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.15),transparent)]" />
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-emerald-400/5 blur-[120px]" />

      {/* SIGNATURE: animated chart line */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-24 h-64 w-full opacity-30"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M0,150 L100,120 L200,140 L300,80 L400,100 L500,50 L600,90 L700,40 L800,70 L900,20 L1000,55 L1100,15 L1200,45"
          stroke="url(#heroLine)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="1" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* CONTENT */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
        {/* BADGE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-5 py-2 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-xs font-medium tracking-wide text-emerald-400">
            INDIA'S PROFESSIONAL OFFLINE TRADING ACADEMY
          </span>
        </motion.div>

        {/* HEADING */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-balance max-w-5xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl"
        >
          Become a{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
            Consistent Trader
          </span>
          <br />
          With Expert Mentorship
        </motion.h1>

        {/* FEATURE PILLS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {[
            "Live Offline Classes",
            "Practical Market Sessions",
            "Mentor Support",
            "Beginner Friendly",
          ].map((item) => (
            <div
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300"
            >
              {item}
            </div>
          ))}
        </motion.div>

        {/* BUTTONS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-14 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            to="/register"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 text-sm font-bold text-black transition hover:bg-emerald-400"
          >
            Enroll in Next Batch
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/courses"
            className="rounded-2xl border border-white/15 bg-white/[0.02] px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/5"
          >
            View Course Curriculum
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-5 font-mono text-xs tracking-wide text-amber-400/90"
        >
          LIMITED SEATS · NEXT OFFLINE BATCH STARTING SOON
        </motion.p>

        {/* STATS */}
        <div className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition hover:-translate-y-1 hover:border-emerald-500/20 hover:bg-white/[0.05]"
            >
              <h2 className="font-mono text-4xl font-bold text-emerald-400">
                <CountUpComponent
                  end={stat.value}
                  duration={2}
                  enableScrollSpy
                  scrollSpyOnce
                />
                {stat.suffix}
              </h2>
              <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIVE TICKER MARQUEE */}
      <div className="relative border-y border-white/10 bg-white/[0.02] py-4">
        <MarqueeComponent gradient={false} speed={40} pauseOnHover>
          {TICKER_DATA.map((item, i) => (
            <div
              key={i}
              className="mx-6 flex items-center gap-3 font-mono text-sm"
            >
              <span className="font-semibold text-white">{item.pair}</span>
              <span className="text-gray-400">{item.price}</span>
              <span
                className={`flex items-center gap-1 ${
                  item.up ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {item.up ? (
                  <TrendingUp size={13} />
                ) : (
                  <TrendingDown size={13} />
                )}
                {item.change}
              </span>
            </div>
          ))}
        </MarqueeComponent>
      </div>

      {/* BOTTOM TRUST TEXT */}
      <div className="relative bg-[#050607] py-6 text-center">
        <p className="text-xs tracking-wide text-gray-500">
          Offline Classroom Training · Real Market Practice · Expert Mentorship
          · Trusted by Future Traders Across India 🇮🇳
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
