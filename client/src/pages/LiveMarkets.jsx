import { useEffect, useState } from "react";
import ExpandedMarketChart from "./ExpandedMarketChart";
import { AdvancedRealTimeChart, TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { Activity, Maximize2, LayoutGrid, Square, Globe2 } from "lucide-react";
import { useMarketTicker } from "../hooks/useMarketTicker";
import useUltrawideCanvas from "../hooks/useUltrawideCanvas";
import "./LiveMarkets.css";

const CHARTS = [
  { symbol: "OANDA:XAUUSD", title: "XAUUSD", tag: "GOLD", name: "Gold / US Dollar", height: 500 },
  { symbol: "BITSTAMP:BTCUSD", title: "BTCUSD", tag: "CRYPTO", name: "Bitcoin / US Dollar", height: 500 },
  { symbol: "FX:GBPUSD", title: "GBPUSD", tag: "FOREX", name: "British Pound / US Dollar", height: 500 },
  { symbol: "FX:EURUSD", title: "EURUSD", tag: "FOREX", name: "Euro / US Dollar", height: 500 },
  { symbol: "TVC:USOIL", title: "USOIL", tag: "US OIL", name: "WTI Crude Oil", height: 500 },
  { symbol: "FOREXCOM:SPXUSD", title: "S&P 500", tag: "INDEX", name: "S&P 500 Index", height: 500 },
];

/* Approximate trading sessions in UTC hours (no DST adjustment). NSE is 09:15–15:30 IST. */
const SESSIONS = [
  { name: "Sydney", start: 21, end: 6, kind: "fx" },
  { name: "Tokyo", start: 0, end: 9, kind: "fx" },
  { name: "London", start: 7, end: 16, kind: "fx" },
  { name: "New York", start: 12, end: 21, kind: "fx" },
  { name: "NSE India", start: 3.75, end: 10, kind: "nse" },
];
const CHART_BG = "#161a15";

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = window.setInterval(() => setNow(new Date()), 15000); return () => window.clearInterval(id); }, []);
  return now;
}
const inRange = (h, s, e) => (s < e ? h >= s && h < e : h >= s || h < e);
function sessionOpen(session, now) {
  const h = now.getUTCHours() + now.getUTCMinutes() / 60;
  const day = now.getUTCDay();
  if (session.kind === "nse") {
    const ist = new Date(now.getTime() + 5.5 * 3600e3).getUTCDay();
    return ist !== 0 && ist !== 6 && inRange(h, session.start, session.end);
  }
  // Spot FX is closed from Friday ~21:00 UTC to Sunday ~21:00 UTC.
  const weekend = day === 6 || (day === 5 && h >= 21) || (day === 0 && h < 21);
  return !weekend && inRange(h, session.start, session.end);
}
const bars = (s) => (s.start < s.end ? [[s.start, s.end]] : [[s.start, 24], [0, s.end]]);

function Chart({ chart, height }) {
  return (
    <AdvancedRealTimeChart
      key={chart.symbol}
      theme="dark"
      backgroundColor={CHART_BG}
      toolbar_bg={CHART_BG}
      symbol={chart.symbol}
      height={height}
      width="100%"
    />
  );
}

