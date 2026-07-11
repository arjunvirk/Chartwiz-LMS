import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getLiveCourses, enrollLiveCourse } from "../actions/liveCourseActions";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const statusStyles = {
  live: "text-ember-orange",
  completed: "text-slate",
};

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
    <div className="min-h-screen bg-vellum px-6 py-16 mt-10">
      <div className="mx-auto max-w-[1200px]">
        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ember-orange">
            Live Mentorship
          </span>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-graphite md:text-5xl">
            Live Mentorship Batches
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate">
            Join professional live trading mentorship batches, market analysis
            sessions and webinars. Enroll now and access scheduled classes
            directly from your student dashboard.
          </p>
        </motion.div>

        {/* LOADING */}
        {loading ? (
          <div className="mt-20 flex justify-center">
            <div className="h-11 w-11 animate-spin rounded-full border-2 border-obsidian border-t-transparent" />
          </div>
        ) : liveCourses.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-pebble bg-bone py-20 text-center">
            <h2 className="font-serif text-3xl text-graphite">
              Live Courses Coming Soon
            </h2>
            <p className="mt-3 text-sm text-slate">
              New mentorship batches will be announced shortly.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {liveCourses.map((course, i) => (
              <motion.div
                key={course._id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="rounded-3xl bg-bone p-8 transition duration-300 hover:-translate-y-1"
              >
                <h2 className="font-serif text-2xl leading-tight text-graphite">
                  {course.title}
                </h2>
                <p className="mt-4 text-sm text-slate">{course.description}</p>

                <div className="mt-6 space-y-3 border-t border-pebble pt-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Instructor</span>
                    <span className="font-semibold text-graphite">
                      {course.instructor}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Duration</span>
                    <span className="font-semibold text-graphite">
                      {course.durationMonths} Months
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Start Date</span>
                    <span className="font-semibold text-graphite">
                      {new Date(course.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Class Time</span>
                    <span className="font-semibold text-graphite">
                      {course.classTime}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Status</span>
                    <span
                      className={`font-mono text-xs font-semibold uppercase ${
                        statusStyles[course.status] || "text-mist"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-slate">Course Fee</p>
                    <h3 className="font-mono text-3xl font-medium text-graphite">
                      ₹{course.price}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => enrollHandler(course._id)}
                  className="mt-8 w-full rounded-[600px] bg-obsidian py-3 font-mono text-sm font-medium text-vellum transition hover:bg-ember-orange hover:text-black"
                >
                  Enroll in Mentorship
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveCoursesPage;
