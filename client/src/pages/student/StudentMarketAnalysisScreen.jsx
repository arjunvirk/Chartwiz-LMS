import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAnalyses } from "../../actions/marketAnalysisActions";

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
      : analyses.filter((analysis) => analysis.market === marketFilter);

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="rounded-3xl bg-linear-to-r from-black to-gray-800 p-8 text-white">
        <h1 className="text-4xl font-bold">Market Analysis</h1>

        <p className="mt-3 max-w-3xl text-gray-300">
          Stay updated with daily Forex, Gold, Crypto, Stock and Indices
          analysis published by our professional mentors.
        </p>
      </div>

      {/* FILTERS */}

      <div className="flex flex-wrap gap-3">
        {["All", "Forex", "Gold", "Crypto", "Stocks", "Indices"].map(
          (market) => (
            <button
              key={market}
              onClick={() => setMarketFilter(market)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                marketFilter === market
                  ? "bg-black text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {market}
            </button>
          ),
        )}
      </div>

      {/* LOADING */}

      {loading && (
        <div className="rounded-2xl bg-white p-10 text-center shadow">
          Loading analyses...
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="rounded-2xl bg-red-50 p-10 text-center text-red-600 shadow">
          {error}
        </div>
      )}

      {/* EMPTY */}

      {!loading && filteredAnalyses.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center shadow">
          <h2 className="text-xl font-semibold">
            No Market Analysis Available
          </h2>

          <p className="mt-2 text-gray-500">
            Your mentors haven't published any analysis yet.
          </p>
        </div>
      )}

      {/* ANALYSIS */}

      {!loading && filteredAnalyses.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAnalyses.map((analysis) => (
            <div
              key={analysis._id}
              className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={
                  analysis.image ||
                  "https://via.placeholder.com/600x350?text=Market+Analysis"
                }
                alt={analysis.title}
                className="h-52 w-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x350?text=Market+Analysis";
                }}
              />

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    {analysis.market}
                  </span>

                  {analysis.featured && (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                      Featured
                    </span>
                  )}
                </div>

                <h2 className="mt-4 line-clamp-2 text-xl font-bold">
                  {analysis.title}
                </h2>

                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-gray-600">
                  {analysis.content}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      {analysis.author?.name || "ChartWiz Academy"}
                    </p>

                    <p className="text-xs text-gray-400">
                      {new Date(analysis.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <Link
                    to={`/dashboard/market-analysis/${analysis._id}`}
                    className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    Read
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentMarketAnalysisScreen;
