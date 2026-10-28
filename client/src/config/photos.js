// High-resolution program photography, served from Unsplash's image CDN
// (free under the Unsplash License). The CDN resizes and picks AVIF/WebP per
// browser, so every screen downloads only the size it needs, up to 4K.
// To swap a CDN photo, change its `id` (the "photo-…" part of an images.unsplash.com URL);
// bundled artwork uses `local` with one file per width.
import orderflowLocal from "../assets/images/home/orderflow-1600.webp";
import cryptoLocal from "../assets/images/home/crypto-1600.webp";
import fx1280 from "../assets/images/home/forex-fx-1280.webp";
import fx1920 from "../assets/images/home/forex-fx-1920.webp";
import fx2560 from "../assets/images/home/forex-fx-2560.webp";
import fx3840 from "../assets/images/home/forex-fx-3840.webp";
import bse1280 from "../assets/images/home/indian-bse-1280.webp";
import bse1920 from "../assets/images/home/indian-bse-1920.webp";
import bse2560 from "../assets/images/home/indian-bse-2560.webp";
import bse3840 from "../assets/images/home/indian-bse-3840.webp";

const CDN = "https://images.unsplash.com/";

export const PHOTOS = {
  // Brand artwork (dollar & euro; Bombay Stock Exchange tower), bundled at 1280–3840px.
  forex: { local: { 1280: fx1280, 1920: fx1920, 2560: fx2560, 3840: fx3840 }, focus: "50% 50%" },
  indian: { local: { 1280: bse1280, 1920: bse1920, 2560: bse2560, 3840: bse3840 }, focus: "55% 30%" },
  orderflow: { id: "photo-1611974789855-9c2a0a7236a3", credit: "Maxim Hopman", fallback: orderflowLocal, focus: "50% 50%" },
  crypto: { id: "photo-1518546305927-5a555bb7020d", credit: "André François McKenzie", fallback: cryptoLocal, focus: "50% 50%" },
};

const url = (id, width, ratio) => {
  const params = new URLSearchParams({ auto: "format", fit: "crop", crop: "entropy", w: String(width), q: width >= 2400 ? "68" : "75" });
  if (ratio) params.set("h", String(Math.round(width / ratio)));
  return `${CDN}${id}?${params}`;
};

/**
 * Responsive <img> props for a photo.
 * hero: full-bleed, up to 3840px (4K). card: 3:2 crop for program cards.
 */
export function photoProps(key, variant = "hero") {
  const photo = PHOTOS[key];
  const sizes = variant === "hero" ? "100vw" : "(max-width: 800px) 100vw, (max-width: 1100px) 50vw, 33vw";
  if (photo.local) {
    const entries = Object.entries(photo.local);
    return {
      src: photo.local[1920],
      srcSet: entries.map(([w, file]) => `${file} ${w}w`).join(", "),
      sizes,
      style: { objectPosition: photo.focus },
    };
  }
  const widths = variant === "hero" ? [960, 1440, 1920, 2560, 3840] : [480, 720, 960, 1440, 1920];
  const ratio = variant === "card" ? 3 / 2 : undefined;
  return {
    src: url(photo.id, variant === "hero" ? 1920 : 960, ratio),
    srcSet: widths.map((w) => `${url(photo.id, w, ratio)} ${w}w`).join(", "),
    sizes,
    style: { objectPosition: photo.focus },
    // If the CDN is unreachable, fall back to the bundled image.
    onError: (event) => {
      const img = event.currentTarget;
      if (img.dataset.fallback) return;
      img.dataset.fallback = "1";
      img.removeAttribute("srcset");
      img.src = photo.fallback;
    },
  };
}

export const programPhotoKey = (title = "") =>
  /crypto/i.test(title) ? "crypto" : /order[\s-]*flow/i.test(title) ? "orderflow" : /indian|india/i.test(title) ? "indian" : "forex";
