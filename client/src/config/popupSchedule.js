// When the marketing popups appear — edit the numbers here.
// All times are in milliseconds (helpers below keep them readable).
const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export const POPUP_SCHEDULE = {
  // Enquiry form (LeadPopup) — a full dialog, so shown sparingly.
  lead: {
    firstDelay: 8 * SEC,        // wait after the first page loads
    afterClose: 3 * DAY,        // closed without submitting → ask again after 3 days
    afterSubmit: 60 * DAY,      // submitted the form → leave them alone for 60 days
  },
  // 20% offer card (HomeOffer) — a small corner card on the homepage.
  offer: {
    firstDelay: 12 * SEC,       // after landing on the homepage
    afterClose: 20 * MIN,       // closed → can return after 20 minutes
    maxPerDay: 3,               // at most 3 appearances in 24 hours…
    afterMax: 2 * DAY,          // …then rest for 2 days
    afterCall: 14 * DAY,        // tapped "Call" → don't show for 14 days
    soundVolume: 0.22,          // 0 – 1, chime loudness
  },
};

const read = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; }
};
const write = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage blocked: popups still work for this visit */ }
};

/** Persistent per-popup state: { nextAt, shows: [timestamps] }. */
export function popupState(key) {
  const state = read(key);
  return { nextAt: Number(state.nextAt) || 0, shows: Array.isArray(state.shows) ? state.shows : [] };
}
export function savePopupState(key, state) { write(key, state); }
