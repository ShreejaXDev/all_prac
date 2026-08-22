import React, { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false); // second useState for UI toggle

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(false);
  };

  return (
    <div className="page-container glass-card fade-in" id="contact-page">
      <div className="section-header">
        <h2>💬 Contact & Feedback</h2>
        <button 
          className="btn-info-toggle"
          onClick={() => setShowTooltip(!showTooltip)}
          title="Toggle Help Tooltip"
        >
          {showTooltip ? '❌ Hide Help' : 'ℹ️ Need Help?'}
        </button>
      </div>

      {/* UI Visibility Toggle Element (Practical 2 useState requirement) */}
      {showTooltip && (
        <div className="info-tooltip-banner slide-down">
          <p>💡 <strong>Practical 2 Tip:</strong> This form uses React <code>useState</code> hooks to manage input values and live character count in real time without refreshing the page!</p>
        </div>
      )}

      {submitted ? (
        <div className="success-banner pop-in">
          <h3>🎉 Thank You, {formData.name}!</h3>
          <p>Your message has been captured in local React state.</p>
          <div className="submitted-details">
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Message:</strong> "{formData.message}"</p>
          </div>
          <button className="btn-primary" onClick={resetForm} style={{ marginTop: '1rem' }}>
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Shreeja Upadhyay"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. shreeja@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <div className="label-with-counter">
              <label htmlFor="message">Message</label>
              <span className={`char-counter ${formData.message.length > 200 ? 'warning' : ''}`}>
                {formData.message.length} / 250 chars
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              rows="4"
              maxLength={250}
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleChange}
              required
              className="form-control"
            ></textarea>
          </div>

          <button type="submit" className="btn-primary btn-submit">
            <span>✉️</span> Submit Message
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactPage;
