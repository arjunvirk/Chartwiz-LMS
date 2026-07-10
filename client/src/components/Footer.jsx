import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/admission", label: "Apply For Admission" },
];

const COURSES = ["The Forex Program", "The Forex Program with Indian Market"];

const SOCIALS = [
  { icon: FaInstagram, href: "#" },
  { icon: FaYoutube, href: "#" },
  { icon: FaXTwitter, href: "#" },
];

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    content: <p className="mt-1 text-gray-300">chartwizacademy@gmail.com</p>,
  },
  {
    icon: Phone,
    label: "Phone",
    content: <p className="mt-1 text-gray-300">+91 9217222356</p>,
  },
  {
    icon: MapPin,
    label: "Office Address",
    content: (
      <>
        <p className="mt-1 text-gray-300">
          ChartWiz Academy
          <br />
          Plot No. 38, First Floor Pocket 20 Sector - 24 Rohini-110085
          <br />
          Delhi, India
        </p>
        <p className="mt-3 font-mono text-xs text-gray-500">
          MON – FRI · 11:00 AM – 6:00 PM
        </p>
      </>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050607] text-white">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        {/* TOP GRID */}
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* BRAND */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <Link
              to="/"
              className="font-display text-3xl font-extrabold tracking-tight"
            >
              Chart
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                Wiz
              </span>
            </Link>

            <p className="mt-6 max-w-md leading-relaxed text-gray-400">
              Professional stock market mentorship platform helping aspiring
              traders learn price action, options trading, psychology and risk
              management through structured premium education.
            </p>

            {/* SOCIALS */}
            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-emerald-500/40 hover:bg-emerald-500 hover:text-black"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
          >
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Quick Links
            </h3>

            <div className="mt-7 flex flex-col gap-4">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex w-fit items-center gap-1 text-gray-400 transition hover:text-emerald-400"
                >
                  {link.label}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* COURSES */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
          >
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Popular Courses
            </h3>

            <div className="mt-7 flex flex-col gap-4">
              {COURSES.map((course) => (
                <p
                  key={course}
                  className="text-gray-400 transition hover:text-emerald-400"
                >
                  {course}
                </p>
              ))}
            </div>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={3}
          >
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Contact
            </h3>

            <div className="mt-7 space-y-6">
              {CONTACT_ITEMS.map(({ icon: Icon, label, content }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Icon size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    {content}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* DIVIDER */}
        <div className="my-14 h-px bg-white/10" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <p className="text-center text-sm text-gray-500 lg:text-left">
            © {new Date().getFullYear()} ChartWiz Academy. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <Link
              to="/privacy-policy"
              className="transition hover:text-emerald-400"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="transition hover:text-emerald-400"
            >
              Terms & Conditions
            </Link>
            <Link to="/support" className="transition hover:text-emerald-400">
              Support
            </Link>

            <span className="text-gray-700">|</span>

            <Link
              to="/login"
              className="font-semibold text-emerald-400 transition hover:text-emerald-300"
            >
              Student & Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
