import React from 'react';

function ConfirmModal({ isOpen, title = "Confirm Action", message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop fade-in">
      <div className="modal-content glass-card pop-in">
        <h3 className="modal-title">⚠️ {title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
