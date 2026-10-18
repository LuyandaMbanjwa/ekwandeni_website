import { stats } from '../content/site';
import { FadeInUp } from './FadeInUp';

export function StatsBand() {
  return (
    <section className="border-y border-stone-200 bg-white px-4 py-12 sm:px-[max(1rem,4vw)] sm:py-[clamp(3rem,8vw,5rem)]" aria-labelledby="stats-heading">
      <div className="mx-auto max-w-[1400px]">
        <FadeInUp>
          <h2 id="stats-heading" className="type-h2 mb-4 text-center">
            Why visibility matters on the floor
          </h2>
          <p className="type-lead mx-auto mb-10 max-w-2xl text-center text-stone-600 sm:mb-14">
            South African liquor and spaza trade runs on tight margins, unreliable connectivity, and long
            trading hours. Ekwandeni POS is built for that reality.
          </p>
        </FadeInUp>

        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, i) => (
            <FadeInUp key={stat.label} delay={i * 100}>
              <article className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center sm:p-8 md:text-left">
                <p className="type-stat text-brand-600">{stat.value}</p>
                <h3 className="type-h3 mt-2">{stat.label}</h3>
                <p className="type-body mt-3 text-stone-600">{stat.detail}</p>
              </article>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
