# Tourify — Client

> A full-stack travel booking platform where users can explore, create, and book tours. Admins can manage listings, approve tours, and oversee bookings.

**Live:** https://travel-tour-booking-platform-client.vercel.app  
**API:** https://travel-tour-booking-platform-server.onrender.com

---

## Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| Next.js | 16.2.10 | React framework (App Router) |
| React | 19.2.4 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling + dark mode |
| better-auth | 1.6.23 | Authentication |
| Axios | 1.18.1 | API requests |
| Lucide React | 1.24.0 | Icons |

---

## Pages (19 Routes)

| Route | Description | Auth |
|-------|-------------|------|
| `/` | Home — hero, featured tours, destinations, testimonials, FAQ | No |
| `/tours` | Browse tours — search, filter, sort, paginate | No |
| `/tours/:id` | Tour detail — gallery, itinerary, reviews, booking sidebar | No |
| `/tours/add` | Create new tour listing | Yes |
| `/tours/edit/:id` | Edit your tour | Yes (owner) |
| `/tours/manage` | Manage your tours, status tracking | Yes |
| `/dashboard/bookings` | Your booking history | Yes |
| `/dashboard/profile` | Edit profile, wishlist | Yes |
| `/admin` | Admin dashboard with statistics | Admin |
| `/admin/tours` | Approve / reject / edit all tours | Admin |
| `/admin/bookings` | View all bookings | Admin |
| `/admin/users` | User management | Admin |
| `/admin/profile` | Admin profile | Admin |
| `/login` | Sign in (email + Google) | No |
| `/register` | Create account | No |
| `/about` | About Tourify | No |
| `/contact` | Contact form | No |
| `/privacy` | Privacy policy | No |
| `/terms` | Terms of service | No |

---

## Components (30)

**Home (11):** Hero, FeaturedPackages, PopularDestinations, TourCategories, WhyChooseUs, Statistics, Testimonials, FAQ, CTABanner, Newsletter, ListYourTourCTA

**Tours (11):** SearchBar, FilterSidebar, MobileFilterDrawer, SortSelect, Pagination, TourSpecifications, ImageGallery, BookingSidebar, BookingModal, ReviewsSection, RelatedTours

**Layout (3):** Navbar, Footer, ClientLayout

**UI (3):** Toast, TourCard, TourCardSkeleton

**Sidebar (2):** AdminSidebar, DashboardSidebar

---

## Project Structure

```
client/src/
├── app/                    # 19 page routes (App Router)
├── components/             # 30 reusable components
├── lib/
│   ├── api.ts              # Axios instance (baseURL from env)
│   ├── auth-client.ts      # better-auth client config
│   ├── auth-context.tsx    # Auth state + useAuth() hook
│   └── theme-context.tsx   # Dark/light mode + useTheme() hook
└── types/index.ts          # TypeScript interfaces
```

---

## Features

- **Auth:** Email/password + Google OAuth via better-auth
- **Theme:** Dark / light mode toggle (persisted in localStorage)
- **Search & Filter:** Full-text search, category, price, difficulty, rating filters
- **Booking:** Date selection, group size, Stripe payment
- **Tour CRUD:** Create, edit, delete tours with image gallery
- **Admin:** Tour approval workflow, user management, analytics
- **Responsive:** Mobile-first design, filter drawer, sidebar navigation
- **Dark Mode:** Class-based with Tailwind CSS 4 `@custom-variant`

---

## Setup

```bash
cd client
npm install
cp .env.local.example .env.local
npm run dev          # → http://localhost:3000
```

## Env Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Run production |
| `npm run lint` | ESLint |

---

## Deploy on Vercel

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Root Directory → `client`
4. Add env: `NEXT_PUBLIC_API_URL` = your Render server URL
5. Deploy
