import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { API_URL } from "../config/api";
import forexImage from "../assets/images/forex.jpg";
import indianMarketImage from "../assets/images/indianmarket.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Fallback content used when the backend course doesn't provide
// features / duration / badge yet. Keyed by course title so both
// known programs still look intentional instead of empty.
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

const CoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalCourses = courses?.length || 0;
  const totalStudents = courses?.reduce(
    (total, course) => total + (course.students?.length || 0),
    0,
  );
  const totalLessons = courses?.reduce(
    (total, course) => total + (course.videos?.length || 0),
    0,
  );

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

  return (
    <section className="min-h-screen bg-vellum py-10">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* COURSES */}
        <div className="mt-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div>
              <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
                Our Courses
              </span>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-graphite sm:text-5xl">
                Learn trading like a professional
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
              Structured mentorship programs designed for aspiring traders who
              want to build long-term market understanding and disciplined
              execution.
            </p>
          </motion.div>

          {/* GRID */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-obsidian border-t-transparent" />
            </div>
          ) : courses.length === 0 ? (
            <div className="mt-16">
              {/* HERO CARD */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="overflow-hidden rounded-3xl bg-obsidian px-8 py-16 text-center text-vellum"
              >
                <span className="inline-flex items-center rounded-[600px] border border-white/15 px-5 py-2 font-mono text-xs uppercase tracking-[-0.02em] text-ember-orange">
                  Admissions Open
                </span>

                <h2 className="mt-6 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                  Offline{" "}
                  <span className="text-ember-orange">Trading Programs</span>
                </h2>

                <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-mist">
                  Learn directly from experienced mentors through classroom
                  training, practical chart analysis, live market sessions and
                  professional trading mentorship.
                </p>
              </motion.div>

              {/* OFFLINE COURSES (static fallback — no courses from API yet) */}
              <div className="mt-14 grid gap-3 lg:grid-cols-2">
                {Object.entries(COURSE_META).map(([title, meta], i) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={i + 1}
                    className="overflow-hidden rounded-3xl bg-bone transition duration-300 hover:-translate-y-1"
                  >
                    <img
                      src={meta.image}
                      alt={title}
                      className="h-60 w-full object-cover"
                    />

                    <div className="p-8">
                      <div className="flex items-center justify-between">
                        <span className="rounded-[600px] bg-ember-orange px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide text-black">
                          {meta.badge}
                        </span>
                        <span className="rounded-[600px] bg-obsidian px-4 py-1.5 font-mono text-xs font-medium text-vellum">
                          {meta.duration}
                        </span>
                      </div>

                      <h3 className="mt-8 font-serif text-3xl leading-tight text-graphite">
                        {title}
                      </h3>

                      <p className="mt-4 text-sm leading-relaxed text-slate">
                        {title === "The Forex Program"
                          ? "A complete classroom-based Forex trading program covering technical analysis, market structure, risk management, psychology and live market execution."
                          : "Master both Forex and the Indian Stock Market with comprehensive classroom training, live trading sessions and professional mentorship."}
                      </p>

                      <div className="mt-8 grid gap-3">
                        {meta.features.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 text-sm text-graphite"
                          >
                            <span className="text-ember-orange">✔</span>
                            {item}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => navigate("/admission")}
                        className="mt-10 w-full rounded-[600px] bg-obsidian py-4 font-mono text-sm font-medium text-vellum transition hover:bg-ember-orange hover:text-black"
                      >
                        Apply for Admission
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ONLINE COMING SOON */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-14 rounded-3xl border border-dashed border-pebble bg-vellum p-10 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-obsidian text-3xl">
                  💻
                </div>

                <h3 className="mt-6 font-serif text-3xl leading-tight text-graphite sm:text-4xl">
                  Online Courses{" "}
                  <span className="text-ember-orange">Coming Soon</span>
                </h3>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate">
                  We're building a premium online learning experience featuring
                  recorded video lessons, live webinars, quizzes, downloadable
                  study materials and mentor support so you can learn from
                  anywhere.
                </p>

                <div className="mt-8 inline-flex rounded-[600px] bg-bone px-6 py-3 font-mono text-sm font-medium text-ember-orange">
                  🚀 Launching Soon
                </div>
              </motion.div>
            </div>
          ) : (
            // COURSES FROM API — now using the same rich card design
            <div className="mt-14 grid gap-3 lg:grid-cols-2">
              {courses.map((course, i) => {
                const meta = COURSE_META[course.title] || DEFAULT_META;

                return (
                  <motion.div
                    key={course._id}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={i + 1}
                    className="overflow-hidden rounded-3xl bg-bone transition duration-300 hover:-translate-y-1"
                  >
                    <img
                      src={meta.image}
                      alt={course.title}
                      className="h-60 w-full object-cover"
                    />

                    <div className="p-8">
                      <div className="flex items-center justify-between">
                        <span className="rounded-[600px] bg-ember-orange px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide text-black">
                          {meta.badge}
                        </span>
                        {meta.duration && (
                          <span className="rounded-[600px] bg-obsidian px-4 py-1.5 font-mono text-xs font-medium text-vellum">
                            {meta.duration}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-8 font-serif text-3xl leading-tight text-graphite">
                        {course.title}
                      </h3>

                      <p className="mt-4 text-sm leading-relaxed text-slate">
                        {course.description}
                      </p>

                      {meta.features.length > 0 && (
                        <div className="mt-8 grid gap-3">
                          {meta.features.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-3 text-sm text-graphite"
                            >
                              <span className="text-ember-orange">✔</span>
                              {item}
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={() => navigate("/admission")}
                        className="mt-10 w-full rounded-[600px] bg-obsidian py-4 font-mono text-sm font-medium text-vellum transition hover:bg-ember-orange hover:text-black"
                      >
                        Apply for Admission
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-24 overflow-hidden rounded-3xl bg-obsidian px-6 py-14 text-center text-vellum sm:px-10 lg:px-16 lg:py-20"
        >
          <h2 className="font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Ready to start your{" "}
            <span className="text-ember-orange">trading journey?</span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-mist sm:text-lg">
            Join ChartWiz Academy and learn professional trading through
            structured mentorship, practical strategies and premium market
            education.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/admission"
              className="rounded-[600px] bg-ember-orange px-8 py-3.5 font-mono text-sm font-medium text-black transition hover:brightness-95"
            >
              Join ChartWiz Today
            </Link>
            <Link
              to="/login"
              className="rounded-[600px] border border-white/15 px-8 py-3.5 font-mono text-sm font-medium text-vellum transition hover:border-white/30"
            >
              Student Login
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesPage;
