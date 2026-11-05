import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Printer, Mail, ArrowUpRight, Clock } from "lucide-react";
import useUltrawideCanvas from "../hooks/useUltrawideCanvas";
import "./AlphiraInfoPages.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (t) => t.replace(/^\d+\.\s*/, "");

export default function LegalLayout({ title, description, updated, sections }) {
  useUltrawideCanvas();
  const [active, setActive] = useState(0);
  const words = sections.reduce((n, s) => n + `${s.title} ${s.body}`.split(/\s+/).length, 0);
  const minutes = Math.max(1, Math.round(words / 200));

  // Highlight the section currently in view in the contents list.
  useEffect(() => {
    const els = sections.map((_, i) => document.getElementById(`legal-section-${i + 1}`)).filter(Boolean);
    if (!els.length || !("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(els.indexOf(visible[0].target));
    }, { rootMargin: "-25% 0px -60% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <main className="aip aip-legal">
      <header className="aip-hero">
        <div className="aip-shell aip-hero-grid">
          <div>
            <p className="aip-kicker"><FileText size={15} aria-hidden="true" />Alphira · Legal</p>
            <h1><span>{title}</span></h1>
            <p className="aip-lede">{description}</p>
          </div>
          <dl className="aip-meta">
            <div><dt>Last updated</dt><dd>{updated}</dd></div>
            <div><dt>Sections</dt><dd>{sections.length}</dd></div>
            <div><dt>Reading time</dt><dd><Clock size={14} aria-hidden="true" />{minutes} min</dd></div>
          </dl>
        </div>
      </header>

      <div className="aip-shell aip-legal-grid">
        <nav className="aip-toc" aria-label={`${title} contents`}>
          <p className="aip-toc-title">On this page</p>
          <ol>
            {sections.map((section, i) => (
              <li key={section.title}>
                <a href={`#legal-section-${i + 1}`} className={i === active ? "is-active" : ""} aria-current={i === active ? "location" : undefined}>
                  <span>{String(i + 1).padStart(2, "0")}</span>{clean(section.title)}
                </a>
              </li>
            ))}
          </ol>
          <button type="button" className="aip-print" onClick={() => window.print()}><Printer size={15} aria-hidden="true" />Print this page</button>
        </nav>

        <div className="aip-legal-body">
          {sections.map((section, i) => {
            const body = section.body.trim();
            return (
              <section className="aip-legal-section" id={`legal-section-${i + 1}`} key={section.title} aria-labelledby={`legal-heading-${i + 1}`}>
                <span className="aip-legal-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 id={`legal-heading-${i + 1}`}>{clean(section.title)}</h2>
                  {EMAIL_RE.test(body)
                    ? <p><a className="aip-mail" href={`mailto:${body}`}><Mail size={16} aria-hidden="true" />{body}</a></p>
                    : <p>{body}</p>}
                </div>
              </section>
            );
          })}

          <aside className="aip-legal-help">
            <div>
              <strong>Questions about this page?</strong>
              <p>Our team is happy to explain anything here before you enroll.</p>
            </div>
            <Link to="/support" className="aip-btn aip-btn-light">Contact support <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
