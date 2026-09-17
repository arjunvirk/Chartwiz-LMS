import { useEffect, useState } from "react";
import "./LiveSessionList.css";

export default function LiveSessionList({ sessions = [], onCancel, onRefresh, busy }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(timer); }, []);
  const ordered = [...sessions].sort((a,b) => new Date(a.startTime) - new Date(b.startTime));
  if (!ordered.length) return <p className="ac-session-empty">Your teacher will add scheduled classes here.</p>;
  return <div className="ac-session-list"><h3>Scheduled classes <span>IST</span></h3>{ordered.map((session) => {
    const start = new Date(session.startTime).getTime();
    const ended = now >= new Date(session.endTime).getTime();
    const cancelled = session.status === "cancelled";
    const canJoin = !cancelled && !ended && (onCancel || now >= start - 10 * 60000);
    const label = cancelled ? "Cancelled" : ended ? "Ended" : now >= start ? "In progress" : "Upcoming";
    return <div className="ac-session" key={session._id}><div className="ac-session-top"><strong>{session.title}</strong><span>{label}</span></div><p>{new Date(start).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })} IST · {session.duration} min</p><div className="ac-session-actions">
      {canJoin && session.meetLink && <a href={session.meetLink} target="_blank" rel="noreferrer">{onCancel ? "Open Google Meet ↗" : "Join class ↗"}</a>}
      {!cancelled && !ended && !session.meetLink && <span>Google Meet link is being prepared.</span>}
      {!onCancel && !cancelled && !ended && !canJoin && <span>Join opens 10 minutes before class.</span>}
      {onRefresh && !cancelled && !ended && !session.meetLink && <button type="button" disabled={!!busy} onClick={() => onRefresh(session)}>Refresh link</button>}
      {onCancel && !cancelled && !ended && <button type="button" disabled={!!busy} onClick={() => onCancel(session)}>{busy === session._id ? "Updating…" : "Cancel class"}</button>}
    </div></div>;
  })}</div>;
}
