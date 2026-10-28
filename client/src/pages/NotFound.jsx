import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowUpRight } from "lucide-react";
import "./NotFound.css";

// A flat-lining chart: the route exists nowhere on the map.
export default function NotFound() {
  const { pathname } = useLocation();
  const { userInfo } = useSelector((state) => state.userLogin);
  const role = userInfo?.user?.role;
  const home = role === "admin" ? "/admin/dashboard" : role === "teacher" ? "/teacher/dashboard" : role === "student" ? "/dashboard" : "/";
  return (
    <main className="ac-notfound">
      <div className="ac-notfound-inner">
        <svg className="ac-notfound-chart" viewBox="0 0 480 120" aria-hidden="true" focusable="false">
          <path d="M0 96 L40 84 L80 90 L120 64 L160 72 L200 40 L240 52 L262 30 L280 60 L300 60 L480 60" />
          <circle cx="280" cy="60" r="5" />
        </svg>
        <p className="ac-notfound-code">Error 404</p>
        <h1>This page isn’t on the chart.</h1>
        <p className="ac-notfound-copy">We couldn’t find <code>{pathname}</code>. It may have moved, or the link may be mistyped.</p>
        <div className="ac-notfound-actions">
          <Link to={home} className="ac-btn ac-btn-primary">{role ? "Back to your dashboard" : "Go to homepage"}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          <Link to="/courses" className="ac-btn ac-btn-secondary">Browse courses</Link>
        </div>
      </div>
    </main>
  );
}
