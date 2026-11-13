import {
  UserProfile,
  MaterialCategory,
  MaterialListing,
  FactoryPreferences,
  Connection,
  Conversation,
  MessageItem,
  AppNotification,
  Review,
  AbuseReport,
  VerificationRequest,
  ConnectionStatus,
  LogisticsDetails,
  AccountType,
} from './types';

// Default Demo Users
export const DEMO_USERS: Record<string, UserProfile> = {
  supplier: {
    id: 'user-supplier-1',
    email: 'supplier@apexresources.demo',
    displayName: 'John Miller',
    organizationName: 'Apex Scrap & Resource Recovery',
    accountType: 'supplier',
    description: 'Leading industrial waste aggregator specializing in high-volume OCC cardboard, polymers, and structural scrap metal with on-site baling facilities.',
    cityRegion: 'Pune, Maharashtra',
    serviceArea: 'Western Maharashtra & Mumbai Industrial Corridor',
    phone: '+91 98230 44102',
    publicContactPreference: 'in_app',
    verificationStatus: 'verified',
    verificationDocumentNotes: 'GSTIN: 27AABCA1234F1Z5 | State Pollution Control Board Consent No. MPCB/RO/2023/182',
    verificationSubmittedAt: '2026-09-10T10:00:00Z',
    verificationReviewedAt: '2026-09-12T14:30:00Z',
    rating: 4.9,
    reviewCount: 14,
    createdAt: '2026-08-01T09:00:00Z',
  },
  factory: {
    id: 'user-factory-1',
    email: 'procurement@greencyclemills.demo',
    displayName: 'Elena Rostova',
    organizationName: 'GreenCycle Pulp & Paper Industrial Mills',
    accountType: 'factory',
    description: 'Automated kraft paper & packaging manufacturing facility sourcing 400+ tonnes of OCC and paper scrap monthly. Fast payment terms and direct warehouse receipt.',
    cityRegion: 'Chakan Industrial Park, Pune',
    serviceArea: '500km Procurement Radius',
    phone: '+91 98901 88203',
    publicContactPreference: 'in_app',
    verificationStatus: 'verified',
    verificationDocumentNotes: 'Corporate Registration #U21010MH2018PTC309112 | ISO 14001:2015 Certified',
    verificationSubmittedAt: '2026-08-15T11:00:00Z',
    verificationReviewedAt: '2026-08-16T16:00:00Z',
    rating: 4.8,
    reviewCount: 22,
    createdAt: '2026-07-20T08:00:00Z',
  },
  admin: {
    id: 'user-admin-1',
    email: 'compliance@recyconnect.internal',
    displayName: 'Marcus Vance',
    organizationName: 'RecyConnect Operations & Compliance',
    accountType: 'admin',
    description: 'Platform integrity manager responsible for vetting recycler credentials, moderating material listings, and overseeing safe marketplace trades.',
    cityRegion: 'Regional Operations Center',
    serviceArea: 'National Platform',
    publicContactPreference: 'in_app',
    verificationStatus: 'verified',
    rating: 5.0,
    reviewCount: 0,
    createdAt: '2026-06-01T00:00:00Z',
  },
  supplier2: {
    id: 'user-supplier-2',
    email: 'info@metallosolutions.demo',
    displayName: 'David Chen',
    organizationName: 'Metallo Recycling Solutions',
    accountType: 'supplier',
    description: 'Secondary scrap processor specializing in non-ferrous aluminum wire and copper extrusions from decommissioned infrastructure.',
    cityRegion: 'Pimpri-Chinchwad, Maharashtra',
    serviceArea: 'Maharashtra Industrial Cluster',
    phone: '+91 97654 33210',
    publicContactPreference: 'in_app',
    verificationStatus: 'pending_review',
    verificationDocumentNotes: 'Application submitted with factory licence & trade tax receipt #TR-88192',
    verificationSubmittedAt: '2026-10-21T09:15:00Z',
    rating: 4.6,
    reviewCount: 5,
    createdAt: '2026-09-18T10:00:00Z',
  },
};

export const INITIAL_CATEGORIES: MaterialCategory[] = [
  {
    id: 'cat-paper',
    name: 'Paper & Cardboard',
    slug: 'paper',
    description: 'Old Corrugated Cardboard (OCC), kraft cuts, office ledger, newsprint, and de-inking paper grades.',
    iconName: 'FileText',
    popularUnits: ['tonnes', 'bales'],
    active: true,
  },
  {
    id: 'cat-plastics',
    name: 'Plastics',
    slug: 'plastics',
    description: 'Rigid & flexible polymers including PET flakes, HDPE regrind, PP raffia, and LDPE clean film.',
    iconName: 'Layers',
    popularUnits: ['tonnes', 'kg'],
    active: true,
  },
  {
    id: 'cat-metals',
    name: 'Metals',
    slug: 'metals',
    description: 'Ferrous and non-ferrous industrial scrap: HMS 1 & 2, shredded steel, aluminum extrusions, and copper wire.',
    iconName: 'Wrench',
    popularUnits: ['tonnes', 'kg'],
    active: true,
  },
  {
    id: 'cat-ewaste',
    name: 'E-Waste',
    slug: 'e-waste',
    description: 'Decommissioned IT assets, populated PCB scrap, server racks, copper wiring, and telecom components.',
    iconName: 'Cpu',
    popularUnits: ['tonnes', 'kg', 'units'],
    active: true,
  },
  {
    id: 'cat-other',
    name: 'Other Recyclables',
    slug: 'other',
    description: 'Cullet glass, industrial textiles, rubber tyres, and specialized commercial byproducts.',
    iconName: 'Package',
    popularUnits: ['tonnes', 'units'],
    active: true,
  },
];

