import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GraduationCap, Trash2, Crown, UserPlus, Video } from "lucide-react";

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
  getAdminAnalytics,
} from "../../actions/adminActions";

import { API_URL } from "../../config/api";

import {
  createWebinar,
  listWebinars,
  deleteWebinar,
} from "../../actions/webinarActions";

import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-xl border border-pebble bg-vellum px-5 py-3.5 text-sm outline-none focus:border-obsidian";

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [webinarTitle, setWebinarTitle] = useState("");
  const [webinarDescription, setWebinarDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(60);

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

  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(createUser({ name, email, password, role }));
    dispatch(getAllUsers());
    dispatch(getAdminStats());

    setName("");
    setEmail("");
    setPassword("");
    setRole("student");
  };

  const STAT_CARDS = [
    { label: "Total Students", value: stats?.totalStudents },
    { label: "Total Teachers", value: stats?.totalTeachers },
    { label: "Total Courses", value: stats?.totalCourses },
    { label: "Total Leads", value: stats?.totalLeads },
    { label: "Total Enrollments", value: stats?.totalEnrollments },
    { label: "New Students Today", value: stats?.newEnrollmentsToday },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-serif text-3xl leading-tight text-graphite">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate">
            Manage users, teachers and platform analytics from one place.
          </p>
        </div>

        <div className="rounded-2xl bg-obsidian px-6 py-4 text-vellum">
          <p className="font-mono text-xs uppercase text-mist">
            LMS Platform Status
          </p>
          <h2 className="mt-1 text-xl font-semibold text-ember-orange">
            Active
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-obsidian border-t-transparent" />
        </div>
      ) : (
        <>
          {/* STATS GRID */}
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {STAT_CARDS.map((card) => (
              <div key={card.label} className="rounded-2xl bg-bone p-6">
                <p className="text-sm font-medium text-slate">{card.label}</p>
                <h2 className="mt-3 font-mono text-3xl font-medium text-graphite">
                  {card.value || 0}
                </h2>
              </div>
            ))}
          </div>

          {/* PLATFORM OVERVIEW */}
          <div className="mt-8 grid gap-3 xl:grid-cols-2">
            <div className="rounded-2xl bg-bone p-8">
              <h2 className="text-xl font-semibold text-graphite">
                Platform Growth Analytics
              </h2>
              <p className="mt-1 text-sm text-slate">
                Monthly growth of students, teachers, leads and courses.
              </p>

              <div className="mt-8 h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics}>
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                    <YAxis stroke="#71717a" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#18181b"
                      strokeWidth={2.5}
                    />
                    <Line
                      type="monotone"
                      dataKey="teachers"
                      stroke="#ff7817"
                      strokeWidth={2.5}
                    />
                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="#71717a"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="courses"
                      stroke="#a1a1aa"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl bg-obsidian p-8 text-vellum">
              <h2 className="font-serif text-2xl leading-tight">
                Alphira LMS
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-mist">
                Professional stock market learning management platform with
                mentorship, trading education and live market analytics.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 p-5">
                  <h3 className="font-mono text-2xl font-medium">
                    {stats?.totalStudents || 0}
                  </h3>
                  <p className="mt-2 text-xs text-mist">Active Students</p>
                </div>
                <div className="rounded-xl border border-white/10 p-5">
                  <h3 className="font-mono text-2xl font-medium">
                    {stats?.totalTeachers || 0}
                  </h3>
                  <p className="mt-2 text-xs text-mist">Mentors</p>
                </div>
                <div className="rounded-xl border border-white/10 p-5">
                  <h3 className="font-mono text-2xl font-medium">
                    {stats?.totalCourses || 0}
                  </h3>
                  <p className="mt-2 text-xs text-mist">Published Courses</p>
                </div>
                <div className="rounded-xl border border-white/10 p-5">
                  <h3 className="font-mono text-2xl font-medium">
                    {stats?.totalLeads || 0}
                  </h3>
                  <p className="mt-2 text-xs text-mist">Total Leads</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 xl:grid-cols-[1fr]">
            {/* USERS TABLE */}
            <div className="rounded-2xl bg-bone p-8">
              <h2 className="text-lg font-semibold text-graphite">
                Platform Users
              </h2>
              <p className="mt-1 text-sm text-slate">
                Manage teachers, students and admins.
              </p>

              <div className="mt-6 space-y-3">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="flex flex-col gap-5 rounded-2xl border border-pebble bg-vellum p-5 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={user.profilePic}
                        alt="profile"
                        className="h-14 w-14 rounded-full border border-pebble object-cover"
                      />
                      <div>
                        <h3 className="text-base font-semibold text-graphite">
                          {user.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate">{user.email}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="inline-block rounded-[600px] bg-obsidian px-3 py-1 font-mono text-[11px] uppercase text-vellum">
                            {user.role}
                          </span>

                          {user.status === "pending" ? (
                            <span className="inline-block rounded-[600px] border border-pebble px-3 py-1 font-mono text-[11px] uppercase text-slate">
                              Pending Verification
                            </span>
                          ) : (
                            <span className="inline-block rounded-[600px] bg-ember-orange/15 px-3 py-1 font-mono text-[11px] uppercase text-ember-orange">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {user.status === "pending" ? (
                        <>
                          <div className="rounded-xl border border-pebble px-4 py-2.5 text-sm text-slate">
                            Waiting For Verification
                          </div>
                          <button
                            onClick={() => deleteHandler(user._id, user.status)}
                            className="flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={15} />
                            Delete Invite
                          </button>
                        </>
                      ) : (
                        <>
                          {user.role !== "teacher" && (
                            <button
                              onClick={() => roleHandler(user._id, "teacher")}
                              className="flex items-center gap-2 rounded-xl border border-pebble px-4 py-2.5 text-sm font-medium text-graphite transition hover:bg-obsidian hover:text-vellum"
                            >
                              <GraduationCap size={15} />
                              Make Teacher
                            </button>
                          )}

                          {user.role !== "admin" && (
                            <button
                              onClick={() => roleHandler(user._id, "admin")}
                              className="flex items-center gap-2 rounded-xl border border-pebble px-4 py-2.5 text-sm font-medium text-graphite transition hover:bg-ember-orange hover:text-black"
                            >
                              <Crown size={15} />
                              Make Admin
                            </button>
                          )}

                          <button
                            onClick={() => deleteHandler(user._id, user.status)}
                            className="flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={15} />
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

          {/* WEBINARS */}
          <div className="mt-8 grid gap-3 xl:grid-cols-[380px_1fr]">
            <div className="rounded-2xl bg-bone p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-obsidian text-vellum">
                  <Video size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-graphite">
                    Create Webinar
                  </h2>
                  <p className="text-sm text-slate">
                    Schedule a Google Meet session
                  </p>
                </div>
              </div>

              <form onSubmit={webinarSubmitHandler} className="mt-8 space-y-4">
                <input
                  type="text"
                  placeholder="Webinar Title"
                  value={webinarTitle}
                  onChange={(e) => setWebinarTitle(e.target.value)}
                  className={inputClass}
                />
                <textarea
                  placeholder="Description"
                  value={webinarDescription}
                  onChange={(e) => setWebinarDescription(e.target.value)}
                  className={inputClass}
                />
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={inputClass}
                />
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className={inputClass}
                />

                <button
                  type="submit"
                  className="w-full rounded-[600px] bg-obsidian py-3.5 font-mono text-sm font-semibold text-vellum transition hover:bg-ember-orange hover:text-black"
                >
                  Create Webinar
                </button>
              </form>
            </div>

            <div className="rounded-2xl bg-bone p-8">
              <h2 className="text-lg font-semibold text-graphite">
                Scheduled Webinars
              </h2>

              <div className="mt-6 space-y-3">
                {webinars.map((webinar) => (
                  <div
                    key={webinar._id}
                    className="rounded-2xl border border-pebble bg-vellum p-5"
                  >
                    <h3 className="text-base font-semibold text-graphite">
                      {webinar.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate">
                      {webinar.description}
                    </p>
                    <p className="mt-3 text-xs text-slate">
                      {new Date(webinar.startTime).toLocaleString()}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <a
                        href={webinar.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block rounded-[600px] bg-obsidian px-5 py-2.5 font-mono text-xs font-medium text-vellum"
                      >
                        Open Meet Link
                      </a>
                      <button
                        onClick={() => deleteWebinarHandler(webinar._id)}
                        className="rounded-[600px] border border-red-300 px-5 py-2.5 text-xs font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
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
