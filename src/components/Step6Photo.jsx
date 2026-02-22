import React, { useState, useRef, useCallback } from 'react';
import ProgressBar from './ProgressBar.jsx';

export default function Step6Photo({ onSubmit, onBack, submitting }) {
  const [photo, setPhoto] = useState(null); // { dataUrl, blob }
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const startCamera = useCallback(async () => {
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      setCameraActive(true);
      // Give React time to render the video element
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      setCameraError('Camera access denied. Please use the upload option instead.');
    }
  }, []);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setPhoto({ dataUrl });
    stopCamera();
  }, [stopCamera]);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image too large (max 5MB).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto({ dataUrl: ev.target.result });
    reader.readAsDataURL(file);
  }, []);

  const retake = () => {
    setPhoto(null);
    stopCamera();
  };

  const handleSubmit = () => {
    onSubmit(photo ? photo.dataUrl : null);
  };

  return (
    <div className="survey-wrapper">
      <div className="card">
        <ProgressBar step={6} />

        <div className="step-header">
          <span className="step-icon">📸</span>
          <h2 className="step-title">Share Your Experience</h2>
          <p className="step-subtitle">Optional — take a selfie or upload a photo of your sample</p>
        </div>

        {!photo && !cameraActive && (
          <div className="photo-upload-area">
            <span className="photo-upload-icon">📷</span>
            <p className="photo-upload-text">
              Take a selfie enjoying the drink, or upload a photo of your sample bottle!
              <br />
              <span style={{ fontSize: '11px', opacity: 0.7 }}>Max 5MB · JPG, PNG, WEBP</span>
            </p>
            <div className="photo-btn-row">
              <button className="photo-action-btn" onClick={startCamera}>
                📷 Take Selfie
              </button>
              <button
                className="photo-action-btn"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                📁 Upload Photo
              </button>
            </div>
            {cameraError && (
              <p style={{ color: '#C05050', fontSize: '12px', marginTop: '12px' }}>{cameraError}</p>
            )}
          </div>
        )}

        {/* Camera Live View */}
        {cameraActive && !photo && (
          <div className="camera-container">
            <video
              ref={videoRef}
              className="camera-video"
              autoPlay
              playsInline
              muted
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '12px' }}>
              <button className="photo-action-btn" onClick={capturePhoto}>
                📸 Capture
              </button>
              <button className="btn-ghost" onClick={stopCamera}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Photo Preview */}
        {photo && (
          <div className="photo-preview-container">
            <img
              src={photo.dataUrl}
              alt="Your capture"
              className="photo-preview-img"
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="photo-action-btn" onClick={retake}>
                ↻ Retake
              </button>
              <span style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: 'var(--sage)', fontWeight: 600 }}>
                ✓ Looks good!
              </span>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />

        {!photo && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button className="btn-ghost" onClick={handleSubmit} disabled={submitting}>
              Skip Photo & Submit
            </button>
          </div>
        )}

        <div className="btn-row" style={{ marginTop: '20px' }}>
          <button className="btn-secondary" onClick={onBack} disabled={submitting}>
            ← Back
          </button>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <div className="spinner" />
                Submitting...
              </>
            ) : (
              '✓ Submit Survey'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
