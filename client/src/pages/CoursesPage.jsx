import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Clock, Monitor, ArrowRight } from "lucide-react";
import { API_URL } from "../config/api";
import forexImage from "../assets/images/forex-art.png";
import indianMarketImage from "../assets/images/indian-market-art.png";
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
    : courses.map((course) => ({ key: course._id, title: course.title, description: course.description, meta: COURSE_META[course.title] || DEFAULT_META }));

  return (
    <main className="alphira-catalog-page">
      <div className="alphira-catalog-container">
        <motion.header {...reveal()} className="alphira-catalog-header">
          <p className="alphira-catalog-eyebrow"><span aria-hidden="true" />Our Courses</p>
          <div className="alphira-catalog-heading-row">
            <h1>Learn trading<br /><span>like a professional.</span></h1>
            <p className="alphira-catalog-intro">Structured mentorship programs designed for aspiring traders who want to build long-term market understanding and disciplined execution.</p>
          </div>
        </motion.header>

        {loading ? (
          <div className="alphira-catalog-loading" role="status" aria-live="polite">
            <span className="alphira-catalog-loader" aria-hidden="true" />Loading courses…
          </div>
        ) : (
          <>
            {isFallback && (
              <motion.div {...reveal()} className="alphira-catalog-offline">
                <div><span className="alphira-catalog-status"><i aria-hidden="true" />Admissions Open</span><h2>Offline Trading Programs</h2></div>
                <p>Learn directly from experienced mentors through classroom training, practical chart analysis, live market sessions and professional trading mentorship.</p>
              </motion.div>
            )}

            <div className="alphira-catalog-programs">
              {programs.map(({ key, title, description, meta }, index) => (
                <motion.article {...reveal()} key={key} className="alphira-catalog-program">
                  <div className="alphira-catalog-program-visual">
                    <div className="alphira-catalog-image-wrap"><img src={meta.image} alt={title} loading="lazy" decoding="async" /></div>
                    <span className="alphira-catalog-program-number">PROGRAM <span>{String(index + 1).padStart(2, "0")}</span></span>
                  </div>
                  <div className="alphira-catalog-program-content">
                    <span className="alphira-catalog-status"><i aria-hidden="true" />{meta.badge}</span>
                    <h2>{title}</h2>
                    <p className="alphira-catalog-description">{description}</p>
                    {meta.features.length > 0 && <ul className="alphira-catalog-features">{meta.features.map((feature) => <li key={feature}><Check size={14} strokeWidth={1.8} aria-hidden="true" /><span>{feature}</span></li>)}</ul>}
                  </div>
                  <div className="alphira-catalog-enrollment">
                    {meta.duration && <div className="alphira-catalog-duration"><Clock size={18} strokeWidth={1.5} aria-hidden="true" /><div><span>Duration</span><strong>{meta.duration}</strong></div></div>}
                    <button type="button" className="alphira-catalog-apply" onClick={() => navigate("/admission")}>Apply for Admission <ArrowUpRight size={18} aria-hidden="true" /></button>
                  </div>
                </motion.article>
              ))}
            </div>

            {isFallback && (
              <motion.aside {...reveal()} className="alphira-catalog-upcoming">
                <span className="alphira-catalog-monitor" aria-hidden="true"><Monitor size={28} strokeWidth={1.4} /></span>
                <div><p className="alphira-catalog-eyebrow">Launching Soon</p><h2>Online Courses <span>Coming Soon</span></h2><p className="alphira-catalog-description">We're building a premium online learning experience featuring recorded video lessons, live webinars, quizzes, downloadable study materials and mentor support so you can learn from anywhere.</p></div>
              </motion.aside>
            )}
          </>
        )}

        <motion.section {...reveal()} className="alphira-catalog-cta" aria-labelledby="alphira-catalog-cta-title">
          <div><h2 id="alphira-catalog-cta-title">Ready to start your<br /><span>trading journey?</span></h2><p>Join Alphira Capital and learn professional trading through structured mentorship, practical strategies and premium market education.</p></div>
          <div className="alphira-catalog-cta-actions"><Link to="/admission" className="alphira-catalog-primary">Join Alphira Capital Today <ArrowUpRight size={18} aria-hidden="true" /></Link><Link to="/login" className="alphira-catalog-login">Student Login <ArrowRight size={16} aria-hidden="true" /></Link></div>
        </motion.section>
      </div>
    </main>
  );
}


