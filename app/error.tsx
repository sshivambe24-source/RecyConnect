'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('RecyConnect App Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-cream-50 text-center">
      <div className="max-w-md w-full space-y-5 bg-white p-8 rounded-3xl border border-border shadow-elevation">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle size={28} />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-charcoal">Something went wrong</h2>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            An unexpected error occurred while processing this request.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center gap-1.5"
          >
            <RotateCcw size={13} />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full border border-border text-charcoal text-xs font-bold hover:bg-cream-100"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
