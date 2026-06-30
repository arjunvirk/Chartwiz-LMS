import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import toast from "react-hot-toast";

import { updateUserProfile } from "../../actions/userActions";

import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const StudentProfile = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const { loading, error, success } = userUpdateProfile;

  const [name, setName] = useState(userInfo?.user?.name || "");

  const [email] = useState(userInfo?.user?.email || "");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  // ---------------- SUBMIT ----------------

  const submitHandler = (e) => {
    e.preventDefault();

    // NAME CHECK

    if (!name.trim()) {
      return toast.error("Name is required");
    }

    // PASSWORD CHECK

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (password && password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    // DISPATCH ACTION

    const updateData = {
      name,
    };

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

  // ---------------- SUCCESS TOAST ----------------

  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully");

      setPassword("");
      setConfirmPassword("");

      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    }
  }, [success, dispatch]);

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
        <h1 className="text-3xl font-bold text-gray-800">Student Profile</h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your personal account information and profile settings.
        </p>
      </div>

      {/* PROFILE CARD */}

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* LEFT */}

        <div className="rounded-3xl bg-linear-to-br from-black to-gray-800 p-8 text-center text-white shadow-lg">
          {/* PROFILE IMAGE */}

          <img
            src={
              userInfo?.user?.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="mx-auto h-32 w-32 rounded-full border-4 border-white object-cover"
          />

          {/* NAME */}

          <h2 className="mt-6 text-2xl font-bold">{userInfo?.user?.name}</h2>

          {/* ROLE */}

          <p className="mt-2 text-sm capitalize text-gray-300">
            {userInfo?.user?.role}
          </p>

          {/* VERIFIED */}

          <div className="mt-6 inline-flex items-center rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-300">
            Verified Account
          </div>
        </div>

        {/* RIGHT */}

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          {/* FORM */}

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

            {/* NEW PASSWORD */}

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

export default StudentProfile;
