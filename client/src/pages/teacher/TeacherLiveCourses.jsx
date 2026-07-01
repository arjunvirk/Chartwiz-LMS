import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import fetchWithAuth from "../../utils/fetchWithAuth";

import {
  getTeacherLiveCourses,
  deleteLiveCourse,
} from "../../actions/liveCourseActions";

import toast from "react-hot-toast";
import { API_URL } from "../../config/api";
const TeacherLiveCourses = () => {
  const [meetLink, setMeetLink] = useState("");
  const [publishing, setPublishing] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const dispatch = useDispatch();

  const teacherLiveCourses = useSelector((state) => state.teacherLiveCourses);

  const { loading, error, liveCourses = [] } = teacherLiveCourses;

  // ================= FETCH COURSES =================

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) return;

    dispatch(getTeacherLiveCourses());
  }, [dispatch, userInfo]);

  // ================= ERROR =================

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCourse]);

  // ================= DELETE =================

  const deleteHandler = async (id) => {
    if (!window.confirm("Are you sure you want to delete this live course?")) {
      return;
    }

    try {
      await dispatch(deleteLiveCourse(id));

      toast.success("Live course deleted successfully");

      dispatch(getTeacherLiveCourses());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const publishHandler = async () => {
    try {
      if (!meetLink.trim()) {
        return toast.error("Google Meet link is required");
      }

      if (!meetLink.startsWith("https://meet.google.com")) {
        return toast.error("Enter a valid Google Meet link");
      }

      setPublishing(true);

      await fetchWithAuth(
        dispatch,
        `${API_URL}/api/live-courses/${selectedCourse}/publish`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            meetLink,
          }),
        },
      );

      toast.success("Session published successfully");

      setMeetLink("");

      setSelectedCourse(null);

      dispatch(getTeacherLiveCourses());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div>
      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Live Courses</h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your live mentorship batches and webinars.
          </p>
        </div>

        <Link
          to="/teacher/dashboard/create-live-course"
          className="rounded-2xl bg-black px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          + Create Live Batch
        </Link>
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
            No Live Courses Yet
          </h2>

          <p className="mt-3 text-gray-500">
            Create your first live mentorship batch.
          </p>
        </div>
      ) : (
        // COURSE GRID

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {liveCourses.map((course) => (
            <div
              key={course._id}
              className={`rounded-3xl bg-white p-6 shadow-sm transition ${
                !selectedCourse ? "hover:-translate-y-1 hover:shadow-lg" : ""
              }`}
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
                  <span className="text-sm text-gray-400">Price</span>

                  <span className="font-semibold">₹{course.price}</span>
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
                    {course.status.charAt(0).toUpperCase() +
                      course.status.slice(1)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Students</span>

                  <span className="font-semibold">
                    {course.students?.length || 0}
                  </span>
                </div>
              </div>

              {/* GOOGLE MEET */}

              {course.status !== "live" ? (
                <button
                  onClick={() => setSelectedCourse(course._id)}
                  className="mt-6 w-full rounded-2xl bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Publish Session
                </button>
              ) : (
                <a
                  href={course.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 block rounded-2xl bg-black py-3 text-center text-sm font-semibold text-white"
                >
                  Open Google Meet
                </a>
              )}

              {/* DELETE */}

              <button
                onClick={() => deleteHandler(course._id)}
                className="mt-3 w-full rounded-2xl border border-red-500 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
              >
                Delete Course
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800">Publish Session</h2>

            <p className="mt-2 text-sm text-gray-500">
              Paste your Google Meet link below.
            </p>

            <input
              type="text"
              placeholder="https://meet.google.com/..."
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

            <div className="mt-6 flex gap-3">
              <button
                disabled={publishing}
                onClick={publishHandler}
                className="flex-1 rounded-2xl bg-black py-3 font-semibold text-white disabled:opacity-50"
              >
                {publishing ? "Publishing..." : "Publish"}
              </button>

              <button
                onClick={() => setSelectedCourse(null)}
                className="flex-1 rounded-2xl border border-gray-300 py-3 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherLiveCourses;
