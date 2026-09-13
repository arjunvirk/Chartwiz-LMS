import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Save } from "lucide-react";
import { getAnalyses, updateAnalysis } from "../../actions/marketAnalysisActions";
import "./CreateAnalysis.css";

const EditAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();
  const { analyses = [], loading: listLoading, error: listError } = useSelector((state) => state.analysisList);
  const { loading, error, success } = useSelector((state) => state.analysisUpdate);
  const analysis = analyses.find((item) => item._id === id);
  const [title, setTitle] = useState("");
  const [market, setMarket] = useState("Forex");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const pendingSave = useRef(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    dispatch(getAnalyses());
    setRequested(true);
  }, [dispatch, id]);

  useEffect(() => {
    if (analysis) {
      setTitle(analysis.title || "");
      setMarket(analysis.market || "Forex");
      setFeatured(analysis.featured || false);
      setImage(analysis.image || "");
      setContent(analysis.content || "");
    }
  }, [analysis]);

  useEffect(() => {
    if (!pendingSave.current || loading) return;
    if (success) {
      pendingSave.current = false;
      navigate("/teacher/dashboard/analysis");
    } else if (error) {
      pendingSave.current = false;
    }
  }, [success, error, loading, navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (pendingSave.current || loading) return;
    pendingSave.current = true;
    setSubmitted(true);
    dispatch(updateAnalysis(id, { title, market, featured, image, content }));
  };

  if (!requested || listLoading || listError || !analysis) {
    return (
      <section className="alphira-analysis-editor">
        <Link to="/teacher/dashboard/analysis" className="alphira-analysis-editor-back"><ArrowLeft size={16} aria-hidden="true" />Back to market analysis</Link>
        <div className="alphira-analysis-editor-main alphira-analysis-editor-section" role={listError ? "alert" : "status"}>
          <div className="alphira-analysis-editor-section-title"><div><h2>{!requested || listLoading ? "Loading analysis…" : listError ? "Unable to load analysis" : "Analysis not found"}</h2><p>{listError || (!requested || listLoading ? "Getting your editor ready." : "Return to your library to select another analysis.")}</p></div></div>
          {listError && <button type="button" className="alphira-analysis-editor-back" onClick={() => dispatch(getAnalyses())}>Try again</button>}
        </div>
      </section>
    );
  }

  return (
    <motion.section className="alphira-analysis-editor" aria-labelledby="analysis-editor-title" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Link to="/teacher/dashboard/analysis" className="alphira-analysis-editor-back"><ArrowLeft size={16} aria-hidden="true" />Back to market analysis</Link>
      <header className="alphira-analysis-editor-header"><span className="alphira-analysis-editor-eyebrow">Research / Edit analysis</span><h1 id="analysis-editor-title">Refine your perspective.</h1><p>Update your market observations and keep your students informed.</p></header>

      <form onSubmit={submitHandler} className="alphira-analysis-editor-layout" aria-busy={!!loading}>
        <div className="alphira-analysis-editor-main">
          <section className="alphira-analysis-editor-section" aria-labelledby="editor-story"><div className="alphira-analysis-editor-section-title"><span>01</span><div><h2 id="editor-story">The story</h2><p>A clear headline. A considered perspective.</p></div></div>
            <label htmlFor="analysis-edit-title">Analysis title </label><input id="analysis-edit-title" type="text" placeholder="e.g. Gold outlook: key levels to watch" value={title} onChange={(event) => setTitle(event.target.value)} />
            <div className="alphira-analysis-editor-content-label"><label htmlFor="analysis-edit-content">Your analysis </label><span>{content.trim() ? content.trim().split(/\s+/).length : 0} words</span></div>
            <textarea id="analysis-edit-content" rows={16} placeholder="Start with the market context, then share your observations and key levels…" value={content} onChange={(event) => setContent(event.target.value)} aria-describedby="analysis-content-hint" />
            <p id="analysis-content-hint" className="alphira-analysis-editor-hint">Line breaks are preserved in the published analysis.</p>
          </section>
          <section className="alphira-analysis-editor-section" aria-labelledby="editor-visual"><div className="alphira-analysis-editor-section-title"><span>02</span><div><h2 id="editor-visual">Supporting visual</h2><p>Add a chart or image to support your analysis.</p></div></div><label htmlFor="analysis-edit-image">Image URL <span>Optional</span></label><input id="analysis-edit-image" type="text" placeholder="https://…" value={image} onChange={(event) => setImage(event.target.value)} aria-describedby="analysis-image-hint" /><p id="analysis-image-hint" className="alphira-analysis-editor-hint">Paste a direct link to your image or leave this field empty.</p></section>
        </div>

        <aside className="alphira-analysis-editor-sidebar" aria-label="Publishing settings">
          <div className="alphira-analysis-editor-publish"><span className="alphira-analysis-editor-eyebrow">ALPHIRA CAPITAL / RESEARCH</span><h2>Keep your insight current.</h2><p>Review your market, featured setting and content before saving your changes.</p><div className="alphira-analysis-editor-market"><label htmlFor="analysis-edit-market">Market</label><select id="analysis-edit-market" value={market} onChange={(event) => setMarket(event.target.value)}>{["Forex", "Gold", "Crypto", "Stocks", "Indices"].map((option) => <option key={option} value={option}>{option}</option>)}</select></div><label className="alphira-analysis-editor-featured" htmlFor="analysis-edit-featured"><input id="analysis-edit-featured" type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} /><span><strong>Feature this analysis</strong><small>Add the Featured label to this insight.</small></span></label><button type="submit" disabled={loading}><Save size={16} aria-hidden="true" />{loading ? "Saving changes…" : "Save changes"}<ArrowUpRight size={16} aria-hidden="true" /></button></div>
          {submitted && !loading && error && <div className="alphira-analysis-editor-feedback is-error" role="alert"><strong>Could not save changes</strong><p>{error}</p></div>}
          <div className="alphira-analysis-editor-note"><span>MAKE IT CLEAR</span><p>Use short paragraphs and explain the reasoning behind your observations. A useful insight gives your students context.</p></div>
        </aside>
      </form>
    </motion.section>
  );
};

export default EditAnalysis;

