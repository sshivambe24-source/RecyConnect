'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { UserProfile, Review, MaterialListing } from '@/lib/types';
import { VerificationBadge } from '@/components/VerificationBadge';
import { ListingCard } from '@/components/ListingCard';
import {
  User,
  Building2,
  MapPin,
  ShieldCheck,
  FileCheck,
  Star,
  Send,
  AlertCircle,
  Clock,
  CheckCircle2,
  ExternalLink,
  Edit,
} from 'lucide-react';

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [myListings, setMyListings] = useState<MaterialListing[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Verification Form State
  const [regNumber, setRegNumber] = useState('');
  const [licenseDoc, setLicenseDoc] = useState('');
  const [permitDoc, setPermitDoc] = useState('');
  const [operatingYear, setOperatingYear] = useState('2018');
  const [verificationNotes, setVerificationNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const update = () => {
      const user = store.getCurrentUser();
      setCurrentUser(user);

      if (user) {
        const allListings = store.getListings();
        setMyListings(allListings.filter((l) => l.supplierId === user.id));

        const allReviews = store.getReviews();
        setReviews(allReviews.filter((r) => r.reviewedUserId === user.id));
      }
    };

    update();
    window.addEventListener('recyconnect_store_updated', update);
    return () => window.removeEventListener('recyconnect_store_updated', update);
  }, []);

  if (!currentUser) return null;

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    store.submitVerification({
      userId: currentUser.id,
      userName: currentUser.displayName,
      userOrg: currentUser.organizationName,
      accountType: currentUser.accountType,
      registrationNumber: regNumber || 'CIN/GSTIN: Pending Document #9102',
      businessLicenseDocRef: licenseDoc || 'Official-Trade-License-2026.pdf',
      environmentalPermitDocRef: permitDoc || 'Pollution-Control-Consent-MPCB.pdf',
      operatingSinceYear: operatingYear,
      notes: verificationNotes || 'Application submitted with certified factory documentation.',
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <div className="bg-forest-900 forest-grid-bg min-h-screen py-8 text-charcoal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Header Banner */}
        <div className="craft-card rounded-3xl p-6 sm:p-8 border border-craft-border shadow-elevation relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-brand-deep text-white font-extrabold text-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                {currentUser.organizationName.charAt(0)}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-extrabold text-brand-deep">
                    {currentUser.organizationName}
                  </h1>
                  <VerificationBadge status={currentUser.verificationStatus} />
                </div>

                <p className="text-xs text-charcoal-muted flex items-center gap-2">
                  <span>Contact: {currentUser.displayName}</span>
                  <span>·</span>
                  <span className="capitalize">{currentUser.accountType} Account</span>
                </p>

                <div className="flex items-center gap-2 text-xs text-charcoal-light">
                  <MapPin size={13} className="text-brand-primary" />
                  <span>{currentUser.cityRegion}</span>
                  <span>·</span>
                  <span>Service Area: {currentUser.serviceArea}</span>
                </div>
              </div>
            </div>

            {/* Rating pill */}
            <div className="flex flex-col sm:items-end">
              <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                <Star size={16} className="fill-amber-400 text-amber-500" />
                <span className="text-xs font-bold text-amber-900">{currentUser.rating.toFixed(1)} / 5.0</span>
                <span className="text-[11px] text-charcoal-muted">({currentUser.reviewCount} verified reviews)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              Organization Mission & Facility Overview
            </h3>
            <p className="text-xs text-charcoal-light leading-relaxed max-w-3xl">
              {currentUser.description}
            </p>
          </div>
        </div>

        {/* Verification Status & Submission Workspace */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-charcoal flex items-center gap-2">
                <ShieldCheck size={18} className="text-teal" />
                <span>Enterprise Trust & Verification Status</span>
              </h2>
              <p className="text-xs text-charcoal-muted">
                Official documentation submitted for audit by RecyConnect Compliance Officers.
              </p>
            </div>
            <VerificationBadge status={currentUser.verificationStatus} size="md" />
          </div>

          {currentUser.verificationStatus === 'verified' ? (
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-teal-dark">
                <CheckCircle2 size={16} className="text-teal" />
                <span>Enterprise Credentials Authenticated</span>
              </div>
              <p className="text-teal-dark/90">
                {currentUser.verificationDocumentNotes || 'Corporate Registration & Environmental Pollution Control Board license authenticated.'}
              </p>
              <p className="text-[10px] text-teal-dark/70">
                Verified badges are displayed across your listings and in factory search results.
              </p>
            </div>
          ) : currentUser.verificationStatus === 'pending_review' ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <Clock size={16} className="text-amber-600 animate-pulse" />
                <span>Verification Application Pending Review</span>
              </div>
              <p className="text-amber-950/80">
                Your submitted documentation is currently in the compliance review queue. Administrators will evaluate your tax registration and operating permits.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cream-50 border border-border text-xs text-charcoal-muted">
                Unverified profiles can list materials and send inquiries, but verified enterprises enjoy priority matching and increased trust from recycling mills.
              </div>

              {submitSuccess && (
                <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-dark text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Verification documents submitted! Status updated to Pending Review.</span>
                </div>
              )}

              <form onSubmit={handleSubmitVerification} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      Business Registration / GSTIN / CIN *
                    </label>
                    <input
                      type="text"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      placeholder="e.g. 27AABCA1234F1Z5 or CIN: U27200MH..."
                      className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      Operating Since (Year) *
                    </label>
                    <input
                      type="text"
                      value={operatingYear}
                      onChange={(e) => setOperatingYear(e.target.value)}
                      placeholder="e.g. 2017"
                      className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      Trade / Factory License Reference *
                    </label>
                    <input
                      type="text"
                      value={licenseDoc}
                      onChange={(e) => setLicenseDoc(e.target.value)}
                      placeholder="e.g. License-Certificate-MH-2024.pdf"
                      className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      Pollution Control Board (PCB) Consent Document
                    </label>
                    <input
                      type="text"
                      value={permitDoc}
                      onChange={(e) => setPermitDoc(e.target.value)}
                      placeholder="e.g. MPCB-Consent-To-Operate.pdf"
                      className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Compliance Notes & Permitted Waste Categories
                  </label>
                  <textarea
                    rows={2}
                    value={verificationNotes}
                    onChange={(e) => setVerificationNotes(e.target.value)}
                    placeholder="List specific secondary material categories authorized under your facility permit..."
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs transition-colors"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Verification Credentials'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Verified Reviews Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-charcoal">Verified Transaction Reviews ({reviews.length})</h3>
            <span className="text-xs text-charcoal-muted">Reviews can only be posted after completed delivery</span>
          </div>

          {reviews.length === 0 ? (
            <p className="text-xs text-charcoal-muted py-4 text-center">
              No transaction reviews posted yet.
            </p>
          ) : (
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-cream-50 border border-border space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-charcoal">{rev.reviewerOrg}</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={13} className="fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-light leading-relaxed">
                    "{rev.comment}"
                  </p>
                  <span className="text-[10px] text-charcoal-muted block">
                    Verified Deal: {rev.listingTitle}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
