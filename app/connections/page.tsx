'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { store } from '@/lib/store';
import { Connection, ConnectionStatus, UserProfile } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { StatusBadge } from '@/components/StatusBadge';
import { LogisticsModal } from '@/components/LogisticsModal';
import { ReviewModal } from '@/components/ReviewModal';
import {
  Repeat,
  Truck,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Info,
  DollarSign,
  Star,
  MapPin,
  Check,
  XCircle,
} from 'lucide-react';

function ConnectionsContent() {
  const searchParams = useSearchParams();
  const highlightedId = searchParams.get('id');

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedConnId, setSelectedConnId] = useState<string | null>(null);

  // Modals
  const [isLogisticsOpen, setIsLogisticsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [statusUpdateNote, setStatusUpdateNote] = useState('');
  const [newAgreedPrice, setNewAgreedPrice] = useState<string>('');
  const [newAgreedQty, setNewAgreedQty] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const user = store.getCurrentUser();
      setCurrentUser(user);

      if (user) {
        const allConns = store.getConnections();
        const userConns = allConns.filter(
          (c) => c.supplierId === user.id || c.factoryId === user.id || user.accountType === 'admin'
        );
        setConnections(userConns);

        if (highlightedId && userConns.some((c) => c.id === highlightedId)) {
          setSelectedConnId(highlightedId);
        } else if (userConns.length > 0 && !selectedConnId) {
          setSelectedConnId(userConns[0].id);
        }
      }
    };

    update();
    window.addEventListener('recyconnect_store_updated', update);
    return () => window.removeEventListener('recyconnect_store_updated', update);
  }, [highlightedId]);

  const selectedConn = connections.find((c) => c.id === selectedConnId);

  const handleUpdateStatus = (targetStatus: ConnectionStatus) => {
    if (!selectedConn || !currentUser) return;

    const price = newAgreedPrice ? parseFloat(newAgreedPrice) : undefined;
    const qty = newAgreedQty ? parseFloat(newAgreedQty) : undefined;

    store.updateConnectionStatus(
      selectedConn.id,
      targetStatus,
      statusUpdateNote || `Status updated to ${targetStatus.replace('_', ' ')}`,
      currentUser.displayName || currentUser.organizationName,
      qty,
      price
    );

    setStatusUpdateNote('');
    setNewAgreedPrice('');
    setNewAgreedQty('');
  };

  const stages: { key: ConnectionStatus; label: string; number: number }[] = [
    { key: 'inquiry_sent', label: 'Inquiry Sent', number: 1 },
    { key: 'discussion', label: 'Discussion in Progress', number: 2 },
    { key: 'terms_agreed', label: 'Terms Agreed', number: 3 },
    { key: 'logistics_coordination', label: 'Pickup Coordination', number: 4 },
    { key: 'completed', label: 'Completed', number: 5 },
  ];

  const getStageIndex = (status: ConnectionStatus) => {
    switch (status) {
      case 'inquiry_sent':
        return 0;
      case 'discussion':
        return 1;
      case 'terms_agreed':
        return 2;
      case 'logistics_coordination':
        return 3;
      case 'completed':
        return 4;
      default:
        return -1;
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal">
              <Repeat size={14} />
              <span>Deal Lifecycle & Transaction Coordination</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-deep">
              Connections & Status Tracker
            </h1>
          </div>

          {/* Legal Notice */}
          <div className="p-3 rounded-2xl bg-white border border-border text-[11px] text-charcoal-muted max-w-md shadow-xs">
            <strong>RecyConnect Model:</strong> We facilitate discovery and track workflow steps. Counterparties agree on commercial terms directly. RecyConnect does not take ownership of materials.
          </div>
        </div>

        {/* Main Content Layout: Connections List (Left) + Detailed Stepper Workspace (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Connections List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider px-1">
              Active Transactions ({connections.length})
            </h3>

            {connections.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-border shadow-xs text-xs text-charcoal-muted">
                No active connections yet.
              </div>
            ) : (
              connections.map((conn) => {
                const isSelected = conn.id === selectedConnId;
                const counterparty =
                  currentUser?.id === conn.supplierId ? conn.factoryOrg : conn.supplierOrg;

                return (
                  <button
                    key={conn.id}
                    onClick={() => setSelectedConnId(conn.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all space-y-2 ${
                      isSelected
                        ? 'bg-white border-brand-primary shadow-card ring-1 ring-brand-primary/20'
                        : 'bg-white hover:bg-cream-100 border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-charcoal truncate">{counterparty}</span>
                      <StatusBadge status={conn.status} size="sm" />
                    </div>

                    <p className="text-xs text-brand-primary font-semibold truncate">
                      {conn.listingTitle}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-charcoal-muted pt-1 border-t border-border">
                      <span>Volume: {conn.agreedQuantity || conn.requestedQuantity} {conn.requestedUnit}</span>
                      <span className="font-bold text-brand-deep">
                        {conn.agreedPrice
                          ? `${formatCurrency(conn.agreedPrice, conn.currency)} / ${conn.requestedUnit}`
                          : 'Negotiating'}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Connection Workflow Deep Dive */}
          <div className="lg:col-span-7">
            {selectedConn ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-elevation space-y-6">
                {/* Top Title & Counterparty Box */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal">
                      Connection ID: {selectedConn.id}
                    </span>
                    <h2 className="text-lg font-bold text-charcoal mt-0.5">
                      {selectedConn.listingTitle}
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-charcoal-muted mt-1">
                      <span>Supplier: <strong className="text-charcoal">{selectedConn.supplierOrg}</strong></span>
                      <span>·</span>
                      <span>Buyer: <strong className="text-charcoal">{selectedConn.factoryOrg}</strong></span>
                    </div>
                  </div>

                  <StatusBadge status={selectedConn.status} size="md" />
                </div>

                {/* 6-Stage Visual Stepper */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-charcoal-muted tracking-wider">
                    Transaction Workflow Milestones
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                    {stages.map((stg, idx) => {
                      const currentIdx = getStageIndex(selectedConn.status);
                      const isComplete = currentIdx >= idx;
                      const isCurrent = currentIdx === idx;

                      return (
                        <div
                          key={stg.key}
                          className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 ${
                            isCurrent
                              ? 'bg-purple-50 border-brand-primary text-brand-deep font-bold ring-2 ring-brand-primary/20'
                              : isComplete
                              ? 'bg-teal-50 border-teal-200 text-teal-dark font-medium'
                              : 'bg-cream-50 border-border text-charcoal-muted'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isComplete ? 'bg-teal text-white' : 'bg-gray-200 text-charcoal'
                          }`}>
                            {isComplete ? <Check size={12} /> : stg.number}
                          </div>
                          <span className="text-[10px] leading-tight">{stg.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Commercial Terms Summary */}
                <div className="p-4 rounded-2xl bg-cream-50 border border-border grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-charcoal-muted uppercase font-bold block">
                      Agreed Volume
                    </span>
                    <span className="font-bold text-charcoal text-sm">
                      {selectedConn.agreedQuantity || selectedConn.requestedQuantity} {selectedConn.requestedUnit}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-charcoal-muted uppercase font-bold block">
                      Commercial Price
                    </span>
                    <span className="font-bold text-brand-primary text-sm">
                      {selectedConn.agreedPrice
                        ? `${formatCurrency(selectedConn.agreedPrice, selectedConn.currency)} / ${selectedConn.requestedUnit}`
                        : 'Pending Agreement'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-charcoal-muted uppercase font-bold block">
                      Logistics Pickup Date
                    </span>
                    <span className="font-bold text-teal-dark text-sm">
                      {selectedConn.logisticsDetails?.proposedPickupDate
                        ? formatDate(selectedConn.logisticsDetails.proposedPickupDate)
                        : 'Not Scheduled'}
                    </span>
                  </div>
                </div>

                {/* Logistics Coordination Strip */}
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-teal-dark flex items-center gap-1.5">
                      <Truck size={15} />
                      <span>Transport & Dispatch Information</span>
                    </h4>
                    <button
                      onClick={() => setIsLogisticsOpen(true)}
                      className="px-3 py-1 rounded-xl bg-teal text-white text-[11px] font-bold hover:bg-teal-dark transition-colors"
                    >
                      {selectedConn.logisticsDetails ? 'Update Logistics' : 'Schedule Transport'}
                    </button>
                  </div>

                  {selectedConn.logisticsDetails ? (
                    <div className="text-xs text-teal-dark/90 space-y-1 pt-1">
                      <p><strong>Carrier:</strong> {selectedConn.logisticsDetails.carrierName} ({selectedConn.logisticsDetails.transportType})</p>
                      <p><strong>Pickup Site:</strong> {selectedConn.logisticsDetails.pickupAddress}</p>
                      <p><strong>Factory Bay:</strong> {selectedConn.logisticsDetails.deliveryAddress}</p>
                      <p><strong>Handling:</strong> {selectedConn.logisticsDetails.loadingHandlingNotes}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-teal-dark/70">
                      No transport slot booked yet. Click "Schedule Transport" to record pickup time, container type, and carrier info.
                    </p>
                  )}
                </div>

                {/* Status Progression Action Panel */}
                <div className="pt-2 border-t border-border space-y-3">
                  <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                    Update Transaction Lifecycle Status
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {selectedConn.status === 'inquiry_sent' && (
                      <button
                        onClick={() => handleUpdateStatus('discussion')}
                        className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-hover"
                      >
                        Advance to Discussion in Progress
                      </button>
                    )}

                    {selectedConn.status === 'discussion' && (
                      <div className="w-full space-y-2 p-3 bg-purple-50 rounded-2xl border border-brand-lavender">
                        <span className="text-xs font-bold text-brand-primary block">Agree on Final Terms:</span>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            placeholder="Agreed Price ($/unit)"
                            value={newAgreedPrice}
                            onChange={(e) => setNewAgreedPrice(e.target.value)}
                            className="px-3 py-1.5 rounded-xl border border-border text-xs"
                          />
                          <input
                            type="number"
                            placeholder="Agreed Volume"
                            value={newAgreedQty}
                            onChange={(e) => setNewAgreedQty(e.target.value)}
                            className="px-3 py-1.5 rounded-xl border border-border text-xs"
                          />
                        </div>
                        <button
                          onClick={() => handleUpdateStatus('terms_agreed')}
                          className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-hover w-full"
                        >
                          Confirm & Record Agreed Terms
                        </button>
                      </div>
                    )}

                    {selectedConn.status === 'terms_agreed' && (
                      <button
                        onClick={() => handleUpdateStatus('logistics_coordination')}
                        className="px-4 py-2 rounded-xl bg-teal text-white text-xs font-bold hover:bg-teal-dark"
                      >
                        Advance to Pickup / Logistics Coordination
                      </button>
                    )}

                    {selectedConn.status === 'logistics_coordination' && (
                      <button
                        onClick={() => handleUpdateStatus('completed')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                      >
                        Confirm Delivery Received (Mark Completed)
                      </button>
                    )}

                    {selectedConn.status === 'completed' && (
                      <button
                        onClick={() => setIsReviewOpen(true)}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <Star size={14} className="fill-white" />
                        <span>Post Transaction Review</span>
                      </button>
                    )}

                    {selectedConn.status !== 'completed' && selectedConn.status !== 'cancelled' && (
                      <button
                        onClick={() => handleUpdateStatus('cancelled')}
                        className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                      >
                        Cancel Deal
                      </button>
                    )}

                    <Link
                      href="/messages"
                      className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-charcoal hover:bg-cream-100 flex items-center gap-1.5 ml-auto"
                    >
                      <MessageSquare size={14} />
                      <span>Chat Thread</span>
                    </Link>
                  </div>
                </div>

                {/* Audit History Timeline */}
                <div className="pt-4 border-t border-border space-y-3">
                  <h4 className="text-xs font-bold uppercase text-charcoal-muted tracking-wider">
                    Status History & Audit Log
                  </h4>

                  <div className="space-y-2 divide-y divide-border/60">
                    {selectedConn.statusHistory.map((h, i) => (
                      <div key={i} className="pt-2 text-xs flex items-start justify-between gap-4">
                        <div>
                          <span className="font-bold text-charcoal capitalize">
                            {h.status.replace('_', ' ')}
                          </span>
                          <p className="text-charcoal-muted text-[11px] mt-0.5">{h.note}</p>
                          <span className="text-[10px] text-charcoal-muted">Updated by: {h.updatedBy}</span>
                        </div>
                        <span className="text-[10px] text-charcoal-muted flex-shrink-0">
                          {formatDate(h.updatedAt)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-border text-xs text-charcoal-muted">
                Select a transaction from the left to view the deal tracker.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logistics Modal */}
      {currentUser && (
        <LogisticsModal
          connection={selectedConn || null}
          currentUser={currentUser}
          isOpen={isLogisticsOpen}
          onClose={() => setIsLogisticsOpen(false)}
          onUpdated={(updated) => {
            // Updated in memory store
          }}
        />
      )}

      {/* Review Modal */}
      {currentUser && (
        <ReviewModal
          connection={selectedConn || null}
          currentUser={currentUser}
          isOpen={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          onReviewed={() => {
            alert('Review submitted! Counterparty profile updated.');
          }}
        />
      )}
    </div>
  );
}

export default function ConnectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-50 flex items-center justify-center text-xs text-charcoal-muted">Loading transaction tracker...</div>}>
      <ConnectionsContent />
    </Suspense>
  );
}
