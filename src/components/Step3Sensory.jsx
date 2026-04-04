import React, { useState, useCallback } from 'react';
import ProgressBar from './ProgressBar.jsx';
import StarRating from './StarRating.jsx';
import MultiSelect from './MultiSelect.jsx';

const TASTE_OPTIONS = ['Sweet', 'Spicy/Warm', 'Slightly Bitter', 'Smooth', 'Refreshing', 'Balanced'];
const AROMA_OPTIONS = ['Warm/Spicy', 'Sweet', 'Woody', 'Fresh', 'Earthy', 'Pleasant', 'Strong', 'Subtle'];

function lerp(a, b, t) {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return '#' + ((1 << 24) | (rr << 16) | (rg << 8) | rb).toString(16).slice(1);
}

function valueToHex(v) {
  if (v <= 50) {
    return lerp('#F78B24', '#FF4502', v / 50);
  } else {
    return lerp('#FF4502', '#713C2A', (v - 50) / 50);
  }
}

export default function Step3Sensory({ survey, onChange, onNext, onBack }) {
  const [error, setError] = useState('');

  const handleColor = useCallback((e) => {
    const v = Number(e.target.value);
    const hex = valueToHex(v);
    onChange({ colorValue: v, colorHex: hex });
  }, [onChange]);

  const handleNext = () => {
    if (survey.tasteRating === 0) { setError('Please rate the taste before continuing.'); return; }
    if (survey.aromaRating === 0) { setError('Please rate the aroma before continuing.'); return; }
    setError('');
    onNext();
  };

  const colorHex = survey.colorHex || valueToHex(survey.colorValue);

  const sliderBg = `linear-gradient(90deg, #F78B24 0%, #FF4502 50%, #713C2A 100%)`;

  return (
    <div className="survey-wrapper">
      <div className="card">
        <ProgressBar step={3} />

        <div className="step-header">
          <span className="step-icon">👅</span>
          <h2 className="step-title">Sensory Feedback</h2>
          <p className="step-subtitle">Share your taste, aroma, and color experience</p>
        </div>

        {/* TASTE */}
        <StarRating
          label="🍵 Taste Rating"
          value={survey.tasteRating}
          onChange={(v) => onChange({ tasteRating: v })}
        />

        <MultiSelect
          label="Taste Characteristics"
          options={TASTE_OPTIONS}
          selected={survey.tasteCharacteristics}
          onChange={(v) => onChange({ tasteCharacteristics: v })}
          otherValue={survey.tasteOther}
          onOtherChange={(v) => onChange({ tasteOther: v })}
        />

        <hr className="divider" />

        {/* AROMA */}
        <StarRating
          label="🌸 Aroma Rating"
          value={survey.aromaRating}
          onChange={(v) => onChange({ aromaRating: v })}
        />

        <MultiSelect
          label="Aroma Characteristics"
          options={AROMA_OPTIONS}
          selected={survey.aromaCharacteristics}
          onChange={(v) => onChange({ aromaCharacteristics: v })}
          otherValue={survey.aromaOther}
          onOtherChange={(v) => onChange({ aromaOther: v })}
        />

        <hr className="divider" />

        {/* COLOR */}
        <div className="section-label">🎨 Color Perception</div>

        <div className="color-preview-container">
          <div
            className="color-circle"
            style={{ backgroundColor: colorHex }}
          />
          <span className="color-hex-label">{colorHex.toUpperCase()}</span>
        </div>

        <div className="slider-container">
          <input
            type="range"
            min={0}
            max={100}
            value={survey.colorValue}
            onChange={handleColor}
            className="color-slider"
            style={{
              background: sliderBg,
            }}
          />
          <div className="slider-labels">
            <span>Lighter</span>
            <span>Darker</span>
          </div>
        </div>

        {error && (
          <p style={{ color: '#C05050', fontSize: '12px', marginTop: '8px', textAlign: 'center' }}>{error}</p>
        )}

        <div className="btn-row" style={{ marginTop: '28px' }}>
          <button className="btn-secondary" onClick={onBack}>← Back</button>
          <button className="btn-primary" onClick={handleNext}>Continue →</button>
        </div>
      </div>
    </div>
  );
}
