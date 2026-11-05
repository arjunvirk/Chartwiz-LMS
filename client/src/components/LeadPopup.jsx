import "./LeadPopup.css";
import { X, ArrowRight, Check, Users, LineChart, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../config/api";
import { trackLead } from "../utils/metaPixel";
import { courseArtProps } from "../config/courseArt";
import { POPUP_SCHEDULE, popupState, savePopupState } from "../config/popupSchedule";

const KEY = "alphira-lead-v2";
const CFG = POPUP_SCHEDULE.lead;
const COURSES = [
  { name: "The Forex Program", short: "Forex" },
  { name: "The Forex Program with Indian Market", short: "Forex + Indian" },
  { name: "Advanced Order Flow Program", short: "Order flow" },
  { name: "Crypto Futures & Spot Trading Program", short: "Crypto" },
];
const POINTS = [
  { icon: Users, text: "Classroom mentorship in Delhi NCR" },
  { icon: LineChart, text: "Practical, chart-first lessons" },
  { icon: ShieldCheck, text: "Risk management from day one" },
];

const LeadPopup = () => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("The Forex Program");

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") || "Website";
  const utmMedium = params.get("utm_medium") || "";
  const utmCampaign = params.get("utm_campaign") || "";
  const utmContent = params.get("utm_content") || "";
  const referrer = document.referrer || "";

  // Show once the first delay has passed and the visitor isn't snoozed
  // (timing rules live in config/popupSchedule.js).
  useEffect(() => {
    const { nextAt } = popupState(KEY);
    const delay = Math.max(CFG.firstDelay, nextAt - Date.now());
    if (delay > 2 ** 31 - 1) return undefined;
    const timer = setTimeout(() => setOpen(true), delay);
    return () => clearTimeout(timer);
  }, []);

  const close = (wait = CFG.afterClose) => {
    savePopupState(KEY, { ...popupState(KEY), nextAt: Date.now() + wait });
    setOpen(false);
  };

  // SUBMIT
  const submitHandler = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          course,
          source: utmSource,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          referrer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message, { duration: 3000 });

      trackLead();

      close(CFG.afterSubmit);
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open) { if (dialog.open) dialog.close(); return; }
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="alphira-enquiry-dialog"
      aria-labelledby="alphira-enquiry-title"
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <div className="alp">
        {/* Visual side */}
        <div className="alp-visual" aria-hidden="true">
          <div className="alp-art">
            {COURSES.map((c) => <img key={c.name} {...courseArtProps(c.name, "320px")} alt="" className={c.name === course ? "is-on" : ""} loading="lazy" />)}
          </div>
          <div className="alp-visual-copy">
            <img src="/alphira-ac-logo.svg" alt="" className="alp-logo" />
            <ul>{POINTS.map(({ icon: Icon, text }) => <li key={text}><Icon size={15} />{text}</li>)}</ul>
          </div>
        </div>

        {/* Form side */}
        <div className="alp-body">
          <button type="button" autoFocus onClick={() => close()} className="alp-close" aria-label="Close enquiry form"><X size={18} /></button>
          <header>
            <p className="alp-eyebrow">Your next chapter</p>
            <h2 id="alphira-enquiry-title">Build your knowledge.<br /><span>Find your direction.</span></h2>
            <p className="alp-sub">Learn Forex, stock markets, risk management and trading strategies with expert mentors.</p>
          </header>
          <form onSubmit={submitHandler} className="alp-form" aria-busy={submitting}>
            <div className="alp-row">
              <div><label htmlFor="enquiry-name">Your name</label><input id="enquiry-name" name="name" type="text" autoComplete="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><label htmlFor="enquiry-phone">Mobile number</label><input id="enquiry-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Enter mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            </div>
            <div><label htmlFor="enquiry-email">Email address</label><input id="enquiry-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <fieldset className="alp-courses">
              <legend>Interested in</legend>
              <div>
                {COURSES.map((c) => (
                  <label key={c.name} className={course === c.name ? "is-on" : ""}>
                    <input type="radio" name="enquiry-course" value={c.name} checked={course === c.name} onChange={(e) => setCourse(e.target.value)} />
                    <span>{c.short}</span>
                    <i aria-hidden="true"><Check size={11} strokeWidth={3} /></i>
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit" className="alp-submit" disabled={submitting}>
              <span>{submitting ? "Sending…" : "Yes, I Want To Learn"}</span>
              {submitting ? <span className="ac-spinner" aria-hidden="true" /> : <ArrowRight size={17} aria-hidden="true" />}
            </button>
            <p className="alp-note">Our team will call you about batches and fees. No spam.</p>
          </form>
        </div>
      </div>
    </dialog>
  );
};
export default LeadPopup;
