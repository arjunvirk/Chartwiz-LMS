import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ChartNoAxesCombined, Video, ArrowUpRight } from "lucide-react";
import { useSectionPin } from "../hooks/useSectionPin";
import "./ChooseUs.css";

const CHECKLIST = [
  { title: "Step-by-Step Learning", desc: "Structured roadmap from beginner to advanced trader." },
  { title: "Risk Management Focus", desc: "Protect your capital with professional risk strategies." },
  { title: "Psychology & Discipline", desc: "Build emotional control and decision-making consistency." },
];

export default function ChooseUs() {
  const chooseUsRef = useSectionPin();
  const reducedMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section ref={chooseUsRef} className="au-section" aria-labelledby="au-title">
      <div className="au-container">
        <motion.div {...reveal()} className="au-heading">
          <div>
            <p className="au-eyebrow"><span aria-hidden="true" />Why Choose Alphira</p>
            <h2 id="au-title">Built for<br /><span>serious traders.</span></h2>
          </div>
          <p className="au-intro">Our mentorship is designed to help you understand the market deeply, build discipline and develop professional trading skills step by step.</p>
        </motion.div>

        <div className="au-grid">
          <motion.article {...reveal(0.08)} className="au-education">
            <div className="au-card-top"><span className="au-icon" aria-hidden="true"><ChartNoAxesCombined size={26} strokeWidth={1.5} /></span><span className="au-index" aria-hidden="true">01 / THE FOUNDATION</span></div>
            <h3>Real Market Education</h3>
            <p className="au-description">Learn how professional traders analyze charts, manage risks, identify high probability setups and build consistent trading systems instead of relying on random signals.</p>
            <ul className="au-checklist">
              {CHECKLIST.map((item) => (
                <li key={item.title}>
                  <span className="au-check" aria-hidden="true"><Check size={14} strokeWidth={2} /></span>
                  <div><h4>{item.title}</h4><p>{item.desc}</p></div>
                </li>
              ))}
            </ul>
          </motion.article>

          <div className="au-side">
            <motion.article {...reveal(0.16)} className="au-lessons">
              <div className="au-card-top"><span className="au-icon" aria-hidden="true"><Video size={24} strokeWidth={1.5} /></span><span className="au-index" aria-hidden="true">02 / YOUR PACE</span></div>
              <h3>Premium Recorded Lessons</h3>
              <p className="au-description">Access high-quality recorded mentorship anytime with lifetime learning flexibility.</p>
            </motion.article>

            <motion.div {...reveal(0.24)} className="au-invitation">
              <div className="au-process" aria-hidden="true"><span>Learn</span><i /><span>Practice</span><i /><span>Grow</span></div>
              <h3>Learn. Practice. Grow.</h3>
              <p className="au-description">Alphira helps aspiring traders transform confusion into clarity through professional mentorship.</p>
              <Link to="/admission" className="au-join">Join Alphira Today <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
