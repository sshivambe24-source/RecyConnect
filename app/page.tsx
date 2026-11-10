'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { store } from '@/lib/store';
import { MaterialListing, MaterialCategory } from '@/lib/types';
import { ListingCard } from '@/components/ListingCard';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Layers,
  FileText,
  Wrench,
  Cpu,
  Package,
  TrendingUp,
  SlidersHorizontal,
  RefreshCw,
  Building2,
  Truck,
  Check,
} from 'lucide-react';

export default function HomePage() {
  const [featuredListings, setFeaturedListings] = useState<MaterialListing[]>([]);
  const [categories, setCategories] = useState<MaterialCategory[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    setFeaturedListings(store.getListings().slice(0, 3));
    setCategories(store.getCategories());
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="text-brand-primary" size={24} />;
      case 'Layers':
        return <Layers className="text-teal" size={24} />;
      case 'Wrench':
        return <Wrench className="text-amber-600" size={24} />;
      case 'Cpu':
        return <Cpu className="text-purple-600" size={24} />;
      default:
        return <Package className="text-teal-dark" size={24} />;
    }
  };

  const faqs = [
    {
      q: 'Does RecyConnect take ownership of recyclable waste or own transport trucks?',
      a: 'No. RecyConnect operates strictly as a digital marketplace and transaction coordination platform. We connect verified suppliers and recycling factories. The counterparties negotiate and agree on physical specifications, final commercial pricing, and logistics. We do not take ownership of materials or operate proprietary vehicle fleets.',
    },
    {
      q: 'How does RecyConnect verify enterprise suppliers and factories?',
      a: 'Participants can submit their official corporate registration numbers, state pollution control board (PCB) consent certificates, and operating licenses. Our compliance operations team reviews these records before awarding the "Verified Business" badge.',
    },
    {
      q: 'Which geographic regions and material categories are currently active?',
      a: 'RecyConnect has launched its pilot in the Western Maharashtra Industrial Corridor (Pune, Chakan, Pimpri-Chinchwad, and Talegaon) covering Paper & OCC, Plastics (PET, HDPE), Industrial Metal Scrap, and Telecom E-Waste. The platform architecture is designed to scale across additional regions.',
    },
    {
      q: 'How does the factory matching algorithm work?',
      a: 'Our MVP matching algorithm uses explainable, deterministic rules based on material type compatibility, quantity thresholds, geographic proximity, and quality grades. Factories can review transparent compatibility scores and explanations (e.g. "Matches your required material and service area").',
    },
    {
      q: 'Are personal contact details visible to anyone on the internet?',
      a: 'No. To prevent spam and broker interception, contact details and exact facility pickup locations are protected. Communication takes place securely through our in-app inquiry and messaging system until mutual terms are agreed.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-cream-50 via-cream to-cream">
        {/* Subtle background ambient gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-lavender/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-pale-mint/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Region Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border shadow-xs text-xs font-semibold text-charcoal">
                <span className="flex h-2 w-2 rounded-full bg-teal animate-pulse" />
                <span className="text-teal-dark">Pilot Marketplace Active</span>
                <span className="text-charcoal-muted">·</span>
                <span className="text-brand-primary">Pune Industrial Corridor</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-deep tracking-tight leading-[1.12]">
                Turn Recyclable Waste Into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-teal to-teal-dark">
                  Real Opportunities.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-lg sm:text-xl text-charcoal-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover suitable buyers, source recyclable materials, and connect with the right recycling partners — all through one transparent marketplace.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/materials"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-primary hover:bg-brand-hover text-white text-base font-bold shadow-md hover:shadow-cardHover transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Search size={18} />
                  <span>Explore Materials</span>
                </Link>

                <Link
                  href="/dashboard/supplier?action=new-listing"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-cream-100 text-brand-deep border-2 border-brand-lavender text-base font-bold shadow-xs hover:shadow-card transition-all flex items-center justify-center gap-2"
                >
                  <Building2 size={18} className="text-brand-primary" />
                  <span>List Your Materials</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-charcoal-muted font-medium">
                <div className="flex items-center gap-1.5">
                  <Check size={16} className="text-teal" />
                  <span>Verified Recycler Profiles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={16} className="text-teal" />
                  <span>Transparent Material Grades</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={16} className="text-teal" />
                  <span>Direct Inquiry Workflow</span>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Interface Preview (Clean 3-Node Workflow) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none bg-white rounded-3xl p-6 shadow-elevation border border-border space-y-4">
                {/* Header of preview card */}
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-mono text-charcoal-muted uppercase tracking-wider">
                    RECYCONNECT MATCH ENGINE
                  </span>
                </div>

                {/* Node 1: Material Supplier */}
                <div className="p-3.5 rounded-2xl bg-cream-50 border border-brand-lavender/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-100 text-brand-primary">
                      <Truck size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-charcoal">Apex Scrap Recovery</p>
                      <p className="text-[11px] text-charcoal-muted">Lists 28T OCC Cardboard (Grade A)</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-dark">
                    Verified
                  </span>
                </div>

                {/* Connecting Hub Flow Indicator */}
                <div className="flex items-center justify-center -my-1 py-1">
                  <div className="px-3 py-1 rounded-full bg-brand-deep text-white text-[10px] font-bold flex items-center gap-1.5 shadow-xs">
                    <Sparkles size={11} className="text-amber-300" />
                    <span>Algorithmic Compatibility: 95% Match</span>
                  </div>
                </div>

                {/* Node 2: Recycling Factory */}
                <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-teal text-white">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-charcoal">GreenCycle Industrial Mills</p>
                      <p className="text-[11px] text-charcoal-muted">Sourcing 25T+ OCC Kraft Stock</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-brand-primary">
                    Buyer
                  </span>
                </div>

                {/* Interactive Status Transition Demo */}
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-charcoal-muted mb-2">
                    <span className="font-semibold text-charcoal">Transaction Lifecycle:</span>
                    <span className="text-teal font-bold">Stage 4 of 6</span>
                  </div>
                  <div className="w-full bg-cream-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-primary to-teal h-full w-2/3 rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10px] text-charcoal-muted pt-1.5">
                    <span>Inquiry Sent</span>
                    <span className="font-bold text-brand-primary">Terms Agreed</span>
                    <span className="font-bold text-teal">Logistics Coordination</span>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & VALUE STRIP */}
      <section className="bg-white border-y border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-extrabold text-brand-deep">Discover</div>
              <div className="text-xs font-semibold text-charcoal">More Suitable Buyers</div>
              <p className="text-[11px] text-charcoal-muted">Expand beyond local scrap cartels</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-extrabold text-teal">Source</div>
              <div className="text-xs font-semibold text-charcoal">Materials Faster</div>
              <p className="text-[11px] text-charcoal-muted">Filtered by grade, quantity & location</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-extrabold text-brand-primary">Compare</div>
              <div className="text-xs font-semibold text-charcoal">Transparent Offers</div>
              <p className="text-[11px] text-charcoal-muted">Visible asking prices and batches</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-extrabold text-charcoal">Connect</div>
              <div className="text-xs font-semibold text-charcoal">With Verified Profiles</div>
              <p className="text-[11px] text-charcoal-muted">Document-authenticated recyclers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3-Step Visual Flow) */}
      <section className="py-20 bg-cream-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal">
              TRANSPARENT MARKETPLACE WORKFLOW
            </h2>
            <p className="text-3xl font-extrabold text-brand-deep">
              How RecyConnect Works
            </p>
            <p className="text-sm text-charcoal-muted">
              Three streamlined steps from initial material availability to completed factory delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-border shadow-xs hover:shadow-card transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-brand-primary font-bold text-lg flex items-center justify-center">
                1
              </div>
              <h3 className="text-lg font-bold text-charcoal">List or Discover</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Suppliers publish available recyclable materials with exact quantities, units, quality grades, and condition notes. Factories browse or set sourcing preferences.
              </p>
              <ul className="text-xs space-y-1.5 text-charcoal-light pt-2 border-t border-border">
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="text-teal" />
                  <span>Verified purity & moisture specs</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="text-teal" />
                  <span>High-resolution batch photos</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-border shadow-xs hover:shadow-card transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal font-bold text-lg flex items-center justify-center">
                2
              </div>
              <h3 className="text-lg font-bold text-charcoal">Match & Connect</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Search and multi-parameter filtering help users find suitable counterparties. Transparent matching rules score compatibility across volume, grade, and geographic area.
              </p>
              <ul className="text-xs space-y-1.5 text-charcoal-light pt-2 border-t border-border">
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="text-teal" />
                  <span>Deterministic relevance scores</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="text-teal" />
                  <span>Direct private inquiry submission</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-border shadow-xs hover:shadow-card transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-subtle text-brand-deep font-bold text-lg flex items-center justify-center">
                3
              </div>
              <h3 className="text-lg font-bold text-charcoal">Discuss & Complete</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Counterparties communicate in real time, agree on commercial pricing, coordinate logistics pickup slots, and track the six-stage transaction lifecycle.
              </p>
              <ul className="text-xs space-y-1.5 text-charcoal-light pt-2 border-t border-border">
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="text-teal" />
                  <span>Logistics schedule coordination</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="text-teal" />
                  <span>Post-delivery reviews & ratings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MATERIAL CATEGORIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                RECYCLABLE MATERIAL CATEGORIES
              </h2>
              <p className="text-3xl font-extrabold text-brand-deep mt-1">
                Supported Pilot Material Streams
              </p>
            </div>
            <Link
              href="/materials"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:text-brand-hover"
            >
              <span>View all available listings</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/materials?category=${cat.slug}`}
                className="group p-6 rounded-3xl bg-cream-50 hover:bg-white border border-border hover:border-brand-lavender shadow-xs hover:shadow-cardHover transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-white group-hover:bg-cream-100 transition-colors w-fit shadow-xs">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <h3 className="text-base font-bold text-charcoal group-hover:text-brand-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-4 mt-2 border-t border-border flex items-center justify-between text-xs text-brand-primary font-semibold">
                  <span>Browse listings</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AUDIENCE SECTIONS: FOR SUPPLIERS & FOR FACTORIES */}
      <section className="py-20 bg-cream-100" id="suppliers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section For Suppliers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-brand-primary text-xs font-bold uppercase tracking-wider">
                For Recyclable Material Suppliers
              </span>
              <h2 className="text-3xl font-extrabold text-brand-deep">
                Monetize Waste Streams and Reach Verified Industrial Buyers.
              </h2>
              <p className="text-sm text-charcoal-light leading-relaxed">
                Break free from middlemen and hyper-localized scrap cartels. RecyConnect gives industrial scrap aggregators, manufacturing plants, and sorting yards direct visibility with recycling mills.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-charcoal">Broader Buyer Discovery:</strong>
                    <p className="text-xs text-charcoal-muted">Connect directly with paper mills, plastic compounding facilities, and secondary metal smelters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-charcoal">Batch Quality Transparency:</strong>
                    <p className="text-xs text-charcoal-muted">Showcase purity certifications, moisture specs, and test reports to justify premium grade pricing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-charcoal">Complete Listing Control:</strong>
                    <p className="text-xs text-charcoal-muted">Publish lots, mark batches unavailable, save drafts, and negotiate inquiries through unified messaging.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/dashboard/supplier?action=new-listing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <span>Start Listing Materials</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-border shadow-elevation space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h4 className="text-xs font-bold uppercase text-charcoal-muted">Supplier Control Workspace</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Active Demo Data
                </span>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-cream-50 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-charcoal">28T Baled OCC Cardboard</p>
                    <p className="text-[11px] text-charcoal-muted">Bhosari Industrial Area · Ready for pickup</p>
                  </div>
                  <span className="font-extrabold text-brand-deep">$195 / ton</span>
                </div>
                <div className="p-3 rounded-2xl bg-cream-50 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-charcoal">14T Clean PET Bottle Flakes</p>
                    <p className="text-[11px] text-charcoal-muted">Chakan Phase II · Optical sorted</p>
                  </div>
                  <span className="font-extrabold text-brand-deep">$720 / ton</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section For Factories */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8 border-t border-border" id="factories">
            <div className="lg:col-span-6 order-2 lg:order-1 bg-white rounded-3xl p-6 border border-border shadow-elevation space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h4 className="text-xs font-bold uppercase text-charcoal-muted">Factory Sourcing Filter Engine</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-dark">
                  Procurement Mode
                </span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200">
                  <div className="flex justify-between font-bold text-teal-dark">
                    <span>Sourcing Criteria: OCC Cardboard</span>
                    <span>Min: 15 Tonnes</span>
                  </div>
                  <p className="text-[11px] text-teal-dark/80 mt-1">
                    Matching logic: Category + Quantity + Pune Service Area
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-cream-50 border border-border">
                  <div className="flex justify-between text-charcoal font-semibold">
                    <span>Active Match Found:</span>
                    <span className="text-teal font-bold">95% Relevance</span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted mt-0.5">
                    "Matches your selected material, volume threshold, and service area."
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
              <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-dark text-xs font-bold uppercase tracking-wider">
                For Recycling Factories & Buyers
              </span>
              <h2 className="text-3xl font-extrabold text-brand-deep">
                Secure Consistent Secondary Raw Material Feedstock.
              </h2>
              <p className="text-sm text-charcoal-light leading-relaxed">
                Keep processing mills operating at capacity without spending weeks cold-calling scrap yards. Configure raw material specifications and discover verified sellers with confirmed volumes.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-brand-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-charcoal">Save Sourcing Preferences:</strong>
                    <p className="text-xs text-charcoal-muted">Define grade requirements, minimum delivery lots, and acceptable procurement radiuses.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-brand-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-charcoal">Direct Specification Inquiries:</strong>
                    <p className="text-xs text-charcoal-muted">Request laboratory spectrometer analysis, moisture checks, and sample verification prior to commercial terms.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-brand-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-charcoal">Structured Logistics Coordination:</strong>
                    <p className="text-xs text-charcoal-muted">Plan intake dock schedules and vehicle tare weighbridge arrivals seamlessly.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/materials"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal hover:bg-teal-dark text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <span>Search Materials Catalog</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED MATERIAL LISTINGS (Pulled from Database Store) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal">
                LIVE MATERIAL INVENTORY
              </h2>
              <p className="text-3xl font-extrabold text-brand-deep mt-1">
                Featured Verified Listings
              </p>
            </div>
            <Link
              href="/materials"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:text-brand-hover"
            >
              <span>Explore all materials</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section className="py-20 bg-cream-50 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-3xl font-extrabold text-brand-deep">
              Clear Answers About RecyConnect
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-border overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-charcoal hover:text-brand-primary"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-charcoal-muted transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-primary' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-charcoal-light leading-relaxed border-t border-border/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. STRONG FINAL CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-r from-brand-deep via-brand-primary to-teal text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Streamline Your Recyclable Materials Trading?
          </h2>
          <p className="text-base text-cream-200/90 max-w-2xl mx-auto leading-relaxed">
            Join the RecyConnect pilot network in Maharashtra today. Discover verified buyers, publish active recyclable material lots, and track transactions with confidence.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-brand-deep font-bold hover:bg-cream-100 transition-colors shadow-lg"
            >
              Join RecyConnect Free
            </Link>
            <Link
              href="/materials"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold border border-white/25 transition-colors"
            >
              Explore Available Materials
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
