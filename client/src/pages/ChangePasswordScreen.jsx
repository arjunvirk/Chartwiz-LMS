import { LockKeyhole, ArrowRight } from "lucide-react";
import "./ChangePasswordScreen.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, checkAuth } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const inputClass = "alphira-password-input";

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
    <main className="alphira-password-page">
      <section className="alphira-password-card" aria-labelledby="alphira-password-title">
        <header className="alphira-password-heading">
          <span className="alphira-password-icon" aria-hidden="true"><LockKeyhole size={26} strokeWidth={1.5} /></span>
          <p className="alphira-password-eyebrow">Security</p>
          <h1 id="alphira-password-title">Change<br /><span>Password.</span></h1>
          <p className="alphira-password-description">You must change your temporary password before continuing.</p>
        </header>
        <form onSubmit={submitHandler} className="alphira-password-form" aria-busy={!!loading}>
          <div><label htmlFor="alphira-password-current">Current Password</label><input id="alphira-password-current" name="currentPassword" autoComplete="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={inputClass} /></div>
          <div className="alphira-password-divider" aria-hidden="true" />
          <div><label htmlFor="alphira-password-new">New Password</label><input id="alphira-password-new" name="newPassword" autoComplete="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputClass} /></div>
          <div><label htmlFor="alphira-password-confirm">Confirm Password</label><input id="alphira-password-confirm" name="confirmPassword" autoComplete="new-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} /></div>
          <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Password"}<ArrowRight size={17} aria-hidden="true" /></button>
        </form>
      </section>
    </main>
  );
};
export default ChangePasswordScreen;
