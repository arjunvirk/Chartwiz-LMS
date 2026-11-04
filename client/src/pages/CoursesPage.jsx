import cryptoImage from "../assets/images/crypto-cover-v3.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ArrowUpRight, Check, Clock, Monitor, ArrowDown, FileText, Users } from "lucide-react";
import { API_URL } from "../config/api";
import { courseArtProps } from "../config/courseArt";
import useUltrawideCanvas from "../hooks/useUltrawideCanvas";
import forexImage from "../assets/images/forex-cover-v2.png";
import indianMarketImage from "../assets/images/indian-cover-v2.png";
import orderFlowImage from "../assets/images/orderflow-cover-v2.png";
import "./CoursesPage.css";

/* ---------------- Program data (unchanged) ---------------- */
const COURSE_META = {
  "The Forex Program": {
    image: forexImage,
    duration: "2 Months",
    badge: "Admissions Open",
    features: [
      "Classroom Training",
      "Live Market Analysis",
      "Risk Management",
      "Trading Psychology",
      "Mentor Support",
    ],
  },
  "The Forex Program with Indian Market": {
    image: indianMarketImage,
    duration: "3 Months",
    badge: "Admissions Open",
    features: [
      "Forex + Indian Market",
      "Technical Analysis",
      "Live Practical Sessions",
      "Trading Psychology",
      "Professional Mentorship",
    ],
  },
};

const ORDER_FLOW_PROGRAM = {
  key: "advanced-order-flow",
  title: "Advanced Order Flow Program",
  description: "Take your market understanding further with advanced order flow education. Learn to interpret buying and selling activity and bring greater context to your trading decisions through classroom mentorship.",
  meta: {
    image: orderFlowImage,
    duration: null,
    badge: "Advanced Course",
    features: ["Order Flow Analysis", "Buying & Selling Activity", "Classroom Mentorship"],
  },
};
const isOrderFlow = (title = "") => /order[\s-]*flow/i.test(title);

const CRYPTO_PROGRAM = {
  key: "crypto-futures-spot",
  title: "Crypto Futures & Spot Trading Program",
  description: "A three-month curriculum covering crypto market foundations, spot trading, futures mechanics, execution, risk management and practical assessment.",
  meta: { image: cryptoImage, duration: "3 Months", badge: "Spot + Futures", features: ["Spot & Futures Markets", "Margin & Liquidation Risk", "Trading Psychology", "Journaling & Practical Assessment"] },
};
const isCrypto = (title = "") => /crypto/i.test(title);
const curriculumFor = (title) => {
  if (isOrderFlow(title)) return { file: "Alphira_Capital_Advanced_Order_Flow_Course.pdf", label: "View curriculum" };
  if (isCrypto(title)) return { file: "Alphira_Capital_Crypto_Futures_and_Spot_Trading_Course.pdf", label: "View curriculum" };
  if (/forex/i.test(title)) return { file: "Alphira_Capital_60_Days_Forex_Course.pdf", label: /indian/i.test(title) ? "View Forex curriculum" : "View curriculum" };
  return null;
};

const DEFAULT_META = {
  image: forexImage,
  duration: null,
  badge: "Admissions Open",
  features: [],
};

/* ---------------- Presentation helpers ---------------- */
const marketLabel = (title) => (isOrderFlow(title) ? "Order flow" : isCrypto(title) ? "Crypto" : /indian/i.test(title) ? "Forex + Indian market" : "Forex");
const tagline = (title) => (isOrderFlow(title) ? "Read beyond the chart." : isCrypto(title) ? "Spot. Futures. Market perspective." : /indian/i.test(title) ? "Two markets. A wider perspective." : "Build your market foundation.");
const slug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const PREVIEW_MS = 4800;

