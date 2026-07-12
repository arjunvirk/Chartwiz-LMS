import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";

const STEPS = [
  "Our admissions team reviews your application.",
  "You will receive a phone call from ChartWiz Academy.",
  "Payment instructions will be shared with you.",
  "After payment confirmation, your student account will be created.",
  "Your login credentials will be sent to your registered email.",
];

const Step = ({ number, text }) => (
  <div className="flex items-start gap-4">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ember-orange font-mono text-sm font-semibold text-black">
      {number}
    </div>
    <p className="pt-1.5 text-sm leading-relaxed text-graphite">{text}</p>
  </div>
);

const AdmissionSuccessScreen = () => {
  return (
    <div className="min-h-screen bg-vellum px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-bone p-10"
        >
          {/* ICON */}
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ember-orange/15">
              <CheckCircle2 className="h-11 w-11 text-ember-orange" />
            </div>
          </div>

          {/* TITLE */}
          <h1 className="mt-8 text-center font-serif text-4xl leading-tight text-graphite">
            Admission Submitted Successfully
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-slate">
            Thank you for applying to{" "}
            <span className="font-semibold text-graphite">
              ChartWiz Academy
            </span>
            .
            <br />
            Your admission request has been received successfully.
          </p>

          {/* TIMELINE */}
          <div className="mt-12 rounded-2xl bg-vellum p-8">
            <h2 className="mb-8 text-center text-xl font-semibold text-graphite">
              What Happens Next?
            </h2>

            <div className="space-y-6">
              {STEPS.map((text, i) => (
                <Step key={i} number={i + 1} text={text} />
              ))}
            </div>
          </div>

          {/* NOTICE */}
          <div className="mt-8 rounded-2xl border border-ember-orange/25 bg-ember-orange/5 p-6">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[-0.02em] text-ember-orange">
              Important Notice
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite">
              Please keep checking your email inbox (and Spam folder). Once your
              admission is approved and payment is confirmed, you will
              automatically receive your Student Portal login credentials.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="flex flex-1 items-center justify-center gap-2 rounded-pill bg-obsidian px-6 py-3.5 font-mono text-sm font-semibold text-vellum transition hover:bg-ember-orange hover:text-black"
            >
              <Home size={18} />
              Back to Home
            </Link>

            <Link
              to="/courses"
              className="flex flex-1 items-center justify-center gap-2 rounded-pill border border-pebble px-6 py-3.5 font-mono text-sm font-semibold text-graphite transition hover:bg-vellum"
            >
              Browse Courses
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdmissionSuccessScreen;
