import React from 'react';

export default function ThankYou({ participantNumber, apiResponse, onHome, onRetake }) {
  const isSuccess = !apiResponse || apiResponse.status === 'success';

  // ── ERROR PAGE ──────────────────────────────────────────────────────────────
  if (!isSuccess) {
    return (
      <div className="survey-wrapper" style={{ paddingTop: '48px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '4rem', display: 'block', marginBottom: '12px' }}>❌</span>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.4rem',
            fontWeight: 600,
            color: '#9B2C2C',
            marginBottom: '12px',
            lineHeight: 1.2,
          }}>
            Something Went Wrong
          </h1>

          <p style={{ fontSize: '14px', color: 'var(--text-medium)', marginBottom: '20px', lineHeight: '1.65' }}>
            We were unable to save your survey response. Please try again or contact support.
          </p>

          {apiResponse?.message && (
            <div style={{
              background: 'rgba(155,44,44,0.07)',
              border: '1px solid rgba(155,44,44,0.25)',
              borderRadius: '14px',
              padding: '13px 16px',
              fontSize: '13px',
              color: '#9B2C2C',
              marginBottom: '28px',
              lineHeight: '1.5',
            }}>
              {apiResponse.message}
            </div>
          )}

          <div style={{ maxWidth: '300px', margin: '0 auto' }}>
            <button className="btn-primary" onClick={onHome}>
              ← Back to Home
            </button>
          </div>

          <p style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '22px', opacity: 0.5 }}>
            CinCeyl × Core-3H Partnership
          </p>
        </div>
      </div>
    );
  }

  // ── SUCCESS PAGE ────────────────────────────────────────────────────────────
  return (
    <div className="survey-wrapper" style={{ paddingTop: '48px' }}>
      <div className="card" style={{ textAlign: 'center' }}>
        <span className="thankyou-icon">🎉</span>

        <h1 className="thankyou-title">Thank You!</h1>

        <p style={{ fontSize: '14px', color: 'var(--text-medium)', marginBottom: '16px', lineHeight: '1.6' }}>
          Your valuable feedback has been recorded successfully.
        </p>

        {participantNumber != null && (
          <div className="participant-badge">
            🏅 You are participant #{participantNumber}
          </div>
        )}

        {apiResponse?.message && (
          <div className="api-response-box success">
            {apiResponse.message}
          </div>
        )}

        <p style={{ fontSize: '13px', color: 'var(--text-light)', marginBottom: '28px', lineHeight: '1.6' }}>
          Your insights will help shape the future of CinCeyl Pure Ceylon Cinnamon Drink.
          We truly appreciate your time and honest feedback.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px', margin: '0 auto' }}>
          <button className="btn-primary" onClick={onHome}>
            ← Back to Home
          </button>
          <button className="btn-secondary" onClick={onRetake}>
            Take Another Survey
          </button>
        </div>

        <p style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '24px', opacity: 0.6 }}>
          CinCeyl × Core-3H Partnership
        </p>
      </div>
    </div>
  );
}
