import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_URL } from "../../config/api";
import fetchWithAuth from "../../utils/fetchWithAuth";

const Invoices = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await fetchWithAuth(dispatch, `${API_URL}/api/payments`);
      setPayments(data.payments);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo) return;
    fetchInvoices();
  }, [userInfo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-obsidian border-t-transparent" />
      </div>
    );
  }

  if (!payments.length) {
    return (
      <div>
        <h1 className="mb-6 font-serif text-3xl leading-tight text-graphite">
          Invoices
        </h1>
        <div className="rounded-2xl bg-bone p-10 text-center">
          <p className="text-sm text-slate">No invoices found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl leading-tight text-graphite">
        Invoices
      </h1>

      <div className="overflow-x-auto rounded-2xl bg-bone">
        <table className="w-full">
          <thead>
            <tr className="border-b border-pebble">
              <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                Invoice No
              </th>
              <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                Student
              </th>
              <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                Amount
              </th>
              <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                Status
              </th>
              <th className="p-4 text-left text-xs font-mono uppercase tracking-wide text-slate">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
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
                <td className="p-4 font-mono text-sm font-medium text-graphite">
                  ₹{payment.amount}
                </td>
                <td className="p-4">
                  <span
                    className={`rounded-[600px] px-3 py-1 font-mono text-[11px] font-medium capitalize ${
                      payment.paymentStatus === "paid"
                        ? "bg-ember-orange/15 text-ember-orange"
                        : "border border-pebble text-slate"
                    }`}
                  >
                    {payment.paymentStatus}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate">
                  {new Date(payment.paidAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
