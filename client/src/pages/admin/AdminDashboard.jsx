import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { GraduationCap, Trash2, Crown, UserPlus, Video, Users, BookOpen, ArrowUpRight, ClipboardList, CreditCard, Receipt, Search } from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
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
  const [userQuery, setUserQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

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


  const query = userQuery.trim().toLowerCase();
  const visibleUsers = users.filter((user) => (roleFilter === "all" || user.role === roleFilter) && (!query || `${user.name} ${user.email}`.toLowerCase().includes(query)));
  const roleCounts = users.reduce((acc, user) => ({ ...acc, [user.role]: (acc[user.role] || 0) + 1 }), {});
  const kpis = [
    { label: "Students", value: stats?.totalStudents, icon: GraduationCap, hint: "Active learner accounts" },
    { label: "Mentors", value: stats?.totalTeachers, icon: Users, hint: "Teachers on the platform" },
    { label: "Courses", value: stats?.totalCourses, icon: BookOpen, hint: "Published programs" },
    { label: "Leads", value: stats?.totalLeads, icon: UserPlus, hint: "Open the lead pipeline", to: "/admin/dashboard/leads" },
  ];
  const series = [
    { key: "students", label: "Students", color: "var(--ac-moss-900)", width: 2.5 },
    { key: "leads", label: "Leads", color: "var(--ac-sage-500)", width: 2 },
    { key: "teachers", label: "Teachers", color: "var(--ac-gold-600)", width: 2, dash: "5 4" },
    { key: "courses", label: "Courses", color: "var(--ac-moss-400)", width: 2, dash: "2 4" },
  ];
  const quickLinks = [
    { to: "/admin/dashboard/admissions", label: "Review admissions", hint: "Approve new applications", icon: ClipboardList },
    { to: "/admin/dashboard/leads", label: "Follow up leads", hint: "Calls and demo bookings", icon: Users },
    { to: "/admin/dashboard/payments", label: "Record a payment", hint: "Offline fees and receipts", icon: CreditCard },
    { to: "/admin/dashboard/invoices", label: "Invoices", hint: "Download billing records", icon: Receipt },
  ];
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
  const initials = (value = "") => value.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?";

  return (
    <div className="alphira-admin">
      <header className="alphira-admin-heading">
        <div>
          <p className="alphira-admin-date">{today}</p>
          <h1 className="alphira-admin-title">Platform overview</h1>
          <p className="alphira-admin-lede">Students, mentors, enquiries and sessions across Alphira Capital.</p>
        </div>
        <span className="alphira-admin-status"><i aria-hidden="true" />Platform active</span>
      </header>

      {loading ? (
        <div className="alphira-admin-kpis" role="status" aria-label="Loading platform overview">
          {[0, 1, 2, 3].map((i) => <div key={i} className="alphira-admin-kpi"><span className="ac-skeleton" style={{ width: "40%" }} /><span className="ac-skeleton" style={{ width: "55%", height: 34, marginTop: 18 }} /></div>)}
        </div>
      ) : (
        <>
          <section className="alphira-admin-kpis" aria-label="Key figures">
            {kpis.map(({ label, value, icon: Icon, hint, to }) => {
              const body = <><div className="alphira-admin-kpi-top"><span>{label}</span><Icon size={17} aria-hidden="true" /></div><strong className="ac-metric">{(value ?? 0).toLocaleString("en-IN")}</strong><small>{hint}{to && <ArrowUpRight size={13} aria-hidden="true" />}</small></>;
              return to ? <Link key={label} to={to} className="alphira-admin-kpi is-link">{body}</Link> : <div key={label} className="alphira-admin-kpi">{body}</div>;
            })}
          </section>

          <div className="alphira-admin-overview">
            <section className="alphira-admin-panel" aria-labelledby="admin-growth-title">
              <div className="alphira-admin-panel-head">
                <div><h2 id="admin-growth-title">Growth</h2><p>New sign-ups and enquiries, month by month.</p></div>
                <ul className="alphira-admin-legend" aria-label="Chart legend">{series.map((s) => <li key={s.key}><i style={{ borderTopColor: s.color, borderTopStyle: s.dash ? "dashed" : "solid" }} aria-hidden="true" />{s.label}</li>)}</ul>
              </div>
              {analytics.length === 0 ? <p className="alphira-admin-empty">Growth data appears here once students and leads start coming in.</p> : (
                <div className="alphira-admin-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                      <CartesianGrid stroke="var(--ac-moss-200)" vertical={false} />
                      <XAxis dataKey="month" stroke="var(--ac-moss-500)" fontSize={12} tickLine={false} axisLine={false} dy={8} />
                      <YAxis stroke="var(--ac-moss-500)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip cursor={{ stroke: "var(--ac-moss-300)" }} content={({ active, payload, label }) => active && payload?.length ? (
                        <div className="alphira-admin-tooltip"><strong>{label}</strong>{payload.map((item) => <span key={item.dataKey}><i style={{ background: item.stroke }} aria-hidden="true" />{series.find((s) => s.key === item.dataKey)?.label}<b>{item.value}</b></span>)}</div>
                      ) : null} />
                      {series.map((s) => <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={s.width} strokeDasharray={s.dash} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />)}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </section>

            <nav className="alphira-admin-quick" aria-label="Quick actions">
              <h2>Today’s work</h2>
              {quickLinks.map(({ to, label, hint, icon: Icon }) => (
                <Link key={to} to={to} className="alphira-admin-quick-link"><Icon size={18} aria-hidden="true" /><span><strong>{label}</strong><small>{hint}</small></span><ArrowUpRight size={16} aria-hidden="true" /></Link>
              ))}
            </nav>
          </div>

          <section className="alphira-admin-panel alphira-admin-users" aria-labelledby="admin-users-title">
            <div className="alphira-admin-panel-head">
              <div><h2 id="admin-users-title">People</h2><p>Change roles or remove accounts. {users.length} total.</p></div>
              <div className="alphira-admin-filters">
                <label className="alphira-admin-search"><Search size={16} aria-hidden="true" /><span className="sr-only">Search people</span><input type="search" placeholder="Search name or email" value={userQuery} onChange={(event) => setUserQuery(event.target.value)} /></label>
                <div className="alphira-admin-segments" role="group" aria-label="Filter by role">
                  {["all", "student", "teacher", "admin"].map((value) => <button key={value} type="button" aria-pressed={roleFilter === value} onClick={() => setRoleFilter(value)}>{value === "all" ? "All" : `${value[0].toUpperCase()}${value.slice(1)}s`}<span>{value === "all" ? users.length : roleCounts[value] || 0}</span></button>)}
                </div>
              </div>
            </div>

            {users.length === 0 ? <p className="alphira-admin-empty">No platform users to display yet.</p> : visibleUsers.length === 0 ? <p className="alphira-admin-empty">No one matches “{userQuery}”. Try a different name or clear the filter.</p> : (
              <ul className="alphira-admin-user-list">
                {visibleUsers.map((user) => (
                  <li key={user._id} className="alphira-admin-user-row">
                    <div className="alphira-admin-user-info">
                      <span className="alphira-admin-avatar" aria-hidden="true">{user.profilePic ? <img src={user.profilePic} alt="" onError={(event) => { event.currentTarget.remove(); }} /> : null}{initials(user.name)}</span>
                      <div>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="alphira-admin-user-tags">
                      <span className={`ac-badge alphira-role-${user.role}`}>{user.role}</span>
                      {user.status === "pending" ? <span className="ac-badge ac-badge-warning">Pending verification</span> : <span className="ac-badge ac-badge-positive">Verified</span>}
                    </div>
                    <div className="alphira-admin-actions">
                      {user.status === "pending" ? (
                        <button type="button" onClick={() => deleteHandler(user._id, user.status)} className="ac-btn ac-btn-danger"><Trash2 size={15} aria-hidden="true" />Delete invite</button>
                      ) : (
                        <>
                          {user.role !== "teacher" && <button type="button" onClick={() => roleHandler(user._id, "teacher")} className="ac-btn ac-btn-secondary"><GraduationCap size={15} aria-hidden="true" />Make teacher</button>}
                          {user.role !== "admin" && <button type="button" onClick={() => roleHandler(user._id, "admin")} className="ac-btn ac-btn-secondary"><Crown size={15} aria-hidden="true" />Make admin</button>}
                          <button type="button" onClick={() => deleteHandler(user._id, user.status)} className="ac-btn ac-btn-danger" aria-label={`Delete ${user.name}`}><Trash2 size={15} aria-hidden="true" /><span className="alphira-admin-action-label">Delete</span></button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="alphira-admin-webinars">
            <section className="alphira-admin-panel" aria-labelledby="admin-webinar-create-title">
              <div className="alphira-admin-panel-head">
                <div><h2 id="admin-webinar-create-title">Schedule a webinar</h2><p>Creates a Google Meet session for students.</p></div>
                <Video size={20} aria-hidden="true" className="alphira-admin-head-icon" />
              </div>

              <form onSubmit={webinarSubmitHandler} className="alphira-admin-form" aria-busy={!!webinarCreating}>
                {webinarError && <p role="alert" className="alphira-admin-error">Could not create webinar: {webinarError}</p>}
                <label htmlFor="admin-webinar-title">Session title</label>
                <input type="text" id="admin-webinar-title" placeholder="e.g. Weekly market outlook" value={webinarTitle} onChange={(e) => setWebinarTitle(e.target.value)} className={inputClass} />
                <label htmlFor="admin-webinar-description">Description <span className="alphira-admin-optional">Optional</span></label>
                <textarea id="admin-webinar-description" placeholder="What will students learn in this session?" value={webinarDescription} onChange={(e) => setWebinarDescription(e.target.value)} className={inputClass} />
                <fieldset className="alphira-webinar-schedule">
                  <legend>Schedule</legend>
                  <div className="alphira-webinar-zone"><span>Times are in India Standard Time</span><span>UTC +05:30</span></div>
                  <div className="alphira-webinar-date-time">
                    <div><label htmlFor="admin-webinar-date">Date</label><input id="admin-webinar-date" type="date" value={webinarDate} onChange={(event) => setWebinarDate(event.target.value)} required /></div>
                    <div><label htmlFor="admin-webinar-time">Start time</label><input id="admin-webinar-time" type="time" value={webinarTime} onChange={(event) => setWebinarTime(event.target.value)} required /></div>
                  </div>
                  <div className="alphira-webinar-duration-heading"><label htmlFor="admin-webinar-duration">Length</label><span>Pick a preset or type minutes</span></div>
                  <div className="alphira-webinar-duration-presets" role="group" aria-label="Duration presets">{[30, 45, 60, 90].map((minutes) => <button key={minutes} type="button" aria-pressed={Number(duration) === minutes} onClick={() => setDuration(minutes)}>{minutes}<span>min</span></button>)}</div>
                  <div className="alphira-webinar-duration-input"><input id="admin-webinar-duration" type="number" min="1" step="1" required value={duration} onChange={(event) => setDuration(event.target.value)} /><span aria-hidden="true">minutes</span></div>
                </fieldset>
                <button type="submit" className="alphira-admin-create-webinar" disabled={webinarCreating}>
                  {webinarCreating ? <><span className="ac-spinner" aria-hidden="true" />Scheduling…</> : "Schedule webinar"}
                </button>
              </form>
            </section>

            <section className="alphira-admin-panel" aria-labelledby="admin-webinar-list-title">
              <div className="alphira-admin-panel-head"><div><h2 id="admin-webinar-list-title">Scheduled webinars</h2><p>{webinars.length ? `${webinars.length} session${webinars.length === 1 ? "" : "s"}` : "Nothing scheduled"}</p></div></div>
              {webinars.length === 0 ? <p className="alphira-admin-empty">No webinars yet. Sessions you schedule appear here with their Meet link.</p> : (
                <ul className="alphira-admin-webinar-list">
                  {webinars.map((webinar) => {
                    const start = new Date(webinar.startTime);
                    const past = start.getTime() + (webinar.duration || 60) * 60000 < Date.now();
                    return (
                      <li key={webinar._id} className={`alphira-admin-webinar-row${past ? " is-past" : ""}`}>
                        <time dateTime={webinar.startTime} className="alphira-admin-webinar-date"><b>{start.toLocaleDateString("en-IN", { day: "numeric" })}</b>{start.toLocaleDateString("en-IN", { month: "short" })}</time>
                        <div className="alphira-admin-webinar-body">
                          <h3>{webinar.title}</h3>
                          {webinar.description && <p>{webinar.description}</p>}
                          <small>{start.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })} IST · {webinar.duration} min{past ? " · Ended" : ""}</small>
                        </div>
                        <div className="alphira-admin-actions">
                          {webinar.meetLink && <a href={webinar.meetLink} target="_blank" rel="noreferrer" className="ac-btn ac-btn-secondary">Open Meet<ArrowUpRight size={14} aria-hidden="true" /></a>}
                          <button type="button" onClick={() => deleteWebinarHandler(webinar._id)} className="ac-btn ac-btn-danger" aria-label={`Delete ${webinar.title}`}><Trash2 size={15} aria-hidden="true" /></button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;



