import React from 'react';

function Spinner({ message = "Loading data from REST API..." }) {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <p className="spinner-text">{message}</p>
    </div>
  );
}

export default Spinner;
