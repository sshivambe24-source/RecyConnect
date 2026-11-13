'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { store } from '@/lib/store';
import { AccountType, UserProfile } from '@/lib/types';
import { Logo } from '@/components/Logo';
import {
  Truck,
  Building2,
  Mail,
  Lock,
  User,
  MapPin,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Phone,
} from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();

  const [accountType, setAccountType] = useState<AccountType>('supplier');
  const [displayName, setDisplayName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cityRegion, setCityRegion] = useState('Pune, Maharashtra');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!displayName || !organizationName || !email || !password) {
      setError('Please fill in all required registration fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        email,
        displayName,
        organizationName,
        accountType,
        description: `${organizationName} registered as a certified ${accountType} on RecyConnect.`,
        cityRegion,
        serviceArea: `${cityRegion} and surrounding industrial clusters`,
        phone,
        publicContactPreference: 'in_app',
        verificationStatus: 'not_submitted',
        rating: 5.0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
      };

      store.setCurrentUser(newUser);
      setIsSubmitting(false);

      if (accountType === 'supplier') {
        router.push('/dashboard/supplier');
      } else {
        router.push('/dashboard/factory');
      }
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-forest-900 forest-grid-bg">
      <div className="max-w-xl w-full space-y-8 craft-card p-8 sm:p-10 rounded-3xl border border-craft-border shadow-elevation text-charcoal">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo size="lg" showTagline={false} />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-deep tracking-tight">
            Create Your RecyConnect Account
          </h2>
          <p className="text-xs text-charcoal-muted">
            Join the verified circular economy network for recyclable materials
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          {/* 1. Account Role Selection (Supplier vs Factory) */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
              Select Your Role on RecyConnect *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Supplier Option */}
              <button
                type="button"
                onClick={() => setAccountType('supplier')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  accountType === 'supplier'
                    ? 'border-brand-primary bg-purple-50/60 shadow-xs ring-1 ring-brand-primary/20'
                    : 'border-border bg-white hover:bg-cream-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-purple-100 text-brand-primary">
                    <Truck size={18} />
                  </div>
                  {accountType === 'supplier' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-primary text-white">
                      Selected
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal">Recyclable Material Supplier</h4>
                  <p className="text-[11px] text-charcoal-muted leading-tight mt-1">
                    Aggregator, scrap dealer, manufacturer, or sorting facility listing waste materials.
                  </p>
                </div>
              </button>

              {/* Factory / Buyer Option */}
              <button
                type="button"
                onClick={() => setAccountType('factory')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  accountType === 'factory'
                    ? 'border-teal bg-teal-50/60 shadow-xs ring-1 ring-teal/20'
                    : 'border-border bg-white hover:bg-cream-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-teal-100 text-teal-dark">
                    <Building2 size={18} />
                  </div>
                  {accountType === 'factory' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal text-white">
                      Selected
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal">Recycling Factory / Buyer</h4>
                  <p className="text-[11px] text-charcoal-muted leading-tight mt-1">
                    Reprocessor, packaging mill, or recycling facility searching for raw material feedstock.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Personal & Business Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 text-charcoal-muted" size={15} />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. John Miller"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Organization / Company Name *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-3 text-charcoal-muted" size={15} />
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="e.g. Apex Resource Recovery Ltd"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Work Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-charcoal-muted" size={15} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="procurement@company.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-charcoal-muted" size={15} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Primary Industrial Region *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 text-charcoal-muted" size={15} />
                <input
                  type="text"
                  value={cityRegion}
                  onChange={(e) => setCityRegion(e.target.value)}
                  placeholder="e.g. Pune, Maharashtra"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Business Phone / WhatsApp (Private)
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 text-charcoal-muted" size={15} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98230 00000"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? 'Creating Profile...' : 'Complete Registration'}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-border">
          <p className="text-xs text-charcoal-muted">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-brand-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
