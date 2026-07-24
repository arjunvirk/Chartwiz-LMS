import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import CountUpImport from "react-countup";
import anandMalhotra from "../assets/anand_malhotra.jpeg";
import varunMalhotra from "../assets/varun_malhotra.jpeg";
import lalitKumar from "../assets/lalit_kumar.jpeg";

const CountUp = CountUpImport.default ?? CountUpImport;

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
    id: 4,
    name: "Lalit Kumar",
    role: "Swing Trader",
    image: lalitKumar,
    review:
      "ChartWiz Academy is one of the best institutes for anyone looking to learn stock market trading and investing from scratch.",
  },
];

const STATS = [
  { value: 500, suffix: "+", label: "Active Students" },
  { value: 4.9, suffix: "★", label: "Student Satisfaction", decimals: 1 },
  { value: 120, suffix: "+", label: "Premium Lessons" },
];

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Testimonials = () => {
  return (
    <section className="bg-vellum py-24">
      <div className="mx-auto max-w-300 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
            Student Testimonials
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-graphite md:text-5xl">
            Trusted by aspiring traders
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Thousands of students are learning professional trading skills
            through ChartWiz Academy.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-14 grid gap-3 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="rounded-3xl bg-bone p-8"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    className="fill-ember-orange text-ember-orange"
                  />
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-slate">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="mt-7 flex items-center gap-3 border-t border-pebble pt-5">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-semibold text-graphite">
                    {t.name}
                  </h3>
                  <p className="font-mono text-xs text-ember-orange">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DARK CTA BAND */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 overflow-hidden rounded-3xl bg-obsidian"
        >
          <div className="flex items-center justify-center p-10 lg:p-14">
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
                Join The Community
              </span>

              <h2 className="mt-4 font-serif text-3xl leading-[1.05] text-vellum md:text-4xl">
                Become a confident & disciplined trader
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-mist">
                Learn professional market strategies, trading psychology and
                structured mentorship from ChartWiz Academy.
              </p>

              <Link
                to="/admission"
                className="mt-8 inline-flex items-center justify-center rounded-pill bg-ember-orange px-8 py-3.5 font-mono text-sm font-medium text-black transition hover:brightness-95"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
