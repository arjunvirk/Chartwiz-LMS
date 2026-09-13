import forexImage from "../../assets/images/forex-art.png";
import indianMarketImage from "../../assets/images/indian-market-art.png";
import "./MyCourses.css";
import { BookOpen } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const MyCourses = () => {
  const reducedMotion = useReducedMotion();
  const myCourses = useSelector((state) => state.myCourses);
  const { loading, error, courses = [] } = myCourses;


  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="alphira-my-courses">
      {/* TITLE */}
      <div className="alphira-my-courses-heading">
        <p className="alphira-my-courses-eyebrow">Your academy / Enrollment</p>
        <h1>
          My Courses
        </h1>
        <p className="mt-2 text-sm text-slate">
          Your enrolled programs at Alphira Capital. Classes take place at the academy.
        </p>
      </div>

      {loading ? (
        <div className="alphira-my-courses-state" role="status">
          Loading your courses…
        </div>
      ) : error ? <div className="alphira-my-courses-state is-error" role="alert">{error}</div> : courses?.length === 0 ? (
        <div className="alphira-my-courses-state">
          <BookOpen size={30} aria-hidden="true" /><h2>No courses yet</h2>
          <p className="mt-3 text-sm text-slate">
            You are not enrolled in any course.
          </p>
        </div>
      ) : (
        <div className="alphira-my-courses-grid">
          {courses.map((course, i) => (
            <motion.div
              key={course._id}
              variants={fadeUp}
              initial={reducedMotion ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="alphira-my-course-card"
            >
              {/* THUMBNAIL */}
              <div className="alphira-my-course-image">
                <img className="alphira-my-course-fallback" src="/alphira-ac-logo.svg" alt="" aria-hidden="true" />
                <img
                  src={/indian|india/i.test(course.title || "") ? indianMarketImage : /forex/i.test(course.title || "") ? forexImage : course.thumbnail}
                  alt={`${course.title} program`} key={course.thumbnail}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="alphira-my-course-body">
                <span className="alphira-my-course-category">
                  {course.category || "Trading education"}
                </span>

                <h2 className="alphira-my-course-title">
                  {course.title}
                </h2>

                <p className="alphira-my-course-description">
                  {course.description}
                </p>

                <div className="alphira-my-course-meta">
                  <div><p>Enrollment</p><h4>Enrolled</h4></div>
                  <div><p>Learning format</p><h4>Offline · In person</h4></div>
                </div>
                <div className="alphira-my-course-academy">Alphira Capital<span>Academy program</span></div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
