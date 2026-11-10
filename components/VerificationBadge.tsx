import React from 'react';
import { VerificationStatus } from '@/lib/types';
import { ShieldCheck, Clock, AlertTriangle, ShieldX } from 'lucide-react';

interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const iconSize = size === 'sm' ? 13 : 16;
  const textSize = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  switch (status) {
    case 'verified':
      return (
        <span
          title="Verified RecyConnect Enterprise: Business registration and operational licenses authenticated"
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-teal-100 text-teal-dark border border-teal-200 ${textSize} ${className}`}
        >
          <ShieldCheck size={iconSize} className="text-teal" />
          {showLabel && <span>Verified Business</span>}
        </span>
      );

    case 'pending_review':
      return (
        <span
          title="Verification credentials submitted and currently pending compliance officer review"
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-200 ${textSize} ${className}`}
        >
          <Clock size={iconSize} className="text-amber-600 animate-pulse" />
          {showLabel && <span>Pending Verification</span>}
        </span>
      );

    case 'rejected':
      return (
        <span
          title="Verification documents rejected. Further credentials required."
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-rose-50 text-rose-800 border border-rose-200 ${textSize} ${className}`}
        >
          <ShieldX size={iconSize} className="text-rose-600" />
          {showLabel && <span>Action Required</span>}
        </span>
      );

    case 'not_submitted':
    default:
      return (
        <span
          title="Unverified profile: Standard marketplace participant"
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-gray-100 text-charcoal-muted border border-gray-200 ${textSize} ${className}`}
        >
          <AlertTriangle size={iconSize} className="text-gray-400" />
          {showLabel && <span>Unverified</span>}
        </span>
      );
  }
};
