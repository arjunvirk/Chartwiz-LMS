import "./AdmissionScreen.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Pencil, Phone, LogIn } from "lucide-react";

import { createAdmission } from "../actions/admissionActions";
import { ADMISSION_CREATE_RESET } from "../constants/admissionConstants";
import { courseArtProps } from "../config/courseArt";
import useUltrawideCanvas from "../hooks/useUltrawideCanvas";

import { trackCompleteRegistration } from "../utils/metaPixel";

const inputClass = "alphira-admission-input";
const COURSES = [
  { name: "The Forex Program", short: "Forex", meta: "2 months · Classroom" },
  { name: "The Forex Program with Indian Market", short: "Forex + Indian market", meta: "3 months · Classroom" },
  { name: "Advanced Order Flow Program", short: "Order flow", meta: "Advanced · Classroom" },
  { name: "Crypto Futures & Spot Trading Program", short: "Crypto", meta: "3 months · Classroom" },
];
const EXPERIENCE = ["Beginner", "Intermediate", "Advanced"];
const BATCH_PICKS = ["Morning", "Evening", "Weekend"];
const STEPS = [
  { title: "Your details", hint: "So our team can reach you." },
  { title: "Learning preferences", hint: "Program, experience and batch." },
  { title: "Review & submit", hint: "Check everything once." },
];

const AdmissionScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useUltrawideCanvas();

  const admissionCreate = useSelector((state) => state.admissionCreate);
  const { loading, success, error } = admissionCreate;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [searchParams] = useSearchParams();
  const [course, setCourse] = useState(() => {
    const selected = searchParams.get("course");
    return ["The Forex Program", "The Forex Program with Indian Market", "Advanced Order Flow Program", "Crypto Futures & Spot Trading Program"].includes(selected) ? selected : "The Forex Program";
  });
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [experience, setExperience] = useState("Beginner");
  const [preferredBatch, setPreferredBatch] = useState("");
  const [message, setMessage] = useState("");

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const stepRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    if (success) {
      trackCompleteRegistration(course);

      toast.success("Admission submitted successfully", { duration: 3000 });

      dispatch({ type: ADMISSION_CREATE_RESET });

      navigate("/admission/success", { replace: true });
    }

    if (error) {
      toast.error(error, { duration: 3000 });
      dispatch({ type: ADMISSION_CREATE_RESET });
    }
  }, [success, error, dispatch, navigate]);

  // Move focus to the step heading when the step changes (keyboard & screen-reader friendly).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    headingRef.current?.focus({ preventScroll: true });
    const top = headingRef.current?.closest("form")?.getBoundingClientRect().top;
    if (top != null && top < 80) window.scrollBy({ top: top - 110, behavior: "smooth" });
  }, [step]);

  const validStep = () => {
    const fields = stepRef.current ? [...stepRef.current.querySelectorAll("input, select, textarea")] : [];
    const bad = fields.find((f) => !f.checkValidity());
    if (bad) { bad.reportValidity(); return false; }
    return true;
  };
  const goTo = (n) => { setDir(n > step ? 1 : -1); setStep(n); };
  const next = () => { if (validStep()) goTo(Math.min(step + 1, STEPS.length - 1)); };

  const submitHandler = (e) => {
    e.preventDefault();
    if (loading) return;
    if (step < STEPS.length - 1) { next(); return; }

    dispatch(
      createAdmission({
        name,
        email,
        phone,
        course,
        city,
        occupation,
        experience,
        preferredBatch,
        message,
      }),
    );
  };

  const selected = COURSES.find((c) => c.name === course) || COURSES[0];
  const review = [
    { step: 0, rows: [["Full name", name], ["Email", email], ["Phone", phone], ["City", city], ["Occupation", occupation || "—"]] },
    { step: 1, rows: [["Program", course], ["Experience", experience], ["Preferred batch", preferredBatch || "—"], ["Message", message || "—"]] },
  ];

  return (
    <main className="aad">
      <div className="aad-shell aad-layout">
        {/* ---------- Side panel ---------- */}
        <aside className="aad-side">
          <div className="aad-side-inner">
            <Link to="/courses" className="aad-back"><ArrowLeft size={15} aria-hidden="true" />Explore our programs</Link>
            <p className="aad-kicker"><span aria-hidden="true" />Alphira Capital · Admissions</p>
            <h1>Your next chapter.<br /><span>Starts with you.</span></h1>
            <p className="aad-lede">Apply for the next Alphira Capital batch. Our admission counselor will contact you shortly.</p>

            <figure className="aad-program" aria-live="polite">
              <div className="aad-program-art">
                <img key={course} {...courseArtProps(course, "(max-width: 1000px) 100vw, 34vw")} alt="" />
              </div>
              <figcaption><span>You’re applying for</span><strong>{selected.name}</strong><small>{selected.meta}</small></figcaption>
            </figure>

            <ol className="aad-track" aria-label="Application progress">
              {STEPS.map((s, i) => (
                <li key={s.title} className={i === step ? "is-active" : i < step ? "is-done" : ""} aria-current={i === step ? "step" : undefined}>
                  <span className="aad-track-dot" aria-hidden="true">{i < step ? <Check size={13} strokeWidth={3} /> : `0${i + 1}`}</span>
                  <span><strong>{s.title}</strong><small>{s.hint}</small></span>
                </li>
              ))}
            </ol>

            <div className="aad-side-foot">
              <a href="tel:+919217222356"><Phone size={15} aria-hidden="true" />Have a question? +91 92172 22356</a>
              <Link to="/login"><LogIn size={15} aria-hidden="true" />Already a student? Login</Link>
            </div>
          </div>
        </aside>

        {/* ---------- Form ---------- */}
        <form onSubmit={submitHandler} className="aad-form" aria-busy={!!loading} noValidate={false}>
          <div className="aad-form-top">
            <span className="aad-form-label">Enrollment application</span>
            <span className="aad-form-count" aria-hidden="true">Step {step + 1} of {STEPS.length}</span>
          </div>
          <div className="aad-progress" aria-hidden="true"><i style={{ transform: `scaleX(${(step + 1) / STEPS.length})` }} /></div>

          <div key={step} ref={stepRef} className={`aad-step ${dir > 0 ? "is-fwd" : "is-back"}`}>
            <h2 ref={headingRef} tabIndex={-1}>{["Let’s get to know you.", "How would you like to learn?", "Review your application."][step]}</h2>
            <p className="aad-step-sub">{["A few details to help us guide your next step.", "Choose a program and tell us about your experience.", "Make sure everything looks right, then submit."][step]}</p>

            {step === 0 && (
              <fieldset disabled={!!loading}>
                <legend className="aad-sr">Your details</legend>
                <div className="aad-fields">
                  <div><label htmlFor="admission-name">Full name <span>*</span></label><input id="admission-name" name="name" autoComplete="name" required type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Your full name" /></div>
                  <div><label htmlFor="admission-email">Email <span>*</span></label><input id="admission-email" name="email" autoComplete="email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" /></div>
                  <div><label htmlFor="admission-phone">Phone <span>*</span></label><input id="admission-phone" name="phone" autoComplete="tel" inputMode="tel" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+91" /></div>
                  <div><label htmlFor="admission-city">City <span>*</span></label><input id="admission-city" name="city" autoComplete="address-level2" required type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} placeholder="e.g. New Delhi" /></div>
                  <div className="aad-full"><label htmlFor="admission-occupation">Occupation <small>Optional</small></label><input id="admission-occupation" name="occupation" type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} className={inputClass} placeholder="Student, professional, business owner…" /></div>
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset disabled={!!loading}>
                <legend className="aad-sr">Your learning preferences</legend>
                <div className="aad-group" role="radiogroup" aria-labelledby="aad-course-label">
                  <p id="aad-course-label" className="aad-group-label">Program</p>
                  <div className="aad-courses">
                    {COURSES.map((c) => (
                      <label key={c.name} className={`aad-course${course === c.name ? " is-checked" : ""}`}>
                        <input type="radio" name="course" value={c.name} checked={course === c.name} onChange={(e) => setCourse(e.target.value)} />
                        <span className="aad-course-art" aria-hidden="true"><img {...courseArtProps(c.name, "160px")} alt="" loading="lazy" /></span>
                        <span className="aad-course-text"><strong>{c.short}</strong><small>{c.meta}</small></span>
                        <span className="aad-course-check" aria-hidden="true"><Check size={13} strokeWidth={3} /></span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="aad-group" role="radiogroup" aria-labelledby="aad-exp-label">
                  <p id="aad-exp-label" className="aad-group-label">Trading experience</p>
                  <div className="aad-segments">
                    {EXPERIENCE.map((x) => (
                      <label key={x} className={experience === x ? "is-checked" : ""}>
                        <input type="radio" name="experience" value={x} checked={experience === x} onChange={(e) => setExperience(e.target.value)} />{x}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="aad-fields">
                  <div className="aad-full">
                    <label htmlFor="admission-batch">Preferred batch <small>Optional</small></label>
                    <input id="admission-batch" name="preferredBatch" type="text" placeholder="Morning / Evening" value={preferredBatch} onChange={(e) => setPreferredBatch(e.target.value)} className={inputClass} />
                    <div className="aad-picks" aria-label="Quick picks">
                      {BATCH_PICKS.map((b) => <button key={b} type="button" className={preferredBatch === b ? "is-on" : ""} onClick={() => setPreferredBatch(preferredBatch === b ? "" : b)} aria-pressed={preferredBatch === b}>{b}</button>)}
                    </div>
                  </div>
                  <div className="aad-full"><label htmlFor="admission-message">Message <small>Optional</small></label><textarea id="admission-message" name="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={inputClass} placeholder="Anything you’d like our team to know" /></div>
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <div className="aad-review">
                {review.map((block) => (
                  <section key={block.step} className="aad-review-block" aria-label={STEPS[block.step].title}>
                    <div className="aad-review-head"><strong>{STEPS[block.step].title}</strong><button type="button" onClick={() => goTo(block.step)} disabled={!!loading}><Pencil size={13} aria-hidden="true" />Edit</button></div>
                    <dl>{block.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                  </section>
                ))}
              </div>
            )}
          </div>

          <div className="aad-nav">
            {step > 0 ? (
              <button type="button" className="aad-btn aad-btn-ghost" onClick={() => goTo(step - 1)} disabled={!!loading}><ArrowLeft size={16} aria-hidden="true" />Back</button>
            ) : <p className="aad-note">* Required fields</p>}
            {step < STEPS.length - 1 ? (
              <button type="submit" className="aad-btn aad-btn-dark"><span>Continue</span><ArrowRight size={17} aria-hidden="true" /></button>
            ) : (
              <button type="submit" className="aad-btn aad-btn-dark aad-btn-submit" disabled={loading}><span>{loading ? "Submitting..." : "Submit Admission"}</span>{loading ? <span className="ac-spinner" aria-hidden="true" /> : <ArrowUpRight size={17} aria-hidden="true" />}</button>
            )}
          </div>
          <p className="aad-privacy"><Link to="/privacy-policy">How we handle your information</Link></p>
        </form>
      </div>
    </main>
  );
};
export default AdmissionScreen;
