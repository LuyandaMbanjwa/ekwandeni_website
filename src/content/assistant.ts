import {
  audience,
  contact,
  faqs,
  features,
  hero,
  oneOfAKind,
  pillars,
} from './site';

export type KnowledgeChunk = {
  id: string;
  title: string;
  body: string;
  keywords: string;
  source: 'faq' | 'feature' | 'pillar' | 'overview' | 'audience';
};

export const assistantMeta = {
  name: 'Ekwandeni Guide',
  subtitle: 'Answers from our site',
  greeting:
    'Hi — I can help with questions about Ekwandeni POS: offline tills, glass deposits, split payments, shifts, hardware, multi-store, and more. Pick a topic below or type your question.',
  disclaimer: 'Automated guide using public site content — not a live person.',
  fallback:
    'I’m not sure from the info on this site. For pricing, custom setup, or IT details, book a demo and our team will help.',
  contactCta: 'Book a demo',
  contactHref: '#contact',
  thinkingLabel: 'Looking that up…',
  inputPlaceholder: 'Ask about Ekwandeni POS…',
  sendLabel: 'Send',
  openLabel: 'Open site assistant',
  closeLabel: 'Close assistant',
} as const;

/** First N FAQ questions as quick-reply chips (labels match FAQ wording). */
export const suggestedQuestions = faqs.slice(0, 4).map((f) => f.q);

export function buildKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  for (const item of faqs) {
    chunks.push({
      id: `faq-${item.q.slice(0, 24).replace(/\W+/g, '-')}`,
      title: item.q,
      body: item.a,
      keywords: `${item.q} ${item.a}`,
      source: 'faq',
    });
  }

  for (const f of features) {
    chunks.push({
      id: `feature-${f.id}`,
      title: f.title,
      body: `${f.badge}. ${f.body}`,
      keywords: `${f.badge} ${f.title} ${f.body} ${f.id}`,
      source: 'feature',
    });
  }

  for (const p of pillars) {
    chunks.push({
      id: `pillar-${p.id}`,
      title: `${p.title} — ${p.tagline}`,
      body: `${p.description} ${p.bullets.join('. ')}.`,
      keywords: `${p.title} ${p.tagline} ${p.description} ${p.bullets.join(' ')} ${p.id}`,
      source: 'pillar',
    });
  }

  chunks.push({
    id: 'overview-hero',
    title: 'What is Ekwandeni POS?',
    body: `${hero.subtitle} ${oneOfAKind.lead}`,
    keywords: `ekwandeni pos alcohol retail township beer wine spirits android till ${hero.title} ${oneOfAKind.points.join(' ')}`,
    source: 'overview',
  });

  chunks.push({
    id: 'overview-points',
    title: 'Why is Ekwandeni different from generic POS?',
    body: oneOfAKind.points.join(' '),
    keywords: `generic pos deposits empties offline load shedding ${oneOfAKind.points.join(' ')}`,
    source: 'overview',
  });

  chunks.push({
    id: 'contact-demo',
    title: 'How do I book a demo or contact Ekwandeni?',
    body: `${contact.subtitle} Email: ${contact.email}.`,
    keywords: `demo contact email get started book ${contact.email}`,
    source: 'overview',
  });

  for (const seg of audience.segments) {
    chunks.push({
      id: `audience-${seg.name.replace(/\s+/g, '-').toLowerCase()}`,
      title: `Is Ekwandeni POS for ${seg.name}?`,
      body: seg.desc,
      keywords: `${seg.name} ${seg.desc} ${audience.title}`,
      source: 'audience',
    });
  }

  return chunks;
}

export const knowledgeChunks = buildKnowledgeChunks();