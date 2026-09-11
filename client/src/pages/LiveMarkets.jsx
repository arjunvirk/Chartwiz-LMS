import { useState } from "react";
import ExpandedMarketChart from "./ExpandedMarketChart";
import { AdvancedRealTimeChart, TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, Maximize2 } from "lucide-react";
import "./LiveMarkets.css";

const CHARTS = [
  { symbol: "OANDA:XAUUSD", title: "XAUUSD", tag: "GOLD", height: 500 },
  { symbol: "BITSTAMP:BTCUSD", title: "BTCUSD", tag: "CRYPTO", height: 500 },
  { symbol: "FX:GBPUSD", title: "GBPUSD", tag: "FOREX", height: 500 },
  { symbol: "FX:EURUSD", title: "EURUSD", tag: "FOREX", height: 500 },
  { symbol: "TVC:USOIL", title: "USOIL", tag: "US OIL", height: 500 },
  { symbol: "FOREXCOM:SPXUSD", title: "S&P 500", tag: "INDEX", height: 500 },
];
export default function LiveMarkets() {
  const [expandedChart, setExpandedChart] = useState(null);
  const reduced = useReducedMotion();
  const reveal = { initial: reduced ? false : { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.05 }, transition: { duration: reduced ? 0 : 0.55 } };
  return <main className="alphira-markets-page">
    <div className="alphira-markets-container">
      <motion.header {...reveal} className="alphira-markets-heading">
        <p className="alphira-markets-eyebrow"><Activity size={15} aria-hidden="true" />Live Markets</p>
        <div><h1>Professional Trading<br /><span>Market Dashboard.</span></h1><p>Track live financial markets including Gold, Bitcoin, Forex, S&P 500 and US Oil with real-time charts and technical analysis.</p></div>
      </motion.header>
    </div>
    <div className="alphira-markets-container">
      <div className="alphira-markets-section-label"><span>MARKET CHARTS</span><span>GOLD / CRYPTO / FOREX / OIL / S&P 500</span></div>
      <div className="alphira-markets-grid">
        {CHARTS.map((chart, index) => <motion.section {...reveal} key={chart.symbol} className="alphira-markets-chart" aria-labelledby={`alphira-market-${index}`}>
          <div className="alphira-markets-chart-heading"><div><span className="alphira-markets-number">0{index + 1}</span><h2 id={`alphira-market-${index}`}>{chart.title}</h2></div><div className="alphira-markets-chart-actions"><span className="alphira-markets-tag">{chart.tag}</span><button type="button" onClick={() => setExpandedChart(chart)} aria-label={`Maximize ${chart.title} chart`} title={`Maximize ${chart.title}`}><Maximize2 size={17} aria-hidden="true" /></button></div></div>
          <div className="alphira-markets-widget" style={{ minHeight: chart.height }}><AdvancedRealTimeChart theme="light" backgroundColor="#f8f7f3" toolbar_bg="#f8f7f3" symbol={chart.symbol} height={chart.height} width="100%" /></div>
        </motion.section>)}
      </div>
      <section className="alphira-markets-analysis" aria-labelledby="alphira-analysis-title">
        <div className="alphira-markets-analysis-copy"><p className="alphira-markets-eyebrow">TECHNICAL OVERVIEW</p><h2 id="alphira-analysis-title">Technical<br /><span>Analysis.</span></h2><span className="alphira-markets-analysis-pair">XAUUSD <span>Gold / US Dollar</span></span></div>
        <div className="alphira-markets-analysis-widget"><TechnicalAnalysis colorTheme="light" width="100%" symbol="OANDA:XAUUSD" /></div>
      </section>
    </div>
    {expandedChart && <ExpandedMarketChart chart={expandedChart} onClose={() => setExpandedChart(null)} />}
  </main>;
}



