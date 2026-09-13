import "./Invoices.css";
import { ReceiptText } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_URL } from "../../config/api";
import fetchWithAuth from "../../utils/fetchWithAuth";

const Invoices = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchWithAuth(dispatch, `${API_URL}/api/payments`);
      setPayments(data.payments || []);
    } catch (error) {
      setError(error.message || "Unable to load invoices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo) return;
    fetchInvoices();
  }, [userInfo]);

  const formatAmount = (amount) => {
    if (amount == null || amount === "" || !Number.isFinite(Number(amount))) return "—";
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(Number(amount));
  };
  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };
  return (
    <section className="alphira-invoices" aria-labelledby="alphira-invoices-title">
      <header className="alphira-invoices-heading">
        <div><p className="alphira-invoices-eyebrow">Administration / Billing records</p><h1 id="alphira-invoices-title">Invoices<span>.</span></h1><p>Student payments, clearly documented.</p></div>
        <div className="alphira-invoices-count"><ReceiptText size={22} aria-hidden="true" /><div><small>Invoice records</small><strong>{loading ? "…" : error ? "—" : payments.length}</strong></div></div>
      </header>
      <div className="alphira-invoices-ledger" aria-busy={loading}>
        <div className="alphira-invoices-ledger-heading"><h2>Payment ledger</h2><span>Currency · INR</span></div>
        {loading ? <div className="alphira-invoices-state" role="status">Loading invoices…</div>
          : error ? <div className="alphira-invoices-state is-error" role="alert"><h2>Invoices couldn’t be loaded</h2><p>{error}</p></div>
          : !payments.length ? <div className="alphira-invoices-state"><ReceiptText size={32} aria-hidden="true" /><h2>No invoices yet</h2><p>Your invoice records will appear here when available.</p></div>
          : <div className="alphira-invoices-scroll" tabIndex={0} role="region" aria-label="Invoice records; scroll horizontally on smaller screens">
            <table className="alphira-invoices-table">
              <thead><tr><th scope="col">Invoice number</th><th scope="col">Student</th><th scope="col" className="alphira-invoices-amount">Amount</th><th scope="col">Status</th><th scope="col">Payment date</th></tr></thead>
              <tbody>{payments.map((payment) => <tr key={payment._id}>
                <td><span className="alphira-invoices-reference">{payment.invoiceNumber || "—"}</span></td>
                <td>{payment.studentName || "—"}</td>
                <td className="alphira-invoices-amount">{formatAmount(payment.amount)}</td>
                <td><span className={`alphira-invoices-status ${String(payment.paymentStatus).toLowerCase() === "paid" ? "is-paid" : ""}`}>{payment.paymentStatus || "—"}</span></td>
                <td className="alphira-invoices-date">{formatDate(payment.paidAt)}</td>
              </tr>)}</tbody>
            </table>
          </div>}
      </div>
    </section>
  );
};
export default Invoices;
