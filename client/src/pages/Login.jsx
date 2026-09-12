import "./Login.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { login } from "../actions/userActions";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";
import { API_URL } from "../config/api";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const location = useLocation();

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
    <main className="alphira-signin-page">
      <div className="alphira-signin-layout">
        <section className="alphira-signin-intro" aria-labelledby="alphira-signin-welcome">
          <p className="alphira-signin-eyebrow">Alphira Capital</p>
          <h1 id="alphira-signin-welcome">Welcome<br /><span>back.</span></h1>
          <p className="alphira-signin-portal">Student &amp; Staff Portal</p>
          <div className="alphira-signin-art" aria-hidden="true"><span /><span /><span /><span /><span /></div>
          <div className="alphira-signin-admission"><p>Student accounts are created after your admission is approved by Alphira Capital.</p><Link to="/admission">Apply for Admission <span aria-hidden="true">↗</span></Link></div>
        </section>
        <section className="alphira-signin-panel" aria-labelledby="alphira-signin-title">
          <header><p className="alphira-signin-eyebrow">Your account</p><h2 id="alphira-signin-title">Login</h2></header>
          <form onSubmit={submitHandler} autoComplete="off" className="alphira-signin-form" aria-busy={!!loading}>
            <div><label htmlFor="alphira-signin-email">Email</label><input id="alphira-signin-email" name="email" type="email" placeholder="Enter email" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} className="alphira-signin-input" /></div>
            <div><label htmlFor="alphira-signin-password">Password</label><div className="alphira-signin-password"><input id="alphira-signin-password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} className="alphira-signin-input" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>{showPassword ? <FiEyeOff size={18} aria-hidden="true" /> : <FiEye size={18} aria-hidden="true" />}</button></div></div>
            <button type="submit" className="alphira-signin-submit">{loading ? "Loading..." : "Login"}<span aria-hidden="true">↗</span></button>
          </form>
          {/* Google sign-in remains disabled, matching the original page. */}
        </section>
      </div>
    </main>
  );
};
export default Login;
