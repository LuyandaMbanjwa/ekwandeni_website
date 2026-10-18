import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ErrorBoundary extends Component<Props, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Ekwandeni POS render error:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="mx-auto max-w-lg p-8 text-center">
            <p className="font-bold text-stone-900">Something went wrong loading this section.</p>
            <p className="mt-2 text-sm text-stone-600">{this.state.error.message}</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
