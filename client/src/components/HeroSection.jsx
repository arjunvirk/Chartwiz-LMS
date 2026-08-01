import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUpImport from "react-countup";
import MarqueeImport from "react-fast-marquee";
import { Users, Star, ArrowUpRight } from "lucide-react";
import { useMarketTicker } from "../hooks/useMarketTicker";
import { useSectionPin } from "../hooks/useSectionPin";

const CountUp = CountUpImport.default ?? CountUpImport;
const Marquee = MarqueeImport.default ?? MarqueeImport;

// Candle heights (%) + direction — purely decorative, no data dependency
const CANDLES = [
  { h: 38, up: true },
  { h: 55, up: true },
  { h: 42, up: false },
  { h: 68, up: true },
  { h: 50, up: false },
  { h: 78, up: true },
  { h: 60, up: false },
  { h: 88, up: true },
  { h: 70, up: true },
  { h: 95, up: true },
  { h: 82, up: false },
  { h: 100, up: true },
  { h: 90, up: true },
  { h: 72, up: false },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: delay * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const revealCard = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const HeroSection = () => {
  const tickerData = useMarketTicker();
  const heroRef = useSectionPin();

  return (
    <section
      ref={heroRef}
      className="relative mt-3 overflow-hidden bg-[#090909] text-white md:mt-6 lg:mt-10"
    >
      {/* Main Orange Glow */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle at 50% 12%, rgba(234,118,38,.17), transparent 34%), radial-gradient(circle at 90% 55%, rgba(234,118,38,.06), transparent 25%), rgba(0,0,0,.55)",
        }}
      />

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 md:px-8 md:pb-24 md:pt-28 lg:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          {/* ============ LEFT: CONTENT ============ */}
          <div className="mt-6 md:mt-0">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-5 inline-flex w-fit max-w-full items-center rounded-full border border-[#EA7626]/40 bg-[#EA7626]/10 px-3 py-2 backdrop-blur-md sm:mb-6 sm:px-4"
            >
              <span className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EA7626] shadow-[0_0_10px_rgba(234,118,38,.9)] sm:h-2 sm:w-2" />
              <span className="font-mono text-[9px] uppercase leading-4 tracking-[0.12em] text-[#EA7626] sm:text-[10px] sm:tracking-[0.16em] md:text-xs md:tracking-[0.18em]">
                Delhi NCR Professional Offline Trading Academy
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="max-w-xl text-[2.35rem] font-bold leading-[1.08] tracking-[-0.035em] sm:text-5xl sm:leading-[1.06] md:text-[3.6rem] lg:text-[3.4rem] xl:text-7xl"
            >
              Trade the Markets
              <br className="hidden sm:block" />
              <span className="mt-1 block bg-gradient-to-r from-[#EA7626] via-[#f18b45] to-[#EA7626] bg-clip-text text-transparent sm:mt-0">
                Like a Professional
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-6 max-w-lg text-[15px] leading-7 text-gray-300 sm:mt-7 sm:text-base sm:leading-8 md:mt-8 md:text-lg"
            >
              Structured offline education in technical analysis, risk
              management and trading psychology — taught by mentors, not
              YouTube tutorials.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4 md:mt-12 md:gap-5"
            >
              <Link
                to="/admission"
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#EA7626] px-7 py-3.5 text-center text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(234,118,38,.45)] sm:px-8 sm:py-4 sm:text-base md:px-9"
              >
                <span className="relative z-10">Enroll in Next Batch</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>

              <Link
                to="/courses"
                className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-center text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:border-[#EA7626]/70 hover:bg-[#EA7626]/10 sm:px-8 sm:py-4 sm:text-base md:px-9"
              >
                Explore Courses
              </Link>
            </motion.div>

            {/* Compact trust line */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-gray-500 sm:mt-10 sm:text-xs"
            >
              <span className="text-white">
                <CountUp end={500} duration={2.5} enableScrollSpy scrollSpyOnce />+
              </span>{" "}
              <span className="-ml-3">Students</span>
              <span className="text-white/20">•</span>
              <span className="text-white">4.9★</span> Avg Rating
              <span className="text-white/20">•</span>
              <span className="text-white">
                <CountUp end={15} duration={2.5} enableScrollSpy scrollSpyOnce />+
              </span>{" "}
              <span className="-ml-3">Strategies Taught</span>
            </motion.div>
          </div>

          {/* ============ RIGHT: VISUAL ============ */}
          <motion.div
            variants={revealCard}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Glow behind the terminal */}
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[#EA7626]/10 blur-3xl" />

            {/* Terminal card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md sm:p-7">
              {/* Terminal header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-[#EA7626]/30 bg-[#EA7626]/10 px-2.5 py-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EA7626] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#EA7626]" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#EA7626]">
                    Live
                  </span>
                </div>
              </div>

              <p className="mt-5 font-mono text-xs uppercase tracking-[0.1em] text-gray-500">
                XAU / USD
              </p>
              <h3 className="mt-1 font-mono text-2xl font-medium text-white sm:text-3xl">
                2,342.18
              </h3>

              {/* Candlestick mockup */}
              <div className="mt-6 flex h-28 items-end gap-1.5 sm:h-32">
                {CANDLES.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${c.h}%` }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4 + i * 0.045,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`flex-1 rounded-sm ${
                      c.up ? "bg-[#EA7626]" : "bg-white/15"
                    }`}
                  />
                ))}
              </div>

              {/* Bid / Ask legend */}
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 font-mono text-[11px] text-gray-400 sm:text-xs">
                <div>
                  <p className="text-gray-500">Bid</p>
                  <p className="mt-1 text-white">2,341.92</p>
                </div>
                <div>
                  <p className="text-gray-500">Ask</p>
                  <p className="mt-1 text-[#EA7626]">2,342.45</p>
                </div>
                <div>
                  <p className="text-gray-500">Spread</p>
                  <p className="mt-1 text-white">0.53</p>
                </div>
              </div>
            </div>

            {/* Floating card — top-left, students */}
            <motion.div
              variants={revealCard}
              initial="hidden"
              animate="show"
              custom={0.6}
              className="absolute -left-4 -top-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d0d]/90 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,.5)] backdrop-blur-md sm:-left-8 sm:-top-6"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EA7626]/15 text-[#EA7626]">
                <Users size={16} />
              </div>
              <div>
                <p className="font-mono text-sm font-semibold leading-none text-white">
                  <CountUp end={500} duration={2.5} enableScrollSpy scrollSpyOnce />+
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.06em] text-gray-400">
                  Active Students
                </p>
              </div>
            </motion.div>

            {/* Floating card — bottom-right, rating */}
            <motion.div
              variants={revealCard}
              initial="hidden"
              animate="show"
              custom={0.8}
              className="absolute -bottom-5 -right-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d0d]/90 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,.5)] backdrop-blur-md sm:-bottom-6 sm:-right-8"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EA7626]/15 text-[#EA7626]">
                <Star size={16} className="fill-[#EA7626]" />
              </div>
              <div>
                <p className="font-mono text-sm font-semibold leading-none text-white">
                  4.9<span className="text-[#EA7626]">★</span>
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.06em] text-gray-400">
                  Avg. Rating
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[2] h-32 w-full sm:h-40 md:h-48"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(9,9,9,1))",
        }}
      />

      {/* Live Market Ticker */}
      <div className="relative z-20 mt-10 border-y border-white/[0.08] bg-black/70 backdrop-blur-xl sm:mt-14">
        <Marquee gradient={false} speed={35} pauseOnHover>
          {tickerData.map((item, index) => (
            <div
              key={index}
              className="mx-5 flex items-center gap-2.5 py-3 font-mono text-xs sm:mx-7 sm:gap-3 sm:py-4 sm:text-sm md:mx-8"
            >
              <span className="font-semibold text-white">{item.pair}</span>
              <span className="text-gray-400">{item.price}</span>
              <span
                className={
                  item.change.startsWith("+")
                    ? "font-semibold text-green-400"
                    : item.change.startsWith("-")
                      ? "font-semibold text-red-400"
                      : "font-semibold text-gray-500"
                }
              >
                {item.change}
              </span>
              <span className="ml-3 h-1 w-1 rounded-full bg-[#EA7626]/60 sm:ml-5" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default HeroSection;
