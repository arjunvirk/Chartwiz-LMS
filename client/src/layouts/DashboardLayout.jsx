import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Menu, X, PanelLeftClose, PanelLeftOpen, LayoutGrid, BookOpen, Radio, CreditCard, Receipt, Users, ClipboardList, UserRound, GraduationCap, Award } from "lucide-react";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const dialogRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.userLogin);
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

  const myLiveCoursesPath = "/dashboard/live-courses";
  const teacherLiveCoursesPath = "/teacher/dashboard/live-courses";
  const adminPaymentsPath = "/admin/dashboard/payments";
  const adminInvoicesPath = "/admin/dashboard/invoices";
  const adminAdmissionsPath = "/admin/dashboard/admissions";
  const paymentPath = "/dashboard/payment";


  const role = isAdmin ? "Admin" : isTeacher ? "Teacher" : "Student";
  const name = userInfo?.user?.name || role;
  const links = [
    { to: dashboardPath, label: "Dashboard", icon: LayoutGrid, end: true },
    ...(isAdmin ? [
      { to: adminPaymentsPath, label: "Payments", icon: CreditCard },
      { to: "/admin/dashboard/leads", label: "Leads", icon: Users },
      { to: adminAdmissionsPath, label: "Admissions", icon: ClipboardList },
      { to: adminInvoicesPath, label: "Invoices", icon: Receipt },
    ] : isTeacher ? [
      { to: coursesPath, label: "Courses", icon: BookOpen },
      { to: teacherLiveCoursesPath, label: "Live Courses", icon: Radio },
      { to: profilePath, label: "Profile", icon: UserRound },
    ] : [
      { to: coursesPath, label: "My Courses", icon: BookOpen },
      { to: myLiveCoursesPath, label: "My Live Classes", icon: Radio },
      { to: paymentPath, label: "Pay Fee", icon: CreditCard },
      { to: profilePath, label: "Profile", icon: UserRound },
    ]),
  ];
  const current = links.find((item) => item.end ? location.pathname === item.to : location.pathname === item.to || location.pathname.startsWith(item.to + "/"))?.label || "Dashboard";
  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);
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
  const avatar = <span className="alphira-dash-avatar">{userInfo?.user?.profilePic ? <img src={userInfo.user.profilePic} alt="" /> : name.charAt(0).toUpperCase()}</span>;
  const navigation = (compact = false) => <nav aria-label="Dashboard navigation" className="alphira-dash-nav">{links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} title={compact ? label : undefined} aria-label={label} onClick={() => setSidebarOpen(false)} className={({ isActive }) => `alphira-dash-link${isActive ? " is-active" : ""}`}><Icon size={19} aria-hidden="true" />{!compact && <span>{label}</span>}</NavLink>)}</nav>;
  const identity = <div className="alphira-dash-identity">{avatar}<div><strong>{name}</strong><small>{role} account</small></div></div>;
  return (
    <div className={`alphira-dash-shell ${desktopSidebarOpen ? "" : "is-compact"}`}>
      <aside className="alphira-dash-sidebar">
        <div className="alphira-dash-brand"><img className="alphira-ac-logo" src="/alphira-ac-logo.svg" alt="Alphira Capital" />{desktopSidebarOpen && <div>alphira<small>CAPITAL</small></div>}</div>
        {desktopSidebarOpen && <p className="alphira-dash-caption">Your workspace</p>}
        {navigation(!desktopSidebarOpen)}
        <div className="alphira-dash-sidebar-bottom">{desktopSidebarOpen ? identity : avatar}</div>
      </aside>
      <dialog ref={dialogRef} className="alphira-dash-drawer" aria-label="Dashboard menu" onCancel={(event) => { event.preventDefault(); setSidebarOpen(false); }} onClick={(event) => { if (event.target === event.currentTarget) setSidebarOpen(false); }}>
        <div className="alphira-dash-drawer-content">
          <div className="alphira-dash-drawer-heading"><div className="alphira-drawer-brand"><img className="alphira-ac-logo" src="/alphira-ac-logo.svg" alt="" /><strong>Alphira Capital</strong></div><button type="button" autoFocus className="alphira-dash-icon-button" aria-label="Close dashboard menu" onClick={() => setSidebarOpen(false)}><X size={20} /></button></div>
          <p className="alphira-dash-caption">{role} workspace</p>
          {navigation()}
          <div className="alphira-dash-sidebar-bottom">{identity}</div>
        </div>
      </dialog>
      <main className="alphira-dash-main">
        <header className="alphira-dash-topbar">
          <div className="alphira-dash-breadcrumb">
            <button type="button" ref={menuRef} className="alphira-dash-icon-button alphira-dash-mobile-toggle" aria-label="Open dashboard menu" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <button type="button" className="alphira-dash-icon-button alphira-dash-desktop-toggle" aria-label={desktopSidebarOpen ? "Collapse sidebar" : "Expand sidebar"} aria-expanded={desktopSidebarOpen} onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}>{desktopSidebarOpen ? <PanelLeftClose size={19} /> : <PanelLeftOpen size={19} />}</button>
            <span>{role} workspace <b>/</b> <strong>{current}</strong></span>
          </div>
          {avatar}
        </header>
        <div className="alphira-dash-content">
          <section className="alphira-dash-welcome">
            <p className="alphira-dash-caption">A L P H I R A &nbsp; / &nbsp; {role}</p>
            <h1>Welcome back<span>.</span></h1>
            <p>{isAdmin ? "Manage your LMS platform and users." : isTeacher ? "Manage mentorship programs and students." : "Continue learning and mastering trading strategies."}</p>
          </section>
          {!isTeacher && !isAdmin && <div className="alphira-dash-stats">{[{label:"Enrolled Courses",icon:BookOpen},{label:"Completed Lessons",icon:GraduationCap},{label:"Certificates",icon:Award}].map(({label,icon:Icon}) => <div className="alphira-dash-stat" key={label}><div><span>{label}</span><Icon size={18} aria-hidden="true" /></div><strong>0</strong></div>)}</div>}
          <div className="alphira-dash-outlet"><Outlet /></div>
        </div>
      </main>
    </div>
  );
}
