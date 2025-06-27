import React, { useCallback } from 'react';
import QAInterface from './components/QAInterface';
import './App.css';

function App() {
  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  }, []);

  return (
    <div className="App">
      <button className="theme-toggle" onClick={toggleTheme} title="Toggle dark/light mode">🌓</button>
      <h1>Multimodal QA Agent (Gemini)</h1>
      <QAInterface />
      </div>
  );
}

export default App;
