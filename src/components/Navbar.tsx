import { useCallback, useEffect, useState } from 'react';
import { navLinks } from '../content/site';
import { PrimaryButton, Wordmark } from './ui';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  const handleNav = useCallback(() => setOpen(false), []);
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        solid ? 'border-b border-white/10 bg-stone-950/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16">
          <a
            href="#about"
            onClick={handleNav}
            className="min-w-0 shrink text-white"
            aria-label="Ekwandeni POS home"
          >
            <Wordmark light className="max-w-[calc(100vw-4.5rem)]" />
          </a>

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex"
            aria-label="Primary"
          >
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-bold text-stone-300 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <PrimaryButton href="#contact" className="hidden md:inline-flex">
            Book a demo
          </PrimaryButton>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="-mr-1 flex min-h-11 min-w-11 items-center justify-center rounded-lg text-stone-300 hover:text-white md:hidden"
          >
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-1/2 block h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  open ? 'rotate-45' : '-translate-y-[5px]'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  open ? '-rotate-45' : 'translate-y-[5px]'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className="grid transition-all duration-300 ease-out md:hidden"
        style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div
            className="flex max-h-[min(70dvh,28rem)] flex-col overflow-y-auto overscroll-contain px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 sm:px-6"
          >
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={handleNav}
                className="border-b border-white/10 py-3.5 text-base font-medium text-stone-300 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleNav}
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Book a demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
