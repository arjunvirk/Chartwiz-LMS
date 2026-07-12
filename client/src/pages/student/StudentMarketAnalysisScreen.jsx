import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { getAnalyses } from "../../actions/marketAnalysisActions";

const MARKETS = ["All", "Forex", "Gold", "Crypto", "Stocks", "Indices"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const StudentMarketAnalysisScreen = () => {
  const dispatch = useDispatch();
  const analysisList = useSelector((state) => state.analysisList);
  const { analyses = [], loading, error } = analysisList;

  const [marketFilter, setMarketFilter] = useState("All");

  useEffect(() => {
    dispatch(getAnalyses());
  }, [dispatch]);

  const filteredAnalyses =
    marketFilter === "All"
      ? analyses
      : analyses.filter((a) => a.market === marketFilter);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="rounded-2xl bg-obsidian p-8 text-vellum">
        <h1 className="font-serif text-3xl leading-tight md:text-4xl">
          Market Analysis
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">
          Stay updated with daily Forex, Gold, Crypto, Stock and Indices
          analysis published by our professional mentors.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2">
        {MARKETS.map((market) => (
          <button
            key={market}
            onClick={() => setMarketFilter(market)}
            className={`rounded-[600px] px-5 py-2 font-mono text-sm font-medium transition ${
              marketFilter === market
                ? "bg-ember-orange text-black"
                : "border border-pebble bg-vellum text-slate hover:bg-bone"
            }`}
          >
            {market}
          </button>
        ))}
      </div>

      {loading && (
        <div className="rounded-2xl bg-bone p-10 text-center text-sm text-slate">
          Loading analyses...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && filteredAnalyses.length === 0 && (
        <div className="rounded-2xl border border-dashed border-pebble bg-bone py-16 text-center">
          <h2 className="text-lg font-semibold text-graphite">
            No Market Analysis Available
          </h2>
          <p className="mt-2 text-sm text-slate">
            Your mentors haven't published any analysis yet.
          </p>
        </div>
      )}

      {!loading && filteredAnalyses.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredAnalyses.map((analysis, i) => (
            <motion.div
              key={analysis._id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="overflow-hidden rounded-2xl bg-bone transition duration-300 hover:-translate-y-1"
            >
              <img
                src={
                  analysis.image ||
                  "https://via.placeholder.com/600x350?text=Market+Analysis"
                }
                alt={analysis.title}
                className="h-44 w-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x350?text=Market+Analysis";
                }}
              />

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-[600px] bg-ember-orange/15 px-3 py-1 font-mono text-[11px] font-medium text-ember-orange">
                    {analysis.market}
                  </span>
                  {analysis.featured && (
                    <span className="rounded-[600px] border border-pebble px-3 py-1 font-mono text-[11px] font-medium text-slate">
                      Featured
                    </span>
                  )}
                </div>

                <h2 className="mt-4 line-clamp-2 text-lg font-semibold text-graphite">
                  {analysis.title}
                </h2>

                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate">
                  {analysis.content}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-pebble pt-4">
                  <div>
                    <p className="text-xs font-semibold text-graphite">
                      {analysis.author?.name || "ChartWiz Academy"}
                    </p>
                    <p className="text-xs text-slate">
                      {new Date(analysis.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <Link
                    to={`/dashboard/market-analysis/${analysis._id}`}
                    className="rounded-[600px] bg-obsidian px-4 py-2 font-mono text-xs font-medium text-vellum transition hover:bg-ember-orange hover:text-black"
                  >
                    Read
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentMarketAnalysisScreen;
