import { useState } from 'react';
import { faqs } from '../content/site';
import { FadeInUp } from './FadeInUp';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faq" className="scroll-mt-20 px-4 py-12 sm:px-[max(1rem,4vw)] sm:py-[clamp(3rem,8vw,5rem)]" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl">
        <FadeInUp>
          <h2 id="faq-heading" className="type-h2 mb-8 text-center sm:mb-12">
            Questions store owners ask
          </h2>

          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;
              const isLast = i === faqs.length - 1;
              return (
                <div key={item.q} className={isLast ? '' : 'border-b border-stone-200'}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-start justify-between gap-4 px-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500 sm:gap-6 sm:px-6 sm:py-6"
                  >
                    <span className="text-left text-[0.9375rem] font-bold leading-snug text-stone-900 sm:text-base">{item.q}</span>
                    <svg
                      className={`h-5 w-5 shrink-0 text-stone-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-45 text-brand-600' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="type-body px-4 pb-5 text-stone-600 sm:px-6 sm:pb-6">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
