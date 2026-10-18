import type { ReactNode } from 'react';
import { WordmarkLockup } from './brand/WordmarkLockup';

export function PrimaryButton({
  children,
  href = '#contact',
  className = '',
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ${className}`}
    >
      {children}
    </a>
  );
}

export function SecondaryButton({
  children,
  href = '#features',
  className = '',
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-bold text-stone-800 transition-colors duration-200 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ${className}`}
    >
      {children}
    </a>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="mb-6 inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-brand-800">
      {children}
    </span>
  );
}

export function Wordmark({ className = '', light = false }: { className?: string; light?: boolean }) {
  return <WordmarkLockup light={light} className={className} markSize="sm" compact />;
}
