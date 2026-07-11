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
    <div className="flex min-h-screen items-center justify-center bg-vellum px-4">
      <div className="w-full max-w-md rounded-3xl bg-bone p-8 mt-15">
        {/* TITLE */}
        <div className="mb-6 text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
            Student & Staff Portal
          </span>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-graphite">
            Login
          </h2>
        </div>

        {/* FORM */}
        <form onSubmit={submitHandler} autoComplete="off" className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-graphite">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-pebble bg-vellum px-4 py-3 text-sm outline-none transition focus:border-obsidian"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium text-graphite">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-pebble bg-vellum px-4 py-3 pr-12 text-sm outline-none transition focus:border-obsidian"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full rounded-[600px] bg-obsidian py-3 font-mono text-sm font-medium text-vellum transition hover:bg-ember-orange hover:text-black"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-pebble" />
          <span className="font-mono text-xs text-slate">OR</span>
          <div className="h-px flex-1 bg-pebble" />
        </div>

        {/* GOOGLE LOGIN */}
        {/* <div className="flex justify-center">
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={() => toast.error("Google login failed")}
          />
        </div> */}

        <p className="mt-6 text-center text-sm text-slate">
          Student accounts are created after your admission is approved by
          ChartWiz Academy.
        </p>

        <div className="text-center">
          <Link
            to="/admission"
            className="mt-4 inline-block rounded-[600px] bg-ember-orange px-5 py-2 font-mono text-xs font-semibold text-black"
          >
            Apply for Admission
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
