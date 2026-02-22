import React, { useState } from 'react';

export default function StarRating({ value, onChange, label }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating-container">
      {label && <div className="section-label">{label}</div>}
      <div className="stars-row">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <button
            key={n}
            type="button"
            className={`star-btn ${n <= (hover || value) ? 'active' : ''}`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(n)}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
          >
            ⭐
          </button>
        ))}
      </div>
      <div className="star-display">
        {value > 0 ? `${value} / 6` : 'Tap to rate'}
      </div>
    </div>
  );
}
