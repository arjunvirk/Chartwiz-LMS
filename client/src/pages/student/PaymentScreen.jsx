import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRazorpayOrder } from "../../actions/razorpayActions";

const PaymentScreen = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const handlePayment = async () => {
    try {
      const order = await dispatch(createRazorpayOrder(999));

      if (!order) return;

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "ChartWiz Academy",

        description: "Enrollment Fee",

        prefill: {
          name: userInfo?.name || "",
          email: userInfo?.email || "",
          contact: userInfo?.phone || "",
        },

        handler: function (response) {
          console.log("Payment Success:", response);

          alert("Payment Successful! Admin will review your enrollment.");
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error(response.error);

        alert(response.error.description || "Payment Failed");
      });

      razorpay.open();
    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body text-center p-5">
          <h2 className="mb-3">ChartWiz Academy</h2>

          <h4 className="mb-4">Enrollment Fee</h4>

          <h1 className="display-4 mb-4">₹999</h1>

          <ul className="list-unstyled mb-4">
            <li>✔ Live Sessions</li>
            <li>✔ Recorded Lessons</li>
            <li>✔ Market Analysis</li>
            <li>✔ Student Support</li>
          </ul>

          <button onClick={handlePayment} className="btn btn-dark btn-lg">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
