import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Save, TrendingUp } from "lucide-react";

import {
  getAnalyses,
  updateAnalysis,
} from "../../actions/marketAnalysisActions";

const EditAnalysis = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const analysisList = useSelector((state) => state.analysisList);

  const { analyses = [] } = analysisList;

  const analysis = analyses.find((item) => item._id === id);

  const [title, setTitle] = useState("");
  const [market, setMarket] = useState("Forex");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (analyses.length === 0) {
      dispatch(getAnalyses());
    }
  }, [dispatch, analyses.length]);

  useEffect(() => {
    if (analysis) {
      setTitle(analysis.title || "");
      setMarket(analysis.market || "Forex");
      setFeatured(analysis.featured || false);
      setImage(analysis.image || "");
      setContent(analysis.content || "");
    }
  }, [analysis]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateAnalysis(id, {
        title,
        market,
        featured,
        image,
        content,
      }),
    );

    navigate("/teacher/dashboard/analysis");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-4xl bg-black p-8 text-white">
        <div className="flex items-center gap-4">
          <TrendingUp size={40} />

          <div>
            <h1 className="text-4xl font-extrabold">Edit Analysis</h1>

            <p className="mt-2 text-gray-300">
              Update market analysis content.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={submitHandler}
        className="mt-8 rounded-4xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-6 w-full rounded-2xl border border-gray-300 px-4 py-3"
        />

        <select
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          className="mb-6 w-full rounded-2xl border border-gray-300 px-4 py-3"
        >
          <option value="Forex">Forex</option>
          <option value="Gold">Gold</option>
          <option value="Crypto">Crypto</option>
          <option value="Stocks">Stocks</option>
          <option value="Indices">Indices</option>
        </select>

        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mb-6 w-full rounded-2xl border border-gray-300 px-4 py-3"
        />

        <div className="mb-6 flex items-center gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />

          <span>Featured Analysis</span>
        </div>

        <textarea
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3"
        />

        <button
          type="submit"
          className="mt-8 flex items-center gap-2 rounded-2xl bg-black px-6 py-4 font-semibold text-white"
        >
          <Save size={18} />
          Update Analysis
        </button>
      </form>
    </div>
  );
};

export default EditAnalysis;
