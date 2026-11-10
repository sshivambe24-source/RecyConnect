'use client';

import React, { useState, useEffect } from 'react';
import { store, DEMO_USERS } from '@/lib/store';
import { UserProfile } from '@/lib/types';
import { Users, RefreshCw, ChevronDown, Check, ArrowRight, Shield, Factory, Truck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const DemoSwitcher: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const update = () => setCurrentUser(store.getCurrentUser());
    update();
    window.addEventListener('recyconnect_store_updated', update);
    return () => window.removeEventListener('recyconnect_store_updated', update);
  }, []);

  if (!currentUser) return null;

  const handleSwitch = (role: 'supplier' | 'factory' | 'admin') => {
    const user = store.switchUserPersona(role);
    setCurrentUser(user);
    setIsOpen(false);
    if (role === 'supplier') router.push('/dashboard/supplier');
    else if (role === 'factory') router.push('/dashboard/factory');
    else if (role === 'admin') router.push('/admin');
  };

  const handleReset = () => {
    if (confirm('Reset demo marketplace data to initial fictional records?')) {
      setIsResetting(true);
      store.resetToDefaults();
    }
  };

  const getRoleIcon = (type: string) => {
    switch (type) {
      case 'supplier':
        return <Truck size={14} className="text-brand-primary" />;
      case 'factory':
        return <Factory size={14} className="text-teal" />;
      case 'admin':
        return <Shield size={14} className="text-purple-700" />;
      default:
        return <Users size={14} className="text-gray-500" />;
    }
  };

  const getDashboardLink = () => {
    if (currentUser.accountType === 'supplier') return '/dashboard/supplier';
    if (currentUser.accountType === 'factory') return '/dashboard/factory';
    return '/admin';
  };

  return (
    <aside aria-label="Demo Persona Switcher" className="bg-brand-deep text-cream text-xs border-b border-brand-primary/30 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Persona indicator */}
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-brand-primary/40 font-mono text-[10px] tracking-wide text-brand-lavender font-bold">
            DEMO MODE
          </span>
          <span className="hidden sm:inline text-cream/70">Acting as:</span>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors font-medium text-cream border border-white/15"
            >
              {getRoleIcon(currentUser.accountType)}
              <span className="font-semibold text-white">{currentUser.organizationName}</span>
              <span className="text-cream/60 capitalize text-[11px]">({currentUser.accountType})</span>
              <ChevronDown size={13} className={`text-cream/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute left-0 mt-1.5 w-72 bg-white rounded-xl shadow-elevation border border-border py-1.5 text-charcoal z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 border-b border-border text-[11px] font-semibold text-charcoal-muted uppercase tracking-wider">
                  Select Evaluator Persona
                </div>

                {/* Supplier Option */}
                <button
                  onClick={() => handleSwitch('supplier')}
                  className={`w-full px-3 py-2 flex items-start gap-2.5 hover:bg-cream-100 transition-colors text-left ${
                    currentUser.accountType === 'supplier' && currentUser.id === DEMO_USERS.supplier.id
                      ? 'bg-purple-50 text-brand-deep font-semibold'
                      : ''
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-brand-subtle text-brand-primary mt-0.5">
                    <Truck size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-charcoal">Apex Scrap Recovery</span>
                      {currentUser.accountType === 'supplier' && <Check size={14} className="text-brand-primary" />}
                    </div>
                    <p className="text-[11px] text-charcoal-muted truncate">Supplier • Industrial OCC & Plastics</p>
                  </div>
                </button>

                {/* Factory Option */}
                <button
                  onClick={() => handleSwitch('factory')}
                  className={`w-full px-3 py-2 flex items-start gap-2.5 hover:bg-cream-100 transition-colors text-left ${
                    currentUser.accountType === 'factory' ? 'bg-teal-50 text-teal-dark font-semibold' : ''
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-teal-50 text-teal mt-0.5">
                    <Factory size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-charcoal">GreenCycle Pulp & Paper Mill</span>
                      {currentUser.accountType === 'factory' && <Check size={14} className="text-teal" />}
                    </div>
                    <p className="text-[11px] text-charcoal-muted truncate">Factory/Buyer • Procurement Hub</p>
                  </div>
                </button>

                {/* Admin Option */}
                <button
                  onClick={() => handleSwitch('admin')}
                  className={`w-full px-3 py-2 flex items-start gap-2.5 hover:bg-cream-100 transition-colors text-left ${
                    currentUser.accountType === 'admin' ? 'bg-purple-50 text-brand-primary font-semibold' : ''
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-purple-100 text-purple-800 mt-0.5">
                    <Shield size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-charcoal">Platform Admin / Compliance</span>
                      {currentUser.accountType === 'admin' && <Check size={14} className="text-purple-700" />}
                    </div>
                    <p className="text-[11px] text-charcoal-muted truncate">Officer • Verification & Moderation</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-3">
          <Link
            href={getDashboardLink()}
            className="inline-flex items-center gap-1 text-brand-lavender hover:text-white transition-colors text-[11px] font-medium"
          >
            <span>Open Dashboard</span>
            <ArrowRight size={12} />
          </Link>
          <div className="h-3 w-px bg-white/20" />
          <button
            onClick={handleReset}
            disabled={isResetting}
            title="Reset all demo marketplace listings, connections, and chats to default state"
            className="inline-flex items-center gap-1 text-cream/70 hover:text-white transition-colors text-[11px]"
          >
            <RefreshCw size={11} className={isResetting ? 'animate-spin' : ''} />
            <span className="hidden md:inline">Reset Demo Data</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