export default function LiveMarkets() {
  useUltrawideCanvas();
  const [expandedChart, setExpandedChart] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [view, setView] = useState("focus");
  const now = useClock();
  const ticker = useMarketTicker();
  const active = CHARTS[activeIndex];
  const utcH = now.getUTCHours() + now.getUTCMinutes() / 60;
  const ist = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });
  const openCount = SESSIONS.filter((s) => sessionOpen(s, now)).length;

  return (
    <main className="alm">
      {/* ---------- Hero ---------- */}
      <header className="alm-hero">
        <div className="alm-shell alm-hero-grid">
          <div className="alm-hero-copy">
            <p className="alm-kicker"><Activity size={15} aria-hidden="true" />Live markets</p>
            <h1><span>Professional trading</span><span className="alm-accent">market dashboard.</span></h1>
            <p className="alm-lede">Track live financial markets including Gold, Bitcoin, Forex, S&amp;P 500 and US Oil with real-time charts and technical analysis.</p>
          </div>

          <section className="alm-sessions" aria-labelledby="alm-sessions-title">
            <div className="alm-sessions-top">
              <p id="alm-sessions-title"><Globe2 size={15} aria-hidden="true" />Global sessions</p>
              <span><time>{ist}</time> IST · {openCount} open</span>
            </div>
            <div className="alm-timeline" aria-hidden="true">
              <div className="alm-tl-labels">{SESSIONS.map((s) => <span key={s.name}>{s.name}</span>)}</div>
              <div className="alm-tl-area">
                <div className="alm-hours">{[0, 6, 12, 18, 24].map((h) => <span key={h} style={{ left: `${(h / 24) * 100}%` }}>{String(h).padStart(2, "0")}</span>)}</div>
                {SESSIONS.map((s) => (
                  <div key={s.name} className={`alm-track${sessionOpen(s, now) ? " is-open" : ""}${s.kind === "nse" ? " is-nse" : ""}`}>
                    {bars(s).map(([a, b]) => <i key={a} style={{ left: `${(a / 24) * 100}%`, width: `${((b - a) / 24) * 100}%` }} />)}
                  </div>
                ))}
                <span className="alm-now" style={{ left: `${(utcH / 24) * 100}%` }}><b>Now</b></span>
              </div>
            </div>
            <ul className="alm-session-list">
              {SESSIONS.map((s) => {
                const open = sessionOpen(s, now);
                return <li key={s.name} className={open ? "is-open" : ""}><i aria-hidden="true" />{s.name}<span>{open ? "Open" : "Closed"}</span></li>;
              })}
            </ul>
            <p className="alm-note">Approximate session hours in UTC, without daylight-saving changes. NSE: 09:15–15:30 IST, Mon–Fri.</p>
          </section>
        </div>

        {/* Reference prices */}
        <div className="alm-quotes" aria-label="Reference prices">
          <div className="alm-shell alm-quotes-row">
            {ticker.map((q) => {
              const down = String(q.change).startsWith("-");
              return (
                <div key={q.pair} className="alm-quote">
                  <span className="alm-quote-pair">{q.pair}</span>
                  <span className="alm-quote-price">{q.price}</span>
                  <span className={`alm-quote-chg${q.change === "—" ? "" : down ? " is-down" : " is-up"}`}>{q.change}</span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* ---------- Workspace ---------- */}
      <section className="alm-work" aria-labelledby="alm-work-title">
        <div className="alm-shell">
          <div className="alm-toolbar">
            <h2 id="alm-work-title">Market charts</h2>
            <div className="alm-toolbar-actions">
              <div className="alm-toggle" role="group" aria-label="Chart layout">
                <button type="button" aria-pressed={view === "focus"} className={view === "focus" ? "is-active" : ""} onClick={() => setView("focus")}><Square size={15} aria-hidden="true" />Focus</button>
                <button type="button" aria-pressed={view === "grid"} className={view === "grid" ? "is-active" : ""} onClick={() => setView("grid")}><LayoutGrid size={15} aria-hidden="true" />All charts</button>
              </div>
            </div>
          </div>

          {view === "focus" ? (
            <div className="alm-focus">
              <nav className="alm-watch" aria-label="Instruments">
                <p className="alm-watch-title">Watchlist</p>
                <ul>
                  {CHARTS.map((c, i) => (
                    <li key={c.symbol}>
                      <button type="button" className={i === activeIndex ? "is-active" : ""} aria-pressed={i === activeIndex} onClick={() => setActiveIndex(i)}>
                        <span className="alm-watch-n">0{i + 1}</span>
                        <span className="alm-watch-text"><strong>{c.title}</strong><small>{c.name}</small></span>
                        <span className="alm-tag">{c.tag}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="alm-panel">
                <div className="alm-panel-head">
                  <div><span className="alm-tag">{active.tag}</span><h3>{active.title}</h3><span className="alm-panel-name">{active.name}</span></div>
                  <button type="button" className="alm-icon-btn" onClick={() => setExpandedChart(active)} aria-label={`Maximize ${active.title} chart`} title={`Maximize ${active.title}`}><Maximize2 size={17} aria-hidden="true" /><span>Expand</span></button>
                </div>
                <div className="alm-widget alm-widget-main"><Chart chart={active} height={560} /></div>
              </div>
            </div>
          ) : (
            <div className="alm-grid">
              {CHARTS.map((chart, index) => (
                <section key={chart.symbol} className="alm-panel" aria-labelledby={`alm-chart-${index}`}>
                  <div className="alm-panel-head">
                    <div><span className="alm-watch-n">0{index + 1}</span><h3 id={`alm-chart-${index}`}>{chart.title}</h3><span className="alm-tag">{chart.tag}</span></div>
                    <button type="button" className="alm-icon-btn" onClick={() => setExpandedChart(chart)} aria-label={`Maximize ${chart.title} chart`} title={`Maximize ${chart.title}`}><Maximize2 size={16} aria-hidden="true" /></button>
                  </div>
                  <div className="alm-widget" style={{ minHeight: 420 }}><Chart chart={chart} height={420} /></div>
                </section>
              ))}
            </div>
          )}

          {/* Technical overview follows the selected instrument */}
          <section className="alm-analysis" aria-labelledby="alm-analysis-title">
            <div className="alm-analysis-copy">
              <p className="alm-kicker alm-kicker-dark">Technical overview</p>
              <h2 id="alm-analysis-title">Technical<br /><span>analysis.</span></h2>
              <span className="alm-analysis-pair">{active.title} <span>{active.name}</span></span>
              {view === "grid" && <p className="alm-analysis-hint">Pick an instrument in Focus view to change this summary.</p>}
            </div>
            <div className="alm-analysis-widget"><TechnicalAnalysis key={active.symbol} colorTheme="dark" isTransparent width="100%" symbol={active.symbol} /></div>
          </section>
        </div>
      </section>
      {expandedChart && <ExpandedMarketChart chart={expandedChart} onClose={() => setExpandedChart(null)} />}
    </main>
  );
}
