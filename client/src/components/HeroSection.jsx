import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* BACKGROUND GRADIENT */}

      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black opacity-95"></div>

      {/* GLOW EFFECT */}

      <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-green-500/20 blur-3xl"></div>

      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

      {/* CONTENT */}

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        {/* BADGE */}

        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
          <span className="text-sm font-medium tracking-wide text-green-400">
            #1 Professional Trading Learning Platform
          </span>
        </div>

        {/* HEADING */}

        <h1 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
          Master The
          <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            {" "}
            Trading{" "}
          </span>
          With Professional Mentorship
        </h1>

        {/* DESCRIPTION */}

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">
          Learn price action, options trading, risk management, psychology,
          swing trading and advanced trading strategies through structured
          premium mentorship designed for serious traders.
        </p>

        {/* BUTTONS */}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/register"
            className="rounded-2xl bg-white px-8 py-4 text-sm font-bold text-black transition hover:scale-105 hover:bg-gray-200"
          >
            Start Learning Today
          </Link>

          <Link
            to="/courses"
            className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/10"
          >
            Explore Courses
          </Link>
        </div>

        {/* STATS */}

        <div className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-4">
          {/* CARD */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
            <h2 className="text-4xl font-extrabold text-green-400">500+</h2>

            <p className="mt-2 text-sm text-gray-300">Students Enrolled</p>
          </div>

          {/* CARD */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
            <h2 className="text-4xl font-extrabold text-green-400">120+</h2>

            <p className="mt-2 text-sm text-gray-300">Premium Lessons</p>
          </div>

          {/* CARD */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
            <h2 className="text-4xl font-extrabold text-green-400">15+</h2>

            <p className="mt-2 text-sm text-gray-300">Trading Strategies</p>
          </div>

          {/* CARD */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
            <h2 className="text-4xl font-extrabold text-green-400">24/7</h2>

            <p className="mt-2 text-sm text-gray-300">Learning Access</p>
          </div>
        </div>

        {/* BOTTOM TRUST TEXT */}

        <div className="mt-14">
          <p className="text-sm tracking-wide text-gray-500">
            Trusted by aspiring traders across India 🇮🇳
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
