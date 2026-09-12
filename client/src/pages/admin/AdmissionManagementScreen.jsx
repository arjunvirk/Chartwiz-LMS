import "./AdmissionManagementScreen.css";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GraduationCap, Search, CalendarDays, Eye } from "lucide-react";

import { getAdmissions, deleteAdmission } from "../../actions/admissionActions";

const AdmissionManagementScreen = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const admissionList = useSelector((state) => state.admissionList);
  const { loading, error, admissions = [] } = admissionList;

  const admissionDelete = useSelector((state) => state.admissionDelete);
  const { success: successDelete } = admissionDelete;

  const admissionUpdate = useSelector((state) => state.admissionUpdate);
  const { success: successUpdate } = admissionUpdate;

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) return;
    dispatch(getAdmissions());
  }, [dispatch, successDelete, successUpdate, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Delete this admission?")) {
      dispatch(deleteAdmission(id));
    }
  };

  const filteredAdmissions = useMemo(() => {
    return admissions.filter((admission) => {
      const matchesSearch =
        admission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.phone?.includes(searchTerm) ||
        admission.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || admission.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [admissions, searchTerm, statusFilter]);

  const totalAdmissions = admissions.length;
  const pendingAdmissions = admissions.filter((a) => a.status === "Pending").length;
  const approvedAdmissions = admissions.filter((a) => a.status === "Approved").length;
  const rejectedAdmissions = admissions.filter((a) => a.status === "Rejected").length;

  const getStatusBadge = (status) => {
    if (status === "Approved") return "is-approved";
    if (status === "Rejected") return "is-rejected";
    return "is-pending";
  };

  const STAT_CARDS = [
    { label: "Total Applications", value: totalAdmissions, accent: "text-graphite" },
    { label: "Pending", value: pendingAdmissions, accent: "text-slate" },
    { label: "Approved", value: approvedAdmissions, accent: "text-[#536c43]" },
    { label: "Rejected", value: rejectedAdmissions, accent: "text-red-600" },
  ];

  return (
    <div className="alphira-admissions">
      {/* HEADER */}
      <div className="alphira-admissions-heading">
        <div>
          <p className="alphira-admissions-eyebrow">Administration / Student intake</p>
          <h1>
            Admission Management
          </h1>
          <p className="mt-2 text-sm text-slate">
            Review admission requests before approving students.
          </p>
        </div>


      </div>

      {/* STATS */}
      <div className="alphira-admissions-stats">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="alphira-admissions-stat">
            <p className="text-sm text-slate">{card.label}</p>
            <h2 className={`mt-3 font-mono text-3xl font-medium ${card.accent}`}>
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="alphira-admissions-filters">
        <div className="alphira-admissions-filter-grid">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
            <input
              aria-label="Search admissions by name, phone or email"
              type="search"
              placeholder="Search by name, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-pebble bg-vellum py-3.5 pl-11 pr-4 text-sm outline-none focus:border-obsidian"
            />
          </div>

          <select
            aria-label="Filter admissions by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-pebble bg-vellum px-5 py-3.5 text-sm outline-none focus:border-obsidian"
          >
            <option value="all">All Applications</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="alphira-admissions-results">
        <div className="alphira-admissions-results-heading">
          <GraduationCap size={20} className="text-graphite" />
          <h2 className="text-lg font-semibold text-graphite">Admission Applications</h2>
          {!loading && !error && <span className="alphira-admissions-count">{filteredAdmissions.length} results</span>}
        </div>

        {loading ? (
          <div className="alphira-admissions-empty" role="status">
            Loading applications…
          </div>
        ) : error ? (
          <div className="alphira-admissions-error" role="alert">{error}</div>
        ) : filteredAdmissions.length === 0 ? (
          <div className="alphira-admissions-empty">
            <h2 className="text-lg font-semibold text-graphite">No Applications Found</h2>
            <p className="mt-2 text-sm text-slate">
              No admission application matches your filters.
            </p>
          </div>
        ) : (
          <div className="alphira-admissions-table-scroll" tabIndex={0} role="region" aria-label="Admissions table, scroll horizontally on small screens">
            <table className="alphira-admissions-table">
              <thead>
                <tr className="border-b border-pebble">
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">Student</th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">Applied</th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredAdmissions.map((admission) => (
                  <tr key={admission._id} className="border-b border-pebble last:border-0 hover:bg-vellum">
                    {/* STUDENT */}
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-graphite">{admission.name}</p>
                      <p className="mt-1 text-xs text-slate">{admission.email}</p>
                      <p className="mt-0.5 text-xs text-slate">{admission.phone}</p>
                    </td>

                    {/* COURSE */}
                    <td className="px-4 py-4 text-sm text-graphite">{admission.course}</td>

                    {/* STATUS */}
                    <td className="px-4 py-4">
                      <span
                        className={`alphira-admissions-badge ${getStatusBadge(
                          admission.status,
                        )}`}
                      >
                        {admission.status}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm text-graphite">
                        <CalendarDays size={14} className="text-slate" />
                        {new Date(admission.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/dashboard/admissions/${admission._id}`}
                          className="alphira-admissions-view" aria-label={`View admission for ${admission.name}`}
                        >
                          <Eye size={14} />
                          View
                        </Link>

                        <button
                          type="button" aria-label={`Delete admission for ${admission.name}`}
                          onClick={() => deleteHandler(admission._id)}
                          className="alphira-admissions-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionManagementScreen;
