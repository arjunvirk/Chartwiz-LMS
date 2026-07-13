const SECTIONS = [
  {
    title: "Information We Collect",
    body: "We may collect your name, email, mobile number, account details, course activity and payment information to provide educational services through ChartWiz Academy.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information helps us manage accounts, provide mentorship, process payments, improve user experience and send educational updates or promotional offers.",
  },
  {
    title: "Payment Security",
    body: "Payments are securely processed through trusted third-party payment gateways like Razorpay. We do not store card or UPI credentials on our servers.",
  },
  {
    title: "Contact Us",
    body: "chartwizacademy@gmail.com",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-vellum px-6 py-20">
      <div className="mx-auto max-w-3xl mt-10">
        <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
          Legal
        </span>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-graphite md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate">Last Updated: May 2026</p>

        <div className="mt-12 space-y-3">
          {SECTIONS.map((section) => (
            <div key={section.title} className="rounded-2xl bg-bone p-8">
              <h2 className="text-xl font-semibold text-graphite">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
