import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ShieldCheck, MapPin, Target, Sparkles, Building2, Truck, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-forest-900 forest-grid-bg min-h-screen py-12 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Hero */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-3">
            <div className="p-2.5 bg-craft-paper rounded-2xl w-fit shadow-xs">
              <Logo size="lg" showTagline={true} />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Connect · Recycle · Impact
          </h1>
          <p className="text-base text-forest-100/90 max-w-2xl mx-auto leading-relaxed">
            RecyConnect is a modern digital marketplace engineered to bring efficiency, transparency, and liquidity to the secondary recyclable materials sector.
          </p>
        </div>

        {/* Mission Statement Box */}
        <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-forest-850 p-8 sm:p-10 rounded-3xl text-white space-y-4 shadow-elevation border border-forest-800">
          <span className="text-xs font-bold uppercase tracking-widest text-craft-yellow">
            Our Mission
          </span>
          <h2 className="text-2xl font-bold leading-snug">
            Make recyclable-material trading easier, faster, and more transparent by connecting suppliers of recyclable waste with suitable recycling factories.
          </h2>
          <p className="text-xs text-forest-100/90 leading-relaxed max-w-2xl">
            Industrial recycling in emerging hubs is frequently hindered by opaque pricing, fragmented scrap dealers, and unverified material purity. RecyConnect solves this with structured listings, document-authenticated counterparties, and transparent deal tracking.
          </p>
        </div>

        {/* The Problems We Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-charcoal">
          {/* Supplier Challenges */}
          <div className="craft-card rounded-3xl p-8 border border-craft-border shadow-elevation space-y-4">
            <div className="flex items-center gap-2.5 text-forest-800 font-bold text-sm">
              <Truck size={18} />
              <span>Challenges Faced by Material Suppliers</span>
            </div>
            <ul className="space-y-2.5 text-xs text-charcoal-light">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-700 mt-1.5 flex-shrink-0" />
                <span>Excessive dependency on local scrap middlemen who depress margins.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-700 mt-1.5 flex-shrink-0" />
                <span>Zero price visibility across adjacent industrial zones and reprocessors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-700 mt-1.5 flex-shrink-0" />
                <span>Difficulty finding specialized mills willing to accept specific polymers or paper cuts.</span>
              </li>
            </ul>
          </div>

          {/* Factory Challenges */}
          <div className="craft-card rounded-3xl p-8 border border-craft-border shadow-elevation space-y-4">
            <div className="flex items-center gap-2.5 text-forest-700 font-bold text-sm">
              <Building2 size={18} />
              <span>Challenges Faced by Recycling Mills</span>
            </div>
            <ul className="space-y-2.5 text-xs text-charcoal-light">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-600 mt-1.5 flex-shrink-0" />
                <span>Inconsistent feedstock quantity and batch contamination risks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-600 mt-1.5 flex-shrink-0" />
                <span>Substantial operational time wasted cold-calling unverified aggregators.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-600 mt-1.5 flex-shrink-0" />
                <span>Lack of audit trails for secondary materials compliance reporting.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Operating Model Transparency */}
        <div className="craft-card rounded-3xl p-8 border border-craft-border shadow-elevation space-y-3 text-charcoal">
          <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
            Operational Boundaries & Business Concept
          </h3>
          <p className="text-xs text-charcoal-light leading-relaxed">
            RecyConnect is a technology-enabled matching marketplace. We do not purchase recyclable inventory for our own balance sheet, take physical title to waste materials, or operate vehicle fleets. Logistics support on our platform consists of structured schedule tracking between the contracting parties and their chosen third-party freight carriers.
          </p>
          <div className="flex items-center gap-2 text-xs text-forest-800 font-semibold pt-2">
            <MapPin size={14} />
            <span>Pilot Territory: Maharashtra Industrial Corridor (Pune, Chakan, Pimpri, Talegaon)</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-craft-yellow hover:bg-craft-ochre text-forest-950 text-xs font-bold shadow-md transition-colors"
          >
            <span>Join the RecyConnect Network</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
