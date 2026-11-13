'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { store } from '@/lib/store';
import { MaterialListing, Connection, UserProfile, MaterialCategory, MaterialUnit, AvailabilityStatus, PriceType } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { VerificationBadge } from '@/components/VerificationBadge';
import { StatusBadge } from '@/components/StatusBadge';
import {
  PlusCircle,
  Package,
  Repeat,
  MessageSquare,
  CheckCircle2,
  Trash2,
  Edit,
  Eye,
  X,
  Send,
  AlertCircle,
  Truck,
  TrendingUp,
  Clock,
  Layers,
  MapPin,
  ExternalLink,
} from 'lucide-react';

function SupplierDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const actionParam = searchParams.get('action');
  const editParam = searchParams.get('edit');

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [myListings, setMyListings] = useState<MaterialListing[]>([]);
  const [myConnections, setMyConnections] = useState<Connection[]>([]);
  const [categories, setCategories] = useState<MaterialCategory[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'inquiries'>('overview');

  // Create / Edit Listing Modal
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [editingListingId, setEditingListingId] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategorySlug, setFormCategorySlug] = useState('paper');
  const [formDescription, setFormDescription] = useState('');
  const [formQuantity, setFormQuantity] = useState<number>(20);
  const [formUnit, setFormUnit] = useState<MaterialUnit>('tonnes');
  const [formQualityGrade, setFormQualityGrade] = useState('Grade A - Sorted Clean');
  const [formConditionNotes, setFormConditionNotes] = useState('Baled, dry warehouse stored, moisture < 6%');
  const [formLocation, setFormLocation] = useState('Bhosari Industrial Area, Sector 7');
  const [formRegion, setFormRegion] = useState('Pune, Maharashtra');
  const [formAvailability, setFormAvailability] = useState<AvailabilityStatus>('ready_now');
  const [formAskingPrice, setFormAskingPrice] = useState<string>('200');
  const [formPriceType, setFormPriceType] = useState<PriceType>('negotiable');
  const [formPickupNotes, setFormPickupNotes] = useState('Forklift and loading bay available. 24h advance scheduling.');
  const [formImageUrl, setFormImageUrl] = useState('');

  useEffect(() => {
    const update = () => {
      const user = store.getCurrentUser();
      setCurrentUser(user);

      if (user) {
        const allListings = store.getListings();
        setMyListings(allListings.filter((l) => l.supplierId === user.id));

        const allConns = store.getConnections();
        setMyConnections(allConns.filter((c) => c.supplierId === user.id));
      }
      setCategories(store.getCategories());
    };

    update();
    window.addEventListener('recyconnect_store_updated', update);
    return () => window.removeEventListener('recyconnect_store_updated', update);
  }, []);

  // Handle URL triggers (e.g. ?action=new-listing or ?edit=id)
  useEffect(() => {
    if (actionParam === 'new-listing') {
      openCreateListing();
    }
    if (editParam) {
      const target = store.getListing(editParam);
      if (target) openEditListing(target);
    }
  }, [actionParam, editParam]);

  const openCreateListing = () => {
    setEditingListingId(null);
    setFormTitle('');
    setFormCategorySlug('paper');
    setFormDescription('');
    setFormQuantity(15);
    setFormUnit('tonnes');
    setFormQualityGrade('Grade A - Sorted Clean');
    setFormConditionNotes('');
    setFormLocation(currentUser?.cityRegion || 'Pune, Maharashtra');
    setFormRegion('Pune, Maharashtra');
    setFormAvailability('ready_now');
    setFormAskingPrice('20000');
    setFormPriceType('negotiable');
    setFormPickupNotes('Forklift loading available on-site.');
    setFormImageUrl('');
    setIsListingModalOpen(true);
  };

  const openEditListing = (listing: MaterialListing) => {
    setEditingListingId(listing.id);
    setFormTitle(listing.title);
    setFormCategorySlug(listing.categorySlug);
    setFormDescription(listing.description);
    setFormQuantity(listing.quantity);
    setFormUnit(listing.unit);
    setFormQualityGrade(listing.qualityGrade);
    setFormConditionNotes(listing.conditionNotes);
    setFormLocation(listing.location);
    setFormRegion(listing.region);
    setFormAvailability(listing.availabilityStatus);
    setFormAskingPrice(listing.askingPrice ? listing.askingPrice.toString() : '');
    setFormPriceType(listing.priceType);
    setFormPickupNotes(listing.pickupDeliveryNotes);
    setFormImageUrl(listing.images?.[0] || '');
    setIsListingModalOpen(true);
  };

  const handleSaveListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const cat = categories.find((c) => c.slug === formCategorySlug) || categories[0];

    const defaultImages = {
      paper: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80',
      plastics: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1000&q=80',
      metals: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80',
      'e-waste': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
      other: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80',
    };

    const chosenImage = formImageUrl.trim() || (defaultImages as any)[formCategorySlug] || defaultImages.paper;

    if (editingListingId) {
      // Update existing
      store.updateListing(editingListingId, {
        title: formTitle,
        categoryId: cat.id,
        categorySlug: cat.slug,
        categoryName: cat.name,
        description: formDescription,
        quantity: formQuantity,
        unit: formUnit,
        qualityGrade: formQualityGrade,
        conditionNotes: formConditionNotes,
        location: formLocation,
        region: formRegion,
        availabilityStatus: formAvailability,
        askingPrice: formAskingPrice ? parseFloat(formAskingPrice) : null,
        priceType: formPriceType,
        images: [chosenImage],
        pickupDeliveryNotes: formPickupNotes,
      });
    } else {
      // Create new
      store.createListing({
        supplierId: currentUser.id,
        supplierName: currentUser.displayName,
        supplierOrg: currentUser.organizationName,
        supplierVerified: currentUser.verificationStatus === 'verified',
        supplierRating: currentUser.rating || 5.0,
        title: formTitle,
        categoryId: cat.id,
        categorySlug: cat.slug,
        categoryName: cat.name,
        description: formDescription,
        quantity: formQuantity,
        unit: formUnit,
        qualityGrade: formQualityGrade,
        conditionNotes: formConditionNotes,
        location: formLocation,
        region: formRegion,
        availabilityStatus: formAvailability,
        askingPrice: formAskingPrice ? parseFloat(formAskingPrice) : null,
        currency: 'INR',
        priceType: formPriceType,
        images: [chosenImage],
        pickupDeliveryNotes: formPickupNotes,
        isPublished: true,
      });
    }

    setIsListingModalOpen(false);
  };

  const handleToggleSold = (listing: MaterialListing) => {
    const nextStatus = listing.availabilityStatus === 'sold' ? 'ready_now' : 'sold';
    store.updateListing(listing.id, { availabilityStatus: nextStatus });
  };

  const handleDeleteListing = (id: string) => {
    if (confirm('Are you sure you want to delete this material listing?')) {
      store.deleteListing(id);
    }
  };

  // Metrics calculation
  const totalListings = myListings.length;
  const activeListings = myListings.filter((l) => l.isPublished && l.availabilityStatus !== 'sold').length;
  const inquiriesCount = myConnections.length;
  const activeConnectionsCount = myConnections.filter((c) => c.status !== 'completed' && c.status !== 'cancelled').length;
  const completedCount = myConnections.filter((c) => c.status === 'completed').length;

  return (
    <div className="bg-forest-900 forest-grid-bg min-h-screen py-8 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dashboard Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md masking-tape text-forest-950 text-xs font-bold uppercase tracking-wider border border-craft-border">
                Supplier Workspace
              </span>
              {currentUser?.verificationStatus && (
                <VerificationBadge status={currentUser.verificationStatus} size="sm" />
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {currentUser?.organizationName || 'Supplier Dashboard'}
            </h1>
            <p className="text-xs text-forest-100/90">
              Manage recyclable material inventory lots, respond to buyer inquiries, and coordinate dispatches.
            </p>
          </div>

          <button
            onClick={openCreateListing}
            className="px-5 py-2.5 rounded-full bg-craft-yellow hover:bg-craft-ochre text-forest-950 text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <PlusCircle size={16} />
            <span>Create Material Listing</span>
          </button>
        </div>

        {/* Real KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="craft-card rounded-2xl p-5 border border-craft-border shadow-card space-y-1">
            <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider">Total Lots</span>
            <div className="text-2xl font-extrabold text-forest-900">{totalListings}</div>
            <p className="text-[10px] text-charcoal-muted">All published items</p>
          </div>

          <div className="craft-card rounded-2xl p-5 border border-craft-border shadow-card space-y-1">
            <span className="text-[11px] font-bold text-forest-700 uppercase tracking-wider">Active Lots</span>
            <div className="text-2xl font-extrabold text-forest-700">{activeListings}</div>
            <p className="text-[10px] text-charcoal-muted">Ready for procurement</p>
          </div>

          <div className="craft-card rounded-2xl p-5 border border-craft-border shadow-card space-y-1">
            <span className="text-[11px] font-bold text-forest-800 uppercase tracking-wider">Inquiries</span>
            <div className="text-2xl font-extrabold text-forest-800">{inquiriesCount}</div>
            <p className="text-[10px] text-charcoal-muted">From recycling mills</p>
          </div>

          <div className="craft-card rounded-2xl p-5 border border-craft-border shadow-card space-y-1">
            <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">In Progress</span>
            <div className="text-2xl font-extrabold text-blue-600">{activeConnectionsCount}</div>
            <p className="text-[10px] text-charcoal-muted">Negotiation & logistics</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-border shadow-xs space-y-1 col-span-2 lg:col-span-1">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Completed</span>
            <div className="text-2xl font-extrabold text-emerald-600">{completedCount}</div>
            <p className="text-[10px] text-charcoal-muted">Delivered transactions</p>
          </div>
        </div>

        {/* Dashboard Tabs Navigation */}
        <div className="border-b border-border flex items-center gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <TrendingUp size={15} />
            <span>Overview & Activity</span>
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
            <span>My Material Listings ({myListings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <Repeat size={15} />
            <span>Inquiries & Connections ({myConnections.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & ACTIVITY */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Active Listings Quick Review */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-charcoal">Active Material Listings</h3>
                <button
                  onClick={() => setActiveTab('listings')}
                  className="text-xs font-semibold text-brand-primary hover:underline"
                >
                  Manage all
                </button>
              </div>

              {myListings.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-border shadow-xs space-y-3">
                  <Package size={32} className="mx-auto text-charcoal-muted" />
                  <p className="text-xs text-charcoal-muted">You haven't listed any recyclable materials yet.</p>
                  <button
                    onClick={openCreateListing}
                    className="px-4 py-2 rounded-full bg-brand-primary text-white text-xs font-bold"
                  >
                    List First Material
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myListings.slice(0, 4).map((listing) => (
                    <div
                      key={listing.id}
                      className="bg-white rounded-2xl p-4 border border-border shadow-xs flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 rounded-xl bg-cream-200 overflow-hidden flex-shrink-0">
                          {listing.images?.[0] ? (
                            <Image src={listing.images[0]} alt="" fill className="object-cover" />
                          ) : (
                            <Package className="p-2 text-charcoal-muted" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link href={`/materials/${listing.id}`} className="hover:underline">
                            <h4 className="text-xs font-bold text-charcoal truncate">{listing.title}</h4>
                          </Link>
                          <p className="text-[11px] text-charcoal-muted">
                            {listing.quantity} {listing.unit} · {listing.qualityGrade} ·{' '}
                            <span className="font-semibold text-brand-primary">
                              {formatCurrency(listing.askingPrice, listing.currency)}/{listing.unit}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                          listing.availabilityStatus === 'sold'
                            ? 'bg-gray-100 text-charcoal-muted'
                            : 'bg-emerald-50 text-emerald-800'
                        }`}>
                          {listing.availabilityStatus.replace('_', ' ')}
                        </span>
                        <button
                          onClick={() => openEditListing(listing)}
                          className="p-1.5 rounded-lg text-charcoal-muted hover:text-brand-primary hover:bg-cream-100"
                        >
                          <Edit size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Inquiries & Activity Feed */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-charcoal">Recent Inquiries & Deals</h3>
                <Link href="/connections" className="text-xs font-semibold text-brand-primary hover:underline">
                  View full tracker
                </Link>
              </div>

              {myConnections.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-border shadow-xs">
                  <p className="text-xs text-charcoal-muted">No buyer inquiries received yet.</p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-5 border border-border shadow-xs space-y-3">
                  {myConnections.slice(0, 4).map((conn) => (
                    <div
                      key={conn.id}
                      className="p-3 rounded-2xl bg-cream-50 border border-border space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-charcoal">{conn.factoryOrg}</span>
                        <StatusBadge status={conn.status} size="sm" />
                      </div>
                      <p className="text-[11px] text-charcoal-muted truncate">{conn.listingTitle}</p>
                      <div className="flex items-center justify-between pt-1 border-t border-border/60 text-[10px] text-charcoal-muted">
                        <span>Requested: {conn.requestedQuantity} {conn.requestedUnit}</span>
                        <Link
                          href={`/connections?id=${conn.id}`}
                          className="text-brand-primary font-bold hover:underline"
                        >
                          Open Deal →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MY MATERIAL LISTINGS (FULL CRUD) */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-charcoal-muted">
                Showing all material lots published under {currentUser?.organizationName}
              </span>
              <button
                onClick={openCreateListing}
                className="px-4 py-2 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center gap-1.5"
              >
                <PlusCircle size={15} />
                <span>Add New Listing</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-card transition-shadow flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-cream-200">
                    <Image
                      src={listing.images?.[0] || 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80'}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        listing.availabilityStatus === 'sold'
                          ? 'bg-gray-200 text-charcoal-muted'
                          : 'bg-white/95 text-teal-dark border border-teal-200 shadow-xs'
                      }`}>
                        {listing.availabilityStatus.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-brand-primary">
                        {listing.categoryName}
                      </span>
                      <h4 className="text-sm font-bold text-charcoal line-clamp-1">{listing.title}</h4>
                      <p className="text-xs text-charcoal-muted mt-1">
                        {listing.quantity} {listing.unit} · {listing.qualityGrade}
                      </p>
                      <p className="text-xs font-extrabold text-brand-deep mt-1">
                        {formatCurrency(listing.askingPrice, listing.currency)} / {listing.unit}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleToggleSold(listing)}
                        className={`text-[11px] font-semibold hover:underline ${
                          listing.availabilityStatus === 'sold' ? 'text-teal' : 'text-charcoal-muted'
                        }`}
                      >
                        {listing.availabilityStatus === 'sold' ? 'Mark Available' : 'Mark as Sold'}
                      </button>

                      <div className="flex items-center gap-1">
                        <Link
                          href={`/materials/${listing.id}`}
                          className="p-1.5 rounded-lg text-charcoal-muted hover:text-brand-primary"
                          title="View Public Page"
                        >
                          <Eye size={15} />
                        </Link>
                        <button
                          onClick={() => openEditListing(listing)}
                          className="p-1.5 rounded-lg text-charcoal-muted hover:text-brand-primary"
                          title="Edit Listing"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteListing(listing.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                          title="Delete Listing"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INQUIRIES & CONNECTIONS */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-border shadow-xs">
              <h3 className="text-sm font-bold text-charcoal mb-4">Inquiries Received from Recycling Factories</h3>
              {myConnections.length === 0 ? (
                <p className="text-xs text-charcoal-muted py-6 text-center">
                  No buyer inquiries received yet. Published listings appear in search immediately.
                </p>
              ) : (
                <div className="space-y-4">
                  {myConnections.map((conn) => (
                    <div
                      key={conn.id}
                      className="p-4 rounded-2xl bg-cream-50 border border-border space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-charcoal">{conn.factoryOrg}</h4>
                            <span className="text-xs text-charcoal-muted">({conn.factoryName})</span>
                          </div>
                          <p className="text-xs text-brand-primary font-semibold">{conn.listingTitle}</p>
                        </div>
                        <StatusBadge status={conn.status} />
                      </div>

                      <div className="p-3 rounded-xl bg-white text-xs text-charcoal-light italic border border-border/60">
                        "{conn.initialMessage}"
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-charcoal-muted pt-1">
                        <span>Requested Volume: <strong>{conn.requestedQuantity} {conn.requestedUnit}</strong></span>
                        <div className="flex items-center gap-2">
                          <Link
                            href="/messages"
                            className="px-3 py-1.5 rounded-xl border border-border text-xs font-semibold text-charcoal hover:bg-cream-100 flex items-center gap-1"
                          >
                            <MessageSquare size={13} />
                            <span>Reply in Messages</span>
                          </Link>
                          <Link
                            href={`/connections?id=${conn.id}`}
                            className="px-3.5 py-1.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-hover"
                          >
                            Manage Deal Lifecycle
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CREATE / EDIT LISTING MODAL */}
      {isListingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-elevation border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-cream-50">
              <h3 className="text-base font-bold text-charcoal">
                {editingListingId ? 'Edit Recyclable Material Listing' : 'Publish New Material Listing'}
              </h3>
              <button
                onClick={() => setIsListingModalOpen(false)}
                className="p-1.5 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-cream-200"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveListing} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  Material Title *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. High-Density Baled OCC Corrugated Cardboard (Export Grade)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium"
                  required
                />
              </div>

              {/* Category & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Material Stream / Category *
                  </label>
                  <select
                    value={formCategorySlug}
                    onChange={(e) => setFormCategorySlug(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Availability Status *
                  </label>
                  <select
                    value={formAvailability}
                    onChange={(e) => setFormAvailability(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary capitalize"
                  >
                    <option value="ready_now">Ready for Immediate Pickup</option>
                    <option value="in_stock">In Stock at Yard</option>
                    <option value="recurring_weekly">Recurring Weekly Supply</option>
                  </select>
                </div>
              </div>

              {/* Quantity and Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Approximate Quantity *
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="any"
                    value={formQuantity}
                    onChange={(e) => setFormQuantity(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Unit of Measurement *
                  </label>
                  <select
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary capitalize"
                  >
                    <option value="tonnes">Tonnes (Metric Tons)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="bales">Compressed Bales</option>
                    <option value="units">Units / Pallets</option>
                  </select>
                </div>
              </div>

              {/* Quality Grade & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Quality / Specification Grade *
                  </label>
                  <input
                    type="text"
                    value={formQualityGrade}
                    onChange={(e) => setFormQualityGrade(e.target.value)}
                    placeholder="e.g. Grade A - OCC 95/5, ISRI Tata, Optical Sorted"
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Condition & Purity Notes
                  </label>
                  <input
                    type="text"
                    value={formConditionNotes}
                    onChange={(e) => setFormConditionNotes(e.target.value)}
                    placeholder="e.g. Moisture < 8%, zero hazardous residue, baled"
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Price & Price Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Indicative Price per Unit (₹ INR)
                  </label>
                  <input
                    type="number"
                    value={formAskingPrice}
                    onChange={(e) => setFormAskingPrice(e.target.value)}
                    placeholder="Leave empty for Price on Request"
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Commercial Negotiation Mode
                  </label>
                  <select
                    value={formPriceType}
                    onChange={(e) => setFormPriceType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary capitalize"
                  >
                    <option value="negotiable">Negotiable Batch</option>
                    <option value="fixed">Fixed Non-Negotiable Price</option>
                    <option value="on_request">Price on Request Only</option>
                  </select>
                </div>
              </div>

              {/* Location & Service Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Facility / Yard Location *
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Bhosari Industrial Sector 7"
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Region *
                  </label>
                  <input
                    type="text"
                    value={formRegion}
                    onChange={(e) => setFormRegion(e.target.value)}
                    placeholder="e.g. Pune, Maharashtra"
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  Full Material Description *
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe material origin, consistency, contamination precautions, and packaging format..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary leading-relaxed"
                  required
                />
              </div>

              {/* Pickup & Handling Notes */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  Pickup & Site Loading Protocols
                </label>
                <input
                  type="text"
                  value={formPickupNotes}
                  onChange={(e) => setFormPickupNotes(e.target.value)}
                  placeholder="e.g. Weighbridge on-site, forklift loaded, 40ft truck accessible"
                  className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
              </div>

              {/* Image URL (Optional) */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  Material Photo URL (Optional - defaults to high-res stream image)
                </label>
                <input
                  type="url"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsListingModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-charcoal hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold shadow-xs transition-colors"
                >
                  {editingListingId ? 'Save Changes' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SupplierDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-50 flex items-center justify-center text-xs text-charcoal-muted">Loading supplier workspace...</div>}>
      <SupplierDashboardContent />
    </Suspense>
  );
}
