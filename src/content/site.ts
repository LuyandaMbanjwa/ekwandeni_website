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

export type FeatureMockup = 'deposits' | 'reports' | 'till-layout' | 'accounting';

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
  {
    id: 'accounting',
    badge: 'Accounting',
    title: 'Books that follow the till — not a separate spreadsheet.',
    body:
      'Store cash ledger, expenses, payroll, shift-close reconciliation, and financial statements tied to real sales and stock — so owners see margin without exporting slips to another system.',
    mockup: 'accounting' as FeatureMockup,
  },
] as const;

export const audience = {
  title: 'Built for alcohol retail and the trade around it',
  segments: [
    { name: 'Bottle stores', desc: 'Beer, wine, spirits, and mixers with deposits and cases.' },
    { name: 'Taverns', desc: 'High-volume till flow, cash-heavy days, and shift accountability.' },
    { name: 'Spazas & tuck shops', desc: 'Alcohol plus snacks, airtime, and household — one stock list.' },
    { name: 'Accounting', desc: 'Till ledger, expenses, payroll, and valuations for cash-first liquor trade.' },
  ],
};

export const faqs = [
  {
    q: 'Does Ekwandeni POS work without internet?',
    a: 'Yes. The register can queue sales offline, show when you are trading offline, and sync when connectivity returns. Receipt numbers can be reserved ahead of time so slips stay in sequence even during load-shedding or a dead signal.',
  },
  {
    q: 'What hardware do I need?',
    a: 'Ekwandeni POS runs on Android POS terminals (including Sunmi-class landscape tills). It supports keyboard-wedge barcode scanners, camera scanning where needed, and ESC/POS receipt printers — including USB thermal printers on supported devices. Contact us to confirm fit for your lane setup.',
  },
  {
    q: 'How do bottle deposits work?',
    a: 'Returnable glass carries a deposit per sale unit (a case counts as one unit). At checkout, cashiers record how many empties come back; credit is worked out per bottle, so partial returns on a case match what you expect. You can set a refund rate at intake that differs from the deposit charged. The back office also tracks bottle balances over time when customers return stock after the sale.',
  },
  {
    q: 'Can customers return empties after the sale?',
    a: 'Yes. Besides empties at checkout, the back office Returns area tracks sold, returned, and remaining bottles per product. Staff can pay customers in cash or store credit, using the same deposit maths as the till.',
  },
  {
    q: 'Can one sale be paid with cash, card, and EFT together?',
    a: 'Yes. Checkout supports split tender — several payment lines on one bill — so customers can mix cash, card, and EFT (bank transfer) until the total is covered.',
  },
  {
    q: 'Do cashiers open and close shifts?',
    a: 'Yes. The till is built around cashier shifts: open a shift to take ownership of the drawer, sell through the day, then close and reconcile. Shift reports help owners see takings without digging through slips.',
  },
  {
    q: 'Does the till handle cashback and card fees?',
    a: 'Yes. Stores can configure cashback and card fees (percentage or fixed Rand), with optional rules such as daily cashback limits. These are typical in South African cash-first trade — ask us in a demo how we set them up for your store.',
  },
  {
    q: 'Can I run multiple stores?',
    a: 'If you operate more than one branch, you can switch between stores in the management portal and run stock transfers between locations when your process requires it.',
  },
  {
    q: 'How do staff sign in on the till?',
    a: 'Cashiers use a quick PIN at the register. Owners and managers use the back office (browser or admin side of the app) for inventory, purchase orders, reports, and store setup. On first install, a manager links the Android till to your branch; after that, day-to-day selling is PIN-based.',
  },
  {
    q: 'What is included in the back office and reports?',
    a: 'Beyond the till: inventory and stock takes, suppliers and purchase orders, transfers, discounts, returns, cash tracking, inventory valuation, and accounting (expenses, payroll, till ledger, statements). Reports include sales summary, receipts, sales by item, sales by employee, and cashier shifts — so owners see the day clearly.',
  },
  {
    q: 'How do packs, cases, and empties work in stock?',
    a: 'Products can be singles, packs, cases, or empties, with composite bundles built from singles. Empties are a first-class category — not bolted on after the fact — so bottle-store stock matches how you actually buy and sell.',
  },
  {
    q: 'How do I get started?',
    a: 'Use the contact form below with your store name and phone number. We will set up a demo and discuss onboarding for your products, deposits, and till layout.',
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
