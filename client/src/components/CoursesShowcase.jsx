import { Link } from "react-router-dom";

const CoursesShowcase = () => {
  const courses = [
    {
      id: 1,

      title: "Price Action Mastery",

      level: "Beginner to Advanced",

      lessons: "45 Lessons",

      price: "₹4,999",

      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",

      description:
        "Master support resistance, market structure, breakouts and professional chart reading.",
    },

    {
      id: 2,

      title: "Options Trading Bootcamp",

      level: "Intermediate",

      lessons: "38 Lessons",

      price: "₹6,999",

      image:
        "https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=1200&auto=format&fit=crop",

      description:
        "Learn option buying, selling, Greeks, expiry strategies and advanced risk management.",
    },

    {
      id: 3,

      title: "Trading Psychology & Discipline",

      level: "All Levels",

      lessons: "20 Lessons",

      price: "₹2,999",

      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",

      description:
        "Build emotional control, discipline and professional decision making under pressure.",
    },
  ];

  return (
    <section className="bg-[#f5f7fb] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* TOP */}

        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <span className="rounded-full bg-black px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Premium Courses
            </span>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-black md:text-6xl">
              Explore Our
              <span className="text-green-500"> Trading Courses</span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Structured mentorship programs designed to help you master the
              stock market with practical strategies and professional guidance.
            </p>
          </div>

          {/* BUTTON */}

          <Link
            to="/admission"
            className="rounded-2xl bg-black px-8 py-4 text-sm font-bold text-white transition hover:scale-105 hover:bg-gray-800"
          >
            Start Learning
          </Link>
        </div>

        {/* COURSES GRID */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* IMAGE */}

              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* LEVEL */}

                <div className="absolute left-5 top-5 rounded-full bg-black/80 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
                  {course.level}
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-8">
                {/* TITLE */}

                <h3 className="text-3xl font-extrabold text-black transition group-hover:text-green-500">
                  {course.title}
                </h3>

                {/* DESCRIPTION */}

                <p className="mt-5 leading-relaxed text-gray-600">
                  {course.description}
                </p>

                {/* INFO */}

                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Lessons</p>

                    <h4 className="mt-1 text-lg font-bold text-black">
                      {course.lessons}
                    </h4>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-500">Price</p>

                    <h4 className="mt-1 text-2xl font-extrabold text-green-500">
                      {course.price}
                    </h4>
                  </div>
                </div>

                {/* BUTTON */}

                <button className="mt-8 w-full rounded-2xl bg-black py-4 text-sm font-bold text-white transition hover:bg-green-500 hover:text-black">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}

        <div className="mt-20 rounded-4xl bg-black p-10 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-extrabold md:text-5xl">
            Ready To Become A
            <span className="text-green-400"> Professional Trader?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
            Join thousands of aspiring traders learning practical market skills,
            discipline and profitable trading strategies through ChartWiz
            Academy.
          </p>

          <Link
            to="/admission"
            className="mt-10 inline-block rounded-2xl bg-green-500 px-10 py-5 text-sm font-bold text-black transition hover:scale-105 hover:bg-green-400"
          >
            Join ChartWiz Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesShowcase;
