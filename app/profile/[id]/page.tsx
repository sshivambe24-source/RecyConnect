'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { store, DEMO_USERS } from '@/lib/store';
import { UserProfile, MaterialListing, Review } from '@/lib/types';
import { VerificationBadge } from '@/components/VerificationBadge';
import { ListingCard } from '@/components/ListingCard';
import { ArrowLeft, MapPin, Star, Building2, ShieldCheck, Mail, Phone, Lock } from 'lucide-react';

export default function PublicProfilePage() {
  const params = useParams();
  const userId = params?.id as string;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [listings, setListings] = useState<MaterialListing[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Check demo users or current store
    let user = Object.values(DEMO_USERS).find((u) => u.id === userId);
    if (!user) {
      const current = store.getCurrentUser();
      if (current.id === userId) user = current;
    }

    if (user) {
      setProfile(user);
      const allListings = store.getListings();
      setListings(allListings.filter((l) => l.supplierId === user?.id && l.isPublished));
      const allReviews = store.getReviews();
      setReviews(allReviews.filter((r) => r.reviewedUserId === user?.id));
    }
  }, [userId]);

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-charcoal mb-2">Profile Not Found</h2>
        <Link href="/materials" className="text-xs font-bold text-brand-primary hover:underline">
          Browse Marketplace Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-forest-900 forest-grid-bg min-h-screen py-8 text-charcoal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/materials"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-craft-yellow hover:underline"
        >
          <ArrowLeft size={14} />
          <span>Back to Marketplace</span>
        </Link>

        {/* Public Card */}
        <div className="craft-card rounded-3xl p-8 border border-craft-border shadow-elevation space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-deep text-white font-extrabold text-2xl flex items-center justify-center flex-shrink-0">
                {profile.organizationName.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-extrabold text-brand-deep">{profile.organizationName}</h1>
                  <VerificationBadge status={profile.verificationStatus} />
                </div>
                <p className="text-xs text-charcoal-muted capitalize">{profile.accountType} Enterprise</p>
                <div className="flex items-center gap-1.5 text-xs text-charcoal-light">
                  <MapPin size={13} className="text-brand-primary" />
                  <span>{profile.cityRegion}</span>
                  <span>·</span>
                  <span>Operating Service Area: {profile.serviceArea}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
              <Star size={15} className="fill-amber-400 text-amber-500" />
              <span className="text-xs font-bold text-amber-900">{profile.rating.toFixed(1)}</span>
              <span className="text-[11px] text-charcoal-muted">({profile.reviewCount} deals)</span>
            </div>
          </div>

          <p className="text-xs text-charcoal-light leading-relaxed max-w-2xl pt-2 border-t border-border">
            {profile.description}
          </p>

          <div className="p-3.5 rounded-2xl bg-cream-100 border border-border flex items-start gap-2 text-xs text-charcoal-muted">
            <Lock size={15} className="text-brand-primary flex-shrink-0 mt-0.5" />
            <span>
              Direct contact coordinates are kept confidential. Verified factories and suppliers communicate via in-platform messaging when inquiries are sent.
            </span>
          </div>
        </div>

        {/* Published Listings by this Enterprise */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
            Active Material Lots ({listings.length})
          </h3>
          {listings.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center text-xs text-charcoal-muted border border-border">
              No active listings published currently.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {listings.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
