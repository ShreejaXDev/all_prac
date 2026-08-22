import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="page-container glass-card text-center fade-in" style={{ padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--accent-secondary)', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The route you are trying to access does not exist in this single-page application.
      </p>
      <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        🏠 Return to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
