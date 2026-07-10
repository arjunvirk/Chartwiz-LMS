import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, checkAuth } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

        // Refresh latest user data
        await dispatch(checkAuth());

        const updatedUser = JSON.parse(localStorage.getItem("userInfo"));

        const role = updatedUser?.user?.role;

        if (role === "admin") {
          navigate("/admin/dashboard", {
            replace: true,
          });
        } else if (role === "teacher") {
          navigate("/teacher/dashboard", {
            replace: true,
          });
        } else {
          navigate("/dashboard", {
            replace: true,
          });
        }
      }

      if (error) {
        toast.error(error);
      }
    };

    handleSuccess();
  }, [success, error, dispatch, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold">Change Password</h1>

        <p className="mt-2 text-center text-gray-500">
          You must change your temporary password before continuing.
        </p>

        <form onSubmit={submitHandler} className="mt-8 space-y-5">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-xl border p-4"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-xl border p-4"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border p-4"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-green-500 py-4 font-bold text-black transition hover:bg-green-400 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordScreen;
