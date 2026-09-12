import "./AlphiraInfoPages.css";

export default function LegalLayout({ title, description, updated, sections }) {
  return (
    <main className="alphira-info-page">
      <div className="alphira-info-wrap">
        <header className="alphira-info-hero">
          <p className="alphira-info-kicker">Alphira / Legal</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <span className="alphira-info-date">Last updated · {updated}</span>
        </header>
        <div className="alphira-legal-grid">
          <nav className="alphira-legal-contents" aria-label={`${title} contents`}>
            <p className="alphira-info-kicker">On this page</p>
            {sections.map((section, i) => <a key={section.title} href={`#legal-section-${i + 1}`}><span>{String(i + 1).padStart(2, "0")}</span>{section.title.replace(/^\d+\.\s*/, "")}</a>)}
          </nav>
          <div className="alphira-legal-body">
            {sections.map((section, i) => (
              <section className="alphira-legal-section" id={`legal-section-${i + 1}`} key={section.title} aria-labelledby={`legal-heading-${i + 1}`}>
                <span className="alphira-legal-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div><h2 id={`legal-heading-${i + 1}`}>{section.title.replace(/^\d+\.\s*/, "")}</h2><p>{section.body}</p></div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
