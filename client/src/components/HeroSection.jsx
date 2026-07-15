import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUpImport from "react-countup";
import MarqueeImport from "react-fast-marquee";

const CountUp = CountUpImport.default ?? CountUpImport;
const Marquee = MarqueeImport.default ?? MarqueeImport;

const TICKER_DATA = [
  { pair: "EUR/USD", price: "1.0842", change: "+0.24%" },
  { pair: "BTC/USDT", price: "64,215", change: "+2.10%" },
  { pair: "GBP/JPY", price: "198.34", change: "-0.11%" },
  { pair: "XAU/USD", price: "2,381.6", change: "+0.87%" },
  { pair: "USD/INR", price: "83.42", change: "-0.05%" },
];

const STATS = [
  { value: 500, suffix: "+", label: "Students Enrolled" },
  { value: 120, suffix: "+", label: "Premium Lessons" },
  { value: 15, suffix: "+", label: "Trading Strategies" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HeroSection = () => {
  console.log("motion:", motion);
  console.log("Link:", Link);
  console.log("Marquee:", Marquee);
  console.log("CountUp:", CountUp);
  return (
    <section className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden bg-obsidian text-vellum">
      <div className="relative mx-auto w-full max-w-300 px-6 pb-16 pt-40">
        {/* KICKER */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="font-mono text-xs uppercase tracking-[-0.02em] text-ember-orange"
        >
          India's Professional Offline Trading Academy
        </motion.span>

        {/* HEADLINE */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-vellum sm:text-6xl md:text-7xl"
        >
          Become a consistent trader with expert mentorship{" "}
        </motion.h1>

        {/* SUB */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-lg text-base leading-relaxed text-mist"
        >
          Structured offline mentorship in price action, risk management and
          trading psychology — built for people who want to trade for a living,
          not chase signals.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            to="/admission"
            className="inline-flex items-center justify-center rounded-pill bg-ember-orange px-7 py-3.5 font-mono text-sm font-medium text-black transition hover:brightness-95"
          >
            Enroll in Next Batch
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center rounded-pill border border-white/15 px-7 py-3.5 font-mono text-sm font-medium text-vellum transition hover:border-white/30"
          >
            View Courses
          </Link>
        </motion.div>

        {/* STATS */}
        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
            >
              <h2 className="font-mono text-3xl font-medium text-vellum md:text-4xl">
                <CountUp
                  end={stat.value}
                  duration={2}
                  enableScrollSpy
                  scrollSpyOnce
                />
                {stat.suffix}
              </h2>
              <p className="mt-1 text-xs text-mist">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIVE TICKER */}
      <div className="relative border-t border-white/10 bg-onyx py-3">
        <Marquee gradient={false} speed={35} pauseOnHover>
          {TICKER_DATA.map((item, i) => (
            <div
              key={i}
              className="mx-6 flex items-center gap-3 font-mono text-xs"
            >
              <span className="text-vellum">{item.pair}</span>
              <span className="text-mist">{item.price}</span>
              <span
                className={
                  item.change.startsWith("+")
                    ? "text-ember-orange"
                    : "text-slate"
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
