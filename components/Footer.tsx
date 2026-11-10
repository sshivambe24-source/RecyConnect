import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { MapPin, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-cream-100 pt-16 pb-12 border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="brightness-150 invert-[0.1]">
              <Logo size="md" showTagline={true} linkToHome={true} />
            </div>
            <p className="text-sm text-cream-200/80 leading-relaxed max-w-sm">
              RecyConnect is a modern digital marketplace connecting suppliers of industrial and commercial recyclable waste with verified recycling factories. Facilitating transparency, discovery, and streamlined trade coordination.
            </p>

            <div className="flex items-center gap-2 text-xs text-teal-100 bg-teal/20 px-3 py-1.5 rounded-full border border-teal/40 w-fit">
              <MapPin size={13} className="text-teal-accent" />
              <span>Pilot Region: Maharashtra Industrial Corridor (Pune / Chakan / Pimpri)</span>
            </div>

            <div className="text-xs text-cream-200/60 pt-2 space-y-1">
              <p>Platform note: RecyConnect does not take physical ownership of materials and does not operate transport fleets.</p>
            </div>
          </div>

          {/* Marketplace Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-lavender">
              Marketplace
            </h4>
            <ul className="space-y-2 text-sm text-cream-200/80">
              <li>
                <Link href="/materials" className="hover:text-white transition-colors">
                  Explore Materials
                </Link>
              </li>
              <li>
                <Link href="/materials?category=paper" className="hover:text-white transition-colors">
                  Paper & OCC Cardboard
                </Link>
              </li>
              <li>
                <Link href="/materials?category=plastics" className="hover:text-white transition-colors">
                  Polymers & PET Flakes
                </Link>
              </li>
              <li>
                <Link href="/materials?category=metals" className="hover:text-white transition-colors">
                  Ferrous & Non-Ferrous Scrap
                </Link>
              </li>
              <li>
                <Link href="/materials?category=e-waste" className="hover:text-white transition-colors">
                  Telecom & PCB E-Waste
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-lavender">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm text-cream-200/80">
              <li>
                <Link href="/#suppliers" className="hover:text-white transition-colors">
                  For Material Suppliers
                </Link>
              </li>
              <li>
                <Link href="/#factories" className="hover:text-white transition-colors">
                  For Recycling Factories
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How Matching Works
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  Enterprise Verification
                </Link>
              </li>
              <li>
                <Link href="/connections" className="hover:text-white transition-colors">
                  Transaction Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-lavender">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-sm text-cream-200/80">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About RecyConnect
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors inline-flex items-center gap-1 text-xs text-cream-200/50 hover:text-brand-lavender">
                  <span>Compliance Portal</span>
                  <ArrowUpRight size={12} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
          <p>© {new Date().getFullYear()} RecyConnect Inc. All rights reserved. Connect · Recycle · Impact.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-teal-accent">
              <span className="h-2 w-2 rounded-full bg-teal-accent animate-pulse" />
              Pilot Live · Pune Industrial Hub
            </span>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
