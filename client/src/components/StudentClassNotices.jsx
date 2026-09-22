import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import fetchWithAuth from "../utils/fetchWithAuth";
import { API_URL } from "../config/api";
import { MY_LIVE_COURSES_SUCCESS } from "../constants/liveCourseConstants";
import "./StudentClassNotices.css";

const keyFor = (userId) => `alphira-class-notices:${userId}`;
const readSeen = (userId) => {
  try { const value = JSON.parse(localStorage.getItem(keyFor(userId)) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; }
};
export default function StudentClassNotices({ userId }) {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [seen, setSeen] = useState(() => readSeen(userId));
  const [expanded, setExpanded] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [refreshError, setRefreshError] = useState(false);

  useEffect(() => {
    let active = true, inFlight = false;
    const controller = new AbortController();
    const refresh = async () => {
      if (document.hidden || inFlight) return;
      inFlight = true;
      try {
        const data = await fetchWithAuth(dispatch, `${API_URL}/api/live-courses/student/my-live-courses`, { signal: controller.signal });
        if (!active) return;
        const next = data.liveCourses.filter(Boolean);
        setCourses(next);
        setNow(Date.now());
        setRefreshError(false);
        dispatch({ type: MY_LIVE_COURSES_SUCCESS, payload: next });
      } catch (error) { if (active && error.name !== "AbortError") setRefreshError(true); }
      finally { inFlight = false; }
    };
    const syncSeen = (event) => { if (event.key === keyFor(userId)) setSeen(readSeen(userId)); };
    refresh();
    const timer = setInterval(refresh, 30000);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", syncSeen);
    return () => { active = false; controller.abort(); clearInterval(timer); document.removeEventListener("visibilitychange", refresh); window.removeEventListener("focus", refresh); window.removeEventListener("storage", syncSeen); };
  }, [dispatch, userId]);

  const notices = courses.flatMap((course) => (course.sessions || []).filter((session) => session.status !== "cancelled" && new Date(session.endTime).getTime() > now).map((session) => ({ ...session, courseTitle: course.title, noticeId: `${course._id}:${session._id}` }))).filter((session) => !seen.includes(session.noticeId)).sort((a,b) => new Date(a.startTime) - new Date(b.startTime));
  const markRead = (ids) => {
    const next = [...new Set([...readSeen(userId), ...seen, ...ids])].slice(-2000);
    setSeen(next);
    try { localStorage.setItem(keyFor(userId), JSON.stringify(next)); } catch { /* Keep notices usable when storage is unavailable. */ }
  };
  if (!notices.length) return refreshError ? <p className="ac-class-notices-error" role="status">Class updates are temporarily unavailable. We’ll retry automatically.</p> : null;
  return <section className="ac-class-notices" aria-label="New live class notifications">
    <div className="ac-class-notices-heading"><Bell size={20} aria-hidden="true" /><div><strong role="status">{notices.length} new {notices.length === 1 ? "class" : "classes"} scheduled</strong><p>Your teacher has added sessions to your enrolled batches.</p></div><button type="button" aria-expanded={expanded} aria-controls="class-notice-list" onClick={() => setExpanded(!expanded)}>{expanded ? "Hide details" : "View updates"}</button></div>
    <div id="class-notice-list" hidden={!expanded}>{notices.map((session) => <div className="ac-class-notice" key={session.noticeId}><div><strong>{session.title}</strong><p>{session.courseTitle}</p><p>{new Date(session.startTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })} IST · {session.duration} min</p></div><button type="button" onClick={() => markRead([session.noticeId])} aria-label={`Mark ${session.title} as read`}>Mark read</button></div>)}<Link to="/dashboard/live-courses">Open my live classes ↗</Link></div>
    {refreshError && <p>Updates are temporarily unavailable. We’ll retry automatically.</p>}
  </section>;
}
