import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, ExternalLink, Clock } from "lucide-react";

import { getForexNewsDetails } from "../actions/forexNewsActions";

const ForexNewsDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const forexNewsDetails = useSelector((state) => state.forexNewsDetails);

  const { loading, error, news } = forexNewsDetails;

  useEffect(() => {
    dispatch(getForexNewsDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-10 max-w-5xl rounded-3xl bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (!news) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link
          to="/forex-news"
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 font-semibold"
        >
          <ArrowLeft size={16} />
          Back to News
        </Link>

        {/* IMAGE */}

        <div className="overflow-hidden rounded-4xl">
          <img
            src={
              news.image ||
              "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg"
            }
            alt={news.title}
            className="h-[450px] w-full object-cover"
          />
        </div>

        {/* CONTENT */}

        <div className="mt-8 rounded-4xl bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-black px-4 py-2 text-sm font-bold text-white">
              {news.source}
            </span>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={14} />
              {new Date(news.publishedAt).toLocaleString()}
            </div>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold">{news.title}</h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            {news.description}
          </p>

          {news.url && (
            <a
              href={news.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-4 font-semibold text-white"
            >
              <ExternalLink size={18} />
              Read Original Article
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForexNewsDetails;
