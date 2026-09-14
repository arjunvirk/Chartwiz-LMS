import "./AdminDashboard.css";
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
  "alphira-admin-input";

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
  const { loading: webinarCreating, error: webinarError } = webinarCreate;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [webinarTitle, setWebinarTitle] = useState("");
  const [webinarDescription, setWebinarDescription] = useState("");
  const [webinarDate, setWebinarDate] = useState("");
  const [webinarTime, setWebinarTime] = useState("");
  const startTime = webinarDate && webinarTime ? `${webinarDate}T${webinarTime}` : "";
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
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const webinarSubmitHandler = async (e) => {
    e.preventDefault();
    if (webinarCreating) return;
    if (!webinarTitle.trim() || !startTime || !Number.isFinite(Number(duration)) || Number(duration) <= 0) {
      toast.error("Enter a session title, start time and a valid duration", { id: "webinar-create" });
      return;
    }
    try {
      await dispatch(createWebinar({
        title: webinarTitle.trim(),
        description: webinarDescription,
        startTime,
        duration: Number(duration),
      }));
      toast.success("Webinar created successfully", { id: "webinar-create" });
      setWebinarTitle("");
      setWebinarDescription("");
      setWebinarDate("");
      setWebinarTime("");
      setDuration(60);
      dispatch(listWebinars());
    } catch (error) {
      toast.error(error.message || "Unable to create webinar", { id: "webinar-create" });
    }
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


  return (
    <div className="alphira-admin">
      {/* HEADER */}
      <div className="alphira-admin-heading">
        <div>
          <h1 className="alphira-admin-title">
            Platform overview
          </h1>
          <p className="mt-2 text-sm text-slate">
            Manage users, teachers and platform analytics from one place.
          </p>
        </div>

        <div className="alphira-admin-status">
          <p className="font-mono text-xs uppercase text-mist">
            LMS Platform Status
          </p>
          <h2 className="mt-1 text-xl font-semibold text-ember-orange">
            Active
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="alphira-admin-loading" role="status">
          <span>Loading platform overview…</span>
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-obsidian border-t-transparent" />
        </div>
      ) : (
        <>
          {/* PLATFORM OVERVIEW */}
          <div className="alphira-admin-overview">
            <div className="alphira-admin-panel">
              <h2 className="text-xl font-semibold text-graphite">
                Platform Growth Analytics
              </h2>
              <p className="mt-1 text-sm text-slate">
                Students, teachers, leads and courses — month by month.
              </p>

              {analytics.length === 0 && <p className="alphira-admin-empty">No growth data available yet.</p>}
              <div className="alphira-admin-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics}>
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#8a7964" fontSize={12} />
                    <YAxis stroke="#8a7964" fontSize={12} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #dce1d4", borderRadius: 0, fontSize: 12 }} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#20251f"
                      strokeWidth={2.5}
                    />
                    <Line
                      type="monotone"
                      dataKey="teachers"
                      stroke="#66745b" strokeDasharray="6 3"
                      strokeWidth={2.5}
                    />
                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="#8a7964"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="courses"
                      stroke="#899b94" strokeDasharray="2 3"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="alphira-admin-summary">
              <h2 className="font-serif text-2xl leading-tight">
                Alphira LMS
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-mist">
                Professional stock market learning management platform with
                mentorship, trading education and live market analytics.
              </p>

              <div className="alphira-admin-summary-grid">
                <div className="alphira-admin-summary-item">
                  <h3 className="font-mono text-2xl font-medium">
                    {stats?.totalStudents || 0}
                  </h3>
                  <p className="mt-2 text-xs text-mist">Active Students</p>
                </div>
                <div className="alphira-admin-summary-item">
                  <h3 className="font-mono text-2xl font-medium">
                    {stats?.totalTeachers || 0}
                  </h3>
                  <p className="mt-2 text-xs text-mist">Mentors</p>
                </div>
                <div className="alphira-admin-summary-item">
                  <h3 className="font-mono text-2xl font-medium">
                    {stats?.totalCourses || 0}
                  </h3>
                  <p className="mt-2 text-xs text-mist">Published Courses</p>
                </div>
                <div className="alphira-admin-summary-item">
                  <h3 className="font-mono text-2xl font-medium">
                    {stats?.totalLeads || 0}
                  </h3>
                  <p className="mt-2 text-xs text-mist">Total Leads</p>
                </div>
              </div>
            </div>
          </div>

          <div className="alphira-admin-users">
            {/* USERS TABLE */}
            <div className="alphira-admin-panel">
              <h2 className="text-lg font-semibold text-graphite">
                Platform Users
              </h2>
              <p className="mt-1 text-sm text-slate">
                Manage teachers, students and admins.
              </p>

              <div className="mt-6 space-y-3">
                {users.length === 0 && <p className="alphira-admin-empty">No platform users to display.</p>}
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="alphira-admin-user-row"
                  >
                    <div className="alphira-admin-user-info">
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

                    <div className="alphira-admin-actions">
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
          <div className="alphira-admin-webinars">
            <div className="alphira-admin-panel">
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

              <form onSubmit={webinarSubmitHandler} className="alphira-admin-form" aria-busy={!!webinarCreating}>
                {webinarError && <p role="alert" className="alphira-admin-empty">Could not create webinar: {webinarError}</p>}
                <label htmlFor="admin-webinar-title">Session title</label>
                <input
                  type="text"
                  id="admin-webinar-title" placeholder="Webinar Title"
                  value={webinarTitle}
                  onChange={(e) => setWebinarTitle(e.target.value)}
                  className={inputClass}
                />
                <label htmlFor="admin-webinar-description">Description</label>
                <textarea
                  id="admin-webinar-description" placeholder="Description"
                  value={webinarDescription}
                  onChange={(e) => setWebinarDescription(e.target.value)}
                  className={inputClass}
                />
                <fieldset className="alphira-webinar-schedule">
                  <legend>Session schedule</legend>
                  <div className="alphira-webinar-zone"><span>PLAN YOUR SESSION</span><span>IST · UTC +05:30</span></div>
                  <div className="alphira-webinar-date-time">
                    <div><label htmlFor="admin-webinar-date">Date</label><input id="admin-webinar-date" type="date" value={webinarDate} onChange={(event) => setWebinarDate(event.target.value)} required /></div>
                    <div><label htmlFor="admin-webinar-time">Start time</label><input id="admin-webinar-time" type="time" value={webinarTime} onChange={(event) => setWebinarTime(event.target.value)} required /><small>India Standard Time</small></div>
                  </div>
                  <div className="alphira-webinar-duration-heading"><label htmlFor="admin-webinar-duration">Session length</label><span>Choose a preset or enter minutes</span></div>
                  <div className="alphira-webinar-duration-presets" role="group" aria-label="Duration presets">{[30, 45, 60, 90].map((minutes) => <button key={minutes} type="button" aria-pressed={Number(duration) === minutes} onClick={() => setDuration(minutes)}>{minutes}<span>min</span></button>)}</div>
                  <div className="alphira-webinar-duration-input"><input id="admin-webinar-duration" type="number" min="1" step="1" required value={duration} onChange={(event) => setDuration(event.target.value)} /><span aria-hidden="true">minutes</span></div>
                </fieldset>
                <button
                  type="submit"
                  className="alphira-admin-create-webinar"
                  disabled={webinarCreating}
                >
                  {webinarCreating ? "Creating webinar…" : "Create Webinar"}
                </button>
              </form>
            </div>

            <div className="alphira-admin-panel">
              <h2 className="text-lg font-semibold text-graphite">
                Scheduled Webinars
              </h2>

              <div className="mt-6 space-y-3">
                {webinars.length === 0 && <p className="alphira-admin-empty">No webinars scheduled yet. Create a session to get started.</p>}
                {webinars.map((webinar) => (
                  <div
                    key={webinar._id}
                    className="alphira-admin-webinar-row"
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

                    <div className="alphira-admin-actions">
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


