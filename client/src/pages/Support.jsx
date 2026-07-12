import { useState, useEffect } from "react";
import { Mail, Phone, MessageSquare, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { createSupportRequest } from "../actions/supportActions";
import { SUPPORT_CREATE_RESET } from "../constants/supportConstants";

const INFO_CARDS = [
  { icon: Mail, title: "Email Support", value: "support@chartwizacademy.com" },
  { icon: Phone, title: "Call Us", value: "+91 XXXXX XXXXX" },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    value: "Quick responses from our team",
  },
  { icon: Clock, title: "Response Time", value: "Within 24 Hours" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

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

  const inputClass =
    "w-full rounded-xl border border-pebble bg-vellum px-5 py-3.5 text-sm outline-none transition focus:border-obsidian";

  return (
    <div className="min-h-screen bg-vellum px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
            We're Here to Help
          </span>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-graphite md:text-5xl">
            Support Center
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate">
            Need help with your account, courses, payments or technical issues?
            Our team is here to assist you.
          </p>
        </motion.div>

        {/* INFO CARDS */}
        <div className="mt-14 grid gap-3 md:grid-cols-4">
          {INFO_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="rounded-2xl bg-bone p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-obsidian text-vellum">
                <card.icon size={20} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-graphite">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-slate">{card.value}</p>
            </motion.div>
          ))}
        </div>

        {/* CONTACT FORM */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 rounded-3xl bg-bone p-10"
        >
          <h2 className="font-serif text-3xl leading-tight text-graphite">
            Submit a Support Request
          </h2>
          <p className="mt-2 text-sm text-slate">
            Tell us your issue and our support team will get back to you.
          </p>

          <form onSubmit={submitHandler} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Message
              </label>
              <textarea
                rows="6"
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={loading}
                className={`resize-none ${inputClass}`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-[600px] bg-ember-orange px-8 py-3.5 font-mono text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;
