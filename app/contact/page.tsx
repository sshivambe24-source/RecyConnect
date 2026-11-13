'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [subject, setSubject] = useState('General Platform Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setOrg('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="bg-forest-900 forest-grid-bg min-h-screen py-12 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-craft-yellow">Support & Operations</span>
          <h1 className="text-3xl font-extrabold text-white">Contact RecyConnect Operations</h1>
          <p className="text-xs text-forest-100/90 max-w-xl mx-auto">
            Get in touch with our marketplace operations team in Western Maharashtra for pilot onboarding, factory integrations, or dispute resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-charcoal">
          {/* Contact Details */}
          <div className="md:col-span-5 craft-card rounded-3xl p-8 border border-craft-border shadow-elevation space-y-6">
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
              Pilot Headquarters
            </h3>

            <div className="space-y-4 text-xs text-charcoal-light">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal block">Regional Operations Center</strong>
                  <span>Hinjewadi Tech Corridor Phase 1, Pune, Maharashtra 411057</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} className="text-teal flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal block">Operations & Support Email</strong>
                  <span>support@recyconnect.internal</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal block">Compliance Desk</strong>
                  <span>+91 20 4910 8820 (Mon - Fri, 09:00 - 18:00 IST)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border text-[11px] text-charcoal-muted">
              For technical integration requests or state recycling cooperative partnerships, our team responds within 24 business hours.
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 craft-card rounded-3xl p-8 border border-craft-border shadow-elevation text-charcoal">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-base font-bold text-charcoal">Message Dispatched</h3>
                <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                  Thank you for reaching out. A RecyConnect operations officer will review your inquiry and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-sm font-bold text-charcoal mb-2">Send an Inquiry or Feedback</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">Company / Facility *</label>
                    <input
                      type="text"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="e.g. GreenCycle Mills"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">Work Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">Subject Area *</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    >
                      <option value="General Platform Inquiry">General Platform Inquiry</option>
                      <option value="Factory Sourcing Pilot Onboarding">Factory Sourcing Pilot Onboarding</option>
                      <option value="Supplier Verification Assistance">Supplier Verification Assistance</option>
                      <option value="Report Marketplace Discrepancy">Report Marketplace Discrepancy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your query or facility requirements..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary leading-relaxed"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Send size={13} />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
