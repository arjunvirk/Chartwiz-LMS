import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, ArrowUpRight, Trash2, X, Radio, Clock3 } from "lucide-react";
import fetchWithAuth from "../../utils/fetchWithAuth";
import { getTeacherLiveCourses, deleteLiveCourse } from "../../actions/liveCourseActions";
import toast from "react-hot-toast";
import { API_URL } from "../../config/api";
import "../student/MyLiveCourses.css";
import "./TeacherLiveCourses.css";

const TeacherLiveCourses = () => {
  const [meetLink, setMeetLink] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const dispatch = useDispatch();
  const dialogRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { loading, error, liveCourses = [] } = useSelector((state) => state.teacherLiveCourses);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) dispatch(getTeacherLiveCourses());
  }, [dispatch, userInfo]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedCourse) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [selectedCourse]);

  const deleteHandler = async (id) => {
    if (!window.confirm("Are you sure you want to delete this live course?")) return;
    try {
      await dispatch(deleteLiveCourse(id));
      toast.success("Live course deleted successfully");
      dispatch(getTeacherLiveCourses());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const publishHandler = async () => {
    if (publishing) return;
    try {
      if (!meetLink.trim()) return toast.error("Google Meet link is required");
      if (!meetLink.startsWith("https://meet.google.com")) return toast.error("Enter a valid Google Meet link");
      setPublishing(true);
      await fetchWithAuth(dispatch, `${API_URL}/api/live-courses/${selectedCourse}/publish`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetLink }),
      });
      toast.success("Session published successfully");
      setMeetLink("");
      setSelectedCourse(null);
      dispatch(getTeacherLiveCourses());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <section className="alphira-live-classes alphira-teacher-live" aria-labelledby="teacher-live-title">
      <header className="alphira-live-heading"><div><span className="alphira-live-eyebrow">Teaching workspace / Live mentorship</span><h1 id="teacher-live-title">Bring your batch together.</h1><p>Manage your programs, publish sessions and connect with your students.</p></div><Link to="/teacher/dashboard/create-live-course" className="alphira-live-button"><Plus size={16} aria-hidden="true" />Create live batch</Link></header>
      <div className="alphira-teacher-live-bar"><span><Radio size={19} aria-hidden="true" />MENTORSHIP BATCHES</span><strong>{loading ? "…" : error ? "—" : liveCourses.length}</strong></div>
      {loading ? <div className="alphira-live-state" role="status"><span className="alphira-live-loading" aria-hidden="true" /><h2>Loading your batches</h2></div> : error ? <div className="alphira-live-state" role="alert"><h2>Unable to load live courses</h2><p>{error}</p><button type="button" className="alphira-live-button" onClick={() => dispatch(getTeacherLiveCourses())}>Try again</button></div> : liveCourses.length === 0 ? <div className="alphira-live-state"><Radio size={28} aria-hidden="true" /><h2>Your next batch starts here.</h2><p>Create your first live mentorship program using the button above.</p></div> : (
        <div className="alphira-live-grid">{liveCourses.map((course, index) => {
          const date = course.startDate ? new Date(course.startDate) : null;
          return <motion.article key={course._id} className={`alphira-live-card${course.status === "live" ? " is-live" : ""}`} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, delay: Math.min(index,4)*0.05 }}>
            <div className="alphira-live-card-top"><span>BATCH / {String(index+1).padStart(2,"0")}</span><span className={`alphira-live-status ${course.status === "live" ? "is-live" : course.status === "completed" ? "is-completed" : ""}`}>{course.status || "Upcoming"}</span></div>
            <div className="alphira-live-card-body"><h2>{course.title}</h2><p className="alphira-live-description">{course.description}</p><div className="alphira-live-schedule"><Clock3 size={20} aria-hidden="true" /><div><span>Class time</span><strong>{course.classTime || "To be announced"}</strong></div></div>
              <dl className="alphira-live-details"><div><dt>Course fee</dt><dd>{new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:2}).format(Number(course.price)||0)}</dd></div><div><dt>Duration</dt><dd>{course.durationMonths} months</dd></div><div><dt>Start date</dt><dd>{date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}) : "To be announced"}</dd></div><div><dt>Students</dt><dd>{course.students?.length || 0}</dd></div></dl>
              {course.status !== "live" ? <button type="button" onClick={() => { setMeetLink(""); setSelectedCourse(course._id); }} className="alphira-live-button"><Radio size={16} aria-hidden="true" />Publish session</button> : <a href={course.meetLink} target="_blank" rel="noreferrer" className="alphira-live-button">Open Google Meet <ArrowUpRight size={16} aria-hidden="true" /></a>}
              <button type="button" onClick={() => deleteHandler(course._id)} className="alphira-teacher-live-delete" aria-label={`Delete live course: ${course.title}`}><Trash2 size={14} aria-hidden="true" />Delete course</button>
            </div>
          </motion.article>;
        })}</div>
      )}
      <dialog ref={dialogRef} className="alphira-teacher-live-dialog" aria-labelledby="publish-session-title" onCancel={(event) => { event.preventDefault(); if (!publishing) setSelectedCourse(null); }} onClick={(event) => { if (event.target === event.currentTarget && !publishing) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) setSelectedCourse(null); } }}>
        <div className="alphira-teacher-live-dialog-header"><span>ALPHIRA / SESSION ACCESS</span><button type="button" autoFocus aria-label="Close publish session" disabled={publishing} onClick={() => setSelectedCourse(null)}><X size={19} aria-hidden="true" /></button></div>
        <form onSubmit={(event) => { event.preventDefault(); publishHandler(); }} aria-busy={publishing}><h2 id="publish-session-title">Ready to go live?</h2><p>{liveCourses.find((course) => course._id === selectedCourse)?.title || "Publish your session with a Google Meet link."}</p><label htmlFor="teacher-live-meet-link">Google Meet link</label><input id="teacher-live-meet-link" type="text" placeholder="https://meet.google.com/…" value={meetLink} onChange={(event) => setMeetLink(event.target.value)} /><small>Students can join using this link once the session is published.</small><div className="alphira-teacher-live-dialog-actions"><button type="button" disabled={publishing} onClick={() => setSelectedCourse(null)}>Cancel</button><button type="submit" className="alphira-live-button" disabled={publishing}>{publishing ? "Publishing…" : "Publish session"}<ArrowUpRight size={15} aria-hidden="true" /></button></div></form>
      </dialog>
    </section>
  );
};

export default TeacherLiveCourses;

