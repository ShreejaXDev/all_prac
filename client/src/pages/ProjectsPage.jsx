import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

function ProjectsPage() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('ShreejaXDev'); // User's GitHub username

  const fetchRepos = () => {
    setLoading(true);
    setError(null);
    fetch(`https://api.github.com/users/${username}/repos?per_page=12&sort=updated`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: Failed to fetch repositories for '${username}'`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setRepos([]);
        }
      })
      .catch((err) => {
        setError(err.message || 'Error connecting to REST API');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepos();
  }, [username]);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="page-container glass-card fade-in" id="projects-api-page">
      <div className="section-header">
        <div>
          <h2>🌐 GitHub Repositories (REST API Integration)</h2>
          <p className="subtitle">Practical 3: Async <code>useEffect</code> fetching, loading spinner & error handling</p>
        </div>
        <div className="api-user-selector">
          <label htmlFor="user-select">GitHub User: </label>
          <select 
            id="user-select"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className="form-control-select"
          >
            <option value="ShreejaXDev">ShreejaXDev (My Profile)</option>
            <option value="octocat">octocat (GitHub Official)</option>
            <option value="facebook">facebook</option>
            <option value="google">google</option>
            <option value="invalid_user_test_xyz_123">Simulate Error State (404)</option>
          </select>
        </div>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="🔍 Search repositories by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control search-input"
        />
        <button className="btn-secondary" onClick={fetchRepos} title="Reload Data">
          🔄 Refresh API Data
        </button>
      </div>

      {/* Practical 3 Conditional Rendering States */}
      {loading ? (
        <Spinner message={`Fetching public repositories from GitHub API (@${username})...`} />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchRepos} />
      ) : filteredRepos.length === 0 ? (
        <div className="empty-state">
          <p>No repositories match your search criteria.</p>
        </div>
      ) : (
        <div className="repo-grid">
          {filteredRepos.map((repo) => (
            <div key={repo.id} className="repo-card">
              <div className="repo-header">
                <h3>{repo.name}</h3>
                <span className="star-badge">⭐ {repo.stargazers_count}</span>
              </div>
              <p className="repo-desc">
                {repo.description || "No description provided."}
              </p>
              <div className="repo-footer">
                <span className="lang-tag">{repo.language || "JavaScript"}</span>
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="repo-link"
                >
                  View Code ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
