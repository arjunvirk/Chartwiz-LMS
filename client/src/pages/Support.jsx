import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MessageSquare, Clock, ArrowUpRight, ArrowRight, CheckCircle2, UserRound, BookOpen, CreditCard, Wrench, LifeBuoy } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSupportRequest } from "../actions/supportActions";
import { SUPPORT_CREATE_RESET } from "../constants/supportConstants";
import useUltrawideCanvas from "../hooks/useUltrawideCanvas";
import "./AlphiraInfoPages.css";

const CHANNELS = [
  { href: "tel:+919217222356", icon: Phone, label: "Call our team", value: "+91 92172 22356", note: "Fastest for urgent questions", aria: "Call Alphira on +91 92172 22356" },
  { href: "mailto:contact.alphiracapital@gmail.com", icon: Mail, label: "Email support", value: "contact.alphiracapital@gmail.com", note: "Best for account and payment details" },
  { href: "https://whatsapp.com/channel/0029Vb8p0Ae9xVJdzQ9Oqy1s", icon: MessageSquare, label: "WhatsApp channel", value: "Join our official channel", note: "Announcements and updates", external: true },
];
const TOPICS = [
  { id: "Account", icon: UserRound },
  { id: "Courses", icon: BookOpen },
  { id: "Payments", icon: CreditCard },
  { id: "Technical", icon: Wrench },
];
const MAX = 2000;

const Support = () => {
  const dispatch = useDispatch();
  useUltrawideCanvas();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("");
  const [sent, setSent] = useState(false);

  const supportCreate = useSelector((state) => state.supportCreate);
  const { loading, success, error } = supportCreate;

  useEffect(() => {
    if (success) {
      toast.success("Support request submitted successfully!");

      setName("");
      setEmail("");
      setMessage("");
      setTopic("");
      setSent(true);

      dispatch({ type: SUPPORT_CREATE_RESET });
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    // The chosen topic is added to the start of the message so the team can triage it.
    dispatch(createSupportRequest({ name, email, message: topic ? `[${topic}] ${message}` : message }));
  };

  return (
    <main className="aip aip-support">
      <header className="aip-hero">
        <div className="aip-shell aip-hero-grid">
          <div>
            <p className="aip-kicker"><LifeBuoy size={15} aria-hidden="true" />Alphira · Support</p>
            <h1><span>A little help.</span><span className="aip-accent">A clear next step.</span></h1>
            <p className="aip-lede">Need help with your account, courses, payments or technical issues? Our team is here to assist you.</p>
          </div>
          <div className="aip-response">
            <span className="aip-response-icon" aria-hidden="true"><Clock size={20} /></span>
            <div><strong>Within 24 hours</strong><span>Our usual response time</span></div>
          </div>
        </div>
      </header>

      <div className="aip-shell aip-support-grid">
        {/* ---------- Channels ---------- */}
        <aside className="aip-channels" aria-labelledby="aip-channels-title">
          <h2 id="aip-channels-title">Let’s talk.</h2>
          <p>Choose the way that works for you.</p>
          <ul>
            {CHANNELS.map(({ href, icon: Icon, label, value, note, aria, external }, i) => (
              <li key={label} style={{ "--i": i }}>
                <a className="aip-channel" href={href} aria-label={aria} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="aip-channel-icon" aria-hidden="true"><Icon size={19} /></span>
                  <span className="aip-channel-text"><small>{label}</small><strong>{value}</strong><em>{note}</em></span>
                  <ArrowUpRight size={18} aria-hidden="true" className="aip-channel-arrow" />
                </a>
              </li>
            ))}
          </ul>
          <div className="aip-visit">
            <p className="aip-visit-label">Visit us</p>
            <p>Plot No. 38, First Floor, Pocket 20, Sector 24, Rohini, Delhi 110085</p>
          </div>
        </aside>

        {/* ---------- Form ---------- */}
        <section className="aip-form-panel" aria-labelledby="support-form-title">
          {sent ? (
            <div className="aip-sent" role="status">
              <span className="aip-sent-icon" aria-hidden="true"><CheckCircle2 size={34} strokeWidth={1.6} /></span>
              <h2 id="support-form-title">Request received.</h2>
              <p>Thanks for reaching out. Our support team will get back to you, usually within 24 hours.</p>
              <div className="aip-sent-actions">
                <button type="button" className="aip-btn aip-btn-dark" onClick={() => setSent(false)}>Send another request <ArrowRight size={17} aria-hidden="true" /></button>
                <Link to="/" className="aip-btn aip-btn-outline">Back to home</Link>
              </div>
            </div>
          ) : (
            <>
              <p className="aip-kicker aip-kicker-dark">Send a message</p>
              <h2 id="support-form-title">How can we help?</h2>
              <p className="aip-form-sub">Tell us your issue and our support team will get back to you.</p>
              <form onSubmit={submitHandler} className="aip-form" aria-busy={!!loading}>
                <fieldset className="aip-topics" disabled={loading}>
                  <legend>What is it about? <small>Optional</small></legend>
                  <div>
                    {TOPICS.map(({ id, icon: Icon }) => (
                      <button key={id} type="button" className={topic === id ? "is-on" : ""} aria-pressed={topic === id} onClick={() => setTopic(topic === id ? "" : id)}>
                        <Icon size={15} aria-hidden="true" />{id}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="aip-fields">
                  <div><label htmlFor="support-name">Full name</label><input id="support-name" name="name" autoComplete="name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} /></div>
                  <div><label htmlFor="support-email">Email address</label><input id="support-email" name="email" autoComplete="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} /></div>
                </div>
                <div className="aip-message">
                  <label htmlFor="support-message">Your message</label>
                  <textarea id="support-message" name="message" rows={6} maxLength={MAX} placeholder="Describe your issue…" value={message} onChange={(e) => setMessage(e.target.value)} required disabled={loading} aria-describedby="support-count" />
                  <span id="support-count" className="aip-count">{message.length} / {MAX}</span>
                </div>
                <div className="aip-form-foot">
                  <p><Link to="/privacy-policy">How we handle your information</Link></p>
                  <button type="submit" className="aip-btn aip-btn-dark" disabled={loading}>
                    <span>{loading ? "Submitting..." : "Submit Request"}</span>{loading ? <span className="ac-spinner" aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
};
export default Support;
