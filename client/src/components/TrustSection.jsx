const TrustSection = () => {
  return (
    <section className="bg-[#f5f7fb] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* TOP */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-black px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Why Traders Trust ChartWiz
          </span>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-black md:text-5xl">
            Learn Trading The
            <span className="text-green-500"> Smart Way</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            We focus on practical trading education, risk management and
            psychology instead of fake promises and unrealistic income claims.
          </p>
        </div>

        {/* TRUST CARDS */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {/* CARD */}

          <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-3xl text-white transition group-hover:bg-green-500">
              📈
            </div>

            <h3 className="mt-8 text-2xl font-bold text-black">
              Practical Strategies
            </h3>

            <p className="mt-4 leading-relaxed text-gray-600">
              Learn real market strategies based on price action, structure,
              trend analysis and professional risk management.
            </p>
          </div>

          {/* CARD */}

          <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-3xl text-white transition group-hover:bg-green-500">
              🎯
            </div>

            <h3 className="mt-8 text-2xl font-bold text-black">
              Beginner Friendly
            </h3>

            <p className="mt-4 leading-relaxed text-gray-600">
              Structured lessons designed for complete beginners to advanced
              traders with step-by-step guidance.
            </p>
          </div>

          {/* CARD */}

          <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-3xl text-white transition group-hover:bg-green-500">
              🧠
            </div>

            <h3 className="mt-8 text-2xl font-bold text-black">
              Trading Psychology
            </h3>

            <p className="mt-4 leading-relaxed text-gray-600">
              Master emotional discipline, mindset control and risk handling to
              trade consistently.
            </p>
          </div>

          {/* CARD */}

          <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-3xl text-white transition group-hover:bg-green-500">
              🚀
            </div>

            <h3 className="mt-8 text-2xl font-bold text-black">
              Lifetime Access
            </h3>

            <p className="mt-4 leading-relaxed text-gray-600">
              Access premium recorded mentorship anytime from anywhere with
              continuous updates and future lessons.
            </p>
          </div>
        </div>

        {/* BOTTOM STRIP */}

        <div className="mt-20 rounded-4xl bg-black px-8 py-10 text-white shadow-2xl">
          <div className="grid gap-10 text-center md:grid-cols-3">
            {/* ITEM */}

            <div>
              <h3 className="text-5xl font-extrabold text-green-400">5K+</h3>

              <p className="mt-3 text-gray-300">Active Students Across India</p>
            </div>

            {/* ITEM */}

            <div>
              <h3 className="text-5xl font-extrabold text-green-400">120+</h3>

              <p className="mt-3 text-gray-300">Structured Trading Lessons</p>
            </div>

            {/* ITEM */}

            <div>
              <h3 className="text-5xl font-extrabold text-green-400">24/7</h3>

              <p className="mt-3 text-gray-300">Unlimited Learning Access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
