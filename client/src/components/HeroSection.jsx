import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUpImport from "react-countup";
import MarqueeImport from "react-fast-marquee";
import KineticGrid from "../components/ui/KineticGrid";
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
    y: 40,
  },

  show: (delay = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: delay * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const HeroSection = () => {
  const tickerData = useMarketTicker();

  return (
    <section className="relative overflow-hidden bg-[#090909] text-white mt-5 md:mt-10">
      {/* Interactive Background */}
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
      />

      {/* Orange Glow */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle at top center, rgba(234,118,38,.14), transparent 40%), rgba(0,0,0,.55)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[88vh] w-full max-w-7xl flex-col justify-center px-6 pt-32 pb-24 lg:px-10">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-6 inline-flex w-fit items-center rounded-full border border-[#EA7626]/40 bg-[#EA7626]/10 px-4 py-2 backdrop-blur-md"
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-[#EA7626]" />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#EA7626]">
            India's Professional Offline Trading Academy
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl xl:text-8xl"
        >
          Learn Trading Like
          <br />
          <span className="bg-gradient-to-r from-[#EA7626] to-[#ffb347] bg-clip-text text-transparent">
            Professional Traders
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-8 max-w-2xl text-base leading-8 text-gray-300 md:text-lg"
        >
          Master Trading through structured offline mentorship designed to help
          you become a disciplined and confident trader.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-12 flex flex-col gap-5 sm:flex-row"
        >
          <Link
            to="/admission"
            className="rounded-full bg-[#EA7626] px-9 py-4 text-center font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(234,118,38,.45)]"
          >
            Enroll in Next Batch
          </Link>

          <Link
            to="/courses"
            className="rounded-full border border-white/15 bg-white/5 px-9 py-4 text-center font-semibold backdrop-blur-md transition-all duration-300 hover:border-[#EA7626] hover:bg-[#EA7626]/10"
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
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#EA7626]/40 hover:bg-white/10"
            >
              <h2 className="text-4xl font-bold text-[#EA7626] md:text-5xl">
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                />
                {stat.suffix}
              </h2>

              <p className="mt-3 text-sm uppercase tracking-widest text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute bottom-0 left-0 z-[2] h-48 w-full"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(9,9,9,1))",
        }}
      />

      {/* Live Market Ticker */}
      <div className="relative z-20 border-t border-white/10 bg-black/60 backdrop-blur-lg">
        <Marquee gradient={false} speed={35} pauseOnHover>
          {tickerData.map((item, index) => (
            <div
              key={index}
              className="mx-8 flex items-center gap-3 py-4 font-mono text-sm"
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
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default HeroSection;
