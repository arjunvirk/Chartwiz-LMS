import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { syncMetaConsent, trackPageView } from "../utils/metaPixel";
import { getCookieConsent, subscribeConsent } from "../utils/cookieConsent";

export default function MetaPixelTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    let allowed = Boolean(getCookieConsent()?.marketing);
    syncMetaConsent();
    if (allowed) trackPageView();
    return subscribeConsent(() => {
      const next = Boolean(getCookieConsent()?.marketing);
      syncMetaConsent();
      if (next && !allowed) trackPageView();
      allowed = next;
    });
  }, [pathname]);
  return null;
}
