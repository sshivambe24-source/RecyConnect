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
    <div className="bg-forest-900 forest-grid-bg min-h-screen py-12 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md masking-tape text-forest-950 text-xs font-bold uppercase tracking-wider border border-craft-border">
            <Sparkles size={14} />
            <span>Marketplace Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How RecyConnect Matches Recyclable Materials
          </h1>
          <p className="text-sm text-forest-100/90 max-w-2xl mx-auto leading-relaxed">
            A digital B2B matching and transaction coordination platform engineered to eliminate scrap search friction and connect verified industrial counterparties.
          </p>
        </div>

        {/* 3 Step Visual Deep Dive */}
        <div className="space-y-8 text-charcoal">
          {/* Step 1 */}
          <div className="craft-card rounded-3xl p-8 border border-craft-border shadow-elevation grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-forest-50 rounded-2xl border border-forest-200 text-center">
              <div className="w-12 h-12 rounded-2xl masking-tape text-forest-950 border border-craft-border font-extrabold text-lg flex items-center justify-center mb-2 shadow-xs">
                1
              </div>
              <h3 className="text-base font-bold text-forest-900">Listing & Ingestion</h3>
              <span className="text-[11px] font-semibold text-forest-700">Quality First</span>
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
          <div className="craft-card rounded-3xl p-8 border border-craft-border shadow-elevation grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-forest-50 rounded-2xl border border-forest-200 text-center">
              <div className="w-12 h-12 rounded-2xl masking-tape text-forest-950 border border-craft-border font-extrabold text-lg flex items-center justify-center mb-2 shadow-xs">
                2
              </div>
              <h3 className="text-base font-bold text-forest-900">Match & Inquire</h3>
              <span className="text-[11px] font-semibold text-forest-700">Deterministic Rules</span>
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
          <div className="craft-card rounded-3xl p-8 border border-craft-border shadow-elevation grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-forest-50 rounded-2xl border border-forest-200 text-center">
              <div className="w-12 h-12 rounded-2xl masking-tape text-forest-950 border border-craft-border font-extrabold text-lg flex items-center justify-center mb-2 shadow-xs">
                3
              </div>
              <h3 className="text-base font-bold text-forest-900">Discuss & Coordinate</h3>
              <span className="text-[11px] font-semibold text-forest-700">Lifecycle Tracking</span>
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
        <div className="p-6 rounded-3xl craft-card border border-craft-border text-xs text-charcoal-muted space-y-2 shadow-elevation">
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-craft-yellow hover:bg-craft-ochre text-forest-950 text-xs font-bold shadow-md transition-colors"
          >
            <Search size={15} />
            <span>Explore Live Marketplace Materials</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
