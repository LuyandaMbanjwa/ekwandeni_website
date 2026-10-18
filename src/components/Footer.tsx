import { footer, navLinks } from '../content/site';
import { FadeInUp } from './FadeInUp';
import { PrimaryButton, Wordmark } from './ui';

export function Footer() {
  return (
    <footer className="bg-stone-950 px-4 py-14 text-white sm:px-[max(1rem,4vw)] sm:py-20 pb-[max(3.5rem,env(safe-area-inset-bottom))]">
      <FadeInUp className="mx-auto max-w-3xl text-center">
        <h2 className="type-h2 text-white">
          Ready to run a sharper{' '}
          <span className="italic font-normal text-brand-300">floor?</span>
        </h2>
        <div className="mt-8 flex justify-center px-4">
          <PrimaryButton href="#contact" className="w-full max-w-sm sm:w-auto sm:max-w-none">Book a demo</PrimaryButton>
        </div>
      </FadeInUp>

      <FadeInUp className="mx-auto mt-14 flex max-w-[1400px] flex-col gap-10 border-t border-white/10 pt-10 sm:mt-20 sm:pt-12 md:flex-row md:justify-between">
        <div>
          <Wordmark light />
          <p className="type-body mt-3 max-w-xs text-stone-400">{footer.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-bold text-stone-400 hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
      </FadeInUp>

      <p className="mx-auto mt-12 max-w-[1400px] text-center text-xs text-stone-500">
        © {footer.year} Ekwandeni POS. All rights reserved.
      </p>
    </footer>
  );
}
