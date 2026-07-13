import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { logout } from "../actions/userActions";
import logo from "../assets/chartwiz_logo.png";

const NAV_LINKS = [
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
  { to: "/live-courses", label: "Live Classes" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const isTeacher = userInfo?.user?.role === "teacher";
  const isAdmin = userInfo?.user?.role === "admin";

  const dashboardPath = isAdmin
    ? "/admin/dashboard"
    : isTeacher
      ? "/teacher/dashboard"
      : "/dashboard";

  const profilePath = isAdmin
    ? "/admin/dashboard/profile"
    : isTeacher
      ? "/teacher/dashboard/profile"
      : "/dashboard/profile";

  const logoutHandler = async () => {
    await dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-obsidian">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-2">
        {/* LOGO */}
        <Link
          to={
            userInfo
              ? userInfo?.user?.role === "admin"
                ? "/admin/dashboard"
                : userInfo?.user?.role === "teacher"
                  ? "/teacher/dashboard"
                  : "/dashboard"
              : "/"
          }
          className="text-xl font-semibold tracking-tight text-vellum py-5"
        >
          Chartwiz
        </Link>

        {/* CENTER STATUS LABELS */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-mono text-xs uppercase tracking-[-0.02em] text-mist transition hover:text-vellum"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/live"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[-0.02em] text-ember-orange"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ember-orange" />
            Live
          </Link>
          {userInfo && (
            <Link
              to={profilePath}
              className="font-mono text-xs uppercase tracking-[-0.02em] text-mist transition hover:text-vellum"
            >
              Profile
            </Link>
          )}
        </div>

        {/* RIGHT */}
        <div className="hidden items-center gap-3 md:flex">
          {userInfo ? (
            <>
              <Link
                to={dashboardPath}
                className="rounded-[600px] bg-ember-orange px-5 py-2 font-mono text-xs font-medium text-black transition hover:brightness-95"
              >
                Dashboard
              </Link>
              <button
                onClick={logoutHandler}
                className="rounded-[600px] border border-white/15 px-5 py-2 font-mono text-xs font-medium text-vellum transition hover:border-white/30"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/admission"
                className="font-mono text-xs uppercase tracking-[-0.02em] text-mist transition hover:text-vellum"
              >
                Enroll
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-[600px] bg-ember-orange px-5 py-2 font-mono text-xs font-medium text-black transition hover:brightness-95"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-vellum md:hidden"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-obsidian md:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 font-mono text-xs uppercase tracking-[-0.02em] text-mist hover:bg-white/5 hover:text-vellum"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/live"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-mono text-xs uppercase tracking-[-0.02em] text-ember-orange"
              >
                Live
              </Link>
              {userInfo ? (
                <>
                  <Link
                    to={profilePath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-4 py-3 font-mono text-xs uppercase tracking-[-0.02em] text-mist"
                  >
                    Profile
                  </Link>
                  <Link
                    to={dashboardPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-[600px] bg-ember-orange px-4 py-3 text-center font-mono text-xs font-medium text-black"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="rounded-[600px] border border-white/15 px-4 py-3 font-mono text-xs font-medium text-vellum"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/admission"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-4 py-3 font-mono text-xs uppercase tracking-[-0.02em] text-mist"
                  >
                    Enroll
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-[600px] bg-ember-orange px-4 py-3 text-center font-mono text-xs font-medium text-black"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
