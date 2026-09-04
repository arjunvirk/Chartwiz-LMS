const SECTIONS = [
  {
    title: "1. Introduction",
    body: `Welcome to Alphira Capital ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you access our website, enroll in our educational programs, or use our services.`,
  },

  {
    title: "2. Information We Collect",
    body: `We may collect personal information including your full name, email address, mobile number, profile information, date of registration, login credentials, educational preferences, course progress, assignment submissions, payment history, invoices, communication records, and any information you voluntarily provide while using our platform.`,
  },

  {
    title: "3. How We Use Your Information",
    body: `Your information is used to create and manage your account, provide access to educational content, process enrollments and payments, verify your identity, issue invoices, provide customer support, improve our platform, analyze user engagement, send important notifications, respond to inquiries, and occasionally share updates regarding new courses, webinars, or educational events.`,
  },

  {
    title: "4. Cookies & Tracking Technologies",
    body: `Our website may use cookies, authentication cookies, local storage, analytics tools, and similar technologies to improve website performance, remember your preferences, keep you signed in securely, and understand how users interact with our platform.`,
  },

  {
    title: "5. Payment Information",
    body: `Payments are securely processed through trusted third-party payment gateways such as Razorpay. We never store your debit card, credit card, CVV, UPI PIN, or banking credentials on our servers. Payment information is handled directly by our payment partners using industry-standard security practices.`,
  },

  {
    title: "6. Data Security",
    body: `We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, misuse, alteration, disclosure, or destruction. While we strive to use commercially acceptable means to protect your information, no method of electronic storage or internet transmission is completely secure.`,
  },

  {
    title: "7. Sharing of Information",
    body: `We do not sell, rent, or trade your personal information to third parties. Information may only be shared with trusted service providers such as payment processors, cloud hosting providers, email service providers, analytics platforms, or when required by applicable law or legal authorities.`,
  },

  {
    title: "8. Student Accounts",
    body: `Students are responsible for maintaining the confidentiality of their account credentials. You are responsible for all activities performed under your account. Please notify us immediately if you suspect unauthorized access to your account.`,
  },

  {
    title: "9. Data Retention",
    body: `We retain your information only for as long as necessary to provide our educational services, comply with legal obligations, resolve disputes, maintain academic records, and enforce our agreements.`,
  },

  {
    title: "10. Your Rights",
    body: `Depending on applicable laws, you may have the right to access, update, correct, or request deletion of your personal information. You may also request a copy of your stored information by contacting us.`,
  },

  {
    title: "11. Children's Privacy",
    body: `Our services are intended for individuals who are legally eligible to enroll in educational programs. We do not knowingly collect personal information from children without appropriate parental or guardian consent where required by law.`,
  },

  {
    title: "12. Third-Party Services",
    body: `Our platform may contain links or integrations with third-party services including Google, Razorpay, YouTube, Google Meet, Cloudinary, and other educational or communication platforms. Their use is governed by their respective privacy policies.`,
  },

  {
    title: "13. Marketing Communications",
    body: `With your consent where required, we may send educational announcements, newsletters, webinar invitations, promotional offers, or important updates. You may opt out of marketing communications at any time while continuing to receive essential service-related notifications.`,
  },

  {
    title: "14. Changes to This Privacy Policy",
    body: `We may update this Privacy Policy periodically to reflect changes in our services, legal requirements, or business practices. The updated version will be posted on this page along with the revised "Last Updated" date.`,
  },

  {
    title: "15. Contact Us",
    body: `If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us.

Email: contact.alphiracapital@gmail.com

Website: https://www.alphiracapital.com`,
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
        <p className="mt-4 text-sm text-slate">Last Updated: July 2026</p>

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

export default PrivacyPolicy;
