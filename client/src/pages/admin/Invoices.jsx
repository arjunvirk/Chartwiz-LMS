import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_URL } from "../../config/api";
import fetchWithAuth from "../../utils/fetchWithAuth";

const Invoices = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= FETCH INVOICES =================

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

  // ================= LOAD =================

  useEffect(() => {
    if (!userInfo) return;

    fetchInvoices();
  }, [userInfo]);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Loading invoices...
      </div>
    );
  }

  // ================= EMPTY =================

  if (!payments.length) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-bold">Invoices</h1>

        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">No invoices found.</p>
        </div>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Invoices</h1>

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Invoice No</th>
              <th className="border p-3">Student</th>
              <th className="border p-3">Amount</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="hover:bg-gray-50">
                <td className="border p-3">{payment.invoiceNumber}</td>

                <td className="border p-3">{payment.studentName}</td>

                <td className="border p-3">₹{payment.amount}</td>

                <td className="border p-3 capitalize">
                  {payment.paymentStatus}
                </td>

                <td className="border p-3">
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
