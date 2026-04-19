import React from 'react';
import ProgressBar from './ProgressBar.jsx';
import MultiSelect from './MultiSelect.jsx';

const HEALTH_OPTIONS = [
  'Blood Sugar Regulation', 'Anti-inflammatory Properties', 'Digestive Health',
  'Antioxidant Benefits', 'Weight Management', 'Heart Health',
  'Immune Support', 'Energy Boost', 'Natural/Organic Wellness',
];


function BottleSVG({ scale }) {
  const h = 80 + scale * 60;
  const w = 36 + scale * 20;
  return (
    <svg
      width={Math.round(w)}
      height={Math.round(h + 30)}
      viewBox={`0 0 ${Math.round(w)} ${Math.round(h + 30)}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', display: 'block' }}
    >
      {/* Cap */}
      <rect x={Math.round(w / 2 - 8)} y={2} width={16} height={12} rx={4}
        fill="#8B4513" />
      {/* Neck */}
      <rect x={Math.round(w / 2 - 7)} y={12} width={14} height={14} rx={3}
        fill="#D2691E" />
      {/* Body */}
      <rect x={4} y={24} width={Math.round(w - 8)} height={Math.round(h)} rx={8}
        fill="url(#bottleGrad)" stroke="#C9A961" strokeWidth="1.5" />
      {/* Liquid */}
      <rect x={6} y={Math.round(24 + h * 0.3)} width={Math.round(w - 12)}
        height={Math.round(h * 0.65)} rx={6} fill="rgba(107,52,16,0.35)" />
      {/* Shine */}
      <rect x={Math.round(w * 0.15)} y={28} width={5} height={Math.round(h * 0.5)}
        rx={3} fill="rgba(255,255,255,0.25)" />
      <defs>
        <linearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FAF7F0" />
          <stop offset="50%" stopColor="#F0E8D8" />
          <stop offset="100%" stopColor="#E8C5A0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function getPriceCategory(price) {
  const n = parseInt(price.replace(/\D/g, ''), 10);
  if (n <= 300) return { label: 'Budget-Friendly', cls: 'budget' };
  if (n <= 450) return { label: 'Mid-Range', cls: 'mid' };
  return { label: 'Premium', cls: 'premium' };
}

export default function Step4Preferences({ survey, onChange, onNext, onBack }) {
  const volumeSteps = [60, 100, 150, 200, 250, 300, 350, 400];
  const priceSteps = [200, 250, 300, 350, 400, 450, 500, 550, 600];

  const volumeIdx = volumeSteps.indexOf(parseInt(survey.bottleVolume, 10));
  const priceIdx = priceSteps.indexOf(parseInt(survey.priceExpectation.replace(/\D/g, ''), 10));
  const bottleScale = (volumeIdx < 0 ? 1 : volumeIdx) / (volumeSteps.length - 1);

  const priceCategory = getPriceCategory(survey.priceExpectation);

  return (
    <div className="survey-wrapper">
      <div className="card">
        <ProgressBar step={4} />

        <div className="step-header">
          <span className="step-icon">💡</span>
          <h2 className="step-title">Preferences</h2>
          <p className="step-subtitle">Tell us about your ideal cinnamon drink experience</p>
        </div>

        {/* Health Benefits */}
        <MultiSelect
          label="💚 Health Benefits You Value"
          options={HEALTH_OPTIONS}
          selected={survey.healthBenefits}
          onChange={(v) => onChange({ healthBenefits: v })}
          otherValue={survey.healthOther}
          onOtherChange={(v) => onChange({ healthOther: v })}
        />

        <hr className="divider" />

        {/* Bottle Volume */}
        <div className="section-label">🍶 Ideal Bottle Volume</div>
        <div className="bottle-container">
          <BottleSVG scale={bottleScale} />
          <div className="bottle-volume-display">
            {survey.bottleVolume}
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={volumeSteps.length - 1}
          value={volumeIdx < 0 ? 0 : volumeIdx}
          onChange={(e) => onChange({ bottleVolume: `${volumeSteps[Number(e.target.value)]}ml` })}
          style={{ background: 'linear-gradient(90deg, var(--cream-dark), var(--cinnamon-pale))' }}
        />
        <div className="slider-labels">
          <span>60ml</span>
          <span>400ml</span>
        </div>

        <hr className="divider" />

        {/* Price */}
        <div className="section-label">💰 Price Expectation</div>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <span className="slider-value">{survey.priceExpectation}</span>
          <div style={{ marginTop: '6px' }}>
            <span className={`price-badge ${priceCategory.cls}`}>{priceCategory.label}</span>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={priceSteps.length - 1}
          value={priceIdx < 0 ? 0 : priceIdx}
          onChange={(e) => onChange({ priceExpectation: `Rs. ${priceSteps[Number(e.target.value)]}` })}
          style={{ background: 'linear-gradient(90deg, var(--cream-dark), var(--gold))' }}
        />
        <div className="slider-labels">
          <span>Rs. 200</span>
          <span>Rs. 600</span>
        </div>

        <div className="btn-row" style={{ marginTop: '28px' }}>
          <button className="btn-secondary" onClick={onBack}>← Back</button>
          <button className="btn-primary" onClick={onNext}>Continue →</button>
        </div>
      </div>
    </div>
  );
}