export const INITIAL_LISTINGS: MaterialListing[] = [
  {
    id: 'listing-1',
    supplierId: 'user-supplier-1',
    supplierName: 'John Miller',
    supplierOrg: 'Apex Scrap & Resource Recovery',
    supplierVerified: true,
    supplierRating: 4.9,
    title: 'High-Density Baled OCC Corrugated Cardboard (Export Grade)',
    categoryId: 'cat-paper',
    categorySlug: 'paper',
    categoryName: 'Paper & Cardboard',
    description: 'Uniformly compressed mill-size bales of clean, double-wall corrugated cardboard recovered from dry distribution centers. Strict quality control ensures no wax, plastic straps, or domestic garbage contamination.',
    quantity: 28,
    unit: 'tonnes',
    qualityGrade: 'Grade A - OCC 95/5',
    conditionNotes: 'Moisture content < 8%, double-wire strapped, indoor warehouse stored.',
    location: 'Bhosari Industrial Area, Sector 7',
    region: 'Pune, Maharashtra',
    availabilityStatus: 'ready_now',
    askingPrice: 19500,
    currency: 'INR',
    priceType: 'negotiable',
    images: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1000&q=80'
    ],
    pickupDeliveryNotes: 'Loading dock and 3-ton forklift available on-site. Accommodates 40ft container chassis.',
    isPublished: true,
    viewsCount: 342,
    inquiryCount: 7,
    createdAt: '2026-10-18T10:00:00Z',
    updatedAt: '2026-10-22T08:30:00Z',
  },
  {
    id: 'listing-2',
    supplierId: 'user-supplier-1',
    supplierName: 'John Miller',
    supplierOrg: 'Apex Scrap & Resource Recovery',
    supplierVerified: true,
    supplierRating: 4.9,
    title: 'Hot-Washed Clear PET Bottle Flakes (Optical Sorted)',
    categoryId: 'cat-plastics',
    categorySlug: 'plastics',
    categoryName: 'Plastics',
    description: 'Post-consumer transparent beverage bottles crushed and washed in an alkaline hot bath. High bulk density with automated metal and PVC flake separation.',
    quantity: 14,
    unit: 'tonnes',
    qualityGrade: 'Food-Grade Pre-Purified Flake',
    conditionNotes: 'PVC content < 30 PPM, moisture < 0.8%, melting point 252°C. Packed in 1-tonne jumbo bags.',
    location: 'Chakan Phase II, Logistics Hub',
    region: 'Pune, Maharashtra',
    availabilityStatus: 'in_stock',
    askingPrice: 72000,
    currency: 'INR',
    priceType: 'fixed',
    images: [
      'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1526951521990-620dc14c214b?auto=format&fit=crop&w=1000&q=80'
    ],
    pickupDeliveryNotes: 'Weighbridge available at gate. Seller can facilitate palletized loading.',
    isPublished: true,
    viewsCount: 289,
    inquiryCount: 5,
    createdAt: '2026-10-19T14:20:00Z',
    updatedAt: '2026-10-23T11:00:00Z',
  },
  {
    id: 'listing-3',
    supplierId: 'user-supplier-2',
    supplierName: 'David Chen',
    supplierOrg: 'Metallo Recycling Solutions',
    supplierVerified: false,
    supplierRating: 4.6,
    title: 'Clean Aluminum 6063 Architectural Extrusions (T5/T6)',
    categoryId: 'cat-metals',
    categorySlug: 'metals',
    categoryName: 'Metals',
    description: 'Mill-finish window profile offcuts and structural trims. Free from iron brackets, zinc attachments, thermal breaks, and heavy mastic adhesives.',
    quantity: 18,
    unit: 'tonnes',
    qualityGrade: 'Alloy 6063 Scrap (ISRI Tata)',
    conditionNotes: 'Metallic yield > 94%. Unpainted and clean surface finish.',
    location: 'Pimpri Heavy Industrial Area',
    region: 'Pune, Maharashtra',
    availabilityStatus: 'ready_now',
    askingPrice: 215000,
    currency: 'INR',
    priceType: 'negotiable',
    images: [
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80'
    ],
    pickupDeliveryNotes: 'Overhead crane loading available. 24-hour advance notice required for collection.',
    isPublished: true,
    viewsCount: 195,
    inquiryCount: 4,
    createdAt: '2026-10-20T09:10:00Z',
    updatedAt: '2026-10-22T16:45:00Z',
  },
  {
    id: 'listing-4',
    supplierId: 'user-supplier-1',
    supplierName: 'John Miller',
    supplierOrg: 'Apex Scrap & Resource Recovery',
    supplierVerified: true,
    supplierRating: 4.9,
    title: 'Telecom Grade Circuit Boards & Motherboard Scrap',
    categoryId: 'cat-ewaste',
    categorySlug: 'e-waste',
    categoryName: 'E-Waste',
    description: 'Dismantled enterprise telecommunications PCBs, backplanes, and dual-socket server boards. Gold-plated edge connectors intact, batteries and capacitors pre-removed.',
    quantity: 3200,
    unit: 'kg',
    qualityGrade: 'High-Yield Telecom Class',
    conditionNotes: 'Pre-sorted by substrate thickness, dry sealed drums on wooden pallets.',
    location: 'Hinjewadi Tech Park Phase 1',
    region: 'Pune, Maharashtra',
    availabilityStatus: 'recurring_weekly',
    askingPrice: null,
    currency: 'INR',
    priceType: 'on_request',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80'
    ],
    pickupDeliveryNotes: 'Hazardous materials authorization document required from acquiring recycler.',
    isPublished: true,
    viewsCount: 412,
    inquiryCount: 9,
    createdAt: '2026-10-15T12:00:00Z',
    updatedAt: '2026-10-23T15:00:00Z',
  },
  {
    id: 'listing-5',
    supplierId: 'user-supplier-1',
    supplierName: 'John Miller',
    supplierOrg: 'Apex Scrap & Resource Recovery',
    supplierVerified: true,
    supplierRating: 4.9,
    title: 'High-Density Polyethylene (HDPE) Regrind - Blue Drums',
    categoryId: 'cat-plastics',
    categorySlug: 'plastics',
    categoryName: 'Plastics',
    description: 'Granulated 200L industrial chemical drums (triple-rinsed, neutralization certified). Granule size 8-10mm with zero fine dust, ready for compounding or blow molding.',
    quantity: 9,
    unit: 'tonnes',
    qualityGrade: 'MFI 0.05 - 0.12',
    conditionNotes: 'Non-hazardous prior use, clean fraction with zero metal impurities.',
    location: 'Talegaon Industrial Corridor',
    region: 'Pune, Maharashtra',
    availabilityStatus: 'ready_now',
    askingPrice: 84000,
    currency: 'INR',
    priceType: 'negotiable',
    images: [
      'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1000&q=80'
    ],
    pickupDeliveryNotes: 'Packed in standard 25kg PP sacks on heat-treated pallets.',
    isPublished: true,
    viewsCount: 167,
    inquiryCount: 3,
    createdAt: '2026-10-21T11:45:00Z',
    updatedAt: '2026-10-23T12:00:00Z',
  },
  {
    id: 'listing-6',
    supplierId: 'user-supplier-2',
    supplierName: 'David Chen',
    supplierOrg: 'Metallo Recycling Solutions',
    supplierVerified: false,
    supplierRating: 4.6,
    title: 'Heavy Melting Steel Scrap (HMS 1 & 2 80/20 Mix)',
    categoryId: 'cat-metals',
    categorySlug: 'metals',
    categoryName: 'Metals',
    description: 'Structural steel offcuts, girder trimmings, heavy plates, and machinery components cut to standard furnace charging dimensions (max 1.5m length).',
    quantity: 45,
    unit: 'tonnes',
    qualityGrade: 'ISRI 200-206 Certified',
    conditionNotes: 'Cut to size, minimal surface rust, zero hollow closed containers or sealed pipes.',
    location: 'Chakan MIDC Industrial Area',
    region: 'Pune, Maharashtra',
    availabilityStatus: 'ready_now',
    askingPrice: 38000,
    currency: 'INR',
    priceType: 'fixed',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80'
    ],
    pickupDeliveryNotes: 'Magnetic crane loading on-site. Certified automated weighbridge ticket provided.',
    isPublished: true,
    viewsCount: 310,
    inquiryCount: 6,
    createdAt: '2026-10-17T08:00:00Z',
    updatedAt: '2026-10-22T14:15:00Z',
  },
];

