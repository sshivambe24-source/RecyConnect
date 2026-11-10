'use client';

import React, { useState } from 'react';
import { Connection, UserProfile } from '@/lib/types';
import { store } from '@/lib/store';
import { X, Star, CheckCircle } from 'lucide-react';

interface ReviewModalProps {
  connection: Connection | null;
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onReviewed: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  connection,
  currentUser,
  isOpen,
  onClose,
  onReviewed,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !connection) return null;

  const targetUserId =
    currentUser.id === connection.supplierId ? connection.factoryId : connection.supplierId;
  const targetOrgName =
    currentUser.id === connection.supplierId ? connection.factoryOrg : connection.supplierOrg;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please provide honest comments regarding material quality or transaction coordination.');
      return;
    }

    setIsSubmitting(true);
    try {
      store.createReview({
        connectionId: connection.id,
        listingTitle: connection.listingTitle,
        reviewerId: currentUser.id,
        reviewerName: currentUser.displayName,
        reviewerOrg: currentUser.organizationName,
        reviewedUserId: targetUserId,
        rating,
        comment,
      });

      onReviewed();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-elevation border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-cream-50">
          <div>
            <h3 className="text-base font-bold text-charcoal">Submit Transaction Review</h3>
            <p className="text-xs text-charcoal-muted truncate">{connection.listingTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-cream-200"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs border border-rose-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Counterparty Reviewed:
            </label>
            <div className="text-sm font-bold text-brand-primary">{targetOrgName}</div>
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-xs font-bold text-charcoal mb-2">
              Overall Rating *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={`${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-charcoal ml-2">
                {rating} of 5 Stars
              </span>
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1">
              Review & Feedback *
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe material condition, accuracy of grade, punctuality of loading, and communication clarity..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary leading-relaxed"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-charcoal hover:bg-cream-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle size={14} />
              <span>{isSubmitting ? 'Submitting...' : 'Post Verified Review'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
