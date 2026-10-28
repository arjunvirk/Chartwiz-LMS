import StudentClassNotices from "../components/StudentClassNotices";
import { getMyCourses } from "../actions/courseActions";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import {
  Menu, X, PanelLeftClose, PanelLeftOpen, LayoutGrid, BookOpen, Radio, CreditCard, Receipt, Users,
  ClipboardList, LineChart, UserRound, Library, ChevronRight,
} from "lucide-react";
import "./DashboardLayout.css";

const SIDEBAR_KEY = "alphira-sidebar-expanded";
const readSidebarPref = () => { try { return localStorage.getItem(SIDEBAR_KEY) !== "0"; } catch { return true; } };

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(readSidebarPref);
  const dialogRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const { courses: enrolledCourses = [], loading: coursesLoading, error: coursesError } = useSelector((state) => state.myCourses);
  useEffect(() => {
    if (userInfo?.user?.role === "student") dispatch(getMyCourses());
  }, [dispatch, userInfo?.user?._id, userInfo?.user?.role]);
  const isTeacher = userInfo?.user?.role === "teacher";
  const isAdmin = userInfo?.user?.role === "admin";
  const dashboardPath = isAdmin ? "/admin/dashboard" : isTeacher ? "/teacher/dashboard" : "/dashboard";
  const profilePath = `${dashboardPath}/profile`;

  const role = isAdmin ? "Admin" : isTeacher ? "Teacher" : "Student";
  const name = userInfo?.user?.name || role;
  const links = [
    { to: dashboardPath, label: "Overview", icon: LayoutGrid, end: true },
    ...(isAdmin ? [
      { to: "/admin/dashboard/admissions", label: "Admissions", icon: ClipboardList },
      { to: "/admin/dashboard/leads", label: "Leads", icon: Users },
      { to: "/admin/dashboard/payments", label: "Payments", icon: CreditCard },
      { to: "/admin/dashboard/invoices", label: "Invoices", icon: Receipt },
    ] : isTeacher ? [
      { to: "/teacher/dashboard/courses", label: "Courses", icon: Library },
      { to: "/teacher/dashboard/live-courses", label: "Live courses", icon: Radio, match: ["/teacher/dashboard/create-live-course"] },
      { to: "/teacher/dashboard/analysis", label: "Market analysis", icon: LineChart },
    ] : [
      { to: "/dashboard/courses", label: "My courses", icon: BookOpen },
      { to: "/dashboard/live-courses", label: "Live classes", icon: Radio },
      { to: "/dashboard/market-analysis", label: "Market analysis", icon: LineChart },
      { to: "/dashboard/payment", label: "Pay fee", icon: CreditCard },
    ]),
  ];
  const accountLinks = [{ to: profilePath, label: "Profile", icon: UserRound }];
  const isActive = (item) => item.end
    ? location.pathname === item.to
    : location.pathname === item.to || location.pathname.startsWith(item.to + "/") || (item.match || []).some((m) => location.pathname.startsWith(m));
  const current = [...links, ...accountLinks].find(isActive)?.label || "Overview";
  const isOverview = location.pathname === dashboardPath;

  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);
  useEffect(() => { try { localStorage.setItem(SIDEBAR_KEY, desktopSidebarOpen ? "1" : "0"); } catch { /* preference is optional */ } }, [desktopSidebarOpen]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!sidebarOpen) { if (dialog.open) dialog.close(); return; }
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (media.matches) setSidebarOpen(false); };
    media.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = previousOverflow;
      media.removeEventListener("change", resize);
      dialog.close();
      menuRef.current?.focus();
    };
  }, [sidebarOpen]);

  const avatar = <span className="alphira-dash-avatar" aria-hidden="true">{userInfo?.user?.profilePic ? <img src={userInfo.user.profilePic} alt="" /> : name.charAt(0).toUpperCase()}</span>;
  const navItem = ({ to, label, icon: Icon, end }, compact, layoutGroup) => {
    const active = isActive({ to, end, match: links.find((l) => l.to === to)?.match });
    return (
      <NavLink key={to} to={to} end={end} title={compact ? label : undefined} aria-label={compact ? label : undefined} aria-current={active ? "page" : undefined} onClick={() => setSidebarOpen(false)} className={`alphira-dash-link${active ? " is-active" : ""}`}>
        {active && <motion.span layoutId={reducedMotion ? undefined : `dash-active-${layoutGroup}`} className="alphira-dash-link-bg" transition={{ type: "spring", stiffness: 520, damping: 42 }} aria-hidden="true" />}
        <Icon size={18} strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
        {!compact && <span>{label}</span>}
      </NavLink>
    );
  };
  const navigation = (compact = false, group = "side") => (
    <nav aria-label="Dashboard navigation" className="alphira-dash-nav-wrap">
      {!compact && <p className="alphira-dash-caption">Workspace</p>}
      <div className="alphira-dash-nav">{links.map((item) => navItem(item, compact, group))}</div>
      {!compact && <p className="alphira-dash-caption alphira-dash-caption-gap">Account</p>}
      <div className={`alphira-dash-nav${compact ? " alphira-dash-nav-gap" : ""}`}>{accountLinks.map((item) => navItem(item, compact, group))}</div>
    </nav>
  );
  const identity = <Link to={profilePath} className="alphira-dash-identity" onClick={() => setSidebarOpen(false)}>{avatar}<div><strong>{name}</strong><small>{role} account</small></div><ChevronRight size={16} aria-hidden="true" /></Link>;

  return (
    <div className={`alphira-dash-shell ${desktopSidebarOpen ? "" : "is-compact"}`}>
      <aside className="alphira-dash-sidebar" aria-label="Sidebar">
        {navigation(!desktopSidebarOpen, "side")}
        <div className="alphira-dash-sidebar-bottom">{desktopSidebarOpen ? identity : <Link to={profilePath} className="alphira-dash-avatar-link" aria-label="Profile">{avatar}</Link>}</div>
      </aside>
      <dialog ref={dialogRef} className="alphira-dash-drawer" aria-label="Dashboard menu" onCancel={(event) => { event.preventDefault(); setSidebarOpen(false); }} onClick={(event) => { if (event.target === event.currentTarget) setSidebarOpen(false); }}>
        <div className="alphira-dash-drawer-content">
          <div className="alphira-dash-drawer-heading"><div className="alphira-drawer-brand"><img className="alphira-ac-logo" src="/alphira-ac-logo.svg" alt="" /><strong>{role} workspace</strong></div><button type="button" autoFocus className="alphira-dash-icon-button" aria-label="Close dashboard menu" onClick={() => setSidebarOpen(false)}><X size={20} /></button></div>
          {navigation(false, "drawer")}
          <div className="alphira-dash-sidebar-bottom">{identity}</div>
        </div>
      </dialog>
      <main className="alphira-dash-main">
        <header className="alphira-dash-topbar">
          <div className="alphira-dash-breadcrumb">
            <button type="button" ref={menuRef} className="alphira-dash-icon-button alphira-dash-mobile-toggle" aria-label="Open dashboard menu" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <button type="button" className="alphira-dash-icon-button alphira-dash-desktop-toggle" aria-label={desktopSidebarOpen ? "Collapse sidebar" : "Expand sidebar"} aria-expanded={desktopSidebarOpen} onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}>{desktopSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}</button>
            <nav aria-label="Breadcrumb"><ol><li>{isOverview ? <span>{role} workspace</span> : <Link to={dashboardPath}>{role} workspace</Link>}</li><li aria-current="page"><strong>{current}</strong></li></ol></nav>
          </div>
          <div className="alphira-dash-topbar-meta">
            {!isTeacher && !isAdmin && <Link to="/dashboard/courses" className="alphira-dash-enrollment" aria-label={`${enrolledCourses.length} enrolled courses`}><BookOpen size={15} aria-hidden="true" /><span>Enrolled</span><strong>{coursesLoading ? "…" : coursesError ? "—" : enrolledCourses.length}</strong></Link>}
            <Link to={profilePath} className="alphira-dash-avatar-link" aria-label="Your profile">{avatar}</Link>
          </div>
        </header>
        <div className="alphira-dash-content">
          {userInfo?.user?.role === "student" && userInfo.user._id && <StudentClassNotices key={userInfo.user._id} userId={userInfo.user._id} />}
          <div key={location.pathname} className="alphira-dash-outlet ac-route-enter">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

