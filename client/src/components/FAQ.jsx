import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, X, Phone, Mail, ArrowUpRight } from "lucide-react";
import "./FAQ.css";

const CATEGORIES = [
  { id: "all", label: "All questions" },
  { id: "start", label: "Getting started" },
  { id: "access", label: "Access & format" },
  { id: "results", label: "Results" },
];

const FAQ_DATA = [
  {
    category: "start",
    question: "Is this course beginner friendly?",
    answer:
      "Yes. Alphira Capital is designed for complete beginners as well as intermediate traders. We start from the fundamentals and gradually move towards advanced trading concepts.",
  },
  {
    category: "access",
    question: "Will I get lifetime access to the courses?",
    answer:
      "Yes. Once enrolled, you get lifetime access to the recorded lessons and future updates included in your purchased mentorship program.",
  },
  {
    category: "start",
    question: "What topics are covered in the mentorship?",
    answer:
      "The mentorship covers price action, options trading, risk management, trading psychology, scalping, swing trading and advanced market analysis.",
  },
  {
    category: "access",
    question: "Can I watch the lessons on mobile?",
    answer:
      "Absolutely. The Alphira LMS is fully responsive and works smoothly on desktop, tablet and mobile devices.",
  },
  {
    category: "access",
    question: "Do you provide live trading sessions?",
    answer:
      "Currently the platform focuses on premium recorded mentorship and structured learning for flexibility and long-term access.",
  },
  {
    category: "results",
    question: "Will this help me become profitable?",
    answer:
      "The mentorship is focused on building trading knowledge, discipline and risk management. Profitability depends on consistent practice, execution and market experience.",
  },
].map((item, index) => ({ ...item, number: String(index + 1).padStart(2, "0") }));

const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function Highlight({ text, query }) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "ig"));
  return parts.map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : part));
}

export default function FAQ() {
  const uid = useId();
  const sectionRef = useRef(null);
  const searchRef = useRef(null);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState(FAQ_DATA[0].question);
  const [isIn, setIsIn] = useState(false);

  // Entrance plays once when the section reaches the screen (never tied to scroll position).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) { setIsIn(true); return undefined; }
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsIn(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const trimmed = query.trim();
  const counts = useMemo(() => {
    const c = { all: FAQ_DATA.length };
    FAQ_DATA.forEach((f) => { c[f.category] = (c[f.category] || 0) + 1; });
    return c;
  }, []);

  const results = useMemo(() => {
    const q = trimmed.toLowerCase();
    return FAQ_DATA.filter((f) =>
      (category === "all" || f.category === category) &&
      (!q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)));
  }, [category, trimmed]);

  const filterKey = `${category}|${trimmed}`;
  const clearSearch = () => { setQuery(""); searchRef.current?.focus(); };

  return (
    <section ref={sectionRef} className={`aq-section${isIn ? " is-in" : ""}`} aria-labelledby={`${uid}-title`}>
      <div className="aq-glow" aria-hidden="true" />
      <div className="aq-container">
        <aside className="aq-side">
          <p className="aq-eyebrow"><span aria-hidden="true" />Frequently asked questions</p>
          <h2 id={`${uid}-title`}>Got questions?<br /><span>We have answers.</span></h2>
          <p className="aq-intro">Everything students usually ask before joining, from where to start to how you'll access your lessons.</p>

          <div className="aq-search">
            <Search size={18} aria-hidden="true" />
            <label htmlFor={`${uid}-search`} className="aq-sr">Search questions</label>
            <input
              ref={searchRef}
              id={`${uid}-search`}
              type="search"
              placeholder="Search questions"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Escape" && query) { e.preventDefault(); setQuery(""); } }}
            />
            {query && <button type="button" className="aq-clear" onClick={clearSearch} aria-label="Clear search"><X size={16} /></button>}
          </div>

          <div className="aq-cats" role="group" aria-label="Filter by topic">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`aq-cat${category === c.id ? " is-active" : ""}`}
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                <span>{c.label}</span>
                <small aria-hidden="true">{String(counts[c.id] || 0).padStart(2, "0")}</small>
              </button>
            ))}
          </div>
        </aside>

        <div className="aq-main">
          <p className="aq-status" aria-live="polite">
            {trimmed
              ? `${results.length} ${results.length === 1 ? "answer" : "answers"} for “${trimmed}”`
              : `${results.length} ${results.length === 1 ? "question" : "questions"}${category === "all" ? "" : ` in ${CATEGORY_LABEL[category]}`}`}
          </p>

          {results.length > 0 ? (
            <ul className="aq-list" key={filterKey}>
              {results.map((faq, index) => {
                const isOpen = openQuestion === faq.question;
                const buttonId = `${uid}-q-${faq.number}`;
                const panelId = `${uid}-a-${faq.number}`;
                return (
                  <li key={faq.question} className={`aq-item${isOpen ? " is-open" : ""}`} style={{ "--i": index }}>
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        className="aq-trigger"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenQuestion((current) => (current === faq.question ? null : faq.question))}
                      >
                        <span className="aq-number" aria-hidden="true">{faq.number}</span>
                        <span className="aq-question">
                          <span className="aq-tag">{CATEGORY_LABEL[faq.category]}</span>
                          <span className="aq-question-text"><Highlight text={faq.question} query={trimmed} /></span>
                        </span>
                        <span className="aq-toggle" aria-hidden="true"><Plus size={18} strokeWidth={1.8} /></span>
                      </button>
                    </h3>
                    <div id={panelId} role="region" aria-labelledby={buttonId} className="aq-answer" inert={!isOpen}>
                      <div className="aq-answer-inner">
                        <p><Highlight text={faq.answer} query={trimmed} /></p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="aq-empty">
              <p className="aq-empty-title">No answers match “{trimmed}”.</p>
              <p>Try another word, or ask our admissions team directly.</p>
              <div className="aq-empty-actions">
                <button type="button" onClick={() => { setCategory("all"); clearSearch(); }}>Show all questions</button>
                <a href="tel:+919217222356">Call us <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </div>
          )}

          <div className="aq-help">
            <div className="aq-help-copy">
              <p className="aq-help-title">Still have questions?</p>
              <p>Talk to our admissions team about batches, timings or fees.</p>
            </div>
            <div className="aq-help-actions">
              <a href="tel:+919217222356" className="aq-help-primary"><Phone size={16} aria-hidden="true" />+91 92172 22356</a>
              <a href="mailto:contact.alphiracapital@gmail.com" className="aq-help-secondary"><Mail size={16} aria-hidden="true" />Email us</a>
              <Link to="/admission" className="aq-help-link">Apply online <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
