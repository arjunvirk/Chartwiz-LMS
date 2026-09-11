import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import "./FAQ.css";

const FAQ_DATA = [
  {
    question: "Is this course beginner friendly?",
    answer:
      "Yes. Alphira Capital is designed for complete beginners as well as intermediate traders. We start from the fundamentals and gradually move towards advanced trading concepts.",
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
      "Absolutely. The Alphira LMS is fully responsive and works smoothly on desktop, tablet and mobile devices.",
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

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const reducedMotion = useReducedMotion();
  const sectionId = useId();
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : delay },
  });

  return (
    <section className="aq-section" aria-labelledby={`${sectionId}-title`}>
      <div className="aq-container">
        <motion.div {...reveal()} className="aq-heading">
          <p className="aq-eyebrow"><span aria-hidden="true" />Frequently Asked Questions</p>
          <h2 id={`${sectionId}-title`}>Got questions?<br /><span>We have answers.</span></h2>
        </motion.div>

        <div className="aq-list">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = activeIndex === index;
            const buttonId = `${sectionId}-question-${index}`;
            const panelId = `${sectionId}-answer-${index}`;
            return (
              <motion.div {...reveal(index * 0.04)} key={faq.question} className={`aq-item${isOpen ? " aq-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setActiveIndex((current) => current === index ? null : index)}
                    className="aq-trigger"
                  >
                    <span className="aq-number" aria-hidden="true">0{index + 1}</span>
                    <span className="aq-question">{faq.question}</span>
                    <span className="aq-toggle" aria-hidden="true"><Plus size={18} strokeWidth={1.8} /></span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!isOpen} className="aq-answer">
                  <div className="aq-answer-inner"><p>{faq.answer}</p></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...reveal()} className="aq-invitation">
          <div>
            <h2>Still have questions?</h2>
            <p>Join Alphira Capital and start your journey towards professional trading with structured mentorship.</p>
          </div>
          <Link to="/admission" className="aq-join">Join Alphira Today <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </motion.div>
      </div>
    </section>
  );
}