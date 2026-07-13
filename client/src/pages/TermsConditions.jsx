const SECTIONS = [
  {
    title: "Educational Purpose",
    body: "All content provided by ChartWiz Academy is strictly for educational purposes only. We do not guarantee profits or financial returns.",
  },
  {
    title: "User Responsibilities",
    body: "Users are responsible for protecting their account credentials and using the platform lawfully.",
  },
  {
    title: "Payments & Refunds",
    body: "Course access is granted after successful payment confirmation. Refund requests are subject to approval according to company policy.",
  },
  {
    title: "Limitation of Liability",
    body: "ChartWiz Academy is not responsible for trading losses, investment decisions or market-related risks.",
  },
  {
    title: "Contact Us",
    body: "chartwizacademy@gmail.com",
  },
];

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-vellum px-6 py-20">
      <div className="mx-auto max-w-3xl mt-10">
        <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
          Legal
        </span>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-graphite md:text-5xl">
          Terms & Conditions
        </h1>
        <p className="mt-4 text-sm text-slate">Last Updated: May 2026</p>

        <div className="mt-12 space-y-3">
          {SECTIONS.map((section) => (
            <div key={section.title} className="rounded-2xl bg-bone p-8">
              <h2 className="text-xl font-semibold text-graphite">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
