import { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
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

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-black py-24 text-white">
      {/* BACKGROUND GLOW */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* TOP */}

        <div className="text-center">
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-green-400 backdrop-blur-md">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Got Questions?
            <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              We Have Answers
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
            Everything you need to know about ChartWiz Academy, our mentorship
            structure and learning platform.
          </p>
        </div>

        {/* FAQ LIST */}

        <div className="mt-20 space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 backdrop-blur-md transition duration-300 hover:border-green-500/30"
            >
              {/* QUESTION */}

              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-8 py-7 text-left"
              >
                <h3 className="pr-6 text-xl font-bold leading-relaxed md:text-2xl">
                  {faq.question}
                </h3>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold text-green-400">
                  {activeIndex === index ? "−" : "+"}
                </div>
              </button>

              {/* ANSWER */}

              <div
                className={`grid transition-all duration-300 ${
                  activeIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-8 pb-8">
                    <p className="leading-relaxed text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}

        <div className="mt-24 rounded-4xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-md">
          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Still Have Questions?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            Join ChartWiz Academy and start your journey towards professional
            trading with structured mentorship and practical market education.
          </p>

          <Link
            to="/admission"
            className="mt-10 inline-flex items-center justify-center rounded-2xl bg-green-500 px-10 py-5 text-sm font-bold text-black transition hover:scale-105 hover:bg-green-400"
          >
            Join ChartWiz Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
