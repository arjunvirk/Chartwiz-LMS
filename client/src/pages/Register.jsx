import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { register } from "../actions/userActions";

import { USER_LOGIN_SUCCESS } from "../constants/userConstants";

import { API_URL } from "../config/api";

import toast from "react-hot-toast";

import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [emailSent, setEmailSent] = useState(false);

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, success } = userRegister;

  // ---------------- REGISTER HANDLER ----------------

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(name, email, password));
  };

  // ---------------- SUCCESS TOAST ----------------

  useEffect(() => {
    if (success) {
      toast.dismiss();

      toast.success("Verification email sent successfully");

      setEmailSent(true);
    }
  }, [success]);
  // ---------------- ERROR TOAST ----------------

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    let interval;

    if (success && email) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(
            `${API_URL}/api/users/check-verification?email=${email}`,
            {
              credentials: "include",
            },
          );

          const data = await response.json();

          if (data.verified) {
            toast.success("Email verified successfully. Please login.");

            clearInterval(interval);

            navigate("/login");
          }
        } catch (error) {
          console.log(error);
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [success, email, navigate]);

  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="mb-4 text-5xl">📧</div>

          <h2 className="text-2xl font-bold">Email Sent</h2>

          <p className="mt-3 text-gray-600">
            We've sent a verification link to:
          </p>

          <p className="mt-2 font-semibold">{email}</p>

          <p className="mt-4 text-sm text-gray-500">
            Please verify your email to activate your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* TITLE */}

        <h2 className="mb-6 text-center text-3xl font-bold">Register</h2>

        {/* FORM */}

        <form onSubmit={submitHandler} className="space-y-5">
          {/* NAME */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* EMAIL */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
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

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        {/* LOGIN */}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-black">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
