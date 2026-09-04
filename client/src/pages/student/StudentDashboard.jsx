import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { getMyCourses } from "../../actions/courseActions";
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
        color: "bg-ember-orange text-black",
      };
    }

    const diffMs = startTime - now;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) {
      return {
        label: `Starts in ${diffMinutes}m`,
        canJoin: false,
        color: "bg-ember-orange/15 text-ember-orange",
      };
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 24) {
      return {
        label: `Starts in ${diffHours}h`,
        canJoin: false,
        color: "bg-ember-orange/15 text-ember-orange",
      };
    }

    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return {
      label: `Starts in ${diffDays} day${diffDays > 1 ? "s" : ""}`,
      canJoin: false,
      color: "bg-ember-orange/15 text-ember-orange",
    };
  };

  useEffect(() => {
    if (!userInfo) return;

    dispatch(getMyCourses());
    dispatch(getMyLiveCourses());
    dispatch(listWebinars());
    dispatch(getAnalyses());
  }, [dispatch, userInfo]);

  return (
    <div className="space-y-3">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-obsidian p-8 text-vellum"
      >
        <h1 className="font-serif text-3xl leading-tight md:text-4xl">
          Welcome, {userInfo?.user?.name}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
          Continue your trading journey with premium mentorship, live sessions
          and structured market education.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/dashboard/courses"
            className="rounded-pill bg-ember-orange px-5 py-3 font-mono text-sm font-semibold text-black transition hover:brightness-95"
          >
            My Courses
          </Link>
          <Link
            to="/dashboard/live-courses"
            className="rounded-pill border border-white/20 px-5 py-3 font-mono text-sm font-semibold text-vellum transition hover:border-white/40"
          >
            Live Classes
          </Link>
        </div>
      </motion.div>

      {/* MARKET ANALYSIS */}
      <div className="rounded-2xl bg-bone p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-graphite">
            Latest Market Analysis
          </h2>
          <Link
            to="/dashboard/market-analysis"
            className="text-sm font-medium text-ember-orange hover:brightness-90"
          >
            View All
          </Link>
        </div>

        {analyses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-pebble py-12 text-center">
            <p className="text-sm text-slate">No market analysis available.</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {analyses.slice(0, 3).map((analysis, i) => (
              <motion.div
                key={analysis._id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="overflow-hidden rounded-2xl bg-vellum transition duration-300 hover:-translate-y-1"
              >
                <img
                  src={
                    analysis.image ||
                    "https://via.placeholder.com/600x400?text=Market+Analysis"
                  }
                  alt={analysis.title}
                  className="h-40 w-full object-cover"
                />

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-pill bg-ember-orange/15 px-3 py-1 font-mono text-[11px] font-medium text-ember-orange">
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
                    className="mt-5 inline-block rounded-pill bg-obsidian px-4 py-2 font-mono text-xs font-medium text-vellum"
                  >
                    Read Analysis
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* RECENT COURSES */}
      <div className="rounded-2xl bg-bone p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-graphite">My Courses</h2>
          <Link
            to="/dashboard/courses"
            className="text-sm font-medium text-ember-orange hover:brightness-90"
          >
            View All
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-pebble py-12 text-center">
            <p className="text-sm text-slate">No enrolled courses yet.</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course._id}
                className="overflow-hidden rounded-2xl bg-vellum"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-40 w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=Course";
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

      {/* LIVE COURSES */}
      <div className="rounded-2xl bg-bone p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-graphite">Live Classes</h2>
          <Link
            to="/dashboard/live-courses"
            className="text-sm font-medium text-ember-orange hover:brightness-90"
          >
            View All
          </Link>
        </div>

        {liveCourses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-pebble py-12 text-center">
            <p className="text-sm text-slate">No live courses enrolled yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {liveCourses.slice(0, 3).map((course) => (
              <div
                key={course._id}
                className="flex flex-col justify-between rounded-2xl bg-vellum p-5 md:flex-row md:items-center"
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
      <div className="rounded-2xl bg-bone p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-graphite">
            Upcoming Webinars
          </h2>
        </div>

        {webinars.length === 0 ? (
          <div className="rounded-xl border border-dashed border-pebble py-12 text-center">
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
                  className="flex flex-col justify-between rounded-2xl bg-vellum p-5 md:flex-row md:items-center"
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
                        className="rounded-pill bg-ember-orange px-5 py-2.5 font-mono text-xs font-semibold text-black"
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
