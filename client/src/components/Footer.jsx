import { Link } from "react-router-dom";

import { Mail, Phone, MapPin } from "lucide-react";

import { FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* BACKGROUND GLOW */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        {/* TOP GRID */}

        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* BRAND */}

          <div>
            <Link to="/" className="text-4xl font-extrabold tracking-tight">
              ChartWiz
            </Link>

            <p className="mt-6 max-w-md leading-relaxed text-gray-400">
              Professional stock market mentorship platform helping aspiring
              traders learn price action, options trading, psychology and risk
              management through structured premium education.
            </p>

            {/* SOCIALS */}

            <div className="mt-8 flex items-center gap-4">
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:border-green-500 hover:bg-green-500 hover:text-black"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:border-green-500 hover:bg-green-500 hover:text-black"
              >
                <FaYoutube size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:border-green-500 hover:bg-green-500 hover:text-black"
              >
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}

          <div>
            <h3 className="text-2xl font-bold">Quick Links</h3>

            <div className="mt-8 flex flex-col gap-4">
              <Link
                to="/"
                className="text-gray-400 transition hover:text-green-400"
              >
                Home
              </Link>

              <Link
                to="/courses"
                className="text-gray-400 transition hover:text-green-400"
              >
                Courses
              </Link>

              <Link
                to="/login"
                className="text-gray-400 transition hover:text-green-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-gray-400 transition hover:text-green-400"
              >
                Register
              </Link>
            </div>
          </div>

          {/* COURSES */}

          <div>
            <h3 className="text-2xl font-bold">Popular Courses</h3>

            <div className="mt-8 flex flex-col gap-4">
              <p className="text-gray-400 transition hover:text-green-400">
                Price Action Mastery
              </p>

              <p className="text-gray-400 transition hover:text-green-400">
                Options Trading
              </p>

              <p className="text-gray-400 transition hover:text-green-400">
                Trading Psychology
              </p>

              <p className="text-gray-400 transition hover:text-green-400">
                Risk Management
              </p>
            </div>
          </div>

          {/* CONTACT */}

          <div>
            <h3 className="text-2xl font-bold">Contact</h3>

            <div className="mt-8 space-y-6">
              {/* EMAIL */}

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>

                  <p className="mt-1 text-gray-300">
                    chartwizacademy@gmail.com
                  </p>
                </div>
              </div>

              {/* PHONE */}

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>

                  <p className="mt-1 text-gray-300">+91 9217222356</p>
                </div>
              </div>

              {/* LOCATION */}

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Office Address</p>

                  <p className="mt-1 text-gray-300">
                    ChartWiz Academy
                    <br />
                    Plot No. 38 , First Floor Pocket 20 Sector - 24
                    Rohini-110085
                    <br />
                    Delhi, India
                  </p>

                  <p className="mt-3 text-sm text-gray-500">
                    Mon - Fri | 11:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}

        <div className="my-14 h-px bg-white/10"></div>

        {/* BOTTOM */}

        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <p className="text-center text-sm text-gray-500 lg:text-left">
            © {new Date().getFullYear()} ChartWiz Academy. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <Link
              to="/privacy-policy"
              className="transition hover:text-green-400"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-conditions"
              className="transition hover:text-green-400"
            >
              Terms & Conditions
            </Link>

            <Link to="/support" className="transition hover:text-green-400">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;