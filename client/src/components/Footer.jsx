import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const Footer = () => {
  return (
    <footer className="bg-obsidian text-vellum">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* BRAND */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <Link to="/" className="text-2xl font-semibold tracking-tight">
              ChartWiz
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-mist">
              Professional stock market mentorship platform helping aspiring
              traders learn price action, options trading, psychology and risk
              management.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition hover:border-ember-orange hover:bg-ember-orange hover:text-black"
                >
                  <Icon size={16} />
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
            <h3 className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-mist">
              Quick Links
            </h3>
            <div className="mt-6 flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-mist transition hover:text-ember-orange"
                >
                  {link.label}
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
            <h3 className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-mist">
              Popular Courses
            </h3>
            <div className="mt-6 flex flex-col gap-3">
              {COURSES.map((course) => (
                <p
                  key={course}
                  className="text-sm text-mist transition hover:text-ember-orange"
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
            <h3 className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-mist">
              Contact
            </h3>
            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 text-ember-orange" />
                <p className="text-sm text-mist">chartwizacademy@gmail.com</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={15} className="mt-0.5 text-ember-orange" />
                <p className="text-sm text-mist">+91 9217222356</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 text-ember-orange" />
                <p className="text-sm leading-relaxed text-mist">
                  Plot No. 38, First Floor Pocket 20 Sector - 24
                  <br />
                  Rohini-110085, Delhi, India
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="my-14 h-px bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <p className="text-center text-xs text-mist lg:text-left">
            © {new Date().getFullYear()} ChartWiz Academy. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-mist">
            <Link to="/privacy-policy" className="hover:text-ember-orange">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-ember-orange">
              Terms & Conditions
            </Link>
            <Link to="/support" className="hover:text-ember-orange">
              Support
            </Link>
            <span className="text-white/20">|</span>
            <Link
              to="/login"
              className="font-mono font-medium text-ember-orange"
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
