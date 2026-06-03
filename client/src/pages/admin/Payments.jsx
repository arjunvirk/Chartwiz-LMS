import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../../config/api";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    amount: "",
    referenceNumber: "",
    remarks: "",
  });

  // ================= FETCH STUDENTS =================

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/users`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const studentUsers = data.users.filter(
        (user) => user.role === "student" && user.isVerified,
      );

      setStudents(studentUsers);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= FETCH PAYMENTS =================

  const fetchPayments = async () => {
    try {
      const response = await fetch(`${API_URL}/api/payments`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setPayments(data.payments);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchPayments();
  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= CREATE PAYMENT =================

  const createPayment = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/payments/offline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

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

  // ================= UI =================

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Payment Management</h1>

        <p className="mt-2 text-gray-500">
          Record offline payments and manage invoices.
        </p>
      </div>

      {/* FORM CARD */}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Record Offline Payment</h2>

        <form onSubmit={createPayment} className="grid gap-4 md:grid-cols-2">
          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
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
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />

          <input
            type="text"
            name="referenceNumber"
            placeholder="Reference Number"
            value={formData.referenceNumber}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />

          <input
            type="text"
            name="remarks"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-black py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
          >
            {loading ? "Saving Payment..." : "Save Payment"}
          </button>
        </form>
      </div>

      {/* PAYMENTS TABLE */}

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left">Invoice</th>
                <th className="p-4 text-left">Student</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Method</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment._id} className="border-t border-gray-100">
                    <td className="p-4 font-medium">{payment.invoiceNumber}</td>

                    <td className="p-4">{payment.studentName}</td>

                    <td className="p-4">{payment.email}</td>

                    <td className="p-4 font-semibold">₹{payment.amount}</td>

                    <td className="p-4 capitalize">{payment.paymentMethod}</td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          payment.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : payment.paymentStatus === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.paymentStatus}
                      </span>
                    </td>

                    <td className="p-4">
                      {new Date(payment.paidAt).toLocaleDateString()}
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
