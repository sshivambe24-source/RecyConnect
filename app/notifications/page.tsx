'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { AppNotification, UserProfile } from '@/lib/types';
import { formatTimeAgo } from '@/lib/utils';
import {
  Bell,
  CheckCheck,
  Send,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Repeat,
  ArrowRight,
  Info,
} from 'lucide-react';

export default function NotificationsPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    const update = () => {
      const user = store.getCurrentUser();
      setCurrentUser(user);
      if (user) {
        setNotifications(store.getNotifications(user.id));
      }
    };

    update();
    window.addEventListener('recyconnect_store_updated', update);
    return () => window.removeEventListener('recyconnect_store_updated', update);
  }, []);

  const handleMarkAsRead = (id: string) => {
    store.markNotificationRead(id);
  };

  const handleMarkAllAsRead = () => {
    if (currentUser) {
      store.markAllNotificationsRead(currentUser.id);
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'inquiry':
        return <Send size={16} className="text-amber-600" />;
      case 'message':
        return <MessageSquare size={16} className="text-brand-primary" />;
      case 'match':
        return <Sparkles size={16} className="text-teal" />;
      case 'verification':
        return <ShieldCheck size={16} className="text-emerald-600" />;
      case 'connection_update':
        return <Repeat size={16} className="text-blue-600" />;
      default:
        return <Info size={16} className="text-charcoal-muted" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-cream-50 min-h-[85vh] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-deep">Notification Center</h1>
            <p className="text-xs text-charcoal-muted">
              Live updates on inquiries, match recommendations, verified credentials, and chat messages.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-border text-xs font-bold text-charcoal hover:bg-cream-100 transition-colors shadow-xs"
            >
              <CheckCheck size={14} className="text-teal" />
              <span>Mark All as Read ({unreadCount})</span>
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-3xl border border-border shadow-elevation overflow-hidden divide-y divide-border">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-xs text-charcoal-muted space-y-2">
              <Bell size={32} className="mx-auto text-charcoal-muted/50" />
              <p className="font-semibold text-charcoal">No notifications yet</p>
              <p>You'll receive alerts when buyers inquire or when lots match your criteria.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-5 flex items-start justify-between gap-4 transition-colors ${
                  notif.read ? 'bg-white hover:bg-cream-50/60' : 'bg-purple-50/40 hover:bg-purple-50/70'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-2xl bg-cream-100 border border-border mt-0.5">
                    {getEventIcon(notif.eventType)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-charcoal">{notif.title}</h4>
                      {!notif.read && (
                        <span className="h-2 w-2 rounded-full bg-rose-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-charcoal-light leading-relaxed max-w-xl">
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-charcoal-muted block">
                      {formatTimeAgo(notif.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={notif.link}
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-subtle hover:bg-brand-lavender/50 text-brand-primary text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>View</span>
                    <ArrowRight size={13} />
                  </Link>

                  {!notif.read && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="p-1.5 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-cream-100"
                      title="Mark as read"
                    >
                      <CheckCheck size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
