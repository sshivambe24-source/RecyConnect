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
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-forest-900 forest-grid-bg text-white">
        {/* Subtle background ambient gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-forest-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-forest-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Region Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md masking-tape shadow-xs text-xs font-bold text-forest-950">
                <span className="flex h-2 w-2 rounded-full bg-forest-600 animate-pulse" />
                <span className="text-forest-950">Pilot Marketplace Active</span>
                <span className="text-forest-800">·</span>
                <span className="text-forest-900">Pune Industrial Corridor</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Turn Recyclable Waste Into{' '}
                <span className="text-craft-yellow">
                  Real Opportunities.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-lg sm:text-xl text-forest-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover suitable buyers, source recyclable materials, and connect with the right recycling partners — all through one transparent marketplace.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/materials"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-craft-yellow hover:bg-craft-ochre text-forest-950 text-base font-bold shadow-md hover:shadow-cardHover transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Search size={18} />
                  <span>Explore Materials</span>
                </Link>

                <Link
                  href="/dashboard/supplier?action=new-listing"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-craft-paper hover:bg-white text-forest-950 border-2 border-craft-border text-base font-bold shadow-xs hover:shadow-card transition-all flex items-center justify-center gap-2"
                >
                  <Building2 size={18} className="text-forest-800" />
                  <span>List Your Materials</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-forest-200/90 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check size={16} className="text-craft-yellow" />
                  <span>Verified Recycler Profiles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={16} className="text-craft-yellow" />
                  <span>Transparent Material Grades</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={16} className="text-craft-yellow" />
                  <span>Direct Inquiry Workflow</span>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Interface Preview (Clean 3-Node Workflow) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none craft-card rounded-3xl p-6 shadow-elevation border border-craft-border space-y-4 text-charcoal">
                {/* Header of preview card */}
                <div className="flex items-center justify-between border-b border-craft-border pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-craft-yellow" />
                    <span className="h-3 w-3 rounded-full bg-forest-500" />
                  </div>
                  <span className="text-[11px] font-mono text-charcoal-muted uppercase tracking-wider font-semibold">
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
      <section className="bg-forest-950/80 forest-grid-dense border-y border-forest-800/80 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="craft-card rounded-2xl p-5 border border-craft-border shadow-xs space-y-1 text-charcoal">
              <div className="text-2xl font-extrabold text-forest-900">Discover</div>
              <div className="text-xs font-semibold text-charcoal">More Suitable Buyers</div>
              <p className="text-[11px] text-charcoal-muted">Expand beyond local scrap cartels</p>
            </div>

            <div className="craft-card rounded-2xl p-5 border border-craft-border shadow-xs space-y-1 text-charcoal">
              <div className="text-2xl font-extrabold text-forest-700">Source</div>
              <div className="text-xs font-semibold text-charcoal">Materials Faster</div>
              <p className="text-[11px] text-charcoal-muted">Filtered by grade, quantity & location</p>
            </div>

            <div className="craft-card rounded-2xl p-5 border border-craft-border shadow-xs space-y-1 text-charcoal">
              <div className="text-2xl font-extrabold text-forest-800">Compare</div>
              <div className="text-xs font-semibold text-charcoal">Transparent Offers</div>
              <p className="text-[11px] text-charcoal-muted">Visible asking prices and batches</p>
            </div>

            <div className="craft-card rounded-2xl p-5 border border-craft-border shadow-xs space-y-1 text-charcoal">
              <div className="text-2xl font-extrabold text-charcoal">Connect</div>
              <div className="text-xs font-semibold text-charcoal">With Verified Profiles</div>
              <p className="text-[11px] text-charcoal-muted">Document-authenticated recyclers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3-Step Visual Flow) */}
      <section className="py-20 bg-forest-900 forest-grid-bg text-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-craft-yellow">
              TRANSPARENT MARKETPLACE WORKFLOW
            </h2>
            <p className="text-3xl font-extrabold text-white">
              How RecyConnect Works
            </p>
            <p className="text-sm text-forest-100/80">
              Three streamlined steps from initial material availability to completed factory delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative text-charcoal">
            {/* Step 1 */}
            <div className="craft-card rounded-3xl p-8 border border-craft-border shadow-card hover:shadow-cardHover transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl masking-tape font-bold text-lg flex items-center justify-center text-forest-950 border border-craft-border shadow-xs">
                1
              </div>
              <h3 className="text-lg font-bold text-charcoal">List or Discover</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Suppliers publish available recyclable materials with exact quantities, units, quality grades, and condition notes. Factories browse or set sourcing preferences.
              </p>
              <ul className="text-xs space-y-1.5 text-charcoal-light pt-2 border-t border-craft-border">
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="text-forest-600" />
                  <span>Verified purity & moisture specs</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="text-forest-600" />
                  <span>High-resolution batch photos</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="craft-card rounded-3xl p-8 border border-craft-border shadow-card hover:shadow-cardHover transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl masking-tape font-bold text-lg flex items-center justify-center text-forest-950 border border-craft-border shadow-xs">
                2
              </div>
              <h3 className="text-lg font-bold text-charcoal">Match & Connect</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Search and multi-parameter filtering help users find suitable counterparties. Transparent matching rules score compatibility across volume, grade, and geographic area.
              </p>
              <ul className="text-xs space-y-1.5 text-charcoal-light pt-2 border-t border-craft-border">
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="text-forest-600" />
                  <span>Deterministic relevance scores</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="text-forest-600" />
                  <span>Direct private inquiry submission</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="craft-card rounded-3xl p-8 border border-craft-border shadow-card hover:shadow-cardHover transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl masking-tape font-bold text-lg flex items-center justify-center text-forest-950 border border-craft-border shadow-xs">
                3
              </div>
              <h3 className="text-lg font-bold text-charcoal">Discuss & Complete</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Counterparties communicate in real time, agree on commercial pricing, coordinate logistics pickup slots, and track the six-stage transaction lifecycle.
              </p>
              <ul className="text-xs space-y-1.5 text-charcoal-light pt-2 border-t border-craft-border">
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="text-forest-600" />
                  <span>Logistics schedule coordination</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="text-forest-600" />
                  <span>Post-delivery reviews & ratings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MATERIAL CATEGORIES */}
      <section className="py-20 bg-forest-950 forest-grid-dense text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-craft-yellow">
                RECYCLABLE MATERIAL CATEGORIES
              </h2>
              <p className="text-3xl font-extrabold text-white mt-1">
                Supported Pilot Material Streams
              </p>
            </div>
            <Link
              href="/materials"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-craft-yellow hover:underline"
            >
              <span>View all available listings</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-charcoal">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/materials?category=${cat.slug}`}
                className="group p-6 rounded-3xl craft-card hover:bg-white border border-craft-border hover:border-forest-400 shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-white group-hover:bg-craft-card transition-colors w-fit shadow-xs border border-craft-border">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <h3 className="text-base font-bold text-charcoal group-hover:text-forest-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-4 mt-2 border-t border-craft-border flex items-center justify-between text-xs text-forest-800 font-semibold">
                  <span>Browse listings</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AUDIENCE SECTIONS: FOR SUPPLIERS & FOR FACTORIES */}
      <section className="py-20 bg-forest-900 forest-grid-bg text-white" id="suppliers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section For Suppliers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 rounded-md masking-tape text-forest-950 text-xs font-bold uppercase tracking-wider border border-craft-border">
                For Recyclable Material Suppliers
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Monetize Waste Streams and Reach Verified Industrial Buyers.
              </h2>
              <p className="text-sm text-forest-100/90 leading-relaxed">
                Break free from middlemen and hyper-localized scrap cartels. RecyConnect gives industrial scrap aggregators, manufacturing plants, and sorting yards direct visibility with recycling mills.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-craft-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white">Broader Buyer Discovery:</strong>
                    <p className="text-xs text-forest-200/80">Connect directly with paper mills, plastic compounding facilities, and secondary metal smelters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-craft-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white">Batch Quality Transparency:</strong>
                    <p className="text-xs text-forest-200/80">Showcase purity certifications, moisture specs, and test reports to justify premium grade pricing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-craft-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white">Complete Listing Control:</strong>
                    <p className="text-xs text-forest-200/80">Publish lots, mark batches unavailable, save drafts, and negotiate inquiries through unified messaging.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/dashboard/supplier?action=new-listing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-craft-yellow hover:bg-craft-ochre text-forest-950 text-xs font-bold shadow-xs transition-colors"
                >
                  <span>Start Listing Materials</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 craft-card rounded-3xl p-6 border border-craft-border shadow-elevation space-y-4 text-charcoal">
              <div className="flex items-center justify-between pb-3 border-b border-craft-border">
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
                  <span className="font-extrabold text-brand-deep">₹19,500 / ton</span>
                </div>
                <div className="p-3 rounded-2xl bg-cream-50 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-charcoal">14T Clean PET Bottle Flakes</p>
                    <p className="text-[11px] text-charcoal-muted">Chakan Phase II · Optical sorted</p>
                  </div>
                  <span className="font-extrabold text-brand-deep">₹72,000 / ton</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section For Factories */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8 border-t border-forest-800" id="factories">
            <div className="lg:col-span-6 order-2 lg:order-1 craft-card rounded-3xl p-6 border border-craft-border shadow-elevation space-y-4 text-charcoal">
              <div className="flex items-center justify-between pb-3 border-b border-craft-border">
                <h4 className="text-xs font-bold uppercase text-charcoal-muted">Factory Sourcing Filter Engine</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-forest-100 text-forest-800 border border-forest-300">
                  Procurement Mode
                </span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-forest-50 border border-forest-200">
                  <div className="flex justify-between font-bold text-forest-800">
                    <span>Sourcing Criteria: OCC Cardboard</span>
                    <span>Min: 15 Tonnes</span>
                  </div>
                  <p className="text-[11px] text-forest-700 mt-1">
                    Matching logic: Category + Quantity + Pune Service Area
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-cream-50 border border-craft-border">
                  <div className="flex justify-between text-charcoal font-semibold">
                    <span>Active Match Found:</span>
                    <span className="text-forest-700 font-bold">95% Relevance</span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted mt-0.5">
                    "Matches your selected material, volume threshold, and service area."
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
              <span className="px-3 py-1 rounded-md masking-tape text-forest-950 text-xs font-bold uppercase tracking-wider border border-craft-border">
                For Recycling Factories & Buyers
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Secure Consistent Secondary Raw Material Feedstock.
              </h2>
              <p className="text-sm text-forest-100/90 leading-relaxed">
                Keep processing mills operating at capacity without spending weeks cold-calling scrap yards. Configure raw material specifications and discover verified sellers with confirmed volumes.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-craft-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white">Save Sourcing Preferences:</strong>
                    <p className="text-xs text-forest-200/80">Define grade requirements, minimum delivery lots, and acceptable procurement radiuses.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-craft-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white">Direct Specification Inquiries:</strong>
                    <p className="text-xs text-forest-200/80">Request laboratory spectrometer analysis, moisture checks, and sample verification prior to commercial terms.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-craft-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white">Structured Logistics Coordination:</strong>
                    <p className="text-xs text-forest-200/80">Plan intake dock schedules and vehicle tare weighbridge arrivals seamlessly.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/materials"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-craft-yellow hover:bg-craft-ochre text-forest-950 text-xs font-bold shadow-xs transition-colors"
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
      <section className="py-20 bg-forest-950 forest-grid-dense text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-craft-yellow">
                LIVE MATERIAL INVENTORY
              </h2>
              <p className="text-3xl font-extrabold text-white mt-1">
                Featured Verified Listings
              </p>
            </div>
            <Link
              href="/materials"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-craft-yellow hover:underline"
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
      <section className="py-20 bg-forest-900 forest-grid-bg text-white border-t border-forest-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-craft-yellow">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-3xl font-extrabold text-white">
              Clear Answers About RecyConnect
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="craft-card rounded-2xl border border-craft-border overflow-hidden transition-colors text-charcoal"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-forest-950 hover:text-forest-700"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-charcoal-muted transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-forest-700' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-charcoal-light leading-relaxed border-t border-craft-border/60">
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
      <section className="py-20 bg-forest-950 forest-grid-dense text-white text-center relative overflow-hidden border-t border-forest-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Streamline Your Recyclable Materials Trading?
          </h2>
          <p className="text-base text-forest-100/90 max-w-2xl mx-auto leading-relaxed">
            Join the RecyConnect pilot network in Maharashtra today. Discover verified buyers, publish active recyclable material lots, and track transactions with confidence.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-craft-yellow text-forest-950 font-bold hover:bg-craft-ochre transition-colors shadow-lg"
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
