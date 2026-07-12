import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getMyLiveCourses } from "../../actions/liveCourseActions";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const statusBadge = (status) => {
  if (status === "live") return "bg-ember-orange/15 text-ember-orange";
  if (status === "completed") return "bg-red-100 text-red-600";
  return "border border-pebble text-slate";
};

const MyLiveCourses = () => {
  const dispatch = useDispatch();
  const myLiveCourses = useSelector((state) => state.myLiveCourses);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, liveCourses = [] } = myLiveCourses;

  useEffect(() => {
    if (!userInfo) return;
    dispatch(getMyLiveCourses());
  }, [dispatch, userInfo]);

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
        <h1 className="font-serif text-3xl leading-tight text-graphite">My Live Classes</h1>
        <p className="mt-2 text-sm text-slate">
          View your mentorship schedule, upcoming sessions and join live
          classes when they become available.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-11 w-11 animate-spin rounded-full border-2 border-obsidian border-t-transparent" />
        </div>
      ) : liveCourses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-pebble bg-bone py-20 text-center">
          <h2 className="font-serif text-2xl text-graphite">No Live Classes Yet</h2>
          <p className="mt-3 text-sm text-slate">
            You are not enrolled in any live mentorship batch.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {liveCourses?.map((course, i) => (
            <motion.div
              key={course._id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="rounded-2xl bg-bone p-6 transition duration-300 hover:-translate-y-1"
            >
              <h2 className="text-lg font-semibold text-graphite">{course.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm text-slate">{course.description}</p>

              <div className="mt-5 space-y-2.5 border-t border-pebble pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate">Instructor</span>
                  <span className="font-semibold text-graphite">{course.instructor}</span>
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
                    {new Date(course.startDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate">Class Time</span>
                  <span className="font-semibold text-graphite">{course.classTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate">Status</span>
                  <span className={`rounded-[600px] px-3 py-1 font-mono text-[11px] font-medium ${statusBadge(course.status)}`}>
                    {course.status}
                  </span>
                </div>
              </div>

              {course.status === "live" ? (
                <a
                  href={course.meetLink?.startsWith("http") ? course.meetLink : `https://${course.meetLink}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 block rounded-[600px] bg-ember-orange py-3 text-center font-mono text-sm font-semibold text-black transition hover:brightness-95"
                >
                  Join Google Meet
                </a>
              ) : course.status === "completed" ? (
                <div className="mt-6 rounded-[600px] bg-red-50 py-3 text-center text-sm font-semibold text-red-600">
                  Session Completed
                </div>
              ) : (
                <div className="mt-6 rounded-[600px] border border-pebble py-3 text-center text-sm font-semibold text-slate">
                  Class Not Started Yet
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLiveCourses;
