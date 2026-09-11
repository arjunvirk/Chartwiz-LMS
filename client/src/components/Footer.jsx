import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import "./Footer.css";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/admission", label: "Apply For Admission" },
];
const COURSES = ["The Forex Program", "The Forex Program with Indian Market"];

export default function Footer() {
  const reducedMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : delay },
  });

  return (
    <footer className="az-footer">
      <div className="az-container">
        <div className="az-grid">
          <motion.div {...reveal()} className="az-brand-column">
            <Link to="/" className="az-brand" aria-label="Alphira Capital home">
              <span className="az-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M7 24 16 7l9 17M11 18h10" stroke="currentColor" strokeWidth="2.5" /></svg></span>
              <span className="az-wordmark">alphira<span>CAPITAL</span></span>
            </Link>
            <p className="az-description">Professional stock market mentorship platform helping aspiring traders learn price action, options trading, psychology and risk management.</p>
            <a href="https://whatsapp.com/channel/0029Vb8p0Ae9xVJdzQ9Oqy1s" className="az-social" aria-label="Alphira Capital WhatsApp channel"><FaWhatsapp size={19} aria-hidden="true" /><span>WhatsApp</span><ArrowUpRight size={14} aria-hidden="true" /></a>
          </motion.div>

          <motion.nav {...reveal(0.06)} aria-label="Footer quick links" className="az-column">
            <h2>Quick Links</h2>
            <ul>{QUICK_LINKS.map(({ to, label }) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul>
          </motion.nav>

          <motion.div {...reveal(0.12)} className="az-column">
            <h2>Popular Courses</h2>
            <ul className="az-courses">{COURSES.map((course) => <li key={course}>{course}</li>)}</ul>
          </motion.div>

          <motion.div {...reveal(0.18)} className="az-column az-contact">
            <h2>Contact</h2>
            <address>
              <div><Mail size={16} aria-hidden="true" /><span>contact.alphiracapital@gmail.com</span></div>
              <div><Phone size={16} aria-hidden="true" /><span>+91 9217222356</span></div>
              <div><MapPin size={16} aria-hidden="true" /><span>Plot No. 38, First Floor Pocket 20 Sector - 24<br />Rohini-110085, Delhi, India</span></div>
            </address>
          </motion.div>
        </div>

        <div className="az-bottom">
          <p>© {new Date().getFullYear()} Alphira Capital. All rights reserved.</p>
          <nav aria-label="Legal and account links" className="az-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-conditions">Terms &amp; Conditions</Link>
            <Link to="/support">Support</Link>
            <Link to="/login" className="az-portal">Student &amp; Staff Portal <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
