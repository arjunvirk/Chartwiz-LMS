import { useState, useEffect } from "react";
import { Mail, Phone, MessageSquare, Clock } from "lucide-react";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";

import { createSupportRequest } from "../actions/supportActions";

import { SUPPORT_CREATE_RESET } from "../constants/supportConstants";

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

      dispatch({
        type: SUPPORT_CREATE_RESET,
      });
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createSupportRequest({
        name,
        email,
        message,
      }),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-black">Support Center</h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Need help with your account, courses, payments or technical issues?
            Our team is here to assist you.
          </p>
        </div>

        {/* INFO CARDS */}

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <Mail className="mb-4 text-green-500" size={35} />

            <h3 className="text-xl font-bold">Email Support</h3>

            <p className="mt-3 text-gray-500">support@chartwizacademy.com</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <Phone className="mb-4 text-green-500" size={35} />

            <h3 className="text-xl font-bold">Call Us</h3>

            <p className="mt-3 text-gray-500">+91 XXXXX XXXXX</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <MessageSquare className="mb-4 text-green-500" size={35} />

            <h3 className="text-xl font-bold">WhatsApp</h3>

            <p className="mt-3 text-gray-500">Quick responses from our team</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <Clock className="mb-4 text-green-500" size={35} />

            <h3 className="text-xl font-bold">Response Time</h3>

            <p className="mt-3 text-gray-500">Within 24 Hours</p>
          </div>
        </div>

        {/* CONTACT FORM */}

        <div className="mt-16 rounded-4xl bg-white p-10 shadow-sm">
          <h2 className="text-3xl font-bold text-black">
            Submit a Support Request
          </h2>

          <p className="mt-2 text-gray-500">
            Tell us your issue and our support team will get back to you.
          </p>

          <form onSubmit={submitHandler} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Message
              </label>

              <textarea
                rows="6"
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={loading}
                className="w-full resize-none rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-green-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