export const INITIAL_PREFERENCES: Record<string, FactoryPreferences> = {
  'user-factory-1': {
    id: 'pref-1',
    factoryId: 'user-factory-1',
    requiredCategories: ['paper', 'plastics'],
    minQuantity: 15,
    preferredUnit: 'tonnes',
    acceptableRegions: ['Pune, Maharashtra', 'Western Maharashtra & Mumbai Industrial Corridor', 'All Regions'],
    qualityPreferences: ['Grade A', 'Clean OCC', 'Hot-Washed', 'Food-Grade'],
    preferredAvailability: ['ready_now', 'in_stock', 'recurring_weekly'],
    updatedAt: '2026-10-22T10:00:00Z',
  },
};

export const INITIAL_CONNECTIONS: Connection[] = [
  {
    id: 'conn-1',
    listingId: 'listing-1',
    listingTitle: 'High-Density Baled OCC Corrugated Cardboard (Export Grade)',
    listingCategory: 'Paper & Cardboard',
    supplierId: 'user-supplier-1',
    supplierName: 'John Miller',
    supplierOrg: 'Apex Scrap & Resource Recovery',
    factoryId: 'user-factory-1',
    factoryName: 'Elena Rostova',
    factoryOrg: 'GreenCycle Pulp & Paper Industrial Mills',
    requestedQuantity: 25,
    requestedUnit: 'tonnes',
    initialMessage: 'Hello John, we are running our kraft board line next Tuesday and can accept 25 tonnes of your Grade A baled OCC at your quoted price. Can you accommodate standard 32ft container trucks for loading?',
    agreedQuantity: 25,
    agreedPrice: 19000,
    currency: 'INR',
    status: 'logistics_coordination',
    statusHistory: [
      {
        status: 'inquiry_sent',
        updatedAt: '2026-10-20T10:30:00Z',
        updatedBy: 'Elena Rostova',
        note: 'Initial inquiry sent for 25 tonnes at ₹19,000/tonne target.',
      },
      {
        status: 'discussion',
        updatedAt: '2026-10-20T14:00:00Z',
        updatedBy: 'John Miller',
        note: 'Supplier confirmed moisture certification and shared weighbridge specs.',
      },
      {
        status: 'terms_agreed',
        updatedAt: '2026-10-21T09:30:00Z',
        updatedBy: 'Elena Rostova',
        note: 'Commercial price agreed at ₹19,000/tonne net of transport. Purchase order drafted.',
      },
      {
        status: 'logistics_coordination',
        updatedAt: '2026-10-22T11:15:00Z',
        updatedBy: 'John Miller',
        note: 'Loading bay reserved for Friday morning slot (08:30 AM). Logistics details updated.',
      },
    ],
    logisticsDetails: {
      pickupAddress: 'Apex Yard 4, Gate B, Sector 7, Bhosari Industrial Area, Pune',
      deliveryAddress: 'GreenCycle Pulp Mill Intake Bay 2, Chakan Industrial Park Phase 1',
      proposedPickupDate: '2026-10-27',
      transportType: '32ft Multi-Axle Covered Container',
      loadingHandlingNotes: 'Supplier forklift loaded. Tare weight ticket must be captured before entering.',
      carrierName: 'Sahyadri Freight & Logistics Solutions',
      carrierContact: '+91 94220 55198',
      coordinationStatus: 'scheduled',
    },
    createdAt: '2026-10-20T10:30:00Z',
    updatedAt: '2026-10-22T11:15:00Z',
  },
  {
    id: 'conn-2',
    listingId: 'listing-2',
    listingTitle: 'Hot-Washed Clear PET Bottle Flakes (Optical Sorted)',
    listingCategory: 'Plastics',
    supplierId: 'user-supplier-1',
    supplierName: 'John Miller',
    supplierOrg: 'Apex Scrap & Resource Recovery',
    factoryId: 'user-factory-1',
    factoryName: 'Elena Rostova',
    factoryOrg: 'GreenCycle Pulp & Paper Industrial Mills',
    requestedQuantity: 14,
    requestedUnit: 'tonnes',
    initialMessage: 'Inquiring regarding full 14-tonne lot of washed PET flakes for our packaging polymer trial. Can you provide laboratory test sheet for PVC PPM?',
    agreedQuantity: 14,
    agreedPrice: 71000,
    currency: 'INR',
    status: 'terms_agreed',
    statusHistory: [
      {
        status: 'inquiry_sent',
        updatedAt: '2026-10-22T15:00:00Z',
        updatedBy: 'Elena Rostova',
        note: 'Sent inquiry for 14 tonnes with technical test sheet request.',
      },
      {
        status: 'discussion',
        updatedAt: '2026-10-23T09:00:00Z',
        updatedBy: 'John Miller',
        note: 'Supplier uploaded batch spectrometer report showing < 25 PPM PVC.',
      },
      {
        status: 'terms_agreed',
        updatedAt: '2026-10-23T14:20:00Z',
        updatedBy: 'Elena Rostova',
        note: 'Terms agreed at ₹71,000/tonne. Logistics pickup scheduling pending.',
      },
    ],
    logisticsDetails: null,
    createdAt: '2026-10-22T15:00:00Z',
    updatedAt: '2026-10-23T14:20:00Z',
  },
  {
    id: 'conn-3',
    listingId: 'listing-5',
    listingTitle: 'High-Density Polyethylene (HDPE) Regrind - Blue Drums',
    listingCategory: 'Plastics',
    supplierId: 'user-supplier-1',
    supplierName: 'John Miller',
    supplierOrg: 'Apex Scrap & Resource Recovery',
    factoryId: 'user-factory-1',
    factoryName: 'Elena Rostova',
    factoryOrg: 'GreenCycle Pulp & Paper Industrial Mills',
    requestedQuantity: 8,
    requestedUnit: 'tonnes',
    initialMessage: 'Completed previous delivery smoothly. Requesting final delivery confirmation.',
    agreedQuantity: 8,
    agreedPrice: 83000,
    currency: 'INR',
    status: 'completed',
    statusHistory: [
      {
        status: 'inquiry_sent',
        updatedAt: '2026-10-10T10:00:00Z',
        updatedBy: 'Elena Rostova',
        note: 'Inquiry initialized.',
      },
      {
        status: 'terms_agreed',
        updatedAt: '2026-10-12T11:00:00Z',
        updatedBy: 'John Miller',
        note: 'Price set at ₹83,000/tonne.',
      },
      {
        status: 'logistics_coordination',
        updatedAt: '2026-10-14T09:00:00Z',
        updatedBy: 'Elena Rostova',
        note: 'Truck dispatched and received at factory intake.',
      },
      {
        status: 'completed',
        updatedAt: '2026-10-16T17:00:00Z',
        updatedBy: 'Elena Rostova',
        note: 'Goods received, quality verified with zero contamination. Transaction marked completed.',
      },
    ],
    logisticsDetails: {
      pickupAddress: 'Apex Yard 4, Bhosari, Pune',
      deliveryAddress: 'GreenCycle Mill Intake, Chakan',
      proposedPickupDate: '2026-10-15',
      transportType: 'Standard Flatbed',
      loadingHandlingNotes: 'Received in full',
      coordinationStatus: 'delivered',
    },
    createdAt: '2026-10-10T10:00:00Z',
    updatedAt: '2026-10-16T17:00:00Z',
  },
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    connectionId: 'conn-1',
    listingId: 'listing-1',
    listingTitle: 'High-Density Baled OCC Corrugated Cardboard (Export Grade)',
    participantIds: ['user-supplier-1', 'user-factory-1'],
    supplierId: 'user-supplier-1',
    factoryId: 'user-factory-1',
    supplierName: 'Apex Scrap & Resource Recovery',
    factoryName: 'GreenCycle Pulp & Paper Industrial Mills',
    lastMessageText: 'Great, the loading bay is booked for Friday 08:30 AM. Looking forward to the pickup.',
    lastMessageAt: '2026-10-22T11:20:00Z',
    unreadCountSupplier: 0,
    unreadCountFactory: 0,
  },
  {
    id: 'conv-2',
    connectionId: 'conn-2',
    listingId: 'listing-2',
    listingTitle: 'Hot-Washed Clear PET Bottle Flakes (Optical Sorted)',
    participantIds: ['user-supplier-1', 'user-factory-1'],
    supplierId: 'user-supplier-1',
    factoryId: 'user-factory-1',
    supplierName: 'Apex Scrap & Resource Recovery',
    factoryName: 'GreenCycle Pulp & Paper Industrial Mills',
    lastMessageText: 'We have reviewed the batch lab test. We accept ₹71,000/tonne for the entire 14-tonne batch.',
    lastMessageAt: '2026-10-23T14:22:00Z',
    unreadCountSupplier: 1,
    unreadCountFactory: 0,
  },
];

