import "./LeadPopup.css";
import { X, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../config/api";
import { trackLead } from "../utils/metaPixel";

const LeadPopup = () => {
  const [open, setOpen] = useState(false);
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

  // OPEN AFTER 4 SECONDS
  useEffect(() => {
    const popupShown = localStorage.getItem("leadPopupShown");
    if (popupShown) return;

    const timer = setTimeout(() => {
      setOpen(true);
      localStorage.setItem("leadPopupShown", "true");

      setTimeout(
        () => {
          localStorage.removeItem("leadPopupShown");
        },
        24 * 60 * 60 * 1000,
      );
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // SUBMIT
  const submitHandler = async (e) => {
    e.preventDefault();

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

      setOpen(false);
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      toast.error(error.message);
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
    <dialog ref={dialogRef} className="alphira-enquiry-dialog" aria-labelledby="alphira-enquiry-title" onCancel={(event) => { event.preventDefault(); setOpen(false); }}>
      <div className="alphira-enquiry-panel">
        <button type="button" autoFocus onClick={() => setOpen(false)} className="alphira-enquiry-close" aria-label="Close enquiry form"><X size={18} /></button>
        <header className="alphira-enquiry-heading">
          <img src="/alphira-ac-logo.svg" alt="Alphira Capital" className="alphira-enquiry-logo" />
          <p className="alphira-enquiry-eyebrow">Your next chapter</p>
          <h2 id="alphira-enquiry-title">Build your knowledge.<br /><span>Find your direction.</span></h2>
          <p>Learn Forex, stock markets, risk management and trading strategies with expert mentors.</p>
        </header>
        <form onSubmit={submitHandler} className="alphira-enquiry-form">
          <div><label htmlFor="enquiry-name">Your name</label><input id="enquiry-name" name="name" type="text" autoComplete="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><label htmlFor="enquiry-email">Email address</label><input id="enquiry-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div><label htmlFor="enquiry-phone">Mobile number</label><input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" placeholder="Enter mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <div><label htmlFor="enquiry-course">Interested in</label><select id="enquiry-course" value={course} onChange={(e) => setCourse(e.target.value)}><option>The Forex Program</option><option>The Forex Program with Indian Market</option></select></div>
          <button type="submit" className="alphira-enquiry-submit">Yes, I Want To Learn<ArrowRight size={17} aria-hidden="true" /></button>
        </form>
      </div>
    </dialog>
  );
};
export default LeadPopup;
