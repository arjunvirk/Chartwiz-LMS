import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createAdmission } from "../actions/admissionActions";
import { ADMISSION_CREATE_RESET } from "../constants/admissionConstants";

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
      toast.success("Admission submitted successfully!");

      dispatch({
        type: ADMISSION_CREATE_RESET,
      });

      navigate("/");
    }
  }, [success, dispatch, navigate]);

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
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold">Admission Application</h1>

          <p className="mt-3 text-gray-500">
            Apply for the next ChartWiz Academy batch. Our admission counselor
            will contact you shortly.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold">Full Name</label>

              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Email</label>

              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Phone</label>

              <input
                required
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">City</label>

              <input
                required
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Course</label>

              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              >
                <option>The Forex Program</option>

                <option>The Forex Program with Indian Market</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">Occupation</label>

              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Trading Experience
              </label>

              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              >
                <option>Beginner</option>

                <option>Intermediate</option>

                <option>Advanced</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Preferred Batch
              </label>

              <input
                type="text"
                placeholder="Morning / Evening"
                value={preferredBatch}
                onChange={(e) => setPreferredBatch(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Message (Optional)
            </label>

            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-green-500 py-4 text-lg font-bold text-black transition hover:bg-green-400"
          >
            {loading ? "Submitting..." : "Submit Admission"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already a student?{" "}
            <Link to="/login" className="font-semibold text-black">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdmissionScreen;
