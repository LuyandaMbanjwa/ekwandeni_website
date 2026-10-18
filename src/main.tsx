import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root not found. Serve this app with Vite (npm run dev), not by opening index.html as a file.');
}

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center bg-stone-50 p-8 text-center">
          <div>
            <p className="text-lg font-bold text-stone-900">Ekwandeni POS could not start</p>
            <p className="mt-2 text-sm text-stone-600">
              Run <code className="rounded bg-stone-200 px-1">npm run dev</code> and open{' '}
              <code className="rounded bg-stone-200 px-1">http://localhost:5173</code> — do not open{' '}
              <code className="rounded bg-stone-200 px-1">index.html</code> directly in the browser.
            </p>
          </div>
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
