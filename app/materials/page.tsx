'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { store } from '@/lib/store';
import { MaterialListing, MaterialCategory, UserProfile } from '@/lib/types';
import { ListingCard } from '@/components/ListingCard';
import { InquiryModal } from '@/components/InquiryModal';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  MapPin,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

function MaterialsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [listings, setListings] = useState<MaterialListing[]>([]);
  const [categories, setCategories] = useState<MaterialCategory[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [minQty, setMinQty] = useState<string>('');
  const [maxQty, setMaxQty] = useState<string>('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [selectedPriceType, setSelectedPriceType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Inquiry Modal State
  const [inquiryListing, setInquiryListing] = useState<MaterialListing | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      setListings(store.getListings());
      setCategories(store.getCategories());
      setCurrentUser(store.getCurrentUser());
    };
    update();
    window.addEventListener('recyconnect_store_updated', update);
    return () => window.removeEventListener('recyconnect_store_updated', update);
  }, []);

  // Update selected category if url param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Unique regions list from current inventory
  const regions = useMemo(() => {
    const set = new Set<string>();
    listings.forEach((l) => {
      if (l.region) set.add(l.region);
    });
    return Array.from(set);
  }, [listings]);

  // Filter & Sort Logic
  const filteredListings = useMemo(() => {
    return listings
      .filter((l) => {
        // Only published & available
        if (!l.isPublished) return false;
        if (l.availabilityStatus === 'sold' || l.availabilityStatus === 'unavailable') return false;

        // Keyword Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = l.title.toLowerCase().includes(q);
          const matchDesc = l.description.toLowerCase().includes(q);
          const matchOrg = l.supplierOrg.toLowerCase().includes(q);
          const matchLoc = l.location.toLowerCase().includes(q) || l.region.toLowerCase().includes(q);
          const matchGrade = l.qualityGrade.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchOrg && !matchLoc && !matchGrade) return false;
        }

        // Category
        if (selectedCategory !== 'all' && l.categorySlug !== selectedCategory) {
          return false;
        }

        // Region
        if (selectedRegion !== 'all' && !l.region.toLowerCase().includes(selectedRegion.toLowerCase())) {
          return false;
        }

        // Quantity Range
        if (minQty && l.quantity < parseFloat(minQty)) return false;
        if (maxQty && l.quantity > parseFloat(maxQty)) return false;

        // Availability Status
        if (selectedAvailability !== 'all' && l.availabilityStatus !== selectedAvailability) {
          return false;
        }

        // Price Type
        if (selectedPriceType !== 'all' && l.priceType !== selectedPriceType) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'qty_high') {
          return b.quantity - a.quantity;
        }
        if (sortBy === 'qty_low') {
          return a.quantity - b.quantity;
        }
        if (sortBy === 'price_low') {
          return (a.askingPrice || 999999) - (b.askingPrice || 999999);
        }
        if (sortBy === 'price_high') {
          return (b.askingPrice || 0) - (a.askingPrice || 0);
        }
        return 0;
      });
  }, [
    listings,
    searchQuery,
    selectedCategory,
    selectedRegion,
    minQty,
    maxQty,
    selectedAvailability,
    selectedPriceType,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRegion('all');
    setMinQty('');
    setMaxQty('');
    setSelectedAvailability('all');
    setSelectedPriceType('all');
    setSortBy('newest');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'all' ||
    selectedRegion !== 'all' ||
    minQty ||
    maxQty ||
    selectedAvailability !== 'all' ||
    selectedPriceType !== 'all';

  const handleOpenInquiry = (listing: MaterialListing) => {
    setInquiryListing(listing);
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="bg-cream-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title & Subtitle */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal">
            <Sparkles size={14} />
            <span>Digital Recyclable-Materials Marketplace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-deep tracking-tight">
            Explore Recyclable Materials
          </h1>
          <p className="text-sm text-charcoal-muted max-w-2xl">
            Browse verified listings from certified industrial aggregators and sorting yards across Western Maharashtra.
          </p>
        </div>

        {/* Search Bar & Quick Category Buttons */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-border shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-3 text-charcoal-muted" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by material title, grade, polymer type, location, or supplier..."
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-cream-100 border border-border focus:outline-hidden focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-xs font-medium placeholder:text-charcoal-muted"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-charcoal-muted hover:text-charcoal"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden w-full sm:w-auto px-4 py-2.5 rounded-2xl border border-border bg-cream-50 text-charcoal text-xs font-bold flex items-center justify-center gap-2 hover:bg-cream-100"
            >
              <SlidersHorizontal size={15} />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>
          </div>

          {/* Category Quick Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-colors flex-shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-brand-deep text-white shadow-xs'
                  : 'bg-cream-100 text-charcoal hover:bg-cream-200'
              }`}
            >
              All Categories ({listings.length})
            </button>
            {categories.map((cat) => {
              const count = listings.filter((l) => l.categorySlug === cat.slug).length;
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-full font-semibold transition-colors flex-shrink-0 ${
                    isSelected
                      ? 'bg-brand-primary text-white shadow-xs'
                      : 'bg-cream-100 text-charcoal hover:bg-cream-200'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Marketplace Main Body: Sidebar Filters + Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (Desktop) & Collapsible (Mobile) */}
          <aside
            className={`lg:block ${
              mobileFiltersOpen ? 'block' : 'hidden'
            } bg-white rounded-3xl p-6 border border-border shadow-xs space-y-6 h-fit sticky top-24`}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-charcoal">
                <Filter size={16} className="text-brand-primary" />
                <span>Refine Search</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-semibold text-brand-primary hover:underline flex items-center gap-1"
                >
                  <RotateCcw size={12} />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Region / Location */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
                Operating Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              >
                <option value="all">All Pilot Areas</option>
                {regions.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Range */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
                Quantity Threshold
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minQty}
                  onChange={(e) => setMinQty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxQty}
                  onChange={(e) => setMaxQty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
              </div>
            </div>

            {/* Availability Status */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
                Availability
              </label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              >
                <option value="all">All Availability Types</option>
                <option value="ready_now">Ready for Pickup</option>
                <option value="in_stock">In Stock at Facility</option>
                <option value="recurring_weekly">Recurring Weekly Supply</option>
              </select>
            </div>

            {/* Pricing Terms */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
                Pricing Structure
              </label>
              <select
                value={selectedPriceType}
                onChange={(e) => setSelectedPriceType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              >
                <option value="all">All Pricing Types</option>
                <option value="fixed">Fixed Asking Price</option>
                <option value="negotiable">Negotiable Batch</option>
                <option value="on_request">Price on Request</option>
              </select>
            </div>
          </aside>

          {/* Listings Results Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Results Bar with Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white px-5 py-3.5 rounded-2xl border border-border shadow-xs">
              <div className="text-xs font-semibold text-charcoal">
                Showing <span className="font-bold text-brand-primary">{filteredListings.length}</span> material {filteredListings.length === 1 ? 'listing' : 'listings'}
                {hasActiveFilters && <span className="text-charcoal-muted ml-1">(filtered)</span>}
              </div>

              {/* Sorting Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-charcoal-muted flex items-center gap-1">
                  <ArrowUpDown size={13} />
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-border text-xs font-semibold text-charcoal focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-cream-50"
                >
                  <option value="newest">Newest First</option>
                  <option value="qty_high">Quantity: High to Low</option>
                  <option value="qty_low">Quantity: Low to High</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredListings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-border shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-subtle text-brand-primary flex items-center justify-center mx-auto">
                  <Search size={28} />
                </div>
                <h3 className="text-lg font-bold text-charcoal">No Matching Listings Found</h3>
                <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                  We could not find any available material lots matching your current filter criteria. Try clearing some filters or searching broader keywords.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Listings Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onSendInquiry={handleOpenInquiry}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
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

export default function ExploreMaterialsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-50 flex items-center justify-center text-xs text-charcoal-muted">Loading marketplace catalog...</div>}>
      <MaterialsContent />
    </Suspense>
  );
}
