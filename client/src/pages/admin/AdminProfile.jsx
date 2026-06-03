import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import toast from "react-hot-toast";

import { ShieldCheck, Users, GraduationCap } from "lucide-react";

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

  // ---------------- STATES ----------------

  const [name, setName] = useState(userInfo?.user?.name || "");

  const [email] = useState(userInfo?.user?.email || "");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  // ---------------- SUBMIT ----------------

  const submitHandler = (e) => {
    e.preventDefault();

    // PASSWORD MATCH

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    // UPDATE PROFILE

    if (!name.trim()) {
      return toast.error("Name is required");
    }

    if (password && password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    const updateData = {
      name,
    };

    if (password.trim()) {
      updateData.password = password;
    }

    dispatch(updateUserProfile(updateData));
  };

  // ---------------- SUCCESS ----------------

  useEffect(() => {
    if (success) {
      toast.success("Admin profile updated");

      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    }
  }, [success, dispatch]);

  useEffect(() => {
    dispatch(getAdminStats());
  }, [dispatch]);

  // ---------------- ERROR ----------------

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl tracking-tight text-black">
          Admin Profile
        </h1>

        <p className="mt-3 text-gray-500">
          Manage your admin account and platform settings.
        </p>
      </div>

      {/* GRID */}

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        {/* LEFT CARD */}

        <div className="rounded-4xl bg-linear-to-br from-black to-gray-900 p-8 text-white shadow-lg">
          {/* IMAGE */}

          <img
            src={
              userInfo?.user?.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="mx-auto h-36 w-36 rounded-full border-4 border-white object-cover"
          />

          {/* NAME */}

          <h2 className="mt-6 text-center text-3xl font-extrabold">
            {userInfo?.user?.name}
          </h2>

          {/* ROLE */}

          <p className="mt-2 text-center text-sm uppercase tracking-widest text-gray-300">
            {userInfo?.user?.role}
          </p>

          {/* BADGE */}

          <div className="mt-6 flex justify-center">
            <span className="flex items-center gap-2 rounded-full bg-red-500/20 px-5 py-2 text-sm font-semibold text-red-300">
              <ShieldCheck size={18} />
              Super Admin
            </span>
          </div>

          {/* STATS */}

          {/* STATS */}

          <div className="mt-8 grid gap-3">
            <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
              <span className="text-sm">Platform Users</span>

              <span className="text-lg font-bold">
                {statsLoading ? "..." : stats?.totalUsers || 0}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
              <span className="text-sm">Students</span>

              <span className="text-lg font-bold">
                {statsLoading ? "..." : stats?.totalStudents || 0}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
              <span className="text-sm">Teachers</span>

              <span className="text-lg font-bold">
                {statsLoading ? "..." : stats?.totalTeachers || 0}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
              <span className="text-sm">Courses</span>

              <span className="text-lg font-bold">
                {statsLoading ? "..." : stats?.totalCourses || 0}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
              <span className="text-sm">Enrollments</span>

              <span className="text-lg font-bold">
                {statsLoading ? "..." : stats?.totalEnrollments || 0}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
              <span className="text-sm">New Today</span>

              <span className="text-lg font-bold">
                {statsLoading ? "..." : stats?.newEnrollmentsToday || 0}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}

        <div className="rounded-4xl border border-gray-200 bg-white p-8 shadow-sm">
          <form onSubmit={submitHandler} className="space-y-6">
            {/* NAME */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            {/* EMAIL */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                disabled
                className="w-full cursor-not-allowed rounded-2xl border border-gray-300 bg-gray-100 px-5 py-4 text-gray-500 outline-none"
              />
            </div>

            {/* ROLE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Account Role
              </label>

              <input
                type="text"
                value={userInfo?.user?.role}
                disabled
                className="w-full cursor-not-allowed rounded-2xl border border-gray-300 bg-gray-100 px-5 py-4 capitalize text-gray-500 outline-none"
              />
            </div>

            {/* PASSWORD */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            {/* CONFIRM PASSWORD */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-black py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Updating..." : "Update Admin Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
