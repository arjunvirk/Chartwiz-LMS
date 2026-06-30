import { useEffect, useState } from "react";

import { Plus, BookOpen, Users, Pencil, Trash2, Clock3 } from "lucide-react";

import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";

import {
  createCourse,
  deleteCourse,
  getTeacherCourses,
} from "../../actions/courseActions";

const TeacherCourses = () => {
  // ---------------- FORM STATE ----------------

  const [title, setTitle] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const teacherCourses = useSelector((state) => state.teacherCourses);

  const { loading, error, courses } = teacherCourses;

  const [thumbnail, setThumbnail] = useState("");

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) return;

    dispatch(getTeacherCourses());
  }, [dispatch, userInfo]);

  // ---------------- ADD COURSE ----------------

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !price || !thumbnail) {
      return toast.error("Please fill all fields");
    }

    if (Number(price) <= 0) {
      return toast.error("Price must be greater than 0");
    }

    try {
      new URL(thumbnail);
    } catch {
      return toast.error("Please enter a valid thumbnail URL");
    }

    try {
      const data = await dispatch(
        createCourse({
          title,
          description,
          category,
          price: Number(price),
          thumbnail,
        }),
      );

      toast.success(data?.message || "Course created");

      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setThumbnail("");

      dispatch(getTeacherCourses());
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ---------------- DELETE COURSE ----------------

  const deleteCourseHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmDelete) return;

    try {
      const data = await dispatch(deleteCourse(id));

      toast.success(data?.message || "Course deleted");

      dispatch(getTeacherCourses());
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      {/* HEADER */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-black">
            Teacher Courses
          </h1>

          <p className="mt-3 text-base text-gray-500">
            Create, manage and publish your premium mentorship courses.
          </p>
        </div>

        {/* TOTAL COURSES */}

        <div className="rounded-3xl bg-black px-6 py-5 text-white shadow-lg">
          <p className="text-sm text-gray-300">Total Courses</p>

          <h2 className="mt-2 text-4xl font-extrabold">{courses.length}</h2>
        </div>
      </div>

      {/* MAIN GRID */}

      <div className="mt-10 grid gap-8 xl:grid-cols-[420px_1fr]">
        {/* LEFT FORM */}

        <div className="rounded-4xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* TITLE */}

          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
              <Plus size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-black">
                Create Course
              </h2>

              <p className="text-sm text-gray-500">
                Add a new mentorship program
              </p>
            </div>
          </div>

          {/* FORM */}

          <form onSubmit={submitHandler} className="mt-8 space-y-5">
            {/* TITLE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Course Title
              </label>

              <input
                type="text"
                placeholder="Enter course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <input
                type="text"
                placeholder="Price Action / Forex / Options"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            {/* PRICE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Price
              </label>

              <input
                type="number"
                placeholder="Enter course price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            {/* DESCRIPTION */}

            {/* THUMBNAIL */}

            <div>
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="Preview"
                  className="mt-3 h-40 w-full rounded-2xl object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Thumbnail URL
              </label>

              <input
                type="text"
                placeholder="Enter thumbnail image URL"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                rows="5"
                placeholder="Write course description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
              ></textarea>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus size={18} />

              {loading ? "Creating..." : "Create Course"}
            </button>
          </form>
        </div>

        {/* RIGHT COURSES */}

        <div className="rounded-4xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* TITLE */}

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-black">
                Your Courses
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Manage all uploaded mentorship programs.
              </p>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-10">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
            </div>
          )}

          {/* COURSES */}

          <div className="mt-8 space-y-5">
            {!loading && courses.length === 0 && (
              <div className="rounded-3xl border border-dashed border-gray-300 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-700">
                  No Courses Yet
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                  Create your first mentorship course.
                </p>
              </div>
            )}
            {courses.map((course) => (
              <div
                key={course._id}
                className="rounded-3xl border border-gray-200 p-6 transition hover:border-black"
              >
                {/* TOP */}

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* LEFT */}

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-bold text-black">
                        {course.title}
                      </h3>

                      <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-600">
                        Published
                      </span>
                    </div>

                    {/* DETAILS */}

                    <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} />

                        {course.category}
                      </div>

                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        {course.students?.length || 0} Students
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock3 size={16} />
                        {course.videos?.length || 0} Lessons
                      </div>
                    </div>
                  </div>

                  {/* PRICE */}

                  <div className="text-left lg:text-right">
                    <p className="text-sm text-gray-500">Course Price</p>

                    <h2 className="mt-2 text-3xl font-extrabold text-black">
                      ₹{course.price}
                    </h2>
                  </div>
                </div>

                {/* BUTTONS */}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-black hover:text-black">
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCourseHandler(course._id)}
                    className="flex items-center gap-2 rounded-2xl border border-red-300 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCourses;
