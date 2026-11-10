'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { store } from '@/lib/store';
import { MaterialListing, UserProfile } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { VerificationBadge } from '@/components/VerificationBadge';
import { ListingCard } from '@/components/ListingCard';
import { InquiryModal } from '@/components/InquiryModal';
import {
  ArrowLeft,
  MapPin,
  Scale,
  Calendar,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Send,
  Lock,
  Layers,
  Sparkles,
  Phone,
  Mail,
  AlertTriangle,
  Share2,
} from 'lucide-react';

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params?.id as string;

  const [listing, setListing] = useState<MaterialListing | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [relatedListings, setRelatedListings] = useState<MaterialListing[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const update = () => {
      const found = store.getListing(listingId);
      if (found) {
        setListing(found);
        // Increment view count if newly loaded
        store.updateListing(found.id, { viewsCount: (found.viewsCount || 0) + 1 });

        // Get related
        const all = store.getListings();
        const related = all
          .filter((l) => l.id !== found.id && l.categorySlug === found.categorySlug && l.isPublished)
          .slice(0, 3);
        setRelatedListings(related);
      }
      setCurrentUser(store.getCurrentUser());
    };

    update();
    window.addEventListener('recyconnect_store_updated', update);
    return () => window.removeEventListener('recyconnect_store_updated', update);
  }, [listingId]);

  if (!listing) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-charcoal mb-2">Listing Not Found</h2>
        <p className="text-xs text-charcoal-muted mb-4">
          This recyclable material listing may have been sold or unpublished by the supplier.
        </p>
        <Link
          href="/materials"
          className="px-5 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold"
        >
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const images = listing.images && listing.images.length > 0
    ? listing.images
    : ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80'];

  const isOwner = currentUser?.id === listing.supplierId;

  return (
    <div className="bg-cream-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/materials"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-hover transition-colors"
          >
            <ArrowLeft size={15} />
            <span>Back to All Materials</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border text-xs font-semibold text-charcoal hover:bg-cream-100 transition-colors"
          >
            <Share2 size={13} />
            <span>{copiedLink ? 'Link Copied!' : 'Share Listing'}</span>
          </button>
        </div>

        {/* Main Listing View (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Gallery & Specs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Featured Image */}
            <div className="relative h-96 w-full rounded-3xl overflow-hidden bg-cream-200 border border-border shadow-xs">
              <Image
                src={images[selectedImageIndex] || images[0]}
                alt={listing.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-deep/90 text-white backdrop-blur-xs">
                  {listing.categoryName}
                </span>
              </div>
            </div>

            {/* Thumbnail Row (if multiple images) */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImageIndex === idx ? 'border-brand-primary shadow-sm scale-95' : 'border-border opacity-70'
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description & Detailed Specs Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal mb-2">
                  Material Overview & Specifications
                </h3>
                <p className="text-sm text-charcoal-light leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-cream-50 border border-border">
                  <span className="text-[11px] font-semibold text-charcoal-muted uppercase block">
                    Quality / Grade
                  </span>
                  <span className="text-sm font-bold text-brand-deep mt-0.5 block">
                    {listing.qualityGrade}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream-50 border border-border">
                  <span className="text-[11px] font-semibold text-charcoal-muted uppercase block">
                    Available Volume
                  </span>
                  <span className="text-sm font-bold text-teal-dark mt-0.5 block">
                    {listing.quantity} {listing.unit}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream-50 border border-border">
                  <span className="text-[11px] font-semibold text-charcoal-muted uppercase block">
                    Availability Mode
                  </span>
                  <span className="text-sm font-bold text-charcoal capitalize mt-0.5 block">
                    {listing.availabilityStatus.replace('_', ' ')}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream-50 border border-border">
                  <span className="text-[11px] font-semibold text-charcoal-muted uppercase block">
                    Listing Date
                  </span>
                  <span className="text-sm font-bold text-charcoal mt-0.5 block">
                    {formatDate(listing.createdAt)}
                  </span>
                </div>
              </div>

              {/* Condition & Contamination Notes */}
              {listing.conditionNotes && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                  <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-amber-700" />
                    <span>Condition & Purity Verification Notes</span>
                  </h4>
                  <p className="text-xs text-amber-950/80 leading-relaxed">
                    {listing.conditionNotes}
                  </p>
                </div>
              )}

              {/* Pickup & Handling Terms */}
              {listing.pickupDeliveryNotes && (
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-1">
                  <h4 className="text-xs font-bold text-teal-dark">
                    Facility Logistics & Loading Protocols
                  </h4>
                  <p className="text-xs text-teal-dark/90 leading-relaxed">
                    {listing.pickupDeliveryNotes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Pricing, Supplier Info, Actions */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            {/* Commercial Terms & Action Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-elevation space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-brand-deep leading-snug">
                  {listing.title}
                </h1>
                <div className="flex items-center gap-2 mt-2 text-xs text-charcoal-muted">
                  <MapPin size={13} className="text-brand-primary" />
                  <span>{listing.location}, {listing.region}</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-brand-subtle border border-brand-lavender">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block">
                  Indicative Commercial Asking Price
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-deep mt-1">
                  {listing.priceType === 'on_request' ? (
                    'Price on Request'
                  ) : (
                    <>
                      {formatCurrency(listing.askingPrice, listing.currency)}
                      <span className="text-sm font-normal text-charcoal-muted">
                        {' '}/ {listing.unit.replace(/s$/, '')}
                      </span>
                    </>
                  )}
                </div>
                <div className="text-[11px] text-charcoal-muted mt-1 capitalize">
                  Price preference: {listing.priceType}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {isOwner ? (
                  <Link
                    href={`/dashboard/supplier?edit=${listing.id}`}
                    className="w-full py-3.5 rounded-full bg-brand-primary text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-hover shadow-xs"
                  >
                    <span>Edit Your Listing</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => setIsInquiryModalOpen(true)}
                    className="w-full py-3.5 rounded-full bg-brand-primary hover:bg-brand-hover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-cardHover transition-all active:scale-98"
                  >
                    <Send size={15} />
                    <span>Send Sourcing Inquiry to Supplier</span>
                  </button>
                )}

                <p className="text-[11px] text-center text-charcoal-muted">
                  Inquiries start direct private platform messaging. Commercial terms & pickup dates are finalized directly.
                </p>
              </div>

              {/* Verified Supplier Profile Card */}
              <div className="pt-6 border-t border-border space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted block">
                  Supplier Organization
                </span>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-charcoal flex items-center gap-1.5">
                      <span>{listing.supplierOrg}</span>
                    </h4>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      Representative: {listing.supplierName}
                    </p>
                  </div>
                  {listing.supplierVerified ? (
                    <VerificationBadge status="verified" size="sm" />
                  ) : (
                    <VerificationBadge status="not_submitted" size="sm" />
                  )}
                </div>

                {/* Private contact protection note */}
                <div className="p-3 rounded-2xl bg-cream-100 border border-border flex items-start gap-2.5 text-xs text-charcoal-muted">
                  <Lock size={15} className="text-brand-primary flex-shrink-0 mt-0.5" />
                  <p className="text-[11px]">
                    <strong>Buyer Protection:</strong> Direct phone and facility contacts are masked to protect both parties from broker arbitrage. Verified counterparties gain direct contact access upon inquiry approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Material Listings */}
        {relatedListings.length > 0 && (
          <div className="pt-12 border-t border-border space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-teal">
                SIMILAR RECYCLABLES
              </h3>
              <p className="text-xl font-extrabold text-brand-deep mt-0.5">
                More in {listing.categoryName}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedListings.map((rel) => (
                <ListingCard key={rel.id} listing={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        listing={listing}
        currentUser={currentUser}
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </div>
  );
}
