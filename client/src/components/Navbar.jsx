import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { logout } from "../actions/userActions";

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

  // ================= DASHBOARD PATH =================
  const dashboardPath = isAdmin
    ? "/admin/dashboard"
    : isTeacher
      ? "/teacher/dashboard"
      : "/dashboard";

  // ================= PROFILE PATH =================
  const profilePath = isAdmin
    ? "/admin/dashboard/profile"
    : isTeacher
      ? "/teacher/dashboard/profile"
      : "/dashboard/profile";

  // ---------------- LOGOUT ----------------
  const logoutHandler = async () => {
    await dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050607]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* LEFT */}
        <div className="flex items-center gap-10">
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
            className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          >
            Chart<span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">Wiz</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group relative text-sm font-medium text-gray-400 transition hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <Link
              to="/live"
              className="flex items-center gap-2 text-sm font-medium text-red-400 transition hover:text-red-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              LIVE
            </Link>

            {userInfo && (
              <Link
                to={profilePath}
                className="group relative text-sm font-medium text-gray-400 transition hover:text-white"
              >
                Profile
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden items-center gap-4 md:flex">
          {userInfo ? (
            <div className="flex items-center gap-4">
              {/* PROFILE */}
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                <img
                  src={
                    userInfo?.user?.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                  className="h-9 w-9 rounded-full border border-white/10 object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {userInfo?.user?.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-emerald-400">
                    {userInfo?.user?.role}
                  </span>
                </div>
              </div>

              {/* DASHBOARD */}
              <Link
                to={dashboardPath}
                className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
              >
                Dashboard
              </Link>

              {/* LOGOUT */}
              <button
                onClick={logoutHandler}
                className="cursor-pointer rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-gray-300 transition hover:border-red-500/40 hover:text-red-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/admission"
                className="text-sm font-medium text-gray-400 transition hover:text-white"
              >
                Enroll
              </Link>
              <Link
                to="/courses"
                className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
              >
                View Course
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-white md:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#050607] md:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/live"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                LIVE
              </Link>

              {userInfo ? (
                <>
                  <Link
                    to={profilePath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    Profile
                  </Link>
                  <Link
                    to={dashboardPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-black"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-gray-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/admission"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    Enroll
                  </Link>
                  <Link
                    to="/courses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-black"
                  >
                    Courses
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
