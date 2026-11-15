import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import {
  assistantMeta,
  knowledgeChunks,
  suggestedQuestions,
} from '../content/assistant';
import { searchKnowledge } from '../lib/assistantSearch';
import { LogoMark } from './brand/LogoMark';

type Role = 'user' | 'assistant';

type Message = {
  id: string;
  role: Role;
  text: string;
  confidence?: 'high' | 'low';
};

let messageId = 0;
function nextId() {
  messageId += 1;
  return `msg-${messageId}`;
}

const THINK_MS = 280;

export function SiteAssistant() {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>(() => [
  {
    id: nextId(),
    role: 'assistant',
    text: assistantMeta.greeting,
  },
  ]);

  const scrollToEnd = useCallback(() => {
    const el = listRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (open) {
      scrollToEnd();
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [open, scrollToEnd]);

  useEffect(() => {
    scrollToEnd();
  }, [messages, isThinking, scrollToEnd]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const reply = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    setChipsVisible(false);
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: trimmed }]);
    setInput('');
    setIsThinking(true);

    await new Promise((r) => window.setTimeout(r, THINK_MS));

    const result = searchKnowledge(trimmed, knowledgeChunks);
    setMessages((prev) => [
      ...prev,
      {
        id: nextId(),
        role: 'assistant',
        text: result.answer,
        confidence: result.confidence,
      },
    ]);
    setIsThinking(false);
  }, [isThinking]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void reply(input);
  };

  const onChip = (q: string) => {
    void reply(q);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-end gap-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pr-[max(1rem,env(safe-area-inset-right))]">
      {open && (
        <AssistantPanel
          panelRef={panelRef}
          titleId={titleId}
          messages={messages}
          isThinking={isThinking}
          chipsVisible={chipsVisible}
          listRef={listRef}
          inputRef={inputRef}
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
          onChip={onChip}
          onClose={() => setOpen(false)}
        />
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? 'site-assistant-panel' : undefined}
        aria-label={open ? assistantMeta.closeLabel : assistantMeta.openLabel}
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-900/20 transition-transform duration-200 hover:scale-105 hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        {open ? (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <LogoMark size={36} variant="mono" decorative />
        )}
      </button>
    </div>
  );
}

type PanelProps = {
  panelRef: React.RefObject<HTMLDivElement | null>;
  titleId: string;
  messages: Message[];
  isThinking: boolean;
  chipsVisible: boolean;
  listRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  input: string;
  setInput: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  onChip: (q: string) => void;
  onClose: () => void;
};

function AssistantPanel({
  panelRef,
  titleId,
  messages,
  isThinking,
  chipsVisible,
  listRef,
  inputRef,
  input,
  setInput,
  onSubmit,
  onChip,
  onClose,
}: PanelProps) {
  return (
    <div
      ref={panelRef}
      id="site-assistant-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="pointer-events-auto mb-3 mr-0 flex w-[min(100vw-2rem,22.5rem)] flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl shadow-stone-900/10 motion-safe:animate-[assistantIn_0.2s_ease-out]"
    >
      <header className="flex items-center gap-3 border-b border-stone-100 bg-brand-50 px-4 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500">
          <LogoMark size={28} variant="mono" decorative />
        </div>
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="truncate text-sm font-bold text-brand-900">
            {assistantMeta.name}
          </h2>
          <p className="text-xs text-stone-600">{assistantMeta.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-white hover:text-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          aria-label={assistantMeta.closeLabel}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div
        ref={listRef}
        className="flex max-h-[min(50dvh,20rem)] flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-4"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <MessageBubble
              role={m.role}
              text={m.text}
              lowConfidence={m.role === 'assistant' && m.confidence === 'low'}
            />
          </div>
        ))}
        {isThinking && (
          <p className="text-sm text-stone-500" aria-live="polite">
            {assistantMeta.thinkingLabel}
          </p>
        )}
        {chipsVisible && !isThinking && (
          <SuggestionChips questions={suggestedQuestions} onChip={onChip} />
        )}
      </div>

      <footer className="border-t border-stone-100 px-4 pb-3 pt-2">
        <form onSubmit={onSubmit} className="flex gap-2">
          <label className="sr-only" htmlFor="site-assistant-input">
            {assistantMeta.inputPlaceholder}
          </label>
          <input
            ref={inputRef}
            id="site-assistant-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isThinking}
            placeholder={assistantMeta.inputPlaceholder}
            autoComplete="off"
            className="min-h-[44px] min-w-0 flex-1 rounded-full border border-stone-200 bg-stone-50 px-4 text-sm text-stone-900 placeholder:text-stone-400 focus-visible:border-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-400 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isThinking || !input.trim()}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-brand-500 px-4 text-sm font-bold text-white transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {assistantMeta.sendLabel}
          </button>
        </form>
        <p className="mt-2 text-center text-[0.6875rem] leading-snug text-stone-500">
          {assistantMeta.disclaimer}
        </p>
      </footer>
    </div>
  );
}

function MessageBubble({
  role,
  text,
  lowConfidence,
}: {
  role: Role;
  text: string;
  lowConfidence?: boolean;
}) {
  const isUser = role === 'user';
  return (
    <div
      className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
        isUser
          ? 'rounded-br-md bg-brand-500 text-white'
          : 'rounded-bl-md border border-stone-100 bg-stone-50 text-stone-800'
      }`}
    >
      {text}
      {lowConfidence && (
        <p className="mt-2 border-t border-stone-200 pt-2 text-xs">
          <a
            href={assistantMeta.contactHref}
            className="font-bold text-brand-600 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400"
          >
            {assistantMeta.contactCta}
          </a>
        </p>
      )}
    </div>
  );
}

function SuggestionChips({
  questions,
  onChip,
}: {
  questions: readonly string[];
  onChip: (q: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {questions.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onChip(q)}
          className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-left text-xs font-semibold text-brand-800 transition-colors hover:bg-brand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          {q}
        </button>
      ))}
    </div>
  );
}