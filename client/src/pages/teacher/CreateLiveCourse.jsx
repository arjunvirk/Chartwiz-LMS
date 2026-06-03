import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLiveCourse } from "../../actions/liveCourseActions";
import toast from "react-hot-toast";

const CreateLiveCourse = () => {
  const dispatch = useDispatch();

  const liveCourseCreate = useSelector((state) => state.liveCourseCreate);

  const { loading } = liveCourseCreate;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [durationMonths, setDurationMonths] = useState(2);
  const [startDate, setStartDate] = useState("");
  const [classTime, setClassTime] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    // VALIDATION

    if (!title.trim()) {
      return toast.error("Course title is required");
    }

    if (!description.trim()) {
      return toast.error("Description is required");
    }

    if (!price || Number(price) <= 0) {
      return toast.error("Enter a valid price");
    }

    if (!durationMonths || Number(durationMonths) <= 0) {
      return toast.error("Duration must be greater than 0");
    }

    if (!startDate) {
      return toast.error("Please select a start date");
    }

    if (!classTime) {
      return toast.error("Please select class time");
    }

    try {
      await dispatch(
        createLiveCourse({
          title: title.trim(),
          description: description.trim(),
          price: Number(price),
          durationMonths: Number(durationMonths),
          startDate,
          classTime,
        }),
      );

      toast.success("Live course created successfully");

      setTitle("");
      setDescription("");
      setPrice("");
      setDurationMonths(2);
      setStartDate("");
      setClassTime("");
    } catch (error) {
      toast.error(error?.message || "Failed to create live course");
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Create Live Mentorship Batch
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Create a new live trading mentorship program and provide students with
          Google Meet access.
        </p>
      </div>

      {/* FORM CARD */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <form onSubmit={submitHandler} className="space-y-6">
          {/* TITLE */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Course Title
            </label>

            <input
              type="text"
              placeholder="Forex Mastery Mentorship"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              rows="5"
              placeholder="Describe your mentorship program..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
            />
          </div>

          {/* PRICE + DURATION */}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Course Fee (₹)
              </label>

              <input
                type="number"
                min="1"
                placeholder="20000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Duration (Months)
              </label>

              <input
                type="number"
                min="1"
                value={durationMonths}
                onChange={(e) => setDurationMonths(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>
          </div>

          {/* DATE + TIME */}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Start Date
              </label>

              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Class Time
              </label>

              <input
                type="time"
                value={classTime}
                onChange={(e) => setClassTime(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>
          </div>

          {/* INFO BOX */}

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-700">
              Set the batch start date and class time. Google Meet links can be
              added later when the live session is ready to begin.
            </p>
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-black py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Live Mentorship Batch"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLiveCourse;
