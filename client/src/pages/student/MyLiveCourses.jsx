import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Radio, CalendarDays, Clock3 } from "lucide-react";
import { getMyLiveCourses } from "../../actions/liveCourseActions";
import "./MyLiveCourses.css";

const formatDate = (value) => {
  if (!value) return "To be announced";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "To be announced" : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const MyLiveCourses = () => {
  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, liveCourses = [] } = useSelector((state) => state.myLiveCourses);

  useEffect(() => {
    if (userInfo) dispatch(getMyLiveCourses());
  }, [dispatch, userInfo]);

  return (
    <section className="alphira-live-classes" aria-labelledby="live-classes-title">
      <header className="alphira-live-heading">
        <div><span className="alphira-live-eyebrow">Your academy / Live mentorship</span><h1 id="live-classes-title">My live classes.</h1><p>Your mentors, your schedule and your next session—all in one place.</p></div>
        <div className="alphira-live-count"><Radio size={20} aria-hidden="true" /><strong>{loading ? "…" : error ? "—" : liveCourses.length}</strong><span>Enrolled {liveCourses.length === 1 ? "batch" : "batches"}</span></div>
      </header>

      {loading ? (
        <div className="alphira-live-state" role="status"><span className="alphira-live-loading" aria-hidden="true" /><h2>Loading your classes</h2><p>Getting your mentorship schedule ready.</p></div>
      ) : error ? (
        <div className="alphira-live-state" role="alert"><h2>Unable to load your classes</h2><p>{error}</p><button type="button" className="alphira-live-button" onClick={() => dispatch(getMyLiveCourses())}>Try again</button></div>
      ) : liveCourses.length === 0 ? (
        <div className="alphira-live-state"><Radio size={28} aria-hidden="true" /><h2>Your next chapter starts here.</h2><p>You are not enrolled in a live mentorship batch yet. Your classes will appear here once you are enrolled.</p></div>
      ) : (
        <div className="alphira-live-grid">
          {liveCourses.map((course, index) => {
            const isLive = course.status === "live";
            const completed = course.status === "completed";
            const meetLink = course.meetLink?.trim();
            return (
              <motion.article
                key={course._id}
                className={`alphira-live-card${isLive ? " is-live" : ""}`}
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: Math.min(index, 4) * 0.06 }}
              >
                <div className="alphira-live-card-top"><span>MENTORSHIP / {String(index + 1).padStart(2, "0")}</span><span className={`alphira-live-status ${isLive ? "is-live" : completed ? "is-completed" : ""}`}>{isLive ? "Live now" : completed ? "Completed" : course.status || "Upcoming"}</span></div>
                <div className="alphira-live-card-body">
                  <h2>{course.title}</h2>
                  <p className="alphira-live-description">{course.description}</p>
                  <div className="alphira-live-schedule"><Clock3 size={20} aria-hidden="true" /><div><span>Class time</span><strong>{course.classTime || "To be announced"}</strong></div></div>
                  <dl className="alphira-live-details">
                    <div><dt>Instructor</dt><dd>{course.instructor || "To be announced"}</dd></div>
                    <div><dt>Duration</dt><dd>{course.durationMonths ? `${course.durationMonths} ${Number(course.durationMonths) === 1 ? "month" : "months"}` : "To be announced"}</dd></div>
                    <div><dt><CalendarDays size={14} aria-hidden="true" />Starts</dt><dd>{formatDate(course.startDate)}</dd></div>
                  </dl>
                  <div className="alphira-live-card-action">
                    {isLive && meetLink ? <a href={meetLink.startsWith("http") ? meetLink : `https://${meetLink}`} target="_blank" rel="noreferrer" className="alphira-live-button">Join Google Meet <ArrowUpRight size={17} aria-hidden="true" /></a> : <p className="alphira-live-unavailable">{completed ? "Session completed" : isLive ? "Joining link will be available soon" : "Class not started yet"}</p>}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MyLiveCourses;
