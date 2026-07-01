import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getMyCourses } from "../../actions/courseActions";

import toast from "react-hot-toast";

const MyCourses = () => {
  const dispatch = useDispatch();

  const myCourses = useSelector((state) => state.myCourses);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, courses } = myCourses;

  // ---------------- FETCH COURSES ----------------

  useEffect(() => {
    if (!userInfo) return;

    dispatch(getMyCourses());
  }, [dispatch, userInfo]);

  // ---------------- ERROR TOAST ----------------

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      {/* TITLE */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>

        <p className="mt-2 text-sm text-gray-500">
          Continue learning your enrolled premium trading courses.
        </p>
      </div>

      {/* LOADING */}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
        </div>
      ) : courses?.length === 0 ? (
        // EMPTY STATE

        <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-700">No Courses Yet</h2>

          <p className="mt-3 text-sm text-gray-500">
            You are not enrolled in any course.
          </p>
        </div>
      ) : (
        // COURSE GRID

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* THUMBNAIL */}

              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=Course";
                  }}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* CONTENT */}

              <div className="p-5">
                {/* CATEGORY */}

                <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                  {course.category}
                </span>

                {/* TITLE */}

                <h2 className="mt-4 line-clamp-2 text-xl font-bold text-gray-800">
                  {course.title}
                </h2>

                {/* DESCRIPTION */}

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-500">
                  {course.description}
                </p>

                {/* INSTRUCTOR */}

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Instructor</p>

                    <h4 className="text-sm font-semibold text-gray-700">
                      {course.instructor}
                    </h4>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">Lessons</p>

                    <h4 className="text-sm font-semibold text-gray-700">
                      {course.videos?.length || 0}
                    </h4>
                  </div>
                </div>

                {/* BUTTON */}

                <Link
                  to={`/dashboard/courses/${course._id}`}
                  className="mt-6 block rounded-2xl bg-black py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
