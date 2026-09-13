import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import toast from "react-hot-toast";
import { motion, useReducedMotion } from "framer-motion";
import "../student/StudentProfile.css";
import "./TeacherProfile.css";
const inputClass = "alphira-student-profile-input";

import { updateUserProfile } from "../../actions/userActions";

import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

import { getTeacherCourses } from "../../actions/courseActions";

const TeacherProfile = () => {
  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const teacherCourses = useSelector((state) => state.teacherCourses);

  const { courses = [], loading: coursesLoading, error: coursesError } = teacherCourses;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const { loading, error, success } = userUpdateProfile;

  const [name, setName] = useState(userInfo?.user?.name || "");

  const [email] = useState(userInfo?.user?.email || "");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const totalCourses = courses?.length || 0;

  const totalStudents = courses?.reduce(
    (total, course) => total + (course.students?.length || 0),
    0,
  );
  // ---------------- SUBMIT ----------------

  const submitHandler = (e) => {
    e.preventDefault();
    if (loading) return;

    if (!name.trim()) {
      return toast.error("Name is required");
    }

    if (password && password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (name === userInfo?.user?.name && !password) {
      return toast.error("No changes detected");
    }

    dispatch(
      updateUserProfile({
        name: name.trim(),
        password,
      }),
    );
  };
  // ---------------- SUCCESS TOAST ----------------

  useEffect(() => {
    if (success) {
      toast.dismiss();

      toast.success("Profile updated successfully");

      setPassword("");
      setConfirmPassword("");

      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (userInfo?.user?.name) {
      setName(userInfo.user.name);
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(getTeacherCourses());
  }, [dispatch]);

  // ---------------- ERROR TOAST ----------------

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  return (
    <motion.section
      className="alphira-student-profile alphira-teacher-profile"
      aria-labelledby="teacher-profile-title"
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <header className="alphira-student-profile-heading">
        <span className="alphira-student-profile-eyebrow">Your account / Profile</span>
        <h1 id="teacher-profile-title">Your teaching identity.</h1>
        <p>Manage your mentor profile, personal details and account security.</p>
      </header>
      <div className="alphira-student-profile-layout">
        <aside className="alphira-student-profile-identity" aria-label="Account summary">
          <span className="alphira-student-profile-eyebrow">ALPHIRA CAPITAL</span>
          <div className="alphira-student-profile-avatar">
            <span aria-hidden="true">{(userInfo?.user?.name || "Teacher").trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase()}</span>
            {userInfo?.user?.profilePic && <img src={userInfo.user.profilePic} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} />}
          </div>
          <h2>{userInfo?.user?.name || "Teacher"}</h2>
          <p className="alphira-student-profile-email">{userInfo?.user?.email}</p>
          <span className="alphira-student-profile-badge">{userInfo?.user?.role || "Teacher"} account</span><p className="alphira-teacher-profile-verification">{userInfo?.user?.isVerified ? "Verified mentor" : "Verification pending"}</p><div className="alphira-teacher-profile-stats"><div><strong>{coursesLoading ? "…" : coursesError ? "—" : totalCourses}</strong><span>Assigned courses</span></div><div><strong>{coursesLoading ? "…" : coursesError ? "—" : totalStudents}</strong><span>Course enrollments</span></div></div>
          <div className="alphira-student-profile-identity-note">
            <span>YOUR MENTOR SPACE</span>
            <p>Your profile connects your teaching programs and mentorship workspace.</p>
          </div>
        </aside>
        <form onSubmit={submitHandler} className="alphira-student-profile-form" aria-busy={!!loading}>
          <section className="alphira-student-profile-section" aria-labelledby="profile-personal">
            <div className="alphira-student-profile-section-heading"><span>01</span><div><h2 id="profile-personal">Personal information</h2><p>The details associated with your academy account.</p></div></div>
            <div className="alphira-student-profile-fields">
              <div className="alphira-student-profile-wide">
                <label htmlFor="teacher-profile-name">Full name</label>
                <input id="teacher-profile-name" autoComplete="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="teacher-profile-email">Email address <span>Read only</span></label>
                <input id="teacher-profile-email" autoComplete="email" type="email" value={email} disabled className={inputClass} />
              </div>
              <div>
                <label htmlFor="teacher-profile-role">Account role <span>Read only</span></label>
                <input id="teacher-profile-role" type="text" value={userInfo?.user?.role || ""} disabled className={inputClass} />
              </div>
            </div>
          </section>
          <section className="alphira-student-profile-section" aria-labelledby="profile-security">
            <div className="alphira-student-profile-section-heading"><span>02</span><div><h2 id="profile-security">Password & security</h2><p>Leave these fields empty to keep your current password.</p></div></div>
            <div className="alphira-student-profile-fields">
              <div>
                <label htmlFor="teacher-profile-password">New password</label>
                <input id="teacher-profile-password" autoComplete="new-password" aria-describedby="teacher-password-hint" type="password" placeholder="Enter a new password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="teacher-profile-confirm">Confirm password</label>
                <input id="teacher-profile-confirm" autoComplete="new-password" type="password" placeholder="Re-enter your new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} />
              </div>
            </div>
            <p id="teacher-password-hint" className="alphira-student-profile-hint">Use at least 6 characters for your new password.</p>
          </section>
          <footer className="alphira-student-profile-actions"><p>Save when you're ready.</p><button type="submit" disabled={loading}>{loading ? "Saving changes..." : "Save changes"}<span aria-hidden="true">↗</span></button></footer>
        </form>
      </div>
    </motion.section>
  );
};

export default TeacherProfile;

