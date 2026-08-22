import React from 'react';

function ErrorMessage({ message = "Failed to load API data.", onRetry }) {
  return (
    <div className="error-card pop-in">
      <div className="error-icon">⚠️</div>
      <div className="error-body">
        <h4>API Request Error</h4>
        <p>{message}</p>
      </div>
      {onRetry && (
        <button className="btn-retry" onClick={onRetry}>
          🔄 Retry Request
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
