import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TrendingUp, Plus, Trash2, Pencil } from "lucide-react";

import {
  getAnalyses,
  deleteAnalysis,
} from "../../actions/marketAnalysisActions";

const AnalysisList = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const analysisList = useSelector((state) => state.analysisList);
  const { loading, error, analyses = [] } = analysisList;

  const analysisDelete = useSelector((state) => state.analysisDelete);
  const { success: successDelete } = analysisDelete;

  useEffect(() => {
    if (!userInfo) return;

    dispatch(getAnalyses());
  }, [dispatch, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Delete this analysis?")) {
      dispatch(deleteAnalysis(id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-red-50 p-6 text-red-600">{error}</div>
    );
  }

  return (
    <div>
      {/* HEADER */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <TrendingUp size={30} />
            <h1 className="text-4xl font-extrabold">Market Analysis</h1>
          </div>

          <p className="mt-3 text-gray-500">
            Manage all published market analyses.
          </p>
        </div>

        <Link
          to="/teacher/dashboard/analysis/create"
          className="flex items-center gap-2 rounded-2xl bg-black px-6 py-4 font-semibold text-white"
        >
          <Plus size={18} />
          Create Analysis
        </Link>
      </div>

      {/* LIST */}

      <div className="mt-10 space-y-5">
        {analyses.length === 0 ? (
          <div className="rounded-4xl border border-dashed border-gray-300 py-20 text-center">
            <h2 className="text-2xl font-bold">No Analysis Found</h2>

            <p className="mt-3 text-gray-500">
              Publish your first market analysis.
            </p>
          </div>
        ) : (
          analyses.map((analysis) => (
            <div
              key={analysis._id}
              className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* LEFT */}

                <div>
                  <h2 className="text-2xl font-bold">{analysis.title}</h2>

                  <div className="mt-3 flex flex-wrap gap-3">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600">
                      {analysis.market}
                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
                      {analysis.status}
                    </span>

                    {analysis.featured && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-sm text-gray-500">
                    Created: {new Date(analysis.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* RIGHT */}

                <div className="flex gap-3">
                  <Link
                    to={`/teacher/dashboard/analysis/${analysis._id}/edit`}
                    className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 font-semibold transition hover:border-black"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteHandler(analysis._id)}
                    className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnalysisList;
