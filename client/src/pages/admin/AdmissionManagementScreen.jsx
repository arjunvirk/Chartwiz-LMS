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
    if (status === "Approved") return "bg-ember-orange/15 text-ember-orange";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "border border-pebble text-slate";
  };

  const STAT_CARDS = [
    { label: "Total Applications", value: totalAdmissions, accent: "text-graphite" },
    { label: "Pending", value: pendingAdmissions, accent: "text-slate" },
    { label: "Approved", value: approvedAdmissions, accent: "text-ember-orange" },
    { label: "Rejected", value: rejectedAdmissions, accent: "text-red-600" },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-serif text-3xl leading-tight text-graphite">
            Admission Management
          </h1>
          <p className="mt-2 text-sm text-slate">
            Review admission requests before approving students.
          </p>
        </div>

        <div className="rounded-2xl bg-obsidian px-6 py-4 text-vellum">
          <p className="font-mono text-xs uppercase text-mist">Total Applications</p>
          <h2 className="mt-1 text-xl font-semibold text-ember-orange">{totalAdmissions}</h2>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="rounded-2xl bg-bone p-6">
            <p className="text-sm text-slate">{card.label}</p>
            <h2 className={`mt-3 font-mono text-3xl font-medium ${card.accent}`}>
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="mt-8 rounded-2xl bg-bone p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_250px]">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
            <input
              type="text"
              placeholder="Search by name, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-pebble bg-vellum py-3.5 pl-11 pr-4 text-sm outline-none focus:border-obsidian"
            />
          </div>

          <select
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
      <div className="mt-8 rounded-2xl bg-bone p-8">
        <div className="mb-6 flex items-center gap-3">
          <GraduationCap size={20} className="text-graphite" />
          <h2 className="text-lg font-semibold text-graphite">Admission Applications</h2>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-obsidian border-t-transparent" />
          </div>
        ) : error ? (
          <div className="rounded-xl bg-red-50 p-5 text-sm text-red-600">{error}</div>
        ) : filteredAdmissions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-pebble py-16 text-center">
            <h2 className="text-lg font-semibold text-graphite">No Applications Found</h2>
            <p className="mt-2 text-sm text-slate">
              No admission application matches your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
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
                        className={`rounded-[600px] px-3 py-1 font-mono text-[11px] font-medium uppercase ${getStatusBadge(
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
                          className="flex items-center gap-2 rounded-lg bg-obsidian px-4 py-2 text-xs font-medium text-vellum transition hover:bg-ember-orange hover:text-black"
                        >
                          <Eye size={14} />
                          View
                        </Link>

                        <button
                          onClick={() => deleteHandler(admission._id)}
                          className="rounded-lg border border-red-300 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-500 hover:text-white"
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
