import { useState, useEffect, useRef, useCallback } from 'react';
import risksData from "./risks.json";
import './App.css';

interface Risk {
  id: number;
  title: string;
  what: string;
  why: string;
  how: string;
  analogy: string;
  severity: string;
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // animation phase: 'idle' | 'exiting' | 'entering'
  const [animPhase, setAnimPhase] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const risks: Risk[] = risksData.owaspTop10;

  const OUT_MS = 300; // match CSS fadeOut duration
  const IN_MS = 600;  // match CSS fadeInUp duration

  const outTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // refs to hold latest values for keyboard handler and to avoid effect deps
  const currentIndexRef = useRef(currentIndex);
  const animPhaseRef = useRef(animPhase);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    animPhaseRef.current = animPhase;
  }, [currentIndex, animPhase]);

  const clearTimers = useCallback(() => {
    if (outTimeout.current) {
      clearTimeout(outTimeout.current);
      outTimeout.current = null;
    }
    if (inTimeout.current) {
      clearTimeout(inTimeout.current);
      inTimeout.current = null;
    }
  }, []);

  const navigateTo = useCallback((newIndex: number) => {
    // use latest animPhase via ref to avoid race conditions
    if (animPhaseRef.current !== 'idle') return; // block if already animating
    if (newIndex === currentIndexRef.current) return;

    // clear any stray timers before starting
    clearTimers();

    setAnimPhase('exiting');

    outTimeout.current = setTimeout(() => {
      setCurrentIndex(newIndex);
      setAnimPhase('entering');

      inTimeout.current = setTimeout(() => {
        setAnimPhase('idle');
      }, IN_MS);
    }, OUT_MS);
  }, [clearTimers]);

  const nextSlide = () => {
    navigateTo((currentIndexRef.current + 1) % risks.length);
  };

  const prevSlide = () => {
    navigateTo((currentIndexRef.current - 1 + risks.length) % risks.length);
  };

  const goToSlide = (index: number) => {
    navigateTo(index);
  };

  useEffect(() => {
    // keyboard navigation uses refs to avoid adding functions to deps
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        // only navigate when idle
        if (animPhaseRef.current === 'idle') {
          navigateTo((currentIndexRef.current + 1) % risks.length);
        }
      }
      if (e.key === 'ArrowLeft') {
        if (animPhaseRef.current === 'idle') {
          navigateTo((currentIndexRef.current - 1 + risks.length) % risks.length);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [navigateTo, risks.length]);

  useEffect(() => {
    // cleanup on unmount
    return () => clearTimers();
  }, [clearTimers]);

  const currentRisk = risks[currentIndex];

  const getSeverityClass = (severity: string) => {
    return severity.toLowerCase();
  };

  return (
      <div className="app">
        <header className="header">
          <div className="header-content">
            <h1 className="main-title">OWASP TOP 10</h1>
            <p className="subtitle">Web Application Security Risks</p>
          </div>
        </header>

        <main className="main-content">
          <div className="carousel-container">
            <button
                className="nav-button prev"
                onClick={prevSlide}
                aria-label="Previous risk"
                disabled={animPhase !== 'idle'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="risk-card">
              <div className={`risk-content ${animPhase === 'exiting' ? 'exiting' : ''} ${animPhase === 'entering' ? 'entering' : ''}`}>
                <div className="risk-header">
                  <span className="risk-number">#{currentRisk.id}</span>
                  <span className={`severity-badge ${getSeverityClass(currentRisk.severity)}`}>
                  {currentRisk.severity} Risk
                </span>
                </div>

                <h2 className="risk-title">{currentRisk.title}</h2>

                <div className="risk-sections">
                  <div className="risk-section">
                    <div className="section-header">
                      <h3 className="section-title">What is it?</h3>
                    </div>
                    <p className="section-content">{currentRisk.what}</p>
                  </div>

                  <div className="risk-section">
                    <div className="section-header">
                      <h3 className="section-title">Why does it matter?</h3>
                    </div>
                    <p className="section-content">{currentRisk.why}</p>
                  </div>

                  <div className="risk-section">
                    <div className="section-header">
                      <h3 className="section-title">How to prevent it?</h3>
                    </div>
                    <p className="section-content">{currentRisk.how}</p>
                  </div>

                  <div className="risk-section analogy">
                    <div className="section-header">
                      <h3 className="section-title">Think of it like...</h3>
                    </div>
                    <p className="section-content analogy-text">{currentRisk.analogy}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
                className="nav-button next"
                onClick={nextSlide}
                aria-label="Next risk"
                disabled={animPhase !== 'idle'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="progress-dots">
            {risks.map((risk, index) => (
                <button
                    key={risk.id}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to risk ${risk.id}: ${risk.title}`}
                    disabled={animPhase !== 'idle'}
                >
                  <span className="dot-number">{risk.id}</span>
                </button>
            ))}
          </div>
        </main>

        <footer className="footer">
          <p>OWASP Foundation. "OWASP Top 10:2021." OWASP Top 10, 2021,</p>
          <a style={{ color: 'lightgrey'}} href="https://owasp.org/Top10/2021/."  >https://owasp.org/Top10/2021/.</a>
        </footer>
      </div>
  );
}

export default App;

