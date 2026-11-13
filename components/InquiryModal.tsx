'use client';

import React, { useState } from 'react';
import { MaterialListing, UserProfile } from '@/lib/types';
import { store } from '@/lib/store';
import { X, Send, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface InquiryModalProps {
  listing: MaterialListing | null;
  currentUser: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (connectionId: string) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  listing,
  currentUser,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const router = useRouter();
  const [requestedQuantity, setRequestedQuantity] = useState<number>(listing?.quantity || 10);
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !listing) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentUser) {
      router.push('/login?redirect=' + encodeURIComponent(`/materials/${listing.id}`));
      return;
    }

    if (currentUser.id === listing.supplierId) {
      setError('You cannot send an inquiry to your own listing.');
      return;
    }

    if (requestedQuantity <= 0) {
      setError('Please specify a valid quantity greater than zero.');
      return;
    }

    if (!message.trim()) {
      setError('Please include an introductory message or requirement details.');
      return;
    }

    setIsSubmitting(true);
    try {
      const conn = store.createInquiry({
        listingId: listing.id,
        factoryId: currentUser.id,
        factoryName: currentUser.displayName,
        factoryOrg: currentUser.organizationName,
        requestedQuantity,
        requestedUnit: listing.unit,
        initialMessage: message,
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        if (onSuccess) onSuccess(conn.id);
        else router.push('/connections');
      }, 1200);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="craft-card rounded-3xl max-w-lg w-full shadow-elevation border border-craft-border overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-cream-50">
          <div>
            <h3 className="text-base font-bold text-charcoal">Send Material Sourcing Inquiry</h3>
            <p className="text-xs text-charcoal-muted truncate max-w-xs">{listing.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-cream-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="text-lg font-bold text-charcoal">Inquiry Dispatched!</h4>
            <p className="text-xs text-charcoal-muted">
              Your sourcing inquiry and direct conversation thread have been opened with {listing.supplierOrg}. Redirecting to your connections workspace...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="flex-shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Listing Summary Box */}
            <div className="p-3.5 rounded-2xl bg-cream-100 border border-border space-y-1 text-xs">
              <div className="flex justify-between text-charcoal font-semibold">
                <span>Supplier:</span>
                <span className="flex items-center gap-1">
                  {listing.supplierOrg}
                  {listing.supplierVerified && <ShieldCheck size={13} className="text-teal" />}
                </span>
              </div>
              <div className="flex justify-between text-charcoal-muted">
                <span>Total Listed:</span>
                <span>{listing.quantity} {listing.unit} ({listing.availabilityStatus.replace('_', ' ')})</span>
              </div>
              <div className="flex justify-between text-charcoal-muted">
                <span>Indicative Price:</span>
                <span className="font-bold text-brand-primary">{formatCurrency(listing.askingPrice, listing.currency)} / {listing.unit}</span>
              </div>
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Requested Quantity ({listing.unit}) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={requestedQuantity}
                  onChange={(e) => setRequestedQuantity(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:outline-hidden focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm font-semibold"
                  placeholder="Enter required volume"
                  required
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-charcoal-muted font-medium">
                  {listing.unit}
                </span>
              </div>
            </div>

            {/* Initial Message */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Message to Supplier *
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Introduce your recycling factory, intake specifications, target schedule, and any questions regarding test reports or logistics..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:outline-hidden focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-xs leading-relaxed"
                required
              />
              <p className="text-[10px] text-charcoal-muted mt-1">
                Personal contact details will be kept private until mutual terms are discussed.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-charcoal hover:bg-cream-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send size={13} />
                <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
