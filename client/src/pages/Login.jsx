import "./Login.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { GoogleLogin } from "@react-oauth/google";
import { login } from "../actions/userActions";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";
import { API_URL } from "../config/api";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Mail, Lock, ArrowUpRight, ShieldCheck, GraduationCap } from "lucide-react";
import useUltrawideCanvas from "../hooks/useUltrawideCanvas";

/* Decorative rising-market scene for the brand panel (viewBox 600 × 360). */
const CANDLES = [
  [292, 304], [304, 286], [286, 298], [298, 270], [270, 280], [280, 252], [252, 262], [262, 236],
  [236, 246], [246, 214], [214, 224], [224, 196], [196, 206], [206, 172], [172, 184], [184, 150],
  [150, 160], [160, 128], [128, 138], [138, 104],
];
const LINE = CANDLES.map(([, c], i) => `${i ? "L" : "M"}${30 + i * 28 + 7} ${c}`).join(" ");

const Login = () => {
  const location = useLocation();
  useUltrawideCanvas();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified")) {
      toast.success("Email verified successfully. Please login.");
    }
  }, [location]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const hasRedirected = useRef(false);

  // ---------------- REDIRECT AFTER LOGIN ----------------
  useEffect(() => {
    if (!userInfo || hasRedirected.current) return;

    hasRedirected.current = true;
    toast.success("Welcome back");

    if (userInfo.mustChangePassword) {
      navigate("/change-password", { replace: true });
      return;
    }

    if (userInfo.user.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else if (userInfo.user.role === "teacher") {
      navigate("/teacher/dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // ---------------- MANUAL LOGIN ----------------
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // ---------------- GOOGLE LOGIN ----------------
  // eslint-disable-next-line no-unused-vars
  const googleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(`${API_URL}/api/users/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="als">
      <div className="als-frame">
        {/* ---------- Brand panel ---------- */}
        <section className="als-brand" aria-labelledby="als-welcome">
          <div className="als-brand-copy">
            <p className="als-kicker"><span aria-hidden="true" />Alphira Capital</p>
            <h1 id="als-welcome"><span>Welcome</span><span className="als-accent">back.</span></h1>
            <p className="als-portal"><ShieldCheck size={15} aria-hidden="true" />Student &amp; Staff Portal</p>
          </div>

          <svg className="als-chart" viewBox="0 0 600 360" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            <defs>
              <linearGradient id="als-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c3d4ae" stopOpacity=".22" /><stop offset="1" stopColor="#c3d4ae" stopOpacity="0" /></linearGradient>
            </defs>
            {[80, 150, 220, 290].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} className="als-grid" />)}
            <path d={`${LINE} L${30 + 19 * 28 + 7} 360 L37 360 Z`} fill="url(#als-area)" className="als-area" />
            {CANDLES.map(([o, c], i) => {
              const x = 30 + i * 28; const up = c < o;
              return (
                <g key={i} className={`als-candle ${up ? "up" : "dn"}`} style={{ "--i": i }}>
                  <line x1={x + 7} x2={x + 7} y1={Math.min(o, c) - 8} y2={Math.max(o, c) + 8} />
                  <rect x={x} y={Math.min(o, c)} width="14" height={Math.max(4, Math.abs(o - c))} />
                </g>
              );
            })}
            <path d={LINE} className="als-line" pathLength="1" />
            <g className="als-tag"><circle cx={30 + 19 * 28 + 7} cy="104" r="5" /><circle cx={30 + 19 * 28 + 7} cy="104" r="5" className="als-ping" /></g>
          </svg>

          <div className="als-admission">
            <GraduationCap size={20} aria-hidden="true" />
            <p>Student accounts are created after your admission is approved by Alphira Capital.</p>
            <Link to="/admission">Apply for Admission <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
        </section>

        {/* ---------- Form ---------- */}
        <section className="als-panel" aria-labelledby="als-title">
          <div className="als-card">
            <header>
              <p className="als-kicker als-kicker-dark"><span aria-hidden="true" />Your account</p>
              <h2 id="als-title">Login</h2>
              <p className="als-sub">Sign in to continue to your dashboard.</p>
            </header>
            <form onSubmit={submitHandler} autoComplete="off" className="als-form" aria-busy={!!loading}>
              <div className="als-field">
                <label htmlFor="alphira-signin-email">Email</label>
                <div className="als-input-wrap">
                  <Mail size={17} aria-hidden="true" />
                  <input id="alphira-signin-email" name="email" type="email" placeholder="you@example.com" required value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} className="als-input" />
                </div>
              </div>
              <div className="als-field">
                <label htmlFor="alphira-signin-password">Password</label>
                <div className="als-input-wrap">
                  <Lock size={17} aria-hidden="true" />
                  <input id="alphira-signin-password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter password" required value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} className="als-input" />
                  <button type="button" className="als-eye" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>{showPassword ? <FiEyeOff size={18} aria-hidden="true" /> : <FiEye size={18} aria-hidden="true" />}</button>
                </div>
              </div>
              <button type="submit" className="als-submit" disabled={!!loading} aria-busy={!!loading}>
                {loading ? <><span>Signing you in…</span><span className="ac-spinner" aria-hidden="true" /></> : <><span>Login</span><ArrowUpRight size={18} aria-hidden="true" /></>}
              </button>
            </form>
            {/* Google sign-in remains disabled, matching the original page. */}
            <div className="als-help">
              <p>New to Alphira Capital? <Link to="/admission">Apply for admission</Link></p>
              <p>Need help? <a href="tel:+919217222356">+91 92172 22356</a></p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Login;
