import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar({ theme, toggleTheme, user, onOpenAuth, onLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-container glass-card" id="navbar-section">
      <div className="nav-brand">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Portfolio<span className="logo-highlight">Hub</span></span>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
          <span>🏠</span> Home
        </Link>
        <Link to="/projects" className={`nav-item ${isActive('/projects') ? 'active' : ''}`}>
          <span>📁</span> Projects
        </Link>
        <Link to="/contact" className={`nav-item ${isActive('/contact') ? 'active' : ''}`}>
          <span>💬</span> Contact
        </Link>
      </div>

      <div className="nav-actions">
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme}
          title="Toggle Light/Dark Theme"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {user ? (
          <div className="user-badge-container">
            <span className="user-avatar">{user.email ? user.email[0].toUpperCase() : 'U'}</span>
            <span className="user-email">{user.email || 'Student'}</span>
            <button className="btn-logout" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <button className="btn-auth" onClick={onOpenAuth}>
            🔑 Login / Register
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
