import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

interface FadeInUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Show immediately when already in the viewport (avoids blank first paint). */
  eager?: boolean;
}

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

export function FadeInUp({ children, className = '', delay = 0, eager = false }: FadeInUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (isInViewport(el)) {
      setVisible(true);
    }
  }, [visible]);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -24px 0px' },
    );

    io.observe(el);

    const fallback = window.setTimeout(() => setVisible(true), 1500);

    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`fade-in-up ${visible ? 'is-visible ' : ''}${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
