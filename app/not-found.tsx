import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 bg-cream-50 text-center">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-elevation">
        <div className="flex justify-center mb-2">
          <Logo size="md" showTagline={false} />
        </div>
        <div className="text-5xl font-extrabold text-brand-primary">404</div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-charcoal">Page Not Found</h2>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            The page you are looking for has been moved, unpublished, or does not exist.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/materials"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-border text-charcoal hover:bg-cream-100 text-xs font-bold transition-colors"
          >
            Explore Materials
          </Link>
        </div>
      </div>
    </div>
  );
}
