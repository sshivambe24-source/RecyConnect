'use client';

import React, { useState } from 'react';
import { Connection, LogisticsDetails, UserProfile } from '@/lib/types';
import { store } from '@/lib/store';
import { X, Truck, Calendar, MapPin, CheckCircle, Info } from 'lucide-react';

interface LogisticsModalProps {
  connection: Connection | null;
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (conn: Connection) => void;
}

export const LogisticsModal: React.FC<LogisticsModalProps> = ({
  connection,
  currentUser,
  isOpen,
  onClose,
  onUpdated,
}) => {
  if (!isOpen || !connection) return null;

  const existing = connection.logisticsDetails;

  const [pickupAddress, setPickupAddress] = useState(existing?.pickupAddress || 'Apex Industrial Yard 4, Sector 7, Bhosari, Pune');
  const [deliveryAddress, setDeliveryAddress] = useState(existing?.deliveryAddress || 'Factory Intake Bay 2, Chakan MIDC Phase 1, Pune');
  const [proposedPickupDate, setProposedPickupDate] = useState(existing?.proposedPickupDate || new Date().toISOString().split('T')[0]);
  const [transportType, setTransportType] = useState(existing?.transportType || '32ft Multi-Axle Covered Container');
  const [loadingHandlingNotes, setLoadingHandlingNotes] = useState(existing?.loadingHandlingNotes || 'Supplier forklift loaded. Advance weighbridge ticket required.');
  const [carrierName, setCarrierName] = useState(existing?.carrierName || 'Sahyadri Freight & Logistics Solutions');
  const [carrierContact, setCarrierContact] = useState(existing?.carrierContact || '+91 94220 55198');
  const [coordinationStatus, setCoordinationStatus] = useState<LogisticsDetails['coordinationStatus']>(
    existing?.coordinationStatus || 'scheduled'
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const logistics: LogisticsDetails = {
      pickupAddress,
      deliveryAddress,
      proposedPickupDate,
      transportType,
      loadingHandlingNotes,
      carrierName,
      carrierContact,
      coordinationStatus,
    };

    const updated = store.updateLogistics(
      connection.id,
      logistics,
      currentUser.displayName || currentUser.organizationName
    );

    if (updated) {
      onUpdated(updated);
    }
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="craft-card rounded-3xl max-w-xl w-full shadow-elevation border border-craft-border overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-cream-50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-dark">
              <Truck size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-charcoal">Logistics & Transport Coordination</h3>
              <p className="text-xs text-charcoal-muted truncate max-w-xs">{connection.listingTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-cream-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Notice Strip */}
        <div className="px-6 py-2.5 bg-teal-50 border-b border-teal-100 flex items-start gap-2 text-xs text-teal-dark">
          <Info size={15} className="text-teal flex-shrink-0 mt-0.5" />
          <p>
            <strong>Logistics Notice:</strong> RecyConnect coordinates transport details between participants and does not operate physical freight fleets. Commercial carriers are booked independently by the parties.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Proposed Pickup Date */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1">
                <Calendar size={13} className="text-brand-primary" />
                Proposed Pickup Date *
              </label>
              <input
                type="date"
                value={proposedPickupDate}
                onChange={(e) => setProposedPickupDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                required
              />
            </div>

            {/* Coordination Status */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Coordination Status *
              </label>
              <select
                value={coordinationStatus}
                onChange={(e) => setCoordinationStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary capitalize"
              >
                <option value="planning">Planning & Quote</option>
                <option value="scheduled">Scheduled Slot Confirmed</option>
                <option value="in_transit">In Transit to Factory</option>
                <option value="delivered">Delivered & Weighed</option>
              </select>
            </div>
          </div>

          {/* Pickup Address */}
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1">
              <MapPin size={13} className="text-brand-primary" />
              Pickup Origin Address (Supplier Site) *
            </label>
            <input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="Full yard address, gate number, and landmarks"
              className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              required
            />
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1">
              <MapPin size={13} className="text-teal" />
              Delivery Destination (Factory / Mill Intake) *
            </label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Factory address, intake bay number"
              className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Transport Type */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Vehicle / Transport Specification
              </label>
              <input
                type="text"
                value={transportType}
                onChange={(e) => setTransportType(e.target.value)}
                placeholder="e.g. 32ft Container, 10-Ton Flatbed, Buyer Truck"
                className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
            </div>

            {/* Carrier Info */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Third-Party Carrier / Driver Contact
              </label>
              <input
                type="text"
                value={carrierName}
                onChange={(e) => setCarrierName(e.target.value)}
                placeholder="Carrier name & vehicle number"
                className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
            </div>
          </div>

          {/* Loading Notes */}
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1">
              Loading & Handling Protocols
            </label>
            <textarea
              rows={3}
              value={loadingHandlingNotes}
              onChange={(e) => setLoadingHandlingNotes(e.target.value)}
              placeholder="e.g. Forklift on site, safety helmet required, driver must report to security weighbridge before loading..."
              className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-border flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-charcoal hover:bg-cream-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-teal-dark hover:bg-teal text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle size={14} />
              <span>{isSaving ? 'Saving...' : 'Save Logistics Plan'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
