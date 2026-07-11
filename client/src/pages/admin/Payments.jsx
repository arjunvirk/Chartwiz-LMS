import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchWithAuth from "../../utils/fetchWithAuth";
import toast from "react-hot-toast";
import { API_URL } from "../../config/api";

const inputClass =
  "rounded-xl border border-pebble bg-vellum px-4 py-3 text-sm outline-none focus:border-obsidian";

const Payments = () => {
  const dispatch = useDispatch();
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    amount: "",
    referenceNumber: "",
    remarks: "",
  });

  const fetchStudents = async () => {
    try {
      const data = await fetchWithAuth(dispatch, `${API_URL}/api/admin/users`);
      const studentUsers = data.users.filter(
        (user) => user.role === "student" && user.isVerified,
      );
      setStudents(studentUsers);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchPayments = async () => {
    try {
      const data = await fetchWithAuth(dispatch, `${API_URL}/api/payments`);
      setPayments(data.payments);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) return;
    fetchStudents();
    fetchPayments();
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createPayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetchWithAuth(dispatch, `${API_URL}/api/payments/offline`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toast.success("Payment recorded successfully");
      setFormData({
        studentId: "",
        amount: "",
        referenceNumber: "",
        remarks: "",
      });
      fetchPayments();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = async (paymentId, invoiceNumber) => {
    try {
      const response = await fetch(
        `${API_URL}/api/payments/${paymentId}/invoice`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to download invoice");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Invoice downloaded");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="font-serif text-3xl leading-tight text-graphite">
          Payment Management
        </h1>
        <p className="mt-2 text-sm text-slate">
          Record offline payments and manage invoices.
        </p>
      </div>

      {/* FORM CARD */}
      <div className="rounded-2xl bg-bone p-6">
        <h2 className="mb-6 text-lg font-semibold text-graphite">
          Record Offline Payment
        </h2>

        <form onSubmit={createPayment} className="grid gap-4 md:grid-cols-2">
          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="text"
            name="referenceNumber"
            placeholder="Reference Number"
            value={formData.referenceNumber}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="text"
            name="remarks"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleChange}
            className={inputClass}
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-[600px] bg-ember-orange py-3.5 font-mono text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
          >
            {loading ? "Saving Payment..." : "Save Payment"}
          </button>
        </form>
      </div>

      {/* PAYMENTS TABLE */}
      <div className="overflow-hidden rounded-2xl bg-bone">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-pebble">
                <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                  Invoice
                </th>
                <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                  Student
                </th>
                <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                  Email
                </th>
                <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                  Amount
                </th>
                <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                  Method
                </th>
                <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                  Status
                </th>
                <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                  Date
                </th>
                <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                  Invoice PDF
                </th>
              </tr>
            </thead>

            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="p-8 text-center text-sm text-slate"
                  >
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-b border-pebble last:border-0 hover:bg-vellum"
                  >
                    <td className="p-4 text-sm font-medium text-graphite">
                      {payment.invoiceNumber}
                    </td>
                    <td className="p-4 text-sm text-graphite">
                      {payment.studentName}
                    </td>
                    <td className="p-4 text-sm text-slate">{payment.email}</td>
                    <td className="p-4 font-mono text-sm font-semibold text-graphite">
                      ₹{payment.amount}
                    </td>
                    <td className="p-4 text-sm capitalize text-graphite">
                      {payment.paymentMethod}
                    </td>
                    <td className="p-4">
                      <span
                        className={`rounded-[600px] px-3 py-1 font-mono text-[11px] font-medium ${
                          payment.paymentStatus === "paid"
                            ? "bg-ember-orange/15 text-ember-orange"
                            : payment.paymentStatus === "pending"
                              ? "border border-pebble text-slate"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate">
                      {new Date(payment.paidAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() =>
                          downloadInvoice(payment._id, payment.invoiceNumber)
                        }
                        className="rounded-lg bg-obsidian px-3 py-2 text-xs font-medium text-vellum hover:bg-ember-orange hover:text-black"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
