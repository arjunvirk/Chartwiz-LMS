import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { motion, useReducedMotion } from "framer-motion";
import "./StudentProfile.css";

import { updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const inputClass = "alphira-student-profile-input";

const StudentProfile = () => {
  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading, error, success } = userUpdateProfile;

  const [name, setName] = useState(userInfo?.user?.name || "");
  const [email] = useState(userInfo?.user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Name is required");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (password && password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    const updateData = { name };
    if (password.trim()) {
      updateData.password = password;
    }

    dispatch(updateUserProfile(updateData));
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.user.name);
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully");
      setPassword("");
      setConfirmPassword("");
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  return (
    <motion.section
      className="alphira-student-profile"
      aria-labelledby="student-profile-title"
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <header className="alphira-student-profile-heading">
        <span className="alphira-student-profile-eyebrow">Your account / Profile</span>
        <h1 id="student-profile-title">Make it yours.</h1>
        <p>Keep your personal details current and your account secure.</p>
      </header>
      <div className="alphira-student-profile-layout">
        <aside className="alphira-student-profile-identity" aria-label="Account summary">
          <span className="alphira-student-profile-eyebrow">ALPHIRA CAPITAL</span>
          <div className="alphira-student-profile-avatar">
            <span aria-hidden="true">{(userInfo?.user?.name || "Student").trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase()}</span>
            {userInfo?.user?.profilePic && <img src={userInfo.user.profilePic} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} />}
          </div>
          <h2>{userInfo?.user?.name || "Student"}</h2>
          <p className="alphira-student-profile-email">{userInfo?.user?.email}</p>
          <span className="alphira-student-profile-badge">{userInfo?.user?.role || "Student"} account</span>
          <div className="alphira-student-profile-identity-note">
            <span>YOUR LEARNING SPACE</span>
            <p>One account for your academy enrollment, sessions and payments.</p>
          </div>
        </aside>
        <form onSubmit={submitHandler} className="alphira-student-profile-form" aria-busy={!!loading}>
          <section className="alphira-student-profile-section" aria-labelledby="profile-personal">
            <div className="alphira-student-profile-section-heading"><span>01</span><div><h2 id="profile-personal">Personal information</h2><p>The details associated with your academy account.</p></div></div>
            <div className="alphira-student-profile-fields">
              <div className="alphira-student-profile-wide">
                <label htmlFor="student-profile-name">Full name</label>
                <input id="student-profile-name" autoComplete="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="student-profile-email">Email address <span>Read only</span></label>
                <input id="student-profile-email" autoComplete="email" type="email" value={email} disabled className={inputClass} />
              </div>
              <div>
                <label htmlFor="student-profile-role">Account role <span>Read only</span></label>
                <input id="student-profile-role" type="text" value={userInfo?.user?.role || ""} disabled className={inputClass} />
              </div>
            </div>
          </section>
          <section className="alphira-student-profile-section" aria-labelledby="profile-security">
            <div className="alphira-student-profile-section-heading"><span>02</span><div><h2 id="profile-security">Password & security</h2><p>Leave these fields empty to keep your current password.</p></div></div>
            <div className="alphira-student-profile-fields">
              <div>
                <label htmlFor="student-profile-password">New password</label>
                <input id="student-profile-password" autoComplete="new-password" aria-describedby="student-password-hint" type="password" placeholder="Enter a new password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="student-profile-confirm">Confirm password</label>
                <input id="student-profile-confirm" autoComplete="new-password" type="password" placeholder="Re-enter your new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} />
              </div>
            </div>
            <p id="student-password-hint" className="alphira-student-profile-hint">Use at least 6 characters for your new password.</p>
          </section>
          <footer className="alphira-student-profile-actions"><p>Save when you're ready.</p><button type="submit" disabled={loading}>{loading ? "Saving changes..." : "Save changes"}<span aria-hidden="true">↗</span></button></footer>
        </form>
      </div>
    </motion.section>
  );
};

export default StudentProfile;
