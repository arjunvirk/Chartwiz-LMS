import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const FAQ_DATA = [
  {
    question: "Is this course beginner friendly?",
    answer:
      "Yes. ChartWiz Academy is designed for complete beginners as well as intermediate traders. We start from the fundamentals and gradually move towards advanced trading concepts.",
  },
  {
    question: "Will I get lifetime access to the courses?",
    answer:
      "Yes. Once enrolled, you get lifetime access to the recorded lessons and future updates included in your purchased mentorship program.",
  },
  {
    question: "What topics are covered in the mentorship?",
    answer:
      "The mentorship covers price action, options trading, risk management, trading psychology, scalping, swing trading and advanced market analysis.",
  },
  {
    question: "Can I watch the lessons on mobile?",
    answer:
      "Absolutely. The ChartWiz LMS is fully responsive and works smoothly on desktop, tablet and mobile devices.",
  },
  {
    question: "Do you provide live trading sessions?",
    answer:
      "Currently the platform focuses on premium recorded mentorship and structured learning for flexibility and long-term access.",
  },
  {
    question: "Will this help me become profitable?",
    answer:
      "The mentorship is focused on building trading knowledge, discipline and risk management. Profitability depends on consistent practice, execution and market experience.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-[#050607] py-24 text-white">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Frequently Asked Questions
          </span>

          <h2 className="text-balance mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Got Questions?
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              We Have Answers
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
            Everything you need to know about ChartWiz Academy, our mentorship
            structure and learning platform.
          </p>
        </motion.div>

        {/* FAQ LIST */}
        <div className="mt-20 space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className={`overflow-hidden rounded-[2rem] border bg-white/[0.03] backdrop-blur-md transition duration-300 ${
                  isOpen ? "border-emerald-500/30" : "border-white/10"
                }`}
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >
                  <h3 className="pr-6 text-lg font-semibold leading-relaxed md:text-xl">
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                      isOpen
                        ? "bg-emerald-500 text-black"
                        : "bg-white/[0.06] text-emerald-400"
                    }`}
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </motion.div>
                </button>

                {/* ANSWER */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-7">
                        <p className="leading-relaxed text-gray-400">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-md"
        >
          <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
            Still Have Questions?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
            Join ChartWiz Academy and start your journey towards professional
            trading with structured mentorship and practical market education.
          </p>

          <Link
            to="/admission"
            className="mt-10 inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-10 py-4 text-sm font-bold text-black transition hover:scale-105 hover:bg-emerald-400"
          >
            Join ChartWiz Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
