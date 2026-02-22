import React from 'react';

export default function MultiSelect({ options, selected, onChange, label, otherValue, onOtherChange }) {
  const toggle = (opt) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((o) => o !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {label && <div className="section-label">{label}</div>}
      <div className="options-grid">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`option-btn ${selected.includes(opt) ? 'selected' : ''}`}
            onClick={() => toggle(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      {onOtherChange !== undefined && (
        <div style={{ marginTop: '8px' }}>
          <input
            type="text"
            className="text-input"
            placeholder="Other (describe)..."
            value={otherValue || ''}
            onChange={(e) => onOtherChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
