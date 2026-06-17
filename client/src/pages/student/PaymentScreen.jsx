import React from "react";
import qrCode from "../../assets/razorpay-qr.jpeg";

const PaymentScreen = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">ChartWiz Academy</h1>

          <p className="mt-2 text-gray-500">Scan & Pay Securely</p>

          <div className="my-8 flex justify-center">
            <img
              src={qrCode}
              alt="Razorpay QR"
              className="w-64 rounded-2xl border border-gray-200 p-2"
            />
          </div>

          <p className="font-medium text-gray-700">Scan using any UPI app</p>

          <p className="mt-2 text-sm text-gray-500">
            Google Pay • PhonePe • Paytm • BHIM
          </p>

          <div className="mt-6 rounded-2xl bg-gray-100 p-3">
            <p className="text-xs text-gray-600">
              Payments are processed securely through Razorpay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
