import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { logout } from "../actions/userActions";

const NAV_LINKS = [
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
  { to: "/live-courses", label: "Live Classes" },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const { userInfo } = useSelector((state) => state.userLogin);
  const role = userInfo?.user?.role;
  const dashboardPath = role === "admin" ? "/admin/dashboard" : role === "teacher" ? "/teacher/dashboard" : "/dashboard";
  const profilePath = `${dashboardPath}/profile`;

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);
  const logoutHandler = async () => {
    await dispatch(logout());
    closeMenu();
    navigate("/login", { replace: true });
  };
  const navLinks = () => <>
    {NAV_LINKS.map(({ to, label }) => (
      <NavLink key={to} to={to} onClick={closeMenu} className={({ isActive }) => `ac-nav-link${isActive ? " is-active" : ""}`}>{label}</NavLink>
    ))}
    <NavLink to="/live" onClick={closeMenu} className={({ isActive }) => `ac-nav-link${isActive ? " is-active" : ""}`}><span className="ac-live-dot" aria-hidden="true" />Live</NavLink>
    {userInfo && <NavLink to={profilePath} onClick={closeMenu} className={({ isActive }) => `ac-nav-link${isActive ? " is-active" : ""}`}>Profile</NavLink>}
  </>;
  const accountActions = () => userInfo ? <>
    <Link to={dashboardPath} onClick={closeMenu} className="ac-button ac-button-primary">Dashboard <ArrowUpRight size={16} aria-hidden="true" /></Link>
    <button type="button" onClick={logoutHandler} className="ac-button ac-button-secondary">Logout</button>
  </> : <>
    <Link to="/admission" onClick={closeMenu} className="ac-nav-link">Enroll</Link>
    <Link to="/login" onClick={closeMenu} className="ac-button ac-button-primary">Login <ArrowUpRight size={16} aria-hidden="true" /></Link>
  </>;

  return (
    <header className="ac-header">
      <nav className="ac-navbar" aria-label="Main navigation">
        <Link to={userInfo ? dashboardPath : "/"} onClick={closeMenu} className="ac-brand" aria-label="Alphira Capital home">
          <span className="ac-brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M7 24 16 7l9 17M11 18h10" stroke="currentColor" strokeWidth="2.5" /></svg></span>
          <span className="ac-brand-name">alphira<span className="ac-brand-caption">CAPITAL</span></span>
        </Link>
        <div className="ac-desktop-links">{navLinks()}</div>
        <div className="ac-desktop-actions">{accountActions()}</div>
        <button ref={toggleRef} type="button" className="ac-menu-toggle" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} aria-controls="ac-mobile-navigation" onClick={() => setMobileMenuOpen((open) => !open)}>
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <div id="ac-mobile-navigation" className="ac-mobile-panel" hidden={!mobileMenuOpen}>
        <nav aria-label="Mobile navigation" className="ac-mobile-links">{navLinks()}</nav>
        <div className="ac-mobile-actions">{accountActions()}</div>
      </div>
    </header>
  );
}
