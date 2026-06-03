import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import toast from "react-hot-toast";

import { updateUserProfile } from "../../actions/userActions";

import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

import { getTeacherCourses } from "../../actions/courseActions";

const TeacherProfile = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const teacherCourses = useSelector((state) => state.teacherCourses);

  const { courses = [] } = teacherCourses;

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
    <div>
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Teacher Profile</h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your mentorship profile, account settings and teaching
          information.
        </p>
      </div>

      {/* PROFILE GRID */}

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* LEFT CARD */}

        <div className="rounded-3xl bg-linear-to-br from-black to-gray-800 p-8 text-white shadow-lg">
          {/* PROFILE IMAGE */}

          <img
            src={
              userInfo?.user?.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            onError={(e) => {
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
            }}
            className="mx-auto h-36 w-36 rounded-full border-4 border-white object-cover"
          />

          {/* NAME */}

          <h2 className="mt-6 text-center text-2xl font-bold">
            {userInfo?.user?.name}
          </h2>

          {/* ROLE */}

          <p className="mt-2 text-center text-sm capitalize text-gray-300">
            {userInfo?.user?.role}
          </p>

          {/* VERIFIED */}

          <div className="mt-6 flex justify-center">
            <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-300">
              {userInfo?.user?.isVerified
                ? "Verified Mentor"
                : "Verification Pending"}
            </span>
          </div>

          {/* STATS */}

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/10 p-4 text-center">
              <h3 className="text-2xl font-bold">{totalCourses}</h3>

              <p className="mt-1 text-xs text-gray-300">Courses</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 text-center">
              <h3 className="text-2xl font-bold">{totalStudents}</h3>

              <p className="mt-1 text-xs text-gray-300">Students</p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}

        <div className="rounded-3xl bg-white p-8 shadow-sm">
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
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
