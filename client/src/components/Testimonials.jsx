import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import CountUp from "react-countup";
import kajalPhoto from "../assets/kajal_kushwaha.jpeg";
import anandMalhotra from "../assets/anand_malhotra.jpeg";
import varunMalhotra from "../assets/varun_malhotra.jpeg";
import lalitKumar from "../assets/lalit_kumar.jpeg";
import sohail from "../assets/sohel.jpeg";

const CountUpComponent = CountUp.default ?? CountUp;

const TESTIMONIALS = [
  {
    id: 1,
    name: "Anand Malhotra",
    role: "Options Trader",
    image: anandMalhotra,
    review:
      "ChartWiz completely changed the way I understand the market. The structured mentorship and psychology lessons helped me become far more disciplined in trading.",
  },
  {
    id: 2,
    name: "Varun Malhotra",
    role: "Swing Trader",
    image: varunMalhotra,
    review:
      "The price action course is extremely practical and beginner friendly. I finally understand market structure and risk management properly.",
  },
  {
    id: 3,
    name: "Kajal Kushwaha",
    role: "Full-Time Trader",
    image: kajalPhoto,
    review:
      "Unlike random YouTube content, ChartWiz provides a complete roadmap. The lessons are premium quality and easy to follow.",
  },
  {
    id: 4,
    name: "Lalit Kumar",
    role: "Swing Trader",
    image: lalitKumar,
    review:
      "ChartWiz Academy is one of the best institutes for anyone looking to learn stock market trading and investing from scratch. The courses are structured in a simple and practical way.",
  },
  {
    id: 5,
    name: "Sohail",
    role: "Options Trader",
    image: sohail,
    review:
      "ChartWiz Academy explains complex market concepts in a very simple and practical way. The live sessions and structured lessons make it easy to stay consistent.",
  },
];

const STATS = [
  { value: 500, suffix: "+", label: "Active Students" },
  { value: 4.9, suffix: "★", label: "Student Satisfaction", decimals: 1 },
  { value: 120, suffix: "+", label: "Premium Lessons" },
  { value: 24, suffix: "/7", label: "Learning Access" },
];

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-[#050607] py-24 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-160 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border border-white/10 bg-white/3 px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Student Testimonials
          </span>

          <h2 className="text-balance mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Trusted By
            <span className="bg-linear-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Aspiring Traders
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-400">
            Thousands of students are learning professional trading skills,
            market psychology and disciplined execution through ChartWiz
            Academy.
          </p>
        </motion.div>

        {/* TESTIMONIAL GRID */}
        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="group rounded-[2.5rem] border border-white/10 bg-white/3 p-8 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-emerald-500/25 hover:bg-white/5"
            >
              {/* STARS */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* REVIEW */}
              <p className="mt-7 leading-relaxed text-gray-300">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* USER */}
              <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-12 w-12 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {t.name}
                  </h3>
                  <p className="font-mono text-xs text-emerald-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/3"
        >
          <div className="grid items-center gap-12 p-10 lg:grid-cols-2 lg:p-16">
            {/* LEFT */}
            <div>
              <span className="rounded-full border border-white/10 bg-white/4 px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Join The Community
              </span>

              <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight md:text-5xl">
                Become A Confident &
                <span className="text-emerald-400"> Disciplined Trader</span>
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-gray-400">
                Learn professional market strategies, trading psychology and
                structured mentorship from ChartWiz Academy.
              </p>

              <Link
                to="/admission"
                className="mt-10 inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-10 py-4 text-sm font-bold text-black transition hover:scale-105 hover:bg-emerald-400"
              >
                Start Your Journey
              </Link>
            </div>

            {/* RIGHT */}
            <div className="grid gap-4 sm:grid-cols-2">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/3 p-7 text-center"
                >
                  <h3 className="font-mono text-4xl font-bold text-emerald-400">
                    <CountUpComponent
                      end={stat.value}
                      decimals={stat.decimals || 0}
                      duration={2}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    {stat.suffix}
                  </h3>
                  <p className="mt-3 text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
