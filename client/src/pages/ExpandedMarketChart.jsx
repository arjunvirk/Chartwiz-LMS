import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

export default function ExpandedMarketChart({ chart, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const [closing, setClosing] = useState(false);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const overflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      dialog.close();
      document.documentElement.style.overflow = overflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);
  return createPortal(
    <dialog ref={dialogRef} className="alphira-chart-dialog" aria-labelledby="alphira-expanded-title" data-lenis-prevent onCancel={(event) => { event.preventDefault(); setClosing(true); }}>
      <motion.div className="alphira-chart-expanded" initial={{ opacity: 0, scale: reduced ? 1 : .93, y: reduced ? 0 : 30 }} animate={closing ? { opacity: 0, scale: reduced ? 1 : .96, y: reduced ? 0 : 16 } : { opacity: 1, scale: 1, y: 0 }} transition={reduced ? { duration: 0 } : closing ? { duration: .2, ease: 'easeIn' } : { type: 'spring', stiffness: 260, damping: 28 }} onAnimationComplete={() => { if (closing) onClose(); else setReady(true); }}>
        <header className="alphira-chart-expanded-header"><div><span className="alphira-markets-tag">{chart.tag}</span><h2 id="alphira-expanded-title">{chart.title}</h2><span className="alphira-chart-expanded-label">Expanded chart</span></div><button ref={closeRef} type="button" onClick={() => setClosing(true)} aria-label="Close expanded chart"><X size={21} /><span>Close</span></button></header>
        <div className="alphira-chart-expanded-body">
          {ready ? <AdvancedRealTimeChart theme="light" backgroundColor="#f8f7f3" toolbar_bg="#f8f7f3" symbol={chart.symbol} autosize /> : <p className="alphira-chart-preparing" role="status">Opening chart…</p>}
        </div>
      </motion.div>
    </dialog>, document.body,
  );
}

