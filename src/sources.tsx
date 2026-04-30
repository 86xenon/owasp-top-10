import React from 'react';
import risksData from './risks.json';
import './App.css';

interface SourcesProps {
  // No onClose - navigation handled by TopNav globally
}

interface RiskItem {
  id: number;
  title: string;
  imageCaption?: string;
  imageSource?: string;
}

const Sources: React.FC<SourcesProps> = () => {
  const risks: RiskItem[] = risksData.owaspTop10;

  return (
    <section className="sources-page" aria-labelledby="sources-title">
      <header className="sources-header">
        <h2 id="sources-title" className="sources-title">Sources Cited</h2>
        <p className="sources-subtitle">Each citation below refers to the image used for the corresponding risk card.</p>
      </header>

      <ol className="sources-list">
        {risks.map((r: RiskItem) => (
          <li key={r.id} className="source-item">
            <span className="source-index">{r.id}.</span>

            <div className="source-details">
              <div className="source-title">{r.title}</div>
              <div className="source-caption">{r.imageCaption ?? 'Source'}</div>
              <div className="source-link-wrap">
                {r.imageSource ? (
                    <a className="source-link" href={r.imageSource} target="_blank" rel="noreferrer">
                      {r.imageSource}
                    </a>
                ) : (
                  <span className="source-missing">No source provided</span>
                )}
              </div>
            </div>
          </li>
        ))}
          <li className="source-item">
              <span className="source-index">11</span>
              <div className="source-details">
                  <div className="source-title">Primary Source</div>
                    <div className="source-caption">OWASP Top 10:2021</div>
                    <div className="source-link-wrap">
                        <a
                            style={{ color: '#bbf5ff' }}
                            href="https://owasp.org/Top10/2021/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://owasp.org/Top10/2021/
                        </a>
                    </div>
              </div>
          </li>
      </ol>

    </section>
  );
};

export default Sources;
