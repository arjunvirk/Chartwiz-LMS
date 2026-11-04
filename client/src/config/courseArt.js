// Program artwork for the Courses page: on-brand "symbol" scenes rendered at
// 2560 × 1600 and bundled as WebP at 1280 / 1920 / 2560px.
//   forex     – metallic $ and € with a rising candle trail
//   indian    – ₹ and $ over NIFTY 50 / USD/INR lines
//   crypto    – a ₿ coin over a spot/futures depth chart
//   orderflow – a bid × ask footprint chart with a volume profile and POC
import forex1280 from "../assets/images/courses/forex-1280.webp";
import forex1920 from "../assets/images/courses/forex-1920.webp";
import forex2560 from "../assets/images/courses/forex-2560.webp";
import indian1280 from "../assets/images/courses/indian-1280.webp";
import indian1920 from "../assets/images/courses/indian-1920.webp";
import indian2560 from "../assets/images/courses/indian-2560.webp";
import crypto1280 from "../assets/images/courses/crypto-1280.webp";
import crypto1920 from "../assets/images/courses/crypto-1920.webp";
import crypto2560 from "../assets/images/courses/crypto-2560.webp";
import orderflow1280 from "../assets/images/courses/orderflow-1280.webp";
import orderflow1920 from "../assets/images/courses/orderflow-1920.webp";
import orderflow2560 from "../assets/images/courses/orderflow-2560.webp";

const ART = {
  forex: { 1280: forex1280, 1920: forex1920, 2560: forex2560 },
  indian: { 1280: indian1280, 1920: indian1920, 2560: indian2560 },
  crypto: { 1280: crypto1280, 1920: crypto1920, 2560: crypto2560 },
  orderflow: { 1280: orderflow1280, 1920: orderflow1920, 2560: orderflow2560 },
};

export const courseArtKey = (title = "") =>
  /crypto/i.test(title) ? "crypto" : /order[\s-]*flow/i.test(title) ? "orderflow" : /indian|india/i.test(title) ? "indian" : "forex";

/** Responsive <img> props for a program's artwork. */
export function courseArtProps(title, sizes) {
  const set = ART[courseArtKey(title)];
  return {
    src: set[1920],
    srcSet: Object.entries(set).map(([w, file]) => `${file} ${w}w`).join(", "),
    sizes,
    width: 1600,
    height: 1000,
  };
}
