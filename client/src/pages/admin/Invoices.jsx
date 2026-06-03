import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";

const Invoices = () => {
  const [payments, setPayments] = useState([]);

  const fetchInvoices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/payments`, {
        credentials: "include",
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      setPayments(data.payments);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Invoices</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
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
              <tr key={payment._id}>
                <td className="border p-3">{payment.invoiceNumber}</td>

                <td className="border p-3">{payment.studentName}</td>

                <td className="border p-3">₹{payment.amount}</td>

                <td className="border p-3">{payment.paymentStatus}</td>

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
