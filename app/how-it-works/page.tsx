import React from 'react';
import Link from 'next/link';
import {
  ListFilter,
  Repeat,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Search,
  Sparkles,
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="bg-cream-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-dark text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Marketplace Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-deep tracking-tight">
            How RecyConnect Matches Recyclable Materials
          </h1>
          <p className="text-sm text-charcoal-muted max-w-2xl mx-auto leading-relaxed">
            A digital B2B matching and transaction coordination platform engineered to eliminate scrap search friction and connect verified industrial counterparties.
          </p>
        </div>

        {/* 3 Step Visual Deep Dive */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-border shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-purple-50 rounded-2xl border border-brand-lavender text-center">
              <div className="w-12 h-12 rounded-full bg-brand-primary text-white font-extrabold text-lg flex items-center justify-center mb-2">
                1
              </div>
              <h3 className="text-base font-bold text-brand-deep">Listing & Ingestion</h3>
              <span className="text-[11px] font-semibold text-brand-primary">Quality First</span>
            </div>
            <div className="md:col-span-8 space-y-2 text-xs text-charcoal-light leading-relaxed">
              <h4 className="text-sm font-bold text-charcoal">Verified Material Categorization</h4>
              <p>
                Suppliers catalog available lots with precise metrics: net tonnage, moisture percentage, optical sorting grades, contamination notes, and warehouse storage conditions.
              </p>
              <p>
                Recycling mills can simultaneously save custom sourcing rules (minimum intake volumes, acceptable travel radius, and grade requirements).
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-border shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-teal-50 rounded-2xl border border-teal-200 text-center">
              <div className="w-12 h-12 rounded-full bg-teal text-white font-extrabold text-lg flex items-center justify-center mb-2">
                2
              </div>
              <h3 className="text-base font-bold text-teal-dark">Match & Inquire</h3>
              <span className="text-[11px] font-semibold text-teal">Deterministic Rules</span>
            </div>
            <div className="md:col-span-8 space-y-2 text-xs text-charcoal-light leading-relaxed">
              <h4 className="text-sm font-bold text-charcoal">Explainable Compatibility Scoring</h4>
              <p>
                Our matching engine calculates weighted compatibility (0-100%) between published inventory and factory preferences. Factors include stream compatibility, quantity minimums, and geographic radius.
              </p>
              <p>
                Factories dispatch formal inquiries with specified volume targets without publishing sensitive contact details.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-border shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-cream-100 rounded-2xl border border-border text-center">
              <div className="w-12 h-12 rounded-full bg-brand-deep text-white font-extrabold text-lg flex items-center justify-center mb-2">
                3
              </div>
              <h3 className="text-base font-bold text-charcoal">Discuss & Coordinate</h3>
              <span className="text-[11px] font-semibold text-charcoal-muted">Lifecycle Tracking</span>
            </div>
            <div className="md:col-span-8 space-y-2 text-xs text-charcoal-light leading-relaxed">
              <h4 className="text-sm font-bold text-charcoal">Six-Stage Lifecycle Governance</h4>
              <p>
                Counterparties negotiate pricing, agree on laboratory test sheets, book loading bay schedules, and record third-party carrier information.
              </p>
              <p>
                Upon delivery receipt at the mill intake, verified reviews and ratings are recorded to build immutable marketplace reputation.
              </p>
            </div>
          </div>
        </div>

        {/* Platform Boundaries Disclaimer */}
        <div className="p-6 rounded-3xl bg-white border border-border text-xs text-charcoal-muted space-y-2">
          <h4 className="font-bold text-charcoal uppercase tracking-wider text-[11px]">
            Platform Boundary & Operating Principles
          </h4>
          <p>
            RecyConnect facilitates matchmaking and communication. We do not purchase scrap, take title of inventory, or operate logistics trucks. All final sales contracts and financial settlements are executed directly between the verified buyer and supplier.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/materials"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-md transition-colors"
          >
            <Search size={15} />
            <span>Explore Live Marketplace Materials</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
