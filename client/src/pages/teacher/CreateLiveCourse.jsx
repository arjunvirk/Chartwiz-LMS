import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLiveCourse } from "../../actions/liveCourseActions";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CalendarDays } from "lucide-react";
import "./CreateAnalysis.css";
import "./CreateLiveCourse.css";

const CreateLiveCourse = () => {
  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();

  const liveCourseCreate = useSelector((state) => state.liveCourseCreate);

  const { loading } = liveCourseCreate;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [durationMonths, setDurationMonths] = useState(2);
  const [startDate, setStartDate] = useState("");
  const [classTime, setClassTime] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    // VALIDATION

    if (!title.trim()) {
      return toast.error("Course title is required");
    }

    if (!description.trim()) {
      return toast.error("Description is required");
    }

    if (!price || Number(price) <= 0) {
      return toast.error("Enter a valid price");
    }

    if (!durationMonths || Number(durationMonths) <= 0) {
      return toast.error("Duration must be greater than 0");
    }

    if (!startDate) {
      return toast.error("Please select a start date");
    }

    if (!classTime) {
      return toast.error("Please select class time");
    }

    try {
      await dispatch(
        createLiveCourse({
          title: title.trim(),
          description: description.trim(),
          price: Number(price),
          durationMonths: Number(durationMonths),
          startDate,
          classTime,
        }),
      );

      toast.success("Live course created successfully");

      setTitle("");
      setDescription("");
      setPrice("");
      setDurationMonths(2);
      setStartDate("");
      setClassTime("");
    } catch (error) {
      toast.error(error?.message || "Failed to create live course");
    }
  };

  return (
    <motion.section className="alphira-analysis-editor alphira-live-editor" aria-labelledby="live-editor-title" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Link to="/teacher/dashboard/live-courses" className="alphira-analysis-editor-back"><ArrowLeft size={16} aria-hidden="true" />Back to live courses</Link>
      <header className="alphira-analysis-editor-header"><span className="alphira-analysis-editor-eyebrow">Live mentorship / New batch</span><h1 id="live-editor-title">Make room for learning.</h1><p>Bring your next mentorship batch together with a clear program and schedule.</p></header>
      <form onSubmit={submitHandler} className="alphira-analysis-editor-layout" aria-busy={!!loading}>
        <div className="alphira-analysis-editor-main">
          <section className="alphira-analysis-editor-section" aria-labelledby="live-program-title">
            <div className="alphira-analysis-editor-section-title"><span>01</span><div><h2 id="live-program-title">The program</h2><p>Give your batch a name and describe what students will learn.</p></div></div>
            <label htmlFor="live-create-title">Course title</label><input id="live-create-title" type="text" placeholder="e.g. Forex Mastery Mentorship" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="alphira-live-editor-field"><label htmlFor="live-create-description">Description</label><textarea id="live-create-description" rows={6} placeholder="Describe your mentorship program, topics and learning approach…" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          </section>
          <section className="alphira-analysis-editor-section" aria-labelledby="live-structure-title">
            <div className="alphira-analysis-editor-section-title"><span>02</span><div><h2 id="live-structure-title">Fee & duration</h2><p>Set the course fee and length of the mentorship.</p></div></div>
            <div className="alphira-live-editor-fields"><div><label htmlFor="live-create-price">Course fee <span>INR</span></label><input id="live-create-price" type="number" min="1" placeholder="20000" value={price} onChange={(e) => setPrice(e.target.value)} /></div><div><label htmlFor="live-create-duration">Duration <span>Months</span></label><input id="live-create-duration" type="number" min="1" value={durationMonths} onChange={(e) => setDurationMonths(e.target.value)} /></div></div>
          </section>
          <section className="alphira-analysis-editor-section" aria-labelledby="live-schedule-title">
            <div className="alphira-analysis-editor-section-title"><span>03</span><div><h2 id="live-schedule-title">The schedule</h2><p>Choose when your batch begins and the class time.</p></div></div>
            <div className="alphira-live-editor-fields"><div><label htmlFor="live-create-date">Start date</label><input id="live-create-date" type="date" min={new Date().toISOString().split("T")[0]} value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div><div><label htmlFor="live-create-time">Class time</label><input id="live-create-time" type="time" value={classTime} onChange={(e) => setClassTime(e.target.value)} /></div></div>
          </section>
        </div>
        <aside className="alphira-analysis-editor-sidebar" aria-label="Batch creation">
          <div className="alphira-analysis-editor-publish"><span className="alphira-analysis-editor-eyebrow">ALPHIRA CAPITAL / MENTORSHIP</span><h2>Your next batch starts here.</h2><p>Review your program details, fee and schedule before creating the batch.</p>
            <div className="alphira-live-editor-summary"><span>BATCH OVERVIEW</span><h3>{title.trim() || "Your mentorship program"}</h3><dl><div><dt>Duration</dt><dd>{Number(durationMonths) > 0 ? `${durationMonths} ${Number(durationMonths) === 1 ? "month" : "months"}` : "Not set"}</dd></div><div><dt>Course fee</dt><dd>{Number(price) > 0 ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(Number(price)) : "Not set"}</dd></div></dl></div>
            <button type="submit" disabled={loading}><CalendarDays size={16} aria-hidden="true" />{loading ? "Creating…" : "Create mentorship batch"}<ArrowUpRight size={16} aria-hidden="true" /></button>
          </div>
          <div className="alphira-analysis-editor-note"><span>SESSION ACCESS</span><p>Google Meet links can be added later when your live session is ready to begin.</p></div>
        </aside>
      </form>
    </motion.section>
  );
};

export default CreateLiveCourse;
