import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createLiveCourse } from "../../actions/liveCourseActions";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CalendarDays } from "lucide-react";
import "./CreateAnalysis.css";
import "./CreateLiveCourse.css";

const CreateLiveCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationMonths, setDurationMonths] = useState(2);
  const [startDate, setStartDate] = useState("");
  const [classTime, setClassTime] = useState("");
  const [sessionDuration, setSessionDuration] = useState(60);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const requestId = useRef(crypto.randomUUID());
  const pendingPayload = useRef(null);
  const lock = useRef(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (lock.current) return;
    const payload = { title: title.trim(), description: description.trim(), durationMonths: Number(durationMonths), startDate, classTime, sessionDuration: Number(sessionDuration), requestId: requestId.current };
    if (!payload.title || !payload.description || !startDate || !classTime) return toast.error("Enter the program details and first class schedule.");
    if (!Number.isInteger(payload.durationMonths) || payload.durationMonths < 1 || !Number.isInteger(payload.sessionDuration) || payload.sessionDuration < 1 || payload.sessionDuration > 480) return toast.error("Enter a valid batch duration and class length (1–480 minutes).");
    if (!pendingPayload.current && new Date(startDate + "T" + classTime + ":00+05:30").getTime() <= Date.now()) return toast.error("Choose a future first class time in IST.");
    if (payload.title.length > 160) return toast.error("Use a title of up to 160 characters.");
    if (pendingPayload.current && JSON.stringify(payload) !== pendingPayload.current) return setSubmitError("Retry with the original details to finish scheduling, or return to Live Courses to manage the saved batch.");
    pendingPayload.current = JSON.stringify(payload);
    lock.current = true;
    setLoading(true);
    setSubmitError("");
    try {
      await dispatch(createLiveCourse(payload));
      toast.success("Batch created and first class scheduled");
      navigate("/teacher/dashboard/live-courses");
    } catch (error) {
      setSubmitError(error.message || "Unable to create batch.");
      toast.error(error.message || "Unable to create batch.");
    } finally { lock.current = false; setLoading(false); }
  };
  return (
    <motion.section className="alphira-analysis-editor alphira-live-editor" aria-labelledby="live-editor-title" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Link to="/teacher/dashboard/live-courses" className="alphira-analysis-editor-back"><ArrowLeft size={16} aria-hidden="true" />Back to live courses</Link>
      <header className="alphira-analysis-editor-header"><span className="alphira-analysis-editor-eyebrow">Live mentorship / New batch</span><h1 id="live-editor-title">Make room for learning.</h1><p>Bring your next mentorship batch together with a clear program and schedule.</p></header>
      {submitError && <p role="alert" className="alphira-analysis-editor-feedback is-error">{submitError}</p>}
      <form onSubmit={submitHandler} className="alphira-analysis-editor-layout" aria-busy={!!loading}>
        <div className="alphira-analysis-editor-main">
          <section className="alphira-analysis-editor-section" aria-labelledby="live-program-title">
            <div className="alphira-analysis-editor-section-title"><span>01</span><div><h2 id="live-program-title">The program</h2><p>Give your batch a name and describe what students will learn.</p></div></div>
            <label htmlFor="live-create-title">Course title</label><input id="live-create-title" type="text" placeholder="e.g. Forex Mastery Mentorship" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="alphira-live-editor-field"><label htmlFor="live-create-description">Description</label><textarea id="live-create-description" rows={6} placeholder="Describe your mentorship program, topics and learning approach…" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          </section>
          <section className="alphira-analysis-editor-section" aria-labelledby="live-structure-title">
            <div className="alphira-analysis-editor-section-title"><span>02</span><div><h2 id="live-structure-title">Batch duration</h2><p>Set the length of the mentorship program.</p></div></div>
            <div className="alphira-live-editor-fields"><div><label htmlFor="live-create-duration">Duration <span>Months</span></label><input id="live-create-duration" type="number" min="1" value={durationMonths} onChange={(e) => setDurationMonths(e.target.value)} /></div></div>
          </section>
          <section className="alphira-analysis-editor-section" aria-labelledby="live-schedule-title">
            <div className="alphira-analysis-editor-section-title"><span>03</span><div><h2 id="live-schedule-title">First class schedule</h2><p>Enter the first class date and time once. We will create its Calendar event and Meet link.</p></div></div>
            <div className="alphira-live-editor-field"><label htmlFor="live-session-duration">First class duration · minutes</label><input id="live-session-duration" type="number" min="1" max="480" value={sessionDuration} onChange={(e) => setSessionDuration(e.target.value)} /></div><div className="alphira-live-editor-fields"><div><label htmlFor="live-create-date">Start date</label><input id="live-create-date" type="date" min={new Date().toISOString().split("T")[0]} value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div><div><label htmlFor="live-create-time">Class time · IST</label><input id="live-create-time" type="time" value={classTime} onChange={(e) => setClassTime(e.target.value)} /></div></div>
          </section>
        </div>
        <aside className="alphira-analysis-editor-sidebar" aria-label="Batch creation">
          <div className="alphira-analysis-editor-publish"><span className="alphira-analysis-editor-eyebrow">ALPHIRA CAPITAL / MENTORSHIP</span><h2>Your next batch starts here.</h2><p>Review your program details and first class schedule before creating the batch.</p>
            <div className="alphira-live-editor-summary"><span>BATCH OVERVIEW</span><h3>{title.trim() || "Your mentorship program"}</h3><dl><div><dt>Duration</dt><dd>{Number(durationMonths) > 0 ? `${durationMonths} ${Number(durationMonths) === 1 ? "month" : "months"}` : "Not set"}</dd></div><div><dt>First class</dt><dd>{sessionDuration} minutes</dd></div></dl></div>
            <button type="submit" disabled={loading}><CalendarDays size={16} aria-hidden="true" />{loading ? "Creating…" : "Create batch & first class"}<ArrowUpRight size={16} aria-hidden="true" /></button>
          </div>
          <div className="alphira-analysis-editor-note"><span>SESSION ACCESS</span><p>Your first class is scheduled automatically. Use Schedule class later only to add another class to this batch.</p></div>
        </aside>
      </form>
    </motion.section>
  );
};

export default CreateLiveCourse;


