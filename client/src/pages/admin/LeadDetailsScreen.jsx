import "./LeadDetailsScreen.css";
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
  "alphira-lead-input";

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
      <div className="alphira-lead-feedback" role="status">
        <h2 className="text-xl font-semibold text-graphite">Loading Lead...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alphira-lead-feedback is-error" role="alert">
        <h2 className="text-lg font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="alphira-lead-detail">
      <Link
        to="/admin/dashboard/leads"
        className="alphira-lead-back"
      >
        <ArrowLeft size={16} />
        Back to Leads
      </Link>

      <div className="alphira-lead-heading">
        <p className="alphira-lead-eyebrow">Enquiries / Lead record</p><h1>Lead details<span>.</span></h1>
        <div className="alphira-lead-name">{lead.name || "Enquiry"}<span>{(lead.status || "new").replaceAll("_", " ")}</span></div>
        <p className="mt-2 text-sm text-mist">
          View and manage this admission enquiry.
        </p>
      </div>

      <div className="alphira-lead-grid">
        {/* PERSONAL */}
        <div className="alphira-lead-info">
          <h2 className="mb-5 text-lg font-semibold text-graphite">
            Personal Information
          </h2>

          <div className="space-y-5">
            <div className="alphira-lead-info-row">
              <User size={18} className="alphira-lead-icon" />
              <div>
                <p className="text-xs text-slate">Full Name</p>
                <p className="text-sm font-semibold text-graphite">
                  {lead.name}
                </p>
              </div>
            </div>
            <div className="alphira-lead-info-row">
              <Phone size={18} className="alphira-lead-icon" />
              <div>
                <p className="text-xs text-slate">Phone</p>
                <a
                  href={`tel:${lead.phone}`}
                  className="alphira-lead-phone"
                >
                  {lead.phone}
                </a>
              </div>
            </div>
            <div className="alphira-lead-info-row">
              <Mail size={18} className="alphira-lead-icon" />
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
        <div className="alphira-lead-info">
          <h2 className="mb-5 text-lg font-semibold text-graphite">
            Lead Information
          </h2>

          <div className="space-y-5">
            <div className="alphira-lead-info-row">
              <BookOpen size={18} className="alphira-lead-icon" />
              <div>
                <p className="text-xs text-slate">Interested Course</p>
                <p className="text-sm font-semibold text-graphite">
                  {lead.course || "-"}
                </p>
              </div>
            </div>
            <div className="alphira-lead-info-row">
              <Flag size={18} className="alphira-lead-icon" />
              <div>
                <p className="text-xs text-slate">Lead Source</p>
                <p className="text-sm font-semibold text-graphite">
                  {lead.source}
                </p>
              </div>
            </div>
            <div className="alphira-lead-info-row">
              <Calendar size={18} className="alphira-lead-icon" />
              <div>
                <p className="text-xs text-slate">Created</p>
                <p className="text-sm font-semibold text-graphite">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="alphira-lead-info-row">
              <Clock size={18} className="alphira-lead-icon" />
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
          className="alphira-lead-form" aria-busy={!!loadingUpdate}
        >
          {successUpdate && (
            <div className="alphira-lead-success">
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

          <div className="alphira-lead-fields">
            <div>
              <label htmlFor="lead-status" className="mb-2 block text-sm font-medium text-graphite">
                Lead Status
              </label>
              <select
                id="lead-status" value={status}
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
              <label htmlFor="lead-priority" className="mb-2 block text-sm font-medium text-graphite">
                Priority
              </label>
              <select
                id="lead-priority" value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={inputClass}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label htmlFor="lead-paymentStatus" className="mb-2 block text-sm font-medium text-graphite">
                Payment Status
              </label>
              <select
                id="lead-paymentStatus" value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className={inputClass}
              >
                <option>Pending</option>
                <option>Paid</option>
              </select>
            </div>

            <div>
              <label htmlFor="lead-followUpDate" className="mb-2 block text-sm font-medium text-graphite">
                Follow Up Date
              </label>
              <input
                type="date"
                id="lead-followUpDate" value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="lead-visitDate" className="mb-2 block text-sm font-medium text-graphite">
                Academy Visit Date
              </label>
              <input
                type="date"
                id="lead-visitDate" value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="lead-notes" className="mb-2 block text-sm font-medium text-graphite">
              Counselor Notes
            </label>
            <textarea
              rows={7}
              id="lead-notes" value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write follow-up notes..."
              className={inputClass}
            />
          </div>

          <div className="alphira-lead-savebar">
            <button
              type="submit"
              disabled={loadingUpdate}
              className="alphira-lead-save"
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
