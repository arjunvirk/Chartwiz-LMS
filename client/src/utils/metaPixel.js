import { getCookieConsent } from "./cookieConsent";

const PIXEL_ID = "2862464450778233";

export const initMetaPixel = () => {
  if (!getCookieConsent()?.marketing || window.fbq) return;

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script");

  window.fbq("init", PIXEL_ID);
};

export const trackPageView = () => {
  if (getCookieConsent()?.marketing && window.fbq) {
    window.fbq("track", "PageView");
  }
};

export const trackLead = () => {
  if (getCookieConsent()?.marketing && window.fbq) {
    window.fbq("track", "Lead");
  }
};

export const trackContact = () => {
  if (getCookieConsent()?.marketing && window.fbq) {
    window.fbq("track", "Contact");
  }
};

export const trackCompleteRegistration = (course) => {
  if (getCookieConsent()?.marketing && window.fbq) {
    window.fbq("track", "CompleteRegistration", {
      content_name: course,
    });
  }
};

export function syncMetaConsent() {
  if (getCookieConsent()?.marketing) {
    initMetaPixel();
    window.fbq?.("consent", "grant");
  } else {
    // Discard events still waiting for the library, then revoke runtime consent.
    if (Array.isArray(window.fbq?.queue)) {
      window.fbq.queue = window.fbq.queue.filter((command) => !String(command[0]).startsWith("track"));
    }
    window.fbq?.("consent", "revoke");
    const parts = window.location.hostname.split(".");
    const domains = ["", ...parts.map((_, index) => parts.slice(index).join("."))];
    for (const name of ["_fbp", "_fbc"]) {
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""}`;
      }
    }
  }
}
