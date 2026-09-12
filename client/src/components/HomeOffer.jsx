import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import "./HomeOffer.css";
import dropSound from "./offer-drop.wav";

const NEXT_SHOW_KEY = "alphira-home-offer-next-show";
const REPEAT_DELAY = 10 * 60 * 1000;

export default function HomeOffer() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const timerRef = useRef(null);
  const showRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let context;
    let buffer;
    let decoding;
    let activeSource;
    const audio = new Audio(dropSound);
    audio.preload = "auto";
    audio.volume = 0.7;
    const report = (stage, error) => {
      if (disposed || error?.name === "AbortError") return;
      console.warn(`[Alphira offer] ${stage}`, error?.name, error?.message);
    };
    const unlockAudio = (event) => {
      if (!event.isTrusted) return;
      if (navigator.userActivation && !navigator.userActivation.isActive) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      try {
        context ??= new AudioContext();
        // Resume synchronously inside the click, before fetching or decoding.
        void context.resume().catch((error) => report("Audio unlock failed:", error));
        decoding ??= fetch(dropSound)
          .then((response) => {
            if (!response.ok) throw new Error(`Sound request failed: ${response.status}`);
            return response.arrayBuffer();
          })
          .then((bytes) => disposed ? null : context.decodeAudioData(bytes))
          .then((decoded) => { if (!disposed) buffer = decoded; })
          .catch((error) => {
            decoding = null;
            report("Sound loading failed:", error);
          });
      } catch (error) {
        report("Audio initialization failed:", error);
      }
    };
    // Capture also catches ordinary clicks inside components that stop bubbling.
    window.addEventListener("click", unlockAudio, true);
    const show = () => {
      setVisible(true);
      if (context?.state === "running" && buffer) {
        const source = context.createBufferSource();
        const gain = context.createGain();
        source.buffer = buffer;
        gain.gain.value = 0.7;
        source.connect(gain);
        gain.connect(context.destination);
        activeSource = source;
        source.onended = () => { source.disconnect(); gain.disconnect(); };
        source.start();
      } else {
        // Still attempt autoplay when the browser already permits media audio.
        audio.currentTime = 0;
        void audio.play().catch((error) => report("Popup sound playback failed:", error));
      }
    };
    showRef.current = show;
    let delay = 5000;
    try {
      const nextShow = Number(sessionStorage.getItem(NEXT_SHOW_KEY));
      if (Number.isFinite(nextShow) && nextShow > Date.now()) {
        delay = nextShow - Date.now();
      }
    } catch { /* Timers still work without storage. */ }
    timerRef.current = window.setTimeout(show, delay);

    return () => {
      disposed = true;
      window.removeEventListener("click", unlockAudio, true);
      window.clearTimeout(timerRef.current);
      showRef.current = null;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      activeSource?.stop();
      if (context) void context.close().catch(() => {});
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(NEXT_SHOW_KEY, String(Date.now() + REPEAT_DELAY));
    } catch { /* Optional persistence across page reloads. */ }
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => showRef.current?.(), REPEAT_DELAY);
  };

  return (
    <div aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {visible && (
          <motion.aside
            className="alphira-home-offer"
            aria-label="Course admission offer"
            initial={{ opacity: 0, x: reducedMotion ? 0 : 60, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: reducedMotion ? 0 : 40 }}
            transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 210, damping: 25 }}
          >
            <button type="button" className="alphira-home-offer-close" onClick={dismiss} aria-label="Close course offer"><X size={18} /></button>
            <p className="alphira-home-offer-label">A little head start</p>
            <h2>Learn more.<br /><span>Pay 20% less.</span></h2>
            <p className="alphira-home-offer-copy">Get 20% off courses. Call our team to ask about the offer and enrol.</p>
            <a href="tel:+919217222356" className="alphira-home-offer-call"><span><small>Talk to admissions</small>+91 92172 22356</span><ArrowUpRight size={22} aria-hidden="true" /></a>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
