import { motion, useReducedMotion } from "framer-motion";
import qrCode from "../../assets/razorpay-qr.jpeg";
import "./PaymentScreen.css";

const PaymentScreen = () => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      className="alphira-payment"
      aria-labelledby="payment-title"
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="alphira-payment-heading">
        <span className="alphira-payment-eyebrow">Student services / Payments</span>
        <h1 id="payment-title">One scan. All set.</h1>
        <p>A simple way to pay your academy fees using your preferred UPI app.</p>
      </header>

      <div className="alphira-payment-layout">
        <div className="alphira-payment-guide">
          <div className="alphira-payment-brand">
            <span>ALPHIRA CAPITAL</span><span>ACADEMY</span>
          </div>
          <div className="alphira-payment-intro">
            <span className="alphira-payment-eyebrow">Your next step</span>
            <h2>Focus on learning.<br />Keep payments simple.</h2>
            <p>Use the QR code to make your fee payment directly from any UPI app.</p>
          </div>
          <ol className="alphira-payment-steps">
            <li><span>01</span><div><h3>Open your UPI app</h3><p>Google Pay, PhonePe, Paytm or BHIM.</p></div></li>
            <li><span>02</span><div><h3>Scan the code</h3><p>Check the recipient and enter your fee amount.</p></div></li>
            <li><span>03</span><div><h3>Complete your payment</h3><p>Keep the transaction reference for your records.</p></div></li>
          </ol>
          <div className="alphira-payment-help">Need help with your fees? <a href="tel:+919217222356">+91 92172 22356 <span aria-hidden="true">↗</span></a></div>
        </div>

        <motion.div
          className="alphira-payment-card"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reducedMotion ? 0 : 0.15 }}
        >
          <div className="alphira-payment-card-top"><span>FEE PAYMENT</span><span>UPI</span></div>
          <h2>Scan & pay</h2>
          <p className="alphira-payment-caption">With any UPI app</p>
          <div className="alphira-payment-qr-frame">
            {/* Viewport isolates the original QR and its quiet zone; payment data is unchanged. */}
            <svg viewBox="126 638 420 420" role="img" aria-label="Scan this QR code to pay Rohit Kumar through Razorpay" className="alphira-payment-qr">
              <image href={qrCode} width="674" height="1644" />
            </svg>
          </div>
          <div className="alphira-payment-recipient"><span>Payment recipient</span><strong>ROHIT KUMAR</strong></div>
          <p className="alphira-payment-provider">Payments processed through Razorpay</p>
          <div className="alphira-payment-note">Confirm the recipient and amount in your UPI app before paying.</div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PaymentScreen;
