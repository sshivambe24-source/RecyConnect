import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="bg-forest-900 forest-grid-bg min-h-screen py-12 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 craft-card p-8 sm:p-12 rounded-3xl border border-craft-border shadow-elevation text-charcoal">
        <div className="space-y-2 border-b border-border pb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal">Legal Governance</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-deep">Terms of Service</h1>
          <p className="text-xs text-charcoal-muted">Effective Date: October 2026 · RecyConnect Platform</p>
        </div>

        <div className="space-y-6 text-xs text-charcoal-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-charcoal">1. Nature of the RecyConnect Platform</h2>
            <p>
              RecyConnect provides a digital marketplace connecting suppliers of recyclable secondary materials with recycling factories, mills, and reprocessors. RecyConnect does not take physical ownership, custody, or title of any recyclable waste or material listed on the platform.
            </p>
            <p>
              All final sales contracts, pricing agreements, weight certifications, moisture tolerances, and delivery terms are negotiated and executed directly between the contracting supplier and buyer.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-charcoal">2. User Accounts & Verification</h2>
            <p>
              Users must provide accurate corporate credentials during registration. Submitting fraudulent registration certificates, altered pollution control board licenses, or unauthorized identity documentation constitutes a material breach and results in immediate account termination.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-charcoal">3. Logistics & Transport Coordination</h2>
            <p>
              The logistics features available on RecyConnect serve as coordination, scheduling, and milestone-recording tools. RecyConnect does not operate a commercial transport fleet, act as a freight carrier, or guarantee third-party driver punctuality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-charcoal">4. Limitation of Liability</h2>
            <p>
              Under no circumstances shall RecyConnect be liable for indirect, incidental, or consequential damages resulting from off-specification materials, vehicle loading delays, or commercial payment disputes between platform participants.
            </p>
          </section>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-charcoal-muted">
          <span>Questions regarding terms? Contact compliance@recyconnect.internal</span>
          <Link href="/privacy" className="font-bold text-brand-primary hover:underline">
            View Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
