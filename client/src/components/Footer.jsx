import { useEffect, useRef, useState } from "react";
import { openCookieSettings } from "../utils/cookieConsent";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ArrowUp, Copy, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import "./Footer.css";

const EMAIL = "contact.alphiracapital@gmail.com";
const PHONE = "+91 92172 22356";
const ADDRESS = "Plot No. 38, First Floor, Pocket 20, Sector 24, Rohini, Delhi 110085";
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Alphira Capital, ${ADDRESS}`)}`;
const WHATSAPP = "https://whatsapp.com/channel/0029Vb8p0Ae9xVJdzQ9Oqy1s";

const COLUMNS = [
  { title: "Explore", links: [
    { to: "/courses", label: "Courses" },
    { to: "/live-courses", label: "Live classes" },
    { to: "/about", label: "About" },
    { to: "/live", label: "Live markets" },
  ] },
  { title: "Programs", links: [
    { to: "/courses", label: "Forex" },
    { to: "/courses", label: "Forex + Indian market" },
    { to: "/courses", label: "Advanced order flow" },
    { to: "/courses", label: "Crypto futures & spot" },
  ] },
  { title: "Students", links: [
    { to: "/admission", label: "Apply for admission" },
    { to: "/login", label: "Student & staff portal" },
    { to: "/support", label: "Support" },
  ] },
];

/* Delhi time + whether it is inside NSE's regular session (Mon–Fri, 09:15–15:30 IST). */
function useDelhiClock() {
  const read = () => {
    const parts = Object.fromEntries(new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date()).map((p) => [p.type, p.value]));
    const minutes = Number(parts.hour) * 60 + Number(parts.minute);
    const weekday = !["Sat", "Sun"].includes(parts.weekday);
    return { time: `${parts.hour}:${parts.minute}`, inSession: weekday && minutes >= 555 && minutes < 930 };
  };
  const [clock, setClock] = useState(read);
  useEffect(() => {
    const id = window.setInterval(() => setClock(read()), 15000);
    return () => window.clearInterval(id);
  }, []);
  return clock;
}

export default function Footer() {
  const { pathname } = useLocation();
  const footerRef = useRef(null);
  const [isIn, setIsIn] = useState(false);
  const [copied, setCopied] = useState(false);
  const clock = useDelhiClock();

  useEffect(() => {
    const el = footerRef.current;
    if (!el || !("IntersectionObserver" in window)) { setIsIn(true); return undefined; }
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsIn(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!copied) return undefined;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); }
    catch { window.location.href = `mailto:${EMAIL}`; }
  };

  const backToTop = () => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  };

  return (
    <footer ref={footerRef} className={`az-footer${isIn ? " is-in" : ""}`}>
      <div className="az-glow" aria-hidden="true" />
      <div className="az-container">
        {/* Statement + contact */}
        <div className="az-head">
          <p className="az-statement">
            <span>Learn the market.</span>
            <span className="az-accent">Trade with discipline.</span>
          </p>
          <div className="az-contact">
            <div className="az-email">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <button type="button" onClick={copyEmail} aria-label={copied ? "Email address copied" : "Copy email address"}>
                {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <a className="az-phone" href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>

        {/* Links */}
        <div className="az-grid">
          <div className="az-brand-col">
            <Link to="/" className="az-brand" aria-label="Alphira Capital home">
              <img className="alphira-ac-logo" src="/alphira-ac-logo.svg" alt="" aria-hidden="true" />
              <span className="az-wordmark">alphira<span>CAPITAL</span></span>
            </Link>
            <a className="az-address" href={MAP_URL} target="_blank" rel="noopener noreferrer">{ADDRESS}<ArrowUpRight size={13} aria-hidden="true" /></a>
            <a className="az-chip" href={WHATSAPP} target="_blank" rel="noopener noreferrer"><FaWhatsapp size={15} aria-hidden="true" />WhatsApp channel</a>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} className="az-col" aria-label={col.title}>
              <p className="az-col-title">{col.title}</p>
              <ul>{col.links.map((l) => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}</ul>
            </nav>
          ))}
        </div>

        {/* Market clock strip */}
        <div className="az-ticker">
          <span className={`az-session${clock.inSession ? " is-open" : ""}`}><i aria-hidden="true" />{clock.inSession ? "Within NSE hours" : "Outside NSE hours"}</span>
          <span className="az-time"><time>{clock.time}</time> IST · New Delhi</span>
          <span className="az-hours">NSE session 09:15 – 15:30 IST</span>
        </div>

        {/* Giant outlined wordmark */}
        <div className="az-giant" aria-hidden="true">
          <span className="az-giant-text">alphira</span>
        </div>

        {/* Bottom bar */}
        <div className="az-bottom">
          <p>© {new Date().getFullYear()} Alphira Capital</p>
          <nav aria-label="Legal" className="az-legal">
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms-conditions">Terms</Link>
            {pathname === "/" && <button type="button" className="ac-cookie-link" onClick={openCookieSettings}>Cookies</button>}
          </nav>
          <button type="button" className="az-top-btn" onClick={backToTop}>Back to top <ArrowUp size={15} aria-hidden="true" /></button>
        </div>
      </div>
    </footer>
  );
}
