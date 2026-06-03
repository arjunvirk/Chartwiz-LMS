import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getLiveCourses, enrollLiveCourse } from "../actions/liveCourseActions";

import toast from "react-hot-toast";

const LiveCoursesPage = () => {
  const dispatch = useDispatch();

  const liveCourseList = useSelector((state) => state.liveCourseList);

  const { loading, error, liveCourses = [] } = liveCourseList;

  useEffect(() => {
    dispatch(getLiveCourses());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const enrollHandler = async (id) => {
    try {
      await dispatch(enrollLiveCourse(id));

      toast.success("Successfully enrolled!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-black">
            Live Mentorship
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-gray-500">
            Join professional live trading mentorship batches, market analysis
            sessions and webinars. Enroll now and access scheduled classes
            directly from your student dashboard.
          </p>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="mt-20 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
          </div>
        ) : liveCourses.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
            <h2 className="text-3xl font-bold">Live Courses Coming Soon</h2>

            <p className="mt-3 text-gray-500">
              New mentorship batches will be announced shortly.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {liveCourses.map((course) => (
              <div
                key={course._id}
                className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h2 className="text-2xl font-bold text-black">
                  {course.title}
                </h2>

                <p className="mt-4 text-gray-500">{course.description}</p>

                <div className="mt-6 space-y-3">
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
                      {new Date(course.startDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Class Time</span>

                    <span className="font-semibold">{course.classTime}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Status</span>

                    <span
                      className={`font-semibold ${
                        course.status === "live"
                          ? "text-green-600"
                          : course.status === "completed"
                            ? "text-red-500"
                            : "text-yellow-600"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-gray-400">Course Fee</p>

                    <h3 className="text-3xl font-bold text-black">
                      ₹{course.price}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => enrollHandler(course._id)}
                  className="mt-8 w-full rounded-2xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
                >
                  Enroll in Mentorship
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveCoursesPage;
