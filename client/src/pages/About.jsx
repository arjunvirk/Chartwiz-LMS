import { motion } from "framer-motion";
import CountUpImport from "react-countup";
import founderImg from "../assets/founder.jpeg";

const CountUp = CountUpImport.default ?? CountUpImport;

const FEATURES = [
  {
    n: "01",
    title: "Structured Learning",
    desc: "Step-by-step lessons designed for every level of trader.",
  },
  {
    n: "02",
    title: "Expert Mentorship",
    desc: "Learn directly from experienced market professionals.",
  },
  {
    n: "03",
    title: "Practical Strategies",
    desc: "Real-world trading concepts you can apply immediately.",
  },
  {
    n: "04",
    title: "Lifetime Growth",
    desc: "Continuous learning and improvement through market cycles.",
  },
];

const STATS = [
  { value: 500, suffix: "+", label: "Students" },
  { value: 120, suffix: "+", label: "Premium Lessons" },
  { value: 15, suffix: "+", label: "Strategies" },
  { value: 24, suffix: "/7", label: "Access" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const About = () => {
  return (
    <div className="bg-vellum">
      {/* ===== DARK HERO ===== */}
      <section className="relative overflow-hidden bg-obsidian text-vellum">
        <svg
          className="pointer-events-none absolute inset-x-0 top-1/3 h-56 w-full opacity-20"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M0,140 L150,100 L300,130 L450,60 L600,90 L750,40 L900,80 L1050,30 L1200,55"
            stroke="#ff7817"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
        </svg>

        <div className="relative mx-auto max-w-[1200px] px-6 py-28 text-center">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange"
          >
            About ChartWiz Academy
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mx-auto mt-6 max-w-4xl font-serif text-5xl leading-[1.02] tracking-[-0.02em] md:text-7xl"
          >
            Empowering traders with professional education{" "}
            <span className="text-ember-orange">///</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-mist"
          >
            ChartWiz Academy is a modern trading education platform designed to
            help beginners and experienced traders build confidence, develop
            profitable trading habits, and understand the financial markets
            through structured mentorship and practical learning.
          </motion.p>
        </div>
      </section>

      {/* ===== FOUNDER FEATURE ===== */}
      <section className="mx-auto max-w-[1200px] px-6 py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid items-center gap-14 rounded-3xl bg-bone p-8 lg:grid-cols-2 lg:p-12"
        >
          {/* IMAGE */}
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-3xl border border-ember-orange/25" />
            <img
              src={founderImg}
              alt="Founder"
              className="w-full rounded-2xl object-cover"
            />
          </div>

          {/* CONTENT */}
          <div>
            <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
              Founder & Mentor
            </span>

            <h2 className="mt-4 font-serif text-3xl leading-tight text-graphite md:text-4xl">
              Meet your trading mentor
            </h2>

            <p className="mt-3 font-serif text-4xl text-graphite md:text-5xl">
              Rohit Kumar
            </p>

            <p className="mt-6 text-base leading-relaxed text-slate">
              With years of market experience and a passion for teaching, our
              mission is to help traders understand the market with confidence,
              discipline, and proper risk management.
            </p>

            <p className="mt-4 text-base leading-relaxed text-slate">
              At ChartWiz Academy, we focus on practical learning, real-world
              trading concepts, and developing a professional trader mindset
              rather than chasing shortcuts.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-pebble bg-vellum px-5 py-3">
                <h3 className="font-mono text-2xl font-medium text-graphite">
                  <CountUp
                    end={500}
                    duration={2}
                    suffix="+"
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </h3>
                <p className="text-xs text-slate">Students Guided</p>
              </div>
              <div className="rounded-2xl border border-pebble bg-vellum px-5 py-3">
                <h3 className="font-mono text-2xl font-medium text-graphite">
                  <CountUp
                    end={5}
                    duration={2}
                    suffix="+"
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </h3>
                <p className="text-xs text-slate">Years Experience</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== MISSION / VISION ===== */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24">
        <div className="grid gap-3 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="rounded-3xl bg-obsidian p-10 text-vellum"
          >
            <span className="font-mono text-xs uppercase tracking-[-0.02em] text-ember-orange">
              01 — Mission
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight">
              Our Mission
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-mist">
              Our mission is to simplify trading education and provide
              high-quality mentorship that helps students avoid common mistakes,
              manage risk effectively, and build a sustainable approach to
              trading.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="rounded-3xl bg-bone p-10"
          >
            <span className="font-mono text-xs uppercase tracking-[-0.02em] text-ember-orange">
              02 — Vision
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-graphite">
              Our Vision
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate">
              We envision a community of disciplined traders who understand
              market psychology, risk management, and strategy execution rather
              than relying on speculation or shortcuts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center font-serif text-4xl leading-tight text-graphite md:text-5xl"
        >
          Why choose ChartWiz Academy?
        </motion.h2>

        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="rounded-3xl bg-bone p-8 transition duration-300 hover:-translate-y-1"
            >
              <span className="font-mono text-xs text-ember-orange">{f.n}</span>
              <h3 className="mt-4 text-xl font-semibold text-graphite">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== DARK STATS BAND ===== */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl bg-obsidian p-10"
        >
          <div className="grid gap-10 text-center md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <h3 className="font-mono text-4xl font-medium text-vellum">
                  <CountUp
                    end={stat.value}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  {stat.suffix}
                </h3>
                <p className="mt-2 text-sm text-mist">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
