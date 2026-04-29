import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import LoadingFallback from './components/LoadingFallback.jsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found. Check that index.html has <div id="root">.');
} else {
  // Create ONE root and reuse it throughout — never call createRoot() twice on the same element
  const root = ReactDOM.createRoot(rootElement);

  // Show loading fallback immediately while the app initialises
  root.render(<LoadingFallback />);

  const initializeApp = async () => {
    try {
      // If the DOM isn't ready yet, wait for it
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      // Swap the loading fallback for the real app on the SAME root
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );

    } catch (error) {
      console.error('Error initializing app:', error);

      // Render an inline error fallback using the same root
      root.render(
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#FAFAFA',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '400px' }}>
            <h2 style={{ color: '#2A9D8F', marginBottom: '1rem' }}>Smile Care Dental</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Unable to load the application. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#2A9D8F',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '2rem',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
  };

  initializeApp();
}