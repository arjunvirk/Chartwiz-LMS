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
  const toggleFAQ = (index) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="bg-vellum py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
            Frequently Asked Questions
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-graphite md:text-5xl">
            Got questions? We have answers
          </h2>
        </motion.div>

        <div className="mt-14 space-y-2">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="overflow-hidden rounded-2xl bg-bone"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-7 py-5 text-left"
                >
                  <h3 className="pr-6 text-base font-semibold text-graphite">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                      isOpen
                        ? "bg-ember-orange text-black"
                        : "bg-white text-slate"
                    }`}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-6 text-sm leading-relaxed text-slate">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 rounded-3xl bg-obsidian p-10 text-center"
        >
          <h2 className="font-serif text-3xl leading-tight text-vellum md:text-4xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-mist">
            Join ChartWiz Academy and start your journey towards professional
            trading with structured mentorship.
          </p>
          <Link
            to="/admission"
            className="mt-8 inline-flex items-center justify-center rounded-[600px] bg-ember-orange px-8 py-3.5 font-mono text-sm font-medium text-black transition hover:brightness-95"
          >
            Join ChartWiz Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
