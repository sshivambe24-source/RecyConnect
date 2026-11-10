export type AccountType = 'supplier' | 'factory' | 'admin';

export type VerificationStatus = 'not_submitted' | 'pending_review' | 'verified' | 'rejected';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  organizationName: string;
  accountType: AccountType;
  description: string;
  cityRegion: string;
  serviceArea: string;
  phone?: string;
  publicContactPreference: 'in_app' | 'email' | 'phone';
  verificationStatus: VerificationStatus;
  verificationDocumentNotes?: string;
  verificationSubmittedAt?: string | null;
  verificationReviewedAt?: string | null;
  adminNotes?: string | null;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export type MaterialCategorySlug = 'paper' | 'plastics' | 'metals' | 'e-waste' | 'other';

export interface MaterialCategory {
  id: string;
  name: string;
  slug: MaterialCategorySlug;
  description: string;
  iconName: string;
  popularUnits: string[];
  active: boolean;
}

export type AvailabilityStatus = 'ready_now' | 'in_stock' | 'recurring_weekly' | 'sold' | 'unavailable';
export type PriceType = 'fixed' | 'negotiable' | 'on_request';
export type MaterialUnit = 'tonnes' | 'kg' | 'bales' | 'units';

export interface MaterialListing {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierOrg: string;
  supplierVerified: boolean;
  supplierRating: number;
  title: string;
  categoryId: string;
  categorySlug: MaterialCategorySlug;
  categoryName: string;
  description: string;
  quantity: number;
  unit: MaterialUnit;
  qualityGrade: string; // e.g. "Grade A - Sorted Clean", "Industrial Pure", "Commercial Mix"
  conditionNotes: string; // e.g. "Baled, moisture < 4%, contamination-free"
  location: string;
  region: string;
  availabilityStatus: AvailabilityStatus;
  askingPrice: number | null;
  currency: string;
  priceType: PriceType;
  images: string[];
  pickupDeliveryNotes: string;
  isPublished: boolean;
  viewsCount: number;
  inquiryCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FactoryPreferences {
  id: string;
  factoryId: string;
  requiredCategories: MaterialCategorySlug[];
  minQuantity: number;
  preferredUnit: MaterialUnit;
  acceptableRegions: string[];
  qualityPreferences: string[];
  preferredAvailability: AvailabilityStatus[];
  updatedAt: string;
}

export interface MatchResult {
  listing: MaterialListing;
  score: number; // 0 to 100
  reasons: string[];
}

export type ConnectionStatus =
  | 'inquiry_sent'
  | 'discussion'
  | 'terms_agreed'
  | 'logistics_coordination'
  | 'completed'
  | 'cancelled';

export interface StatusHistoryEntry {
  status: ConnectionStatus;
  updatedAt: string;
  updatedBy: string;
  note: string;
}

export interface LogisticsDetails {
  pickupAddress: string;
  deliveryAddress: string;
  proposedPickupDate: string;
  transportType: string; // e.g. "Flatbed Truck (10 Ton)", "Covered Container", "Buyer Pickup"
  loadingHandlingNotes: string;
  carrierName?: string;
  carrierContact?: string;
  coordinationStatus: 'planning' | 'scheduled' | 'in_transit' | 'delivered';
}

export interface Connection {
  id: string;
  listingId: string;
  listingTitle: string;
  listingCategory: string;
  supplierId: string;
  supplierName: string;
  supplierOrg: string;
  factoryId: string;
  factoryName: string;
  factoryOrg: string;
  requestedQuantity: number;
  requestedUnit: MaterialUnit;
  initialMessage: string;
  agreedQuantity: number | null;
  agreedPrice: number | null;
  currency: string;
  status: ConnectionStatus;
  statusHistory: StatusHistoryEntry[];
  logisticsDetails: LogisticsDetails | null;
  createdAt: string;
  updatedAt: string;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  connectionId?: string;
  listingId: string;
  listingTitle: string;
  participantIds: string[];
  supplierId: string;
  factoryId: string;
  supplierName: string;
  factoryName: string;
  lastMessageText: string;
  lastMessageAt: string;
  unreadCountSupplier: number;
  unreadCountFactory: number;
}

export type NotificationEventType =
  | 'inquiry'
  | 'message'
  | 'connection_update'
  | 'match'
  | 'verification'
  | 'system';

export interface AppNotification {
  id: string;
  recipientId: string;
  title: string;
  message: string;
  eventType: NotificationEventType;
  link: string;
  read: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  connectionId: string;
  listingTitle: string;
  reviewerId: string;
  reviewerName: string;
  reviewerOrg: string;
  reviewedUserId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  isModerated: boolean;
}

export interface AbuseReport {
  id: string;
  reporterId: string;
  reporterName: string;
  entityType: 'listing' | 'message' | 'user' | 'review';
  entityId: string;
  entityTitleOrSnippet: string;
  reason: string;
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  userOrg: string;
  accountType: AccountType;
  registrationNumber: string;
  businessLicenseDocRef: string;
  environmentalPermitDocRef?: string;
  operatingSinceYear: string;
  notes: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string | null;
  adminNotes?: string | null;
}
