import React from 'react';
import ProgressBar from './ProgressBar.jsx';

const AGE_OPTIONS = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64', '65 and above', 'Prefer not to say'];
const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const OCCUPATION_OPTIONS = [
  'Student', 'Teacher/Lecturer', 'Engineer', 'Doctor/Healthcare Professional',
  'Office Worker', 'Business Owner/Entrepreneur', 'Retail/Service Worker',
  'Skilled Tradesperson', 'Homemaker', 'Retired', 'Unemployed', 'Other', 'Prefer not to say',
];

export default function Step5Demographics({ survey, onChange, onNext, onBack }) {
  const skip = () => {
    onChange({ ageRange: '', gender: '', location: '', occupation: '' });
    onNext();
  };

  return (
    <div className="survey-wrapper">
      <div className="card">
        <ProgressBar step={5} />

        <div className="step-header">
          <span className="step-icon">👤</span>
          <h2 className="step-title">About You</h2>
          <p className="step-subtitle">Optional — all fields can be skipped</p>
        </div>

        {/* Age */}
        <div className="field-group">
          <span className="field-label">Age Range</span>
          <div className="demo-grid">
            {AGE_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`demo-option ${survey.ageRange === opt ? 'selected' : ''}`}
                onClick={() => onChange({ ageRange: survey.ageRange === opt ? '' : opt })}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div className="field-group">
          <span className="field-label">Gender</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {GENDER_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`demo-option ${survey.gender === opt ? 'selected' : ''}`}
                onClick={() => onChange({ gender: survey.gender === opt ? '' : opt })}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="field-group">
          <span className="field-label">City / Region</span>
          <input
            type="text"
            className="text-input"
            placeholder="e.g., Colombo, Kandy, Galle"
            value={survey.location}
            onChange={(e) => onChange({ location: e.target.value })}
          />
        </div>

        {/* Occupation */}
        <div className="field-group">
          <span className="field-label">Occupation</span>
          <select
            className="select-input"
            value={survey.occupation}
            onChange={(e) => onChange({ occupation: e.target.value })}
          >
            <option value="">Select occupation...</option>
            {OCCUPATION_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <button
          className="btn-ghost"
          onClick={skip}
          style={{ width: '100%', padding: '12px', marginBottom: '8px', fontSize: '13px' }}
        >
          Skip This Section →
        </button>

        <div className="btn-row">
          <button className="btn-secondary" onClick={onBack}>← Back</button>
          <button className="btn-primary" onClick={onNext}>Continue →</button>
        </div>
      </div>
    </div>
  );
}
