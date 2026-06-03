const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-extrabold text-black">Privacy Policy</h1>

        <p className="mt-4 text-gray-500">Last Updated: May 2026</p>

        <div className="mt-12 space-y-10 text-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-black">
              Information We Collect
            </h2>

            <p className="mt-4 leading-relaxed">
              We may collect your name, email, mobile number, account details,
              course activity and payment information to provide educational
              services through ChartWiz Academy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black">
              How We Use Your Information
            </h2>

            <p className="mt-4 leading-relaxed">
              Your information helps us manage accounts, provide mentorship,
              process payments, improve user experience and send educational
              updates or promotional offers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black">Payment Security</h2>

            <p className="mt-4 leading-relaxed">
              Payments are securely processed through trusted third-party
              payment gateways like Razorpay. We do not store card or UPI
              credentials on our servers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black">Contact Us</h2>

            <p className="mt-4 leading-relaxed">chartwizacademy@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
