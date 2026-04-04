import React, { useState, useCallback } from 'react';
import HomePage from './components/HomePage.jsx';
import Step1Batch from './components/Step1Batch.jsx';
import Step2Intro from './components/Step2Intro.jsx';
import Step3Sensory from './components/Step3Sensory.jsx';
import Step4Preferences from './components/Step4Preferences.jsx';
import Step5Demographics from './components/Step5Demographics.jsx';
import Step6Photo from './components/Step6Photo.jsx';
import ThankYou from './components/ThankYou.jsx';

const APPSCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyhB94zRek5VREt8gpfP4FQzSt1npzd4CUn9UtINxdgm_3z08h4Ec202Qhv7C9vrMRkQQ/exec';

const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem('survey_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('survey_session_id', sessionId);
  }
  return sessionId;
};

const initialSurvey = {
  honeypot: '',
  batchId: '',
  tasteRating: 0,
  tasteCharacteristics: [],
  tasteOther: '',
  aromaRating: 0,
  aromaCharacteristics: [],
  aromaOther: '',
  colorValue: 50,
  colorHex: '#8B4513',
  healthBenefits: [],
  healthOther: '',
  bottleVolume: '150ml',
  priceExpectation: 'Rs. 250',
  nameFirst: '',
  nameSecond: '',
  nameCustomSuggestion: '',
  ageRange: '',
  gender: '',
  location: '',
  occupation: '',
  photoBase64: null,
  deviceType: navigator.userAgent,
  sessionId: getOrCreateSessionId(),
};

export default function App() {
  const [step, setStep] = useState('home'); // home | 1-6 | thankyou
  const [survey, setSurvey] = useState(initialSurvey);
  const [submitting, setSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const update = useCallback((fields) => {
    setSurvey((prev) => ({ ...prev, ...fields }));
  }, []);

  const next = useCallback((nextStep) => {
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const submitSurvey = useCallback(async (photoBase64) => {
    setSubmitting(true);
    const payload = {
      ...survey,
      photoBase64: photoBase64 || null,
    };

    try {
      const response = await fetch(APPSCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      });
      const text = await response.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = { status: 'success', message: text };
      }
      setApiResponse(parsed);
    } catch (err) {
      setApiResponse({ status: 'error', message: err.message });
    } finally {
      setSubmitting(false);
      next('thankyou');
    }
  }, [survey, next]);

  const restart = () => {
    setSurvey({
      ...initialSurvey,
      sessionId: getOrCreateSessionId(),
    });
    setApiResponse(null);
    setStep('home');
  };

  // Extract participant number returned by AppScript
  const participantNumber = apiResponse?.participant ?? null;

  return (
    <div className="app-container">
      {step === 'home' && <HomePage onStart={() => next(1)} />}
      {step === 1 && (
        <Step1Batch
          batchId={survey.batchId}
          onChange={(batchId) => update({ batchId })}
          onNext={() => next(2)}
        />
      )}
      {step === 2 && (
        <Step2Intro onNext={() => next(3)} onBack={() => next(1)} />
      )}
      {step === 3 && (
        <Step3Sensory
          survey={survey}
          onChange={update}
          onNext={() => next(4)}
          onBack={() => next(2)}
        />
      )}
      {step === 4 && (
        <Step4Preferences
          survey={survey}
          onChange={update}
          onNext={() => next(5)}
          onBack={() => next(3)}
        />
      )}
      {step === 5 && (
        <Step5Demographics
          survey={survey}
          onChange={update}
          onNext={() => next(6)}
          onBack={() => next(4)}
        />
      )}
      {step === 6 && (
        <Step6Photo
          onSubmit={submitSurvey}
          onBack={() => next(5)}
          submitting={submitting}
        />
      )}
      {step === 'thankyou' && (
        <ThankYou
          participantNumber={participantNumber}
          apiResponse={apiResponse}
          onHome={restart}
          onRetake={restart}
        />
      )}
    </div>
  );
}
