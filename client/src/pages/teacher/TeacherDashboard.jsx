import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BookOpen, Users, IndianRupee, Plus } from "lucide-react";

import { getTeacherCourses } from "../../actions/courseActions";

import { Video } from "lucide-react";
import { listWebinars } from "../../actions/webinarActions";

const TeacherDashboard = () => {
  // ---------------- STATS ----------------

  const dispatch = useDispatch();

  const teacherCourses = useSelector((state) => state.teacherCourses);

  const { loading, error, courses = [] } = teacherCourses;

  const webinarList = useSelector((state) => state.webinarList);

  const { webinars = [] } = webinarList;

  useEffect(() => {
    dispatch(getTeacherCourses());
    dispatch(listWebinars());
  }, [dispatch]);

  const totalCourses = courses.length;

  const totalStudents = courses.reduce(
    (total, course) => total + (course.students?.length || 0),
    0,
  );

  const totalRevenue = courses.reduce(
    (total, course) => total + (course.price || 0),
    0,
  );
  const stats = [
    {
      title: "Total Courses",
      value: totalCourses,
      icon: <BookOpen size={28} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },

    {
      title: "Total Students",
      value: totalStudents,
      icon: <Users size={28} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },

    {
      title: "Potential Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <IndianRupee size={28} />,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-red-50 p-6 text-red-600">{error}</div>
    );
  }
  return (
    <div>
      {/* HEADER */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-black">
            Teacher Dashboard
          </h1>

          <p className="mt-3 text-base leading-relaxed text-gray-500">
            Manage your courses, students, mentorship programs and academy
            analytics from one professional dashboard.
          </p>
        </div>

        {/* BUTTON */}

        <Link
          to="/teacher/courses"
          className="flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          <Plus size={20} />
          Create New Course
        </Link>
      </div>

      {/* STATS */}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            {/* TOP */}

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {item.title}
                </p>

                <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-black">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-3xl ${item.bg} ${item.text}`}
              >
                {item.icon}
              </div>
            </div>

            {/* BOTTOM */}

            <div className="mt-6 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>

              <span className="text-sm font-medium text-gray-500">
                Updated Today
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.5fr_1fr]">
        {/* COURSES */}

        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* HEADER */}

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-black">
                Your Courses
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Manage and monitor your mentorship programs.
              </p>
            </div>

            <Link
              to="/teacher/courses"
              className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              View All
            </Link>
          </div>

          {/* COURSES LIST */}

          {courses.length === 0 && (
            <div className="rounded-3xl border border-dashed border-gray-300 py-20 text-center">
              <h2 className="text-2xl font-bold">No Courses Yet</h2>

              <p className="mt-3 text-sm text-gray-500">
                Create your first course.
              </p>
            </div>
          )}

          <div className="mt-8 space-y-5">
            {courses.map((course) => (
              <div
                key={course._id}
                className="flex flex-col gap-5 rounded-3xl border border-gray-200 p-5 transition hover:border-black sm:flex-row sm:items-center sm:justify-between"
              >
                {/* LEFT */}

                <div>
                  <h3 className="text-xl font-bold text-black">
                    {course.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      {course.students?.length || 0} Students
                    </div>

                    <div className="flex items-center gap-2">
                      <BookOpen size={16} />
                      {course.videos?.length || 0} Lessons
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-600">
                    Published
                  </span>

                  <button className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-black hover:text-black">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}

        <div className="space-y-8">
          {/* ANALYTICS */}

          <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-black">Analytics</h2>

            <p className="mt-4 text-sm text-gray-500">
              Analytics will be available after student enrollments and Razorpay
              integration.
            </p>
          </div>

          {/* ACTIVITY */}

          <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-black">Recent Activity</h2>

            <p className="mt-4 text-sm text-gray-500">
              No recent activity available.
            </p>
          </div>

          {/* UPCOMING WEBINARS */}

          <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Video size={22} />

              <h2 className="text-2xl font-bold text-black">
                Upcoming Webinars
              </h2>
            </div>

            {webinars.length === 0 ? (
              <p className="mt-4 text-sm text-gray-500">
                No webinars scheduled.
              </p>
            ) : (
              <div className="mt-5 space-y-4">
                {webinars.slice(0, 3).map((webinar) => (
                  <div
                    key={webinar._id}
                    className="rounded-2xl border border-gray-200 p-4"
                  >
                    <h3 className="font-bold">{webinar.title}</h3>

                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(webinar.startTime).toLocaleString()}
                    </p>

                    <a
                      href={webinar.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white"
                    >
                      Open Webinar
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
