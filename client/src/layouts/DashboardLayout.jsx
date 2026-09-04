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
  const adminAdmissionsPath = "/admin/dashboard/admissions";
  const paymentPath = "/dashboard/payment";

  const navLinkClass =
    "rounded-lg px-4 py-3 text-sm font-medium text-slate transition hover:bg-obsidian hover:text-vellum";

  return (
    <div className="flex min-h-screen bg-vellum mt-20">
      {/* MOBILE SIDEBAR OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-obsidian/50 transition lg:hidden ${
          sidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className={`absolute left-0 top-0 h-full w-72 bg-vellum transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* MOBILE HEADER */}
          <div className="flex items-center justify-between border-b border-pebble p-5">
            <div>
              <h2 className="text-xl font-semibold text-graphite">Alphira</h2>
              <p className="font-mono text-xs uppercase tracking-[-0.02em] text-slate">
                {isAdmin ? "Admin" : isTeacher ? "Teacher" : "Student"}{" "}
                Dashboard
              </p>
            </div>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={22} className="text-graphite" />
            </button>
          </div>

          {/* MOBILE USER CARD */}
          <div className="mx-4 mt-6 rounded-2xl bg-obsidian p-5 text-vellum">
            <div className="flex items-center gap-4">
              <img
                src={
                  userInfo?.user?.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold">
                  {userInfo?.user?.name}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase text-mist">
                  {userInfo?.user?.role}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-mist">Learning Progress</span>
                <span className="font-mono text-xs font-medium text-vellum">
                  0%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[20%] rounded-full bg-ember-orange" />
              </div>
            </div>
          </div>

          {/* MOBILE NAV */}
          <nav className="mt-8 flex flex-col gap-1 px-4">
            <Link
              to={dashboardPath}
              onClick={() => setSidebarOpen(false)}
              className={navLinkClass}
            >
              Dashboard
            </Link>

            {!isTeacher && !isAdmin && (
              <>
                {/* <Link
                  to={exploreCoursesPath}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass}
                >
                  Courses
                </Link> */}
                
                <Link
                  to={coursesPath}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass}
                >
                  My Courses
                </Link>
                <Link
                  to={myLiveCoursesPath}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass}
                >
                  My Live Classes
                </Link>
                <Link
                  to={paymentPath}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass}
                >
                  Pay Fee
                </Link>
              </>
            )}

            {isTeacher && (
              <>
                <Link
                  to={coursesPath}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass}
                >
                  Courses
                </Link>
                <Link
                  to={teacherLiveCoursesPath}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass}
                >
                  Live Courses
                </Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link
                  to={adminPaymentsPath}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass}
                >
                  Payments
                </Link>
                <Link
                  to={adminInvoicesPath}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass}
                >
                  Invoices
                </Link>
                <Link
                  to="/admin/dashboard/leads"
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass}
                >
                  Leads
                </Link>
                <Link
                  to={adminAdmissionsPath}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass}
                >
                  Admissions
                </Link>
              </>
            )}

            {!isAdmin && (
              <Link
                to={profilePath}
                onClick={() => setSidebarOpen(false)}
                className={navLinkClass}
              >
                Profile
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden border-r border-pebble bg-vellum transition-all duration-300 lg:flex lg:flex-col ${
          desktopSidebarOpen ? "w-72" : "w-20"
        }`}
      >
        {desktopSidebarOpen && (
          <div className="mx-4 mt-6 rounded-2xl bg-obsidian p-5 text-vellum">
            <div className="flex items-center gap-4">
              <img
                src={
                  userInfo?.user?.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold">
                  {userInfo?.user?.name}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase text-mist">
                  {userInfo?.user?.role}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-mist">Learning Progress</span>
                <span className="font-mono text-xs font-medium text-vellum">
                  0%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[20%] rounded-full bg-ember-orange" />
              </div>
            </div>
          </div>
        )}

        <nav className="mt-8 flex flex-col gap-1 px-4">
          <Link
            to={dashboardPath}
            className={`${navLinkClass} ${desktopSidebarOpen ? "text-left" : "text-center"}`}
          >
            {desktopSidebarOpen ? "Dashboard" : "D"}
          </Link>

          {!isTeacher && !isAdmin && (
            <>
              <Link
                to={coursesPath}
                className={`${navLinkClass} ${desktopSidebarOpen ? "text-left" : "text-center"}`}
              >
                {desktopSidebarOpen ? "My Courses" : "M"}
              </Link>
              <Link
                to={myLiveCoursesPath}
                className={`${navLinkClass} ${desktopSidebarOpen ? "text-left" : "text-center"}`}
              >
                {desktopSidebarOpen ? "My Live Classes" : "L"}
              </Link>
              <Link
                to={paymentPath}
                className={`${navLinkClass} ${desktopSidebarOpen ? "text-left" : "text-center"}`}
              >
                {desktopSidebarOpen ? "Pay Fee" : "₹"}
              </Link>
            </>
          )}

          {isTeacher && (
            <>
              <Link
                to={coursesPath}
                className={`${navLinkClass} ${desktopSidebarOpen ? "text-left" : "text-center"}`}
              >
                {desktopSidebarOpen ? "Courses" : "C"}
              </Link>
              <Link
                to={teacherLiveCoursesPath}
                className={`${navLinkClass} ${desktopSidebarOpen ? "text-left" : "text-center"}`}
              >
                {desktopSidebarOpen ? "Live Courses" : "L"}
              </Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link
                to={adminPaymentsPath}
                className={`${navLinkClass} ${desktopSidebarOpen ? "text-left" : "text-center"}`}
              >
                {desktopSidebarOpen ? "Payments" : "P"}
              </Link>
              <Link
                to="/admin/dashboard/leads"
                className={`${navLinkClass} ${desktopSidebarOpen ? "text-left" : "text-center"}`}
              >
                {desktopSidebarOpen ? "Leads" : "L"}
              </Link>
              <Link
                to={adminAdmissionsPath}
                className={`${navLinkClass} ${desktopSidebarOpen ? "text-left" : "text-center"}`}
              >
                {desktopSidebarOpen ? "Admissions" : "A"}
              </Link>
              <Link
                to={adminInvoicesPath}
                className={`${navLinkClass} ${desktopSidebarOpen ? "text-left" : "text-center"}`}
              >
                {desktopSidebarOpen ? "Invoices" : "I"}
              </Link>
            </>
          )}

          {!isAdmin && (
            <Link
              to={profilePath}
              className={`${navLinkClass} ${desktopSidebarOpen ? "text-left" : "text-center"}`}
            >
              {desktopSidebarOpen ? "Profile" : "P"}
            </Link>
          )}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-hidden">
        {/* TOPBAR */}
        <header className="sticky top-0 z-40 border-b border-pebble bg-vellum px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-pebble lg:hidden"
              >
                <Menu size={20} className="text-graphite" />
              </button>

              <button
                onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
                className="mb-4 hidden h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-pebble transition hover:bg-bone lg:flex"
              >
                {desktopSidebarOpen ? (
                  <ChevronLeft size={20} className="text-graphite" />
                ) : (
                  <ChevronRight size={20} className="text-graphite" />
                )}
              </button>

              <h1 className="font-serif text-2xl leading-tight text-graphite sm:text-3xl">
                Welcome Back 👋
              </h1>
              <p className="mt-1 text-sm text-slate">
                {isAdmin
                  ? "Manage your LMS platform and users."
                  : isTeacher
                    ? "Manage mentorship programs and students."
                    : "Continue learning and mastering trading strategies."}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden text-right md:block">
                <h3 className="text-sm font-semibold text-graphite">
                  {userInfo?.user?.name}
                </h3>
                <p className="font-mono text-xs uppercase text-slate">
                  {userInfo?.user?.role}
                </p>
              </div>
              <img
                src={
                  userInfo?.user?.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="h-11 w-11 rounded-full border border-pebble object-cover"
              />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-6">
          {!isTeacher && !isAdmin && (
            <div className="mb-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-bone p-6">
                <h3 className="text-sm font-medium text-slate">
                  Enrolled Courses
                </h3>
                <p className="mt-3 font-mono text-3xl font-medium text-graphite">
                  0
                </p>
              </div>
              <div className="rounded-2xl bg-bone p-6">
                <h3 className="text-sm font-medium text-slate">
                  Completed Lessons
                </h3>
                <p className="mt-3 font-mono text-3xl font-medium text-graphite">
                  0
                </p>
              </div>
              <div className="rounded-2xl bg-bone p-6">
                <h3 className="text-sm font-medium text-slate">Certificates</h3>
                <p className="mt-3 font-mono text-3xl font-medium text-graphite">
                  0
                </p>
              </div>
            </div>
          )}

          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
