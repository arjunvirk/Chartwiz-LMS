import React from "react";
import founderImg from "../assets/founder.jpeg";

const About = () => {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black"></div>

      {/* GLOW EFFECTS */}

      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-green-500/10 blur-3xl"></div>

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        {/* HEADING */}

        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-sm font-medium text-green-400">
              About Chartwiz Academy
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-extrabold md:text-6xl">
            Empowering Traders With
            <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Professional Education
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-gray-300">
            Chartwiz Academy is a modern trading education platform designed to
            help beginners and experienced traders build confidence, develop
            profitable trading habits, and understand the financial markets
            through structured mentorship and practical learning.
          </p>
        </div>

        {/* FOUNDER SECTION */}

        <div className="mt-24">
          <div className="grid items-center gap-12 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md lg:grid-cols-2">
            {/* IMAGE */}

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-green-500/20 blur-3xl"></div>

                <img
                  src={founderImg}
                  alt="Founder"
                  className="relative h-[500px] w-[650px] rounded-3xl border border-white/10 object-cover shadow-2xl"
                />
              </div>
            </div>

            {/* CONTENT */}

            <div>
              <span className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
                Founder & Mentor
              </span>

              <h2 className="mt-6 text-4xl font-extrabold">
                Meet Your Trading Mentor
              </h2>

              <h1 className="mt-4 text-5xl text-green-400 font-extrabold">
                Rohit Kumar
              </h1>

              <p className="mt-6 leading-relaxed text-gray-300">
                With years of market experience and a passion for teaching, our
                mission is to help traders understand the market with
                confidence, discipline, and proper risk management.
              </p>

              <p className="mt-4 leading-relaxed text-gray-300">
                At Chartwiz Academy, we focus on practical learning, real-world
                trading concepts, and developing a professional trader mindset
                rather than chasing shortcuts.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                  <h3 className="text-2xl font-bold text-green-400">5000+</h3>
                  <p className="text-sm text-gray-400">Students Guided</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                  <h3 className="text-2xl font-bold text-green-400">5+</h3>
                  <p className="text-sm text-gray-400">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STORY SECTION */}

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h2 className="text-3xl font-bold text-green-400">Our Mission</h2>

            <p className="mt-5 leading-relaxed text-gray-300">
              Our mission is to simplify trading education and provide
              high-quality mentorship that helps students avoid common mistakes,
              manage risk effectively, and build a sustainable approach to
              trading.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h2 className="text-3xl font-bold text-green-400">Our Vision</h2>

            <p className="mt-5 leading-relaxed text-gray-300">
              We envision a community of disciplined traders who understand
              market psychology, risk management, and strategy execution rather
              than relying on speculation or shortcuts.
            </p>
          </div>
        </div>

        {/* FEATURES */}

        <div className="mt-24">
          <h2 className="text-center text-4xl font-bold">
            Why Choose Chartwiz Academy?
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
              <h3 className="text-xl font-bold text-green-400">
                Structured Learning
              </h3>

              <p className="mt-3 text-gray-300">
                Step-by-step lessons designed for every level of trader.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
              <h3 className="text-xl font-bold text-green-400">
                Expert Mentorship
              </h3>

              <p className="mt-3 text-gray-300">
                Learn directly from experienced market professionals.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
              <h3 className="text-xl font-bold text-green-400">
                Practical Strategies
              </h3>

              <p className="mt-3 text-gray-300">
                Real-world trading concepts you can apply immediately.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
              <h3 className="text-xl font-bold text-green-400">
                Lifetime Growth
              </h3>

              <p className="mt-3 text-gray-300">
                Continuous learning and improvement through market cycles.
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}

        <div className="mt-24 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
            <h3 className="text-4xl font-extrabold text-green-400">5000+</h3>
            <p className="mt-2 text-gray-300">Students</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
            <h3 className="text-4xl font-extrabold text-green-400">120+</h3>
            <p className="mt-2 text-gray-300">Premium Lessons</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
            <h3 className="text-4xl font-extrabold text-green-400">15+</h3>
            <p className="mt-2 text-gray-300">Strategies</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
            <h3 className="text-4xl font-extrabold text-green-400">24/7</h3>
            <p className="mt-2 text-gray-300">Access</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
