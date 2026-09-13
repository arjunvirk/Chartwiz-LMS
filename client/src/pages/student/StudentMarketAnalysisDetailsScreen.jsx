import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { getAnalysisDetails } from "../../actions/marketAnalysisActions";
import "./StudentMarketAnalysisDetailsScreen.css";

const StudentMarketAnalysisDetailsScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();
  const { loading, error, analysis = {} } = useSelector((state) => state.analysisDetails);
  const [failedImage, setFailedImage] = useState(null);

  useEffect(() => { dispatch(getAnalysisDetails(id)); }, [dispatch, id]);

  const date = analysis?.createdAt ? new Date(analysis.createdAt) : null;
  const publishedDate = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";
  const author = analysis?.author?.name || "Alphira Capital";

  return (
    <section className="alphira-analysis-detail" aria-label="Market analysis detail">
      <nav className="alphira-analysis-detail-nav" aria-label="Analysis navigation"><Link to="/dashboard/market-analysis"><ArrowLeft size={16} aria-hidden="true" />Back to market analysis</Link><span>ALPHIRA / RESEARCH</span></nav>
      {loading ? <div className="alphira-analysis-detail-state" role="status"><BookOpen size={24} aria-hidden="true" /><h1>Loading your analysis</h1><p>Getting the mentor's perspective ready.</p></div> : error ? <div className="alphira-analysis-detail-state" role="alert"><h1>Unable to load this analysis</h1><p>{error}</p><button type="button" onClick={() => dispatch(getAnalysisDetails(id))}>Try again</button></div> : !analysis?._id ? <div className="alphira-analysis-detail-state"><h1>Analysis unavailable</h1><p>Return to market analysis to explore other mentor insights.</p></div> : (
        <motion.article key={id} className="alphira-analysis-detail-article" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <header className="alphira-analysis-detail-header">
            <div className="alphira-analysis-detail-badges"><span>{analysis.market || "Market analysis"}</span>{analysis.featured && <span>Featured insight</span>}</div>
            <h1>{analysis.title}</h1>
            <div className="alphira-analysis-detail-byline"><div><span>WRITTEN BY</span><strong>{author}</strong></div>{publishedDate && <div><span>PUBLISHED</span><time dateTime={date.toISOString()}>{publishedDate}</time></div>}</div>
          </header>

          {analysis.image && failedImage !== analysis.image && <figure className="alphira-analysis-detail-figure"><img src={analysis.image} alt={analysis.title} onError={() => setFailedImage(analysis.image)} /></figure>}

          <div className="alphira-analysis-detail-reading">
            <aside className="alphira-analysis-detail-note"><span>THE MENTOR'S PERSPECTIVE</span><p>Market observations<br />from Alphira Capital.</p><div aria-hidden="true" /></aside>
            <div className="alphira-analysis-detail-content">{analysis.content}</div>
          </div>
          <footer className="alphira-analysis-detail-footer"><div><span>KEEP EXPLORING</span><h2>Another market. A fresh perspective.</h2></div><Link to="/dashboard/market-analysis">All market insights<ArrowUpRight size={17} aria-hidden="true" /></Link></footer>
        </motion.article>
      )}
    </section>
  );
};

export default StudentMarketAnalysisDetailsScreen;
