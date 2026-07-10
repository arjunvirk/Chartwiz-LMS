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
  GraduationCap,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getAdmissionDetails,
  updateAdmission,
  approveAdmission,
} from "../../actions/admissionActions";

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

      // Refresh admission details
      dispatch(getAdmissionDetails(id));
    }

    if (errorUpdate) {
      toast.error(errorUpdate);
    }

    if (successApprove) {
      toast.success("Admission approved successfully");

      // Refresh admission details
      dispatch(getAdmissionDetails(id));
    }

    if (errorApprove) {
      toast.error(errorApprove);
    }
  }, [dispatch, id, successUpdate, errorUpdate, successApprove, errorApprove]);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-16 text-center shadow-sm">
        <h2 className="text-2xl font-bold">Loading Admission...</h2>
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

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateAdmission(id, {
        status,
        paymentStatus,
        batch,
        mentor,
        notes,
      }),
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
    <form onSubmit={submitHandler} className="space-y-8">
      {/* BACK */}

      <Link
        to="/admin/dashboard/admissions"
        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-gray-100"
      >
        <ArrowLeft size={18} />
        Back to Admissions
      </Link>

      {/* HEADER */}

      <div className="rounded-3xl bg-linear-to-r from-black to-gray-800 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-extrabold">Admission Details</h1>

        <p className="mt-3 text-gray-300">
          Review this application before approving student admission.
        </p>
      </div>

      {/* INFO */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* PERSONAL */}

        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="mb-8 text-2xl font-bold">Personal Information</h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <User className="text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Full Name</p>

                <p className="font-semibold">{admission.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Email</p>

                <p className="font-semibold">{admission.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Phone</p>

                <p className="font-semibold">{admission.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Address</p>

                <p className="font-semibold">{admission.address || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* COURSE */}

        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="mb-8 text-2xl font-bold">Course Information</h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <BookOpen className="text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Selected Course</p>

                <p className="font-semibold">{admission.course}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Applied On</p>

                <p className="font-semibold">
                  {new Date(admission.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Current Status</p>

                <p className="font-semibold">{admission.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ADMISSION MANAGEMENT */}

        <div className="rounded-3xl border bg-white p-8 shadow-sm lg:col-span-2">
          <h2 className="mb-8 text-2xl font-bold">Admission Management</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* STATUS */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Admission Status
              </label>

              <select
                disabled={
                  admission.status === "Approved" ||
                  admission.status === "Rejected"
                }
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                <option value="Pending">Pending</option>

                <option value="Contacted">Contacted</option>

                <option value="Documents Pending">Documents Pending</option>

                <option value="Payment Pending">Payment Pending</option>
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
                <option value="Pending">Pending</option>

                <option value="Partially Paid">Partially Paid</option>

                <option value="Paid">Paid</option>
              </select>
            </div>

            {/* BATCH */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Assign Batch
              </label>

              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                <option value="">Select Batch</option>

                <option>August 2026 Morning Batch</option>

                <option>August 2026 Evening Batch</option>

                <option>September 2026 Morning Batch</option>

                <option>September 2026 Evening Batch</option>
              </select>
            </div>

            {/* MENTOR */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Assign Mentor
              </label>

              <select
                value={mentor}
                onChange={(e) => setMentor(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                <option value="">Select Mentor</option>

                <option>ChartWiz Faculty 1</option>

                <option>ChartWiz Faculty 2</option>

                <option>ChartWiz Faculty 3</option>
              </select>
            </div>
          </div>

          {/* NOTES */}

          <div className="mt-8">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Admission Notes
            </label>

            <textarea
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write internal notes..."
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>
        </div>

        {/* ADMISSION TIMELINE */}

        <div className="rounded-3xl border bg-white p-8 shadow-sm lg:col-span-2">
          <h2 className="mb-8 text-2xl font-bold">Admission Timeline</h2>

          <div className="space-y-8 border-l-2 border-gray-300 pl-8">
            <div className="relative">
              <span className="absolute -left-10.25 h-5 w-5 rounded-full bg-green-500"></span>

              <h3 className="font-bold">Admission Submitted</h3>

              <p className="text-sm text-gray-500">
                {admission.createdAt
                  ? new Date(admission.createdAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-10.25 h-5 w-5 rounded-full bg-blue-500"></span>

              <h3 className="font-bold">Counselor Review</h3>

              <p className="text-sm text-gray-500">Waiting for review</p>
            </div>

            <div className="relative">
              <span className="absolute -left-10.25 h-5 w-5 rounded-full bg-yellow-500"></span>

              <h3 className="font-bold">Payment Verification</h3>

              <p className="text-sm text-gray-500">{paymentStatus}</p>
            </div>

            <div className="relative">
              <span className="absolute -left-10.25 h-5 w-5 rounded-full bg-purple-500"></span>

              <h3 className="font-bold">Final Admission Status</h3>

              <p className="text-sm text-gray-500">{status}</p>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}

        <div className="rounded-3xl border bg-white p-8 shadow-sm lg:col-span-2">
          <h2 className="mb-8 text-2xl font-bold">Admission Actions</h2>

          <div className="flex flex-wrap gap-4">
            {/* SAVE */}

            {admission.status !== "Approved" &&
              admission.status !== "Rejected" && (
                <button
                  type="submit"
                  className="rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-gray-800"
                >
                  Save Changes
                </button>
              )}

            {!admission.studentCreated && admission.status !== "Rejected" && (
              <button
                type="button"
                onClick={approveHandler}
                disabled={paymentStatus !== "Paid" || loadingApprove}
                className="rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingApprove ? "Approving..." : "Approve Student"}
              </button>
            )}

            {/* APPROVED BADGE */}

            {admission.status === "Approved" && (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-8 py-4 text-center font-bold text-green-700">
                ✅ Student Approved
              </div>
            )}

            {/* REJECTED BADGE */}

            {admission.status === "Rejected" && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-8 py-4 text-center font-bold text-red-700">
                ❌ Admission Rejected
              </div>
            )}
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Approving this admission will automatically create the student
            account and enroll the student in the selected course.
          </p>
        </div>
      </div>
    </form>
  );
};

export default AdmissionDetailsScreen;
