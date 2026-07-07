import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Save, TrendingUp } from "lucide-react";

import { createAnalysis } from "../../actions/marketAnalysisActions";

const CreateAnalysis = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [market, setMarket] = useState("Forex");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const analysisCreate = useSelector((state) => state.analysisCreate);

  const { loading } = analysisCreate;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createAnalysis({
        title,
        market,
        featured,
        image,
        content,
      }),
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* HEADER */}

      <div className="rounded-4xl bg-black p-8 text-white">
        <div className="flex items-center gap-4">
          <TrendingUp size={40} />

          <div>
            <h1 className="text-4xl font-extrabold">Create Market Analysis</h1>

            <p className="mt-2 text-gray-300">
              Publish forex, gold, crypto and market insights for students.
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}

      <form
        onSubmit={submitHandler}
        className="mt-8 rounded-4xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        {/* TITLE */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Analysis Title
          </label>

          <input
            type="text"
            placeholder="Gold Outlook Today"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        {/* MARKET */}

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Market
          </label>

          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          >
            <option value="Forex">Forex</option>
            <option value="Gold">Gold</option>
            <option value="Crypto">Crypto</option>
            <option value="Stocks">Stocks</option>
            <option value="Indices">Indices</option>
          </select>
        </div>

        {/* IMAGE */}

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Image URL
          </label>

          <input
            type="text"
            placeholder="https://..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        {/* FEATURED */}

        <div className="mt-6 flex items-center gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-5 w-5"
          />

          <span className="font-medium text-gray-700">
            Mark as Featured Analysis
          </span>
        </div>

        {/* CONTENT */}

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Analysis Content
          </label>

          <textarea
            rows={12}
            placeholder="Write your market analysis..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 flex items-center gap-2 rounded-2xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={18} />
          {loading ? "Publishing..." : "Publish Analysis"}
        </button>
      </form>
    </div>
  );
};

export default CreateAnalysis;
