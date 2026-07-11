import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Users, Search, Phone, CalendarDays } from "lucide-react";

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

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) return;
    dispatch(getLeads());
  }, [dispatch, successDelete, successUpdate, userInfo]);

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
  const demoBookedLeads = leads.filter(
    (lead) => lead.status === "demo_booked",
  ).length;
  const paymentPendingLeads = leads.filter(
    (lead) => lead.status === "payment_pending",
  ).length;

  const getStatusBadge = (status) => {
    if (status === "converted") return "bg-ember-orange/15 text-ember-orange";
    if (status === "closed") return "bg-red-100 text-red-700";
    return "border border-pebble text-slate";
  };

  const getPriorityBadge = (priority) => {
    if (priority === "High") return "bg-red-100 text-red-700";
    if (priority === "Medium") return "bg-ember-orange/15 text-ember-orange";
    return "border border-pebble text-slate";
  };

  const STAT_CARDS = [
    { label: "Total Leads", value: totalLeads },
    { label: "New Leads", value: newLeads },
    { label: "Contacted", value: contactedLeads },
    { label: "Converted", value: convertedLeads },
    { label: "Demo Booked", value: demoBookedLeads },
    { label: "Payment Pending", value: paymentPendingLeads },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-serif text-3xl leading-tight text-graphite">
            Lead Management
          </h1>
          <p className="mt-2 text-sm text-slate">
            Manage enquiries, follow-ups and student conversions.
          </p>
        </div>

        <div className="rounded-2xl bg-obsidian px-6 py-4 text-vellum">
          <p className="font-mono text-xs uppercase text-mist">
            Total Active Leads
          </p>
          <h2 className="mt-1 text-xl font-semibold text-ember-orange">
            {totalLeads}
          </h2>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="rounded-2xl bg-bone p-6">
            <p className="text-sm font-medium text-slate">{card.label}</p>
            <h2 className="mt-3 font-mono text-3xl font-medium text-graphite">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="mt-8 rounded-2xl bg-bone p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_250px]">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate"
            />
            <input
              type="text"
              placeholder="Search by name or phone..."
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
            <option value="all">All Leads</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="demo_booked">Demo Booked</option>
            <option value="visit_scheduled">Visit Scheduled</option>
            <option value="payment_pending">Payment Pending</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-8 rounded-2xl bg-bone p-8">
        <div className="flex items-center gap-3">
          <Users size={20} className="text-graphite" />
          <h2 className="text-lg font-semibold text-graphite">Lead Database</h2>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-obsidian border-t-transparent" />
          </div>
        ) : error ? (
          <div className="mt-6 rounded-xl bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-pebble py-16 text-center">
            <h2 className="text-lg font-semibold text-graphite">
              No Leads Found
            </h2>
            <p className="mt-2 text-sm text-slate">
              No lead matches your search.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-pebble">
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">
                    Course
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">
                    Source
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">
                    Follow Up
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wide text-slate">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-b border-pebble last:border-0 hover:bg-vellum"
                  >
                    <td className="px-4 py-4 text-sm font-semibold text-graphite">
                      {lead.name}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-slate" />
                        <a
                          href={`tel:${lead.phone}`}
                          className="hover:text-ember-orange"
                        >
                          {lead.phone}
                        </a>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-graphite">
                      {lead.course}
                    </td>
                    <td className="px-4 py-4 text-sm text-graphite">
                      {lead.source}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-[600px] px-3 py-1 font-mono text-[11px] font-medium ${getPriorityBadge(lead.priority)}`}
                      >
                        {lead.priority}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-[600px] px-3 py-1 font-mono text-[11px] font-medium uppercase ${getStatusBadge(lead.status)}`}
                      >
                        {lead.status.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      {lead.followUpDate ? (
                        <div className="flex items-center gap-2 text-sm text-graphite">
                          <CalendarDays size={14} className="text-slate" />
                          {new Date(lead.followUpDate).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-sm text-mist">Not Set</span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/dashboard/leads/${lead._id}`}
                          className="rounded-lg bg-obsidian px-4 py-2 text-xs font-medium text-vellum"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => deleteHandler(lead._id)}
                          className="rounded-lg border border-red-300 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white"
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

export default LeadManagementScreen;