export const INITIAL_MESSAGES: Record<string, MessageItem[]> = {
  'conv-1': [
    {
      id: 'msg-101',
      conversationId: 'conv-1',
      senderId: 'user-factory-1',
      senderName: 'Elena Rostova (GreenCycle)',
      content: 'Hello John, we are running our kraft board line next Tuesday and can accept 25 tonnes of your Grade A baled OCC at your quoted price. Can you accommodate standard 32ft container trucks for loading?',
      read: true,
      createdAt: '2026-10-20T10:30:00Z',
    },
    {
      id: 'msg-102',
      conversationId: 'conv-1',
      senderId: 'user-supplier-1',
      senderName: 'John Miller (Apex)',
      content: 'Hi Elena! Absolutely. We have two dock levelers at Gate B and an in-ground 60-tonne weighbridge. 32ft and 40ft containers load with ease.',
      read: true,
      createdAt: '2026-10-20T11:15:00Z',
    },
    {
      id: 'msg-103',
      conversationId: 'conv-1',
      senderId: 'user-factory-1',
      senderName: 'Elena Rostova (GreenCycle)',
      content: 'Superb. We agree on ₹19,000/tonne for the 25-tonne quantity. Can we schedule pickup for Friday morning?',
      read: true,
      createdAt: '2026-10-21T09:25:00Z',
    },
    {
      id: 'msg-104',
      conversationId: 'conv-1',
      senderId: 'user-supplier-1',
      senderName: 'John Miller (Apex)',
      content: 'Great, the loading bay is booked for Friday 08:30 AM. Looking forward to the pickup.',
      read: true,
      createdAt: '2026-10-22T11:20:00Z',
    },
  ],
  'conv-2': [
    {
      id: 'msg-201',
      conversationId: 'conv-2',
      senderId: 'user-factory-1',
      senderName: 'Elena Rostova (GreenCycle)',
      content: 'Inquiring regarding full 14-tonne lot of washed PET flakes for our packaging polymer trial. Can you provide laboratory test sheet for PVC PPM?',
      read: true,
      createdAt: '2026-10-22T15:00:00Z',
    },
    {
      id: 'msg-202',
      conversationId: 'conv-2',
      senderId: 'user-supplier-1',
      senderName: 'John Miller (Apex)',
      content: 'Hello Elena, here are the specs: PVC is certified under 25 PPM, moisture 0.65%, bulk density 380 kg/m³. Full lab certificate is on file.',
      read: true,
      createdAt: '2026-10-23T09:00:00Z',
    },
    {
      id: 'msg-203',
      conversationId: 'conv-2',
      senderId: 'user-factory-1',
      senderName: 'Elena Rostova (GreenCycle)',
      content: 'We have reviewed the batch lab test. We accept ₹71,000/tonne for the entire 14-tonne batch.',
      read: false,
      createdAt: '2026-10-23T14:22:00Z',
    },
  ],
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    recipientId: 'user-supplier-1',
    title: 'New Sourcing Inquiry',
    message: 'GreenCycle Pulp Mills sent an inquiry for 25 tonnes of OCC Cardboard Bales.',
    eventType: 'inquiry',
    link: '/connections',
    read: false,
    createdAt: '2026-10-22T15:02:00Z',
  },
  {
    id: 'notif-2',
    recipientId: 'user-supplier-1',
    title: 'New Message Received',
    message: 'Elena Rostova replied to the negotiation for Hot-Washed PET Flakes.',
    eventType: 'message',
    link: '/messages',
    read: false,
    createdAt: '2026-10-23T14:22:00Z',
  },
  {
    id: 'notif-3',
    recipientId: 'user-factory-1',
    title: 'New Material Match Found',
    message: 'High-Density Baled OCC (28 tonnes) matches your Paper Sourcing Preferences (95% score).',
    eventType: 'match',
    link: '/materials/listing-1',
    read: true,
    createdAt: '2026-10-20T10:00:00Z',
  },
  {
    id: 'notif-4',
    recipientId: 'user-supplier-1',
    title: 'Organization Verification Approved',
    message: 'Your organization profile has been verified by RecyConnect Compliance.',
    eventType: 'verification',
    link: '/profile',
    read: true,
    createdAt: '2026-09-12T14:30:00Z',
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    connectionId: 'conn-3',
    listingTitle: 'High-Density Polyethylene (HDPE) Regrind - Blue Drums',
    reviewerId: 'user-factory-1',
    reviewerName: 'Elena Rostova',
    reviewerOrg: 'GreenCycle Pulp & Paper Industrial Mills',
    reviewedUserId: 'user-supplier-1',
    rating: 5,
    comment: 'Exceptional material quality. The HDPE regrind had zero chemical residue and exact batch weight confirmed on our weighbridge. Highly recommend Apex Scrap.',
    createdAt: '2026-10-17T10:00:00Z',
    isModerated: false,
  },
];

