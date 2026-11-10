'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { store, DEMO_USERS } from '@/lib/store';
import { Logo } from '@/components/Logo';
import { Mail, Lock, ArrowRight, Shield, Truck, Factory, AlertCircle } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      // Check if credentials match any demo user, or default to a customized session
      let matchedUser = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!matchedUser) {
        // Create or assign standard session
        matchedUser = {
          ...DEMO_USERS.supplier,
          id: `user-${Date.now()}`,
          email,
          displayName: email.split('@')[0],
          organizationName: `${email.split('@')[0]} Enterprises`,
        };
      }

      store.setCurrentUser(matchedUser);
      setIsLoading(false);

      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (matchedUser.accountType === 'supplier') {
        router.push('/dashboard/supplier');
      } else if (matchedUser.accountType === 'factory') {
        router.push('/dashboard/factory');
      } else {
        router.push('/admin');
      }
    }, 400);
  };

  const handleQuickDemoLogin = (role: 'supplier' | 'factory' | 'admin') => {
    const user = store.switchUserPersona(role);
    if (redirectUrl) {
      router.push(redirectUrl);
    } else if (role === 'supplier') {
      router.push('/dashboard/supplier');
    } else if (role === 'factory') {
      router.push('/dashboard/factory');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cream-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-elevation">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo size="lg" showTagline={false} />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-deep tracking-tight">
            Sign In to RecyConnect
          </h2>
          <p className="text-xs text-charcoal-muted">
            Access your recyclable materials dashboard, inquiries, and deals
          </p>
        </div>

        {/* Evaluator Quick Demo Bar */}
        <div className="p-3.5 rounded-2xl bg-cream-100 border border-brand-lavender space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted block text-center">
            Evaluator 1-Click Demo Accounts
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('supplier')}
              className="px-2 py-1.5 rounded-xl bg-white hover:bg-brand-subtle border border-border text-[11px] font-bold text-brand-deep flex flex-col items-center gap-1 shadow-xs transition-colors"
            >
              <Truck size={14} className="text-brand-primary" />
              <span>Supplier</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('factory')}
              className="px-2 py-1.5 rounded-xl bg-white hover:bg-teal-50 border border-border text-[11px] font-bold text-teal-dark flex flex-col items-center gap-1 shadow-xs transition-colors"
            >
              <Factory size={14} className="text-teal" />
              <span>Factory</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="px-2 py-1.5 rounded-xl bg-white hover:bg-purple-50 border border-border text-[11px] font-bold text-purple-900 flex flex-col items-center gap-1 shadow-xs transition-colors"
            >
              <Shield size={14} className="text-purple-700" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {/* Standard Email/Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1">
              Work Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 text-charcoal-muted" size={16} />
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
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-charcoal">Password</label>
              <Link href="#" className="text-[11px] text-brand-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 text-charcoal-muted" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-border">
          <p className="text-xs text-charcoal-muted">
            New to RecyConnect?{' '}
            <Link href="/signup" className="font-bold text-brand-primary hover:underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center text-xs text-charcoal-muted">Loading sign in...</div>}>
      <LoginContent />
    </Suspense>
  );
}
