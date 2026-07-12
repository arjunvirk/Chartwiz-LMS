import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, checkAuth } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-xl border border-pebble bg-vellum px-5 py-4 text-sm outline-none transition focus:border-obsidian";

const ChangePasswordScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userChangePassword = useSelector((state) => state.userChangePassword);
  const { loading, success, error } = userChangePassword;

  const submitHandler = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    dispatch(changePassword(currentPassword, newPassword));
  };

  useEffect(() => {
    const handleSuccess = async () => {
      if (success) {
        toast.success("Password changed successfully");

        await dispatch(checkAuth());

        const updatedUser = JSON.parse(localStorage.getItem("userInfo"));
        const role = updatedUser?.user?.role;

        if (role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else if (role === "teacher") {
          navigate("/teacher/dashboard", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }

      if (error) {
        toast.error(error);
      }
    };

    handleSuccess();
  }, [success, error, dispatch, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-vellum px-4">
      <div className="w-full max-w-md rounded-3xl bg-bone p-8">
        <span className="block text-center font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
          Security
        </span>
        <h1 className="mt-4 text-center font-serif text-3xl leading-tight text-graphite">
          Change Password
        </h1>
        <p className="mt-2 text-center text-sm text-slate">
          You must change your temporary password before continuing.
        </p>

        <form onSubmit={submitHandler} className="mt-8 space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputClass}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
          />

          <button
            disabled={loading}
            className="w-full rounded-pill bg-ember-orange py-4 font-mono text-sm font-semibold text-black transition hover:brightness-95 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordScreen;
