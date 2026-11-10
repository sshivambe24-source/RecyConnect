# RecyConnect — Digital Recyclable-Material Marketplace

**Connect · Recycle · Impact**

RecyConnect is a full-stack, deployment-ready digital B2B marketplace and matching platform connecting industrial suppliers of recyclable waste with verified recycling factories and mills. 

Built with modern technology (**Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase PostgreSQL with Row Level Security**), it features an explainable deterministic matching algorithm, a 6-stage transaction workflow, logistics scheduling, verified business credentials review, and direct in-app messaging.

---

## 🚀 Live Demo & Pilot Focus

- **Pilot Region:** Maharashtra Industrial Corridor (Pune, Chakan, Pimpri-Chinchwad, Talegaon).
- **Initial Supported Streams:**
  1. Paper & Cardboard (OCC, kraft cuts, office ledger)
  2. Plastics (Clean PET flakes, HDPE drum regrind)
  3. Metals (HMS 1&2 structural scrap, aluminum extrusions)
  4. E-Waste (Telecom circuit boards, decommissioned server racks)
  5. Other Recyclable Commercial Materials

---

## 🎨 Color Palette & Design System

RecyConnect implements a clean sustainability-tech aesthetic combining deep purple, primary violet, and teal accents:

| Token | Hex Code | Role |
| :--- | :--- | :--- |
| **Warm Cream / Off-White** | `#F8F6F0` | Main canvas background |
| **Deep Purple** | `#38205F` | Primary headers, brand contrast |
| **Primary Violet** | `#6845A0` | Primary actions, key badges |
| **Teal** | `#2E7775` | Sustainability & positive statuses |
| **Muted Lavender** | `#DCD4EC` | Soft borders & card accents |
| **Pale Mint** | `#E1EFEB` | Teal highlights |
| **Dark Charcoal** | `#25232B` | Primary legible body text |
| **Soft Grey Border** | `#E5E1E8` | Subtle card & layout dividers |

---

## 🛠️ Architecture & Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS with custom branding config
- **Icons:** Lucide React
- **Database:** Supabase PostgreSQL with Row Level Security (RLS) policies (`supabase/schema.sql`)
- **State & Demo Storage:** Dual-layer architecture:
  - Connects to Supabase PostgreSQL when environment variables are supplied.
  - Seamless in-browser state engine (`lib/store.ts`) with realistic fictional demo records for instantaneous zero-setup evaluation on Vercel or local machines.
- **Matching Engine:** Deterministic rule-based algorithm (`lib/matching.ts`) scoring category, volume thresholds, geographic radius, and quality grades with transparent explanations.

---

## 🧑‍💻 Quick Evaluator Demo Personas

When running the application, use the top **Demo Persona Bar** to switch between user roles in 1 click:

1. **Material Supplier (Apex Scrap & Resource Recovery):**
   - Manage 28T OCC Cardboard and PET flake listings.
   - Access listing creation/editing modal, mark lots sold, view inquiries, and update pickup slots.
2. **Recycling Factory (GreenCycle Pulp & Paper Industrial Mills):**
   - Set factory sourcing preferences (required streams, minimum tonnes, acceptable regions).
   - View explainable algorithmic matches with compatibility scores (e.g., 95% Match).
   - Send sourcing inquiries with requested quantity and specifications.
3. **Compliance Administrator (Operations & Compliance Officer):**
   - Review pending enterprise verification applications (audit business registration, factory licenses, pollution control permits).
   - Moderate and suspend marketplace listings.
   - Review reported messages and transactions.

---

## 📂 Project Structure

