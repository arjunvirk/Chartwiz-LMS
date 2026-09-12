import { ADMISSION_UPDATE_RESET, ADMISSION_APPROVE_RESET } from "../../constants/admissionConstants";
import "./AdmissionDetailsScreen.css";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  BookOpen,
  Calendar,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getAdmissionDetails,
  updateAdmission,
  approveAdmission,
} from "../../actions/admissionActions";

const inputClass =
  "alphira-admission-input";

const AdmissionDetailsScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pendingOperation = useRef(null);

  const admissionDetails = useSelector((state) => state.admissionDetails);
  const { loading, error, admission = {} } = admissionDetails;

  const admissionUpdate = useSelector((state) => state.admissionUpdate);
  const admissionApprove = useSelector((state) => state.admissionApprove);

  const {
    loading: loadingApprove,
    success: successApprove,
    error: errorApprove,
  } = admissionApprove;

  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = admissionUpdate;

  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [batch, setBatch] = useState("");
  const [mentor, setMentor] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch(getAdmissionDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (admission._id) {
      setStatus(admission.status || "Pending");
      setPaymentStatus(admission.paymentStatus || "Pending");
      setBatch(admission.batch || "");
      setMentor(admission.mentor || "");
      setNotes(admission.notes || "");
    }
  }, [admission]);

  useEffect(() => {
    if (!successUpdate && !errorUpdate) return;
    if (pendingOperation.current === "save") {
      pendingOperation.current = null;
      if (successUpdate) {
        toast.success("Admission updated successfully", { id: `admission-save-${id}` });
        dispatch(getAdmissionDetails(id));
      } else {
        toast.error(errorUpdate, { id: `admission-save-${id}` });
      }
    }
    dispatch({ type: ADMISSION_UPDATE_RESET });
  }, [dispatch, id, successUpdate, errorUpdate]);

  useEffect(() => {
    if (!successApprove && !errorApprove) return;
    if (pendingOperation.current === "approve") {
      pendingOperation.current = null;
      if (successApprove) {
        toast.success("Admission approved successfully", { id: `admission-approve-${id}` });
        dispatch(getAdmissionDetails(id));
      } else {
        toast.error(errorApprove, { id: `admission-approve-${id}` });
      }
    }
    dispatch({ type: ADMISSION_APPROVE_RESET });
  }, [dispatch, id, successApprove, errorApprove]);

  useEffect(() => {
    pendingOperation.current = null;
    dispatch({ type: ADMISSION_UPDATE_RESET });
    dispatch({ type: ADMISSION_APPROVE_RESET });
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="alphira-admission-feedback" role="status">
        <h2 className="text-xl font-semibold text-graphite">
          Loading Admission...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alphira-admission-feedback is-error" role="alert">
        <h2 className="text-lg font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (pendingOperation.current) return;
    pendingOperation.current = "save";

    dispatch(
      updateAdmission(id, { status, paymentStatus, batch, mentor, notes }),
    );
  };

  const approveHandler = () => {
    if (pendingOperation.current || !["Paid", "Partially Paid"].includes(admission.paymentStatus)) return;
    if (
      window.confirm("Approve this admission and create the student account?")
    ) {
      pendingOperation.current = "approve";
      dispatch(approveAdmission(id));
    }
  };

  return (
    <form onSubmit={submitHandler} className="alphira-admission-detail" aria-busy={!!loadingUpdate}>
      {/* BACK */}
      <Link
        to="/admin/dashboard/admissions"
        className="alphira-admission-back"
      >
        <ArrowLeft size={16} />
        Back to Admissions
      </Link>

      {/* HEADER */}
      <div className="alphira-admission-heading">
        <p className="alphira-admission-eyebrow">Admissions / Application review</p>
        <h1>Admission details<span>.</span></h1>
        <div className="alphira-admission-applicant">{admission.name || "Applicant"}<span>{admission.status || "Pending"}</span></div>
        <p className="mt-2 text-sm text-mist">
          Review this application before approving student admission.
        </p>
      </div>

      {/* INFO */}
      <div className="alphira-admission-grid">
        {/* PERSONAL */}
        <div className="alphira-admission-info">
          <h2 className="mb-6 text-lg font-semibold text-graphite">
            Personal Information
          </h2>

          <div className="space-y-5">
            <div className="alphira-admission-info-row">
              <User size={18} className="alphira-admission-sage" />
              <div>
                <p className="text-xs text-slate">Full Name</p>
                <p className="text-sm font-semibold text-graphite">
                  {admission.name}
                </p>
              </div>
            </div>
            <div className="alphira-admission-info-row">
              <Mail size={18} className="alphira-admission-sage" />
              <div>
                <p className="text-xs text-slate">Email</p>
                <p className="text-sm font-semibold text-graphite">
                  {admission.email}
                </p>
              </div>
            </div>
            <div className="alphira-admission-info-row">
              <Phone size={18} className="alphira-admission-sage" />
              <div>
                <p className="text-xs text-slate">Phone</p>
                <p className="text-sm font-semibold text-graphite">
                  {admission.phone}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* COURSE */}
        <div className="alphira-admission-info">
          <h2 className="mb-6 text-lg font-semibold text-graphite">
            Course Information
          </h2>

          <div className="space-y-5">
            <div className="alphira-admission-info-row">
              <BookOpen size={18} className="alphira-admission-sage" />
              <div>
                <p className="text-xs text-slate">Selected Course</p>
                <p className="text-sm font-semibold text-graphite">
                  {admission.course}
                </p>
              </div>
            </div>
            <div className="alphira-admission-info-row">
              <Calendar size={18} className="alphira-admission-sage" />
              <div>
                <p className="text-xs text-slate">Applied On</p>
                <p className="text-sm font-semibold text-graphite">
                  {admission.createdAt ? new Date(admission.createdAt).toLocaleDateString() : "-"}
                </p>
              </div>
            </div>
            <div className="alphira-admission-info-row">
              <Calendar size={18} className="alphira-admission-sage" />
              <div>
                <p className="text-xs text-slate">Current Status</p>
                <p className="text-sm font-semibold text-graphite">
                  {admission.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ADMISSION MANAGEMENT */}
        <div className="alphira-admission-management">
          <h2 className="mb-6 text-lg font-semibold text-graphite">
            Admission Management
          </h2>

          <div className="alphira-admission-fields">
            <div>
              <label htmlFor="admission-status" className="mb-2 block text-sm font-medium text-graphite">
                Admission Status
              </label>
              <select
                disabled={
                  admission.status === "Approved" ||
                  admission.status === "Rejected"
                }
                id="admission-status" value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
              >
                {["Approved", "Rejected"].includes(status) && <option value={status}>{status}</option>}
                <option value="Pending">Pending</option>
                <option value="Contacted">Contacted</option>
                <option value="Documents Pending">Documents Pending</option>
                <option value="Payment Pending">Payment Pending</option>
              </select>
            </div>

            <div>
              <label htmlFor="admission-payment" className="mb-2 block text-sm font-medium text-graphite">
                Payment Status
              </label>
              <select
                id="admission-payment" value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className={inputClass}
              >
                <option value="Pending">Pending</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div>
              <label htmlFor="admission-batch" className="mb-2 block text-sm font-medium text-graphite">
                Assign Batch
              </label>
              <select
                id="admission-batch" value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className={inputClass}
              >
                <option value="">Select Batch</option>
                <option>August 2026 Morning Batch</option>
                <option>August 2026 Evening Batch</option>
                <option>September 2026 Morning Batch</option>
                <option>September 2026 Evening Batch</option>
              </select>
            </div>

            <div>
              <label htmlFor="admission-mentor" className="mb-2 block text-sm font-medium text-graphite">
                Assign Mentor
              </label>
              <select
                id="admission-mentor" value={mentor}
                onChange={(e) => setMentor(e.target.value)}
                className={inputClass}
              >
                <option value="">Select Mentor</option>
                <option>Alphira Faculty 1</option>
                <option>Alphira Faculty 2</option>
                <option>Alphira Faculty 3</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="admission-notes" className="mb-2 block text-sm font-medium text-graphite">
              Admission Notes
            </label>
            <textarea
              id="admission-notes" rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write internal notes..."
              className={inputClass}
            />
          </div>
        </div>

        {/* TIMELINE */}
        <div className="alphira-admission-history">
          <h2 className="mb-6 text-lg font-semibold text-graphite">
            Admission Timeline
          </h2>

          <div className="alphira-admission-timeline">
            <div className="relative">
              <span className="absolute -left-[2.55rem] h-4 w-4 rounded-full alphira-admission-marker" />
              <h3 className="text-sm font-semibold text-graphite">
                Admission Submitted
              </h3>
              <p className="mt-1 text-xs text-slate">
                {admission.createdAt
                  ? new Date(admission.createdAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[2.55rem] h-4 w-4 rounded-full bg-slate" />
              <h3 className="text-sm font-semibold text-graphite">
                Counselor Review
              </h3>
              <p className="mt-1 text-xs text-slate">Waiting for review</p>
            </div>

            <div className="relative">
              <span className="absolute -left-[2.55rem] h-4 w-4 rounded-full bg-mist" />
              <h3 className="text-sm font-semibold text-graphite">
                Payment Verification
              </h3>
              <p className="mt-1 text-xs text-slate">{paymentStatus}</p>
            </div>

            <div className="relative">
              <span className="absolute -left-[2.55rem] h-4 w-4 rounded-full bg-obsidian" />
              <h3 className="text-sm font-semibold text-graphite">
                Final Admission Status
              </h3>
              <p className="mt-1 text-xs text-slate">{status}</p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="alphira-admission-actions">
          <h2 className="mb-6 text-lg font-semibold text-graphite">
            Admission Actions
          </h2>

          <div className="alphira-admission-action-buttons">
            {admission.status !== "Approved" &&
              admission.status !== "Rejected" && (
                <button
                  type="submit"
                  className="alphira-admission-save" disabled={loadingUpdate || loadingApprove}
                >
                  {loadingUpdate ? "Saving..." : "Save Changes"}
                </button>
              )}

            {!admission.studentCreated && admission.status !== "Rejected" && (
              <button
                type="button"
                onClick={approveHandler}
                disabled={!["Paid", "Partially Paid"].includes(admission.paymentStatus) || loadingApprove || loadingUpdate}
                className="alphira-admission-approve"
              >
                {loadingApprove ? "Approving..." : "Approve Student"}
              </button>
            )}

            {admission.status === "Approved" && (
              <div className="rounded-[600px] border alphira-admission-approved-border alphira-admission-approved px-8 py-3.5 text-center text-sm font-semibold alphira-admission-sage">
                Student Approved
              </div>
            )}

            {admission.status === "Rejected" && (
              <div className="rounded-[600px] border border-red-200 bg-red-50 px-8 py-3.5 text-center text-sm font-semibold text-red-700">
                Admission Rejected
              </div>
            )}
          </div>

          {paymentStatus !== admission.paymentStatus && <p className="mt-5 text-sm text-slate">Save your payment status change before approving. Partial or full payment allows approval.</p>}
          <p className="mt-5 text-sm text-slate">
            Approving this admission will automatically create the student
            account and enroll the student in the selected course.
          </p>
        </div>
      </div>
    </form>
  );
};

export default AdmissionDetailsScreen;
