import "./AdminProfile.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { ShieldCheck, ArrowRight, LockKeyhole } from "lucide-react";

import { updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { getAdminStats } from "../../actions/adminActions";

const AdminProfile = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading, error, success } = userUpdateProfile;

  const adminStats = useSelector((state) => state.adminStats);
  const { loading: statsLoading, stats } = adminStats;

  const [name, setName] = useState(userInfo?.user?.name || "");
  const [email] = useState(userInfo?.user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!name.trim()) {
      return toast.error("Name is required");
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
    if (success) {
      toast.success("Admin profile updated");
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (!userInfo) return;
    dispatch(getAdminStats());
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.user.name);
    }
  }, [userInfo]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const STATS = [
    { label: "Platform Users", value: stats?.totalUsers },
    { label: "Students", value: stats?.totalStudents },
    { label: "Teachers", value: stats?.totalTeachers },
    { label: "Courses", value: stats?.totalCourses },
    { label: "Enrollments", value: stats?.totalEnrollments },
    { label: "New Today", value: stats?.newEnrollmentsToday },
  ];

  return (
    <div className="alphira-admin-profile">
      <header className="alphira-profile-heading"><p className="alphira-profile-eyebrow">Account / Administration</p><h1>Your profile<span>.</span></h1><p>Manage your personal details and account security.</p></header>
      <div className="alphira-profile-layout">
        <aside className="alphira-profile-identity">
          <div className="alphira-profile-avatar">{userInfo?.user?.profilePic ? <img src={userInfo.user.profilePic} alt="Your profile" /> : <span>{(userInfo?.user?.name || "A").charAt(0).toUpperCase()}</span>}</div>
          <h2>{userInfo?.user?.name || "Administrator"}</h2>
          <p className="alphira-profile-role"><ShieldCheck size={16} aria-hidden="true" />{userInfo?.user?.role || "admin"}</p>
          <div className="alphira-profile-account"><small>ACCOUNT EMAIL</small><p>{email}</p></div>
          <div className="alphira-profile-stats" aria-label="Platform statistics" aria-busy={!!statsLoading}>
            <p className="alphira-profile-eyebrow">Your platform at a glance</p>
            <dl>{STATS.map((stat) => <div key={stat.label}><dt>{stat.label}</dt><dd>{statsLoading ? "..." : stat.value || 0}</dd></div>)}</dl>
          </div>
        </aside>
        <form onSubmit={submitHandler} className="alphira-profile-form" aria-busy={!!loading}>
          <section className="alphira-profile-section" aria-labelledby="profile-details-title">
            <div className="alphira-profile-section-heading"><span>01</span><div><h2 id="profile-details-title">Personal details</h2><p>The details associated with your admin account.</p></div></div>
            <div className="alphira-profile-fields">
              <div className="alphira-profile-full"><label htmlFor="admin-profile-name">Full name</label><input id="admin-profile-name" name="name" autoComplete="name" type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><label htmlFor="admin-profile-email">Email address</label><input id="admin-profile-email" type="email" value={email} disabled /></div>
              <div><label htmlFor="admin-profile-role">Account role</label><input id="admin-profile-role" type="text" value={userInfo?.user?.role || ""} disabled /></div>
            </div>
          </section>
          <section className="alphira-profile-section" aria-labelledby="profile-security-title">
            <div className="alphira-profile-section-heading"><span>02</span><div><h2 id="profile-security-title">Account security</h2><p>Leave both fields empty to keep your current password.</p></div></div>
            <div className="alphira-profile-fields">
              <div><label htmlFor="admin-profile-password">New password</label><input id="admin-profile-password" name="new-password" autoComplete="new-password" aria-describedby="admin-profile-password-hint" type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              <div><label htmlFor="admin-profile-confirm">Confirm password</label><input id="admin-profile-confirm" name="confirm-password" autoComplete="new-password" type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
            </div>
            <p className="alphira-profile-hint" id="admin-profile-password-hint"><LockKeyhole size={14} aria-hidden="true" />Use at least 6 characters for your new password.</p>
          </section>
          <div className="alphira-profile-form-footer"><p>Review your details before saving.</p><button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Admin Profile"}<ArrowRight size={17} aria-hidden="true" /></button></div>
        </form>
      </div>
    </div>
  );
};
export default AdminProfile;
