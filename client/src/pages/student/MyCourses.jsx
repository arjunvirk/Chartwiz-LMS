import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getMyCourses } from "../../actions/courseActions";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const MyCourses = () => {
  const dispatch = useDispatch();
  const myCourses = useSelector((state) => state.myCourses);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, courses } = myCourses;

  useEffect(() => {
    if (!userInfo) return;
    dispatch(getMyCourses());
  }, [dispatch, userInfo]);

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
        <h1 className="font-serif text-3xl leading-tight text-graphite">
          My Courses
        </h1>
        <p className="mt-2 text-sm text-slate">
          Continue learning your enrolled premium trading courses.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-11 w-11 animate-spin rounded-full border-2 border-obsidian border-t-transparent" />
        </div>
      ) : courses?.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-pebble bg-bone py-20 text-center">
          <h2 className="font-serif text-2xl text-graphite">No Courses Yet</h2>
          <p className="mt-3 text-sm text-slate">
            You are not enrolled in any course.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, i) => (
            <motion.div
              key={course._id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="overflow-hidden rounded-2xl bg-bone transition duration-300 hover:-translate-y-1"
            >
              {/* THUMBNAIL */}
              <div className="relative h-44 w-full overflow-hidden">
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
              <div className="p-6">
                <span className="rounded-pill bg-obsidian px-3 py-1 font-mono text-[11px] font-medium text-vellum">
                  {course.category}
                </span>

                <h2 className="mt-4 line-clamp-2 text-lg font-semibold text-graphite">
                  {course.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate">
                  {course.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-pebble pt-4">
                  <div>
                    <p className="text-xs text-slate">Instructor</p>
                    <h4 className="text-sm font-semibold text-graphite">
                      {course.instructor}
                    </h4>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate">Lessons</p>
                    <h4 className="text-sm font-semibold text-graphite">
                      {course.videos?.length || 0}
                    </h4>
                  </div>
                </div>

                <Link
                  to={`/dashboard/courses/${course._id}`}
                  className="mt-6 block rounded-pill bg-ember-orange py-3 text-center font-mono text-sm font-semibold text-black transition hover:brightness-95"
                >
                  Continue Learning
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
