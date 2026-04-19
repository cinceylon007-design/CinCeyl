import React from 'react';
import ProgressBar from './ProgressBar.jsx';

const BATCHES = [
  'Type A', 'Type B', 'Type C', 'Type D', 'Type E',
];

export default function Step1Batch({ batchId, onChange, onNext }) {
  return (
    <div className="survey-wrapper">
      <div className="card">
        <ProgressBar step={1} />

        <div className="step-header">
          <img
            src="/BatchImage.png"
            alt="Batch"
            style={{
              width: '220px',
              height: '220px',
              objectFit: 'contain',
              marginBottom: '12px',
              borderRadius: '16px',
              border: '2px solid rgba(201, 169, 97, 0.45)',
              boxShadow: '0 4px 20px rgba(107, 52, 16, 0.18), 0 1px 0 rgba(255,255,255,0.8) inset',
              background: 'rgba(255,255,255,0.6)',
              padding: '8px',
            }}
          />
          <h2 className="step-title">Batch Identification</h2>
          <p className="step-subtitle">
            Select the batch code printed on your sample bottle
          </p>
        </div>

        <div className="section-label">Select Your Batch</div>

        <select
          className="select-input"
          value={batchId}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select Batch...</option>
          {BATCHES.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        {batchId && (
          <div className="confirm-badge" style={{ display: 'flex', marginTop: '12px' }}>
            <span>✓</span>
            <span>Selected: <strong>{batchId}</strong></span>
          </div>
        )}

        <div className="btn-row" style={{ marginTop: '28px', flexDirection: 'column', gap: '10px' }}>
          <button className="btn-primary" onClick={onNext}>
            Continue →
          </button>
          {!batchId && (
            <button className="btn-ghost" onClick={onNext}>
              Skip this step
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
