import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMyCourses } from "../../actions/courseActions";
import { getMyLiveCourses } from "../../actions/liveCourseActions";

const StudentDashboard = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { courses = [] } = useSelector((state) => state.myCourses);

  const { liveCourses = [] } = useSelector((state) => state.myLiveCourses);

  useEffect(() => {
    dispatch(getMyCourses());
    dispatch(getMyLiveCourses());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      {/* HERO */}

      <div className="rounded-3xl bg-linear-to-r from-black to-gray-800 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold md:text-4xl">
          Welcome, {userInfo?.user?.name}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300">
          Continue your trading journey with premium mentorship, live sessions
          and structured market education.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/dashboard/courses"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            My Courses
          </Link>

          <Link
            to="/dashboard/live-courses"
            className="rounded-2xl border border-white px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            Live Classes
          </Link>
        </div>
      </div>

      {/* RECENT COURSES */}

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>

          <Link
            to="/dashboard/courses"
            className="text-sm font-medium text-black"
          >
            View All
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
            <p className="text-gray-500">No enrolled courses yet.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course._id}
                className="overflow-hidden rounded-3xl border"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-44 w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=Course";
                  }}
                />

                <div className="p-5">
                  <h3 className="line-clamp-2 text-lg font-bold">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {course.instructor}
                  </p>

                  <Link
                    to={`/dashboard/courses/${course._id}`}
                    className="mt-4 inline-block rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIVE COURSES */}

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Live Classes</h2>

          <Link
            to="/dashboard/live-courses"
            className="text-sm font-medium text-black"
          >
            View All
          </Link>
        </div>

        {liveCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
            <p className="text-gray-500">No live courses enrolled yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {liveCourses.slice(0, 3).map((course) => (
              <div
                key={course._id}
                className="flex flex-col justify-between rounded-2xl border p-5 md:flex-row md:items-center"
              >
                <div>
                  <h3 className="font-bold">{course.title}</h3>

                  <p className="text-sm text-gray-500">{course.instructor}</p>
                </div>

                <div className="mt-3 md:mt-0">
                  <span className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
                    {course.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