export const INITIAL_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: 'vreq-1',
    userId: 'user-supplier-2',
    userName: 'David Chen',
    userOrg: 'Metallo Recycling Solutions',
    accountType: 'supplier',
    registrationNumber: 'CIN: U27200MH2021PTC359124',
    businessLicenseDocRef: 'Factory-Licence-2024-MH.pdf',
    environmentalPermitDocRef: 'MPCB-Consent-To-Operate-2025.pdf',
    operatingSinceYear: '2021',
    notes: 'Submitted with authorized signatory resolution and pollution control consent certificate.',
    status: 'pending_review',
    submittedAt: '2026-10-21T09:15:00Z',
  },
  {
    id: 'vreq-2',
    userId: 'user-supplier-1',
    userName: 'John Miller',
    userOrg: 'Apex Scrap & Resource Recovery',
    accountType: 'supplier',
    registrationNumber: 'GSTIN: 27AABCA1234F1Z5',
    businessLicenseDocRef: 'Apex-Registration-Certificate.pdf',
    environmentalPermitDocRef: 'MPCB-RO-2023-182.pdf',
    operatingSinceYear: '2016',
    notes: 'Verified against Maharashtra Pollution Control Board registry.',
    status: 'verified',
    submittedAt: '2026-09-10T10:00:00Z',
    reviewedAt: '2026-09-12T14:30:00Z',
    adminNotes: 'All trade licenses verified and confirmed active.',
  },
];

