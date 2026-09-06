# RIM Trading & Indústria — Corporate Website

A corporate/B2B website for RIM Trading & Indústria, Lda, a company supplying paper and
hygiene products (napkins, tissue, toilet paper, kitchen towels, take-away and office
paper) to hospitality, food service, corporate and industrial clients.

This is a presentation site, not an online store: products link through to an enquiry
form rather than checkout.

## Stack

- **Frontend:** React + TypeScript + Vite, Tailwind CSS v4, React Router, react-helmet-async for per-page SEO tags.
- **Backend:** A small Express API (`/server`) serving products, categories and contact enquiries.
- **Data:** Products and categories are structured data (`src/data/products.json`, `src/data/categories.json`), read by both the frontend and the API — nothing is hardcoded into components.

Product data was extracted directly from `Catalogue RIM - No Price.pdf` and `Pricelist.xlsx`
(ply, sheet counts, dimensions, packaging and barcodes cross-referenced between the two
documents), with product photography taken from the catalogue itself.

## Getting started

```bash
npm install
npm run dev:all   # runs the Vite dev server (5173) and the API (4000) together
```

Or run them separately:

```bash
npm run dev         # frontend only
npm run dev:server  # API only
```

The Vite dev server proxies `/api/*` to `http://localhost:4000`, so the contact form works
out of the box in development.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run dev:server` | Start the Express API with hot reload |
| `npm run dev:all` | Run both concurrently |
| `npm run build` | Type-check and build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |

## API

| Route | Description |
| --- | --- |
| `GET /api/products` | All products, or `?category=<id>` to filter |
| `GET /api/products/:id` | A single product |
| `GET /api/categories` | All categories |
| `GET /api/categories/:id` | A single category |
| `POST /api/contact` | Submit a contact enquiry (validated, stored to `server/data/enquiries.json`) |
| `GET /api/enquiries` | List stored enquiries — disabled unless `ADMIN_KEY` is set, and only with header `x-admin-key: <ADMIN_KEY>`. This is a placeholder until a real admin/CMS exists. |

## Project structure

```
src/
  components/       Reusable UI: Navbar, Footer, Hero, ProductCard, ProductGrid,
                     CategoryCard, CTASection, ContactForm, SectionHeader, ProductModal, Seo
  data/             products.ts (typed accessors) + products.json / categories.json
  pages/            Home, About, Products, Solutions, Contact
  types/            Shared Product / Category / ContactEnquiry types
server/
  routes/           products, categories, contact, enquiries
  data/             store.ts (reads the shared JSON data), enquiries.ts (file-backed store)
public/assets/products/   Product photography sourced from the catalogue
```

## Notes for future work

- Products/categories currently live in JSON files; swapping the API's data layer for a
  real database (e.g. via Supabase, if migrated to Lovable) does not require frontend changes.
- No company contact details (address/phone/email) are shown anywhere on the site, since
  none were provided in the source material — add them once available.
- The `/api/enquiries` endpoint is intentionally minimal (shared-secret gated, no user
  accounts); replace it with real authentication before exposing an admin area publicly.
