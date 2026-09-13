import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { getAnalyses } from "../../actions/marketAnalysisActions";
import "./StudentMarketAnalysisScreen.css";

const MARKETS = ["All", "Forex", "Gold", "Crypto", "Stocks", "Indices"];
const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const StudentMarketAnalysisScreen = () => {
  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();
  const { analyses = [], loading, error } = useSelector((state) => state.analysisList);
  const [marketFilter, setMarketFilter] = useState("All");

  useEffect(() => { dispatch(getAnalyses()); }, [dispatch]);

  const filteredAnalyses = marketFilter === "All" ? analyses : analyses.filter((analysis) => analysis.market === marketFilter);

  return (
    <section className="alphira-analysis" aria-labelledby="analysis-page-title">
      <header className="alphira-analysis-hero">
        <div className="alphira-analysis-masthead"><span>ALPHIRA CAPITAL / RESEARCH</span><BookOpen size={20} aria-hidden="true" /></div>
        <div className="alphira-analysis-hero-body"><div><span className="alphira-analysis-eyebrow">The mentor's perspective</span><h1 id="analysis-page-title">Market analysis.<br /><span>A clearer perspective.</span></h1></div><p>Explore market observations and analysis from your mentors. Build context across Forex, Gold, Crypto, Stocks and Indices.</p></div>
      </header>

      <div className="alphira-analysis-toolbar">
        <div className="alphira-analysis-filters" role="group" aria-label="Filter analyses by market">
          {MARKETS.map((market) => <button type="button" key={market} onClick={() => setMarketFilter(market)} aria-pressed={marketFilter === market} className={marketFilter === market ? "is-active" : ""}>{market}</button>)}
        </div>
        <p className="alphira-analysis-count" role="status">{loading ? "Loading insights…" : error ? "Insights unavailable" : `${filteredAnalyses.length} ${filteredAnalyses.length === 1 ? "insight" : "insights"}`}</p>
      </div>

      {loading ? <div className="alphira-analysis-state" role="status"><span className="alphira-analysis-loader" aria-hidden="true" /><h2>Gathering your insights</h2><p>Loading the latest mentor analysis.</p></div> : error ? <div className="alphira-analysis-state" role="alert"><h2>Unable to load analyses</h2><p>{error}</p><button type="button" onClick={() => dispatch(getAnalyses())}>Try again</button></div> : filteredAnalyses.length === 0 ? <div className="alphira-analysis-state"><BookOpen size={28} aria-hidden="true" /><h2>{marketFilter === "All" ? "Insights are on their way." : `No ${marketFilter} analysis yet.`}</h2><p>{marketFilter === "All" ? "Your mentors haven't published any analysis yet. Their insights will appear here." : "Explore another market to see what your mentors have shared."}</p>{marketFilter !== "All" && <button type="button" onClick={() => setMarketFilter("All")}>View all markets</button>}</div> : (
        <div className="alphira-analysis-grid">
          {filteredAnalyses.map((analysis, index) => (
            <motion.article key={analysis._id} className="alphira-analysis-card" initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, delay: Math.min(index, 4) * 0.05 }}>
              <div className="alphira-analysis-image">
                <div className="alphira-analysis-image-fallback" aria-hidden="true"><img src="/alphira-ac-logo.svg" alt="" /><span>ALPHIRA / MARKET NOTES</span></div>
                {analysis.image && <img className="alphira-analysis-cover" src={analysis.image} alt={analysis.title} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />}
                {analysis.featured && <span className="alphira-analysis-featured">Featured insight</span>}
              </div>
              <div className="alphira-analysis-card-body">
                <div className="alphira-analysis-meta"><span>{analysis.market || "Market analysis"}</span><span>{formatDate(analysis.createdAt)}</span></div>
                <h2><Link to={`/dashboard/market-analysis/${analysis._id}`}>{analysis.title}</Link></h2>
                <p className="alphira-analysis-excerpt">{analysis.content}</p>
                <footer className="alphira-analysis-card-footer"><div><span>MENTOR INSIGHT</span><strong>{analysis.author?.name || "Alphira Capital"}</strong></div><Link to={`/dashboard/market-analysis/${analysis._id}`} className="alphira-analysis-read" aria-label={`Read analysis: ${analysis.title}`}>Read <ArrowUpRight size={16} aria-hidden="true" /></Link></footer>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
};

export default StudentMarketAnalysisScreen;
