import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUpImport from "react-countup";
import MarqueeImport from "react-fast-marquee";
// import KineticGrid from "../components/ui/KineticGrid";
import { useMarketTicker } from "../hooks/useMarketTicker";

const CountUp = CountUpImport.default ?? CountUpImport;
const Marquee = MarqueeImport.default ?? MarqueeImport;

const STATS = [
  {
    value: 500,
    suffix: "+",
    label: "Students Enrolled",
  },
  {
    value: 120,
    suffix: "+",
    label: "Premium Lessons",
  },
  {
    value: 15,
    suffix: "+",
    label: "Trading Strategies",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

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

const HeroSection = () => {
  const tickerData = useMarketTicker();

  return (
    <section className="relative mt-3 overflow-hidden bg-[#090909] text-white  md:mt-6 lg:mt-10">
      {/* Interactive Background
      <KineticGrid
        background="#050505"
        dotColor="#8a3a12"
        lineColor="#5c2a0e"
        trailColor="#b8460f"
        spacing={36}
        radius={320}
        strength={5}
        trail={true}
        glow={true}
        glowStrength={16}
      /> */}

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
      <div className="relative z-10 mx-auto flex min-h-[78vh] w-full max-w-7xl flex-col justify-center px-5 pb-16 pt-20 sm:min-h-[82vh] sm:px-6 sm:pb-20 sm:pt-24 md:px-8 md:pb-24 md:pt-28 lg:min-h-[88vh] lg:px-10 lg:pt-32">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-5 inline-flex w-fit max-w-full items-center rounded-full border border-[#EA7626]/40 bg-[#EA7626]/10 px-3 py-2 backdrop-blur-md sm:mb-6 sm:px-4 mt-10 md:mt-0"
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
          className="max-w-5xl text-[2.35rem] font-bold leading-[1.08] tracking-[-0.035em] sm:text-5xl sm:leading-[1.06] md:text-[3.6rem] lg:text-7xl xl:text-8xl"
        >
          Professional Trading Education for Beginners
          <br className="hidden sm:block" />

          <span className="mt-1 block bg-gradient-to-r from-[#EA7626] via-[#f18b45] to-[#EA7626] bg-clip-text text-transparent sm:mt-0">
            & Aspiring Traders
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-2xl text-[15px] leading-7 text-gray-300 sm:mt-7 sm:text-base sm:leading-8 md:mt-8 md:text-lg"
        >
          Learn market concepts through structured offline education covering
          technical analysis, risk management and trading psychology.
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
            className="group relative overflow-hidden rounded-full bg-[#EA7626] px-7 py-3.5 text-center text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(234,118,38,.45)] sm:px-8 sm:py-4 sm:text-base md:px-9"
          >
            <span className="relative z-10">Enroll in Next Batch</span>

            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>

          <Link
            to="/courses"
            className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-center text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:border-[#EA7626]/70 hover:bg-[#EA7626]/10 sm:px-8 sm:py-4 sm:text-base md:px-9"
          >
            Explore Courses
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={4}
          className="mt-12 grid grid-cols-3 gap-2 sm:mt-16 sm:gap-4 md:mt-20 md:gap-6"
        >
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-2 py-4 backdrop-blur-md transition-all duration-300 hover:border-[#EA7626]/40 hover:bg-white/[0.07] sm:rounded-2xl sm:p-5 md:p-6"
            >
              {/* Card Glow */}
              <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-[#EA7626]/0 blur-2xl transition-all duration-500 group-hover:bg-[#EA7626]/10" />

              <h2 className="relative text-2xl font-bold tracking-tight text-[#EA7626] sm:text-3xl md:text-4xl lg:text-5xl">
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                />
                {stat.suffix}
              </h2>

              <p className="relative mt-2 text-[8px] font-medium uppercase leading-3 tracking-[0.08em] text-gray-400 sm:mt-3 sm:text-[10px] sm:leading-4 sm:tracking-wider md:text-xs lg:text-sm lg:tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[2] h-32 w-full sm:h-40 md:h-48"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(9,9,9,1))",
        }}
      />

      {/* Live Market Ticker */}
      <div className="relative z-20 border-y border-white/[0.08] bg-black/70 backdrop-blur-xl">
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