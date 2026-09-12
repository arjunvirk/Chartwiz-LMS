import { useState, useEffect } from "react";
import { Mail, Phone, MessageSquare, Clock, ArrowUpRight, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSupportRequest } from "../actions/supportActions";
import { SUPPORT_CREATE_RESET } from "../constants/supportConstants";
import "./AlphiraInfoPages.css";

const Support = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const supportCreate = useSelector((state) => state.supportCreate);
  const { loading, success, error } = supportCreate;

  useEffect(() => {
    if (success) {
      toast.success("Support request submitted successfully!");

      setName("");
      setEmail("");
      setMessage("");

      dispatch({ type: SUPPORT_CREATE_RESET });
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createSupportRequest({ name, email, message }));
  };

  return (
    <main className="alphira-info-page">
      <div className="alphira-info-wrap">
        <header className="alphira-info-hero">
          <p className="alphira-info-kicker">Alphira / Support</p>
          <h1>A little help.<br /><span>A clear next step.</span></h1>
          <p>Need help with your account, courses, payments or technical issues? Our team is here to assist you.</p>
        </header>
        <div className="alphira-support-grid">
          <aside className="alphira-support-contact" aria-label="Contact options">
            <h2>Let’s talk.</h2>
            <p>Choose the way that works for you.</p>
            <a className="alphira-contact-row" href="tel:+919217222356" aria-label="Call Alphira on +91 9217222356"><Phone size={20} aria-hidden="true" /><span><small>Call our team</small><strong>+91 92172 22356</strong></span><ArrowUpRight size={18} aria-hidden="true" /></a>
            <a className="alphira-contact-row" href="mailto:contact.alphiracapital@gmail.com"><Mail size={20} aria-hidden="true" /><span><small>Email support</small><strong>contact.alphiracapital@gmail.com</strong></span><ArrowUpRight size={18} aria-hidden="true" /></a>
            <a className="alphira-contact-row" href="https://whatsapp.com/channel/0029Vb8p0Ae9xVJdzQ9Oqy1s" target="_blank" rel="noopener noreferrer"><MessageSquare size={20} aria-hidden="true" /><span><small>WhatsApp channel</small><strong>Join our official Alphira Capital channel</strong></span><ArrowUpRight size={18} aria-hidden="true" /></a>
            <div className="alphira-support-response"><Clock size={18} aria-hidden="true" /><p><strong>Within 24 hours</strong><br />Our usual response time.</p></div>
          </aside>
          <section className="alphira-support-form-panel" aria-labelledby="support-form-title">
            <p className="alphira-info-kicker">Send a message</p>
            <h2 id="support-form-title">How can we help?</h2>
            <p>Tell us your issue and our support team will get back to you.</p>
            <form onSubmit={submitHandler} className="alphira-support-form" aria-busy={!!loading}>
              <div className="alphira-support-fields">
                <div><label htmlFor="support-name">Full name</label><input id="support-name" name="name" autoComplete="name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} /></div>
                <div><label htmlFor="support-email">Email address</label><input id="support-email" name="email" autoComplete="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} /></div>
              </div>
              <div><label htmlFor="support-message">Your message</label><textarea id="support-message" name="message" rows={6} placeholder="Describe your issue…" value={message} onChange={(e) => setMessage(e.target.value)} required disabled={loading} /></div>
              <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Request"}<ArrowRight size={18} aria-hidden="true" /></button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};
export default Support;
