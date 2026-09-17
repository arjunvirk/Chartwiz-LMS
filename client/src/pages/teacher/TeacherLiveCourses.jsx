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
import LiveSessionList from "../../components/LiveSessionList";

const TeacherLiveCourses = () => {
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [sessionDuration, setSessionDuration] = useState(60);
  const [sessionBusy, setSessionBusy] = useState(null);
  const requestId = useRef(null);
  const requestPayload = useRef(null);
  const saveLock = useRef(false);
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

  const openSchedule = (course) => {
    requestId.current = crypto.randomUUID();
    requestPayload.current = null;
    setSessionTitle(course.title);
    setSessionDate("");
    setSessionTime("");
    setSessionDuration(60);
    setSelectedCourse(course._id);
  };
  const publishHandler = async () => {
    if (saveLock.current) return;
    const payload = { title: sessionTitle.trim(), startTime: sessionDate + "T" + sessionTime, duration: Number(sessionDuration) };
    if (!payload.title || !sessionDate || !sessionTime) return toast.error("Enter a title, date and time.");
    if (new Date(payload.startTime + ":00+05:30").getTime() <= Date.now()) return toast.error("Choose a future start time.");
    const signature = JSON.stringify(payload);
    if (requestPayload.current && requestPayload.current !== signature) return toast.error("Retry the original schedule first, or close and reopen the form for a different class.");
    requestPayload.current = signature;
    saveLock.current = true;
    setPublishing(true);
    try {
      await fetchWithAuth(dispatch, `${API_URL}/api/live-courses/${selectedCourse}/sessions`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, requestId: requestId.current }),
      });
      toast.success("Class scheduled on Alphira Calendar");
      setSelectedCourse(null);
      dispatch(getTeacherLiveCourses());
    } catch (error) { toast.error(error.message); }
    finally { setPublishing(false); saveLock.current = false; }
  };
  const manageSession = async (courseId, session, cancel = false) => {
    if (sessionBusy) return;
    if (cancel && !window.confirm("Cancel this class and remove its Google Calendar event?")) return;
    setSessionBusy(session._id);
    try {
      const result = await fetchWithAuth(dispatch, `${API_URL}/api/live-courses/${courseId}/sessions/${session._id}${cancel ? "" : "/refresh"}`, { method: cancel ? "DELETE" : "POST" });
      toast.success(cancel ? "Class cancelled" : result.meetLink ? "Meet link is ready" : "Google is still preparing the link. Try again shortly.");
      dispatch(getTeacherLiveCourses());
    } catch (error) { toast.error(error.message); }
    finally { setSessionBusy(null); }
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
              <LiveSessionList sessions={course.sessions} busy={sessionBusy} onCancel={(session) => manageSession(course._id, session, true)} onRefresh={(session) => manageSession(course._id, session)} />
              <button type="button" onClick={() => openSchedule(course)} className="alphira-live-button"><Plus size={16} aria-hidden="true" />Schedule class</button>
              {course.status === "live" && course.meetLink && <a href={course.meetLink} target="_blank" rel="noreferrer" className="alphira-teacher-live-delete">Open existing batch Meet link ↗</a>}
              <button type="button" onClick={() => deleteHandler(course._id)} className="alphira-teacher-live-delete" aria-label={`Delete live course: ${course.title}`}><Trash2 size={14} aria-hidden="true" />Delete course</button>
            </div>
          </motion.article>;
        })}</div>
      )}
      <dialog ref={dialogRef} className="alphira-teacher-live-dialog" aria-labelledby="publish-session-title" onCancel={(event) => { event.preventDefault(); if (!publishing) setSelectedCourse(null); }} onClick={(event) => { if (event.target === event.currentTarget && !publishing) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) setSelectedCourse(null); } }}>
        <div className="alphira-teacher-live-dialog-header"><span>ALPHIRA / SESSION ACCESS</span><button type="button" autoFocus aria-label="Close publish session" disabled={publishing} onClick={() => setSelectedCourse(null)}><X size={19} aria-hidden="true" /></button></div>
        <form onSubmit={(event) => { event.preventDefault(); publishHandler(); }} aria-busy={publishing}>
          <h2 id="publish-session-title">Schedule a class.</h2>
          <p>Choose a date and time in IST. A Google Meet link will be created using the connected Alphira Calendar.</p>
          <div className="ac-schedule-fields">
            <div><label htmlFor="session-title">Session title</label><input id="session-title" value={sessionTitle} maxLength={160} required disabled={publishing} onChange={(e) => setSessionTitle(e.target.value)} /></div>
            <div><label htmlFor="session-date">Date</label><input id="session-date" type="date" value={sessionDate} required disabled={publishing} onChange={(e) => setSessionDate(e.target.value)} /></div>
            <div><label htmlFor="session-time">Start time · IST</label><input id="session-time" type="time" value={sessionTime} required disabled={publishing} onChange={(e) => setSessionTime(e.target.value)} /></div>
            <div><label htmlFor="session-duration">Duration · minutes</label><input id="session-duration" type="number" min="1" max="480" step="1" value={sessionDuration} required disabled={publishing} onChange={(e) => setSessionDuration(e.target.value)} /></div>
          </div>
          <div className="alphira-teacher-live-dialog-actions"><button type="button" disabled={publishing} onClick={() => setSelectedCourse(null)}>Cancel</button><button type="submit" className="alphira-live-button" disabled={publishing}>{publishing ? "Scheduling…" : "Schedule class"}</button></div>
        </form>
      </dialog>
    </section>
  );
};

export default TeacherLiveCourses;


