import {
  AdvancedRealTimeChart,
  TickerTape,
  TechnicalAnalysis,
} from "react-ts-tradingview-widgets";
import { motion } from "framer-motion";

const CHARTS = [
  { symbol: "OANDA:XAUUSD", title: "XAUUSD", tag: "GOLD" },
  { symbol: "BITSTAMP:BTCUSD", title: "BTCUSD", tag: "CRYPTO" },
  { symbol: "FX:GBPUSD", title: "GBPUSD", tag: "FOREX" },
  { symbol: "FX:EURUSD", title: "EURUSD", tag: "FOREX" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const LiveMarkets = () => {
  return (
    <div className="min-h-screen bg-obsidian text-vellum">
      {/* HERO */}
      <div className="border-b border-white/10 px-4 py-10 sm:px-6 lg:px-10 mt-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[-0.02em] text-ember-orange mt-10">
              Live Markets
            </span>
          </div>

          <h1 className="mt-6 font-serif text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            Professional Trading{" "}
            <span className="text-ember-orange">Market Dashboard</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-mist sm:text-lg">
            Track live financial markets including Gold, Bitcoin, Forex, NASDAQ
            and Dollar Index with real-time charts and technical analysis.
          </p>
        </div>
      </div>

      {/* TICKER */}
      <div className="border-b border-white/10 bg-onyx py-2">
        <TickerTape
          colorTheme="dark"
          symbols={[
            { proName: "OANDA:XAUUSD", title: "Gold" },
            { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
            { proName: "FX:GBPUSD", title: "GBPUSD" },
            { proName: "FX:EURUSD", title: "EURUSD" },
            { proName: "TVC:USOIL", title: "US Oil" },
          ]}
        />
      </div>

      {/* CHARTS */}
      <div className="mx-auto grid max-w-[1200px] gap-3 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-10">
        {CHARTS.map((chart, i) => (
          <motion.div
            key={chart.symbol}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i}
            className="overflow-hidden rounded-3xl border border-white/10 bg-onyx p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">{chart.title}</h2>
              <span className="rounded-[600px] border border-white/15 px-4 py-1 font-mono text-[11px] uppercase tracking-wide text-mist">
                {chart.tag}
              </span>
            </div>

            <AdvancedRealTimeChart
              theme="dark"
              symbol={chart.symbol}
              height={500}
              width="100%"
            />
          </motion.div>
        ))}

        {/* USOIL — full width */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={4}
          className="overflow-hidden rounded-3xl border border-white/10 bg-onyx p-4 lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">USOIL</h2>
            <span className="rounded-[600px] border border-white/15 px-4 py-1 font-mono text-[11px] uppercase tracking-wide text-mist">
              US OIL
            </span>
          </div>

          <AdvancedRealTimeChart
            theme="dark"
            symbol="TVC:USOIL"
            height={600}
            width="100%"
          />
        </motion.div>
      </div>

      {/* TECHNICAL ANALYSIS */}
      <div className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 lg:px-10">
        <div className="rounded-3xl border border-white/10 bg-onyx p-6">
          <h2 className="mb-6 font-serif text-2xl leading-tight">
            Technical Analysis
          </h2>
          <TechnicalAnalysis
            colorTheme="dark"
            width="100%"
            symbol="OANDA:XAUUSD"
          />
        </div>
      </div>
    </div>
  );
};

export default LiveMarkets;
