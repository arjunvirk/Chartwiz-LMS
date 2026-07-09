import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Users, Search, GraduationCap, CalendarDays, Eye } from "lucide-react";

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

      const matchesStatus =
        statusFilter === "all" || admission.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [admissions, searchTerm, statusFilter]);

  const totalAdmissions = admissions.length;

  const pendingAdmissions = admissions.filter(
    (a) => a.status === "Pending",
  ).length;

  const approvedAdmissions = admissions.filter(
    (a) => a.status === "Approved",
  ).length;

  const rejectedAdmissions = admissions.filter(
    (a) => a.status === "Rejected",
  ).length;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div>
      {/* HEADER */}

      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Admission Management
          </h1>

          <p className="mt-3 text-gray-500">
            Review admission requests before approving students.
          </p>
        </div>

        <div className="rounded-2xl bg-black px-6 py-4 text-white shadow-lg">
          <p className="text-sm text-gray-300">Total Applications</p>

          <h2 className="mt-1 text-2xl font-bold">{totalAdmissions}</h2>
        </div>
      </div>

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-white p-7 shadow-sm">
          <p className="text-sm text-gray-500">Total Applications</p>

          <h2 className="mt-3 text-4xl font-extrabold">{totalAdmissions}</h2>
        </div>

        <div className="rounded-3xl border bg-white p-7 shadow-sm">
          <p className="text-sm text-gray-500">Pending</p>

          <h2 className="mt-3 text-4xl font-extrabold text-yellow-600">
            {pendingAdmissions}
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-7 shadow-sm">
          <p className="text-sm text-gray-500">Approved</p>

          <h2 className="mt-3 text-4xl font-extrabold text-green-600">
            {approvedAdmissions}
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-7 shadow-sm">
          <p className="text-sm text-gray-500">Rejected</p>

          <h2 className="mt-3 text-4xl font-extrabold text-red-600">
            {rejectedAdmissions}
          </h2>
        </div>
      </div>

      {/* FILTERS */}

      <div className="mt-10 rounded-3xl border bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_250px]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border px-12 py-4 outline-none focus:border-black"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border px-5 py-4 outline-none focus:border-black"
          >
            <option value="all">All Applications</option>

            <option value="Pending">Pending</option>

            <option value="Approved">Approved</option>

            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* TABLE */}

      <div className="mt-10 rounded-3xl border bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-3">
          <GraduationCap size={24} />

          <h2 className="text-2xl font-extrabold">Admission Applications</h2>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <h2 className="text-xl font-bold">Loading admissions...</h2>
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-red-50 p-5 text-red-600">{error}</div>
        ) : filteredAdmissions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 py-20 text-center">
            <h2 className="text-2xl font-bold">No Applications Found</h2>

            <p className="mt-3 text-gray-500">
              No admission application matches your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-4 text-left">Student</th>

                  <th className="px-4 py-4 text-left">Course</th>

                  <th className="px-4 py-4 text-left">Status</th>

                  <th className="px-4 py-4 text-left">Applied</th>

                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredAdmissions.map((admission) => (
                  <tr key={admission._id} className="border-b last:border-0">
                    {/* STUDENT */}

                    <td className="px-4 py-5">
                      <div>
                        <p className="font-semibold">{admission.name}</p>

                        <p className="text-sm text-gray-500">
                          {admission.email}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {admission.phone}
                        </p>
                      </div>
                    </td>

                    {/* COURSE */}

                    <td className="px-4 py-5">
                      <span className="font-medium">{admission.course}</span>
                    </td>

                    {/* STATUS */}

                    <td className="px-4 py-5">
                      <span
                        className={`rounded-full px-4 py-2 text-xs font-bold uppercase ${getStatusBadge(
                          admission.status,
                        )}`}
                      >
                        {admission.status}
                      </span>
                    </td>

                    {/* DATE */}

                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays size={16} />

                        {new Date(admission.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/admin/dashboard/admissions/${admission._id}`}
                          className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                        >
                          <Eye size={16} />
                          View
                        </Link>

                        <button
                          onClick={() => deleteHandler(admission._id)}
                          className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
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
