import type { FeatureMockup } from '../content/site';

export function FeatureMockupPanel({ type }: { type: FeatureMockup }) {
  if (type === 'deposits') {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Current sale</span>
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-800">LIVE</span>
        </div>
        <ul className="space-y-3">
          <li className="flex justify-between gap-4 text-sm">
            <div>
              <p className="font-semibold text-stone-900">Castle Lager 500ml ×2</p>
              <p className="text-xs text-brand-600">+ R 4.00 Deposit</p>
            </div>
            <p className="font-bold tabular-nums">R 35.00</p>
          </li>
          <li className="flex justify-between gap-4 text-sm">
            <div>
              <p className="font-semibold text-stone-900">Savanna 350ml ×6</p>
              <p className="text-xs text-stone-500">2 empties returned</p>
            </div>
            <p className="font-bold tabular-nums">R 92.00</p>
          </li>
        </ul>
        <div className="mt-4 rounded-xl bg-stone-900 p-4 text-white">
          <div className="flex justify-between text-sm">
            <span className="text-stone-400">Total</span>
            <span className="text-lg font-bold tabular-nums">R 127.00</span>
          </div>
          <button type="button" className="mt-3 w-full rounded-lg bg-brand-500 py-2 text-sm font-semibold">
            Charge
          </button>
        </div>
      </div>
    );
  }

  if (type === 'accounting') {
    const lines = [
      { label: 'Shift close — cash in safe', amount: '+ R 8,420', tone: 'text-emerald-600' },
      { label: 'Supplier PO — Windhoek', amount: '- R 2,150', tone: 'text-rose-600' },
      { label: 'Payroll — weekend staff', amount: '- R 1,200', tone: 'text-rose-600' },
    ];
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Store cash ledger</span>
          <span className="text-xs font-medium text-stone-500">This week</span>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 p-4 text-white">
          <p className="text-xs font-medium text-brand-100">Cash on hand (system)</p>
          <p className="mt-1 text-2xl font-bold tabular-nums">R 14,280</p>
          <p className="mt-1 text-[10px] text-brand-100/90">Aligned with till + ledger movements</p>
        </div>
        <ul className="mt-4 space-y-2">
          {lines.map((line) => (
            <li key={line.label} className="flex items-center justify-between gap-3 rounded-lg bg-stone-50 px-3 py-2 text-sm">
              <span className="text-stone-700">{line.label}</span>
              <span className={`shrink-0 font-bold tabular-nums ${line.tone}`}>{line.amount}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[10px]">
          <div className="rounded-lg border border-stone-100 bg-stone-50 p-2">
            <p className="font-bold text-stone-900">Expenses</p>
            <p className="text-stone-500">R 3.4k MTD</p>
          </div>
          <div className="rounded-lg border border-stone-100 bg-stone-50 p-2">
            <p className="font-bold text-stone-900">Payroll</p>
            <p className="text-stone-500">R 6.8k MTD</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'reports') {
    const bars = [40, 65, 52, 78, 88, 72, 95, 68, 82, 58];
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Sales summary</p>
            <p className="text-2xl font-bold tabular-nums text-stone-900">R 12,480</p>
          </div>
          <span className="text-xs font-medium text-emerald-600">+8.2% vs yesterday</span>
        </div>
        <div className="flex h-28 items-end gap-1.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-brand-600 to-brand-400"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="rounded-lg bg-stone-50 p-2">
            <p className="font-bold text-stone-900">Cash</p>
            <p className="text-stone-500">R 6.2k</p>
          </div>
          <div className="rounded-lg bg-stone-50 p-2">
            <p className="font-bold text-stone-900">Card</p>
            <p className="text-stone-500">R 4.1k</p>
          </div>
          <div className="rounded-lg bg-stone-50 p-2">
            <p className="font-bold text-stone-900">EFT</p>
            <p className="text-stone-500">R 2.1k</p>
          </div>
        </div>
      </div>
    );
  }

  const tiles = [
    { label: 'Castle', color: 'bg-amber-400' },
    { label: 'Savanna', color: 'bg-lime-400' },
    { label: 'Stoney', color: 'bg-orange-400' },
    { label: 'Windhoek', color: 'bg-yellow-300' },
    { label: 'Brutal', color: 'bg-rose-400' },
    { label: 'More…', color: 'bg-stone-300' },
  ];

  return (
    <div className="rounded-2xl border border-stone-800 bg-stone-900 p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between text-xs text-stone-400">
        <span className="font-bold uppercase tracking-widest">Till — Page 1</span>
        <span>5 × 3 grid</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {tiles.map((t) => (
          <div
            key={t.label}
            className={`flex aspect-square flex-col items-center justify-center rounded-xl ${t.color} text-center text-[10px] font-bold text-stone-900`}
          >
            {t.label}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <span className="h-2 flex-1 rounded-full bg-brand-500" />
        <span className="h-2 w-8 rounded-full bg-stone-700" />
        <span className="h-2 w-8 rounded-full bg-stone-700" />
      </div>
    </div>
  );
}
