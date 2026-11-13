'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import {
  MaterialListing,
  Connection,
  UserProfile,
  FactoryPreferences,
  MaterialCategorySlug,
  MatchResult,
} from '@/lib/types';
import { calculateMatchScore, rankListingsForFactory } from '@/lib/matching';
import { ListingCard } from '@/components/ListingCard';
import { InquiryModal } from '@/components/InquiryModal';
import { VerificationBadge } from '@/components/VerificationBadge';
import { StatusBadge } from '@/components/StatusBadge';
import {
  Factory,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  Repeat,
  Package,
  Layers,
  ArrowRight,
  Save,
  Info,
  Check,
} from 'lucide-react';

export default function FactoryDashboardPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [listings, setListings] = useState<MaterialListing[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [preferences, setPreferences] = useState<FactoryPreferences | null>(null);

  // Preference edit states
  const [selectedCats, setSelectedCats] = useState<MaterialCategorySlug[]>(['paper', 'plastics']);
  const [minQty, setMinQty] = useState<number>(10);
  const [prefUnit, setPrefUnit] = useState<string>('tonnes');
  const [acceptableRegions, setAcceptableRegions] = useState<string>('Pune, Maharashtra, Western Maharashtra');
  const [qualityTags, setQualityTags] = useState<string>('Grade A, Clean, Sorted');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Inquiry Modal State
  const [inquiryListing, setInquiryListing] = useState<MaterialListing | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<'matches' | 'preferences' | 'inquiries'>('matches');

  useEffect(() => {
    const update = () => {
      const user = store.getCurrentUser();
      setCurrentUser(user);

      if (user) {
        const allListings = store.getListings();
        setListings(allListings);

        const allConns = store.getConnections();
        setConnections(allConns.filter((c) => c.factoryId === user.id));

        const prefs = store.getFactoryPreferences(user.id);
        setPreferences(prefs);
        setSelectedCats(prefs.requiredCategories);
        setMinQty(prefs.minQuantity);
        setPrefUnit(prefs.preferredUnit);
        setAcceptableRegions(prefs.acceptableRegions.join(', '));
        setQualityTags(prefs.qualityPreferences.join(', '));
      }
    };

    update();
    window.addEventListener('recyconnect_store_updated', update);
    return () => window.removeEventListener('recyconnect_store_updated', update);
  }, []);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updated = store.updateFactoryPreferences(currentUser.id, {
      requiredCategories: selectedCats,
      minQuantity: minQty,
      preferredUnit: prefUnit as any,
      acceptableRegions: acceptableRegions.split(',').map((s) => s.trim()).filter(Boolean),
      qualityPreferences: qualityTags.split(',').map((s) => s.trim()).filter(Boolean),
    });

    setPreferences(updated);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const toggleCategory = (slug: MaterialCategorySlug) => {
    if (selectedCats.includes(slug)) {
      setSelectedCats(selectedCats.filter((s) => s !== slug));
    } else {
      setSelectedCats([...selectedCats, slug]);
    }
  };

  // Compute explainable algorithmic matches
  const rankedMatches: MatchResult[] = useMemo(() => {
    if (!preferences) return [];
    return rankListingsForFactory(listings, preferences);
  }, [listings, preferences]);

  const activeInquiries = connections.filter((c) => c.status !== 'completed' && c.status !== 'cancelled').length;
  const completedDeals = connections.filter((c) => c.status === 'completed').length;
  const highMatchesCount = rankedMatches.filter((m) => m.score >= 70).length;

  const handleOpenInquiry = (listing: MaterialListing) => {
    setInquiryListing(listing);
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="bg-forest-900 forest-grid-bg min-h-screen py-8 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md masking-tape text-forest-950 text-xs font-bold uppercase tracking-wider border border-craft-border">
                Recycling Factory / Buyer Workspace
              </span>
              {currentUser?.verificationStatus && (
                <VerificationBadge status={currentUser.verificationStatus} size="sm" />
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {currentUser?.organizationName || 'Factory Sourcing Hub'}
            </h1>
            <p className="text-xs text-forest-100/90">
              Source secondary raw material feedstock matching your technical intake specifications.
            </p>
          </div>

          <Link
            href="/materials"
            className="px-5 py-2.5 rounded-full bg-craft-yellow hover:bg-craft-ochre text-forest-950 text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <span>Explore All Materials</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="craft-card rounded-2xl p-5 border border-craft-border shadow-card space-y-1">
            <span className="text-[11px] font-bold text-forest-700 uppercase tracking-wider">High Matches</span>
            <div className="text-2xl font-extrabold text-forest-700">{highMatchesCount} Lots</div>
            <p className="text-[10px] text-charcoal-muted">≥ 70% compatibility score</p>
          </div>

          <div className="craft-card rounded-2xl p-5 border border-craft-border shadow-card space-y-1">
            <span className="text-[11px] font-bold text-forest-800 uppercase tracking-wider">Active Inquiries</span>
            <div className="text-2xl font-extrabold text-forest-800">{activeInquiries}</div>
            <p className="text-[10px] text-charcoal-muted">In discussion & coordination</p>
          </div>

          <div className="craft-card rounded-2xl p-5 border border-craft-border shadow-card space-y-1">
            <span className="text-[11px] font-bold text-forest-900 uppercase tracking-wider">Completed Intake</span>
            <div className="text-2xl font-extrabold text-forest-900">{completedDeals}</div>
            <p className="text-[10px] text-charcoal-muted">Delivered to mill</p>
          </div>

          <div className="craft-card rounded-2xl p-5 border border-craft-border shadow-card space-y-1">
            <span className="text-[11px] font-bold text-charcoal uppercase tracking-wider">Required Streams</span>
            <div className="text-2xl font-extrabold text-charcoal">{selectedCats.length} Categories</div>
            <p className="text-[10px] text-charcoal-muted">Targeted in preferences</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="border-b border-border flex items-center gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('matches')}
            className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'matches'
                ? 'border-teal text-teal-dark'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <Sparkles size={15} className="text-teal" />
            <span>Algorithmic Matches ({rankedMatches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'preferences'
                ? 'border-teal text-teal-dark'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <SlidersHorizontal size={15} />
            <span>Factory Sourcing Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'border-teal text-teal-dark'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <Repeat size={15} />
            <span>Active Deals & Inquiries ({connections.length})</span>
          </button>
        </div>

        {/* TAB 1: ALGORITHMIC MATCHES */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            {/* Transparent Algorithm Note */}
            <div className="p-4 rounded-2xl bg-white border border-teal-200 shadow-xs flex items-start gap-3">
              <div className="p-2 rounded-xl bg-teal-50 text-teal flex-shrink-0 mt-0.5">
                <Sparkles size={18} />
              </div>
              <div className="text-xs space-y-1">
                <h4 className="font-bold text-charcoal">
                  Deterministic Explainable Match Engine
                </h4>
                <p className="text-charcoal-muted leading-relaxed">
                  Listings are scored based on your configured material categories, volume threshold ({minQty} {prefUnit}), geographic radius, and purity grade. No hidden bias.
                </p>
              </div>
            </div>

            {rankedMatches.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-border shadow-xs space-y-3">
                <Package size={36} className="mx-auto text-charcoal-muted" />
                <h3 className="text-base font-bold text-charcoal">No Listings Available Right Now</h3>
                <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                  Adjust your factory sourcing preferences to broaden your volume or category acceptance.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rankedMatches.map(({ listing, score, reasons }) => (
                  <div key={listing.id} className="space-y-2">
                    <ListingCard
                      listing={listing}
                      showMatchScore={score}
                      matchReasons={reasons}
                      onSendInquiry={handleOpenInquiry}
                    />
                    {/* Explainable match reasons card */}
                    <div className="p-2.5 rounded-xl bg-white border border-border text-[11px] text-charcoal-muted space-y-1">
                      <span className="font-bold text-teal-dark block">Why this matched:</span>
                      {reasons.slice(0, 2).map((r, i) => (
                        <div key={i} className="flex items-center gap-1.5 truncate">
                          <Check size={12} className="text-teal flex-shrink-0" />
                          <span className="truncate">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FACTORY SOURCING PREFERENCES */}
        {activeTab === 'preferences' && (
          <div className="max-w-3xl bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-charcoal">Configure Feedstock Sourcing Rules</h3>
              <p className="text-xs text-charcoal-muted">
                These criteria are used to rank material listings across the marketplace.
              </p>
            </div>

            {isSavedNotice && (
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-dark text-xs flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Preferences saved successfully! Match scores updated.</span>
              </div>
            )}

            <form onSubmit={handleSavePreferences} className="space-y-6">
              {/* Category checkboxes */}
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                  Target Recyclable Streams (Select all accepted) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { slug: 'paper', label: 'Paper & Cardboard' },
                    { slug: 'plastics', label: 'Plastics (PET, HDPE)' },
                    { slug: 'metals', label: 'Industrial Metals' },
                    { slug: 'e-waste', label: 'E-Waste & PCBs' },
                    { slug: 'other', label: 'Other Commercial' },
                  ].map((cat) => {
                    const isSelected = selectedCats.includes(cat.slug as any);
                    return (
                      <button
                        type="button"
                        key={cat.slug}
                        onClick={() => toggleCategory(cat.slug as any)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-teal bg-teal-50 text-teal-dark font-bold'
                            : 'border-border bg-cream-50 text-charcoal hover:bg-cream-100'
                        }`}
                      >
                        <span>{cat.label}</span>
                        {isSelected && <Check size={14} className="text-teal" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Volume requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Minimum Batch Volume *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={minQty}
                    onChange={(e) => setMinQty(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-teal/20 focus:border-teal font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Preferred Unit
                  </label>
                  <select
                    value={prefUnit}
                    onChange={(e) => setPrefUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-teal/20 focus:border-teal"
                  >
                    <option value="tonnes">Tonnes (Metric Tons)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="bales">Compressed Bales</option>
                  </select>
                </div>
              </div>

              {/* Regions */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  Acceptable Procurement Service Areas (Comma separated)
                </label>
                <input
                  type="text"
                  value={acceptableRegions}
                  onChange={(e) => setAcceptableRegions(e.target.value)}
                  placeholder="e.g. Pune, Maharashtra, Chakan, Talegaon, Western Maharashtra"
                  className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-teal/20 focus:border-teal"
                />
              </div>

              {/* Quality Keywords */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  Preferred Quality Grades & Purity Terms
                </label>
                <input
                  type="text"
                  value={qualityTags}
                  onChange={(e) => setQualityTags(e.target.value)}
                  placeholder="e.g. Grade A, Clean OCC, Hot-Washed, Food-Grade"
                  className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-teal/20 focus:border-teal"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-teal hover:bg-teal-dark text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-2"
              >
                <Save size={14} />
                <span>Save Sourcing Rules</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: INQUIRIES & CONNECTIONS */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-border shadow-xs">
              <h3 className="text-sm font-bold text-charcoal mb-4">
                Active Sourcing Negotiations & Deals
              </h3>
              {connections.length === 0 ? (
                <p className="text-xs text-charcoal-muted py-6 text-center">
                  You have not sent any material inquiries yet. Browse the catalog to contact verified suppliers.
                </p>
              ) : (
                <div className="space-y-4">
                  {connections.map((conn) => (
                    <div
                      key={conn.id}
                      className="p-4 rounded-2xl bg-cream-50 border border-border space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-charcoal">{conn.supplierOrg}</h4>
                            <span className="text-xs text-charcoal-muted">({conn.supplierName})</span>
                          </div>
                          <p className="text-xs text-brand-primary font-semibold">{conn.listingTitle}</p>
                        </div>
                        <StatusBadge status={conn.status} />
                      </div>

                      <div className="p-3 rounded-xl bg-white text-xs text-charcoal-light italic border border-border/60">
                        "{conn.initialMessage}"
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-charcoal-muted pt-1">
                        <span>Requested Volume: <strong>{conn.requestedQuantity} {conn.requestedUnit}</strong></span>
                        <div className="flex items-center gap-2">
                          <Link
                            href="/messages"
                            className="px-3 py-1.5 rounded-xl border border-border text-xs font-semibold text-charcoal hover:bg-cream-100"
                          >
                            Chat with Supplier
                          </Link>
                          <Link
                            href={`/connections?id=${conn.id}`}
                            className="px-3.5 py-1.5 rounded-xl bg-teal-dark hover:bg-teal text-white text-xs font-bold"
                          >
                            View Deal Tracker
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        listing={inquiryListing}
        currentUser={currentUser}
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </div>
  );
}
