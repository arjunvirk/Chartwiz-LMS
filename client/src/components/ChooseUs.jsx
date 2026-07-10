import { Link } from "react-router-dom";

const ChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white">
      {/* BACKGROUND GLOW */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* TOP */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-green-400 backdrop-blur-md">
            Why Choose ChartWiz
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Built For Serious
            <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Traders
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            Our mentorship is designed to help you understand the market deeply,
            build discipline and develop professional trading skills step by
            step.
          </p>
        </div>

        {/* MAIN GRID */}

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {/* LEFT BIG CARD */}

          <div className="rounded-4xl border border-white/10 bg-white/5 p-10 backdrop-blur-md transition duration-300 hover:border-green-500/30 hover:bg-white/10">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-green-500 text-4xl shadow-lg shadow-green-500/20">
              📊
            </div>

            <h3 className="mt-8 text-4xl font-extrabold">
              Real Market Education
            </h3>

            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Learn how professional traders analyze charts, manage risks,
              identify high probability setups and build consistent trading
              systems instead of relying on random signals.
            </p>

            <div className="mt-10 space-y-5">
              {/* ITEM */}

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-black">
                  ✓
                </div>

                <div>
                  <h4 className="text-lg font-bold">Step-by-Step Learning</h4>

                  <p className="mt-1 text-gray-400">
                    Structured roadmap from beginner to advanced trader.
                  </p>
                </div>
              </div>

              {/* ITEM */}

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-black">
                  ✓
                </div>

                <div>
                  <h4 className="text-lg font-bold">Risk Management Focus</h4>

                  <p className="mt-1 text-gray-400">
                    Protect your capital with professional risk strategies.
                  </p>
                </div>
              </div>

              {/* ITEM */}

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-black">
                  ✓
                </div>

                <div>
                  <h4 className="text-lg font-bold">Psychology & Discipline</h4>

                  <p className="mt-1 text-gray-400">
                    Build emotional control and decision-making consistency.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT GRID */}

          <div className="grid gap-8">
            {/* CARD */}

            <div className="rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition duration-300 hover:border-green-500/30 hover:bg-white/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                🎥
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Premium Recorded Lessons
              </h3>

              <p className="mt-4 leading-relaxed text-gray-300">
                Access high-quality recorded mentorship anytime with lifetime
                learning flexibility.
              </p>
            </div>

            {/* CARD */}

            <div className="rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition duration-300 hover:border-green-500/30 hover:bg-white/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                📚
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Structured Learning Path
              </h3>

              <p className="mt-4 leading-relaxed text-gray-300">
                Follow a clear roadmap covering basics, strategies, psychology
                and advanced market concepts.
              </p>
            </div>

            {/* CARD */}

            <div className="rounded-4xl border border-white/10 bg-linear-to-r from-green-500 to-emerald-500 p-8 text-black shadow-2xl shadow-green-500/20">
              <h3 className="text-3xl font-extrabold">
                Learn. Practice. Grow.
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-black/80">
                ChartWiz helps aspiring traders transform confusion into clarity
                through professional mentorship and market understanding.
              </p>

              <Link
                to="/admission"
                className="mt-10 inline-flex items-center justify-center rounded-2xl bg-black px-10 py-5 text-sm font-bold text-white transition hover:scale-105 hover:bg-black-400"
              >
                Join ChartWiz Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
