import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Newspaper, Clock, ExternalLink } from "lucide-react";

import { getForexNews } from "../actions/forexNewsActions";

const ForexNews = () => {
  const dispatch = useDispatch();

  const forexNews = useSelector((state) => state.forexNews);

  const { loading, error, news = [] } = forexNews;

  useEffect(() => {
    dispatch(getForexNews());
  }, [dispatch]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}

      <div className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-center gap-4">
            <Newspaper size={40} />

            <div>
              <h1 className="text-5xl font-extrabold">Live Forex News</h1>

              <p className="mt-3 max-w-2xl text-lg text-gray-300">
                Stay updated with real-time forex, commodities, indices and
                global market news.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="mx-auto max-w-7xl px-6 py-12">
        {news.length === 0 ? (
          <div className="rounded-4xl border border-dashed border-gray-300 bg-white py-24 text-center">
            <h2 className="text-3xl font-bold">No News Available</h2>

            <p className="mt-3 text-gray-500">
              Latest forex news will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {news.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE */}

                <div className="h-64 overflow-hidden bg-gray-100">
                  <img
                    src={
                      item.image ||
                      "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg"
                    }
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                {/* BODY */}

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                      {item.source}
                    </span>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={14} />

                      {new Date(item.publishedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-black">
                    {item.title}
                  </h2>

                  <p className="mt-4 line-clamp-3 text-gray-600">
                    {item.description}
                  </p>

                  {/* ACTIONS */}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to={`/forex-news/${item._id}`}
                      className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      Read Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForexNews;
