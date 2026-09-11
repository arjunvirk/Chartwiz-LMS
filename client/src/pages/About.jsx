import { motion, useReducedMotion } from "framer-motion";
import CountUpImport from "react-countup";
import founderImg from "../assets/founder.jpeg";
import "./About.css";
const CountUp = CountUpImport.default ?? CountUpImport;
const FEATURES = [
  { n: "01", title: "Structured Learning", desc: "Step-by-step lessons designed for every level of trader." },
  { n: "02", title: "Expert Mentorship", desc: "Learn directly from experienced market professionals." },
  { n: "03", title: "Practical Strategies", desc: "Real-world trading concepts you can apply immediately." },
  { n: "04", title: "Lifetime Growth", desc: "Continuous learning and improvement through market cycles." },
];
const STATS = [
  { value: 500, suffix: "+", label: "Students" },
  { value: 120, suffix: "+", label: "Premium Lessons" },
  { value: 15, suffix: "+", label: "Strategies" },
  { value: 24, suffix: "/7", label: "Access" },
];
export default function About() {
  const reduced = useReducedMotion();
  const reveal = (delay = 0) => ({ initial: reduced ? false : { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 }, transition: { duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay } });
  const count = (value) => reduced ? value : <CountUp end={value} duration={2} enableScrollSpy scrollSpyOnce />;
  return <main className="alphira-story">
    <div className="alphira-story-container">
      <motion.header {...reveal()} className="alphira-story-hero">
        <p className="alphira-story-label">About Alphira Capital <span>EDUCATION / DISCIPLINE / GROWTH</span></p>
        <h1>Empowering traders<br />with <span>professional<br />education.</span></h1>
        <div className="alphira-story-intro">
          <span className="alphira-story-symbol" aria-hidden="true">↗</span>
          <p>Alphira Capital is a modern trading education platform designed to help beginners and experienced traders build confidence, develop profitable trading habits, and understand the financial markets through structured mentorship and practical learning.</p>
        </div>
      </motion.header>
      <section className="alphira-story-founder" aria-labelledby="founder-heading">
        <motion.figure {...reveal()} className="alphira-story-portrait">
          <img src={founderImg} alt="Rohit Kumar, founder and mentor at Alphira Capital" />
          <figcaption><span>ROHIT KUMAR</span><span>Founder &amp; Mentor</span></figcaption>
        </motion.figure>
        <motion.div {...reveal(0.12)} className="alphira-story-founder-copy">
          <p className="alphira-story-eyebrow">01 / The person behind Alphira</p>
          <h2 id="founder-heading">Meet your<br /><span>trading mentor.</span></h2>
          <p className="alphira-story-name">Rohit Kumar</p>
          <p>With years of market experience and a passion for teaching, our mission is to help traders understand the market with confidence, discipline, and proper risk management.</p>
          <p>At Alphira Capital, we focus on practical learning, real-world trading concepts, and developing a professional trader mindset rather than chasing shortcuts.</p>
          <div className="alphira-story-founder-stats"><div><strong>{count(500)}+</strong><span>Students Guided</span></div><div><strong>{count(5)}+</strong><span>Years Experience</span></div></div>
        </motion.div>
      </section>
      <section className="alphira-story-beliefs" aria-label="Mission and vision">
        <motion.article {...reveal()}><p className="alphira-story-eyebrow">01 — Mission</p><h2>Our Mission</h2><p>Our mission is to simplify trading education and provide high-quality mentorship that helps students avoid common mistakes, manage risk effectively, and build a sustainable approach to trading.</p></motion.article>
        <motion.article {...reveal(0.1)}><p className="alphira-story-eyebrow">02 — Vision</p><h2>Our Vision</h2><p>We envision a community of disciplined traders who understand market psychology, risk management, and strategy execution rather than relying on speculation or shortcuts.</p></motion.article>
      </section>
      <section className="alphira-story-method" aria-labelledby="method-heading">
        <motion.div {...reveal()}><p className="alphira-story-eyebrow">02 / Our approach</p><h2 id="method-heading">Why choose<br /><span>Alphira Capital?</span></h2></motion.div>
        <div className="alphira-story-principles">{FEATURES.map((feature, i) => <motion.article {...reveal(i * .05)} key={feature.n}><span>{feature.n}</span><div><h3>{feature.title}</h3><p>{feature.desc}</p></div></motion.article>)}</div>
      </section>
    </div>
  </main>;
}
