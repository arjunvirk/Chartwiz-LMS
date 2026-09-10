import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import anandMalhotra from "../assets/anand_malhotra.jpeg";
import varunMalhotra from "../assets/varun_malhotra.jpeg";
import lalitKumar from "../assets/lalit_kumar.jpeg";
import "./Testimonials.css";

const TESTIMONIALS = [
  { id: 1, name: "Anand Malhotra", role: "Options Trader", image: anandMalhotra, review: "Alphira completely changed the way I understand the market. The structured mentorship and psychology lessons helped me become far more disciplined in trading." },
  { id: 2, name: "Varun Malhotra", role: "Swing Trader", image: varunMalhotra, review: "The price action course is extremely practical and beginner friendly. I finally understand market structure and risk management properly." },
  { id: 4, name: "Lalit Kumar", role: "Swing Trader", image: lalitKumar, review: "Alphira Capital is one of the best institutes for anyone looking to learn stock market trading and investing from scratch." },
];

export default function Testimonials() {
  const reducedMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="ar-section" aria-labelledby="ar-title">
      <div className="ar-container">
        <motion.div {...reveal()} className="ar-heading">
          <div>
            <p className="ar-eyebrow"><span aria-hidden="true" />Student Testimonials</p>
            <h2 id="ar-title">Trusted by<br /><span>aspiring traders.</span></h2>
          </div>
          <p className="ar-intro">Thousands of students are learning professional trading skills through Alphira Capital.</p>
        </motion.div>

        <div className="ar-grid">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.figure {...reveal(index * 0.07)} key={testimonial.id} className="ar-card">
              <div className="ar-card-top">
                <div className="ar-stars" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, starIndex) => <Star key={starIndex} size={13} strokeWidth={1.5} fill="currentColor" aria-hidden="true" />)}
                </div>
                <Quote size={27} strokeWidth={1.25} className="ar-quote-icon" aria-hidden="true" />
              </div>
              <blockquote><p>“{testimonial.review}”</p></blockquote>
              <figcaption className="ar-person">
                <img src={testimonial.image} alt={testimonial.name} width={48} height={48} loading="lazy" decoding="async" />
                <div><span className="ar-name">{testimonial.name}</span><span className="ar-role">{testimonial.role}</span></div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div {...reveal()} className="ar-community">
          <div className="ar-community-copy">
            <p className="ar-eyebrow"><span aria-hidden="true" />Join The Community</p>
            <h2>Become a confident<br />&amp; disciplined trader.</h2>
            <p className="ar-community-description">Learn professional market strategies, trading psychology and structured mentorship from Alphira Capital.</p>
          </div>
          <Link to="/admission" className="ar-join">Start Your Journey <ArrowUpRight size={19} aria-hidden="true" /></Link>
        </motion.div>
      </div>
    </section>
  );
}
