import "./Payments.css";
import { Download, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchWithAuth from "../../utils/fetchWithAuth";
import toast from "react-hot-toast";
import { API_URL } from "../../config/api";

const inputClass =
  "alphira-payments-input";

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
    <div className="alphira-payments">
      {/* HEADER */}
      <div className="alphira-payments-heading">
        <p className="alphira-payments-eyebrow">Administration / Payments</p>
        <h1 className="alphira-payments-title">
          Payment Management
        </h1>
        <p className="mt-2 text-sm text-slate">
          Record offline payments and manage invoices.
        </p>
      </div>

      {/* FORM CARD */}
      <div className="alphira-payments-entry">
        <div className="alphira-payments-intro"><span className="alphira-payments-eyebrow">01 / Record a payment</span><h2>Offline payment.</h2><p>Add a payment received outside the platform to a verified student’s account.</p><small>Student, amount and reference number are required.</small></div>

        <form onSubmit={createPayment} className="alphira-payments-form" aria-busy={loading}>
          <div className="alphira-payments-field"><label htmlFor="payment-student">Student</label><select
            id="payment-student" name="studentId"
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
          </select></div>

          <div className="alphira-payments-field"><label htmlFor="payment-amount">Amount (INR)</label><input
            type="number"
            id="payment-amount" name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className={inputClass}
          /></div>

          <div className="alphira-payments-field"><label htmlFor="payment-referenceNumber">Reference number</label><input
            type="text"
            id="payment-referenceNumber" name="referenceNumber"
            placeholder="Reference Number"
            value={formData.referenceNumber}
            onChange={handleChange}
            required
            className={inputClass}
          /></div>

          <div className="alphira-payments-field"><label htmlFor="payment-remarks">Remarks (optional)</label><input
            type="text"
            id="payment-remarks" name="remarks"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleChange}
            className={inputClass}
          /></div>

          <button
            type="submit"
            disabled={loading}
            className="alphira-payments-save"
          >
            {loading ? "Saving Payment..." : "Save Payment"}<ArrowRight size={17} aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* PAYMENTS TABLE */}
      <div className="alphira-payments-ledger">
        <div className="alphira-payments-ledger-heading"><h2>Payment records</h2><span>Invoices &amp; receipts</span></div>
        <div className="alphira-payments-scroll" tabIndex={0} role="region" aria-label="Payment records; scroll horizontally on smaller screens">
          <table className="alphira-payments-table">
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
                      {Number.isFinite(Number(payment.amount)) && payment.amount != null ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(Number(payment.amount)) : "—"}
                    </td>
                    <td className="p-4 text-sm capitalize text-graphite">
                      {payment.paymentMethod}
                    </td>
                    <td className="p-4">
                      <span
                        className={`alphira-payments-status ${
                          payment.paymentStatus === "paid"
                            ? "is-paid"
                            : payment.paymentStatus === "pending"
                              ? "is-pending"
                              : "is-error"
                        }`}
                      >
                        {payment.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate">
                      {payment.paidAt && !Number.isNaN(new Date(payment.paidAt).getTime()) ? new Date(payment.paidAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() =>
                          downloadInvoice(payment._id, payment.invoiceNumber)
                        }
                        className="alphira-payments-download" type="button" aria-label={`Download invoice ${payment.invoiceNumber}`}
                      >
                        <Download size={14} aria-hidden="true" /> PDF
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
