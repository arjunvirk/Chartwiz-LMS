import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  BookOpen,
  Flag,
  Calendar,
  Clock,
} from "lucide-react";

import { getLeadDetails } from "../../actions/leadActions";

const LeadDetailsScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const leadDetails = useSelector((state) => state.leadDetails);

  const { loading, error, lead = {} } = leadDetails;

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch(getLeadDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (lead._id) {
      setStatus(lead.status || "new");
      setPriority(lead.priority || "Medium");
      setPaymentStatus(lead.paymentStatus || "Pending");

      setFollowUpDate(
        lead.followUpDate
          ? new Date(lead.followUpDate).toISOString().split("T")[0]
          : "",
      );

      setVisitDate(
        lead.visitDate
          ? new Date(lead.visitDate).toISOString().split("T")[0]
          : "",
      );

      setNotes(lead.notes || "");
    }
  }, [lead]);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-16 text-center shadow-sm">
        <h2 className="text-2xl font-bold">Loading Lead...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-red-50 p-16 text-center shadow-sm">
        <h2 className="text-xl font-bold text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* BACK */}

      <Link
        to="/admin/leads"
        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-gray-100"
      >
        <ArrowLeft size={18} />
        Back to Leads
      </Link>

      {/* HEADER */}

      <div className="rounded-3xl bg-linear-to-r from-black to-gray-800 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-extrabold">Lead Details</h1>

        <p className="mt-3 text-gray-300">
          View and manage this admission enquiry.
        </p>
      </div>

      {/* INFORMATION */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* PERSONAL */}

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold">Personal Information</h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <User className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-semibold">{lead.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>

                <a
                  href={`tel:${lead.phone}`}
                  className="font-semibold hover:text-blue-600"
                >
                  {lead.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>

                <p className="font-semibold">{lead.email || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* LEAD */}

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold">Lead Information</h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <BookOpen className="text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Interested Course</p>

                <p className="font-semibold">{lead.course || "-"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Flag className="text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Lead Source</p>

                <p className="font-semibold">{lead.source}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Created</p>

                <p className="font-semibold">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Last Updated</p>

                <p className="font-semibold">
                  {new Date(lead.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-8 text-2xl font-bold">CRM Management</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* STATUS */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Lead Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                <option value="new">New</option>

                <option value="contacted">Contacted</option>

                <option value="demo_booked">Demo Booked</option>

                <option value="visit_scheduled">Visit Scheduled</option>

                <option value="payment_pending">Payment Pending</option>

                <option value="converted">Converted</option>

                <option value="closed">Closed</option>
              </select>
            </div>

            {/* PRIORITY */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                <option>Low</option>

                <option>Medium</option>

                <option>High</option>
              </select>
            </div>

            {/* PAYMENT */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Payment Status
              </label>

              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                <option>Pending</option>

                <option>Paid</option>
              </select>
            </div>

            {/* FOLLOW UP */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Follow Up Date
              </label>

              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* VISIT */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Academy Visit Date
              </label>

              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>
          </div>

          {/* NOTES */}

          <div className="mt-8">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Counselor Notes
            </label>

            <textarea
              rows={7}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write follow-up notes..."
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsScreen;
