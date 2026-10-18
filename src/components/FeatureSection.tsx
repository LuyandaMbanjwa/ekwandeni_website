import { features } from '../content/site';
import { FadeInUp } from './FadeInUp';
import { Badge, PrimaryButton } from './ui';
import { FeatureMockupPanel } from './FeatureMockups';

export function FeatureSection() {
  return (
    <section id="features" className="scroll-mt-20 px-4 py-12 sm:px-[max(1rem,4vw)] sm:py-[clamp(3rem,8vw,5rem)]" aria-labelledby="features-heading">
      <div className="mx-auto max-w-[1400px]">
        <FadeInUp className="mb-12 text-center sm:mb-20">
          <h2 id="features-heading" className="type-h2">
            Built for how you actually sell
          </h2>
        </FadeInUp>

        <div className="flex flex-col gap-14 sm:gap-24">
          {features.map((feature, index) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={feature.id}
                className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16"
              >
                <FadeInUp className={reversed ? 'lg:order-2' : ''}>
                  <Badge>{feature.badge}</Badge>
                  <h3 className="type-h2 text-[clamp(1.375rem,4.5vw,2.25rem)]">{feature.title}</h3>
                  <p className="type-body mt-4 max-w-lg text-stone-600 sm:mt-6">{feature.body}</p>
                  <div className="mt-6 sm:mt-8">
                    <PrimaryButton href="#contact" className="w-full sm:w-auto">Book a demo</PrimaryButton>
                  </div>
                </FadeInUp>
                <FadeInUp delay={120} className={reversed ? 'lg:order-1' : ''}>
                  <div className="rounded-2xl border border-stone-200 bg-gradient-to-br from-brand-50 to-stone-100 p-4 sm:rounded-3xl sm:p-8">
                    <FeatureMockupPanel type={feature.mockup} />
                  </div>
                </FadeInUp>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
