import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const inputClass =
  "w-full rounded-xl border border-pebble bg-vellum px-5 py-3.5 text-sm outline-none transition focus:border-obsidian";

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
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl leading-tight text-graphite">
          Student Profile
        </h1>
        <p className="mt-2 text-sm text-slate">
          Manage your personal account information and profile settings.
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="grid gap-3 lg:grid-cols-[300px_1fr]">
        {/* LEFT */}
        <div className="rounded-2xl bg-obsidian p-8 text-center text-vellum">
          <img
            src={
              userInfo?.user?.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="mx-auto h-28 w-28 rounded-full border border-white/15 object-cover"
          />

          <h2 className="mt-6 text-xl font-semibold">{userInfo?.user?.name}</h2>

          <p className="mt-2 font-mono text-xs uppercase tracking-[-0.02em] text-mist">
            {userInfo?.user?.role}
          </p>

          <div className="mt-6 inline-flex items-center rounded-pill bg-ember-orange/15 px-4 py-2 font-mono text-xs font-medium text-ember-orange">
            Verified Account
          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-2xl bg-bone p-8">
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-pebble bg-white/40 px-5 py-3.5 text-sm text-slate outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Account Role
              </label>
              <input
                type="text"
                value={userInfo?.user?.role}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-pebble bg-white/40 px-5 py-3.5 text-sm capitalize text-slate outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-pill bg-ember-orange py-3.5 font-mono text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
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