// In-Memory & LocalStorage Store Manager
class RecyConnectStore {
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined';
    if (this.isBrowser) {
      const ver = localStorage.getItem('recyconnect_cur_ver');
      if (ver !== 'inr_100x_v3') {
        localStorage.removeItem('recyconnect_listings');
        localStorage.removeItem('recyconnect_connections');
        localStorage.removeItem('recyconnect_conversations');
        localStorage.removeItem('recyconnect_messages');
        localStorage.setItem('recyconnect_cur_ver', 'inr_100x_v3');
      }
    }
  }

  private getItem<T>(key: string, fallback: T): T {
    if (!this.isBrowser) return fallback;
    try {
      const stored = localStorage.getItem(`recyconnect_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(`recyconnect_${key}`, JSON.stringify(value));
      // Dispatch storage event so tabs/components react
      window.dispatchEvent(new Event('recyconnect_store_updated'));
    } catch (e) {
      console.warn('Storage quota exceeded or error saving:', e);
    }
  }

  // Active User / Session
  getCurrentUser(): UserProfile {
    const defaultUser = DEMO_USERS.supplier;
    return this.getItem<UserProfile>('current_user', defaultUser);
  }

  setCurrentUser(user: UserProfile): void {
    this.setItem('current_user', user);
  }

  switchUserPersona(role: 'supplier' | 'factory' | 'admin'): UserProfile {
    const user = DEMO_USERS[role] || DEMO_USERS.supplier;
    this.setCurrentUser(user);
    return user;
  }

  // Listings
  getListings(): MaterialListing[] {
    return this.getItem<MaterialListing[]>('listings', INITIAL_LISTINGS);
  }

  getListing(id: string): MaterialListing | undefined {
    return this.getListings().find((l) => l.id === id);
  }

  createListing(listingData: Omit<MaterialListing, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'inquiryCount'>): MaterialListing {
    const listings = this.getListings();
    const newListing: MaterialListing = {
      ...listingData,
      id: `listing-${Date.now()}`,
      viewsCount: 1,
      inquiryCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    listings.unshift(newListing);
    this.setItem('listings', listings);
    return newListing;
  }

  updateListing(id: string, updates: Partial<MaterialListing>): MaterialListing | null {
    const listings = this.getListings();
    const index = listings.findIndex((l) => l.id === id);
    if (index === -1) return null;
    const updated = {
      ...listings[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    listings[index] = updated;
    this.setItem('listings', listings);
    return updated;
  }

  deleteListing(id: string): boolean {
    const listings = this.getListings().filter((l) => l.id !== id);
    this.setItem('listings', listings);
    return true;
  }

  // Categories
  getCategories(): MaterialCategory[] {
    return this.getItem<MaterialCategory[]>('categories', INITIAL_CATEGORIES);
  }

  // Connections / Inquiries / Transactions
  getConnections(): Connection[] {
    return this.getItem<Connection[]>('connections', INITIAL_CONNECTIONS);
  }

  getConnection(id: string): Connection | undefined {
    return this.getConnections().find((c) => c.id === id);
  }

  createInquiry(data: {
    listingId: string;
    factoryId: string;
    factoryName: string;
    factoryOrg: string;
    requestedQuantity: number;
    requestedUnit: string;
    initialMessage: string;
  }): Connection {
    const listing = this.getListing(data.listingId);
    if (!listing) throw new Error('Listing not found');

    const connections = this.getConnections();
    const newConnection: Connection = {
      id: `conn-${Date.now()}`,
      listingId: listing.id,
      listingTitle: listing.title,
      listingCategory: listing.categoryName,
      supplierId: listing.supplierId,
      supplierName: listing.supplierName,
      supplierOrg: listing.supplierOrg,
      factoryId: data.factoryId,
      factoryName: data.factoryName,
      factoryOrg: data.factoryOrg,
      requestedQuantity: data.requestedQuantity,
      requestedUnit: listing.unit,
      initialMessage: data.initialMessage,
      agreedQuantity: null,
      agreedPrice: listing.askingPrice,
      currency: listing.currency,
      status: 'inquiry_sent',
      statusHistory: [
        {
          status: 'inquiry_sent',
          updatedAt: new Date().toISOString(),
          updatedBy: data.factoryName,
          note: `Inquiry submitted for ${data.requestedQuantity} ${listing.unit}.`,
        },
      ],
      logisticsDetails: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    connections.unshift(newConnection);
    this.setItem('connections', connections);

    // Update listing inquiry count
    this.updateListing(listing.id, { inquiryCount: (listing.inquiryCount || 0) + 1 });

    // Create linked conversation
    const conversations = this.getConversations();
    const newConvId = `conv-${newConnection.id}`;
    const newConv: Conversation = {
      id: newConvId,
      connectionId: newConnection.id,
      listingId: listing.id,
      listingTitle: listing.title,
      participantIds: [listing.supplierId, data.factoryId],
      supplierId: listing.supplierId,
      factoryId: data.factoryId,
      supplierName: listing.supplierOrg,
      factoryName: data.factoryOrg,
      lastMessageText: data.initialMessage,
      lastMessageAt: new Date().toISOString(),
      unreadCountSupplier: 1,
      unreadCountFactory: 0,
    };
    conversations.unshift(newConv);
    this.setItem('conversations', conversations);

    // Add first message
    const messages = this.getMessagesMap();
    messages[newConvId] = [
      {
        id: `msg-${Date.now()}`,
        conversationId: newConvId,
        senderId: data.factoryId,
        senderName: `${data.factoryName} (${data.factoryOrg})`,
        content: data.initialMessage,
        read: false,
        createdAt: new Date().toISOString(),
      },
    ];
    this.setItem('messages', messages);

    // Notify Supplier
    this.createNotification({
      recipientId: listing.supplierId,
      title: 'New Sourcing Inquiry',
      message: `${data.factoryOrg} sent an inquiry for ${listing.title}.`,
      eventType: 'inquiry',
      link: '/connections',
    });

    return newConnection;
  }

  updateConnectionStatus(
    connectionId: string,
    newStatus: ConnectionStatus,
    note: string,
    updatedBy: string,
    agreedQuantity?: number,
    agreedPrice?: number
  ): Connection | null {
    const connections = this.getConnections();
    const idx = connections.findIndex((c) => c.id === connectionId);
    if (idx === -1) return null;

    const current = connections[idx];
    const updatedHistory = [
      ...current.statusHistory,
      {
        status: newStatus,
        updatedAt: new Date().toISOString(),
        updatedBy,
        note: note || `Status updated to ${newStatus.replace('_', ' ')}`,
      },
    ];

    const updatedConn: Connection = {
      ...current,
      status: newStatus,
      statusHistory: updatedHistory,
      agreedQuantity: agreedQuantity !== undefined ? agreedQuantity : current.agreedQuantity,
      agreedPrice: agreedPrice !== undefined ? agreedPrice : current.agreedPrice,
      updatedAt: new Date().toISOString(),
    };

    connections[idx] = updatedConn;
    this.setItem('connections', connections);

    // Send notifications to the other party
    const targetUserId =
      updatedBy.includes(current.supplierName) || updatedBy === current.supplierId
        ? current.factoryId
        : current.supplierId;

    this.createNotification({
      recipientId: targetUserId,
      title: 'Connection Status Updated',
      message: `Transaction for "${current.listingTitle}" moved to: ${newStatus.replace('_', ' ').toUpperCase()}`,
      eventType: 'connection_update',
      link: '/connections',
    });

    return updatedConn;
  }

  updateLogistics(connectionId: string, logistics: LogisticsDetails, updatedBy: string): Connection | null {
    const connections = this.getConnections();
    const idx = connections.findIndex((c) => c.id === connectionId);
    if (idx === -1) return null;

    const current = connections[idx];
    current.logisticsDetails = logistics;
    current.updatedAt = new Date().toISOString();
    current.statusHistory.push({
      status: current.status,
      updatedAt: new Date().toISOString(),
      updatedBy,
      note: `Logistics details updated: pickup scheduled for ${logistics.proposedPickupDate}`,
    });

    connections[idx] = current;
    this.setItem('connections', connections);
    return current;
  }

  // Conversations & Messages
  getConversations(): Conversation[] {
    return this.getItem<Conversation[]>('conversations', INITIAL_CONVERSATIONS);
  }

  private getMessagesMap(): Record<string, MessageItem[]> {
    return this.getItem<Record<string, MessageItem[]>>('messages', INITIAL_MESSAGES);
  }

  getMessages(conversationId: string): MessageItem[] {
    const map = this.getMessagesMap();
    return map[conversationId] || [];
  }

  sendMessage(conversationId: string, senderId: string, senderName: string, content: string): MessageItem {
    const map = this.getMessagesMap();
    const list = map[conversationId] || [];
    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      senderName,
      content,
      read: false,
      createdAt: new Date().toISOString(),
    };
    list.push(newMsg);
    map[conversationId] = list;
    this.setItem('messages', map);

    // Update conversation metadata
    const conversations = this.getConversations();
    const cIdx = conversations.findIndex((c) => c.id === conversationId);
    if (cIdx !== -1) {
      conversations[cIdx].lastMessageText = content;
      conversations[cIdx].lastMessageAt = new Date().toISOString();
      if (senderId === conversations[cIdx].supplierId) {
        conversations[cIdx].unreadCountFactory += 1;
      } else {
        conversations[cIdx].unreadCountSupplier += 1;
      }
      this.setItem('conversations', conversations);

      // Notification
      const recipientId =
        senderId === conversations[cIdx].supplierId
          ? conversations[cIdx].factoryId
          : conversations[cIdx].supplierId;

      this.createNotification({
        recipientId,
        title: 'New Message',
        message: `${senderName}: "${content.slice(0, 60)}${content.length > 60 ? '...' : ''}"`,
        eventType: 'message',
        link: '/messages',
      });
    }

    return newMsg;
  }

  markConversationRead(conversationId: string, userId: string): void {
    const conversations = this.getConversations();
    const cIdx = conversations.findIndex((c) => c.id === conversationId);
    if (cIdx !== -1) {
      if (userId === conversations[cIdx].supplierId) {
        conversations[cIdx].unreadCountSupplier = 0;
      } else {
        conversations[cIdx].unreadCountFactory = 0;
      }
      this.setItem('conversations', conversations);
    }

    const map = this.getMessagesMap();
    const list = map[conversationId] || [];
    list.forEach((m) => {
      if (m.senderId !== userId) m.read = true;
    });
    map[conversationId] = list;
    this.setItem('messages', map);
  }

  // Notifications
  getNotifications(userId?: string): AppNotification[] {
    const all = this.getItem<AppNotification[]>('notifications', INITIAL_NOTIFICATIONS);
    if (!userId) return all;
    return all.filter((n) => n.recipientId === userId);
  }

  createNotification(data: Omit<AppNotification, 'id' | 'createdAt' | 'read'>): AppNotification {
    const notifs = this.getItem<AppNotification[]>('notifications', INITIAL_NOTIFICATIONS);
    const newNotif: AppNotification = {
      ...data,
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    notifs.unshift(newNotif);
    this.setItem('notifications', notifs);
    return newNotif;
  }

  markNotificationRead(id: string): void {
    const notifs = this.getItem<AppNotification[]>('notifications', INITIAL_NOTIFICATIONS);
    const updated = notifs.map((n) => (n.id === id ? { ...n, read: true } : n));
    this.setItem('notifications', updated);
  }

  markAllNotificationsRead(userId: string): void {
    const notifs = this.getItem<AppNotification[]>('notifications', INITIAL_NOTIFICATIONS);
    const updated = notifs.map((n) => (n.recipientId === userId ? { ...n, read: true } : n));
    this.setItem('notifications', updated);
  }

  // Factory Sourcing Preferences
  getFactoryPreferences(factoryId: string): FactoryPreferences {
    const prefsMap = this.getItem<Record<string, FactoryPreferences>>('factory_prefs', INITIAL_PREFERENCES);
    return (
      prefsMap[factoryId] || {
        id: `pref-${factoryId}`,
        factoryId,
        requiredCategories: ['paper', 'plastics'],
        minQuantity: 10,
        preferredUnit: 'tonnes',
        acceptableRegions: ['All Regions'],
        qualityPreferences: ['Grade A'],
        preferredAvailability: ['ready_now', 'in_stock'],
        updatedAt: new Date().toISOString(),
      }
    );
  }

  updateFactoryPreferences(factoryId: string, prefs: Partial<FactoryPreferences>): FactoryPreferences {
    const prefsMap = this.getItem<Record<string, FactoryPreferences>>('factory_prefs', INITIAL_PREFERENCES);
    const existing = this.getFactoryPreferences(factoryId);
    const updated: FactoryPreferences = {
      ...existing,
      ...prefs,
      factoryId,
      updatedAt: new Date().toISOString(),
    };
    prefsMap[factoryId] = updated;
    this.setItem('factory_prefs', prefsMap);
    return updated;
  }

  // Reviews
  getReviews(): Review[] {
    return this.getItem<Review[]>('reviews', INITIAL_REVIEWS);
  }

  createReview(review: Omit<Review, 'id' | 'createdAt' | 'isModerated'>): Review {
    const reviews = this.getReviews();
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isModerated: false,
    };
    reviews.unshift(newRev);
    this.setItem('reviews', reviews);
    return newRev;
  }

  // Verification Requests
  getVerificationRequests(): VerificationRequest[] {
    return this.getItem<VerificationRequest[]>('verification_requests', INITIAL_VERIFICATION_REQUESTS);
  }

  submitVerification(req: Omit<VerificationRequest, 'id' | 'status' | 'submittedAt'>): VerificationRequest {
    const requests = this.getVerificationRequests();
    const newReq: VerificationRequest = {
      ...req,
      id: `vreq-${Date.now()}`,
      status: 'pending_review',
      submittedAt: new Date().toISOString(),
    };
    requests.unshift(newReq);
    this.setItem('verification_requests', requests);

    // Update user profile status
    const currentUser = this.getCurrentUser();
    if (currentUser.id === req.userId) {
      currentUser.verificationStatus = 'pending_review';
      currentUser.verificationDocumentNotes = req.notes;
      currentUser.verificationSubmittedAt = new Date().toISOString();
      this.setCurrentUser(currentUser);
    }
    return newReq;
  }

  reviewVerification(requestId: string, status: 'verified' | 'rejected', adminNotes: string): VerificationRequest | null {
    const requests = this.getVerificationRequests();
    const idx = requests.findIndex((r) => r.id === requestId);
    if (idx === -1) return null;

    requests[idx].status = status;
    requests[idx].reviewedAt = new Date().toISOString();
    requests[idx].adminNotes = adminNotes;
    this.setItem('verification_requests', requests);

    // Update matching user profile if in memory
    const user = this.getCurrentUser();
    if (user.id === requests[idx].userId) {
      user.verificationStatus = status;
      user.adminNotes = adminNotes;
      user.verificationReviewedAt = new Date().toISOString();
      this.setCurrentUser(user);
    }

    // Also update any listing supplierVerified flags
    if (status === 'verified') {
      const listings = this.getListings();
      const updatedListings = listings.map((l) =>
        l.supplierId === requests[idx].userId ? { ...l, supplierVerified: true } : l
      );
      this.setItem('listings', updatedListings);
    }

    // Notify user
    this.createNotification({
      recipientId: requests[idx].userId,
      title: status === 'verified' ? 'Profile Verified!' : 'Verification Update',
      message:
        status === 'verified'
          ? 'Congratulations! Your organization verification has been approved.'
          : `Verification notice: ${adminNotes}`,
      eventType: 'verification',
      link: '/profile',
    });

    return requests[idx];
  }

  // Abuse Reports
  getAbuseReports(): AbuseReport[] {
    return this.getItem<AbuseReport[]>('abuse_reports', [
      {
        id: 'rep-1',
        reporterId: 'user-factory-1',
        reporterName: 'Elena Rostova',
        entityType: 'listing',
        entityId: 'listing-3',
        entityTitleOrSnippet: 'Clean Aluminum 6063 Architectural Extrusions',
        reason: 'Price clarification mismatch',
        details: 'Initial price per ton was listed as negotiable but supplier stated non-negotiable minimum in message.',
        status: 'pending',
        createdAt: '2026-10-22T09:00:00Z',
      },
    ]);
  }

  reportAbuse(report: Omit<AbuseReport, 'id' | 'createdAt' | 'status'>): AbuseReport {
    const reports = this.getAbuseReports();
    const newReport: AbuseReport = {
      ...report,
      id: `rep-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    reports.unshift(newReport);
    this.setItem('abuse_reports', reports);
    return newReport;
  }

  resolveAbuseReport(id: string, status: 'resolved' | 'dismissed'): void {
    const reports = this.getAbuseReports();
    const updated = reports.map((r) => (r.id === id ? { ...r, status } : r));
    this.setItem('abuse_reports', updated);
  }

  // Reset demo state
  resetToDefaults(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem('recyconnect_current_user');
    localStorage.removeItem('recyconnect_listings');
    localStorage.removeItem('recyconnect_connections');
    localStorage.removeItem('recyconnect_conversations');
    localStorage.removeItem('recyconnect_messages');
    localStorage.removeItem('recyconnect_notifications');
    localStorage.removeItem('recyconnect_reviews');
    localStorage.removeItem('recyconnect_verification_requests');
    localStorage.removeItem('recyconnect_abuse_reports');
    localStorage.removeItem('recyconnect_factory_prefs');
    window.location.reload();
  }
}

export const store = new RecyConnectStore();
