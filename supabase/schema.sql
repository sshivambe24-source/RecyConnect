-- RecyConnect PostgreSQL Schema
-- Deployment-Ready Schema for Supabase with Row Level Security (RLS)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROFILES TABLE (Linked with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    display_name TEXT NOT NULL,
    organization_name TEXT NOT NULL,
    account_type TEXT NOT NULL CHECK (account_type IN ('supplier', 'factory', 'admin')),
    description TEXT DEFAULT '',
    city_region TEXT NOT NULL,
    service_area TEXT NOT NULL,
    phone TEXT,
    public_contact_preference TEXT NOT NULL DEFAULT 'in_app' CHECK (public_contact_preference IN ('in_app', 'email', 'phone')),
    verification_status TEXT NOT NULL DEFAULT 'not_submitted' CHECK (verification_status IN ('not_submitted', 'pending_review', 'verified', 'rejected')),
    verification_document_notes TEXT,
    verification_submitted_at TIMESTAMPTZ,
    verification_reviewed_at TIMESTAMPTZ,
    admin_notes TEXT,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 3. MATERIAL CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.material_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    popular_units TEXT[] NOT NULL DEFAULT ARRAY['tonnes', 'kg'],
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 4. MATERIAL LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.material_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category_id TEXT NOT NULL REFERENCES public.material_categories(id),
    description TEXT NOT NULL,
    quantity NUMERIC(12, 2) NOT NULL CHECK (quantity > 0),
    unit TEXT NOT NULL CHECK (unit IN ('tonnes', 'kg', 'bales', 'units')),
    quality_grade TEXT NOT NULL,
    condition_notes TEXT NOT NULL,
    location TEXT NOT NULL,
    region TEXT NOT NULL,
    availability_status TEXT NOT NULL DEFAULT 'ready_now' CHECK (availability_status IN ('ready_now', 'in_stock', 'recurring_weekly', 'sold', 'unavailable')),
    asking_price NUMERIC(12, 2),
    currency TEXT DEFAULT 'USD',
    price_type TEXT NOT NULL DEFAULT 'negotiable' CHECK (price_type IN ('fixed', 'negotiable', 'on_request')),
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    pickup_delivery_notes TEXT DEFAULT '',
    is_published BOOLEAN DEFAULT TRUE,
    views_count INTEGER DEFAULT 0,
    inquiry_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 5. FACTORY SOURCING PREFERENCES
CREATE TABLE IF NOT EXISTS public.factory_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    factory_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    required_categories TEXT[] DEFAULT ARRAY[]::TEXT[],
    min_quantity NUMERIC(12, 2) DEFAULT 0,
    preferred_unit TEXT DEFAULT 'tonnes',
    acceptable_regions TEXT[] DEFAULT ARRAY[]::TEXT[],
    quality_preferences TEXT[] DEFAULT ARRAY[]::TEXT[],
    preferred_availability TEXT[] DEFAULT ARRAY[]::TEXT[],
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 6. CONNECTIONS & TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES public.material_listings(id) ON DELETE CASCADE,
    supplier_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    factory_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    requested_quantity NUMERIC(12, 2) NOT NULL,
    requested_unit TEXT NOT NULL,
    initial_message TEXT NOT NULL,
    agreed_quantity NUMERIC(12, 2),
    agreed_price NUMERIC(12, 2),
    currency TEXT DEFAULT 'USD',
    status TEXT NOT NULL DEFAULT 'inquiry_sent' CHECK (status IN ('inquiry_sent', 'discussion', 'terms_agreed', 'logistics_coordination', 'completed', 'cancelled')),
    status_history JSONB NOT NULL DEFAULT '[]'::jsonb,
    logistics_details JSONB,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 7. CONVERSATIONS & MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    connection_id UUID REFERENCES public.connections(id) ON DELETE SET NULL,
    listing_id UUID REFERENCES public.material_listings(id) ON DELETE CASCADE,
    supplier_id UUID NOT NULL REFERENCES public.profiles(id),
    factory_id UUID NOT NULL REFERENCES public.profiles(id),
    last_message_text TEXT DEFAULT '',
    last_message_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    unread_count_supplier INTEGER DEFAULT 0,
    unread_count_factory INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 8. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('inquiry', 'message', 'connection_update', 'match', 'verification', 'system')),
    link TEXT NOT NULL DEFAULT '/dashboard',
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 9. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    connection_id UUID NOT NULL REFERENCES public.connections(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reviewed_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_moderated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    CONSTRAINT unique_connection_reviewer UNIQUE(connection_id, reviewer_id)
);

-- 10. VERIFICATION REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.verification_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    registration_number TEXT NOT NULL,
    business_license_doc_ref TEXT NOT NULL,
    environmental_permit_doc_ref TEXT,
    operating_since_year TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('not_submitted', 'pending_review', 'verified', 'rejected')),
    submitted_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    reviewed_at TIMESTAMPTZ,
    admin_notes TEXT
);

-- 11. ABUSE REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.abuse_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('listing', 'message', 'user', 'review')),
    entity_id TEXT NOT NULL,
    entity_title_or_snippet TEXT,
    reason TEXT NOT NULL,
    details TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.factory_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abuse_reports ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND account_type = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Public read, owner update
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Categories: Public read, admin write
CREATE POLICY "Categories are readable by everyone" ON public.material_categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.material_categories FOR ALL USING (public.is_admin());

-- Material Listings: Public read if published, owner full access, admin manage
CREATE POLICY "Published listings viewable by everyone" ON public.material_listings FOR SELECT USING (is_published = true OR auth.uid() = supplier_id OR public.is_admin());
CREATE POLICY "Suppliers insert own listings" ON public.material_listings FOR INSERT WITH CHECK (auth.uid() = supplier_id);
CREATE POLICY "Suppliers update own listings" ON public.material_listings FOR UPDATE USING (auth.uid() = supplier_id OR public.is_admin());
CREATE POLICY "Suppliers delete own listings" ON public.material_listings FOR DELETE USING (auth.uid() = supplier_id OR public.is_admin());

-- Connections: Participants & admin access
CREATE POLICY "Participants view connections" ON public.connections FOR SELECT USING (auth.uid() = supplier_id OR auth.uid() = factory_id OR public.is_admin());
CREATE POLICY "Factories insert inquiries" ON public.connections FOR INSERT WITH CHECK (auth.uid() = factory_id);
CREATE POLICY "Participants update connections" ON public.connections FOR UPDATE USING (auth.uid() = supplier_id OR auth.uid() = factory_id OR public.is_admin());

-- Conversations & Messages: Participants only
CREATE POLICY "Participants view conversations" ON public.conversations FOR SELECT USING (auth.uid() = supplier_id OR auth.uid() = factory_id OR public.is_admin());
CREATE POLICY "Participants view messages" ON public.messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = messages.conversation_id AND (c.supplier_id = auth.uid() OR c.factory_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "Participants insert messages" ON public.messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND (c.supplier_id = auth.uid() OR c.factory_id = auth.uid()))
);

-- Notifications: Owner only
CREATE POLICY "Users view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = recipient_id);
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = recipient_id);

-- Verification: Owner can submit & view; admins can review
CREATE POLICY "Users view own verification requests" ON public.verification_requests FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users insert own verification requests" ON public.verification_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins update verification requests" ON public.verification_requests FOR UPDATE USING (public.is_admin());

-- Reviews: Viewable by everyone, only connection participants can write
CREATE POLICY "Reviews viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Eligible participants insert reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Admins moderate reviews" ON public.reviews FOR UPDATE USING (public.is_admin());
