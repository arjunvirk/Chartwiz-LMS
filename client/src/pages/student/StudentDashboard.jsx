import "./StudentDashboard.css";
import forexImage from "../../assets/images/forex-art.png";
import indianMarketImage from "../../assets/images/indian-market-art.png";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";

import { getMyLiveCourses } from "../../actions/liveCourseActions";
import { listWebinars } from "../../actions/webinarActions";
import { getAnalyses } from "../../actions/marketAnalysisActions";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { courses = [] } = useSelector((state) => state.myCourses);
  const { liveCourses = [] } = useSelector((state) => state.myLiveCourses);

  const webinarList = useSelector((state) => state.webinarList);
  const { webinars = [] } = webinarList;

  const analysisList = useSelector((state) => state.analysisList);
  const { analyses = [] } = analysisList;

  const getWebinarStatus = (webinar) => {
    const now = new Date();
    const startTime = new Date(webinar.startTime);
    const endTime = new Date(
      startTime.getTime() + webinar.duration * 60 * 1000,
    );
    const fifteenMinutesBefore = new Date(startTime.getTime() - 15 * 60 * 1000);

    if (now > endTime) {
      return {
        label: "Completed",
        canJoin: false,
        color: "border border-pebble text-slate",
      };
    }

    if (now >= fifteenMinutesBefore) {
      return {
        label: "Join Webinar",
        canJoin: true,
        color: "alphira-student-ready",
      };
    }

    const diffMs = startTime - now;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) {
      return {
        label: `Starts in ${diffMinutes}m`,
        canJoin: false,
        color: "alphira-student-waiting",
      };
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 24) {
      return {
        label: `Starts in ${diffHours}h`,
        canJoin: false,
        color: "alphira-student-waiting",
      };
    }

    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return {
      label: `Starts in ${diffDays} day${diffDays > 1 ? "s" : ""}`,
      canJoin: false,
      color: "alphira-student-waiting",
    };
  };

  useEffect(() => {
    if (!userInfo) return;

    dispatch(getMyLiveCourses());
    dispatch(listWebinars());
    dispatch(getAnalyses());
  }, [dispatch, userInfo]);

  return (
    <div className="alphira-student-home">
      {/* HERO */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="alphira-student-hero"
      >
        <h1 className="font-serif text-3xl leading-tight md:text-4xl">
          Your academy, {userInfo?.user?.name?.split(" ")[0] || "your space"}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
          Your academy programs, mentor insights and scheduled sessions,
          together in one place.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/dashboard/courses"
            className="alphira-student-primary"
          >
            My Courses
          </Link>
          <Link
            to="/dashboard/live-courses"
            className="alphira-student-secondary"
          >
            Live Classes
          </Link>
        </div>
      </motion.div>

      {/* RECENT COURSES */}
      <div className="alphira-student-section">
        <div className="alphira-student-section-heading">
          <h2 className="text-xl font-semibold text-graphite">My Courses</h2>
          <Link
            to="/dashboard/courses"
            className="alphira-student-view"
          >
            View All
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="alphira-student-empty">
            <p className="text-sm text-slate">No enrolled courses yet.</p>
          </div>
        ) : (
          <div className="alphira-student-card-grid">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course._id}
                className="alphira-student-card"
              >
                <img
                  src={/indian|india/i.test(course.title || "") ? indianMarketImage : /forex/i.test(course.title || "") ? forexImage : course.thumbnail}
                  alt={course.title}
                  className="h-40 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/alphira-ac-logo.svg";
                  }}
                />
                <div className="p-5">
                  <h3 className="line-clamp-2 text-base font-semibold text-graphite">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate">{course.instructor}</p>
                  <p className="mt-1 font-mono text-xs uppercase text-slate">
                    Offline course
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MARKET ANALYSIS */}
      <div className="alphira-student-section">
        <div className="alphira-student-section-heading">
          <h2 className="text-xl font-semibold text-graphite">
            Latest Market Analysis
          </h2>
          <Link
            to="/dashboard/market-analysis"
            className="alphira-student-view"
          >
            View All
          </Link>
        </div>

        {analyses.length === 0 ? (
          <div className="alphira-student-empty">
            <p className="text-sm text-slate">No market analysis available.</p>
          </div>
        ) : (
          <div className="alphira-student-card-grid">
            {analyses.slice(0, 3).map((analysis, i) => (
              <motion.div
                key={analysis._id}
                variants={fadeUp}
                initial={reducedMotion ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="alphira-student-card"
              >
                <img
                  src={
                    analysis.image ||
                    "/alphira-ac-logo.svg"
                  }
                  alt={analysis.title}
                  className="h-40 w-full object-cover"
                />

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="alphira-student-badge">
                      {analysis.market}
                    </span>
                    {analysis.featured && (
                      <span className="rounded-pill border border-pebble px-3 py-1 font-mono text-[11px] font-medium text-slate">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-base font-semibold text-graphite">
                    {analysis.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm text-slate">
                    {analysis.content}
                  </p>

                  <p className="mt-3 text-xs text-slate">
                    By {analysis.author?.name || "Alphira Capital"}
                  </p>

                  <Link
                    to={`/dashboard/market-analysis/${analysis._id}`}
                    className="alphira-student-read"
                  >
                    Read Analysis
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* LIVE COURSES */}
      <div className="alphira-student-section">
        <div className="alphira-student-section-heading">
          <h2 className="text-xl font-semibold text-graphite">Live Classes</h2>
          <Link
            to="/dashboard/live-courses"
            className="alphira-student-view"
          >
            View All
          </Link>
        </div>

        {liveCourses.length === 0 ? (
          <div className="alphira-student-empty">
            <p className="text-sm text-slate">No live courses enrolled yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {liveCourses.slice(0, 3).map((course) => (
              <div
                key={course._id}
                className="alphira-student-session"
              >
                <div>
                  <h3 className="text-sm font-semibold text-graphite">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate">{course.instructor}</p>
                </div>
                <div className="mt-3 md:mt-0">
                  <span className="rounded-pill bg-obsidian px-4 py-2 font-mono text-[11px] font-medium text-vellum">
                    {course.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* UPCOMING WEBINARS */}
      <div className="alphira-student-section">
        <div className="alphira-student-section-heading">
          <h2 className="text-xl font-semibold text-graphite">
            Upcoming Webinars
          </h2>
        </div>

        {webinars.length === 0 ? (
          <div className="alphira-student-empty">
            <p className="text-sm text-slate">
              No upcoming webinars available.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {webinars.slice(0, 5).map((webinar) => {
              const status = getWebinarStatus(webinar);

              return (
                <div
                  key={webinar._id}
                  className="alphira-student-session"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-graphite">
                      {webinar.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate">
                      {webinar.description}
                    </p>
                    <p className="mt-2 text-xs text-slate">
                      {new Date(webinar.startTime).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0">
                    {status.canJoin ? (
                      <a
                        href={webinar.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="alphira-student-join"
                      >
                        Join Webinar
                      </a>
                    ) : (
                      <span
                        className={`rounded-pill px-5 py-2.5 font-mono text-xs font-semibold ${status.color}`}
                      >
                        {status.label}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
