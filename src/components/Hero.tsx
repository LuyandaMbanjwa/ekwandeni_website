import { brand } from '../content/brand';
import { hero } from '../content/site';
import { useIsMobileLayout } from '../hooks/useMediaQuery';
import { LogoMark } from './brand/LogoMark';
import { WordmarkLockup } from './brand/WordmarkLockup';
import { FadeInUp } from './FadeInUp';
import { PrimaryButton, SecondaryButton } from './ui';

export function Hero() {
  const isMobile = useIsMobileLayout();

  return (
    <section
      id="about"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden scroll-mt-20 bg-stone-950 px-4 pb-16 pt-[max(6.5rem,env(safe-area-inset-top)+5rem)] text-white sm:px-[max(1rem,4vw)] sm:pb-20 sm:pt-28"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-950/80 via-stone-950 to-stone-950"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="brand-ring-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <LogoMark
        size={280}
        variant="mono"
        decorative
        className="brand-watermark pointer-events-none absolute -right-16 top-24 hidden lg:block"
      />
      <LogoMark
        size={200}
        variant="mono"
        decorative
        className="brand-watermark pointer-events-none absolute -left-12 bottom-32 hidden md:block"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <FadeInUp eager>
          <div className="mb-6 flex flex-col items-center gap-3 sm:mb-8 sm:gap-5">
            <div className={`brand-hero-glow ${isMobile ? '' : 'brand-float'}`}>
              <WordmarkLockup light layout="stacked" markSize={isMobile ? 'lg' : 'xl'} />
            </div>
            <p className="max-w-md px-1 text-sm font-medium leading-snug text-brand-200/90 sm:px-0">
              {brand.promise}
            </p>
          </div>

          <span className="mb-6 hidden max-w-[min(100%,20rem)] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-center text-[0.65rem] font-bold uppercase leading-snug tracking-[0.08em] text-stone-300 backdrop-blur-sm sm:mb-8 sm:inline-flex sm:max-w-none sm:text-xs sm:tracking-[0.12em]">
            <LogoMark size={18} variant="gradient" className="hidden shrink-0 sm:block" />
            {hero.badge}
          </span>

          <h1 className="type-display mb-5 text-white sm:mb-6">
            {hero.title}
            <br />
            <span className="italic font-normal text-brand-300">{hero.titleAccent}</span>
          </h1>

          <p className="type-lead mx-auto mb-8 max-w-2xl px-0.5 text-stone-400">{hero.subtitle}</p>

          <div className="mx-auto flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
            <PrimaryButton href="#contact" className="w-full sm:w-auto">
              {hero.primaryCta}
            </PrimaryButton>
            <SecondaryButton
              href="#features"
              className="w-full border-white/20 bg-white/5 font-bold text-white hover:bg-white/10 sm:w-auto"
            >
              {hero.secondaryCta}
            </SecondaryButton>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
