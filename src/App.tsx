import { useState } from 'react';
import risksData from "./risks.json";
import './App.css';
import hackerImg from './assets/hacker.png';
import heroImg from './assets/hero.png';
import reactImg from './assets/react.svg';
import viteImg from './assets/vite.svg';
import cryptoImg from './assets/crypto-failure.png';
import decreaseImg from './assets/decrease.jpg';
import syringeImg from './assets/syringe.png';
import misconfigurationImg from './assets/misconfiguration.png';
import authenticationImg from './assets/authentication.jpg';
import forgeryImg from './assets/forgery.jpg';
import loggingImg from './assets/logging.png';
import integrityImg from './assets/integrity.png';
import outdatedImg from './assets/outdated.jpg';
import Sources from './sources';
import TopNav from './topnav';

interface Risk {
  id: number;
  title: string;
  what: string;
  why: string;
  how: string;
  analogy: string;
  severity: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageSource?: string;
}

function App() {
  const [page, setPage] = useState<'home' | 'sources'>('home');
  const risks: Risk[] = risksData.owaspTop10;

  // Map image file names (from risks.json) to imported assets
  const imageMap: Record<string, string> = {
    'hacker.png': hackerImg,
    'hero.png': heroImg,
    'react.svg': reactImg,
    'vite.svg': viteImg,
    'crypto-failure.png': cryptoImg,
    'decrease.jpg': decreaseImg,
    'syringe.png': syringeImg,
    'misconfiguration.png': misconfigurationImg,
    'authentication.jpg': authenticationImg,
    'forgery.jpg': forgeryImg,
    'logging.png': loggingImg,
    'integrity.png': integrityImg,
    'outdated.jpg': outdatedImg,
  };

  // const getSeverityClass = (severity: string) => {
  //   return severity.toLowerCase();
  // };

  return (
      <div className="app">
        <TopNav active={page} onNavigate={(p) => setPage(p)} />
        {page === 'sources' ? (
            <Sources />
        ) : (
            <>
              <header className="header">
                <h1 className="main-title">OWASP TOP 10</h1>
                <p className="subtitle">WEB APPLICATION SECURITY RISKS</p>
              </header>

              <main className="main-content">
                {risks.map((risk, index) => {
                  const imgSrc = risk.image ? (imageMap[risk.image] ?? hackerImg) : hackerImg;
                  const imgAlt = risk.imageAlt ?? 'Illustration';
                  const isEven = index % 2 === 0;

                  return (
                      <article
                          key={risk.id}
                          className={`risk-item ${isEven ? 'left-aligned' : 'right-aligned'}`}
                      >
                        <div className="risk-content-wrapper">
                          <div className="risk-text-section">
                            <h2 className="risk-title">
                              (#{risk.id}) {risk.title.toUpperCase()}
                            </h2>

                            <div className="risk-details">
                              <div className="detail-item">
                                <h3 className="detail-label">WHAT?</h3>
                                <p className="detail-text">{risk.what}</p>
                              </div>

                              <div className="detail-item">
                                <h3 className="detail-label">WHY?</h3>
                                <p className="detail-text">{risk.why}</p>
                              </div>

                              <div className="detail-item">
                                <h3 className="detail-label">HOW?</h3>
                                <p className="detail-text">{risk.how}</p>
                              </div>
                            </div>
                          </div>

                          <div className="risk-image-section">
                            <img src={imgSrc} alt={imgAlt} className="risk-image" />
                          </div>
                        </div>
                      </article>
                  );
                })}
              </main>

              <footer className="footer">
                <p>OWASP Foundation. "OWASP Top 10:2021." OWASP Top 10, 2021,</p>
                <a
                    style={{ color: '#bbf5ff' }}
                    href="https://owasp.org/Top10/2021/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  https://owasp.org/Top10/2021/
                </a>
              </footer>
            </>
        )}
      </div>
  );
}

export default App;