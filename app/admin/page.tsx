'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { store, DEMO_USERS } from '@/lib/store';
import {
  UserProfile,
  VerificationRequest,
  MaterialListing,
  AbuseReport,
  Connection,
} from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { VerificationBadge } from '@/components/VerificationBadge';
import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Package,
  Repeat,
  Users,
  Eye,
  Trash2,
  TrendingUp,
  FileText,
  Lock,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([]);
  const [listings, setListings] = useState<MaterialListing[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [abuseReports, setAbuseReports] = useState<AbuseReport[]>([]);
  const [activeTab, setActiveTab] = useState<'verifications' | 'listings' | 'reports'>('verifications');

  // Admin action states
  const [reviewModalReq, setReviewModalReq] = useState<VerificationRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    const update = () => {
      const user = store.getCurrentUser();
      setCurrentUser(user);
      setVerificationRequests(store.getVerificationRequests());
      setListings(store.getListings());
      setConnections(store.getConnections());
      setAbuseReports(store.getAbuseReports());
    };

    update();
    window.addEventListener('recyconnect_store_updated', update);
    return () => window.removeEventListener('recyconnect_store_updated', update);
  }, []);

  const handleApproveVerification = (reqId: string) => {
    store.reviewVerification(reqId, 'verified', adminNotes || 'Corporate registration and operating licenses verified against state registry.');
    setReviewModalReq(null);
    setAdminNotes('');
  };

  const handleRejectVerification = (reqId: string) => {
    store.reviewVerification(reqId, 'rejected', adminNotes || 'Additional environmental consent documentation required.');
    setReviewModalReq(null);
    setAdminNotes('');
  };

  const handleToggleListingPublish = (listing: MaterialListing) => {
    store.updateListing(listing.id, { isPublished: !listing.isPublished });
  };

  const handleResolveReport = (reportId: string, status: 'resolved' | 'dismissed') => {
    store.resolveAbuseReport(reportId, status);
  };

  const handleSwitchToAdmin = () => {
    store.switchUserPersona('admin');
  };

  // Real activity metrics calculations
  const totalVolumeMatched = connections
    .filter((c) => c.status === 'completed' || c.status === 'logistics_coordination')
    .reduce((acc, c) => acc + (c.agreedQuantity || c.requestedQuantity || 0), 0);

  const pendingVerificationCount = verificationRequests.filter((r) => r.status === 'pending_review').length;
  const pendingReportsCount = abuseReports.filter((r) => r.status === 'pending').length;

  if (currentUser?.accountType !== 'admin') {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6 bg-cream-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-border shadow-elevation text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mx-auto">
            <Lock size={28} />
          </div>
          <h2 className="text-xl font-bold text-charcoal">Compliance Portal Access Restricted</h2>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            You are currently browsing as a <strong>{currentUser?.accountType}</strong>. Administrative features require platform compliance authorization.
          </p>
          <button
            onClick={handleSwitchToAdmin}
            className="w-full py-2.5 rounded-xl bg-brand-deep text-white text-xs font-bold hover:bg-brand-primary transition-colors flex items-center justify-center gap-2"
          >
            <Shield size={14} />
            <span>Switch to Admin Persona (Marcus Vance)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
                Compliance & Operations Portal
              </span>
              <span className="text-xs text-teal font-semibold">Active Session: {currentUser.displayName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-deep">
              Platform Administration
            </h1>
          </div>
        </div>

        {/* Real Platform KPI Metrics (No fabricated data) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-border shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Verifications Queue</span>
            <div className="text-2xl font-extrabold text-amber-600">{pendingVerificationCount} Pending</div>
            <p className="text-[10px] text-charcoal-muted">Awaiting document audit</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-border shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-teal-dark uppercase tracking-wider">Active Inventory</span>
            <div className="text-2xl font-extrabold text-teal">{listings.filter((l) => l.isPublished).length} Lots</div>
            <p className="text-[10px] text-charcoal-muted">Published across pilot</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-border shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider">Total Deals</span>
            <div className="text-2xl font-extrabold text-brand-primary">{connections.length}</div>
            <p className="text-[10px] text-charcoal-muted">Facilitated connections</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-border shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">Volume Matched</span>
            <div className="text-2xl font-extrabold text-blue-600">{totalVolumeMatched} Tonnes</div>
            <p className="text-[10px] text-charcoal-muted">In transit or delivered</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-border shadow-xs space-y-1 col-span-2 lg:col-span-1">
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">Abuse Reports</span>
            <div className="text-2xl font-extrabold text-rose-600">{pendingReportsCount}</div>
            <p className="text-[10px] text-charcoal-muted">Moderation flags</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="border-b border-border flex items-center gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'verifications'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <ShieldCheck size={15} />
            <span>Verification Queue ({verificationRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'listings'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <Package size={15} />
            <span>Listings Moderation ({listings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'reports'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <AlertTriangle size={15} />
            <span>Abuse Reports ({abuseReports.length})</span>
          </button>
        </div>

        {/* TAB 1: VERIFICATION REQUESTS QUEUE */}
        {activeTab === 'verifications' && (
          <div className="bg-white rounded-3xl p-6 border border-border shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-charcoal">Enterprise Verification Applications</h3>
            <div className="divide-y divide-border">
              {verificationRequests.map((req) => (
                <div key={req.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-charcoal">{req.userOrg}</h4>
                      <span className="text-xs text-charcoal-muted capitalize">({req.accountType})</span>
                      <VerificationBadge status={req.status} size="sm" />
                    </div>
                    <p className="text-xs text-charcoal-muted">
                      Registration: <strong className="text-charcoal">{req.registrationNumber}</strong> · Operating since {req.operatingSinceYear}
                    </p>
                    <div className="text-[11px] text-teal-dark flex items-center gap-3 pt-1">
                      <span>📄 License: {req.businessLicenseDocRef}</span>
                      {req.environmentalPermitDocRef && <span>🌿 Permit: {req.environmentalPermitDocRef}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {req.status === 'pending_review' ? (
                      <>
                        <button
                          onClick={() => {
                            setReviewModalReq(req);
                            setAdminNotes('Business registration and state pollution license authenticated.');
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-teal text-white text-xs font-bold hover:bg-teal-dark transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 size={13} />
                          <span>Approve & Verify</span>
                        </button>
                        <button
                          onClick={() => {
                            setReviewModalReq(req);
                            setAdminNotes('Additional certified tax receipt or updated pollution consent required.');
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-charcoal-muted capitalize font-medium">
                        Audited ({req.status})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LISTINGS MODERATION */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-3xl p-6 border border-border shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-charcoal">Marketplace Listings Moderation</h3>
            <div className="divide-y divide-border">
              {listings.map((l) => (
                <div key={l.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <Link href={`/materials/${l.id}`} className="hover:underline">
                      <h4 className="text-xs font-bold text-charcoal truncate">{l.title}</h4>
                    </Link>
                    <p className="text-[11px] text-charcoal-muted">
                      {l.supplierOrg} · {l.quantity} {l.unit} · {l.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggleListingPublish(l)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                        l.isPublished
                          ? 'bg-emerald-50 text-emerald-800 hover:bg-rose-50 hover:text-rose-700'
                          : 'bg-gray-200 text-charcoal hover:bg-emerald-100'
                      }`}
                    >
                      {l.isPublished ? 'Published (Click to Suspend)' : 'Suspended (Click to Publish)'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ABUSE REPORTS */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-3xl p-6 border border-border shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-charcoal">Reported Transactions & Counterparties</h3>
            {abuseReports.length === 0 ? (
              <p className="text-xs text-charcoal-muted py-6 text-center">No abuse reports pending.</p>
            ) : (
              <div className="divide-y divide-border">
                {abuseReports.map((rep) => (
                  <div key={rep.id} className="py-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-700">Flag: {rep.reason}</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-cream-200 text-charcoal">
                        Status: {rep.status}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal">{rep.details}</p>
                    <p className="text-[10px] text-charcoal-muted">
                      Reported by {rep.reporterName} · Entity: {rep.entityTitleOrSnippet}
                    </p>
                    {rep.status === 'pending' && (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handleResolveReport(rep.id, 'resolved')}
                          className="px-3 py-1 rounded-lg bg-teal text-white text-xs font-bold"
                        >
                          Resolve & Warn User
                        </button>
                        <button
                          onClick={() => handleResolveReport(rep.id, 'dismissed')}
                          className="px-3 py-1 rounded-lg border border-border text-xs text-charcoal"
                        >
                          Dismiss Report
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Verification Decision Modal */}
      {reviewModalReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-elevation space-y-4">
            <h3 className="text-sm font-bold text-charcoal">
              Audit Decision: {reviewModalReq.userOrg}
            </h3>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Compliance Officer Feedback & Registration Notes *
              </label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border text-xs"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setReviewModalReq(null)}
                className="px-3.5 py-1.5 rounded-xl border border-border text-xs text-charcoal"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRejectVerification(reviewModalReq.id)}
                className="px-4 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold"
              >
                Reject Application
              </button>
              <button
                onClick={() => handleApproveVerification(reviewModalReq.id)}
                className="px-4 py-1.5 rounded-xl bg-teal text-white text-xs font-bold"
              >
                Approve Verified Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
