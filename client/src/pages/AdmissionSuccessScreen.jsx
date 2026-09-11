import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Home, Mail } from "lucide-react";
import "./AdmissionSuccessScreen.css";

const STEPS = [
  "Our admissions team reviews your application.",
  "You will receive a phone call from Alphira Capital.",
  "Payment instructions will be shared with you.",
  "After payment confirmation, your student account will be created.",
  "Your login credentials will be sent to your registered email.",
];
export default function AdmissionSuccessScreen() {
  const reduced = useReducedMotion();
  return <main className="alphira-confirm-page">
    <motion.div className="alphira-confirm-container" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .65 }}>
      <header className="alphira-confirm-heading">
        <div className="alphira-confirm-check" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><motion.path d="M13 24l8 8 15-16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduced ? 0 : .65, delay: reduced ? 0 : .25 }} /></svg></div>
        <p className="alphira-confirm-eyebrow">Alphira Capital / Admissions</p>
        <h1>Admission submitted<br /><span>successfully.</span></h1>
        <p className="alphira-confirm-description">Thank you for applying to <strong>Alphira Capital</strong>.<br />Your admission request has been received successfully.</p>
      </header>
      <div className="alphira-confirm-grid">
        <section className="alphira-confirm-next" aria-labelledby="alphira-confirm-next-title">
          <h2 id="alphira-confirm-next-title">What Happens Next?</h2>
          <ol>{STEPS.map((text, index) => <li key={text}><span className="alphira-confirm-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><p>{text}</p></li>)}</ol>
        </section>
        <aside className="alphira-confirm-notice" aria-labelledby="alphira-confirm-notice-title">
          <Mail size={24} strokeWidth={1.5} aria-hidden="true" />
          <h2 id="alphira-confirm-notice-title">Important Notice</h2>
          <p>Please keep checking your email inbox (and Spam folder). Once your admission is approved and payment is confirmed, you will automatically receive your Student Portal login credentials.</p>
        </aside>
      </div>
      <nav className="alphira-confirm-actions" aria-label="Continue browsing"><Link to="/" className="alphira-confirm-home"><Home size={17} aria-hidden="true" />Back to Home</Link><Link to="/courses" className="alphira-confirm-courses">Browse Courses <ArrowRight size={17} aria-hidden="true" /></Link></nav>
    </motion.div>
  </main>;
}
