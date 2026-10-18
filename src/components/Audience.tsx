import { audience } from '../content/site';
import { FadeInUp } from './FadeInUp';

export function Audience() {
  return (
    <section className="bg-stone-900 px-4 py-12 text-white sm:px-[max(1rem,4vw)] sm:py-[clamp(3rem,8vw,5rem)]" aria-labelledby="audience-heading">
      <div className="mx-auto max-w-[1400px]">
        <FadeInUp className="mb-10 text-center sm:mb-14">
          <h2 id="audience-heading" className="type-h2 text-white">
            {audience.title}
          </h2>
        </FadeInUp>
        <div className="grid gap-6 md:grid-cols-3">
          {audience.segments.map((seg, i) => (
            <FadeInUp key={seg.name} delay={i * 100}>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
                <h3 className="type-h3 text-brand-300">{seg.name}</h3>
                <p className="type-body mt-3 text-stone-400">{seg.desc}</p>
              </article>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
