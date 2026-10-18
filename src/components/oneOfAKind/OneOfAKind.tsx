import { lazy, Suspense, useEffect, useState } from 'react';
import { oneOfAKind } from '../../content/site';
import { useIsMobileLayout } from '../../hooks/useMediaQuery';
import { ErrorBoundary } from '../ErrorBoundary';
import { FadeInUp } from '../FadeInUp';
import { PrimaryButton } from '../ui';

const PosScene = lazy(() => import('./PosScene').then((m) => ({ default: m.PosScene })));

function StaticFallback() {
  return (
    <div
      className="flex h-full min-h-[280px] w-full items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-brand-950/80 to-stone-950 p-8"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 240" className="h-full max-h-56 w-full max-w-sm text-brand-400" fill="none">
        <rect x="40" y="80" width="240" height="120" rx="12" stroke="currentColor" strokeWidth="2" />
        <rect x="60" y="40" width="200" height="70" rx="8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" />
        <rect x="75" y="110" width="50" height="50" rx="6" fill="#34d399" fillOpacity="0.6" />
        <rect x="135" y="110" width="50" height="50" rx="6" fill="#fbbf24" fillOpacity="0.6" />
        <rect x="195" y="110" width="50" height="50" rx="6" fill="#38bdf8" fillOpacity="0.6" />
        <ellipse cx="250" cy="60" rx="18" ry="45" stroke="#7ccfe8" strokeWidth="2" />
      </svg>
    </div>
  );
}

function useWebGLSupported() {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setOk(Boolean(gl));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

function SceneLoader() {
  return (
    <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-stone-400" role="status">
      Loading 3D preview…
    </div>
  );
}

export function OneOfAKind() {
  const isMobile = useIsMobileLayout();
  const webgl = useWebGLSupported();
  const [reducedMotion, setReducedMotion] = useState(false);
  const showScene = webgl && !isMobile;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <section
      id="one-of-a-kind"
      className="relative scroll-mt-20 overflow-hidden border-b border-white/10 bg-stone-950 text-white"
      aria-labelledby="one-of-a-kind-heading"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1400px] gap-8 px-4 py-12 sm:gap-12 sm:px-[max(1rem,4vw)] sm:py-[clamp(3rem,8vw,5rem)] lg:grid-cols-2 lg:items-center lg:gap-16">
        <FadeInUp eager>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-300 sm:mb-4 sm:tracking-[0.2em]">
            {oneOfAKind.eyebrow}
          </p>
          <h2 id="one-of-a-kind-heading" className="type-h2 text-white lg:text-[length:clamp(2rem,4vw,3.25rem)]">
            {oneOfAKind.titleLine1}
            <span className="text-accent-editorial"> {oneOfAKind.titleAccent}</span>
            {oneOfAKind.titleLine2 ? ` ${oneOfAKind.titleLine2}` : ''}
          </h2>
          <p className="type-lead mt-6 max-w-xl text-stone-300">{oneOfAKind.lead}</p>
          <ul className="mt-8 space-y-3">
            {oneOfAKind.points.map((point) => (
              <li key={point} className="type-body flex gap-3 text-stone-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 sm:mt-10">
            <PrimaryButton href="#contact" className="w-full sm:w-auto">{oneOfAKind.cta}</PrimaryButton>
          </div>
        </FadeInUp>

        <FadeInUp delay={120} className="relative min-h-[220px] sm:min-h-[min(40vh,360px)] lg:min-h-[480px]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-brand-500/15 via-transparent to-accent-editorial/10" />
          <div className="relative h-full min-h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-stone-950/60 backdrop-blur-sm">
            <ErrorBoundary fallback={<StaticFallback />}>
              {showScene ? (
                <Suspense fallback={<SceneLoader />}>
                  <PosScene reducedMotion={reducedMotion} />
                </Suspense>
              ) : (
                <StaticFallback />
              )}
            </ErrorBoundary>
          </div>
          <p className="mt-3 text-center text-xs text-stone-500">{oneOfAKind.sceneCaption}</p>
        </FadeInUp>
      </div>
    </section>
  );
}
