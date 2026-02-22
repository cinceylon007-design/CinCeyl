import React from 'react';
import ProgressBar from './ProgressBar.jsx';

const BATCHES = [
  'Batch MG', 'Batch BN', 'Batch RS', 'Batch PU',
  'Batch KHG', 'Batch HK', 'Batch TD', 'Batch HL',
  'Batch HM', 'Batch AB', 'Batch BC', 'Batch CD',
];

export default function Step1Batch({ batchId, onChange, onNext }) {
  return (
    <div className="survey-wrapper">
      <div className="card">
        <ProgressBar step={1} />

        <div className="step-header">
          <span className="step-icon">📦</span>
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
