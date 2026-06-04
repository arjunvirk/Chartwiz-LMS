import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { API_URL } from "../config/api";

const LeadPopup = () => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  // OPEN AFTER 4 SECONDS

  useEffect(() => {
    const popupShown = localStorage.getItem("leadPopupShown");

    // ALREADY SHOWN

    if (popupShown) return;

    // SHOW AFTER 4 SECONDS

    const timer = setTimeout(() => {
      setOpen(true);

      // SAVE FLAG

      localStorage.setItem("leadPopupShown", "true");

      // REMOVE AFTER 24 HOURS

      setTimeout(
        () => {
          localStorage.removeItem("leadPopupShown");
        },
        24 * 60 * 60 * 1000,
      );
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  // SUBMIT

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message, {
        duration: 3000,
      });

      setOpen(false);

      setName("");

      setPhone("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-4xl bg-white p-8 shadow-2xl">
        {/* CLOSE */}

        <button
          onClick={() => setOpen(false)}
          className="absolute right-5 top-5 text-2xl font-bold text-gray-400 transition hover:text-black"
        >
          ×
        </button>

        {/* HEADER */}

        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-4xl text-white">
            📈
          </div>

          <h2 className="mt-6 text-4xl font-extrabold text-black">
            Want To Become A Profitable Trader?
          </h2>

          <p className="mt-4 text-gray-500">
            Learn Forex, Stock Market, Risk Management and Professional Trading
            Strategies from expert mentors.
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={submitHandler} className="mt-8 space-y-5">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
          />

          <input
            type="text"
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-green-500 py-4 text-sm font-bold text-black transition hover:bg-green-400"
          >
            Yes, I Want To Learn
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadPopup;
