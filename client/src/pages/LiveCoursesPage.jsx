import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowUpRight, Radio, Clock, Timer, User, LayoutDashboard, BadgeCheck, Phone } from "lucide-react";
import { getLiveCourses, enrollLiveCourse } from "../actions/liveCourseActions";
import useUltrawideCanvas from "../hooks/useUltrawideCanvas";
import toast from "react-hot-toast";
import "./LiveCoursesPage.css";

const STEPS = [
  { icon: BadgeCheck, title: "Enroll in a batch", text: "Pick a mentorship batch below and enroll in one click." },
  { icon: LayoutDashboard, title: "Join from your dashboard", text: "Scheduled classes appear directly in your student dashboard." },
  { icon: Radio, title: "Learn live with a mentor", text: "Market analysis sessions and webinars, taught in real time." },
];

const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const label = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);
const isLive = (c) => String(c.status).toLowerCase() === "live";
const months = (n) => `${n} ${Number(n) === 1 ? "Month" : "Months"}`;

/* Live countdown to a start date (updates every second). */
function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!target) return undefined;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [target]);
  if (!target) return null;
  const ms = new Date(target).getTime() - now;
  if (Number.isNaN(ms)) return null;
  if (ms <= 0) return { done: true };
  const s = Math.floor(ms / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export default function LiveCoursesPage() {
  const dispatch = useDispatch();
  const liveCourseList = useSelector((state) => state.liveCourseList);
  const { loading, error, liveCourses = [] } = liveCourseList;
  const [filter, setFilter] = useState("all");
  const [enrolling, setEnrolling] = useState(null);
  useUltrawideCanvas();

  useEffect(() => {
    dispatch(getLiveCourses());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const enrollHandler = async (id) => {
    setEnrolling(id);
    try {
      await dispatch(enrollLiveCourse(id));
      toast.success("Successfully enrolled!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setEnrolling(null);
    }
  };

  // Batches sorted by start date; statuses become filter tabs.
  const sorted = useMemo(() => [...liveCourses].sort((a, b) => new Date(a.startDate) - new Date(b.startDate)), [liveCourses]);
  const statuses = useMemo(() => [...new Set(sorted.map((c) => String(c.status || "").toLowerCase()).filter(Boolean))], [sorted]);
  const shown = filter === "all" ? sorted : sorted.filter((c) => String(c.status).toLowerCase() === filter);
  const liveNow = sorted.find(isLive);
  const nextUp = sorted.find((c) => !isLive(c) && new Date(c.startDate).getTime() > Date.now());
  const featured = liveNow || nextUp || sorted[0];
  const countdown = useCountdown(!liveNow && nextUp ? nextUp.startDate : null);

  return (
    <main className="alc">
      {/* ---------- Hero ---------- */}
      <header className="alc-hero">
        <div className="alc-hero-glow" aria-hidden="true" />
        <div className="alc-shell alc-hero-grid">
          <div className="alc-hero-copy">
            <p className="alc-onair"><span className="alc-onair-dot" aria-hidden="true" />Live mentorship</p>
            <h1><span>Learn the market</span><span className="alc-accent">in real time.</span></h1>
            <p className="alc-lede">Join professional live trading mentorship batches, market analysis sessions and webinars. Enroll now and access scheduled classes directly from your student dashboard.</p>
            <div className="alc-actions">
              <a href="#alc-batches" className="alc-btn alc-btn-light">See the batches <ArrowUpRight size={17} aria-hidden="true" /></a>
              <Link to="/login" className="alc-btn alc-btn-ghost">Student dashboard <LayoutDashboard size={16} aria-hidden="true" /></Link>
            </div>
          </div>

          {/* Next-batch board */}
          <aside className="alc-board" aria-label={featured ? "Featured batch" : "Upcoming batches"}>
            <div className="alc-board-top">
              <span className={`alc-board-status${liveNow ? " is-live" : ""}`}><i aria-hidden="true" />{liveNow ? "Live now" : nextUp ? "Next batch" : "Mentorship batches"}</span>
              <span className="alc-board-signal" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <b key={i} style={{ "--i": i }} />)}</span>
            </div>
            {loading ? (
              <div className="alc-board-skel" aria-hidden="true"><span /><span /><span /></div>
            ) : featured ? (
              <>
                <p className="alc-board-title">{featured.title}</p>
                <p className="alc-board-meta"><User size={14} aria-hidden="true" />{featured.instructor}</p>
                {countdown && !countdown.done ? (
                  <div className="alc-count" role="timer" aria-label={`Starts in ${countdown.d} days ${countdown.h} hours`}>
                    {[["d", "Days"], ["h", "Hours"], ["m", "Min"], ["s", "Sec"]].map(([k, l]) => (
                      <div key={k}><strong>{String(countdown[k]).padStart(2, "0")}</strong><span>{l}</span></div>
                    ))}
                  </div>
                ) : (
                  <div className="alc-board-wave" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ "--i": i }} />)}</div>
                )}
                <dl className="alc-board-facts">
                  <div><dt>Starts</dt><dd>{fmtDate(featured.startDate)}</dd></div>
                  <div><dt>Class time</dt><dd>{featured.classTime}</dd></div>
                  <div><dt>Duration</dt><dd>{months(featured.durationMonths)}</dd></div>
                </dl>
              </>
            ) : (
              <>
                <p className="alc-board-title">New batches are being scheduled.</p>
                <div className="alc-board-wave" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ "--i": i }} />)}</div>
                <a className="alc-board-call" href="tel:+919217222356"><Phone size={15} aria-hidden="true" />Ask about the next batch · +91 92172 22356</a>
              </>
            )}
          </aside>
        </div>
      </header>

      {/* ---------- How it works ---------- */}
      <section className="alc-steps" aria-label="How live classes work">
        <ol className="alc-shell alc-steps-grid">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title}><span className="alc-step-icon" aria-hidden="true"><Icon size={18} /></span><div><span className="alc-step-n">0{i + 1}</span><strong>{title}</strong><p>{text}</p></div></li>
          ))}
        </ol>
      </section>

      {/* ---------- Batches ---------- */}
      <section id="alc-batches" className="alc-batches" aria-labelledby="alc-batches-title">
        <div className="alc-shell">
          <div className="alc-head">
            <div>
              <p className="alc-kicker"><span aria-hidden="true" />Schedule</p>
              <h2 id="alc-batches-title">Live mentorship<br /><span>batches.</span></h2>
            </div>
            {statuses.length > 1 && (
              <div className="alc-filter" role="group" aria-label="Filter batches by status">
                <button type="button" aria-pressed={filter === "all"} className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>All <small>{sorted.length}</small></button>
                {statuses.map((s) => (
                  <button key={s} type="button" aria-pressed={filter === s} className={filter === s ? "is-active" : ""} onClick={() => setFilter(s)}>{label(s)} <small>{sorted.filter((c) => String(c.status).toLowerCase() === s).length}</small></button>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="alc-loading" role="status"><span aria-hidden="true" />Loading mentorship batches…</div>
          ) : liveCourses.length === 0 ? (
            <div className="alc-empty">
              <span className="alc-empty-icon" aria-hidden="true"><CalendarDays size={34} strokeWidth={1.4} /></span>
              <h3>Live courses<br /><span>coming soon.</span></h3>
              <p>New mentorship batches will be announced shortly.</p>
              <Link to="/courses" className="alc-btn alc-btn-dark">Explore classroom programs <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          ) : (
            <ul className="alc-list">
              {shown.map((course) => {
                const d = new Date(course.startDate);
                const valid = !Number.isNaN(d.getTime());
                const live = isLive(course);
                const busy = enrolling === course._id;
                return (
                  <li key={course._id} className={`alc-ticket${live ? " is-live" : ""}`}>
                    <div className="alc-date" aria-hidden="true">
                      <span>{valid ? d.toLocaleDateString("en-IN", { month: "short" }) : "—"}</span>
                      <strong>{valid ? d.getDate() : "—"}</strong>
                      <span>{valid ? d.getFullYear() : ""}</span>
                    </div>
                    <div className="alc-ticket-main">
                      <div className="alc-ticket-top">
                        <span className="alc-batch-n">Batch {String(sorted.indexOf(course) + 1).padStart(2, "0")}</span>
                        <span className={`alc-status${live ? " is-live" : ""}`}><i aria-hidden="true" />{label(course.status)}</span>
                      </div>
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <ul className="alc-facts">
                        <li><CalendarDays size={14} aria-hidden="true" /><span className="alc-sr">Start date: </span>{valid ? fmtDate(course.startDate) : "To be announced"}</li>
                        <li><Clock size={14} aria-hidden="true" /><span className="alc-sr">Class time: </span>{course.classTime}</li>
                        <li><Timer size={14} aria-hidden="true" /><span className="alc-sr">Duration: </span>{months(course.durationMonths)}</li>
                        <li><User size={14} aria-hidden="true" /><span className="alc-sr">Instructor: </span>{course.instructor}</li>
                      </ul>
                    </div>
                    <div className="alc-ticket-side">
                      <span className="alc-fee-label">Course fee</span>
                      <p className="alc-fee">₹{Number(course.price || 0).toLocaleString("en-IN")}</p>
                      <button type="button" className="alc-btn alc-btn-dark" onClick={() => enrollHandler(course._id)} disabled={busy} aria-busy={busy}>
                        <span>{busy ? "Enrolling…" : "Enroll in mentorship"}</span><ArrowUpRight size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
