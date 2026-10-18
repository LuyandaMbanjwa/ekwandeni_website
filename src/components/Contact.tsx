import { useState, type FormEvent } from 'react';
import { contact } from '../content/site';
import { FadeInUp } from './FadeInUp';

type FormState = {
  name: string;
  storeName: string;
  phone: string;
  email: string;
  message: string;
};

const initial: FormState = {
  name: '',
  storeName: '',
  phone: '',
  email: '',
  message: '',
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Ekwandeni POS demo — ${form.storeName || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nStore: ${form.storeName}\nPhone/WhatsApp: ${form.phone}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const field = (key: keyof FormState, label: string, required = false, type = 'text') => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-stone-700">
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </span>
      <input
        type={type}
        required={required}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 sm:text-sm"
      />
    </label>
  );

  return (
    <section id="contact" className="scroll-mt-20 border-t border-stone-200 bg-white px-4 py-12 sm:px-[max(1rem,4vw)] sm:py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto grid max-w-[1400px] gap-10 sm:gap-16 lg:grid-cols-2">
        <FadeInUp>
          <h2 className="type-h2">{contact.title}</h2>
          <p className="type-lead mt-4 max-w-md text-stone-600">{contact.subtitle}</p>
          <p className="type-body mt-8 text-stone-500">
            Or email us directly at{' '}
            <a href={`mailto:${contact.email}`} className="font-bold text-brand-600 hover:text-brand-700">
              {contact.email}
            </a>
          </p>
        </FadeInUp>

        <FadeInUp delay={100}>
          {submitted ? (
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8" role="status">
              <p className="font-bold text-brand-900">Opening your mail app…</p>
              <p className="type-body mt-2 text-brand-800">
                If nothing opened, send your details to {contact.email} and we will get back to you.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm font-bold text-brand-700 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:space-y-5 sm:p-8">
              {field('name', 'Your name', true)}
              {field('storeName', 'Store name', true)}
              {field('phone', 'Phone / WhatsApp', true)}
              {field('email', 'Email', true, 'email')}
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-stone-700">Message</span>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full resize-y rounded-xl border border-stone-300 bg-white px-4 py-3 text-base focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 sm:text-sm"
                  placeholder="Tell us about your tills, branches, and what you sell."
                />
              </label>
              <button
                type="submit"
                className="min-h-11 w-full rounded-full bg-brand-500 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Send message
              </button>
              <p className="text-center text-xs text-stone-500">
                Submits via your email client. Hook up Formspree or Netlify Forms later if you prefer in-browser
                delivery.
              </p>
            </form>
          )}
        </FadeInUp>
      </div>
    </section>
  );
}
