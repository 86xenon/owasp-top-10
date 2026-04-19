import React from 'react';
import './App.css';

interface TopNavProps {
  active: 'home' | 'sources';
  onNavigate: (page: 'home' | 'sources') => void;
}

const TopNav: React.FC<TopNavProps> = ({ active, onNavigate }) => {
  return (
    <nav className="topnav" aria-label="Main navigation">
      <ul className="topnav-list">
        <li>
          <button
            className={`topnav-link ${active === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
            aria-current={active === 'home' ? 'page' : undefined}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={`topnav-link ${active === 'sources' ? 'active' : ''}`}
            onClick={() => onNavigate('sources')}
            aria-current={active === 'sources' ? 'page' : undefined}
          >
            Sources
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;

