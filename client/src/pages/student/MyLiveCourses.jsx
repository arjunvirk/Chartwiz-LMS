import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getMyLiveCourses } from "../../actions/liveCourseActions";

import toast from "react-hot-toast";

const MyLiveCourses = () => {
  const dispatch = useDispatch();

  const myLiveCourses = useSelector((state) => state.myLiveCourses);

  const { loading, error, liveCourses = [] } = myLiveCourses;

  // ================= FETCH LIVE COURSES =================

  useEffect(() => {
    dispatch(getMyLiveCourses());
  }, [dispatch]);

  // ================= ERROR =================

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Live Classes</h1>

        <p className="mt-2 text-sm text-gray-500">
          View your mentorship schedule, upcoming sessions and join live classes
          when they become available.
        </p>
      </div>

      {/* LOADING */}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
        </div>
      ) : liveCourses.length === 0 ? (
        // EMPTY STATE

        <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            No Live Classes Yet
          </h2>

          <p className="mt-3 text-gray-500">
            You are not enrolled in any live mentorship batch.
          </p>
        </div>
      ) : (
        // LIVE COURSES GRID

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {liveCourses?.map((course) => (
            <div
              key={course._id}
              className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* TITLE */}

              <h2 className="text-xl font-bold text-gray-800">
                {course.title}
              </h2>

              {/* DESCRIPTION */}

              <p className="mt-3 line-clamp-3 text-sm text-gray-500">
                {course.description}
              </p>

              {/* DETAILS */}

              <div className="mt-5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Instructor</span>

                  <span className="font-semibold">{course.instructor}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Duration</span>

                  <span className="font-semibold">
                    {course.durationMonths} Months
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Start Date</span>

                  <span className="font-semibold">
                    {new Date(course.startDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Class Time</span>

                  <span className="font-semibold">{course.classTime}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Status</span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      course.status === "live"
                        ? "bg-green-100 text-green-700"
                        : course.status === "completed"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>

              {/* JOIN BUTTON */}

              {course.status === "live" ? (
                <a
                  href={
                    course.meetLink?.startsWith("http")
                      ? course.meetLink
                      : `https://${course.meetLink}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 block rounded-2xl bg-green-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Join Google Meet
                </a>
              ) : course.status === "completed" ? (
                <div className="mt-6 rounded-2xl bg-red-50 py-3 text-center text-sm font-semibold text-red-600">
                  Session Completed
                </div>
              ) : (
                <div className="mt-6 rounded-2xl bg-yellow-50 py-3 text-center text-sm font-semibold text-yellow-700">
                  Class Not Started Yet
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLiveCourses;
