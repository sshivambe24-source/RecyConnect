'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from './Logo';
import { store } from '@/lib/store';
import { UserProfile } from '@/lib/types';
import {
  Menu,
  X,
  Bell,
  MessageSquare,
  Repeat,
  PlusCircle,
  LayoutDashboard,
  User,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Search,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [unreadNotifsCount, setUnreadNotifsCount] = useState(0);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const update = () => {
      const user = store.getCurrentUser();
      setCurrentUser(user);

      if (user) {
        // Count unread notifications
        const notifs = store.getNotifications(user.id);
        setUnreadNotifsCount(notifs.filter((n) => !n.read).length);

        // Count unread conversations
        const convs = store.getConversations();
        const unread = convs.reduce((acc, c) => {
          if (user.id === c.supplierId) return acc + (c.unreadCountSupplier || 0);
          if (user.id === c.factoryId) return acc + (c.unreadCountFactory || 0);
          return acc;
        }, 0);
        setUnreadMessagesCount(unread);
      }
    };

    update();
    window.addEventListener('recyconnect_store_updated', update);
    return () => window.removeEventListener('recyconnect_store_updated', update);
  }, []);

  const navLinks = [
    { name: 'Explore Materials', href: '/materials' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'For Suppliers', href: '/#suppliers' },
    { name: 'For Factories', href: '/#factories' },
    { name: 'About', href: '/about' },
  ];

  const getDashboardHref = () => {
    if (!currentUser) return '/login';
    if (currentUser.accountType === 'supplier') return '/dashboard/supplier';
    if (currentUser.accountType === 'factory') return '/dashboard/factory';
    return '/admin';
  };

  const handleSignOut = () => {
    setUserDropdownOpen(false);
    // Switch to null or stay on demo
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-brand-primary ${
                    isActive ? 'text-brand-primary font-semibold' : 'text-charcoal'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden md:flex items-center gap-3.5">
            {currentUser ? (
              <>
                {/* List Material CTA for suppliers */}
                {currentUser.accountType === 'supplier' && (
                  <Link
                    href="/dashboard/supplier?action=new-listing"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-subtle text-brand-primary hover:bg-brand-lavender/50 text-xs font-semibold transition-colors border border-brand-lavender"
                  >
                    <PlusCircle size={15} />
                    <span>List Material</span>
                  </Link>
                )}

                {/* Sourcing Search for factories */}
                {currentUser.accountType === 'factory' && (
                  <Link
                    href="/materials"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-dark hover:bg-teal-100 text-xs font-semibold transition-colors border border-teal-200"
                  >
                    <Search size={14} />
                    <span>Source Materials</span>
                  </Link>
                )}

                {/* Connections Tracker */}
                <Link
                  href="/connections"
                  title="Connections & Transactions"
                  className="p-2 rounded-full text-charcoal-muted hover:text-brand-primary hover:bg-cream-100 transition-colors relative"
                >
                  <Repeat size={19} />
                </Link>

                {/* Messages with unread badge */}
                <Link
                  href="/messages"
                  title="Direct Messages"
                  className="p-2 rounded-full text-charcoal-muted hover:text-brand-primary hover:bg-cream-100 transition-colors relative"
                >
                  <MessageSquare size={19} />
                  {unreadMessagesCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-[9px] font-bold text-white ring-2 ring-white">
                      {unreadMessagesCount}
                    </span>
                  )}
                </Link>

                {/* In-app Notifications */}
                <Link
                  href="/notifications"
                  title="Notifications"
                  className="p-2 rounded-full text-charcoal-muted hover:text-brand-primary hover:bg-cream-100 transition-colors relative"
                >
                  <Bell size={19} />
                  {unreadNotifsCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                  )}
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-full hover:bg-cream-100 transition-colors border border-border"
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-deep text-cream font-bold text-xs flex items-center justify-center">
                      {currentUser.displayName.charAt(0)}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-charcoal leading-none line-clamp-1">
                        {currentUser.organizationName}
                      </span>
                      <span className="text-[10px] text-charcoal-muted capitalize leading-tight">
                        {currentUser.accountType}
                      </span>
                    </div>
                    <ChevronDown size={14} className="text-charcoal-muted" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-elevation border border-border py-2 text-charcoal z-50">
                      <div className="px-4 py-2 border-b border-border">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-charcoal truncate">{currentUser.displayName}</p>
                          {currentUser.verificationStatus === 'verified' && (
                            <span title="Verified">
                              <ShieldCheck size={14} className="text-teal" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-charcoal-muted truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-purple-50 text-[10px] font-semibold text-brand-primary capitalize">
                          {currentUser.accountType} Account
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          href={getDashboardHref()}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-charcoal hover:bg-cream-100 font-medium"
                        >
                          <LayoutDashboard size={15} className="text-brand-primary" />
                          <span>Dashboard Workspace</span>
                        </Link>

                        <Link
                          href="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-charcoal hover:bg-cream-100 font-medium"
                        >
                          <User size={15} className="text-teal" />
                          <span>Organization Profile & Verification</span>
                        </Link>

                        <Link
                          href="/connections"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-charcoal hover:bg-cream-100 font-medium"
                        >
                          <Repeat size={15} className="text-blue-600" />
                          <span>Connections & Deals</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-border">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2.5 w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium"
                        >
                          <LogOut size={15} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-charcoal hover:text-brand-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold shadow-sm transition-all hover:shadow-card active:scale-[0.98]"
                >
                  Join RecyConnect
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            {currentUser && (
              <Link
                href="/notifications"
                className="p-1.5 text-charcoal-muted relative"
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500" />
                )}
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-charcoal hover:bg-cream-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-charcoal hover:bg-cream-100"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {currentUser ? (
            <div className="pt-3 border-t border-border space-y-2">
              <div className="px-3 py-2 bg-cream-100 rounded-xl">
                <p className="text-xs font-bold text-charcoal">{currentUser.organizationName}</p>
                <p className="text-[11px] text-charcoal-muted capitalize">{currentUser.accountType} Account</p>
              </div>

              <Link
                href={getDashboardHref()}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-brand-primary hover:bg-brand-subtle"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/connections"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-charcoal hover:bg-cream-100"
              >
                <Repeat size={18} />
                <span>Connections & Tracking</span>
              </Link>

              <Link
                href="/messages"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-charcoal hover:bg-cream-100"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare size={18} />
                  <span>Messages</span>
                </div>
                {unreadMessagesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-primary text-white text-xs font-bold">
                    {unreadMessagesCount}
                  </span>
                )}
              </Link>

              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-charcoal hover:bg-cream-100"
              >
                <User size={18} />
                <span>Profile & Verification</span>
              </Link>
            </div>
          ) : (
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-border text-sm font-semibold text-charcoal"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-brand-primary text-white text-sm font-semibold shadow-sm"
              >
                Join RecyConnect
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
