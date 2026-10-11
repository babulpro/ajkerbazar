# BazarDor (বাজার দর)

> Daily market prices — at a glance.

A Bengali web application for tracking daily market prices of essential commodities in Bangladesh — rice, lentils, oil, vegetables, fish, meat, eggs, milk, and spices. Users can browse products by category, view price history, compare prices across 12 major markets, and create an account to save their preferences.

---

## ✨ Key Features

**1. Live Category & Product Browsing**
Browse products across 8 categories — Rice, Lentils, Oil, Vegetables, Fish, Meat, Egg & Milk, and Spices. Each card shows the current price, ▲/▼ change percentage, and the last updated date.

**2. Product Detail Page — Price History & Market Comparison**
Each product has a dedicated page showing today's price, prices from yesterday / last week / last month, and a detailed comparison table across 12 markets in Dhaka, Chattogram, Rajshahi, Khulna, Sylhet, and Mymensingh.

**3. Continuous Scrolling Marquee**
A ticker at the top of the homepage that continuously scrolls through all products — name, price, and up/down indicator. Pauses on hover.

**4. User Authentication — Email & Social Login**
Email/password authentication plus Google and GitHub social login via Better Auth. The `/products` and `/settings` routes are protected by middleware and require login.

**5. User Profile & Name Update**
Logged-in users can view their profile and update their display name from the `/settings` page, and sign out from the navbar dropdown.

---

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 16 (App Router, Turbopack, Cache Components) |
| **Language** | TypeScript |
| **UI Library** | HeroUI, Gravity UI Icons |
| **Styling** | Tailwind CSS |
| **Authentication** | Better Auth (email/password + Google + GitHub) |
| **Data Source** | [Programming Hero BazarDor API](https://openapi.programming-hero.com/api/bazardor) |
| **Caching** | Next.js `use cache` + `cacheLife` / `fetch({ next: { revalidate } })` |
| **Fonts** | Geist Sans + Geist Mono |
| **Package Manager** | npm |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server at http://localhost:3000
npm run dev

# Production build
npm run build

# Start production server
npm start
```

### Required `.env` variables

```env
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=your_database_url

# Optional — for social login
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (navbar + category provider)
│   ├── page.tsx                    # Homepage (hero + category + marquee + products)
│   ├── loading.tsx                 # Global loading skeleton
│   ├── not-found.tsx               # Custom 404 page
│   ├── sign-in/page.tsx            # Sign in
│   ├── sign-up/page.tsx            # Sign up
│   ├── settings/page.tsx           # Profile & name update
│   ├── products/[slug]/page.tsx    # Product detail
│   └── category/[slug]/page.tsx    # Products by category
├── components/
│   ├── navbar/topNavbar.tsx
│   ├── Hero.tsx
│   ├── Category.tsx
│   ├── ProductMarquee.tsx
│   ├── Product.tsx
│   ├── CategoryProducts.tsx
│   └── Footer.tsx
├── context/CategoryContext.tsx
└── lib/
    ├── auth.ts                     # Better Auth config
    ├── auth-client.ts
    ├── product.ts                  # Product fetchers + types
    ├── category.ts                 # Category fetchers
    └── date.ts                     # Bengali date formatters
```

---

## 🔒 Protected Routes

The middleware (`proxy.ts`) protects the following routes — only accessible when logged in:

- `/products/:path*`
- `/settings/:path*`

Unauthenticated users are redirected to `/sign-in?callbackUrl=...`, and sent back to the original page after logging in.

---

## 📜 License

This project is for educational purposes.

---

<div align="center">

**BazarDor** · Bangladesh's daily market prices in one place

</div>