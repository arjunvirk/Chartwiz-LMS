import LegalLayout from "./LegalLayout";

const SECTIONS = [
  {
    title: "Educational Purpose",
    body: "All content provided by Alphira Capital is strictly for educational purposes only. We do not guarantee profits or financial returns.",
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
    body: "Alphira Capital is not responsible for trading losses, investment decisions or market-related risks.",
  },
  {
    title: "Contact Us",
    body: "contact.alphiracapital@gmail.com",
  },
];

export default function TermsConditions() {
  return <LegalLayout title="Terms & Conditions" description="The terms that guide your use of our learning platform." updated="May 2026" sections={SECTIONS} />;
}
