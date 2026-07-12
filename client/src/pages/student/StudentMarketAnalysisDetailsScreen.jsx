import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { getAnalysisDetails } from "../../actions/marketAnalysisActions";

const StudentMarketAnalysisDetailsScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const analysisDetails = useSelector((state) => state.analysisDetails);
  const { loading, error, analysis = {} } = analysisDetails;

  useEffect(() => {
    dispatch(getAnalysisDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-bone p-10 text-center">
        <h2 className="text-lg font-semibold text-graphite">
          Loading analysis...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        to="/dashboard/market-analysis"
        className="inline-flex items-center gap-2 rounded-xl border border-pebble bg-vellum px-5 py-3 text-sm font-medium text-graphite transition hover:bg-bone"
      >
        <ArrowLeft size={16} />
        Back to Market Analysis
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-2xl bg-bone"
      >
        <img
          src={
            analysis.image ||
            "https://via.placeholder.com/1200x500?text=Market+Analysis"
          }
          alt={analysis.title}
          className="h-72 w-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x500?text=Market+Analysis";
          }}
        />

        <div className="p-8">
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-pill bg-ember-orange/15 px-4 py-1.5 font-mono text-xs font-medium text-ember-orange">
              {analysis.market}
            </span>
            {analysis.featured && (
              <span className="rounded-pill border border-pebble px-4 py-1.5 font-mono text-xs font-medium text-slate">
                Featured
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl leading-tight text-graphite">
            {analysis.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate">
            <span>👨‍🏫 {analysis.author?.name || "ChartWiz Academy"}</span>
            <span>📅 {new Date(analysis.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="my-8 h-px bg-pebble" />

          <div className="whitespace-pre-wrap text-base leading-relaxed text-graphite">
            {analysis.content}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentMarketAnalysisDetailsScreen;
