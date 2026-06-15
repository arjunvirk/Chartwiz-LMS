import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";

import { Menu, X } from "lucide-react";

import { logout } from "../actions/userActions";

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

  const logoutHandler = () => {
    dispatch(logout());

    navigate("/");

    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* LEFT */}

        <div className="flex items-center gap-10">
          {/* LOGO */}

          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-black sm:text-3xl"
          >
            ChartWiz
          </Link>

          {/* DESKTOP NAV */}

          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/courses"
              className="text-sm font-semibold text-gray-700 transition hover:text-black"
            >
              Courses
            </Link>

            <Link
              to="/about"
              className="text-sm font-semibold text-gray-700 transition hover:text-black"
            >
              About
            </Link>

            <Link
              to="/live-courses"
              className="text-sm font-semibold text-gray-700 transition hover:text-black"
            >
              Live Classes
            </Link>

            <Link
              to="/live"
              className="flex items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-400"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
              LIVE
            </Link>

            {userInfo && (
              <Link
                to={profilePath}
                className="text-sm font-semibold text-gray-700 transition hover:text-black"
              >
                Profile
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT */}

        <div className="hidden items-center gap-4 md:flex">
          {userInfo ? (
            <div className="flex items-center gap-4">
              {/* PROFILE */}

              <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
                <img
                  src={
                    userInfo?.user?.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                  className="h-10 w-10 rounded-full border object-cover"
                />

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">
                    {userInfo?.user?.name}
                  </span>

                  <span className="text-xs capitalize text-gray-500">
                    {userInfo?.user?.role}
                  </span>
                </div>
              </div>

              {/* DASHBOARD */}

              <Link
                to={dashboardPath}
                className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Dashboard
              </Link>

              {/* LOGOUT */}

              <button
                onClick={logoutHandler}
                className="cursor-pointer rounded-xl border border-red-500 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-700 transition hover:text-black"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 md:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}

      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {/* COURSES */}

            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Courses
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              About
            </Link>

            <Link
              to="/live-courses"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Live Classes
            </Link>

            {/* LIVE */}

            <Link
              to="/live"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
              LIVE
            </Link>

            {userInfo ? (
              <>
                {/* PROFILE */}

                <Link
                  to="/dashboard/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Profile
                </Link>

                {/* DASHBOARD */}

                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-black px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Dashboard
                </Link>

                {/* LOGOUT */}

                <button
                  onClick={logoutHandler}
                  className="rounded-xl border border-red-500 px-4 py-3 text-sm font-semibold text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* LOGIN */}

                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Login
                </Link>

                {/* REGISTER */}

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-black px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
