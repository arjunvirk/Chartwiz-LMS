import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Users,
  Search,
  Phone,
  Trash2,
  CalendarDays,
  FileText,
} from "lucide-react";

import { getLeads, deleteLead } from "../../actions/leadActions";

const LeadManagementScreen = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const leadList = useSelector((state) => state.leadList);
  const { loading, error, leads = [] } = leadList;

  const leadDelete = useSelector((state) => state.leadDelete);
  const { success: successDelete } = leadDelete;

  const leadUpdate = useSelector((state) => state.leadUpdate);
  const { success: successUpdate } = leadUpdate;

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch, successDelete, successUpdate]);

  const deleteHandler = (id) => {
    if (window.confirm("Delete this lead?")) {
      dispatch(deleteLead(id));
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  const totalLeads = leads.length;

  const newLeads = leads.filter((lead) => lead.status === "new").length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "contacted",
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "converted",
  ).length;

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";

      case "contacted":
        return "bg-yellow-100 text-yellow-700";

      case "interested":
        return "bg-purple-100 text-purple-700";

      case "converted":
        return "bg-green-100 text-green-700";

      case "not_interested":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      {/* HEADER */}

      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-black">
            Lead Management
          </h1>

          <p className="mt-3 text-base text-gray-500">
            Manage enquiries, follow-ups and student conversions.
          </p>
        </div>

        <div className="rounded-2xl bg-black px-6 py-4 text-white shadow-lg">
          <p className="text-sm text-gray-300">Total Active Leads</p>

          <h2 className="mt-1 text-2xl font-bold">{totalLeads}</h2>
        </div>
      </div>

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Leads</p>

          <h2 className="mt-3 text-4xl font-extrabold">{totalLeads}</h2>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
          <p className="text-sm font-medium text-gray-500">New Leads</p>

          <h2 className="mt-3 text-4xl font-extrabold">{newLeads}</h2>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Contacted</p>

          <h2 className="mt-3 text-4xl font-extrabold">{contactedLeads}</h2>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Converted</p>

          <h2 className="mt-3 text-4xl font-extrabold">{convertedLeads}</h2>
        </div>
      </div>

      {/* FILTERS */}

      <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_250px]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 py-4 pl-12 pr-4 outline-none focus:border-black"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-black"
          >
            <option value="all">All Leads</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="interested">Interested</option>
            <option value="converted">Converted</option>
            <option value="not_interested">Not Interested</option>
          </select>
        </div>
      </div>

      {/* TABLE */}

      <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <Users size={24} />

          <h2 className="text-2xl font-extrabold">Lead Database</h2>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <h2 className="text-xl font-bold">Loading leads...</h2>
          </div>
        ) : error ? (
          <div className="mt-6 rounded-2xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-gray-300 py-20 text-center">
            <h2 className="text-2xl font-bold">No Leads Found</h2>

            <p className="mt-3 text-gray-500">No lead matches your search.</p>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-4 text-left">Name</th>

                  <th className="px-4 py-4 text-left">Phone</th>

                  <th className="px-4 py-4 text-left">Status</th>

                  <th className="px-4 py-4 text-left">Follow Up</th>

                  <th className="px-4 py-4 text-left">Notes</th>

                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="border-b last:border-0">
                    <td className="px-4 py-5 font-semibold">{lead.name}</td>

                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2">
                        <Phone size={16} />

                        {lead.phone}
                      </div>
                    </td>

                    <td className="px-4 py-5">
                      <span
                        className={`rounded-full px-4 py-2 text-xs font-bold uppercase ${getStatusBadge(
                          lead.status,
                        )}`}
                      >
                        {lead.status.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-4 py-5">
                      {lead.followUpDate ? (
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarDays size={16} />

                          {new Date(lead.followUpDate).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-gray-400">Not Set</span>
                      )}
                    </td>

                    <td className="max-w-xs px-4 py-5">
                      <div className="flex items-start gap-2">
                        <FileText size={16} />

                        <span className="line-clamp-2 text-sm text-gray-600">
                          {lead.notes || "No notes"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-5">
                      <button
                        onClick={() => deleteHandler(lead._id)}
                        className="flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
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

export default LeadManagementScreen;
