# CinCeyl Sensory Survey — Vite + React

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Install & Dev Server
```bash
npm install
npm run dev
```
Opens at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Output goes to `/dist` — deploy that folder.

### Preview Production Build Locally
```bash
npm run preview
```

## 📦 Deploy

### Netlify
- Connect your repo, set build command to `npm run build`, publish directory to `dist`.
- Or drag & drop the `/dist` folder at **netlify.com/drop**.

### Vercel
```bash
npx vercel --prod
```

### Any Static Host
Upload the contents of `/dist` after running `npm run build`.

## 📁 Project Structure
```
cinceyl-survey-vite/
├── index.html               ← Vite entry (root level)
├── vite.config.js
├── package.json
├── public/
│   └── _redirects           ← Netlify SPA routing
└── src/
    ├── main.jsx             ← App mount point
    ├── App.jsx              ← Routing + global state + POST logic
    ├── index.css            ← Full design system
    └── components/
        ├── ProgressBar.jsx
        ├── StarRating.jsx
        ├── MultiSelect.jsx
        ├── HomePage.jsx
        ├── Step1Batch.jsx
        ├── Step2Intro.jsx
        ├── Step3Sensory.jsx
        ├── Step4Preferences.jsx
        ├── Step5Demographics.jsx
        ├── Step6Photo.jsx
        └── ThankYou.jsx
```

## 🌐 API
Submits a POST request to the Google Apps Script endpoint configured in `src/App.jsx`.

## 📱 Adding Product Logo
Place `IMG_4685.jpeg` in the `public/` folder and update `HomePage.jsx` and `Step2Intro.jsx`:
```jsx
<img src="/IMG_4685.jpeg" alt="CinCeyl" className="home-logo" />
```
