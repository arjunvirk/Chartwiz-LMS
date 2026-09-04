import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  BookOpen,
  Calendar,
  MapPin,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getAdmissionDetails,
  updateAdmission,
  approveAdmission,
} from "../../actions/admissionActions";

const inputClass =
  "w-full rounded-xl border border-pebble bg-vellum px-4 py-3 text-sm outline-none focus:border-obsidian";

const AdmissionDetailsScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

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
    if (successUpdate) {
      toast.success("Admission updated successfully");
      dispatch(getAdmissionDetails(id));
    }

    if (errorUpdate) {
      toast.error(errorUpdate);
    }

    if (successApprove) {
      toast.success("Admission approved successfully");
      dispatch(getAdmissionDetails(id));
    }

    if (errorApprove) {
      toast.error(errorApprove);
    }
  }, [dispatch, id, successUpdate, errorUpdate, successApprove, errorApprove]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-bone p-16 text-center">
        <h2 className="text-xl font-semibold text-graphite">
          Loading Admission...
        </h2>
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

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateAdmission(id, { status, paymentStatus, batch, mentor, notes }),
    );
  };

  const approveHandler = () => {
    if (
      window.confirm("Approve this admission and create the student account?")
    ) {
      dispatch(approveAdmission(id));
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6">
      {/* BACK */}
      <Link
        to="/admin/dashboard/admissions"
        className="inline-flex items-center gap-2 rounded-xl border border-pebble bg-vellum px-5 py-3 text-sm font-medium text-graphite transition hover:bg-bone"
      >
        <ArrowLeft size={16} />
        Back to Admissions
      </Link>

      {/* HEADER */}
      <div className="rounded-2xl bg-obsidian p-8 text-vellum">
        <h1 className="font-serif text-3xl leading-tight">Admission Details</h1>
        <p className="mt-2 text-sm text-mist">
          Review this application before approving student admission.
        </p>
      </div>

      {/* INFO */}
      <div className="grid gap-3 lg:grid-cols-2">
        {/* PERSONAL */}
        <div className="rounded-2xl bg-bone p-8">
          <h2 className="mb-6 text-lg font-semibold text-graphite">
            Personal Information
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <User size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Full Name</p>
                <p className="text-sm font-semibold text-graphite">
                  {admission.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Email</p>
                <p className="text-sm font-semibold text-graphite">
                  {admission.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Phone</p>
                <p className="text-sm font-semibold text-graphite">
                  {admission.phone}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Address</p>
                <p className="text-sm font-semibold text-graphite">
                  {admission.address || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COURSE */}
        <div className="rounded-2xl bg-bone p-8">
          <h2 className="mb-6 text-lg font-semibold text-graphite">
            Course Information
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <BookOpen size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Selected Course</p>
                <p className="text-sm font-semibold text-graphite">
                  {admission.course}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar size={18} className="text-ember-orange" />
              <div>
                <p className="text-xs text-slate">Applied On</p>
                <p className="text-sm font-semibold text-graphite">
                  {new Date(admission.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar size={18} className="text-ember-orange" />
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
        <div className="rounded-2xl bg-bone p-8 lg:col-span-2">
          <h2 className="mb-6 text-lg font-semibold text-graphite">
            Admission Management
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Admission Status
              </label>
              <select
                disabled={
                  admission.status === "Approved" ||
                  admission.status === "Rejected"
                }
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
              >
                <option value="Pending">Pending</option>
                <option value="Contacted">Contacted</option>
                <option value="Documents Pending">Documents Pending</option>
                <option value="Payment Pending">Payment Pending</option>
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
                <option value="Pending">Pending</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-graphite">
                Assign Batch
              </label>
              <select
                value={batch}
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
              <label className="mb-2 block text-sm font-medium text-graphite">
                Assign Mentor
              </label>
              <select
                value={mentor}
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
            <label className="mb-2 block text-sm font-medium text-graphite">
              Admission Notes
            </label>
            <textarea
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write internal notes..."
              className={inputClass}
            />
          </div>
        </div>

        {/* TIMELINE */}
        <div className="rounded-2xl bg-bone p-8 lg:col-span-2">
          <h2 className="mb-6 text-lg font-semibold text-graphite">
            Admission Timeline
          </h2>

          <div className="space-y-7 border-l-2 border-pebble pl-8">
            <div className="relative">
              <span className="absolute -left-[2.55rem] h-4 w-4 rounded-full bg-ember-orange" />
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
        <div className="rounded-2xl bg-bone p-8 lg:col-span-2">
          <h2 className="mb-6 text-lg font-semibold text-graphite">
            Admission Actions
          </h2>

          <div className="flex flex-wrap gap-3">
            {admission.status !== "Approved" &&
              admission.status !== "Rejected" && (
                <button
                  type="submit"
                  className="rounded-[600px] bg-obsidian px-8 py-3.5 font-mono text-sm font-semibold text-vellum transition hover:bg-ember-orange hover:text-black"
                >
                  Save Changes
                </button>
              )}

            {!admission.studentCreated && admission.status !== "Rejected" && (
              <button
                type="button"
                onClick={approveHandler}
                disabled={paymentStatus !== "Paid" || loadingApprove}
                className="rounded-[600px] bg-ember-orange px-8 py-3.5 font-mono text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingApprove ? "Approving..." : "Approve Student"}
              </button>
            )}

            {admission.status === "Approved" && (
              <div className="rounded-[600px] border border-ember-orange/30 bg-ember-orange/10 px-8 py-3.5 text-center text-sm font-semibold text-ember-orange">
                ✅ Student Approved
              </div>
            )}

            {admission.status === "Rejected" && (
              <div className="rounded-[600px] border border-red-200 bg-red-50 px-8 py-3.5 text-center text-sm font-semibold text-red-700">
                ❌ Admission Rejected
              </div>
            )}
          </div>

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
