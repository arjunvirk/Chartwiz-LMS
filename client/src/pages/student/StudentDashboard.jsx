import cryptoImage from "../../assets/images/crypto-cover-v3.png";
import orderFlowImage from "../../assets/images/orderflow-cover-v2.png";
import MarketCover from "../../components/MarketCover";
import { ArrowUpRight, BookOpen, CalendarClock, LineChart, Radio, Video } from "lucide-react";
import "./StudentDashboard.css";
import forexImage from "../../assets/images/forex-cover-v2.png";
import indianMarketImage from "../../assets/images/indian-cover-v2.png";
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

  const courseImage = (course) => /crypto/i.test(course.title || "") ? cryptoImage
    : /order[\s-]*flow/i.test(course.title || "") ? orderFlowImage
      : /indian|india/i.test(course.title || "") ? indianMarketImage
        : /forex/i.test(course.title || "") ? forexImage
          : course.thumbnail;

  // Soonest upcoming class or webinar across everything the student is enrolled in.
  const nowMs = Date.now();
  const upcoming = [
    ...liveCourses.flatMap((course) => (course.sessions || [])
      .filter((session) => session.status !== "cancelled" && new Date(session.endTime || session.startTime).getTime() > nowMs)
      .map((session) => ({ kind: "Live class", title: session.title, context: course.title, start: new Date(session.startTime), duration: session.duration, link: session.meetLink, to: "/dashboard/live-courses" }))),
    ...webinars
      .filter((webinar) => new Date(webinar.startTime).getTime() + (webinar.duration || 60) * 60000 > nowMs)
      .map((webinar) => ({ kind: "Webinar", title: webinar.title, context: webinar.description, start: new Date(webinar.startTime), duration: webinar.duration, link: webinar.meetLink })),
  ].sort((x, y) => x.start - y.start);
  const next = upcoming[0];
  const nextCanJoin = next && next.link && nowMs >= next.start.getTime() - 15 * 60000;
  const relative = (date) => {
    const mins = Math.round((date.getTime() - nowMs) / 60000);
    if (mins <= 0) return "Happening now";
    if (mins < 60) return `In ${mins} min`;
    const hours = Math.round(mins / 60);
    if (hours < 24) return `In ${hours} hour${hours === 1 ? "" : "s"}`;
    const days = Math.round(hours / 24);
    return `In ${days} day${days === 1 ? "" : "s"}`;
  };
  const firstName = userInfo?.user?.name?.split(" ")[0];
  const greeting = (() => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; })();
  const upcomingWebinars = webinars.filter((webinar) => new Date(webinar.startTime).getTime() + (webinar.duration || 60) * 60000 > nowMs);

  return (
    <div className="alphira-student-home">
      <motion.section
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="alphira-student-hero"
        aria-labelledby="student-hero-title"
      >
        <div className="alphira-student-hero-copy">
          <p className="alphira-student-hero-kicker">{greeting}{firstName ? `, ${firstName}` : ""}</p>
          <h1 id="student-hero-title">Your academy, in one place.</h1>
          <p>Programs you’re enrolled in, mentor insights and every scheduled session.</p>
          <div className="alphira-student-hero-actions">
            <Link to="/dashboard/courses" className="alphira-student-primary">My courses <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <Link to="/dashboard/market-analysis" className="alphira-student-secondary">Market analysis</Link>
          </div>
        </div>
        <div className="alphira-student-next" aria-live="polite">
          <p className="alphira-student-next-label"><CalendarClock size={15} aria-hidden="true" />Next up</p>
          {next ? (
            <>
              <span className="alphira-student-next-when">{relative(next.start)}</span>
              <strong>{next.title}</strong>
              <small>{next.kind}{next.context ? ` · ${next.context}` : ""}</small>
              <time dateTime={next.start.toISOString()}>{next.start.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })} IST{next.duration ? ` · ${next.duration} min` : ""}</time>
              {nextCanJoin ? <a className="alphira-student-next-join" href={next.link} target="_blank" rel="noreferrer">Join now <ArrowUpRight size={15} aria-hidden="true" /></a>
                : <span className="alphira-student-next-note">{next.link ? "Join opens 15 minutes before start" : "Meeting link will appear here"}</span>}
            </>
          ) : (
            <>
              <strong>Nothing scheduled yet</strong>
              <small>New classes and webinars from your mentors will show up here.</small>
            </>
          )}
        </div>
      </motion.section>

      <div className="alphira-student-columns">
        <div className="alphira-student-main">
          <section className="alphira-student-section" aria-labelledby="student-courses-title">
            <div className="alphira-student-section-heading">
              <h2 id="student-courses-title">My courses <span>{courses.length}</span></h2>
              <Link to="/dashboard/courses" className="alphira-student-view">View all <ArrowUpRight size={14} aria-hidden="true" /></Link>
            </div>
            {courses.length === 0 ? (
              <div className="alphira-student-empty">
                <BookOpen size={22} aria-hidden="true" />
                <p>You’re not enrolled in a course yet.</p>
                <Link to="/courses" className="alphira-student-view">Browse programs <ArrowUpRight size={14} aria-hidden="true" /></Link>
              </div>
            ) : (
              <div className="alphira-student-course-list">
                {courses.slice(0, 3).map((course) => {
                  const image = courseImage(course);
                  return (
                    <Link key={course._id} to="/dashboard/courses" className="alphira-student-course">
                      {image ? <img src={image} alt="" className="alphira-student-course-photo" loading="lazy" /> : <MarketCover seed={course._id} className="alphira-student-course-photo" />}
                      <div>
                        <h3>{course.title}</h3>
                        <p>{course.instructor ? `With ${course.instructor}` : "Alphira Capital"}</p>
                      </div>
                      <span className="alphira-student-pill">Offline course</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          <section className="alphira-student-section" aria-labelledby="student-analysis-title">
            <div className="alphira-student-section-heading">
              <h2 id="student-analysis-title">Latest market analysis</h2>
              <Link to="/dashboard/market-analysis" className="alphira-student-view">View all <ArrowUpRight size={14} aria-hidden="true" /></Link>
            </div>
            {analyses.length === 0 ? (
              <div className="alphira-student-empty"><LineChart size={22} aria-hidden="true" /><p>Your mentors haven’t published analysis yet. New posts appear here.</p></div>
            ) : (
              <div className="alphira-student-card-grid">
                {analyses.slice(0, 3).map((analysis, i) => (
                  <motion.article
                    key={analysis._id}
                    variants={fadeUp}
                    initial={reducedMotion ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={i}
                    className="alphira-student-card"
                  >
                    <Link to={`/dashboard/market-analysis/${analysis._id}`} className="alphira-student-card-link" aria-label={`Read: ${analysis.title}`} />
                    {analysis.image ? <img src={analysis.image} alt="" className="alphira-student-card-media" loading="lazy" /> : <MarketCover seed={analysis._id} label={analysis.market} className="alphira-student-card-media" />}
                    <div className="alphira-student-card-body">
                      <div className="alphira-student-card-tags">
                        {analysis.image && <span className="alphira-student-badge">{analysis.market}</span>}
                        {analysis.featured && <span className="alphira-student-badge is-featured">Featured</span>}
                      </div>
                      <h3>{analysis.title}</h3>
                      <p>{analysis.content}</p>
                      <small>{analysis.author?.name || "Alphira Capital"}{analysis.createdAt ? ` · ${new Date(analysis.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}` : ""}</small>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="alphira-student-side">
          <section className="alphira-student-section" aria-labelledby="student-live-title">
            <div className="alphira-student-section-heading">
              <h2 id="student-live-title">Live classes</h2>
              <Link to="/dashboard/live-courses" className="alphira-student-view">View all <ArrowUpRight size={14} aria-hidden="true" /></Link>
            </div>
            {liveCourses.length === 0 ? (
              <div className="alphira-student-empty"><Radio size={22} aria-hidden="true" /><p>No live batches yet. When you’re added to one, its classes appear here.</p></div>
            ) : (
              <ul className="alphira-student-list">
                {liveCourses.slice(0, 3).map((course) => {
                  const nextSession = (course.sessions || []).filter((session) => session.status !== "cancelled" && new Date(session.endTime || session.startTime).getTime() > nowMs).sort((x, y) => new Date(x.startTime) - new Date(y.startTime))[0];
                  return (
                    <li key={course._id} className="alphira-student-session">
                      <div>
                        <h3>{course.title}</h3>
                        <p>{nextSession ? `Next: ${nextSession.title} · ${new Date(nextSession.startTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}` : course.instructor || "No upcoming classes"}</p>
                      </div>
                      <span className={`alphira-student-status is-cap is-${course.status}`}>{course.status}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section className="alphira-student-section" aria-labelledby="student-webinar-title">
            <div className="alphira-student-section-heading"><h2 id="student-webinar-title">Webinars</h2></div>
            {upcomingWebinars.length === 0 ? (
              <div className="alphira-student-empty"><Video size={22} aria-hidden="true" /><p>No upcoming webinars right now.</p></div>
            ) : (
              <ul className="alphira-student-list">
                {upcomingWebinars.slice(0, 5).map((webinar) => {
                  const status = getWebinarStatus(webinar);
                  return (
                    <li key={webinar._id} className="alphira-student-session">
                      <div>
                        <h3>{webinar.title}</h3>
                        <p>{new Date(webinar.startTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })} IST</p>
                      </div>
                      {status.canJoin ? <a href={webinar.meetLink} target="_blank" rel="noreferrer" className="alphira-student-join">Join <ArrowUpRight size={14} aria-hidden="true" /></a>
                        : <span className={`alphira-student-status ${status.color}`}>{status.label}</span>}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
};

export default StudentDashboard;

