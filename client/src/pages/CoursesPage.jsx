import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Clock, Monitor, ArrowRight, GraduationCap } from "lucide-react";
import { API_URL } from "../config/api";
import forexImage from "../assets/images/forex-art.png";
import indianMarketImage from "../assets/images/indian-market-art.png";
import orderFlowImage from "../assets/images/order-flow-art.svg";
import "./CoursesPage.css";
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

const DEFAULT_META = {
  image: forexImage,
  duration: null,
  badge: "Admissions Open",
  features: [],
};
export default function CoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const reducedMotion = useReducedMotion();
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
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.08 },
    transition: { duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });
  const isFallback = !loading && courses.length === 0;
  const programs = isFallback
    ? Object.entries(COURSE_META).map(([title, meta]) => ({
        key: title, title, meta,
        description: title === "The Forex Program"
          ? "A complete classroom-based Forex trading program covering technical analysis, market structure, risk management, psychology and live market execution."
          : "Master both Forex and the Indian Stock Market with comprehensive classroom training, live trading sessions and professional mentorship.",
      }))
    : courses.map((course) => ({ key: course._id, title: course.title, description: course.description, meta: isOrderFlow(course.title) ? ORDER_FLOW_PROGRAM.meta : COURSE_META[course.title] || DEFAULT_META }));

  if (!programs.some((program) => isOrderFlow(program.title))) {
    programs.push(ORDER_FLOW_PROGRAM);
  }

  return (
    <main className="ac-programs">
      <div className="ac-programs-shell">
        <motion.header {...reveal()} className="ac-programs-hero">
          <div className="ac-programs-hero-copy">
            <p className="ac-programs-kicker"><span /> ALPHIRA CAPITAL / THE ACADEMY</p>
            <h1>Understand the market.<br /><em>Build your edge.</em></h1>
            <p className="ac-programs-lede">From your first chart to a deeper understanding of order flow. Learn through structured classroom education, practical analysis and mentorship.</p>
            <a className="ac-programs-button" href="#academy-programs">Explore the programs <ArrowRight size={18} /></a>
            <div className="ac-programs-hero-note"><GraduationCap size={18} strokeWidth={1.5} /><span>Classroom learning. Real market context.</span></div>
          </div>
          <div className="ac-programs-art" aria-hidden="true">
            <div className="ac-programs-art-top"><span>THE LEARNING CURVE</span><span>AC / 01</span></div>
            <svg viewBox="0 0 500 360" fill="none">
              <path d="M30 60H470M30 120H470M30 180H470M30 240H470M30 300H470M80 35V325M165 35V325M250 35V325M335 35V325M420 35V325" stroke="#424b3c" />
              <path d="M30 290L95 266L147 282L207 213L255 230L304 154L355 173L406 92L470 56" stroke="#cedcba" strokeWidth="3" className="ac-programs-curve" />
              <path d="M30 290L95 266L147 282L207 213L255 230L304 154L355 173L406 92L470 56V325H30Z" fill="url(#ac-programs-shade)" />
              <rect x="199" y="205" width="16" height="16" fill="#cedcba"/><rect x="398" y="84" width="16" height="16" fill="#cedcba"/>
              <defs><linearGradient id="ac-programs-shade" x1="250" y1="56" x2="250" y2="325" gradientUnits="userSpaceOnUse"><stop stopColor="#cedcba" stopOpacity=".15"/><stop offset="1" stopColor="#cedcba" stopOpacity="0"/></linearGradient></defs>
            </svg>
            <div className="ac-programs-art-bottom"><strong>Knowledge.<br />Perspective.<br /><span>Discipline.</span></strong><span>LEARNING, NOT<br />A PERFORMANCE CHART</span></div>
          </div>
        </motion.header>
        <div className="ac-programs-principles"><span><b>01</b> Learn the concepts</span><span><b>02</b> Read the market</span><span><b>03</b> Develop discipline</span></div>
        <section id="academy-programs" className="ac-programs-selection" aria-labelledby="ac-programs-title">
          <div className="ac-programs-section-head"><div><p className="ac-programs-kicker">FIND YOUR FOCUS</p><h2 id="ac-programs-title">Your next chapter<br />starts here.</h2></div><p>Choose a focused market program or go deeper with advanced order flow education.</p></div>
          {loading ? <div className="ac-programs-loading" role="status"><span />Loading programs...</div> : <div className="ac-programs-grid">
            {programs.map(({ key, title, description, meta }, index) => {
              const advanced = isOrderFlow(title);
              return <motion.article {...reveal(index * 0.06)} key={key} className={`ac-programs-card${advanced ? " ac-programs-card-advanced" : ""}`}>
                <div className="ac-programs-card-top"><span>PROGRAM / {String(index + 1).padStart(2, "0")}</span><span>{advanced ? "ADVANCED" : "CLASSROOM"}</span></div>
                <div className="ac-programs-cover"><img src={meta.image} alt="" loading="lazy" decoding="async" /><span className="ac-programs-cover-label">{advanced ? "Read beyond the chart." : title.includes("Indian") ? "Two markets. A wider perspective." : "Build your market foundation."}</span></div>
                <div className="ac-programs-card-body">
                  <p className="ac-programs-availability"><span />{meta.badge}</p>
                  <h3>{title}</h3><p className="ac-programs-description">{description}</p>
                  {meta.features.length > 0 && <ul>{meta.features.map(feature => <li key={feature}><Check size={14} aria-hidden="true" />{feature}</li>)}</ul>}
                  <div className="ac-programs-card-end"><div className="ac-programs-duration"><Clock size={15} aria-hidden="true" /><span>{meta.duration || "Ask us about the schedule"}</span></div><button type="button" onClick={() => navigate(`/admission?course=${encodeURIComponent(title)}`)}>Apply for admission <ArrowUpRight size={19} aria-hidden="true" /></button></div>
                </div>
              </motion.article>;
            })}
          </div>}
        </section>
        <motion.section {...reveal()} className="ac-programs-approach" aria-labelledby="ac-programs-approach-title"><p className="ac-programs-kicker">THE ALPHIRA APPROACH</p><div><h2 id="ac-programs-approach-title">Less noise.<br />More understanding.</h2><p>Trading education goes beyond finding a setup. Our classroom programs bring market analysis, risk awareness and trading psychology into the same conversation.</p></div><div className="ac-programs-values"><span>Practical learning <ArrowUpRight size={18} /></span><span>Mentor guidance <ArrowUpRight size={18} /></span><span>Disciplined thinking <ArrowUpRight size={18} /></span></div></motion.section>
        {isFallback && <aside className="ac-programs-upcoming"><Monitor size={22} aria-hidden="true" /><div><strong>Online learning is on the horizon.</strong><p>Online courses are coming soon. Explore our classroom programs above.</p></div><span>COMING SOON</span></aside>}
        <motion.section {...reveal()} className="ac-programs-contact"><div><p className="ac-programs-kicker">TAKE THE NEXT STEP</p><h2>Make room for<br /><em>what comes next.</em></h2></div><div><p>Start your admission journey with Alphira Capital.</p><Link className="ac-programs-button" to="/admission">Apply for admission <ArrowUpRight size={18} /></Link><Link className="ac-programs-login" to="/login">Already a student? Sign in <ArrowRight size={15} /></Link></div></motion.section>
      </div>
    </main>
  );
}
