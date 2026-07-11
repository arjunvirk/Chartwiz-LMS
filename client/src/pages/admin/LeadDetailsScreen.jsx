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

import { getLeadDetails, updateLead } from "../../actions/leadActions";
import { LEAD_UPDATE_RESET } from "../../constants/leadConstants";
import { toast } from "react-hot-toast";

const inputClass =
  "w-full rounded-xl border border-pebble bg-vellum px-4 py-3 text-sm outline-none focus:border-obsidian";

const LeadDetailsScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const leadDetails = useSelector((state) => state.leadDetails);
  const { loading, error, lead = {} } = leadDetails;

  const leadUpdate = useSelector((state) => state.leadUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = leadUpdate;

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch(getLeadDetails(id));
  }, [dispatch, id, successUpdate]);

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

  useEffect(() => {
    if (successUpdate) {
      toast.success("Lead updated successfully");
      dispatch({ type: LEAD_UPDATE_RESET });
    }
  }, [successUpdate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateLead(id, {
        status,
        priority,
        paymentStatus,
        followUpDate,
        visitDate,
        notes,
      }),
    );
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-bone p-16 text-center">
        <h2 className="text-xl font-semibold text-graphite">Loading Lead...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-16 text-center">
        <h2 className="text-lg font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/admin/dashboard/leads"
        className="inline-flex items-center gap-2 rounded-xl border border-pebble bg-vellum px-5 py-3 text-sm font-medium text-graphite transition hover:bg-bone"
      >
        <ArrowLeft size={16} />
        Back to Leads
      </Link>

      <div className="rounded-2xl bg-obsidian p-8 text-vellum">
        <h1 className="font-serif text-3xl leading-tight">Lead Details</h1>
        <p className="mt-2 text-sm text-mist">
          View and manage this admission enquiry.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {/* PERSONAL */}
        <div className="rounded-2xl bg-bone p-8">
          <h2 className="mb-5 text-lg font-semibold text-graphite">
            Personal Information
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <User size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Full Name</p>
                <p className="text-sm font-semibold text-graphite">
                  {lead.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Phone</p>
                <a
                  href={`tel:${lead.phone}`}
                  className="text-sm font-semibold text-graphite hover:text-ember-orange"
                >
                  {lead.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Email</p>
                <p className="text-sm font-semibold text-graphite">
                  {lead.email || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LEAD */}
        <div className="rounded-2xl bg-bone p-8">
          <h2 className="mb-5 text-lg font-semibold text-graphite">
            Lead Information
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <BookOpen size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Interested Course</p>
                <p className="text-sm font-semibold text-graphite">
                  {lead.course || "-"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Flag size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Lead Source</p>
                <p className="text-sm font-semibold text-graphite">
                  {lead.source}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Created</p>
                <p className="text-sm font-semibold text-graphite">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Last Updated</p>
                <p className="text-sm font-semibold text-graphite">
                  {new Date(lead.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={submitHandler}
          className="rounded-2xl bg-bone p-8 lg:col-span-2"
        >
          {successUpdate && (
            <div className="mb-5 rounded-xl bg-ember-orange/10 p-4 text-sm text-ember-orange">
              Lead updated successfully.
            </div>
          )}
          {errorUpdate && (
            <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {errorUpdate}
            </div>
          )}

          <h2 className="mb-6 text-lg font-semibold text-graphite">
            CRM Management
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Lead Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
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

            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={inputClass}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className={inputClass}
              >
                <option>Pending</option>
                <option>Paid</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Follow Up Date
              </label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Academy Visit Date
              </label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-graphite">
              Counselor Notes
            </label>
            <textarea
              rows={7}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write follow-up notes..."
              className={inputClass}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loadingUpdate}
              className="rounded-[600px] bg-ember-orange px-8 py-3.5 font-mono text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingUpdate ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadDetailsScreen;
