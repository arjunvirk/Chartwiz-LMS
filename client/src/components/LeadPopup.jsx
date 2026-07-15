import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../config/api";
import { trackLead } from "../utils/metaPixel";

const LeadPopup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("The Forex Program");

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") || "Website";
  const utmMedium = params.get("utm_medium") || "";
  const utmCampaign = params.get("utm_campaign") || "";
  const utmContent = params.get("utm_content") || "";
  const referrer = document.referrer || "";

  // OPEN AFTER 4 SECONDS
  useEffect(() => {
    const popupShown = localStorage.getItem("leadPopupShown");
    if (popupShown) return;

    const timer = setTimeout(() => {
      setOpen(true);
      localStorage.setItem("leadPopupShown", "true");

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          course,
          source: utmSource,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          referrer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message, { duration: 3000 });

      trackLead();

      setOpen(false);
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!open) return null;

  const inputClass =
    "w-full rounded-xl border border-pebble bg-vellum px-5 py-3.5 text-sm outline-none transition focus:border-obsidian";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-bone p-8">
        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-5 top-5 text-2xl font-medium text-slate transition hover:text-graphite"
        >
          ×
        </button>

        {/* HEADER */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-obsidian text-3xl">
            📈
          </div>

          <h2 className="mt-6 font-serif text-3xl leading-tight text-graphite">
            Want to become a profitable trader?
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate">
            Learn Forex, Stock Market, Risk Management and Professional Trading
            Strategies from expert mentors.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={submitHandler} className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className={inputClass}
          >
            <option>The Forex Program</option>
            <option>The Forex Program with Indian Market</option>
          </select>

          <button
            type="submit"
            className="w-full rounded-[600px] bg-ember-orange py-3.5 font-mono text-sm font-semibold text-black transition hover:brightness-95"
          >
            Yes, I Want To Learn
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadPopup;
