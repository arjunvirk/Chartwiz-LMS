import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ArrowUpRight, Radio } from "lucide-react";
import { getLiveCourses, enrollLiveCourse } from "../actions/liveCourseActions";
import toast from "react-hot-toast";
import "./LiveCoursesPage.css";

export default function LiveCoursesPage() {
  const dispatch = useDispatch();
  const liveCourseList = useSelector((state) => state.liveCourseList);
  const { loading, error, liveCourses = [] } = liveCourseList;

  useEffect(() => {
    dispatch(getLiveCourses());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const enrollHandler = async (id) => {
    try {
      await dispatch(enrollLiveCourse(id));
      toast.success("Successfully enrolled!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const reduced = useReducedMotion();
  const reveal = (delay = 0) => ({ initial: reduced ? false : { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 }, transition: { duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay } });
  return <main className="alphira-live-page">
    <div className="alphira-live-container">
      <motion.header {...reveal()} className="alphira-live-heading">
        <p className="alphira-live-eyebrow"><Radio size={15} aria-hidden="true" />Live Mentorship</p>
        <div><h1>Live Mentorship<br /><span>Batches.</span></h1><p>Join professional live trading mentorship batches, market analysis sessions and webinars. Enroll now and access scheduled classes directly from your student dashboard.</p></div>
      </motion.header>
      {loading ? <div className="alphira-live-page-loading" role="status"><span aria-hidden="true" />Loading mentorship batches…</div> : liveCourses.length === 0 ? (
        <motion.section {...reveal()} className="alphira-live-empty">
          <span className="alphira-live-empty-icon" aria-hidden="true"><CalendarDays size={36} strokeWidth={1.3} /></span>
          <h2>Live Courses<br /><span>Coming Soon</span></h2>
          <p>New mentorship batches will be announced shortly.</p>
        </motion.section>
      ) : <div className="alphira-live-list">{liveCourses.map((course, index) => (
        <motion.article {...reveal()} key={course._id} className="alphira-live-batch">
          <div className="alphira-live-batch-main">
            <div className="alphira-live-batch-top"><span className="alphira-live-batch-number">BATCH {String(index + 1).padStart(2, "0")}</span><span className={`alphira-live-status${course.status === "live" ? " is-live" : ""}`}><i aria-hidden="true" />{course.status}</span></div>
            <h2>{course.title}</h2><p>{course.description}</p>
            <div className="alphira-live-teacher"><span>Instructor</span><strong>{course.instructor}</strong></div>
          </div>
          <div className="alphira-live-schedule">
            <span className="alphira-live-schedule-label"><CalendarDays size={17} aria-hidden="true" />Class schedule</span>
            <dl><div><dt>Start Date</dt><dd>{new Date(course.startDate).toLocaleDateString()}</dd></div><div><dt>Class Time</dt><dd>{course.classTime}</dd></div><div><dt>Duration</dt><dd>{course.durationMonths} Months</dd></div></dl>
          </div>
          <div className="alphira-live-enroll"><div><span>Course Fee</span><p>₹{course.price}</p></div><button type="button" onClick={() => enrollHandler(course._id)}>Enroll in Mentorship <ArrowUpRight size={18} aria-hidden="true" /></button></div>
        </motion.article>
      ))}</div>}
    </div>
  </main>;
}