const PRINCIPLES = [
  { n: "01", title: "Learn the concepts", text: "Market structure, price action and risk, taught from the ground up." },
  { n: "02", title: "Read the market", text: "Apply every idea to live charts with your mentor in the room." },
  { n: "03", title: "Develop discipline", text: "Psychology and journaling that turn knowledge into a process." },
];
const VALUES = [
  { title: "Practical learning", text: "Concepts are taught on real charts, not slides alone." },
  { title: "Mentor guidance", text: "Classroom sessions with mentors who answer as you learn." },
  { title: "Disciplined thinking", text: "Risk awareness and psychology sit beside every setup." },
];

/* Adds .is-in once an element is on screen (never tied to scroll position). */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setInView(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, inView] = useInView(0.12);
  return <Tag ref={ref} className={`acp-reveal${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`} {...rest}>{children}</Tag>;
}

export default function CoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const heroRef = useRef(null);
  useUltrawideCanvas();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/courses`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setCourses(data.courses);
      } catch (error) {
        toast.dismiss();
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const isFallback = !loading && courses.length === 0;
  const programs = isFallback
    ? Object.entries(COURSE_META).map(([title, meta]) => ({
        key: title, title, meta,
        description: title === "The Forex Program"
          ? "A complete classroom-based Forex trading program covering technical analysis, market structure, risk management, psychology and live market execution."
          : "Master both Forex and the Indian Stock Market with comprehensive classroom training, live trading sessions and professional mentorship.",
      }))
    : courses.map((course) => ({ key: course._id, title: course.title, description: course.description, meta: isOrderFlow(course.title) ? ORDER_FLOW_PROGRAM.meta : isCrypto(course.title) ? CRYPTO_PROGRAM.meta : COURSE_META[course.title] || DEFAULT_META }));

  if (!programs.some((program) => isOrderFlow(program.title))) {
    programs.push(ORDER_FLOW_PROGRAM);
  }

  if (!programs.some((program) => isCrypto(program.title))) programs.push(CRYPTO_PROGRAM);

  const count = programs.length;
  const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Hero preview cycles through the programs continuously while the hero is on screen.
  useEffect(() => {
    const el = heroRef.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (loading || !heroVisible || reduceMotion || count < 2) return undefined;
    const t = window.setTimeout(() => setPreview((i) => (i + 1) % count), PREVIEW_MS);
    return () => window.clearTimeout(t);
  }, [preview, loading, heroVisible, reduceMotion, count]);

  const active = programs[Math.min(preview, count - 1)];
  const apply = (title) => navigate(`/admission?course=${encodeURIComponent(title)}`);

  return (
    <>
      <main className="acp">
        {/* ---------- Hero ---------- */}
        <header ref={heroRef} className="acp-hero">
          <div className="acp-shell acp-hero-grid">
            <div className="acp-hero-copy">
              <p className="acp-kicker"><span aria-hidden="true" />Alphira Capital · The Academy</p>
              <h1><span>Understand the market.</span><span className="acp-accent">Build your edge.</span></h1>
              <p className="acp-lede">From your first chart to a deeper understanding of order flow. Learn through structured classroom education, practical analysis and mentorship.</p>
              <div className="acp-hero-actions">
                <a className="acp-btn acp-btn-light" href="#academy-programs">Explore the programs <ArrowDown size={17} aria-hidden="true" /></a>
                <Link className="acp-btn acp-btn-ghost" to="/admission">Apply for admission <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
              <p className="acp-hero-note"><Users size={16} aria-hidden="true" />Classroom batches across Delhi NCR</p>
            </div>

            <div className="acp-index" aria-label="Program index">
              <div className="acp-index-preview" aria-hidden="true">
                {loading ? <span className="acp-skeleton" /> : programs.map((p, i) => (
                  <img key={p.key} {...courseArtProps(p.title, "(max-width: 1000px) 100vw, 45vw")} alt="" className={i === preview ? "is-active" : ""} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                ))}
                {!loading && active && (
                  <div className="acp-index-caption" key={active.key}>
                    <span>{marketLabel(active.title)}</span>
                    <strong>{tagline(active.title)}</strong>
                  </div>
                )}
                {!loading && count > 1 && (
                  <div className="acp-index-progress">
                    {programs.map((p, i) => <i key={p.key} className={i === preview ? "is-active" : i < preview ? "is-done" : ""} style={i === preview ? { animationDuration: `${PREVIEW_MS}ms`, animationPlayState: heroVisible && !reduceMotion ? "running" : "paused" } : undefined} />)}
                  </div>
                )}
              </div>
              <ol className="acp-index-list">
                {loading ? Array.from({ length: 4 }, (_, i) => <li key={i} className="acp-index-skel"><span /><span /></li>) : programs.map((p, i) => (
                  <li key={p.key}>
                    <a href={`#program-${slug(p.title)}`} className={i === preview ? "is-active" : ""} onMouseEnter={() => setPreview(i)} onFocus={() => setPreview(i)}>
                      <span className="acp-index-n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="acp-index-title">{p.title}</span>
                      <span className="acp-index-meta">{p.meta.duration || "Schedule on request"}</span>
                      <ArrowDown size={15} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </header>

        {/* ---------- Principles ---------- */}
        <section className="acp-principles" aria-label="How you will learn">
          <div className="acp-shell acp-principles-grid">
            {PRINCIPLES.map((p) => (
              <div key={p.n} className="acp-principle"><b>{p.n}</b><div><strong>{p.title}</strong><p>{p.text}</p></div></div>
            ))}
          </div>
        </section>

        {/* ---------- At a glance ---------- */}
        <section className="acp-section acp-glance" aria-labelledby="acp-glance-title">
          <div className="acp-shell">
            <Reveal className="acp-head">
              <div>
                <p className="acp-kicker acp-kicker-dark"><span aria-hidden="true" />At a glance</p>
                <h2 id="acp-glance-title">Compare the <span>programs.</span></h2>
              </div>
              <p>Every program is taught in the classroom with a mentor. Pick the market you want to focus on, or go deeper with order flow.</p>
            </Reveal>
            {loading ? <div className="acp-loading" role="status"><span />Loading programs…</div> : (
              <Reveal className="acp-table-wrap">
                <table className="acp-table">
                  <thead>
                    <tr><th scope="col">Program</th><th scope="col">Market</th><th scope="col">Duration</th><th scope="col">Format</th><th scope="col">Curriculum</th><th scope="col"><span className="acp-sr">Action</span></th></tr>
                  </thead>
                  <tbody>
                    {programs.map((p, i) => {
                      const curriculum = curriculumFor(p.title);
                      return (
                        <tr key={p.key}>
                          <th scope="row"><a href={`#program-${slug(p.title)}`}><span>{String(i + 1).padStart(2, "0")}</span>{p.title}</a></th>
                          <td>{marketLabel(p.title)}</td>
                          <td>{p.meta.duration || "Ask us"}</td>
                          <td>{isOrderFlow(p.title) ? "Classroom · Advanced" : "Classroom"}</td>
                          <td>{curriculum ? <a className="acp-pdf" href={`/curricula/${curriculum.file}`} target="_blank" rel="noopener noreferrer" aria-label={`${curriculum.label} for ${p.title} (PDF, opens in a new tab)`}><FileText size={14} aria-hidden="true" />PDF</a> : "—"}</td>
                          <td><button type="button" className="acp-table-apply" onClick={() => apply(p.title)} aria-label={`Apply for ${p.title}`}>Apply <ArrowUpRight size={14} aria-hidden="true" /></button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Reveal>
            )}
          </div>
        </section>

        {/* ---------- Programs ---------- */}
        <section id="academy-programs" className="acp-section acp-programs" aria-labelledby="acp-programs-title">
          <div className="acp-shell">
            <Reveal className="acp-head">
              <div>
                <p className="acp-kicker acp-kicker-dark"><span aria-hidden="true" />Find your focus</p>
                <h2 id="acp-programs-title">Your next chapter<br /><span>starts here.</span></h2>
              </div>
              <p>Choose a focused market program or go deeper with advanced order flow education.</p>
            </Reveal>

            {loading ? <div className="acp-loading" role="status"><span />Loading programs…</div> : (
              <div className="acp-list">
                {programs.map(({ key, title, description, meta }, index) => {
                  const advanced = isOrderFlow(title);
                  const curriculum = curriculumFor(title);
                  return (
                    <Reveal as="article" key={key} id={`program-${slug(title)}`} className={`acp-program${index % 2 ? " is-flipped" : ""}${advanced ? " is-advanced" : ""}`} aria-labelledby={`program-${slug(title)}-title`}>
                      <div className="acp-media">
                        <img {...courseArtProps(title, "(max-width: 900px) 100vw, 50vw")} alt="" loading={index < 1 ? "eager" : "lazy"} decoding="async" />
                        <span className="acp-media-n" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                        <span className="acp-media-tag">{tagline(title)}</span>
                      </div>
                      <div className="acp-body">
                        <div className="acp-body-top">
                          <span className="acp-badge"><i aria-hidden="true" />{meta.badge}</span>
                          <span className="acp-format">{advanced ? "Advanced · Classroom" : "Classroom"}</span>
                        </div>
                        <h3 id={`program-${slug(title)}-title`}>{title}</h3>
                        <p className="acp-desc">{description}</p>
                        {meta.features.length > 0 && (
                          <ul className="acp-features">{meta.features.map((f) => <li key={f}><Check size={14} strokeWidth={2.4} aria-hidden="true" />{f}</li>)}</ul>
                        )}
                        <div className="acp-facts">
                          <span><Clock size={15} aria-hidden="true" />{meta.duration || "Ask us about the schedule"}</span>
                          <span><Users size={15} aria-hidden="true" />Mentor-led, in person</span>
                        </div>
                        <div className="acp-actions">
                          <button type="button" className="acp-btn acp-btn-dark" onClick={() => apply(title)}><span>Apply for admission</span> <ArrowUpRight size={17} aria-hidden="true" /></button>
                          {curriculum && (
                            <a className="acp-btn acp-btn-outline" href={`/curricula/${curriculum.file}`} target="_blank" rel="noopener noreferrer" aria-label={`${curriculum.label} for ${title} (PDF, opens in a new tab)`}>
                              <FileText size={16} aria-hidden="true" />{curriculum.label}<span className="acp-pdf-tag">PDF</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}

            {isFallback && (
              <aside className="acp-upcoming">
                <Monitor size={22} aria-hidden="true" />
                <div><strong>Online learning is on the horizon.</strong><p>Online courses are coming soon. Explore our classroom programs above.</p></div>
                <span>Coming soon</span>
              </aside>
            )}
          </div>
        </section>

        {/* ---------- Approach ---------- */}
        <section className="acp-section acp-approach" aria-labelledby="acp-approach-title">
          <div className="acp-shell acp-approach-grid">
            <Reveal className="acp-approach-copy">
              <p className="acp-kicker acp-kicker-dark"><span aria-hidden="true" />The Alphira approach</p>
              <h2 id="acp-approach-title">Less noise.<br /><span>More understanding.</span></h2>
              <p>Trading education goes beyond finding a setup. Our classroom programs bring market analysis, risk awareness and trading psychology into the same conversation.</p>
            </Reveal>
            <Reveal as="ul" className="acp-values">
              {VALUES.map((v, i) => (
                <li key={v.title} style={{ "--i": i }}><span className="acp-values-n">{String(i + 1).padStart(2, "0")}</span><div><strong>{v.title}</strong><p>{v.text}</p></div></li>
              ))}
            </Reveal>
          </div>
        </section>

      </main>
    </>
  );
}
