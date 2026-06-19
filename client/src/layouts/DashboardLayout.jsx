import { Link, Outlet } from "react-router-dom";

import { useState } from "react";

import { useSelector } from "react-redux";

import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const isTeacher = userInfo?.user?.role === "teacher";

  const isAdmin = userInfo?.user?.role === "admin";

  const dashboardPath = isAdmin
    ? "/admin/dashboard"
    : isTeacher
      ? "/teacher/dashboard"
      : "/dashboard";

  const profilePath = isTeacher
    ? "/teacher/dashboard/profile"
    : "/dashboard/profile";

  const coursesPath = isTeacher
    ? "/teacher/dashboard/courses"
    : "/dashboard/courses";

  const exploreCoursesPath = "/courses";

  const liveCoursesPath = "/live-courses";

  const myLiveCoursesPath = "/dashboard/live-courses";

  const teacherLiveCoursesPath = "/teacher/dashboard/live-courses";

  const adminPaymentsPath = "/admin/dashboard/payments";

  const adminInvoicesPath = "/admin/dashboard/invoices";

  const paymentPath = "/dashboard/payment";

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      {/* MOBILE SIDEBAR OVERLAY */}

      <div
        className={`fixed inset-0 z-50 bg-black/40 transition lg:hidden ${
          sidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className={`absolute left-0 top-0 h-full w-72 bg-white transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* MOBILE HEADER */}

          <div className="flex items-center justify-between border-b border-gray-200 p-5">
            <div>
              <h2 className="text-2xl font-bold">ChartWiz</h2>

              <p className="text-sm text-gray-500">
                {isAdmin
                  ? "Admin Dashboard"
                  : isTeacher
                    ? "Teacher Dashboard"
                    : "Student Dashboard"}
              </p>
            </div>

            <button onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {/* MOBILE USER CARD */}

          <div className="mx-4 mt-6 rounded-3xl border border-gray-200 bg-linear-to-br from-black to-gray-800 p-5 text-white shadow-lg">
            {/* USER INFO */}

            <div className="flex items-center gap-4">
              <img
                src={
                  userInfo?.user?.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="h-16 w-16 rounded-full border-2 border-white object-cover"
              />

              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold">
                  {userInfo?.user?.name}
                </h3>

                <p className="mt-1 text-sm capitalize text-gray-300">
                  {userInfo?.user?.role}
                </p>
              </div>
            </div>

            {/* PROGRESS */}

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-gray-300">Learning Progress</span>

                <span className="text-xs font-semibold text-white">0%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                <div className="h-full w-[20%] rounded-full bg-white"></div>
              </div>
            </div>
          </div>

          {/* MOBILE NAV */}

          <nav className="mt-8 flex flex-col gap-2 px-4">
            {/* DASHBOARD */}

            <Link
              to={dashboardPath}
              onClick={() => setSidebarOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
            >
              Dashboard
            </Link>

            {/* STUDENT */}

            {!isTeacher && !isAdmin && (
              <>
                <Link
                  to={exploreCoursesPath}
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
                >
                  Courses
                </Link>

                <Link
                  to={liveCoursesPath}
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
                >
                  Live Mentorship
                </Link>

                <Link
                  to={coursesPath}
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
                >
                  My Courses
                </Link>

                <Link
                  to={myLiveCoursesPath}
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
                >
                  My Live Classes
                </Link>

                <Link
                  to={paymentPath}
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
                >
                  Pay Fee
                </Link>
              </>
            )}

            {/* TEACHER */}

            {isTeacher && (
              <>
                <Link
                  to={coursesPath}
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
                >
                  Courses
                </Link>

                <Link
                  to={teacherLiveCoursesPath}
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
                >
                  Live Courses
                </Link>
              </>
            )}

            {/* PROFILE */}

            {isAdmin && (
              <>
                <Link
                  to={adminPaymentsPath}
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
                >
                  Payments
                </Link>

                <Link
                  to={adminInvoicesPath}
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
                >
                  Invoices
                </Link>

                <Link
                  to="/admin/dashboard/leads"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
                >
                  Leads
                </Link>
              </>
            )}

            {!isAdmin && (
              <Link
                to={profilePath}
                onClick={() => setSidebarOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white"
              >
                Profile
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}

      <aside
        className={`hidden border-r border-gray-200 bg-white transition-all duration-300 lg:flex lg:flex-col ${
          desktopSidebarOpen ? "w-72" : "w-24"
        }`}
      >
        {/* LOGO */}

        <div
          className={`flex items-center ${
            desktopSidebarOpen ? "justify-between px-6" : "justify-center"
          } py-6`}
        >
          {desktopSidebarOpen && (
            <h1 className="text-3xl font-extrabold text-black">C</h1>
          )}
        </div>

        {/* USER CARD */}

        {desktopSidebarOpen && (
          <div className="mx-4 mt-6 rounded-3xl border border-gray-200 bg-linear-to-br from-black to-gray-800 p-5 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <img
                src={
                  userInfo?.user?.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="h-16 w-16 rounded-full border-2 border-white object-cover"
              />

              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold">
                  {userInfo?.user?.name}
                </h3>

                <p className="mt-1 text-sm capitalize text-gray-300">
                  {userInfo?.user?.role}
                </p>
              </div>
            </div>

            {/* PROGRESS */}

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-gray-300">Learning Progress</span>

                <span className="text-xs font-semibold text-white">0%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                <div className="h-full w-[20%] rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        )}

        {/* NAVIGATION */}

        <nav className="mt-8 flex flex-col gap-2 px-4">
          {/* DASHBOARD */}

          <Link
            to={dashboardPath}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white ${
              desktopSidebarOpen ? "text-left" : "text-center"
            }`}
          >
            {desktopSidebarOpen ? "Dashboard" : "D"}
          </Link>
          {/* STUDENT */}

          {/* STUDENT */}

          {!isTeacher && !isAdmin && (
            <>
              <Link
                to={exploreCoursesPath}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white ${
                  desktopSidebarOpen ? "text-left" : "text-center"
                }`}
              >
                {desktopSidebarOpen ? "Courses" : "C"}
              </Link>

              <Link
                to={liveCoursesPath}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white ${
                  desktopSidebarOpen ? "text-left" : "text-center"
                }`}
              >
                {desktopSidebarOpen ? "Live Mentorship" : "L"}
              </Link>

              <Link
                to={coursesPath}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white ${
                  desktopSidebarOpen ? "text-left" : "text-center"
                }`}
              >
                {desktopSidebarOpen ? "My Courses" : "M"}
              </Link>

              <Link
                to={myLiveCoursesPath}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white ${
                  desktopSidebarOpen ? "text-left" : "text-center"
                }`}
              >
                {desktopSidebarOpen ? "My Live Classes" : "L"}
              </Link>

              <Link
                to={paymentPath}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white ${
                  desktopSidebarOpen ? "text-left" : "text-center"
                }`}
              >
                {desktopSidebarOpen ? "Pay Fee" : "₹"}
              </Link>
            </>
          )}

          {/* TEACHER */}

          {isTeacher && (
            <>
              <Link
                to={coursesPath}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white ${
                  desktopSidebarOpen ? "text-left" : "text-center"
                }`}
              >
                {desktopSidebarOpen ? "Courses" : "C"}
              </Link>

              <Link
                to={teacherLiveCoursesPath}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white ${
                  desktopSidebarOpen ? "text-left" : "text-center"
                }`}
              >
                {desktopSidebarOpen ? "Live Courses" : "L"}
              </Link>
            </>
          )}

          {/* PROFILE */}

          {isAdmin && (
            <>
              <Link
                to={adminPaymentsPath}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white ${
                  desktopSidebarOpen ? "text-left" : "text-center"
                }`}
              >
                {desktopSidebarOpen ? "Payments" : "P"}
              </Link>

              <Link
                to="/admin/dashboard/leads"
                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white ${
                  desktopSidebarOpen ? "text-left" : "text-center"
                }`}
              >
                {desktopSidebarOpen ? "Leads" : "L"}
              </Link>

              <Link
                to={adminInvoicesPath}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white ${
                  desktopSidebarOpen ? "text-left" : "text-center"
                }`}
              >
                {desktopSidebarOpen ? "Invoices" : "I"}
              </Link>
            </>
          )}

          {!isAdmin && (
            <Link
              to={profilePath}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-black hover:text-white ${
                desktopSidebarOpen ? "text-left" : "text-center"
              }`}
            >
              {desktopSidebarOpen ? "Profile" : "P"}
            </Link>
          )}
        </nav>
      </aside>

      {/* MAIN CONTENT */}

      <main className="flex-1 overflow-hidden">
        {/* TOPBAR */}

        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 px-6 py-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            {/* LEFT */}

            <div>
              {/* MOBILE MENU */}

              <button
                onClick={() => setSidebarOpen(true)}
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 lg:hidden"
              >
                <Menu size={22} />
              </button>

              {/* DESKTOP MENU */}

              <button
                onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
                className="mb-4 hidden h-11 w-11 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-gray-100 lg:flex cursor-pointer"
              >
                {desktopSidebarOpen ? (
                  <ChevronLeft size={22} />
                ) : (
                  <ChevronRight size={22} />
                )}
              </button>

              <h1 className="text-3xl font-bold text-gray-800">
                Welcome Back 👋
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {isAdmin
                  ? "Manage your LMS platform and users."
                  : isTeacher
                    ? "Manage mentorship programs and students."
                    : "Continue learning and mastering trading strategies."}
              </p>
            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-4">
              <div className="hidden text-right md:block">
                <h3 className="text-sm font-semibold text-gray-800">
                  {userInfo?.user?.name}
                </h3>

                <p className="text-xs capitalize text-gray-500">
                  {userInfo?.user?.role}
                </p>
              </div>

              <img
                src={
                  userInfo?.user?.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover"
              />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}

        <div className="p-6">
          {/* STATS */}

          {/* STUDENT STATS */}

          {!isTeacher && !isAdmin && (
            <div className="mb-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">
                  Enrolled Courses
                </h3>

                <p className="mt-3 text-4xl font-bold text-black">0</p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">
                  Completed Lessons
                </h3>

                <p className="mt-3 text-4xl font-bold text-black">0</p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">
                  Certificates
                </h3>

                <p className="mt-3 text-4xl font-bold text-black">0</p>
              </div>
            </div>
          )}

          {/* DYNAMIC CONTENT */}

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
