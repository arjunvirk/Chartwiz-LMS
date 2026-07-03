import {
  AdvancedRealTimeChart,
  TickerTape,
  TechnicalAnalysis,
} from "react-ts-tradingview-widgets";

const LiveMarkets = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}

      <div className="border-b border-white/10 bg-black px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>

            <span className="text-sm font-semibold tracking-[0.25em] text-red-400 uppercase">
              Live Markets
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
            Professional Trading
            <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Market Dashboard
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Track live financial markets including Gold, Bitcoin, Forex, NASDAQ
            and Dollar Index with real-time charts and technical analysis.
          </p>
        </div>
      </div>

      {/* TICKER */}

      <div className="border-b border-white/10 bg-[#111] py-2">
        <TickerTape
          colorTheme="dark"
          symbols={[
            {
              proName: "OANDA:XAUUSD",
              title: "Gold",
            },

            {
              proName: "BITSTAMP:BTCUSD",
              title: "Bitcoin",
            },

            {
              proName: "FX:GBPUSD",
              title: "GBPUSD",
            },

            {
              proName: "FX:EURUSD",
              title: "EURUSD",
            },

            {
              proName: "TVC:USOIL",
              title: "US Oil",
            },
          ]}
        />
      </div>

      {/* CHARTS */}

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-10">
        {/* XAUUSD */}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-4 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">XAUUSD</h2>

            <span className="rounded-full bg-yellow-500/20 px-4 py-1 text-xs font-bold text-yellow-400">
              GOLD
            </span>
          </div>

          <AdvancedRealTimeChart
            theme="dark"
            symbol="OANDA:XAUUSD"
            height={500}
            width="100%"
          />
        </div>

        {/* BTCUSD */}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-4 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">BTCUSD</h2>

            <span className="rounded-full bg-orange-500/20 px-4 py-1 text-xs font-bold text-orange-400">
              CRYPTO
            </span>
          </div>

          <AdvancedRealTimeChart
            theme="dark"
            symbol="BITSTAMP:BTCUSD"
            height={500}
            width="100%"
          />
        </div>

        {/* GBPUSD */}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-4 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">GBPUSD</h2>

            <span className="rounded-full bg-blue-500/20 px-4 py-1 text-xs font-bold text-blue-400">
              FOREX
            </span>
          </div>

          <AdvancedRealTimeChart
            theme="dark"
            symbol="FX:GBPUSD"
            height={500}
            width="100%"
          />
        </div>

        {/* EURUSD */}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-4 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">EURUSD</h2>

            <span className="rounded-full bg-blue-500/20 px-4 py-1 text-xs font-bold text-blue-400">
              FOREX
            </span>
          </div>

          <AdvancedRealTimeChart
            theme="dark"
            symbol="FX:EURUSD"
            height={500}
            width="100%"
          />
        </div>

        {/* DXY */}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-4 shadow-2xl lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">USOIL</h2>

            <span className="rounded-full bg-purple-500/20 px-4 py-1 text-xs font-bold text-purple-400">
              US OIL
            </span>
          </div>

          <AdvancedRealTimeChart
            theme="dark"
            symbol="TVC:USOIL"
            height={600}
            width="100%"
          />
        </div>
      </div>

      {/* TECHNICAL ANALYSIS */}

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <div className="rounded-3xl border border-white/10 bg-[#111] p-6">
          <h2 className="mb-6 text-3xl font-extrabold">Technical Analysis</h2>

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
