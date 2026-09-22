const KEY = "alphira-cookie-consent-v1";
const EVENT = "alphira:cookie-consent";
export const SETTINGS_EVENT = "alphira:cookie-settings";
let memory = null;
let storageUnavailable = false;

export function getCookieConsent() {
  if (storageUnavailable) return memory;
  let stored;
  try { stored = localStorage.getItem(KEY); } catch { return memory; }
  try {
    const value = JSON.parse(stored);
    return value?.version === 1 && typeof value.marketing === "boolean" ? value : null;
  } catch { return null; }
}

export function saveCookieConsent(marketing) {
  memory = { version: 1, marketing: marketing === true, savedAt: new Date().toISOString() };
  try { localStorage.setItem(KEY, JSON.stringify(memory)); } catch { storageUnavailable = true; }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeConsent(listener) {
  const onStorage = (event) => { if (event.key === KEY || event.key === null) listener(); };
  window.addEventListener(EVENT, listener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}
