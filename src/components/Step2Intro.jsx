import React from 'react';
import ProgressBar from './ProgressBar.jsx';

const FEATURES = [
  '100% Pure Ceylon Cinnamon',
  'Zero Artificial Ingredients',
  'Premium 60ml Glass Bottle',
  'Pasteurized Contents',
  'Research-Driven Extraction Process (Patent Pending)',
];

export default function Step2Intro({ onNext, onBack }) {
  return (
    <div className="survey-wrapper">
      <div className="card">
        <ProgressBar step={2} />

        <div className="step-header">
          <span className="step-icon">🌿</span>
          <h2 className="step-title">Pure Ceylon Cinnamon Infusion</h2>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B4513, #C9A961)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '2.5rem',
              boxShadow: '0 8px 24px rgba(107,52,16,0.25)',
            }}
          >
            🌿
          </div>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--text-medium)', lineHeight: '1.7', marginBottom: '20px', textAlign: 'center' }}>
          You are about to taste and evaluate our exclusive Pure Ceylon Cinnamon Drink — 
          a premium beverage crafted from the world's finest cinnamon, sourced directly 
          from the heartlands of Sri Lanka.
        </p>

        <ul className="feature-list">
          {FEATURES.map((f) => (
            <li key={f} className="feature-item">
              <span className="feature-check">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="quote-box">
          "Your honest feedback will help us perfect this product for the market."
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span className="time-badge">⏱️ Takes approximately 3–5 minutes</span>
        </div>

        <div className="btn-row">
          <button className="btn-secondary" onClick={onBack}>← Back</button>
          <button className="btn-primary" onClick={onNext}>Start Tasting →</button>
        </div>
      </div>
    </div>
  );
}
