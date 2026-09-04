import React from "react";
import { motion } from "framer-motion";
import qrCode from "../../assets/razorpay-qr.jpeg";

const PaymentScreen = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-3xl bg-bone p-8"
      >
        <div className="text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
            Secure Checkout
          </span>
          <h1 className="mt-4 font-serif text-3xl leading-tight text-graphite">
            Alphira Capital
          </h1>
          <p className="mt-2 text-sm text-slate">Scan & Pay Securely</p>

          <div className="my-8 flex justify-center">
            <div className="rounded-2xl border border-pebble bg-vellum p-3">
              <img src={qrCode} alt="Razorpay QR" className="w-56 rounded-xl" />
            </div>
          </div>

          <p className="text-sm font-medium text-graphite">
            Scan using any UPI app
          </p>
          <p className="mt-2 text-xs text-slate">
            Google Pay • PhonePe • Paytm • BHIM
          </p>

          <div className="mt-6 rounded-xl border border-pebble bg-vellum p-4">
            <p className="text-xs text-slate">
              Payments are processed securely through Razorpay.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentScreen;
