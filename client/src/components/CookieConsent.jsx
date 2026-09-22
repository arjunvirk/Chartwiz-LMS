import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { getCookieConsent, saveCookieConsent, subscribeConsent, SETTINGS_EVENT } from "../utils/cookieConsent";
import "./CookieConsent.css";

export default function CookieConsent() {
  const [choice, setChoice] = useState(getCookieConsent);
  const [open, setOpen] = useState(() => !getCookieConsent());
  const [customize, setCustomize] = useState(false);
  const [marketing, setMarketing] = useState(() => Boolean(getCookieConsent()?.marketing));
  const heading = useRef(null);
  const trigger = useRef(null);
  const restoreFocus = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeConsent(() => {
      const next = getCookieConsent();
      setChoice(next);
      setMarketing(Boolean(next?.marketing));
      setOpen(!next);
    });
    const show = () => {
      restoreFocus.current = document.activeElement;
      setMarketing(Boolean(getCookieConsent()?.marketing));
      setCustomize(true);
      setOpen(true);
      requestAnimationFrame(() => heading.current?.focus());
    };
    window.addEventListener(SETTINGS_EVENT, show);
    return () => { unsubscribe(); window.removeEventListener(SETTINGS_EVENT, show); };
  }, []);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => {
      const previous = restoreFocus.current;
      if (previous?.isConnected && !heading.current?.contains(previous)) previous.focus();
      else trigger.current?.focus();
    });
  };
  const save = (enabled) => {
    saveCookieConsent(enabled);
    close();
  };

  return createPortal(open ? (
    <section className="ac-consent" aria-labelledby="ac-consent-title" onKeyDown={(event) => { if (event.key === "Escape" && choice) close(); }}>
      <div className="ac-consent-top"><span>YOUR PRIVACY</span>{choice && <button type="button" onClick={close} aria-label="Close cookie settings">×</button>}</div>
      <h2 id="ac-consent-title" ref={heading} tabIndex={-1}>Your visit. Your choice.</h2>
      <p>We use essential cookies to keep your account working. With your permission, Meta Pixel helps us measure our ads and understand visits. Optional tracking is off until you accept.</p>
      <Link to="/privacy-policy">Read our privacy policy ↗</Link>
      {customize && <div className="ac-consent-options" id="ac-consent-options">
        <div><span><strong>Essential</strong><small>Sign-in, security and remembering this choice.</small></span><span className="ac-consent-status">Always on</span></div>
        <label><span><strong>Marketing</strong><small>Meta Pixel: advertising measurement and activity tracking.</small></span><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} /></label>
      </div>}
      <div className="ac-consent-actions">
        <button type="button" onClick={() => save(false)}>Reject optional</button>
        <button type="button" onClick={() => save(true)}>Accept optional</button>
      </div>
      {customize ? <button type="button" className="ac-consent-save" onClick={() => save(marketing)}>Save my preferences</button> : <button type="button" className="ac-consent-customize" aria-expanded={customize} aria-controls="ac-consent-options" onClick={() => setCustomize(true)}>Customize preferences</button>}
    </section>
  ) : <button ref={trigger} className="ac-consent-trigger" type="button" onClick={() => { restoreFocus.current = trigger.current; setCustomize(true); setOpen(true); requestAnimationFrame(() => heading.current?.focus()); }}>Cookie settings</button>, document.body);
}
