# Repositorio-1 — RIM Trading & Indústria website

A corporate/B2B website for RIM Trading & Indústria, Lda (paper and hygiene products).
Products show unit prices and let the customer build an order (cart), which checks out
via a WhatsApp deep link (`src/context/CartContext.tsx`, `src/components/CartDrawer.tsx`)
rather than a payment gateway — there is still no online payment/checkout flow.

## Stack

- Frontend: React + TypeScript + Vite, Tailwind CSS v4, React Router, react-helmet-async.
- Backend: Express API in `/server`, serving products, categories and contact enquiries.
- Data: `src/data/products.json` and `src/data/categories.json` are the single source of
  truth, read by both the frontend (`src/data/products.ts`) and the API (`server/data/store.ts`).

## Commands

```bash
npm install
npm run dev:all      # frontend (5173) + API (4000) together, with the /api proxy wired up
npm run build         # tsc -b && vite build
npm run lint          # oxlint
```

## Layout

- `src/pages/` — Home, About, Products, Solutions, Contact (one file per route, wired in `src/App.tsx`)
- `src/components/` — reusable UI (Navbar, Footer, Hero, ProductCard, ProductGrid, CategoryCard, CTASection, ContactForm, SectionHeader, ProductModal, CartDrawer, Seo)
- `src/context/CartContext.tsx` — cart state (order lines, quantities) shared across the app
- `src/lib/format.ts` — `formatPrice` (MT currency formatting)
- `src/data/` — typed product/category data and accessors (`getProductById`, `getProductsByCategory`, etc.)
- `server/routes/` — `products`, `categories`, `contact`, `enquiries`
- `public/assets/products/` — product photography sourced from the RIM catalogue PDF

## Conventions / constraints to respect

- Do not invent company facts (address, phone, email, employee count, years of operation,
  certifications, factories, exports) — only what's in the source catalogue/pricelist may
  be shown. If new source material is provided, update `src/data/*.json` accordingly.
- Product specs (ply, sheets, dimensions, packaging, barcode) must trace back to the
  catalogue/pricelist — don't add specs that aren't documented there.
- Prices (`price` field, in MT) must trace back to the client's pricelist — never guess a
  price. A product with no listed price stays without a `price` field and shows "Price on
  request" instead of an Add-to-order control (see `papel-higienico-so-soft`).
- `src/data/*.json` is the only place product/category data should be edited — never
  hardcode product info inside components or pages.

See `README.md` for the fuller API reference and script list.
