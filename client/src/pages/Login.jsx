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

  const hasRedirected = useRef(false)

  // ---------------- REDIRECT AFTER LOGIN ----------------
  useEffect(() => {
    if (!userInfo || hasRedirected.current) return;

    hasRedirected.current = true;

    toast.success("Welcome back");

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
      const response = await fetch(
        `${API_URL}/api/users/google`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            credential: credentialResponse.credential,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* TITLE */}

        <h2 className="mb-6 text-center text-3xl font-bold">Login</h2>

        {/* FORM */}

        <form onSubmit={submitHandler} autoComplete="off" className="space-y-5">
          {/* EMAIL */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* PASSWORD */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-20 outline-none focus:border-black"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* DIVIDER */}

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300"></div>

          <span className="text-sm text-gray-500">OR</span>

          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        {/* GOOGLE LOGIN */}

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={() => toast.error("Google login failed")}
          />
        </div>

        {/* REGISTER */}

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-black">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
