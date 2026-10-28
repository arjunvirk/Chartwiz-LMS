import { useEffect } from "react";

const BASE = "Alphira Capital";
const TITLES = [
  [/^\/$/, "Alphira Capital | Trading, Investment & Market Education"],
  [/^\/courses/, "Courses"],
  [/^\/live-courses/, "Live mentorship batches"],
  [/^\/about/, "About"],
  [/^\/admission\/success/, "Application received"],
  [/^\/admission/, "Apply for admission"],
  [/^\/live$/, "Live markets"],
  [/^\/login/, "Login"],
  [/^\/change-password/, "Change password"],
  [/^\/support/, "Support"],
  [/^\/privacy-policy/, "Privacy policy"],
  [/^\/terms-conditions/, "Terms & conditions"],
  [/\/profile$/, "Profile"],
  [/\/market-analysis\/[^/]+$/, "Market analysis"],
  [/\/market-analysis$|\/analysis$/, "Market analysis"],
  [/\/analysis\/create$/, "New analysis"],
  [/\/analysis\/[^/]+\/edit$/, "Edit analysis"],
  [/\/create-live-course$/, "New live batch"],
  [/\/live-courses$/, "Live classes"],
  [/\/courses$/, "Courses"],
  [/\/payment$/, "Pay fee"],
  [/\/payments$/, "Payments"],
  [/\/invoices$/, "Invoices"],
  [/\/leads\/[^/]+$/, "Lead details"],
  [/\/leads$/, "Leads"],
  [/\/admissions\/[^/]+$/, "Admission details"],
  [/\/admissions$/, "Admissions"],
  [/^\/(admin|teacher)?\/?dashboard$/, "Overview"],
];

export function usePageTitle(pathname) {
  useEffect(() => {
    const match = TITLES.find(([pattern]) => pattern.test(pathname));
    const title = match ? match[1] : "Page not found";
    document.title = title.startsWith(BASE) ? title : `${title} · ${BASE}`;
  }, [pathname]);
}
