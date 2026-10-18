import { useId } from 'react';

const sizes = { sm: 32, md: 40, lg: 56, xl: 88, hero: 112 } as const;

export type LogoMarkSize = keyof typeof sizes;

type LogoMarkProps = {
  size?: LogoMarkSize | number;
  variant?: 'gradient' | 'flat' | 'mono';
  className?: string;
  title?: string;
  decorative?: boolean;
};

export function LogoMark({
  size = 'md',
  variant = 'gradient',
  className = '',
  title = 'Ekwandeni POS',
  decorative = false,
}: LogoMarkProps) {
  const uid = useId().replace(/:/g, '');
  const gradId = `ek-brand-grad-${uid}`;
  const shineId = `ek-brand-shine-${uid}`;
  const px = typeof size === 'number' ? size : sizes[size];

  const fill =
    variant === 'flat'
      ? 'currentColor'
      : variant === 'mono'
        ? 'white'
        : `url(#${gradId})`;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
    >
      {variant === 'gradient' && (
        <defs>
          <linearGradient id={gradId} x1="18" y1="12" x2="82" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5eb8f0" />
            <stop offset="45%" stopColor="#2a93d6" />
            <stop offset="100%" stopColor="#145a9e" />
          </linearGradient>
          <linearGradient id={shineId} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      )}

      {/* e stem */}
      <rect x="16" y="22" width="15" height="58" rx="7.5" fill={fill} />
      {/* top bar */}
      <rect x="31" y="28" width="30" height="13" rx="6.5" fill={fill} />
      {/* bottom bar */}
      <rect x="31" y="53" width="48" height="13" rx="6.5" fill={fill} />
      {/* growth arrow */}
      <path
        d="M48 8 L48 20 M48 8 L42 14 M48 8 L54 14"
        stroke={variant === 'gradient' ? '#1a6fb5' : 'currentColor'}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* counter block — echoes the 3D mark */}
      <rect x="70" y="16" width="14" height="14" rx="4" fill={fill} />

      {variant === 'gradient' && (
        <rect
          x="16"
          y="22"
          width="68"
          height="58"
          rx="12"
          fill={`url(#${shineId})`}
          style={{ mixBlendMode: 'soft-light' }}
          opacity={0.5}
        />
      )}
    </svg>
  );
}
