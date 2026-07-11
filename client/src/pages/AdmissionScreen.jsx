import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createAdmission } from "../actions/admissionActions";
import { ADMISSION_CREATE_RESET } from "../constants/admissionConstants";

const inputClass =
  "w-full rounded-xl border border-pebble px-4 py-3 text-sm outline-none transition focus:border-obsidian";

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
    <div className="min-h-screen bg-vellum py-16">
      <div className="mx-auto max-w-3xl rounded-3xl bg-bone p-10 mt-15">
        <div className="mb-10 text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
            Apply Now
          </span>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-graphite">
            Admission Application
          </h1>
          <p className="mt-3 text-sm text-slate">
            Apply for the next ChartWiz Academy batch. Our admission counselor
            will contact you shortly.
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-graphite">
                Full Name
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-graphite">
                Email
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-graphite">
                Phone
              </label>
              <input
                required
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-graphite">
                City
              </label>
              <input
                required
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-graphite">
                Course
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className={inputClass}
              >
                <option>The Forex Program</option>
                <option>The Forex Program with Indian Market</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-graphite">
                Occupation
              </label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-graphite">
                Trading Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className={inputClass}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-graphite">
                Preferred Batch
              </label>
              <input
                type="text"
                placeholder="Morning / Evening"
                value={preferredBatch}
                onChange={(e) => setPreferredBatch(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-graphite">
              Message (Optional)
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-[600px] bg-ember-orange py-4 font-mono text-sm font-semibold text-black transition hover:brightness-95 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Admission"}
          </button>

          <p className="text-center text-sm text-slate">
            Already a student?{" "}
            <Link to="/login" className="font-semibold text-graphite underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdmissionScreen;
