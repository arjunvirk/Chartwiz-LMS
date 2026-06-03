import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-[#f5f7fb] py-16 sm:py-20 lg:py-24">
      {/* BACKGROUND GLOW */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-4xl sm:rounded-[3rem] bg-black text-white shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
          <div className="grid items-center gap-12 p-6 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-20">
            {/* LEFT */}

            <div>
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-green-400 backdrop-blur-md">
                Start Your Trading Journey
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Become A
                <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {" "}
                  Confident Trader
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
                Learn practical trading strategies, market psychology, risk
                management and professional chart analysis through structured
                mentorship designed for serious traders.
              </p>

              {/* BUTTONS */}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="rounded-2xl bg-green-500 px-8 py-5 text-center text-sm font-bold text-black transition hover:scale-105 hover:bg-green-400"
                >
                  Join ChartWiz Today
                </Link>

                <Link
                  to="/courses"
                  className="rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-center text-sm font-bold text-white backdrop-blur-md transition hover:border-white/20 hover:bg-white/10"
                >
                  Explore Courses
                </Link>
              </div>

              {/* TRUST */}

              <div className="mt-8 flex flex-col gap-4 text-sm text-gray-400 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Lifetime Access
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Premium Lessons
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Structured Mentorship
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="relative">
              {/* MAIN CARD */}

              <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Student Growth</p>

                    <h3 className="mt-2 text-4xl font-extrabold text-green-400 sm:text-5xl">
                      +250%
                    </h3>
                  </div>

                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-green-500 text-4xl text-black shadow-lg shadow-green-500/20">
                    📈
                  </div>
                </div>

                {/* PROGRESS */}

                <div className="mt-10">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Learning Progress
                    </span>

                    <span className="text-sm font-bold text-white">85%</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[85%] rounded-full bg-linear-to-r from-green-400 to-emerald-500"></div>
                  </div>
                </div>

                {/* MINI CARDS */}

                <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
                  {/* CARD */}

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                    <h4 className="text-4xl font-extrabold text-green-400">
                      5K+
                    </h4>

                    <p className="mt-2 text-sm text-gray-400">
                      Active Students
                    </p>
                  </div>

                  {/* CARD */}

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                    <h4 className="text-4xl font-extrabold text-green-400">
                      120+
                    </h4>

                    <p className="mt-2 text-sm text-gray-400">
                      Premium Lessons
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM STRIP */}

          <div className="border-t border-white/10 bg-white/5 px-5 py-8 backdrop-blur-md sm:px-10">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <h3 className="text-center text-xl font-bold leading-relaxed sm:text-2xl lg:text-left">
                Trusted By Thousands Of Aspiring Traders Across India 🇮🇳
              </h3>

              <div className="flex flex-wrap items-center gap-8">
                <div className="text-center">
                  <h4 className="text-3xl font-extrabold text-green-400">
                    4.9★
                  </h4>

                  <p className="mt-1 text-sm text-gray-400">Student Rating</p>
                </div>

                <div className="text-center">
                  <h4 className="text-3xl font-extrabold text-green-400">
                    24/7
                  </h4>

                  <p className="mt-1 text-sm text-gray-400">Lifetime Access</p>
                </div>

                <div className="text-center">
                  <h4 className="text-3xl font-extrabold text-green-400">
                    15+
                  </h4>

                  <p className="mt-1 text-sm text-gray-400">
                    Trading Strategies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
