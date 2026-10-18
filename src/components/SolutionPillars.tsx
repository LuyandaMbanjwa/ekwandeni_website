import { pillars } from '../content/site';
import { FadeInUp } from './FadeInUp';

export function SolutionPillars() {
  return (
    <section id="solutions" className="scroll-mt-20 bg-stone-100 px-4 py-12 sm:px-[max(1rem,4vw)] sm:py-[clamp(3rem,8vw,5rem)]" aria-labelledby="solutions-heading">
      <div className="mx-auto max-w-[1400px]">
        <FadeInUp className="mb-10 text-center sm:mb-16">
          <h2 id="solutions-heading" className="type-h2">
            Three parts of one{' '}
            <span className="text-accent-editorial">system</span>
          </h2>
          <p className="type-lead mx-auto mt-4 max-w-2xl text-stone-600">
            From the register to the stock room — designed together, not bolted on.
          </p>
        </FadeInUp>

        <div className="grid gap-8 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <FadeInUp key={pillar.id} delay={i * 120}>
              <article className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{pillar.tagline}</p>
                <h3 className="type-h3 mt-2">{pillar.title}</h3>
                <p className="type-body mt-4 flex-1 text-stone-600">{pillar.description}</p>
                <ul className="mt-6 space-y-2 border-t border-stone-100 pt-6">
                  {pillar.bullets.map((b) => (
                    <li key={b} className="type-body flex items-center gap-2 text-stone-700">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
