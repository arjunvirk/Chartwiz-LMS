import { Link } from "react-router-dom";
import kajalPhoto from "../assets/kajal_kushwaha.jpeg";
import anandMalhotra from "../assets/anand_malhotra.jpeg";
import varunMalhotra from "../assets/varun_malhotra.jpeg";
import lalitKumar from "../assets/lalit_kumar.jpeg";
import sohail from "../assets/sohel.jpeg";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,

      name: "Anand Malhotra",

      role: "Options Trader",

      image: anandMalhotra,

      review:
        "ChartWiz completely changed the way I understand the market. The structured mentorship and psychology lessons helped me become far more disciplined in trading.",
    },

    {
      id: 2,

      name: "Varun Malhotra",

      role: "Swing Trader",

      image: varunMalhotra,

      review:
        "The price action course is extremely practical and beginner friendly. I finally understand market structure and risk management properly.",
    },

    {
      id: 3,

      name: "Kajal Kushwaha",

      role: "Full-Time Trader",

      image: kajalPhoto,

      review:
        "Unlike random YouTube content, ChartWiz provides a complete roadmap. The lessons are premium quality and easy to follow.",
    },

    {
      id: 4,

      name: "Lalit Kumar",

      role: "Swing Trader",

      image: lalitKumar,

      review:
        "ChartWiz Academy is one of the best Institute for anyone looking to learn stock market trading and investing from scratch. The courses are structured in a simple and practical way, making complex concepts easy to understand.",
    },

    {
      id: 5,

      name: "Sohail",

      role: "Options Trader",

      image: sohail,

      review:
        "ChartWiz Academy explains complex market concepts in a very simple and practical way. The live sessions, market analysis, and structured lessons.I highly recommend ChartWiz Academy to anyone serious about learning Forex.",
    },
  ];

  return (
    <section className="bg-[#f5f7fb] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* TOP */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-black px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Student Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-black md:text-6xl">
            Trusted By
            <span className="text-green-500"> Aspiring Traders</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Thousands of students are learning professional trading skills,
            market psychology and disciplined execution through ChartWiz
            Academy.
          </p>
        </div>

        {/* TESTIMONIAL GRID */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group rounded-4xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* STARS */}

              <div className="flex items-center gap-1 text-2xl text-yellow-400">
                ★ ★ ★ ★ ★
              </div>

              {/* REVIEW */}

              <p className="mt-8 text-lg leading-relaxed text-gray-600">
                "{testimonial.review}"
              </p>

              {/* USER */}

              <div className="mt-10 flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-xl font-bold text-black">
                    {testimonial.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}

        <div className="mt-24 overflow-hidden rounded-4xl bg-black text-white shadow-2xl">
          <div className="grid items-center gap-12 p-10 lg:grid-cols-2 lg:p-16">
            {/* LEFT */}

            <div>
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-green-400 backdrop-blur-md">
                Join The Community
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
                Become A Confident &
                <span className="text-green-400"> Disciplined Trader</span>
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                Learn professional market strategies, trading psychology and
                structured mentorship from ChartWiz Academy.
              </p>
              <Link
                to="/admission"
                className="mt-10 inline-flex items-center justify-center rounded-2xl bg-green-500 px-10 py-5 text-sm font-bold text-black transition hover:scale-105 hover:bg-green-400"
              >
                Start Your Journey
              </Link>
            </div>

            {/* RIGHT */}

            <div className="grid gap-6 sm:grid-cols-2">
              {/* CARD */}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
                <h3 className="text-5xl font-extrabold text-green-400">500+</h3>

                <p className="mt-3 text-gray-300">Active Students</p>
              </div>

              {/* CARD */}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
                <h3 className="text-5xl font-extrabold text-green-400">4.9★</h3>

                <p className="mt-3 text-gray-300">Student Satisfaction</p>
              </div>

              {/* CARD */}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
                <h3 className="text-5xl font-extrabold text-green-400">120+</h3>

                <p className="mt-3 text-gray-300">Premium Lessons</p>
              </div>

              {/* CARD */}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
                <h3 className="text-5xl font-extrabold text-green-400">24/7</h3>

                <p className="mt-3 text-gray-300">Learning Access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
