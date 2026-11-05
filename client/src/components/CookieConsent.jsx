import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { Cookie, X, ShieldCheck, BarChart3, ArrowUpRight } from "lucide-react";
import { getCookieConsent, saveCookieConsent, subscribeConsent, SETTINGS_EVENT } from "../utils/cookieConsent";
import "./CookieConsent.css";

export default function CookieConsent() {
  const [open, setOpen] = useState(() => !getCookieConsent());
  const [customize, setCustomize] = useState(false);
  const [marketing, setMarketing] = useState(() => Boolean(getCookieConsent()?.marketing));
  const heading = useRef(null);
  const restoreFocus = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeConsent(() => {
      const next = getCookieConsent();
      setMarketing(Boolean(next?.marketing));
      setOpen(!next);
    });
    const show = () => {
      restoreFocus.current = document.activeElement;
      setMarketing(Boolean(getCookieConsent()?.marketing));
      setCustomize(true);
      setOpen(true);
      requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
    };
    window.addEventListener(SETTINGS_EVENT, show);
    return () => { unsubscribe(); window.removeEventListener(SETTINGS_EVENT, show); };
  }, []);

  const close = () => {
    // Dismissing an unanswered prompt keeps optional tracking disabled.
    if (!getCookieConsent()) saveCookieConsent(false);
    setOpen(false);
    requestAnimationFrame(() => {
      const previous = restoreFocus.current;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
      restoreFocus.current = null;
    });
  };
  const save = (enabled) => {
    saveCookieConsent(enabled);
    close();
  };

  return createPortal(open ? (
    <section className={`ac-consent${customize ? " is-custom" : ""}`} aria-labelledby="ac-consent-title" onKeyDown={(event) => { if (event.key === "Escape") close(); }}>
      <div className="ac-consent-top">
        <span className="ac-consent-badge"><Cookie size={15} aria-hidden="true" />Your privacy</span>
        <button type="button" className="ac-consent-close" onClick={close} aria-label="Close cookie settings"><X size={18} aria-hidden="true" /></button>
      </div>
      <h2 id="ac-consent-title" ref={heading} tabIndex={-1}>Your visit. Your choice.</h2>
      <p>We use essential cookies to keep your account working. With your permission, Meta Pixel helps us measure our ads and understand visits. Optional tracking is off until you accept.</p>
      <Link to="/privacy-policy" className="ac-consent-link">Read our privacy policy <ArrowUpRight size={14} aria-hidden="true" /></Link>

      {customize && (
        <div className="ac-consent-options" id="ac-consent-options">
          <div className="ac-consent-row">
            <span className="ac-consent-row-icon" aria-hidden="true"><ShieldCheck size={17} /></span>
            <span className="ac-consent-row-text"><strong>Essential</strong><small>Sign-in, security and remembering this choice.</small></span>
            <span className="ac-consent-status">Always on</span>
          </div>
          <label className="ac-consent-row">
            <span className="ac-consent-row-icon" aria-hidden="true"><BarChart3 size={17} /></span>
            <span className="ac-consent-row-text"><strong>Marketing</strong><small>Meta Pixel: advertising measurement and activity tracking.</small></span>
            <span className="ac-consent-switch">
              <input type="checkbox" role="switch" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} aria-checked={marketing} />
              <i aria-hidden="true" />
            </span>
          </label>
        </div>
      )}

      <div className="ac-consent-actions">
        <button type="button" className="ac-consent-ghost" onClick={() => save(false)}>Reject optional</button>
        <button type="button" className="ac-consent-primary" onClick={() => save(true)}>Accept optional</button>
      </div>
      {customize
        ? <button type="button" className="ac-consent-save" onClick={() => save(marketing)}>Save my preferences</button>
        : <button type="button" className="ac-consent-customize" aria-expanded={customize} aria-controls="ac-consent-options" onClick={() => setCustomize(true)}>Customize preferences</button>}
    </section>
  ) : null, document.body);
}
