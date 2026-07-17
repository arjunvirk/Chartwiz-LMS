const PIXEL_ID = "2862464450778233";

export const initMetaPixel = () => {
  if (window.fbq) return;

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
  if (window.fbq) {
    window.fbq("track", "PageView");
  }
};

export const trackLead = () => {
  if (window.fbq) {
    window.fbq("track", "Lead");
  }
};

export const trackContact = () => {
  if (window.fbq) {
    window.fbq("track", "Contact");
  }
};

export const trackCompleteRegistration = (course) => {
  if (window.fbq) {
    window.fbq("track", "CompleteRegistration", {
      content_name: course,
    });
  }
};
