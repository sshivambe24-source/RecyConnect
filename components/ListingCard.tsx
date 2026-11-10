import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MaterialListing } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { VerificationBadge } from './VerificationBadge';
import { MapPin, Scale, Sparkles, Clock, ArrowRight, Eye } from 'lucide-react';

interface ListingCardProps {
  listing: MaterialListing;
  onSendInquiry?: (listing: MaterialListing) => void;
  showMatchScore?: number;
  matchReasons?: string[];
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onSendInquiry,
  showMatchScore,
  matchReasons,
}) => {
  const getAvailabilityBadge = (status: string) => {
    switch (status) {
      case 'ready_now':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Ready for Pickup
          </span>
        );
      case 'in_stock':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            In Stock
          </span>
        );
      case 'recurring_weekly':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-brand-primary border border-brand-lavender">
            Recurring Supply
          </span>
        );
      case 'sold':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-charcoal-muted">
            Sold
          </span>
        );
      default:
        return null;
    }
  };

  const primaryImage =
    listing.images && listing.images.length > 0
      ? listing.images[0]
      : 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-cardHover transition-all duration-300 flex flex-col h-full hover:border-brand-lavender">
      {/* Listing Media Header */}
      <div className="relative h-48 w-full bg-cream-200 overflow-hidden">
        <Image
          src={primaryImage}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-black/10" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-brand-deep/90 text-white backdrop-blur-xs border border-white/20">
            {listing.categoryName}
          </span>
          {getAvailabilityBadge(listing.availabilityStatus)}
        </div>

        {/* Match Score Badge (if in factory discovery view) */}
        {showMatchScore !== undefined && (
          <div
            title={matchReasons?.join('\n') || 'Calculated matching score'}
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-xs shadow-md border border-teal-200 flex items-center gap-1.5 text-xs font-bold text-teal-dark"
          >
            <Sparkles size={13} className="text-teal" />
            <span>{showMatchScore}% Match</span>
          </div>
        )}

        {/* Quantity Overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-semibold drop-shadow-md">
          <Scale size={14} className="text-pale-mint" />
          <span>
            {listing.quantity} {listing.unit}
          </span>
        </div>
      </div>

      {/* Listing Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Title */}
          <Link href={`/materials/${listing.id}`}>
            <h3 className="text-base font-bold text-charcoal group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
              {listing.title}
            </h3>
          </Link>

          {/* Supplier Info with Verified Badge */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-charcoal-muted">
            <span className="font-semibold text-charcoal">{listing.supplierOrg}</span>
            {listing.supplierVerified && (
              <VerificationBadge status="verified" size="sm" showLabel={false} />
            )}
          </div>

          {/* Location & Quality */}
          <div className="space-y-1.5 pt-1 text-xs text-charcoal-light">
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-charcoal-muted flex-shrink-0" />
              <span className="truncate">{listing.location}, {listing.region}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-teal flex-shrink-0" />
              <span className="truncate font-medium text-teal-dark">Grade: {listing.qualityGrade}</span>
            </div>
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider block">
              Indicative Price
            </span>
            <div className="text-sm font-extrabold text-brand-deep">
              {listing.priceType === 'on_request' ? (
                <span className="text-charcoal-muted font-semibold text-xs">Price on request</span>
              ) : (
                <span>
                  {formatCurrency(listing.askingPrice, listing.currency)}
                  <span className="text-[11px] font-normal text-charcoal-muted">
                    {' '}/ {listing.unit.replace(/s$/, '')}
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/materials/${listing.id}`}
              className="p-2 rounded-xl text-charcoal-muted hover:text-brand-primary hover:bg-cream-100 transition-colors"
              title="View Complete Specifications"
            >
              <Eye size={17} />
            </Link>

            {onSendInquiry ? (
              <button
                onClick={() => onSendInquiry(listing)}
                className="px-3.5 py-1.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1"
              >
                <span>Inquire</span>
                <ArrowRight size={13} />
              </button>
            ) : (
              <Link
                href={`/materials/${listing.id}`}
                className="px-3.5 py-1.5 rounded-xl bg-brand-subtle text-brand-primary hover:bg-brand-primary hover:text-white text-xs font-semibold transition-all flex items-center gap-1"
              >
                <span>Details</span>
                <ArrowRight size={13} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
