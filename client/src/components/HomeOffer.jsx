import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Phone, X, Volume2, VolumeX, BadgePercent } from "lucide-react";
import { POPUP_SCHEDULE, popupState, savePopupState } from "../config/popupSchedule";
import { trackContact } from "../utils/metaPixel";
import "./HomeOffer.css";

const KEY = "alphira-offer-v2";
const MUTE_KEY = "alphira-offer-muted";
const CFG = POPUP_SCHEDULE.offer;

/* A short, soft two-note chime synthesised with Web Audio (no file to load). */
function playChime(ctx, volume) {
  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.value = volume;
  master.connect(ctx.destination);
  [[880, 0], [1318.5, 0.11]].forEach(([freq, at]) => {
    [["sine", 1], ["triangle", 0.25]].forEach(([type, level]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now + at);
      g.gain.setValueAtTime(0.0001, now + at);
      g.gain.exponentialRampToValueAtTime(level, now + at + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, now + at + 0.9);
      osc.connect(g);
      g.connect(master);
      osc.start(now + at);
      osc.stop(now + at + 0.95);
    });
  });
  window.setTimeout(() => master.disconnect(), 1300);
}

const leadDialogOpen = () => Boolean(document.querySelector(".alphira-enquiry-dialog[open]"));

export default function HomeOffer() {
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(() => { try { return localStorage.getItem(MUTE_KEY) === "1"; } catch { return false; } });
  const reducedMotion = useReducedMotion();
  const ctxRef = useRef(null);
  const timerRef = useRef(null);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  // Browsers only allow sound after the visitor has interacted with the page,
  // so the audio engine is unlocked on the first click, tap or key press.
  useEffect(() => {
    const unlock = () => {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      try {
        ctxRef.current ??= new AC();
        if (ctxRef.current.state === "suspended") void ctxRef.current.resume().catch(() => {});
      } catch { /* sound is optional */ }
    };
    const opts = { capture: true, passive: true };
    ["pointerdown", "keydown", "touchstart"].forEach((t) => window.addEventListener(t, unlock, opts));
    return () => {
      ["pointerdown", "keydown", "touchstart"].forEach((t) => window.removeEventListener(t, unlock, opts));
      if (ctxRef.current) void ctxRef.current.close().catch(() => {});
    };
  }, []);

  const show = useCallback(() => {
    // Wait politely if the tab is hidden or the enquiry dialog is open.
    if (document.hidden || leadDialogOpen()) { timerRef.current = window.setTimeout(show, 2000); return; }
    const state = popupState(KEY);
    const now = Date.now();
    state.shows = [...state.shows.filter((t) => now - t < 86400000), now];
    savePopupState(KEY, state);
    setVisible(true);
    const ctx = ctxRef.current;
    if (!mutedRef.current && ctx?.state === "running") {
      try { playChime(ctx, CFG.soundVolume); } catch { /* ignore */ }
    }
  }, []);

  const schedule = useCallback((delay) => {
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(show, Math.max(0, delay));
  }, [show]);

  useEffect(() => {
    const { nextAt } = popupState(KEY);
    schedule(Math.max(CFG.firstDelay, nextAt - Date.now()));
    return () => window.clearTimeout(timerRef.current);
  }, [schedule]);

  const hide = (snooze) => {
    setVisible(false);
    const state = popupState(KEY);
    const recent = state.shows.filter((t) => Date.now() - t < 86400000);
    const wait = snooze ?? (recent.length >= CFG.maxPerDay ? CFG.afterMax : CFG.afterClose);
    savePopupState(KEY, { ...state, shows: recent, nextAt: Date.now() + wait });
    schedule(wait);
  };

  // Let the browser open the phone dialer (or the "choose an app" prompt on
  // desktop) first; only remember the call and tuck the card away afterwards.
  const onCall = () => {
    trackContact();
    const state = popupState(KEY);
    savePopupState(KEY, { ...state, nextAt: Date.now() + CFG.afterCall });
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setVisible(false), 4000);
  };

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    try { localStorage.setItem(MUTE_KEY, next ? "1" : "0"); } catch { /* ignore */ }
    if (!next && ctxRef.current?.state === "running") playChime(ctxRef.current, CFG.soundVolume);
  };

  return (
    <div aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {visible && (
          <motion.aside
            className="aho"
            aria-label="Course admission offer"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            transition={reducedMotion ? { duration: 0.15 } : { type: "spring", stiffness: 240, damping: 24 }}
          >
            <span className="aho-shine" aria-hidden="true" />
            <div className="aho-top">
              <span className="aho-badge"><BadgePercent size={14} aria-hidden="true" />Special offer</span>
              <div className="aho-tools">
                <button type="button" onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? "Turn offer sound on" : "Turn offer sound off"} title={muted ? "Sound off" : "Sound on"}>
                  {muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
                </button>
                <button type="button" onClick={() => hide()} aria-label="Close course offer"><X size={17} aria-hidden="true" /></button>
              </div>
            </div>

            <div className="aho-main">
              <div className="aho-big" aria-hidden="true"><strong>20</strong><span>%<small>OFF</small></span></div>
              <div>
                <h2>Learn more.<br /><span>Pay 20% less.</span></h2>
                <p>Get 20% off courses. Call our team to ask about the offer and enroll.</p>
              </div>
            </div>

            <a href="tel:+919217222356" className="aho-call" onClick={onCall}>
              <span className="aho-call-icon" aria-hidden="true"><Phone size={17} /></span>
              <span className="aho-call-text"><small>Call to claim</small>+91 92172 22356</span>
              <span className="aho-call-ping" aria-hidden="true" />
            </a>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
