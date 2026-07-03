const TradingFeatures = () => {
  const features = [
    {
      id: 1,

      icon: "📈",

      title: "Price Action Trading",

      description:
        "Learn support resistance, trend structure, breakout setups and candlestick psychology used by professional traders.",
    },

    {
      id: 2,

      icon: "⚡",

      title: "Scalping Strategies",

      description:
        "Master fast intraday trading setups with proper risk management and disciplined execution techniques.",
    },

    {
      id: 3,

      icon: "🧠",

      title: "Trading Psychology",

      description:
        "Develop emotional control, confidence and decision making abilities to avoid fear and overtrading.",
    },

    {
      id: 4,

      icon: "🛡️",

      title: "Risk Management",

      description:
        "Protect your trading capital with professional position sizing and advanced risk control systems.",
    },

    {
      id: 5,

      icon: "📊",

      title: "Options Trading",

      description:
        "Understand Greeks, expiry trading, option buying, selling and advanced strategies with real examples.",
    },

    {
      id: 6,

      icon: "🚀",

      title: "Swing Trading",

      description:
        "Identify high probability swing trades using trend continuation and momentum-based setups.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-24 text-white">
      {/* BACKGROUND GLOW */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* TOP */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-green-400 backdrop-blur-md">
            What You Will Learn
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Master The Core Of
            <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Professional Trading
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            Learn practical market concepts, disciplined execution and advanced
            trading techniques through structured mentorship and premium
            education.
          </p>
        </div>

        {/* FEATURES GRID */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-green-500/30 hover:bg-white/10"
            >
              {/* ICON */}

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-4xl transition duration-300 group-hover:bg-green-500 group-hover:text-black">
                {feature.icon}
              </div>

              {/* TITLE */}

              <h3 className="mt-8 text-3xl font-extrabold leading-tight">
                {feature.title}
              </h3>

              {/* DESCRIPTION */}

              <p className="mt-5 leading-relaxed text-gray-300">
                {feature.description}
              </p>

              {/* BOTTOM */}

              <div className="mt-8 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>

                <span className="text-sm font-medium text-green-400">
                  Professional Mentorship
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM STRIP */}

        <div className="mt-24 rounded-4xl border border-white/10 bg-white/5 p-10 backdrop-blur-md">
          <div className="grid gap-10 text-center md:grid-cols-3">
            {/* ITEM */}

            <div>
              <h3 className="text-5xl font-extrabold text-green-400">21+</h3>

              <p className="mt-3 text-gray-300">Advanced Trading Strategies</p>
            </div>

            {/* ITEM */}

            <div>
              <h3 className="text-5xl font-extrabold text-green-400">120+</h3>

              <p className="mt-3 text-gray-300">Structured Video Lessons</p>
            </div>

            {/* ITEM */}

            <div>
              <h3 className="text-5xl font-extrabold text-green-400">24/7</h3>

              <p className="mt-3 text-gray-300">Lifetime Learning Access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingFeatures;
