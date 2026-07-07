import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAnalysisDetails } from "../../actions/marketAnalysisActions";

const StudentMarketAnalysisDetailsScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const analysisDetails = useSelector((state) => state.analysisDetails);

  const {
    loading,
    error,
    analysis = {},
  } = analysisDetails;

  useEffect(() => {
    dispatch(getAnalysisDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow">
        Loading analysis...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-red-50 p-10 text-center text-red-600 shadow">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <Link
        to="/dashboard/market-analysis"
        className="inline-flex rounded-xl border px-5 py-3 text-sm font-semibold hover:bg-gray-100"
      >
        ← Back to Market Analysis
      </Link>

      <div className="overflow-hidden rounded-3xl bg-white shadow">

        <img
          src={
            analysis.image ||
            "https://via.placeholder.com/1200x500?text=Market+Analysis"
          }
          alt={analysis.title}
          className="h-80 w-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x500?text=Market+Analysis";
          }}
        />

        <div className="p-8">

          <div className="mb-5 flex flex-wrap gap-3">

            <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
              {analysis.market}
            </span>

            {analysis.featured && (
              <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
                Featured
              </span>
            )}

          </div>

          <h1 className="text-4xl font-bold leading-tight">
            {analysis.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-gray-500">

            <span>
              👨‍🏫 {analysis.author?.name || "ChartWiz Academy"}
            </span>

            <span>
              📅{" "}
              {new Date(analysis.createdAt).toLocaleDateString()}
            </span>

          </div>

          <hr className="my-8" />

          <div className="prose prose-lg max-w-none whitespace-pre-wrap">
            {analysis.content}
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentMarketAnalysisDetailsScreen;