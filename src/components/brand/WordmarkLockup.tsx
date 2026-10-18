import type { LogoMarkSize } from './LogoMark';
import { LogoMark } from './LogoMark';

type WordmarkLockupProps = {
  light?: boolean;
  className?: string;
  markSize?: LogoMarkSize | number;
  layout?: 'horizontal' | 'stacked';
  compact?: boolean;
};

export function WordmarkLockup({
  light = false,
  className = '',
  markSize = 'md',
  layout = 'horizontal',
  compact = false,
}: WordmarkLockupProps) {
  const isStacked = layout === 'stacked';

  return (
    <span
      className={`inline-flex max-w-full min-w-0 ${isStacked ? 'flex-col items-center gap-2 text-center sm:gap-3' : 'items-center gap-2 sm:gap-3'} ${className}`}
    >
      <span
        className={`relative shrink-0 rounded-xl p-1 sm:rounded-2xl sm:p-1.5 ${
          light
            ? 'bg-gradient-to-br from-brand-400/25 to-brand-700/10 ring-1 ring-white/15 shadow-[0_8px_32px_rgba(42,147,214,0.35)]'
            : 'bg-gradient-to-br from-brand-50 to-brand-100/80 ring-1 ring-brand-200/80 shadow-md shadow-brand-500/10'
        }`}
      >
        <LogoMark size={markSize} variant="gradient" />
      </span>

      <span className={isStacked ? 'flex flex-col items-center' : 'flex flex-col leading-none'}>
        <span
          className={`font-display text-lg font-bold tracking-tight sm:text-xl ${
            light ? 'text-white' : 'text-stone-900'
          }`}
        >
          Ekwandeni
        </span>
        <span
          className={`mt-0.5 text-[0.6rem] font-bold uppercase tracking-[0.22em] sm:text-[0.65rem] sm:tracking-[0.28em] ${
            light ? 'text-brand-300' : 'text-brand-600'
          }`}
        >
          {compact ? 'POS' : 'Point of Sale'}
        </span>
      </span>
    </span>
  );
}
