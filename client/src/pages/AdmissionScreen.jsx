import "./AdmissionScreen.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createAdmission } from "../actions/admissionActions";
import { ADMISSION_CREATE_RESET } from "../constants/admissionConstants";

import { trackCompleteRegistration } from "../utils/metaPixel";

const inputClass = "alphira-admission-input";

const AdmissionScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admissionCreate = useSelector((state) => state.admissionCreate);
  const { loading, success, error } = admissionCreate;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("The Forex Program");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [experience, setExperience] = useState("Beginner");
  const [preferredBatch, setPreferredBatch] = useState("");
  const [message, setMessage] = useState("");

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

  const submitHandler = (e) => {
    e.preventDefault();

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

  return (
    <main className="alphira-admission-page">
      <div className="alphira-admission-layout">
        <header className="alphira-admission-intro">
          <p className="alphira-admission-eyebrow">Apply Now</p>
          <h1>Admission<br /><span>Application.</span></h1>
          <p className="alphira-admission-description">Apply for the next Alphira Capital batch. Our admission counselor will contact you shortly.</p>
          <div className="alphira-admission-note"><span aria-hidden="true">↗</span><p>Already a student?<br /><Link to="/login">Login here</Link></p></div>
        </header>
        <form onSubmit={submitHandler} className="alphira-admission-form" aria-busy={!!loading}>
          <fieldset><legend><span>01</span> Your details</legend><div className="alphira-admission-fields">
            <div><label htmlFor="admission-name">Full Name <span>*</span></label><input id="admission-name" name="name" autoComplete="name" required type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} /></div>
            <div><label htmlFor="admission-email">Email <span>*</span></label><input id="admission-email" name="email" autoComplete="email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} /></div>
            <div><label htmlFor="admission-phone">Phone <span>*</span></label><input id="admission-phone" name="phone" autoComplete="tel" inputMode="tel" required type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} /></div>
            <div><label htmlFor="admission-city">City <span>*</span></label><input id="admission-city" name="city" autoComplete="address-level2" required type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} /></div>
            <div className="alphira-admission-full"><label htmlFor="admission-occupation">Occupation <small>Optional</small></label><input id="admission-occupation" name="occupation" type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} className={inputClass} /></div>
          </div></fieldset>
          <fieldset><legend><span>02</span> Your learning preferences</legend><div className="alphira-admission-fields">
            <div className="alphira-admission-full"><label htmlFor="admission-course">Course</label><select id="admission-course" name="course" value={course} onChange={(e) => setCourse(e.target.value)} className={inputClass}><option>The Forex Program</option><option>The Forex Program with Indian Market</option></select></div>
            <div><label htmlFor="admission-experience">Trading Experience</label><select id="admission-experience" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} className={inputClass}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
            <div><label htmlFor="admission-batch">Preferred Batch <small>Optional</small></label><input id="admission-batch" name="preferredBatch" type="text" placeholder="Morning / Evening" value={preferredBatch} onChange={(e) => setPreferredBatch(e.target.value)} className={inputClass} /></div>
            <div className="alphira-admission-full"><label htmlFor="admission-message">Message <small>Optional</small></label><textarea id="admission-message" name="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={inputClass} /></div>
          </div></fieldset>
          <div className="alphira-admission-submit-row"><p>* Required fields</p><button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Admission"}<span aria-hidden="true">↗</span></button></div>
        </form>
      </div>
    </main>
  );
};
export default AdmissionScreen;
