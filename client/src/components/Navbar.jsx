import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  const toggleRef = useRef(null);
  const { userInfo } = useSelector((state) => state.userLogin);
  const role = userInfo?.user?.role;
  const dashboardPath = role === "admin" ? "/admin/dashboard" : role === "teacher" ? "/teacher/dashboard" : "/dashboard";
  const profilePath = `${dashboardPath}/profile`;

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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
  const links = [...NAV_LINKS, { to: "/live", label: "Live markets", live: true }, ...(userInfo ? [{ to: profilePath, label: "Profile" }] : [])];
  const navLinks = (group) => links.map(({ to, label, live }) => (
    <NavLink key={to} to={to} onClick={closeMenu} className={({ isActive }) => `ac-nav-link${isActive ? " is-active" : ""}`}>
      {({ isActive }) => <>
        {live && <span className="ac-live-dot" aria-hidden="true" />}{label}
        {isActive && group === "desktop" && <motion.span layoutId={reducedMotion ? undefined : "ac-nav-underline"} className="ac-nav-underline" transition={{ type: "spring", stiffness: 500, damping: 40 }} aria-hidden="true" />}
      </>}
    </NavLink>
  ));
  const accountActions = () => userInfo ? <>
    <Link to={dashboardPath} onClick={closeMenu} className="ac-button ac-button-primary">Dashboard <ArrowUpRight size={16} aria-hidden="true" /></Link>
    <button type="button" onClick={logoutHandler} className="ac-button ac-button-secondary">Logout</button>
  </> : <>
    <Link to="/admission" onClick={closeMenu} className="ac-button ac-button-secondary">Enroll</Link>
    <Link to="/login" onClick={closeMenu} className="ac-button ac-button-primary">Login <ArrowUpRight size={16} aria-hidden="true" /></Link>
  </>;

  return (
    <header className={`ac-header${scrolled ? " is-scrolled" : ""}${mobileMenuOpen ? " is-open" : ""}${location.pathname === "/" && !userInfo && !scrolled && !mobileMenuOpen ? " is-over-hero" : ""}`}>
      <nav className="ac-navbar" aria-label="Main navigation">
        <Link to={userInfo ? dashboardPath : "/"} onClick={closeMenu} className="ac-brand" aria-label="Alphira Capital home">
          <img className="alphira-ac-logo" src="/alphira-ac-logo.svg" alt="" aria-hidden="true" />
          <span className="ac-brand-name">alphira<span className="ac-brand-caption">CAPITAL</span></span>
        </Link>
        <div className="ac-desktop-links">{navLinks("desktop")}</div>
        <div className="ac-desktop-actions">{accountActions()}</div>
        <button ref={toggleRef} type="button" className="ac-menu-toggle" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} aria-controls="ac-mobile-navigation" onClick={() => setMobileMenuOpen((open) => !open)}>
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div id="ac-mobile-navigation" className="ac-mobile-panel" key="mobile-panel"
            initial={reducedMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
            <nav aria-label="Mobile navigation" className="ac-mobile-links">{navLinks("mobile")}</nav>
            <div className="ac-mobile-actions">{accountActions()}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

