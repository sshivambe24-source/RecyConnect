import React from 'react';
import { ConnectionStatus } from '@/lib/types';
import { Send, MessageSquare, CheckCircle2, Truck, CheckCheck, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ConnectionStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const iconSize = size === 'sm' ? 12 : 14;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  switch (status) {
    case 'inquiry_sent':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 ${padding} ${className}`}>
          <Send size={iconSize} className="text-amber-600" />
          <span>Inquiry Sent</span>
        </span>
      );

    case 'discussion':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-purple-50 text-brand-primary border border-brand-lavender ${padding} ${className}`}>
          <MessageSquare size={iconSize} className="text-brand-primary" />
          <span>Discussion Active</span>
        </span>
      );

    case 'terms_agreed':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 ${padding} ${className}`}>
          <CheckCircle2 size={iconSize} className="text-blue-600" />
          <span>Terms Agreed</span>
        </span>
      );

    case 'logistics_coordination':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-teal-50 text-teal-dark border border-teal-200 ${padding} ${className}`}>
          <Truck size={iconSize} className="text-teal" />
          <span>Logistics Coordination</span>
        </span>
      );

    case 'completed':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 ${padding} ${className}`}>
          <CheckCheck size={iconSize} className="text-emerald-600" />
          <span>Completed</span>
        </span>
      );

    case 'cancelled':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 ${padding} ${className}`}>
          <XCircle size={iconSize} className="text-rose-600" />
          <span>Cancelled</span>
        </span>
      );

    default:
      return null;
  }
};
