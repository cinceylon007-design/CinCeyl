import React from 'react';

export default function HomePage({ onStart }) {
  return (
    <div className="survey-wrapper" style={{ paddingTop: '32px' }}>
      <div className="card" style={{ textAlign: 'center' }}>
        {/* Honeypot - hidden from users */}
        <div className="hp-field" aria-hidden="true">
          <input type="text" name="website" tabIndex="-1" autoComplete="off" />
        </div>

        <div className="home-logo-container">
          <div className="home-logo-placeholder">🌿</div>
        </div>

        <div className="home-badge">🌿 Premium Interactive Survey</div>

        <h1 className="home-title">Ceylon Cinnamon<br />Drink Survey</h1>
        <p className="home-subtitle">
          Help us perfect our Pure Ceylon Cinnamon Drink. Your sensory feedback 
          shapes the future of this premium product.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px', margin: '0 auto' }}>
          <button className="btn-primary" onClick={onStart}>
            ✨ Begin Survey
          </button>
        </div>

        <div style={{ marginTop: '24px' }}>
          <p style={{ fontSize: '11px', color: 'var(--text-light)', lineHeight: '1.6' }}>
            ⏱️ Takes approximately 3–5 minutes &nbsp;·&nbsp; Your feedback is anonymous
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '12px', opacity: 0.5 }}>
        <p style={{ fontSize: '11px', color: 'var(--text-light)' }}>
          CinCeyl × Core-3H Partnership · Premium Sensory Survey v7.0
        </p>
      </div>
    </div>
  );
}
