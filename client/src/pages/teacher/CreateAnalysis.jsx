import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Save } from "lucide-react";
import { createAnalysis } from "../../actions/marketAnalysisActions";
import "./CreateAnalysis.css";

const CreateAnalysis = () => {
  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();
  const [title, setTitle] = useState("");
  const [market, setMarket] = useState("Forex");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { loading, error, success } = useSelector((state) => state.analysisCreate);

  const submitHandler = (event) => {
    event.preventDefault();
    if (loading) return;
    setSubmitted(true);
    dispatch(createAnalysis({ title, market, featured, image, content }));
  };

  return (
    <motion.section className="alphira-analysis-editor" aria-labelledby="analysis-editor-title" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Link to="/teacher/dashboard/analysis" className="alphira-analysis-editor-back"><ArrowLeft size={16} aria-hidden="true" />Back to market analysis</Link>
      <header className="alphira-analysis-editor-header"><span className="alphira-analysis-editor-eyebrow">Research / New analysis</span><h1 id="analysis-editor-title">Share your perspective.</h1><p>Give students the context behind the charts, one insight at a time.</p></header>

      <form onSubmit={submitHandler} className="alphira-analysis-editor-layout" aria-busy={!!loading}>
        <div className="alphira-analysis-editor-main">
          <section className="alphira-analysis-editor-section" aria-labelledby="editor-story"><div className="alphira-analysis-editor-section-title"><span>01</span><div><h2 id="editor-story">The story</h2><p>A clear headline. A considered perspective.</p></div></div>
            <label htmlFor="analysis-create-title">Analysis title <span>Required</span></label><input id="analysis-create-title" type="text" placeholder="e.g. Gold outlook: key levels to watch" value={title} onChange={(event) => setTitle(event.target.value)} required />
            <div className="alphira-analysis-editor-content-label"><label htmlFor="analysis-create-content">Your analysis <span>Required</span></label><span>{content.trim() ? content.trim().split(/\s+/).length : 0} words</span></div>
            <textarea id="analysis-create-content" rows={16} placeholder="Start with the market context, then share your observations and key levels…" value={content} onChange={(event) => setContent(event.target.value)} required aria-describedby="analysis-content-hint" />
            <p id="analysis-content-hint" className="alphira-analysis-editor-hint">Line breaks are preserved in the published analysis.</p>
          </section>
          <section className="alphira-analysis-editor-section" aria-labelledby="editor-visual"><div className="alphira-analysis-editor-section-title"><span>02</span><div><h2 id="editor-visual">Supporting visual</h2><p>Add a chart or image to support your analysis.</p></div></div><label htmlFor="analysis-create-image">Image URL <span>Optional</span></label><input id="analysis-create-image" type="text" placeholder="https://…" value={image} onChange={(event) => setImage(event.target.value)} aria-describedby="analysis-image-hint" /><p id="analysis-image-hint" className="alphira-analysis-editor-hint">Paste a direct link to your image or leave this field empty.</p></section>
        </div>

        <aside className="alphira-analysis-editor-sidebar" aria-label="Publishing settings">
          <div className="alphira-analysis-editor-publish"><span className="alphira-analysis-editor-eyebrow">ALPHIRA CAPITAL / RESEARCH</span><h2>Ready for your readers.</h2><p>Choose where your insight belongs and how it appears in the library.</p><div className="alphira-analysis-editor-market"><label htmlFor="analysis-create-market">Market</label><select id="analysis-create-market" value={market} onChange={(event) => setMarket(event.target.value)}>{["Forex", "Gold", "Crypto", "Stocks", "Indices"].map((option) => <option key={option} value={option}>{option}</option>)}</select></div><label className="alphira-analysis-editor-featured" htmlFor="analysis-create-featured"><input id="analysis-create-featured" type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} /><span><strong>Feature this analysis</strong><small>Add the Featured label to this insight.</small></span></label><button type="submit" disabled={loading}><Save size={16} aria-hidden="true" />{loading ? "Publishing…" : "Publish analysis"}<ArrowUpRight size={16} aria-hidden="true" /></button></div>
          {submitted && !loading && error && <div className="alphira-analysis-editor-feedback is-error" role="alert"><strong>Could not publish</strong><p>{error}</p></div>}
          {submitted && !loading && success && <div className="alphira-analysis-editor-feedback" role="status"><strong>Analysis published</strong><p>Your market insight has been saved.</p><Link to="/teacher/dashboard/analysis">View analysis library <ArrowUpRight size={14} aria-hidden="true" /></Link></div>}
          <div className="alphira-analysis-editor-note"><span>MAKE IT CLEAR</span><p>Use short paragraphs and explain the reasoning behind your observations. A useful insight gives your students context.</p></div>
        </aside>
      </form>
    </motion.section>
  );
};

export default CreateAnalysis;
