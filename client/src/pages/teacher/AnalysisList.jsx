import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Plus, Trash2, Pencil } from "lucide-react";
import { getAnalyses, deleteAnalysis } from "../../actions/marketAnalysisActions";
import "./AnalysisList.css";

const formatDate = (value) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Date unavailable";
};

const AnalysisList = () => {
  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();
  const [deletingId, setDeletingId] = useState(null);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, analyses = [] } = useSelector((state) => state.analysisList);
  const { success: successDelete, loading: deleting, error: deleteError } = useSelector((state) => state.analysisDelete);

  useEffect(() => {
    if (userInfo) dispatch(getAnalyses());
  }, [dispatch, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (deleting) return;
    if (window.confirm("Delete this analysis?")) {
      setDeletingId(id);
      dispatch(deleteAnalysis(id));
    }
  };

  return (
    <section className="alphira-analysis-manager" aria-labelledby="analysis-manager-title">
      <header className="alphira-analysis-manager-header"><div><span className="alphira-analysis-manager-eyebrow">Teaching workspace / Research</span><h1 id="analysis-manager-title">Market analysis.</h1><p>Turn your market perspective into clear insights for your students.</p></div><Link to="/teacher/dashboard/analysis/create" className="alphira-analysis-manager-create"><Plus size={17} aria-hidden="true" />Create analysis</Link></header>

      <div className="alphira-analysis-manager-library"><div><BookOpen size={20} aria-hidden="true" /><span>YOUR CONTENT LIBRARY</span></div><p><strong>{loading ? "…" : error ? "—" : analyses.length}</strong> {analyses.length === 1 ? "analysis" : "analyses"}</p></div>
      {deleteError && deletingId && <p className="alphira-analysis-manager-error" role="alert">Unable to delete analysis: {deleteError}</p>}

      {loading ? <div className="alphira-analysis-manager-state" role="status"><span className="alphira-analysis-manager-loader" aria-hidden="true" /><h2>Loading your library</h2><p>Getting your market analyses ready.</p></div> : error ? <div className="alphira-analysis-manager-state" role="alert"><h2>Unable to load analyses</h2><p>{error}</p><button type="button" onClick={() => dispatch(getAnalyses())}>Try again</button></div> : analyses.length === 0 ? <div className="alphira-analysis-manager-state"><BookOpen size={28} aria-hidden="true" /><h2>Your perspective belongs here.</h2><p>Publish your first market analysis to start your content library.</p><Link to="/teacher/dashboard/analysis/create">Create your first analysis</Link></div> : (
        <div className="alphira-analysis-manager-list">
          {analyses.map((analysis, index) => (
            <motion.article key={analysis._id} className="alphira-analysis-manager-row" initial={reducedMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, delay: Math.min(index, 4) * 0.04 }}>
              <span className="alphira-analysis-manager-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div className="alphira-analysis-manager-content"><div className="alphira-analysis-manager-tags"><span>{analysis.market || "Market analysis"}</span>{analysis.status && <span className="alphira-analysis-manager-status">{analysis.status}</span>}{analysis.featured && <span className="alphira-analysis-manager-featured">Featured</span>}</div><h2><Link to={`/teacher/dashboard/analysis/${analysis._id}/edit`}>{analysis.title}</Link></h2><p>Created {formatDate(analysis.createdAt)}</p></div>
              <div className="alphira-analysis-manager-actions"><Link to={`/teacher/dashboard/analysis/${analysis._id}/edit`} aria-label={`Edit analysis: ${analysis.title}`}><Pencil size={15} aria-hidden="true" />Edit</Link><button type="button" onClick={() => deleteHandler(analysis._id)} disabled={deleting} aria-label={`Delete analysis: ${analysis.title}`}><Trash2 size={15} aria-hidden="true" />{deleting && deletingId === analysis._id ? "Deleting…" : "Delete"}</button></div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
};

export default AnalysisList;
