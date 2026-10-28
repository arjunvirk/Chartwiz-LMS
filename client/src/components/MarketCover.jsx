import "./MarketCover.css";

// Generated cover art for market analyses and courses without an image.
// A seeded line chart keyed to the item's id so each cover is distinct but stable.
const hash = (value = "") => { let h = 2166136261; for (const ch of String(value)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };

export default function MarketCover({ seed, label, className = "" }) {
  let s = hash(seed) || 1;
  const rand = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const trend = rand() > 0.35 ? 1 : -1;
  let v = 50;
  const pts = Array.from({ length: 24 }, (_, i) => { v += trend * 1.4 + (rand() - 0.5) * 9; return [i * (400 / 23), v]; });
  const min = Math.min(...pts.map((p) => p[1])), max = Math.max(...pts.map((p) => p[1]));
  const norm = pts.map(([x, y]) => [x, 30 + (1 - (y - min) / (max - min || 1)) * 140]);
  const line = norm.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L400 225 L0 225 Z`;
  const id = `mc-${hash(seed) % 100000}`;
  return (
    <div className={`ac-market-cover ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 225" preserveAspectRatio="none">
        <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".28" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
        {[56, 112, 168].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} className="ac-market-cover-grid" />)}
        <path d={area} fill={`url(#${id})`} />
        <path d={line} className="ac-market-cover-line" />
        <circle cx={norm[norm.length - 1][0] - 4} cy={norm[norm.length - 1][1]} r="4" className="ac-market-cover-dot" />
      </svg>
      {label && <span className="ac-market-cover-label">{label}</span>}
    </div>
  );
}