```
├── app/
│   ├── layout.tsx            # Global Root Layout with DemoSwitcher, Navbar, Footer
│   ├── globals.css           # Custom theme tokens & scrollbars
│   ├── page.tsx              # Home Page (Hero, Trust Strip, 3-Step Flow, Categories, FAQ)
│   ├── materials/
│   │   ├── page.tsx          # Explore Materials (Search, multi-parameter filters, sort)
│   │   └── [id]/page.tsx     # Dynamic Listing Detail (Specs, gallery, inquiry modal)
│   ├── dashboard/
│   │   ├── supplier/page.tsx # Supplier Dashboard (CRUD listings, inquiry cards, KPIs)
│   │   └── factory/page.tsx  # Factory Dashboard (Sourcing rules, match engine)
│   ├── messages/page.tsx     # In-app counterparty direct chat & abuse reporting
│   ├── connections/page.tsx  # 6-Stage transaction workflow & logistics coordination
│   ├── notifications/page.tsx# Notification center with unread counters
│   ├── profile/
│   │   ├── page.tsx          # Organization profile & verification credential submission
│   │   └── [id]/page.tsx     # Public verified enterprise profile
│   ├── admin/page.tsx        # Compliance admin portal (Verifications & Moderation)
│   ├── how-it-works/page.tsx # Detailed workflow guide
│   ├── about/page.tsx        # Mission, problem & solution statement
│   ├── contact/page.tsx      # Operations desk contact & feedback form
│   ├── terms/page.tsx        # Commercial terms of service
│   ├── privacy/page.tsx      # Private document storage & data protection
│   ├── sitemap.ts            # Dynamic SEO sitemap
│   └── robots.ts             # Robots.txt with protected dashboard indexing
├── components/
│   ├── Logo.tsx              # Original leaf + circular recycling nodes SVG logo
│   ├── Navbar.tsx            # Responsive navigation with badge counters & mobile drawer
│   ├── Footer.tsx            # Branded footer with pilot territory badge
│   ├── DemoSwitcher.tsx      # 1-Click evaluator persona switcher
│   ├── ListingCard.tsx       # Standard marketplace card with verified badges
│   ├── StatusBadge.tsx       # 6 transaction milestone visual badges
│   ├── VerificationBadge.tsx # Verified, Pending, Action Required badges
│   ├── InquiryModal.tsx      # Formal inquiry modal with quantity & terms input
│   ├── LogisticsModal.tsx    # Transport scheduling modal (carrier, bay, notes)
│   └── ReviewModal.tsx       # Verified post-delivery rating & review modal
├── lib/
│   ├── types.ts              # TypeScript domain types
│   ├── store.ts              # Reactive store with realistic pilot demo data
│   ├── matching.ts           # Deterministic explainable matching algorithm
│   ├── supabase.ts           # Supabase client integration
│   └── utils.ts              # Formatting & class merging helpers
└── supabase/
    ├── schema.sql            # Full PostgreSQL schema with RLS policies & triggers
    └── seed.sql              # Initial database seed script
```

---

## ⚡ Getting Started Locally

### 1. Prerequisites
- Node.js 18+ or 20+ LTS
- npm or pnpm

### 2. Installation
```bash
git clone https://github.com/your-username/RecyConnect.git
cd RecyConnect
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database & Supabase Deployment

To deploy your live Supabase database:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase Dashboard.
3. Paste and run the contents of [`supabase/schema.sql`](file:///c:/Users/LOQ/OneDrive/Desktop/RecyConnect/supabase/schema.sql).
4. Paste and run [`supabase/seed.sql`](file:///c:/Users/LOQ/OneDrive/Desktop/RecyConnect/supabase/seed.sql).
5. Copy your **Project URL** and **Anon Key** from Project Settings > API.
6. Add them to `.env.local` or your Vercel Project Environment Variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub.
2. In [Vercel](https://vercel.com), click **Add New Project** and select the RecyConnect repo.
3. In **Environment Variables**, optionally add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Click **Deploy**. Vercel will build the production Next.js bundle automatically.

---

## 📋 Acceptance Tests Verified

1. **Supplier Journey:** Supplier can view lots, create a new lot (OCC cardboard or PET flakes), publish it, edit price/quantity, toggle availability to sold, and view incoming buyer inquiries.
2. **Factory Journey:** Factory can set raw material sourcing preferences, review algorithmically ranked lots with explainable compatibility scores, filter by location and volume, and dispatch inquiries.
3. **Direct Communication:** Counterparties can exchange direct messages linked to listings with timestamps and unread counters.
4. **Transaction Tracking:** Transactions advance through the 6-stage lifecycle (`inquiry_sent` → `discussion` → `terms_agreed` → `logistics_coordination` → `completed`).
5. **Logistics Coordination:** Participants record pickup yard address, mill bay, proposed date, vehicle container type, and carrier details.
6. **Enterprise Verification:** Suppliers submit corporate registration numbers, trade licenses, and environmental permits; Compliance Administrators approve or reject credentials with feedback.
7. **Reviews & Feedback:** Only eligible completed transactions can post reviews with star ratings and comments.
8. **Responsive Design:** Verified on desktop, tablet, and mobile with collapsible navigation and touch-friendly controls.

---

## ⚖️ Legal & Operating Boundaries

RecyConnect does **not**:
- Take legal ownership or physical custody of recyclable materials.
- Operate its own freight vehicles or transport carrier services.
- Guarantee material pricing without mutual counterparty contract agreement.
