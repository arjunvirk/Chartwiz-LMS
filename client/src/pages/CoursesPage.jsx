import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { enrollCourse } from "../actions/courseActions";

import toast from "react-hot-toast";

import { API_URL } from "../config/api";

const CoursesPage = () => {
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [enrollingId, setEnrollingId] = useState(null);

  const totalCourses = courses?.length || 0;

  const totalStudents = courses?.reduce(
    (total, course) => total + (course.students?.length || 0),
    0,
  );

  const totalLessons = courses?.reduce(
    (total, course) => total + (course.videos?.length || 0),
    0,
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/courses`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setCourses(data.courses);
      } catch (error) {
        toast.dismiss();
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const enrollHandler = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      toast.dismiss();
      return toast.error("Please login first");
    }

    try {
      setEnrollingId(id);

      const data = await dispatch(enrollCourse(id));

      toast.dismiss();
      toast.success(data.message);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <section className="min-h-screen bg-[#f5f7fb] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* HERO */}

        <div className="relative overflow-hidden rounded-4xl bg-black px-6 py-14 text-white shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:px-10 lg:px-16 lg:py-20">
          {/* GLOW */}

          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl"></div>

          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"></div>

          <div className="relative z-10 max-w-4xl">
            <span className="inline-flex max-w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-green-400 backdrop-blur-md sm:px-5 sm:text-xs sm:tracking-[0.2em]">
              Explore Premium Mentorship
            </span>

            <h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Professional
              <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                {" "}
                Trading Courses
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
              Learn stock market trading through structured premium mentorship
              focused on practical strategies, risk management, psychology and
              disciplined execution.
            </p>
          </div>
        </div>

        {/* COURSES */}

        <div className="mt-20">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="rounded-full bg-black px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
                Our Courses
              </span>

              <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
                Learn Trading Like A
                <span className="text-green-500"> Professional</span>
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Structured mentorship programs designed for aspiring traders who
              want to build long-term market understanding and disciplined
              execution.
            </p>
          </div>

          {/* GRID */}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="mt-16 overflow-hidden rounded-4xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center shadow-sm sm:px-10">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-black text-4xl text-white shadow-lg">
                📚
              </div>

              <h2 className="mt-8 text-4xl font-extrabold tracking-tight text-black">
                Courses Coming Soon
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-500 sm:text-lg">
                Our mentorship team is currently preparing high-quality premium
                trading courses focused on real market experience, disciplined
                execution, risk management and long-term profitability.
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-400">
                We are recording structured video lessons, live chart analysis
                sessions and practical Courses Available to deliver the best
                learning experience for our future students.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <div className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white">
                  Professional Mentorship
                </div>

                <div className="rounded-2xl bg-green-500 px-5 py-3 text-sm font-semibold text-black">
                  Real Market Strategies
                </div>

                <div className="rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700">
                  Courses Launching Soon
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="group overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* IMAGE */}

                  <div className="relative overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/800x400?text=Course";
                      }}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* CONTENT */}

                  <div className="p-6 sm:p-8">
                    {/* TITLE */}

                    <h3 className="text-3xl font-extrabold text-black transition group-hover:text-green-500">
                      {course.title}
                    </h3>

                    {/* DESCRIPTION */}

                    <p className="mt-5 leading-relaxed text-gray-600">
                      {course.description}
                    </p>

                    {/* INFO */}

                    <div className="mt-8 grid gap-5 sm:grid-cols-3">
                      <div>
                        <p className="text-sm text-gray-500">Instructor</p>

                        <h4 className="mt-1 font-bold text-black">
                          {course.instructor}
                        </h4>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Lessons</p>

                        <h4 className="mt-1 font-bold text-black">
                          {course.videos?.length || 0}
                        </h4>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Students</p>

                        <h4 className="mt-1 font-bold text-black">
                          {course.students?.length || 0}
                        </h4>
                      </div>
                    </div>

                    {/* PRICE */}

                    <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Course Price</p>

                        <h3 className="mt-1 text-4xl font-extrabold text-green-500">
                          ₹{course.price}
                        </h3>
                      </div>

                      <button
                        disabled={enrollingId === course._id}
                        onClick={() => enrollHandler(course._id)}
                        className="rounded-2xl bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-green-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {enrollingId === course._id
                          ? "Enrolling..."
                          : "Enroll Now"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}

        <div className="mt-24 overflow-hidden rounded-4xl bg-black px-6 py-14 text-center text-white shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:px-10 lg:px-16 lg:py-20">
          <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Ready To Start Your
            <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Trading Journey?
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Join ChartWiz Academy and learn professional trading through
            structured mentorship, practical strategies and premium market
            education.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="rounded-2xl bg-green-500 px-8 py-4 text-sm font-bold text-black transition hover:scale-[1.02] hover:bg-green-400"
            >
              Join ChartWiz Today
            </Link>

            <Link
              to="/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:border-white/20 hover:bg-white/10"
            >
              Student Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesPage;
