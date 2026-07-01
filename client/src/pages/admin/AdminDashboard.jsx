import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Users,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  Trash2,
  Crown,
  UserPlus,
} from "lucide-react";  

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  getAdminStats,
  getAllUsers,
  deleteUser,
  updateUserRole,
  createUser,
} from "../../actions/adminActions";

import { API_URL } from "../../config/api";

import { getAdminAnalytics } from "../../actions/adminActions";

import { CalendarDays, Video } from "lucide-react";

import {
  createWebinar,
  listWebinars,
  deleteWebinar,
} from "../../actions/webinarActions";

import toast from "react-hot-toast";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const adminStats = useSelector((state) => state.adminStats);

  const { loading, error, stats } = adminStats;

  const adminUsers = useSelector((state) => state.adminUsers);

  const { users = [] } = adminUsers;

  const adminAnalytics = useSelector((state) => state.adminAnalytics);

  const { analytics = [] } = adminAnalytics;

  const webinarList = useSelector((state) => state.webinarList);

  const { webinars = [] } = webinarList;

  const webinarCreate = useSelector((state) => state.webinarCreate);

  const { success: webinarCreated } = webinarCreate;

  // ================= CREATE USER FORM =================

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("student");

  const [webinarTitle, setWebinarTitle] = useState("");

  const [webinarDescription, setWebinarDescription] = useState("");

  const [startTime, setStartTime] = useState("");

  const [duration, setDuration] = useState(60);

  // ---------------- FETCH STATS ----------------
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) return;

    dispatch(getAdminStats());
    dispatch(getAllUsers());
    dispatch(getAdminAnalytics());
    dispatch(listWebinars());
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (webinarCreated) {
      dispatch(listWebinars());

      toast.success("Webinar created successfully");
    }
  }, [webinarCreated, dispatch]);

  // ---------------- ERROR ----------------

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const webinarSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createWebinar({
        title: webinarTitle,
        description: webinarDescription,
        startTime,
        duration,
      }),
    );

    setWebinarTitle("");

    setWebinarDescription("");

    setStartTime("");

    setDuration(60);
  };

  // ================= DELETE USER =================

  const deleteHandler = async (id, status) => {
    if (!window.confirm("Delete this user?")) {
      return;
    }

    try {
      const endpoint =
        status === "pending"
          ? `${API_URL}/api/admin/pending-users/${id}`
          : `${API_URL}/api/admin/users/${id}`;

      const response = await fetch(endpoint, {
        method: "DELETE",

        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message);

      dispatch(getAllUsers());

      dispatch(getAdminStats());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteWebinarHandler = async (id) => {
    if (!window.confirm("Delete this webinar?")) {
      return;
    }

    try {
      await dispatch(deleteWebinar(id));

      dispatch(listWebinars());

      toast.success("Webinar deleted");
    } catch (error) {
      toast.error("Failed to delete webinar");
    }
  };
  // ================= CHANGE ROLE =================

  const roleHandler = async (id, newRole) => {
    try {
      await dispatch(updateUserRole(id, newRole));

      await dispatch(getAllUsers());

      await dispatch(getAdminStats());

      toast.success("Role updated");
    } catch (error) {
      toast.error("Failed to update role");
    }
  };
  // ================= CREATE USER =================

  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(
      createUser({
        name,
        email,
        password,
        role,
      }),
    );

    dispatch(getAllUsers());

    dispatch(getAdminStats());

    setName("");
    setEmail("");
    setPassword("");
    setRole("student");
  };

  const chartData = [
    {
      name: "Students",
      value: stats?.totalStudents || 0,
    },

    {
      name: "Teachers",
      value: stats?.totalTeachers || 0,
    },

    {
      name: "Courses",
      value: stats?.totalCourses || 0,
    },

    {
      name: "Leads",
      value: stats?.totalLeads || 0,
    },

    {
      name: "Enrollments",
      value: stats?.totalEnrollments || 0,
    },
  ];

  return (
    <div>
      {/* HEADER */}

      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-black">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-base text-gray-500">
            Manage users, teachers and platform analytics from one place.
          </p>
        </div>

        {/* STATUS */}

        <div className="rounded-2xl bg-black px-6 py-4 text-white shadow-lg">
          <p className="text-sm text-gray-300">LMS Platform Status</p>

          <h2 className="mt-1 text-2xl font-bold">Active</h2>
        </div>
      </div>

      {/* LOADING */}

      {loading ? (
        <div className="flex h-60 items-center justify-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      ) : (
        <>
          {/* STATS GRID */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Students
              </p>

              <h2 className="mt-3 text-4xl font-extrabold text-black">
                {stats?.totalStudents || 0}
              </h2>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Teachers
              </p>

              <h2 className="mt-3 text-4xl font-extrabold text-black">
                {stats?.totalTeachers || 0}
              </h2>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Total Courses</p>

              <h2 className="mt-3 text-4xl font-extrabold text-black">
                {stats?.totalCourses || 0}
              </h2>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Total Leads</p>

              <h2 className="mt-3 text-4xl font-extrabold text-black">
                {stats?.totalLeads || 0}
              </h2>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Enrollments
              </p>

              <h2 className="mt-3 text-4xl font-extrabold text-black">
                {stats?.totalEnrollments || 0}
              </h2>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                New Students Today
              </p>

              <h2 className="mt-3 text-4xl font-extrabold text-black">
                {stats?.newEnrollmentsToday || 0}
              </h2>
            </div>
          </div>

          {/* PLATFORM OVERVIEW */}

          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            {/* LEFT */}

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold text-black">
                Platform Growth Analytics
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Monthly growth of students, teachers, leads and courses.
              </p>

              <div className="mt-8 h-100">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#000000"
                      strokeWidth={3}
                    />

                    <Line
                      type="monotone"
                      dataKey="teachers"
                      stroke="#16a34a"
                      strokeWidth={3}
                    />

                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="#2563eb"
                      strokeWidth={3}
                    />

                    <Line
                      type="monotone"
                      dataKey="courses"
                      stroke="#dc2626"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* RIGHT */}

            <div className="rounded-3xl bg-linear-to-br from-black to-gray-900 p-8 text-white shadow-lg">
              <h2 className="text-3xl font-extrabold">ChartWiz LMS</h2>

              <p className="mt-4 text-gray-300">
                Professional stock market learning management platform with
                mentorship, trading education and live market analytics.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-5">
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
                  <h3 className="text-3xl font-extrabold">
                    {stats?.totalStudents || 0}
                  </h3>

                  <p className="mt-2 text-sm text-gray-300">Active Students</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
                  <h3 className="text-3xl font-extrabold">
                    {stats?.totalTeachers || 0}
                  </h3>

                  <p className="mt-2 text-sm text-gray-300">Mentors</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
                  <h3 className="text-3xl font-extrabold">
                    {stats?.totalCourses || 0}
                  </h3>

                  <p className="mt-2 text-sm text-gray-300">
                    Published Courses
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
                  <h3 className="text-3xl font-extrabold">
                    {stats?.totalLeads || 0}
                  </h3>

                  <p className="mt-2 text-sm text-gray-300">Total Leads</p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= USER MANAGEMENT ================= */}

          <div className="mt-10 grid gap-8 xl:grid-cols-[420px_1fr]">
            {/* CREATE USER */}

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                  <UserPlus size={26} />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-black">
                    Create User
                  </h2>

                  <p className="text-sm text-gray-500">
                    Add students and teachers
                  </p>
                </div>
              </div>

              {/* FORM */}

              <form onSubmit={submitHandler} className="mt-8 space-y-5">
                {/* NAME */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-black"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-black"
                  />
                </div>

                {/* PASSWORD */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-black"
                  />
                </div>

                {/* ROLE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Role
                  </label>

                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-black"
                  >
                    <option value="student">Student</option>

                    <option value="teacher">Teacher</option>

                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-black py-4 font-semibold text-white transition hover:bg-gray-800"
                >
                  Create User
                </button>
              </form>
            </div>

            {/* USERS TABLE */}

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-black">
                    Platform Users
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Manage teachers, students and admins.
                  </p>
                </div>
              </div>

              {/* USERS */}

              <div className="mt-8 space-y-5">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="flex flex-col gap-5 rounded-3xl border border-gray-200 p-6 lg:flex-row lg:items-center lg:justify-between"
                  >
                    {/* LEFT */}

                    <div className="flex items-center gap-4">
                      <img
                        src={user.profilePic}
                        alt="profile"
                        className="h-16 w-16 rounded-full border object-cover"
                      />

                      <div>
                        <h3 className="text-xl font-bold text-black">
                          {user.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {user.email}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {/* ROLE */}

                          <span className="inline-block rounded-full bg-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                            {user.role}
                          </span>

                          {/* STATUS */}

                          {user.status === "pending" ? (
                            <span className="inline-block rounded-full bg-yellow-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-700">
                              Pending Verification
                            </span>
                          ) : (
                            <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-700">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    {/* ACTIONS */}

                    <div className="flex flex-wrap gap-3">
                      {/* PENDING USER */}

                      {user.status === "pending" ? (
                        <>
                          <div className="rounded-2xl bg-yellow-100 px-5 py-3 text-sm font-semibold text-yellow-700">
                            Waiting For Email Verification
                          </div>

                          {/* DELETE PENDING USER */}

                          <button
                            onClick={() => deleteHandler(user._id, user.status)}
                            className="flex items-center gap-2 rounded-2xl border border-red-300 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={16} />
                            Delete Invite
                          </button>
                        </>
                      ) : (
                        <>
                          {/* MAKE TEACHER */}

                          {user.role !== "teacher" && (
                            <button
                              onClick={() => roleHandler(user._id, "teacher")}
                              className="flex items-center gap-2 rounded-2xl border border-green-300 px-5 py-3 text-sm font-semibold text-green-600 transition hover:bg-green-500 hover:text-white"
                            >
                              <GraduationCap size={16} />
                              Make Teacher
                            </button>
                          )}

                          {/* MAKE ADMIN */}

                          {user.role !== "admin" && (
                            <button
                              onClick={() => roleHandler(user._id, "admin")}
                              className="flex items-center gap-2 rounded-2xl border border-black px-5 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                            >
                              <Crown size={16} />
                              Make Admin
                            </button>
                          )}

                          {/* DELETE VERIFIED USER */}

                          <button
                            onClick={() => deleteHandler(user._id, user.status)}
                            className="flex items-center gap-2 rounded-2xl border border-red-300 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 xl:grid-cols-[420px_1fr]">
            {/* CREATE WEBINAR */}

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                  <Video size={26} />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-black">
                    Create Webinar
                  </h2>

                  <p className="text-sm text-gray-500">
                    Schedule a Google Meet session
                  </p>
                </div>
              </div>

              <form onSubmit={webinarSubmitHandler} className="mt-8 space-y-5">
                <input
                  type="text"
                  placeholder="Webinar Title"
                  value={webinarTitle}
                  onChange={(e) => setWebinarTitle(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 px-5 py-4"
                />

                <textarea
                  placeholder="Description"
                  value={webinarDescription}
                  onChange={(e) => setWebinarDescription(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 px-5 py-4"
                />

                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 px-5 py-4"
                />

                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 px-5 py-4"
                />

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-black py-4 font-semibold text-white"
                >
                  Create Webinar
                </button>
              </form>
            </div>

            {/* WEBINAR LIST */}

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold">Scheduled Webinars</h2>

              <div className="mt-8 space-y-4">
                {webinars.map((webinar) => (
                  <div
                    key={webinar._id}
                    className="rounded-2xl border border-gray-200 p-5"
                  >
                    <h3 className="text-lg font-bold">{webinar.title}</h3>

                    <p className="mt-2 text-gray-500">{webinar.description}</p>

                    <p className="mt-3 text-sm text-gray-500">
                      {new Date(webinar.startTime).toLocaleString()}
                    </p>

                    <a
                      href={webinar.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block rounded-xl bg-black px-5 py-3 text-white"
                    >
                      Open Meet Link
                    </a>

                    <button
                      onClick={() => deleteWebinarHandler(webinar._id)}
                      className="rounded-xl border border-red-300 px-5 py-3 mx-4 text-red-500 transition hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
