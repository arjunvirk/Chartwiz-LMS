import "./LeadManagementScreen.css";
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
    if (status === "converted") return "is-positive";
    if (status === "closed") return "is-alert";
    return "is-neutral";
  };

  const getPriorityBadge = (priority) => {
    if (priority === "High") return "is-alert";
    if (priority === "Medium") return "is-positive";
    return "is-neutral";
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
    <div className="alphira-leads">
      {/* HEADER */}
      <div className="alphira-leads-heading">
        <div>
          <p className="alphira-leads-eyebrow">Administration / Enquiries</p>
          <h1>
            Lead Management
          </h1>
          <p className="mt-2 text-sm text-slate">
            Manage enquiries, follow-ups and student conversions.
          </p>
        </div>


      </div>

      {/* STATS */}
      <div className="alphira-leads-stats">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="alphira-leads-stat">
            <p className="text-sm font-medium text-slate">{card.label}</p>
            <h2 className="mt-3 font-mono text-3xl font-medium text-graphite">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="alphira-leads-filters">
        <div className="alphira-leads-filter-grid">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate"
            />
            <input
              aria-label="Search leads by name or phone" type="search"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-pebble bg-vellum py-3.5 pl-11 pr-4 text-sm outline-none focus:border-obsidian"
            />
          </div>

          <select
            aria-label="Filter leads by status"
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
      <div className="alphira-leads-results">
        <div className="alphira-leads-results-heading">
          <Users size={20} className="text-graphite" />
          <h2 className="text-lg font-semibold text-graphite">Lead Database</h2>
          {!loading && !error && <span className="alphira-leads-count">{filteredLeads.length} results</span>}
        </div>

        {loading ? (
          <div className="alphira-leads-empty">
            <p role="status">Loading leads…</p>
          </div>
        ) : error ? (
          <div className="alphira-leads-error" role="alert">
            {error}
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="alphira-leads-empty">
            <h2 className="text-lg font-semibold text-graphite">
              No Leads Found
            </h2>
            <p className="mt-2 text-sm text-slate">
              No lead matches your search.
            </p>
          </div>
        ) : (
          <div className="alphira-leads-table-scroll" tabIndex={0} role="region" aria-label="Lead records; scroll horizontally on smaller screens">
            <table className="alphira-leads-table">
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
                          className="alphira-leads-phone"
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
                        className={`alphira-leads-badge ${getPriorityBadge(lead.priority)}`}
                      >
                        {lead.priority}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`alphira-leads-badge ${getStatusBadge(lead.status)}`}
                      >
                        {(lead.status || "Not set").replaceAll("_", " ")}
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
                          className="alphira-leads-view" aria-label={`View lead ${lead.name}`}
                        >
                          View
                        </Link>
                        <button
                          type="button" aria-label={`Delete lead ${lead.name}`}
                          onClick={() => deleteHandler(lead._id)}
                          className="alphira-leads-delete"
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
