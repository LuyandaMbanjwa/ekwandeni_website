export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
] as const;

export const oneOfAKind = {
  eyebrow: 'One of a kind',
  titleLine1: 'Not a generic POS.',
  titleAccent: 'Alcohol retail',
  titleLine2: 'in the DNA.',
  lead:
    'Ekwandeni POS is a one-of-a-kind solution for alcohol traders — purpose-built for beer, wine, spirits, deposits, empties, and the rhythm of township trade, with workflows generic retail software never models.',
  points: [
    'Glass deposits and empties at checkout, pack-aware and refund-accurate',
    'Categories from Spirits and Wines to Empties — not an afterthought',
    'Offline till queue so load-shedding and dead signal do not stop the queue',
  ],
  cta: 'Book a demo',
  sceneCaption: 'Abstract till + returnables — live WebGL preview',
};

export const hero = {
  badge: 'Built for South African liquor & township retail',
  title: 'The till and back office',
  titleAccent: 'your bottle store deserves.',
  subtitle:
    'Ekwandeni POS is a one-of-a-kind solution for alcohol traders — rings sales on Android tills, handles glass deposits and empties at checkout, and gives you inventory, purchase orders, and reports when you are back online.',
  primaryCta: 'Book a demo',
  secondaryCta: 'See features',
};

export const stats = [
  {
    value: 'R900bn+',
    label: 'Township & informal economy',
    detail: 'A major slice of South African retail — much of it cash-first and connectivity-poor.',
  },
  {
    value: '19.5%',
    label: 'Informal employment',
    detail: 'Millions of traders run on instinct; visibility into stock and takings is the edge.',
  },
  {
    value: '60%+',
    label: 'Retailers cite data gaps',
    detail: 'Poor visibility on what sold, what is low, and what walked out the door hurts margins.',
  },
] as const;

export const pillars = [
  {
    id: 'till',
    title: 'The till',
    tagline: 'Fast floor selling',
    description:
      'Tile-based POS screens, barcode scanning, split tender (cash, card, EFT), cashier PIN login, and ESC/POS receipt printing on Sunmi-class Android tills.',
    bullets: ['Custom till layouts', 'Hybrid payments', 'PIN-secured cashiers'],
  },
  {
    id: 'backoffice',
    title: 'The back office',
    tagline: 'Stock under control',
    description:
      'Inventory, suppliers, purchase orders, transfers, stock takes, returns, discounts, and multi-store administration for owners who run more than one branch.',
    bullets: ['Spirits, wines, snacks & more', 'Purchase orders & transfers', 'Accounting & valuation'],
  },
  {
    id: 'offline',
    title: 'Keeps trading',
    tagline: 'When the line drops',
    description:
      'Sales queue locally when connectivity fails, with reserved receipt numbers and automatic sync when the network returns — so the queue does not stop because the internet did.',
    bullets: ['Offline sale queue', 'Receipt number reserve', 'Sync on reconnect'],
  },
] as const;

export type FeatureMockup = 'deposits' | 'reports' | 'till-layout';

export const features = [
  {
    id: 'deposits',
    badge: 'Deposits & empties',
    title: 'Glass deposits handled at the till — not on a scrap of paper.',
    body:
      'Charge deposits on returnable glass, record empties returned against the sale, and credit customers at your configured refund rate. Pack-aware counts keep cases and singles honest.',
    mockup: 'deposits' as FeatureMockup,
  },
  {
    id: 'reports',
    badge: 'Reports & shifts',
    title: 'Know what sold, who rang it, and when the shift closed.',
    body:
      'Sales summary, receipts, sales by item and by employee, and cashier shift reports — so owners see the day without digging through slips.',
    mockup: 'reports' as FeatureMockup,
  },
  {
    id: 'layout',
    badge: 'Till layout',
    title: 'Your bestsellers on the first screen.',
    body:
      'Design POS tile grids for landscape tills — drag your movers to page one, colour-code categories, and swap layouts without retraining the whole team.',
    mockup: 'till-layout' as FeatureMockup,
  },
] as const;

export const audience = {
  title: 'Built for alcohol retail and the trade around it',
  segments: [
    { name: 'Bottle stores', desc: 'Beer, wine, spirits, and mixers with deposits and cases.' },
    { name: 'Taverns', desc: 'High-volume till flow, cash-heavy days, and shift accountability.' },
    { name: 'Spazas & tuck shops', desc: 'Alcohol plus snacks, airtime, and household — one stock list.' },
  ],
};

export const faqs = [
  {
    q: 'Does Ekwandeni POS work without internet?',
    a: 'Yes. The register can queue sales offline and sync them when connectivity returns. Receipt numbers can be reserved ahead of time so slips stay in sequence even during an outage.',
  },
  {
    q: 'What hardware do I need?',
    a: 'Ekwandeni POS targets Android POS terminals (including Sunmi-class landscape tills) with support for barcode scanners and ESC/POS printers. Contact us to confirm fit for your lane setup.',
  },
  {
    q: 'How do bottle deposits work?',
    a: 'Returnable glass products carry a deposit at sale. Cashiers record how many empties the customer returns; the till nets deposit charged vs credited. Refund rates can differ from the deposit when you configure them at intake.',
  },
  {
    q: 'Can I run multiple stores?',
    a: 'Platform owners and store admins can manage multiple branches, switch context in the admin portal, and run transfers between stores where your process requires it.',
  },
  {
    q: 'Who uses the system day to day?',
    a: 'Roles include platform owner, store admin, store manager, and cashier. Cashiers typically sign in with a PIN on the till; managers handle inventory, orders, and reports.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Store data is backed by a secure cloud database with offline caching on the device. We do not publish infrastructure details on this page — ask us in a demo if you need a technical overview for your IT review.',
  },
  {
    q: 'How do I get started?',
    a: 'Use the contact form below with your store name and phone number. We will set up a demo and discuss onboarding for your products and till layout.',
  },
] as const;

export const contact = {
  title: 'Book a demo',
  subtitle:
    'Tell us about your store. We will reach out to schedule a walkthrough of the till and back office.',
  email: 'hello@ekwandeni.co.za',
};

export const footer = {
  tagline: 'A one-of-a-kind POS solution for alcohol traders.',
  year: 2026,
};
