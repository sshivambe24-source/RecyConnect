import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="bg-forest-900 forest-grid-bg min-h-screen py-12 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 craft-card p-8 sm:p-12 rounded-3xl border border-craft-border shadow-elevation text-charcoal">
        <div className="space-y-2 border-b border-border pb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal">Data Protection</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-deep">Privacy Policy</h1>
          <p className="text-xs text-charcoal-muted">Effective Date: October 2026 · RecyConnect Platform</p>
        </div>

        <div className="space-y-6 text-xs text-charcoal-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-charcoal">1. Information We Collect</h2>
            <p>
              We collect organizational information necessary to facilitate secondary material trades: corporate legal entity names, GSTIN/registration identifiers, business emails, and facility pickup coordinates.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-charcoal">2. Private Document & Contact Protection</h2>
            <p>
              Documents submitted for enterprise verification (trade licenses, tax receipts, environmental consent orders) are encrypted and stored in private access-controlled storage accessible exclusively by authorized platform compliance reviewers.
            </p>
            <p>
              Direct contact phone numbers and exact facility addresses are masked from public internet indexing to prevent scrap broker arbitrage and unsolicited communications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-charcoal">3. Platform Analytics & Cookies</h2>
            <p>
              We utilize essential technical session storage to maintain authentication state, preserve matching preferences, and record lifecycle timestamps. We do not sell user behavioral data to third-party ad networks.
            </p>
          </section>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-charcoal-muted">
          <span>Data Protection Officer: compliance@recyconnect.internal</span>
          <Link href="/terms" className="font-bold text-brand-primary hover:underline">
            View Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
