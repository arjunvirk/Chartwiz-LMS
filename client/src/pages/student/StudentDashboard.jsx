import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMyCourses } from "../../actions/courseActions";
import { getMyLiveCourses } from "../../actions/liveCourseActions";
import { listWebinars } from "../../actions/webinarActions";

import { getAnalyses } from "../../actions/marketAnalysisActions";

const StudentDashboard = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { courses = [] } = useSelector((state) => state.myCourses);

  const { liveCourses = [] } = useSelector((state) => state.myLiveCourses);

  const webinarList = useSelector((state) => state.webinarList);

  const { webinars = [] } = webinarList;

  const analysisList = useSelector((state) => state.analysisList);

  const { analyses = [] } = analysisList;

  const getWebinarStatus = (webinar) => {
    const now = new Date();

    const startTime = new Date(webinar.startTime);

    const endTime = new Date(
      startTime.getTime() + webinar.duration * 60 * 1000,
    );

    const fifteenMinutesBefore = new Date(startTime.getTime() - 15 * 60 * 1000);

    // Webinar completed
    if (now > endTime) {
      return {
        label: "Completed",
        canJoin: false,
        color: "bg-gray-200 text-gray-700",
      };
    }

    // Join enabled 15 mins before
    if (now >= fifteenMinutesBefore) {
      return {
        label: "Join Webinar",
        canJoin: true,
        color: "bg-black text-white",
      };
    }

    // Upcoming
    const diffMs = startTime - now;

    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) {
      return {
        label: `Starts in ${diffMinutes}m`,
        canJoin: false,
        color: "bg-yellow-100 text-yellow-700",
      };
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 24) {
      return {
        label: `Starts in ${diffHours}h`,
        canJoin: false,
        color: "bg-yellow-100 text-yellow-700",
      };
    }

    if (diffHours < 24) {
      return {
        label: `Starts in ${diffHours}h`,
        canJoin: false,
        color: "bg-yellow-100 text-yellow-700",
      };
    }

    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return {
      label: `Starts in ${diffDays} day${diffDays > 1 ? "s" : ""}`,
      canJoin: false,
      color: "bg-yellow-100 text-yellow-700",
    };
  };

  useEffect(() => {
    if (!userInfo) return;

    dispatch(getMyCourses());
    dispatch(getMyLiveCourses());
    dispatch(listWebinars());
    dispatch(getAnalyses());
  }, [dispatch, userInfo]);

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

        {/* MARKET ANALYSIS */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Latest Market Analysis
            </h2>

            <Link
              to="/dashboard/market-analysis"
              className="text-sm font-medium text-black hover:underline"
            >
              View All
            </Link>
          </div>

          {analyses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
              <p className="text-gray-500">No market analysis available.</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {analyses.slice(0, 3).map((analysis) => (
                <div
                  key={analysis._id}
                  className="overflow-hidden rounded-3xl border transition hover:shadow-lg"
                >
                  <img
                    src={
                      analysis.image ||
                      "https://via.placeholder.com/600x400?text=Market+Analysis"
                    }
                    alt={analysis.title}
                    className="h-44 w-full object-cover"
                  />

                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        {analysis.market}
                      </span>

                      {analysis.featured && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 line-clamp-2 text-lg font-bold">
                      {analysis.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                      {analysis.content}
                    </p>

                    <p className="mt-3 text-xs text-gray-400">
                      By {analysis.author?.name || "ChartWiz Academy"}
                    </p>

                    <Link
                      to={`/dashboard/market-analysis/${analysis._id}`}
                      className="mt-5 inline-block rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white"
                    >
                      Read Analysis
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

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

                  <p>Offline course</p>
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

      {/* UPCOMING WEBINARS */}

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Upcoming Webinars
          </h2>
        </div>

        {webinars.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
            <p className="text-gray-500">No upcoming webinars available.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {webinars.slice(0, 5).map((webinar) => {
              const status = getWebinarStatus(webinar);

              return (
                <div
                  key={webinar._id}
                  className="flex flex-col justify-between rounded-2xl border p-5 md:flex-row md:items-center"
                >
                  <div>
                    <h3 className="font-bold">{webinar.title}</h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {webinar.description}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      {new Date(webinar.startTime).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0">
                    {status.canJoin ? (
                      <a
                        href={webinar.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
                      >
                        Join Webinar
                      </a>
                    ) : (
                      <span
                        className={`rounded-xl px-5 py-3 text-sm font-semibold ${status.color}`}
                      >
                        {status.label}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
