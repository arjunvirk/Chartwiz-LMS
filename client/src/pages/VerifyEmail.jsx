import { useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { verifyEmail } from "../actions/userActions";

const VerifyEmail = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userVerify = useSelector((state) => state.userVerify);

  const { loading, success, error } = userVerify;

  // ---------------- VERIFY EMAIL ----------------

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [dispatch, token]);

  // ---------------- REDIRECT ----------------

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [success, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        {/* LOADING */}

        {loading && (
          <>
            <div className="mb-5 flex justify-center">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
            </div>

            <h2 className="text-2xl font-bold">Verifying Email...</h2>

            <p className="mt-3 text-sm text-gray-500">
              Please wait while we verify your account.
            </p>
          </>
        )}

        {/* SUCCESS */}

        {success && (
          <>
            <div className="mb-5 text-6xl">✅</div>

            <h2 className="text-3xl font-bold text-green-600">
              Email Verified
            </h2>

            <p className="mt-3 text-gray-600">
              Your account has been verified successfully.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Redirecting to dashboard...
            </p>
          </>
        )}

        {/* ERROR */}

        {error && (
          <>
            <div className="mb-5 text-6xl">❌</div>

            <h2 className="text-3xl font-bold text-red-600">
              Verification Failed
            </h2>

            <p className="mt-3 text-gray-600">{error}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
