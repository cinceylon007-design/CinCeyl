import React from 'react';

export default function ProgressBar({ step, total = 6 }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="progress-container">
      <div className="progress-label">
        <span className="progress-step">Step {step} of {total}</span>
        <span className="progress-pct">{pct}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
