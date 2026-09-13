import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Users, TrendingUp, Video, ArrowUpRight, Plus } from "lucide-react";
import { getTeacherCourses, listCourses } from "../../actions/courseActions";
import { listWebinars } from "../../actions/webinarActions";
import { getAnalyses } from "../../actions/marketAnalysisActions";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();
  const { courses: academyCourses = [], loading: academyLoading, error: academyError } = useSelector((state) => state.courseList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, courses = [], totalEnrolledStudents } = useSelector((state) => state.teacherCourses);
  const { webinars = [], loading: webinarsLoading, error: webinarsError } = useSelector((state) => state.webinarList);
  const { analyses = [], loading: analysesLoading, error: analysesError } = useSelector((state) => state.analysisList);

  useEffect(() => {
    if (!userInfo) return;
    dispatch(getTeacherCourses());
    dispatch(listCourses());
    dispatch(listWebinars());
    dispatch(getAnalyses());
  }, [dispatch, userInfo]);

  const stats = [
    { title: "Total courses", value: academyLoading ? "…" : academyError ? "—" : academyCourses.length, icon: BookOpen, hint: academyError ? "Academy catalog unavailable" : "Academy programs", to: "/courses" },
    { title: "Total enrolled students", value: loading ? "…" : error ? "—" : totalEnrolledStudents ?? "—", icon: Users, hint: "Across the academy · counted once" },
    { title: "Market insights", value: analysesLoading ? "…" : analysesError ? "—" : analyses.length, icon: TrendingUp, hint: "Available analysis posts" },
  ];

  return (
    <motion.section className="alphira-teacher" aria-labelledby="teacher-dashboard-title" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <header className="alphira-teacher-heading"><div><span className="alphira-teacher-eyebrow">Teaching workspace / Overview</span><h1 id="teacher-dashboard-title">Teach with perspective.</h1><p>Your programs, market insights and mentor sessions, together in one place.</p></div><Link to="/teacher/dashboard/analysis/create" className="alphira-teacher-button"><Plus size={16} aria-hidden="true" />New analysis</Link></header>

      <div className="alphira-teacher-stats">{stats.map(({ title, value, icon: Icon, hint, to }) => <div key={title}><div className="alphira-teacher-stat-top"><span>{title}</span><Icon size={18} aria-hidden="true" /></div><strong>{to ? <Link to={to} aria-label="View academy courses">{value}</Link> : value}</strong><p>{hint}</p></div>)}</div>

      <div className="alphira-teacher-grid">
        <section className="alphira-teacher-panel alphira-teacher-courses" aria-labelledby="teacher-courses-title">
          <div className="alphira-teacher-panel-heading"><div><span className="alphira-teacher-eyebrow">01 / Programs</span><h2 id="teacher-courses-title">Your courses</h2></div><Link to="/teacher/dashboard/courses" className="alphira-teacher-text-link">View all <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
          {loading ? <p className="alphira-teacher-state" role="status">Loading your courses…</p> : error ? <div className="alphira-teacher-state" role="alert"><p>{error}</p><button type="button" onClick={() => dispatch(getTeacherCourses())}>Try again</button></div> : courses.length === 0 ? <div className="alphira-teacher-state"><BookOpen size={25} aria-hidden="true" /><h3>Your next program starts here.</h3><p>Create your first course from the course management page.</p><Link to="/teacher/dashboard/courses" className="alphira-teacher-text-link">Manage courses <ArrowUpRight size={15} aria-hidden="true" /></Link></div> : <div>{courses.map((course, index) => <article key={course._id} className="alphira-teacher-course"><span className="alphira-teacher-course-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{course.title}</h3><div className="alphira-teacher-course-meta"><span><Users size={13} aria-hidden="true" />{course.students?.length || 0} students</span><span><BookOpen size={13} aria-hidden="true" />{course.videos?.length || 0} lessons</span></div></div><Link to="/teacher/dashboard/courses" className="alphira-teacher-manage" aria-label={`Manage courses including ${course.title}`}>Manage <ArrowUpRight size={14} aria-hidden="true" /></Link></article>)}</div>}
          <div className="alphira-teacher-course-footer"><Video size={18} aria-hidden="true" /><div><strong>Live mentorship</strong><p>Manage batches and scheduled classes.</p></div><Link to="/teacher/dashboard/live-courses" aria-label="Manage live courses"><ArrowUpRight size={19} aria-hidden="true" /></Link></div>
        </section>

        <div className="alphira-teacher-side">
          <section className="alphira-teacher-panel" aria-labelledby="teacher-analysis-title"><div className="alphira-teacher-panel-heading"><div><span className="alphira-teacher-eyebrow">02 / Research</span><h2 id="teacher-analysis-title">Market insights</h2></div><Link to="/teacher/dashboard/analysis" className="alphira-teacher-text-link">View all <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
            {analysesLoading ? <p className="alphira-teacher-state" role="status">Loading analyses…</p> : analysesError ? <p className="alphira-teacher-state" role="alert">{analysesError}</p> : analyses.length === 0 ? <p className="alphira-teacher-state">No market analysis published yet.</p> : analyses.slice(0, 3).map((analysis) => <article key={analysis._id} className="alphira-teacher-insight"><span>{analysis.market}</span><h3>{analysis.title}</h3></article>)}
            <Link to="/teacher/dashboard/analysis/create" className="alphira-teacher-compose"><Plus size={15} aria-hidden="true" />Publish a new perspective</Link>
          </section>

          <section className="alphira-teacher-panel" aria-labelledby="teacher-webinars-title"><div className="alphira-teacher-panel-heading"><div><span className="alphira-teacher-eyebrow">03 / Sessions</span><h2 id="teacher-webinars-title">Webinars</h2></div><Video size={20} aria-hidden="true" /></div>
            {webinarsLoading ? <p className="alphira-teacher-state" role="status">Loading webinars…</p> : webinarsError ? <p className="alphira-teacher-state" role="alert">{webinarsError}</p> : webinars.length === 0 ? <p className="alphira-teacher-state">No webinars scheduled.</p> : webinars.slice(0, 3).map((webinar) => { const date = webinar.startTime ? new Date(webinar.startTime) : null; return <article key={webinar._id} className="alphira-teacher-webinar"><h3>{webinar.title}</h3><p>{date && !Number.isNaN(date.getTime()) ? date.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }) : "Schedule to be announced"}</p>{webinar.meetLink ? <a href={webinar.meetLink} target="_blank" rel="noreferrer" className="alphira-teacher-button">Open webinar <ArrowUpRight size={15} aria-hidden="true" /></a> : <span className="alphira-teacher-pending">Joining link not available yet</span>}</article>; })}
          </section>
        </div>
      </div>
    </motion.section>
  );
};

export default TeacherDashboard;


